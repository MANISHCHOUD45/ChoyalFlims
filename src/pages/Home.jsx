import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useContent } from "../content/ContentContext.jsx"
import Gallery from "../components/Gallery.jsx"
import InstagramFeed from "../components/InstagramFeed.jsx"
import { useReveal } from "../hooks/useReveal.js"
import { IconArrow } from "../components/Icons.jsx"

function Hero() {
  const { business, heroSlides } = useContent()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const slide = heroSlides[active] || {}

  return (
    <section className="hero">
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === active ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={i !== active}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-content" key={active}>
        <p className="eyebrow">{business.tagline}</p>
        <h1>{slide.heading || business.name}</h1>
        <p>{slide.subheading || business.intro}</p>
        <div className="hero-actions">
          <Link to="/contact" className="btn btn-primary">
            Book a Session <IconArrow width="16" height="16" />
          </Link>
          <Link to="/services" className="btn btn-outline">
            Explore Services
          </Link>
        </div>
      </div>

      {heroSlides.length > 1 && (
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={i === active ? "active" : ""}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function Stats() {
  const { business } = useContent()
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="stats">
          <div className="stat reveal">
            <h3>{business.yearsExperience}</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat reveal" style={{ transitionDelay: "80ms" }}>
            <h3>{business.happyClients}</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat reveal" style={{ transitionDelay: "160ms" }}>
            <h3>{business.eventsCovered}</h3>
            <p>Events Covered</p>
          </div>
          <div className="stat reveal" style={{ transitionDelay: "240ms" }}>
            <h3>4.9★</h3>
            <p>Client Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const { business, siteImages } = useContent()
  return (
    <section className="section">
      <div className="container about-grid">
        <div className="about-media reveal">
          <img src={siteImages.aboutImage} alt="Sunil Choyal behind the camera" />
          <div className="badge">
            <strong>{business.yearsExperience}</strong>
            <span>Years of Artistry</span>
          </div>
        </div>
        <div className="about-copy reveal" style={{ transitionDelay: "120ms" }}>
          <p className="eyebrow">About the Studio</p>
          <h2 className="section-title" style={{ textAlign: "left" }}>
            Meet {business.owner}
          </h2>
          <p style={{ marginTop: 20 }}>{business.intro}</p>
          <p>{business.about}</p>
          <p className="signature">— {business.owner}</p>
          <Link to="/contact" className="btn btn-outline" style={{ marginTop: 26 }}>
            Work With Us
          </Link>
        </div>
      </div>
    </section>
  )
}

function ServicesPreview() {
  const { services } = useContent()
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">What We Offer</p>
          <h2 className="section-title">Our Photography Services</h2>
          <div className="divider" />
          <p>
            From weddings to portraits, we craft visual stories tailored to every
            occasion. Explore what we can create together.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <Link
              to="/services"
              className="service-card reveal"
              key={s.id}
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <img src={s.image} alt={s.title} loading="lazy" />
              <div className="overlay">
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="card-link">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Our Portfolio</p>
          <h2 className="section-title">A Glimpse of Our Work</h2>
          <div className="divider" />
          <p>Every frame tells a story. Every photo you add appears right here.</p>
        </div>
        <Gallery showFilters={false} />
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link to="/services" className="btn btn-primary">
            Explore by Category
          </Link>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const { testimonials } = useContent()
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Kind Words</p>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="divider" />
        </div>
        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div className="testi-card reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="quote-mark">“</div>
              <p>{t.quote}</p>
              <div className="who">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  const { siteImages } = useContent()
  return (
    <section
      className="cta-banner"
      style={{
        backgroundImage: `linear-gradient(rgba(15,13,10,0.85), rgba(15,13,10,0.9)), url(${siteImages.ctaBackground})`,
      }}
    >
      <div className="container">
        <p className="eyebrow" style={{ color: "var(--gold-light)" }}>
          Let's Create Together
        </p>
        <h2>Ready to Capture Your Story?</h2>
        <p>
          Whether it's your wedding, a special event, or a portrait session — let's
          make it unforgettable. Get in touch to check availability and pricing.
        </p>
        <Link to="/contact" className="btn btn-primary">
          Book Your Session
        </Link>
      </div>
    </section>
  )
}

export default function Home() {
  useReveal([])
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ServicesPreview />
      <GallerySection />
      <Testimonials />
      <InstagramFeed />
      <CtaBanner />
    </>
  )
}
