// ContactForm.tsx
import './ContactForm.css'
import { useState } from 'react'

/* ── Types ─────────────────────────────────────────────── */
interface Values  { name: string; email: string; phone: string; interest: string; message: string }
interface Errors  { name?: string; email?: string; phone?: string; interest?: string; message?: string }
interface Touched { name: boolean; email: boolean; phone: boolean; interest: boolean; message: boolean }

/* ── Rules ─────────────────────────────────────────────── */
const NAME_MIN    = 3
const MESSAGE_MIN = 15

const rules: Record<keyof Values, (v: string) => string | undefined> = {
  name: v => {
    if (!v.trim())               return 'El nombre es obligatorio.'
    if (v.trim().length < NAME_MIN) return `Mínimo ${NAME_MIN} caracteres.`
    if (!/^[A-Za-zÀ-ÿ\s'\-]+$/.test(v)) return 'Solo letras y espacios.'
  },
  email: v => {
    if (!v.trim()) return 'El correo es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return 'Debe contener @ y un dominio válido (ej: usuario@marca.com).'
  },
  phone: v => {
    if (!v.trim()) return undefined               // optional
    if (!/^[\d\s\+\-\(\)]{7,15}$/.test(v)) return 'Teléfono no válido.'
  },
  interest: v => {
    if (!v) return 'Selecciona una categoría.'
  },
  message: v => {
    if (!v.trim())                  return 'El mensaje es obligatorio.'
    if (v.trim().length < MESSAGE_MIN) return `Mínimo ${MESSAGE_MIN} caracteres.`
  },
}

function validate(vals: Values): Errors {
  const e: Errors = {}
  ;(Object.keys(rules) as (keyof Values)[]).forEach(k => { const m = rules[k](vals[k]); if (m) e[k] = m })
  return e
}

/* ── Subcomponent: Field ───────────────────────────────── */
function Field({ id, label, required, touched, error, children }: {
  id: string; label: string; required?: boolean; touched: boolean; error?: string; children: React.ReactNode
}) {
  const hasErr = touched && !!error
  const ok     = touched && !error
  return (
    <div className={`field${hasErr ? ' field--error' : ''}${ok ? ' field--success' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="field__req"> *</span>}</label>
      {children}
      <span className="field__msg" role="alert">{hasErr ? `⚠ ${error}` : ''}</span>
    </div>
  )
}

/* ── Main ──────────────────────────────────────────────── */
export default function ContactForm() {
  const blank: Values  = { name: '', email: '', phone: '', interest: '', message: '' }
  const blankT: Touched = { name: false, email: false, phone: false, interest: false, message: false }

  const [vals,      setVals]      = useState<Values>(blank)
  const [errors,    setErrors]    = useState<Errors>({})
  const [touched,   setTouched]   = useState<Touched>(blankT)
  const [loading,   setLoading]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [errorMsg,  setErrorMsg]  = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name: k, value: v } = e.target
    const key = k as keyof Values
    const next = { ...vals, [key]: v }
    setVals(next)
    if (touched[key]) setErrors(prev => ({ ...prev, [key]: rules[key](v) }))
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const key = e.target.name as keyof Values
    setTouched(prev => ({ ...prev, [key]: true }))
    setErrors(prev => ({ ...prev, [key]: rules[key](vals[key]) }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allT = Object.keys(blankT).reduce((a, k) => ({ ...a, [k]: true }), {} as Touched)
    setTouched(allT)
    const errs = validate(vals)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setErrorMsg('')
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vals)
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
    } catch (error) {
      setErrorMsg('Error al enviar el mensaje. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div className="form form__success">
      <span className="form__success-icon">🎉</span>
      <h3>¡Gracias por escribirnos!</h3>
      <p>Nuestro equipo te contactará en menos de 24 horas.</p>
      <button className="btn btn-outline" onClick={() => { setVals(blank); setTouched(blankT); setErrors({}); setSent(false) }}>
        Enviar otro mensaje
      </button>
    </div>
  )

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-label="Formulario de contacto">
      <div className="form__row">
        <Field id="name" label="Nombre completo" required touched={touched.name} error={errors.name}>
          <input id="name" name="name" type="text" placeholder="María González"
            autoComplete="name" value={vals.name} onChange={onChange} onBlur={onBlur}
            aria-invalid={touched.name && !!errors.name} />
        </Field>
        <Field id="email" label="Correo electrónico" required touched={touched.email} error={errors.email}>
          <input id="email" name="email" type="email" placeholder="maria@correo.com"
            autoComplete="email" value={vals.email} onChange={onChange} onBlur={onBlur}
            aria-invalid={touched.email && !!errors.email} />
        </Field>
      </div>

      <div className="form__row">
        <Field id="phone" label="Teléfono" touched={touched.phone} error={errors.phone}>
          <input id="phone" name="phone" type="tel" placeholder="+593 99 000 0000"
            autoComplete="tel" value={vals.phone} onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field id="interest" label="Me interesa" required touched={touched.interest} error={errors.interest}>
          <select id="interest" name="interest" value={vals.interest}
            onChange={onChange} onBlur={onBlur} aria-invalid={touched.interest && !!errors.interest}>
            <option value="">— Selecciona —</option>
            <option value="mujer">Colección Mujer</option>
            <option value="hombre">Colección Hombre</option>
            <option value="accesorios">Accesorios</option>
            <option value="corporativo">Pedido corporativo</option>
            <option value="otro">Otro</option>
          </select>
        </Field>
      </div>

      <Field id="message" label="Mensaje" required touched={touched.message} error={errors.message}>
        <textarea id="message" name="message" placeholder={`Cuéntanos qué buscas (mín. ${MESSAGE_MIN} caracteres)…`}
          value={vals.message} onChange={onChange} onBlur={onBlur}
          aria-invalid={touched.message && !!errors.message} />
      </Field>

      {errorMsg && (
        <div className="form__error-msg" role="alert">
          ⚠ {errorMsg}
        </div>
      )}

      <button type="submit" className="btn btn-dark form__submit" disabled={loading} aria-busy={loading}>
        {loading ? '⏳ Enviando…' : 'Enviar mensaje →'}
      </button>
    </form>
  )
}
