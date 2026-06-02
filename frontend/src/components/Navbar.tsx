import './Navbar.css'

interface NavbarProps {
  totalQty: number
  onCartOpen: () => void
}

export default function Navbar({ totalQty, onCartOpen }: NavbarProps) {
  return (
    <header role="banner">
      <nav className="nav" aria-label="Navegación principal">
        <div className="container nav__inner">
          <a href="/" className="nav__logo" aria-label="MAISON — Inicio">
            MAIS<span>ON</span>
          </a>
          <ul className="nav__links">
            <li><a href="#colecciones">Colecciones</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <div className="nav__actions">
            <a href="#contacto" className="btn btn-dark">Consultar</a>
            <button
              className="nav__cart"
              aria-label={`Carrito — ${totalQty} artículos`}
              onClick={onCartOpen}
            >
              🛍
              {totalQty > 0 && <span className="nav__cart-badge">{totalQty}</span>}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
