import './ContactSection.css'
import ContactForm from '../ContactForm'

export default function ContactSection() {
  return (
    <section className="contact" id="contacto" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div className="contact__info">
          <p className="eyebrow">Contacto</p>
          <div className="divider" />
          <h2 id="contact-title" className="section-title">Hablemos de<br />tu estilo</h2>
          <p>
            ¿Buscas una pieza especial, tienes una consulta sobre pedidos o
            quieres agendar una visita? Escríbenos.
          </p>
          <address className="contact__details">
            {[
              ['📍','Av. 9 de Octubre 123, Guayaquil'],
              ['📧','hola@maisonec.com'],
              ['📞','+593 99 123 4567'],
              ['⏰','Lun – Sáb · 10:00 – 19:00'],
            ].map(([icon, text]) => (
              <p className="contact__detail" key={text}>
                <span className="contact__detail-icon" aria-hidden="true">{icon}</span>
                <span>{text}</span>
              </p>
            ))}
          </address>
        </div>
        <div className="contact__form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
