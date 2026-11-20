const INTERESTS = ['mujer', 'hombre', 'accesorios', 'corporativo', 'otro']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const NAME = /^[A-Za-zÀ-ÿ\s'-]+$/
const PHONE = /^[\d\s+()-]{7,15}$/

const str = (value) => (typeof value === 'string' ? value.trim() : '')

// Mismas reglas que el formulario del frontend; solo se aceptan estos campos (lista blanca)
export function validateContact(body = {}) {
  const data = {
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    phone: str(body.phone),
    interest: str(body.interest),
    message: str(body.message),
  }
  const errors = {}

  if (data.name.length < 3 || data.name.length > 100 || !NAME.test(data.name)) errors.name = 'Nombre inválido'
  if (!EMAIL.test(data.email) || data.email.length > 254) errors.email = 'Email inválido'
  if (data.phone && !PHONE.test(data.phone)) errors.phone = 'Teléfono inválido'
  if (!INTERESTS.includes(data.interest)) errors.interest = 'Categoría inválida'
  if (data.message.length < 10 || data.message.length > 2000) errors.message = 'El mensaje debe tener entre 10 y 2000 caracteres'

  return Object.keys(errors).length ? { errors } : { data }
}
