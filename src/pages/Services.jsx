import { Link } from "react-router-dom"
import { useContent } from "../content/ContentContext.jsx"
import Gallery from "../components/Gallery.jsx"
import { useReveal } from "../hooks/useReveal.js"

export default function Services() {
  const { services, business, siteImages } = useContent()
  useReveal([])

  return (
    <>
      <section
        className="page-header"
        style={{ backgroundImage: `url(${siteImages.servicesHeader})` }}
      >
        <div className="page-header-content">
          <h1>Our Services</h1>
          <p className="breadcrumb">Home / Services</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Crafted For Every Occasion</p>
            <h2 className="section-title">Photography That Tells Your Story</h2>
            <div className="divider" />
            <p>
              {business.name} offers a full range of professional photography and
              filmmaking services. Choose the experience that fits your moment.
            </p>
          </div>

          {services.map((s, i) => (
            <div
              className={`service-row reveal ${i % 2 === 1 ? "reverse" : ""}`}
              key={s.id}
              id={s.id}
            >
              <div className="service-row-media">
                <img src={s.image} alt={s.title} loading="lazy" />
              </div>
              <div className="service-row-copy">
                <p className="eyebrow">Service {String(i + 1).padStart(2, "0")}</p>
                <h3>{s.title}</h3>
                <p>{s.details}</p>
                {s.features?.length > 0 && (
                  <ul className="feature-list">
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
                <Link
                  to={`/contact?service=${s.id}`}
                  className="btn btn-primary"
                  style={{ marginTop: 28 }}
                >
                  Enquire About {s.title.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio with filters */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our Portfolio</p>
            <h2 className="section-title">Recent Work</h2>
            <div className="divider" />
            <p>Filter by category to explore the moments we've captured.</p>
          </div>
          <Gallery showFilters={true} />
        </div>
      </section>

      <section
        className="cta-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(15,13,10,0.85), rgba(15,13,10,0.9)), url(${siteImages.ctaBackground})`,
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Let's Work Together
          </p>
          <h2>Have an Occasion in Mind?</h2>
          <p>
            Tell us about your event and we'll craft a package that's just right for
            you. Availability fills up fast — reach out today.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
