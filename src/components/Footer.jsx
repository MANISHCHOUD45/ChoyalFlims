import { Link } from "react-router-dom"
import { useContent } from "../content/ContentContext.jsx"
import { IconInstagram, IconPhone, IconWhatsapp } from "./Icons.jsx"

export default function Footer() {
  const { business, contact, services } = useContent()
  const year = 2026 // update as needed
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src={business.logo} alt={`${business.name} logo`} style={{ height: 78, width: 78, borderRadius: "50%" }} />
              <span className="brand-text">
                <span className="brand-name">{business.name}</span>
              </span>
            </Link>
            <p style={{ marginTop: 18 }}>{business.intro}</p>
            <div className="socials" style={{ marginTop: 22 }}>
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <IconInstagram width="18" height="18" />
              </a>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <IconWhatsapp width="18" height="18" />
              </a>
              <a href={`tel:${contact.phoneIntl}`} aria-label="Call">
                <IconPhone width="18" height="18" />
              </a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4>Our Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link to="/services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © {year} {business.name} · Photography by {business.owner}. All rights reserved.
          &nbsp;·&nbsp; Call: <a href={`tel:${contact.phoneIntl}`}>{contact.phone}</a>
          &nbsp;·&nbsp; <Link to="/admin">Manage Gallery</Link>
        </div>
      </div>
    </footer>
  )
}
