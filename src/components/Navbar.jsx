import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useContent } from "../content/ContentContext.jsx"

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const { business } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => (document.body.style.overflow = "")
  }, [open])

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={business.logo} alt={`${business.name} logo`} />
          <span className="brand-text">
            <span className="brand-name">{business.name}</span>
          </span>
        </Link>

        <nav>
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/contact" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
                Book Now
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={open ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
          <span style={open ? { opacity: 0 } : {}} />
          <span style={open ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}} />
        </button>
      </div>
    </header>
  )
}
