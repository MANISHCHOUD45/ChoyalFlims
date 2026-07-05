import { createContext, useContext, useEffect, useState } from "react"
import * as fallback from "./siteContent.js"

/* =============================================================================
   CONTENT LOADER
   Content is resolved in this order:
     1. VITE_CONTENT_URL   — a URL (set in .env) to fetch the content JSON from
        at runtime, e.g. a hosted JSON API. When set, it wins. Content behind
        the URL is live: edit it and refresh — no rebuild needed.
     2. /content.json      — the local file shipped with the build (fallback).
     3. siteContent.js     — built-in defaults, so the site never breaks even if
        the URL/file is missing or invalid. Also fills in any omitted keys.
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

    // Content source URL, set in .env as VITE_CONTENT_URL (e.g. a hosted JSON
    // API). Leave it unset to use the local /content.json shipped with the build.
    const remoteUrl = import.meta.env.VITE_CONTENT_URL
    const localUrl = import.meta.env.BASE_URL + "content.json"

    // `no-store` so content edits show up on refresh (no stale cache).
    async function loadContent() {
      // 1) Remote content API from .env, if configured.
      if (remoteUrl) {
        try {
          const r = await fetch(remoteUrl, { cache: "no-store" })
          if (r.ok) return await r.json()
          console.warn("[Choyal Films] Remote content HTTP", r.status)
        } catch (err) {
          console.warn("[Choyal Films] Remote content failed:", err.message)
        }
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
