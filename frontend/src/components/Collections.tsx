import './Collections.css'
import { collections } from '../types'

export default function Collections() {
  return (
    <section className="collections" id="colecciones" aria-labelledby="coll-title">
      <div className="container">
        <header className="collections__header">
          <div>
            <p className="eyebrow">Explora</p>
            <h2 id="coll-title" className="section-title">Nuestras colecciones</h2>
          </div>
          <a href="#productos" className="btn btn-outline">Ver todo →</a>
        </header>
        <div className="collections__grid">
          {collections.map(c => (
            <article key={c.id} className={`coll-card${c.featured ? ' coll-card--featured' : ''}`}>
              <img className="coll-card__img" src={c.img} alt={`Colección ${c.title}`} loading="lazy" />
              <div className="coll-card__overlay">
                <span className="coll-card__label">{c.label}</span>
                <h3 className="coll-card__title">{c.title}</h3>
                <span className="coll-card__count">{c.count} piezas</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
