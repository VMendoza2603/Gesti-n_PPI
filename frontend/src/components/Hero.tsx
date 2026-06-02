import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__inner container">
        <div className="hero__text-col">
          <p className="eyebrow fade-up">Nueva Temporada · SS 2025</p>
          <h1 id="hero-heading" className="hero__title fade-up fade-up-d1">
            Viste tu<br /><em>historia</em>
          </h1>
          <p className="hero__subtitle fade-up fade-up-d2">
            Piezas atemporales diseñadas para quienes entienden que la moda es
            una forma de arte personal.
          </p>
          <div className="hero__cta fade-up fade-up-d3">
            <a href="#colecciones" className="btn btn-dark">Ver colecciones</a>
            <a href="#contacto" className="btn btn-outline">Contactar</a>
          </div>
          <div className="hero__stat-row fade-up fade-up-d4">
            {[['12+','Años de experiencia'],['4k+','Clientes felices'],['100%','Fibras naturales']].map(([n,l]) => (
              <div className="hero__stat" key={l}>
                <strong>{n}</strong><span>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__image-col" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=85"
            alt="Modelo con colección verano 2025"
            loading="eager"
          />
          <div className="hero__tag">Colección SS 25 — <span>Disponible ahora</span></div>
        </div>
      </div>
    </section>
  )
}
