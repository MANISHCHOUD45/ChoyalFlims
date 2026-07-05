import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useContent } from "../content/ContentContext.jsx"
import { useReveal } from "../hooks/useReveal.js"
import {
  IconPhone,
  IconWhatsapp,
  IconInstagram,
  IconLocation,
  IconMail,
  IconClock,
} from "../components/Icons.jsx"

export default function Contact() {
  const { business, contact, services, siteImages } = useContent()
  useReveal([])
  const [params] = useSearchParams()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: params.get("service") || "",
    date: "",
    message: "",
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // No backend needed: submitting composes a ready-to-send WhatsApp message.
  const handleSubmit = (e) => {
    e.preventDefault()
    const serviceLabel =
      services.find((s) => s.id === form.service)?.title || form.service || "General enquiry"
    const text =
      `*New Booking Enquiry — ${business.name}*%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Service:* ${serviceLabel}%0A` +
      `*Preferred Date:* ${form.date || "Not specified"}%0A` +
      `*Message:* ${form.message || "-"}`
    window.open(`https://wa.me/${contact.whatsapp}?text=${text}`, "_blank")
  }

  // Build the Google Maps embed src (exact pin if provided, else search by address).
  const mapSrc = contact.mapEmbedSrc
    ? contact.mapEmbedSrc
    : `https://www.google.com/maps?q=${encodeURIComponent(
        contact.mapQuery || contact.address
      )}&output=embed`

  return (
    <>
      <section
        className="page-header"
        style={{ backgroundImage: `url(${siteImages.contactHeader})` }}
      >
        <div className="page-header-content">
          <h1>Contact Us</h1>
          <p className="breadcrumb">Home / Contact</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* LEFT: info */}
          <div className="contact-info reveal">
            <p className="eyebrow">Get In Touch</p>
            <h2>Let's Talk About Your Story</h2>
            <p>
              Ready to book {business.name} for your special moment? Reach out
              through any of the options below or send us a quick enquiry — we
              usually respond within a few hours.
            </p>

            <div className="info-item">
              <div className="ic"><IconPhone width="20" height="20" /></div>
              <div>
                <h4>Call Us</h4>
                <a href={`tel:${contact.phoneIntl}`}>{contact.phone}</a>
              </div>
            </div>

            <div className="info-item">
              <div className="ic"><IconWhatsapp width="20" height="20" /></div>
              <div>
                <h4>WhatsApp</h4>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>

            <div className="info-item">
              <div className="ic"><IconInstagram width="20" height="20" /></div>
              <div>
                <h4>Instagram</h4>
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  {contact.instagramHandle}
                </a>
              </div>
            </div>

            {contact.email && (
              <div className="info-item">
                <div className="ic"><IconMail width="20" height="20" /></div>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </div>
            )}

            <div className="info-item">
              <div className="ic"><IconLocation width="20" height="20" /></div>
              <div>
                <h4>Studio Address</h4>
                <p>{contact.address}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="ic"><IconClock width="20" height="20" /></div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon – Sun · 9:00 AM – 8:00 PM</p>
              </div>
            </div>

            <div className="contact-actions">
              <a href={`tel:${contact.phoneIntl}`} className="btn btn-primary">
                Call Now
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="contact-form reveal" style={{ transitionDelay: "120ms" }}>
            <h3>Book Your Session</h3>
            <p className="form-sub">
              Fill in the details and we'll get right back to you.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={update}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    required
                    placeholder="Your phone"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="service">Service</label>
                  <select id="service" name="service" value={form.service} onChange={update}>
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="date">Preferred Date</label>
                  <input id="date" name="date" type="date" value={form.date} onChange={update} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Tell us about your event, venue, guest count, etc."
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Send Enquiry via WhatsApp
              </button>
              <div className="form-note">
                Tapping send opens WhatsApp with your details pre-filled — just press
                send to reach {business.owner} directly.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section section-alt" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Find Us</p>
            <h2 className="section-title">Our Location</h2>
            <div className="divider" />
          </div>
          <div className="map-wrap reveal">
            <iframe
              title={`${business.name} location`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}
