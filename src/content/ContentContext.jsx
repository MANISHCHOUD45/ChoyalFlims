import { createContext, useContext, useEffect, useState } from "react"
import * as fallback from "./siteContent.js"

/* =============================================================================
   CONTENT LOADER
   Content is resolved in this order:
     1. VITE_CONTENT_JSON  — the ENTIRE content object embedded in .env as a
        JSON string (plain JSON.stringify output, or base64 of it). When set,
        it wins. Baked in at build time, so changing it needs a rebuild.
     2. /content.json      — the local file shipped with the build (edit + refresh,
        no rebuild needed).
     3. siteContent.js     — built-in defaults, so the site never breaks even if
        the JSON is missing or has a typo. Also fills in any omitted keys.
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

    // The whole content object, embedded in .env as a JSON string.
    // Leave it unset to use the local /content.json instead.
    const inlineJson = import.meta.env.VITE_CONTENT_JSON
    const localUrl = import.meta.env.BASE_URL + "content.json"

    // Accept either a plain JSON.stringify(...) string or a base64 of one.
    // (base64 sidesteps all the quoting headaches of pasting big JSON into .env.)
    function parseInline(raw) {
      const value = String(raw).trim()
      if (!value) return null
      try {
        return JSON.parse(value)
      } catch {
        try {
          return JSON.parse(atob(value))
        } catch (err) {
          console.warn("[Choyal Films] VITE_CONTENT_JSON is not valid JSON:", err.message)
          return null
        }
      }
    }

    // `no-store` so edits to content.json show up on refresh (no stale cache).
    async function loadContent() {
      // 1) Whole content JSON from .env, if provided.
      if (inlineJson) {
        const parsed = parseInline(inlineJson)
        if (parsed) return parsed
      }
      // 2) Fall back to the local content.json shipped with the build.
      const r = await fetch(localUrl, { cache: "no-store" })
      if (!r.ok) throw new Error("content.json not found")
      return await r.json()
    }

    loadContent()
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
