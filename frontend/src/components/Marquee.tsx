import './Marquee.css'
import { MARQUEE_ITEMS } from '../types'

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-inner">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
          <span key={i} className={t === '·' ? 'dot' : ''}>{t}</span>
        ))}
      </div>
    </div>
  )
}
