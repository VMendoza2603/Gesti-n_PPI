import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__logo">MAIS<span>ON</span></p>
            <p>Moda consciente y atemporal. Diseñada en Ecuador, para el mundo.</p>
          </div>
          {[
            { title: 'Tienda',  links: ['Mujer','Hombre','Accesorios','Novedades','Sale'] },
            { title: 'Empresa', links: ['Nosotros','Sostenibilidad','Prensa','Trabaja con nosotros'] },
            { title: 'Soporte', links: ['FAQ','Envíos','Devoluciones','Guía de tallas'] },
          ].map(col => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} MAISON Ecuador. Todos los derechos reservados.</p>
          <p className="footer__copy">Hecho con ♥ · React + Vite + TypeScript</p>
        </div>
      </div>
    </footer>
  )
}
