import { useEffect, useMemo, useState } from "react"
import { useContent } from "../content/ContentContext.jsx"
import { useGallery } from "../content/galleryStore.js"
import { useReveal } from "../hooks/useReveal.js"

export default function Gallery({ showFilters = true, limit }) {
  const { galleryFilters, gallery: defaultGallery } = useContent()
  const gallery = useGallery(defaultGallery)
  const [filter, setFilter] = useState("All")
  const [lightbox, setLightbox] = useState(null) // index into `filtered`

  const filtered = useMemo(() => {
    const list = filter === "All" ? gallery : gallery.filter((g) => g.category === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit, gallery])

  useReveal([filter, filtered.length])

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % filtered.length)
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [lightbox, filtered.length])

  return (
    <>
      {showFilters && (
        <div className="gallery-filters">
          {galleryFilters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <div className="gallery-grid">
        {filtered.map((item, i) => (
          <div
            className="gallery-item reveal"
            key={item.image + i}
            onClick={() => setLightbox(i)}
            style={{ transitionDelay: `${(i % 6) * 60}ms` }}
          >
            <img src={item.image} alt={item.alt || "Choyal Films photography"} loading="lazy" />
            <div className="g-overlay">
              <span>+</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
            ✕
          </button>
          <button
            className="lb-nav lb-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
            }}
          >
            ‹
          </button>
          <img
            src={filtered[lightbox].image}
            alt={filtered[lightbox].alt || "Choyal Films photography"}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-nav lb-next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i + 1) % filtered.length)
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
