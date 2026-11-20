import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { MongoClient } from 'mongodb'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = process.env.CONTACTS_FILE || join(__dirname, 'data', 'contacts.json')

// En Vercel el disco es de solo lectura: con MONGODB_URI los mensajes se guardan en MongoDB Atlas.
// Sin esa variable (local o Docker) se usa un archivo JSON.
let clientPromise
async function collection() {
  clientPromise ??= new MongoClient(process.env.MONGODB_URI).connect()
  const client = await clientPromise
  return client.db().collection('contacts')
}

const useMongo = () => Boolean(process.env.MONGODB_URI)

async function readFileContacts() {
  if (!existsSync(DATA_FILE)) return []
  return JSON.parse(await readFile(DATA_FILE, 'utf-8'))
}

export async function saveContact(data) {
  const contact = { ...data, createdAt: new Date().toISOString() }
  if (useMongo()) {
    await (await collection()).insertOne(contact)
    return
  }
  const contacts = await readFileContacts()
  contacts.push({ id: contacts.length + 1, ...contact })
  await mkdir(dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(contacts, null, 2))
}

export async function listContacts() {
  if (useMongo()) {
    return (await collection()).find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(500).toArray()
  }
  return readFileContacts()
}
