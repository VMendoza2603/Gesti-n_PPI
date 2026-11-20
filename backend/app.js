// API de contacto de MAISON. Vercel la detecta automáticamente (Express: app.js);
// en local/Docker se arranca con server.js.
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import crypto from 'crypto'
import rateLimit from 'express-rate-limit'
import { saveContact, listContacts } from './storage.js'
import { validateContact } from './validation.js'

const isTest = process.env.NODE_ENV === 'test'
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

const app = express()
app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)) }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Anti-spam: máximo 5 mensajes por IP cada 15 minutos
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isTest ? 10 : 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Demasiados mensajes, intenta de nuevo más tarde' },
})

app.post('/api/contact', contactLimiter, async (req, res, next) => {
  try {
    // Honeypot: un campo oculto que solo rellenan los bots
    if (req.body?.website) return res.status(201).json({ message: 'Mensaje guardado correctamente' })

    const { data, errors } = validateContact(req.body)
    if (errors) return res.status(400).json({ error: 'Datos inválidos', details: errors })

    await saveContact(data)
    // No se devuelven los datos personales en la respuesta
    res.status(201).json({ message: 'Mensaje guardado correctamente' })
  } catch (error) {
    next(error)
  }
})

// Listado de mensajes: contiene datos personales, solo con el token de administración
app.get('/api/contacts', async (req, res, next) => {
  try {
    const token = process.env.ADMIN_TOKEN
    if (!token) return res.status(404).json({ error: 'Ruta no encontrada' })

    const expected = Buffer.from(`Bearer ${token}`)
    const received = Buffer.from(req.headers.authorization || '')
    const valid = expected.length === received.length && crypto.timingSafeEqual(expected, received)
    if (!valid) return res.status(401).json({ error: 'No autorizado' })

    res.json(await listContacts())
  } catch (error) {
    next(error)
  }
})

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }))

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido' })
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Mensaje demasiado grande' })
  if (!isTest) console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

export default app
