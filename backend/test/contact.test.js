import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

process.env.NODE_ENV = 'test'
const dir = await mkdtemp(join(tmpdir(), 'maison-'))
process.env.CONTACTS_FILE = join(dir, 'contacts.json')
process.env.ADMIN_TOKEN = 'token-de-prueba'
delete process.env.MONGODB_URI

const request = (await import('supertest')).default
const app = (await import('../app.js')).default

const valid = {
  name: 'María González',
  email: 'Maria@Correo.com',
  phone: '+593 987654321',
  interest: 'mujer',
  message: 'Quisiera información sobre la nueva colección.',
}

after(() => rm(dir, { recursive: true, force: true }))

test('guarda un mensaje válido sin devolver los datos personales', async () => {
  const res = await request(app).post('/api/contact').send(valid)
  assert.equal(res.status, 201)
  assert.equal(res.body.contact, undefined)
})

test('el listado de mensajes exige el token de administración', async () => {
  const anon = await request(app).get('/api/contacts')
  const wrong = await request(app).get('/api/contacts').set('Authorization', 'Bearer otro')
  const ok = await request(app).get('/api/contacts').set('Authorization', 'Bearer token-de-prueba')
  assert.equal(anon.status, 401)
  assert.equal(wrong.status, 401)
  assert.equal(ok.status, 200)
  assert.equal(ok.body[0].email, 'maria@correo.com')
})

test('descarta campos no permitidos', async () => {
  const ok = await request(app).get('/api/contacts').set('Authorization', 'Bearer token-de-prueba')
  assert.equal(Object.hasOwn(ok.body[0], 'isAdmin'), false)
})

test('rechaza datos inválidos', async () => {
  const cases = [
    { ...valid, email: 'no-es-email' },
    { ...valid, name: '<script>' },
    { ...valid, interest: 'hackeo' },
    { ...valid, message: 'corto' },
    { ...valid, name: { $ne: '' } },
  ]
  for (const body of cases) {
    const res = await request(app).post('/api/contact').send(body)
    assert.equal(res.status, 400, JSON.stringify(body))
  }
})

test('el honeypot descarta bots sin guardar nada', async () => {
  const before = await request(app).get('/api/contacts').set('Authorization', 'Bearer token-de-prueba')
  await request(app).post('/api/contact').send({ ...valid, website: 'http://spam.com' })
  const after = await request(app).get('/api/contacts').set('Authorization', 'Bearer token-de-prueba')
  assert.equal(after.body.length, before.body.length)
})

test('cabeceras de seguridad y CORS restringido', async () => {
  const res = await request(app).get('/api/health').set('Origin', 'https://malicioso.com')
  assert.equal(res.headers['x-content-type-options'], 'nosniff')
  assert.equal(res.headers['access-control-allow-origin'], undefined)
})

test('limita la cantidad de mensajes por IP (anti-spam)', async () => {
  let limited = false
  for (let i = 0; i < 12; i += 1) {
    const res = await request(app).post('/api/contact').send(valid)
    if (res.status === 429) limited = true
  }
  assert.equal(limited, true)
})
