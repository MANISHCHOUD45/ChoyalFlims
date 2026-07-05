import { createContext, useContext, useEffect, useState } from "react"
import * as fallback from "./siteContent.js"

/* =============================================================================
   CONTENT LOADER
   Loads ALL website content from /content.json at runtime, so editing that one
   JSON file (and refreshing) updates the whole site — no rebuild, no code.

   If content.json is missing or has a typo, the site falls back to the built-in
   defaults in siteContent.js so it never breaks.
   ============================================================================= */

// Built-in defaults (safety net). Also fills in any keys omitted from the JSON.
const DEFAULT_CONTENT = {
  business: fallback.business,
  contact: fallback.contact,
  siteImages: fallback.siteImages,
  instagramFeed: fallback.instagramFeed,
  heroSlides: fallback.heroSlides,
  services: fallback.services,
  galleryFilters: fallback.galleryFilters,
  gallery: fallback.gallery,
  testimonials: fallback.testimonials,
}

const ContentContext = createContext(DEFAULT_CONTENT)

export function useContent() {
  return useContext(ContentContext)
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    let alive = true
    // `no-store` so your edits to content.json show up on refresh (no stale cache).
    fetch(import.meta.env.BASE_URL + "content.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("content.json not found"))))
      .then((data) => {
        if (alive) setContent({ ...DEFAULT_CONTENT, ...data })
      })
      .catch((err) => {
        // Bad JSON or missing file — use defaults so the site still works.
        console.warn("[Choyal Films] Using built-in content:", err.message)
        if (alive) setContent(DEFAULT_CONTENT)
      })
    return () => {
      alive = false
    }
  }, [])

  if (!content) {
    return (
      <div className="site-loader">
        <img src={DEFAULT_CONTENT.business.logo} alt="" />
        <div className="site-loader-spin" />
        <span>{DEFAULT_CONTENT.business.name}</span>
      </div>
    )
  }

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}
