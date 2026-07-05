import { useContent } from "../content/ContentContext.jsx"
import { IconInstagram, IconArrow } from "./Icons.jsx"

/* Shows a live Instagram feed when `instagramFeed.embedUrl` is set in
   content.json. Until then, shows a "Follow on Instagram" card so the
   section still looks complete. */
export default function InstagramFeed() {
  const { contact, instagramFeed } = useContent()
  const hasFeed = Boolean(instagramFeed.embedUrl)

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{contact.instagramHandle}</p>
          <h2 className="section-title">Follow Us on Instagram</h2>
          <div className="divider" />
          <p>See our latest captures the moment we post them.</p>
        </div>

        {hasFeed ? (
          <div className="ig-embed reveal">
            <iframe
              title="Instagram feed"
              src={instagramFeed.embedUrl}
              scrolling="no"
              loading="lazy"
              style={{ width: "100%", height: instagramFeed.height || 460, border: 0 }}
            />
          </div>
        ) : (
          <div className="ig-cta reveal">
            <IconInstagram width="46" height="46" />
            <span className="ig-handle">{contact.instagramHandle}</span>
            <p className="ig-sub">
              Follow us for behind-the-scenes moments, latest shoots and more.
            </p>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="btn btn-primary">
              Follow on Instagram <IconArrow width="16" height="16" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
