import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = join(__dirname, 'data', 'contacts.json')
const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

function readContacts() {
  if (!existsSync(DATA_FILE)) return []
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
}

function writeContacts(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

app.get('/api/contacts', (_req, res) => {
  res.json(readContacts())
})

app.post('/api/contact', (req, res) => {
  const { name, email, phone, interest, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email y message son obligatorios' })
  }

  const contacts = readContacts()
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone: phone || '',
    interest: interest || '',
    message,
    createdAt: new Date().toISOString()
  }
  contacts.push(newContact)
  writeContacts(contacts)

  res.status(201).json({ message: 'Mensaje guardado correctamente', contact: newContact })
})

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`)
})
