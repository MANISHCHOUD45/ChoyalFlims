import { useState } from "react"
import { Link } from "react-router-dom"
import { useContent } from "../content/ContentContext.jsx"
import { getGallery, setGallery, resetGallery } from "../content/galleryStore.js"

// Password for the Manage Gallery area. Change it here anytime.
const ADMIN_PASSWORD = "choyalFlims"
const AUTH_KEY = "choyalfilms.admin.unlocked"

/* Shrinks an uploaded photo before storing it, so the browser storage
   (localStorage) doesn't fill up. Returns a compressed data URL. */
function resizeImage(file, maxDim = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else if (height >= width && height > maxDim) {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        canvas.getContext("2d").drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL("image/jpeg", quality))
      }
      img.onerror = reject
      img.src = reader.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function AdminPanel({ onLogout }) {
  const { galleryFilters, gallery: defaultGallery } = useContent()
  const categories = galleryFilters.filter((c) => c !== "All")
  const [items, setItems] = useState(() => getGallery(defaultGallery))
  const [category, setCategory] = useState(categories[0] || "")
  const [url, setUrl] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState({ text: "", type: "ok" })
  const [exported, setExported] = useState("")

  const say = (text, type = "ok") => setMsg({ text, type })

  // Save a new list to the store; reports if the browser storage is full.
  const commit = (next) => {
    const res = setGallery(next)
    if (!res.ok) {
      say(
        "Could not save — your browser storage is full. Tip: use image LINKS (URLs) instead of uploads, or remove a few photos.",
        "error"
      )
      return false
    }
    setItems(next)
    return true
  }

  const addByUrl = () => {
    const clean = url.trim()
    if (!clean) return say("Please paste an image link first.", "error")
    if (commit([{ id: Date.now(), image: clean, category, alt: "" }, ...items])) {
      setUrl("")
      say("Photo link added — it now shows at the top of the home page.")
    }
  }

  const addByFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    say("Processing image…")
    try {
      const dataUrl = await resizeImage(file)
      if (commit([{ id: Date.now(), image: dataUrl, category, alt: file.name }, ...items])) {
        say("Photo uploaded — it now shows at the top of the home page.")
      }
    } catch {
      say("Sorry, that file could not be read as an image.", "error")
    } finally {
      setBusy(false)
      e.target.value = ""
    }
  }

  const remove = (i) => {
    if (window.confirm("Remove this photo from the gallery?")) {
      commit(items.filter((_, idx) => idx !== i))
      say("Photo removed.")
    }
  }

  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = items.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    commit(next)
  }

  const changeCategory = (i, cat) => {
    const next = items.slice()
    next[i] = { ...next[i], category: cat }
    commit(next)
  }

  const reset = () => {
    if (window.confirm("Reset the gallery back to the original photos? This clears your changes on this device.")) {
      resetGallery()
      setItems(getGallery(defaultGallery))
      say("Gallery reset to the original photos.")
    }
  }

  // Copies the current list as JSON, to paste into content.json's "gallery"
  // and make the gallery permanent for ALL visitors.
  const exportCode = async () => {
    const clean = items.map(({ image, category, alt }) => ({ image, category, alt: alt || "" }))
    const hasUploads = clean.some((g) => g.image.startsWith("data:"))
    const code = JSON.stringify(clean, null, 2)
    try {
      await navigator.clipboard.writeText(code)
      say(
        hasUploads
          ? "Copied! Note: uploaded photos become very long text. For a permanent site-wide gallery, prefer image LINKS. In public/content.json, replace the value of \"gallery\" with this."
          : 'Copied! In public/content.json, replace the value of "gallery" with this to make it permanent for all visitors.'
      )
    } catch {
      say("Could not copy automatically — please copy the code shown in the box below.", "error")
      setExported(code)
    }
  }

  return (
    <section className="section admin" style={{ paddingTop: 140 }}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 28 }}>
          <p className="eyebrow">Owner Area · {business.name}</p>
          <h2 className="section-title">Manage Gallery Photos</h2>
          <div className="divider" />
        </div>

        <div className="admin-note">
          <strong>How this works:</strong> add, remove or reorder your gallery photos below —
          no coding needed. Changes appear instantly on the <Link to="/">website</Link> and are
          saved on <em>this device/browser only</em>. To publish them for everyone, use
          <strong> “Copy for website”</strong> at the bottom.
        </div>

        {/* ADD PHOTO */}
        <div className="admin-panel">
          <h3>Add a Photo</h3>
          <div className="field" style={{ maxWidth: 260 }}>
            <label htmlFor="cat">Category</label>
            <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="admin-add-row">
            <div className="field">
              <label htmlFor="url">Paste an image link (URL)</label>
              <input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://…  (e.g. an image link)"
                onKeyDown={(e) => e.key === "Enter" && addByUrl()}
              />
            </div>
            <button className="btn btn-primary" onClick={addByUrl}>Add Link</button>

            <span className="admin-or">or</span>

            <label className={`btn btn-outline admin-upload ${busy ? "disabled" : ""}`}>
              {busy ? "Uploading…" : "Upload from Device"}
              <input type="file" accept="image/*" hidden disabled={busy} onChange={addByFile} />
            </label>
          </div>
        </div>

        {msg.text && <div className={`admin-msg ${msg.type === "error" ? "error" : ""}`}>{msg.text}</div>}

        {/* CURRENT PHOTOS */}
        <h3 style={{ color: "var(--cream)", margin: "8px 0 18px", fontSize: "1.4rem" }}>
          Current Photos ({items.length})
        </h3>

        {items.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No photos yet — add one above.</p>
        ) : (
          <div className="admin-grid">
            {items.map((item, i) => (
              <div className="admin-card" key={item.id || item.image + i}>
                <img className="thumb" src={item.image} alt={item.alt || "gallery photo"} />
                <div className="body">
                  <select value={item.category} onChange={(e) => changeCategory(i, e.target.value)}>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="admin-card-actions">
                    <button className="icon-btn" title="Move left" onClick={() => move(i, -1)} disabled={i === 0}>←</button>
                    <button className="icon-btn" title="Move right" onClick={() => move(i, 1)} disabled={i === items.length - 1}>→</button>
                    <button className="icon-btn danger" title="Delete" onClick={() => remove(i)}>✕ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="admin-bar">
          <button className="btn btn-primary" onClick={exportCode}>Copy for Website (make permanent)</button>
          <button className="btn btn-outline" onClick={reset}>Reset to Original Photos</button>
          <Link to="/" className="btn btn-outline">View Website</Link>
          <button className="btn btn-outline" onClick={onLogout}>Log Out</button>
        </div>

        {exported && (
          <textarea
            className="admin-export"
            readOnly
            value={exported}
            onFocus={(e) => e.target.select()}
          />
        )}
      </div>
    </section>
  )
}

/* Password gate — shows the panel only after the correct password is entered. */
export default function Admin() {
  const { business } = useContent()
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "yes"
    } catch {
      return false
    }
  })
  const [pw, setPw] = useState("")
  const [error, setError] = useState("")

  const logout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY)
    } catch {
      /* ignore */
    }
    setUnlocked(false)
    setPw("")
  }

  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_KEY, "yes")
      } catch {
        /* ignore */
      }
      setUnlocked(true)
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
      setPw("")
    }
  }

  if (unlocked) return <AdminPanel onLogout={logout} />

  return (
    <section className="section" style={{ paddingTop: 160, minHeight: "72vh" }}>
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="section-head" style={{ marginBottom: 24 }}>
          <p className="eyebrow">Owner Area</p>
          <h2 className="section-title">Manage Gallery</h2>
          <div className="divider" />
        </div>
        <form className="contact-form" onSubmit={submit}>
          <h3>Enter Password</h3>
          <p className="form-sub">This area is for {business.name} only.</p>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
              placeholder="••••••••••"
            />
          </div>
          {error && (
            <div className="admin-msg error" style={{ marginBottom: 16 }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Unlock
          </button>
        </form>
      </div>
    </section>
  )
}
