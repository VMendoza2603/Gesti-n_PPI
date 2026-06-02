import './Banner.css'

export default function Banner() {
  return (
    <section className="banner" aria-label="Promoción">
      <div className="container banner__inner">
        <p className="eyebrow" style={{ color: 'var(--c-accent)' }}>Oferta limitada</p>
        <h2 className="banner__title">20% OFF en tu <em>primera</em> compra</h2>
        <p style={{ color: 'rgba(245,240,232,0.6)', fontWeight: 300, maxWidth: '40ch', textAlign: 'center' }}>
          Suscríbete a nuestra newsletter y recibe acceso anticipado a las nuevas colecciones.
        </p>
        <a href="#contacto" className="btn btn-accent">Quiero mi descuento</a>
      </div>
    </section>
  )
}
