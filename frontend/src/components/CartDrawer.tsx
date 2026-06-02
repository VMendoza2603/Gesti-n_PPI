import './CartDrawer.css'
import { useEffect } from 'react'
import type { CartItem } from '../types'
import { SHIPPING_THRESHOLD } from '../types'

interface CartDrawerProps {
  items: CartItem[]
  open: boolean
  onClose: () => void
  onQty: (id: number, delta: number) => void
  onRemove: (id: number) => void
}

export default function CartDrawer({ items, open, onClose, onQty, onRemove }: CartDrawerProps) {
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping  = subtotal >= SHIPPING_THRESHOLD ? 0 : 8.99
  const total     = subtotal + shipping
  const totalQty  = items.reduce((s, i) => s + i.qty, 0)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div
        className={`cart-overlay${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${open ? ' open' : ''}`}
        aria-label="Carrito de compras"
        role="dialog"
        aria-modal="true"
      >
        <div className="cart-drawer__head">
          <div>
            <h2 className="cart-drawer__title">Tu carrito</h2>
            <span className="cart-drawer__count">
              {totalQty === 0 ? 'Vacío' : `${totalQty} ${totalQty === 1 ? 'artículo' : 'artículos'}`}
            </span>
          </div>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Cerrar carrito">✕</button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon">🛍</span>
              <p>Tu carrito está vacío.<br />Agrega piezas de nuestra colección.</p>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <img className="cart-item__img" src={item.img} alt={item.name} loading="lazy" />
                <div className="cart-item__info">
                  <span className="cart-item__cat">{item.category}</span>
                  <h3 className="cart-item__name">{item.name}</h3>
                  <span className="cart-item__price">${(item.price * item.qty).toFixed(2)}</span>
                  <div className="cart-item__controls">
                    <div className="cart-item__qty">
                      <button onClick={() => onQty(item.id, -1)} aria-label="Reducir cantidad">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onQty(item.id, +1)} aria-label="Aumentar cantidad">+</button>
                    </div>
                    <button className="cart-item__remove" onClick={() => onRemove(item.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Envío</span>
                <span>{shipping === 0 ? '🎉 Gratis' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <div className="cart-summary__row" style={{ color: 'var(--c-accent)', fontSize: 'var(--fs-xs)' }}>
                  <span>Te faltan ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} para envío gratis</span>
                </div>
              )}
              <div className="cart-summary__row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-dark cart-checkout">Proceder al pago →</button>
            <button className="btn btn-outline cart-checkout" style={{ padding: 'var(--sp-3)' }} onClick={onClose}>
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
