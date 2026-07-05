/* =============================================================================
   GALLERY STORE
   Keeps the gallery photos in the browser (localStorage) so the owner can
   add / delete / change images from the /admin page — WITHOUT editing code.

   The "default" gallery now comes from content.json (passed in by the caller).
   If the owner hasn't made any admin edits, that default is used as-is.

   NOTE: admin changes are saved on THIS device/browser only. Use the
   "Copy for website" button on /admin to publish them into content.json.
   ============================================================================= */
import { useEffect, useState } from "react"

const KEY = "choyalfilms.gallery.v1"
const EVENT = "choyal-gallery-updated"

// Returns the owner's saved (admin) gallery, or null if they never edited it.
export function getStoredGallery() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (e) {
    /* ignore corrupt data */
  }
  return null
}

// The gallery to show: admin edits if present, otherwise the content.json list.
export function getGallery(fallback = []) {
  return getStoredGallery() ?? fallback
}

export function setGallery(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
    window.dispatchEvent(new Event(EVENT))
    return { ok: true }
  } catch (e) {
    // Most likely the browser storage quota was exceeded (too many uploads).
    return { ok: false, error: e }
  }
}

export function resetGallery() {
  try {
    localStorage.removeItem(KEY)
  } catch (e) {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT))
}

/* React hook: returns the live gallery list and re-renders when it changes
   (including edits made in another browser tab). `fallback` is the content.json
   gallery, used when the owner hasn't made admin edits. */
export function useGallery(fallback = []) {
  const [list, setList] = useState(() => getGallery(fallback))
  useEffect(() => {
    const handler = () => setList(getGallery(fallback))
    handler() // re-sync once fallback (content.json) is available
    window.addEventListener(EVENT, handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener(EVENT, handler)
      window.removeEventListener("storage", handler)
    }
  }, [fallback])
  return list
}
