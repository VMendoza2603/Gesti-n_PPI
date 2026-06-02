import './Products.css'
import type { Category, Product } from '../types'
import { FILTERS } from '../types'

interface ProductsProps {
  filter: Category
  onFilterChange: (f: Category) => void
  visible: Product[]
  wishlist: number[]
  onToggleWish: (id: number) => void
  onAddToCart: (product: Product) => void
}

export default function Products({ filter, onFilterChange, visible, wishlist, onToggleWish, onAddToCart }: ProductsProps) {
  return (
    <section className="products" id="productos" aria-labelledby="prod-title">
      <div className="container">
        <div className="products__header">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 id="prod-title" className="section-title">Piezas destacadas</h2>
          </div>
          <div className="products__filters" role="group" aria-label="Filtros de categoría">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => onFilterChange(f)}
                aria-pressed={filter === f}
              >{f}</button>
            ))}
          </div>
        </div>

        <div className="products__grid">
          {visible.map(p => (
            <article key={p.id} className="product-card">
              <div className="product-card__img-wrap">
                <img src={p.img} alt={p.name} loading="lazy" />
                {p.badge && <span className="product-card__badge">{p.badge}</span>}
                <button
                  className="product-card__wish"
                  aria-label={`${wishlist.includes(p.id) ? 'Quitar de' : 'Agregar a'} favoritos: ${p.name}`}
                  onClick={() => onToggleWish(p.id)}
                >
                  {wishlist.includes(p.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="product-card__info">
                <span className="product-card__cat">{p.category}</span>
                <h3 className="product-card__name">{p.name}</h3>
                <div className="product-card__footer">
                  <div>
                    <span className="product-card__price">${p.price}</span>
                    {p.oldPrice && <span className="product-card__price-old">${p.oldPrice}</span>}
                  </div>
                  <button
                    className="product-card__add"
                    onClick={() => onAddToCart(p)}
                    aria-label={`Agregar ${p.name} al carrito`}
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
