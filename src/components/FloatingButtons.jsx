import { useContent } from "../content/ContentContext.jsx"
import { IconWhatsapp, IconPhone } from "./Icons.jsx"

/* Always-visible quick-action buttons for calling or WhatsApp. */
export default function FloatingButtons() {
  const { contact } = useContent()
  const waText = encodeURIComponent(
    "Hello Choyal Films, I'd like to enquire about a photography booking."
  )
  return (
    <div className="floating">
      <a
        className="wa"
        href={`https://wa.me/${contact.whatsapp}?text=${waText}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <IconWhatsapp />
      </a>
      <a className="call" href={`tel:${contact.phoneIntl}`} aria-label="Call now">
        <IconPhone />
      </a>
    </div>
  )
}
