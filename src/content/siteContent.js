/* =============================================================================
   CHOYAL FILMS — SITE CONTENT (THE ONLY FILE YOU NEED TO EDIT)
   =============================================================================

   Everything on the website — images, text, phone number, address, services —
   is controlled from THIS single file. You do NOT need to touch any other code.

   HOW TO CHANGE AN IMAGE
   ----------------------
   Every image below is a simple link (URL). To change a photo you have two options:

   OPTION A — Use your own image files (recommended for your real photos)
     1. Put your photo inside the folder:  public/images/
        e.g.  public/images/wedding-1.jpg
     2. Then write the path here starting with a slash:
        image: "/images/wedding-1.jpg"

   OPTION B — Use an online link (e.g. an Instagram/Google Drive/Unsplash link)
        image: "https://your-image-link.jpg"

   After changing anything, save the file — the website updates automatically
   while running `npm run dev`.
   ============================================================================= */

export const business = {
  name: "Choyal Films",
  owner: "Sunil Choyal",
  tagline: "Capturing Moments, Creating Memories.",
  // Short intro shown on the homepage "About" area.
  intro:
    "Choyal Films is a passion-driven photography studio led by Sunil Choyal. " +
    "From grand wedding celebrations to quiet, candid portraits, we tell your " +
    "story through timeless, artful frames you will treasure for a lifetime.",
  // Longer description used on the Services / About sections.
  about:
    "With an eye for light, emotion and detail, Sunil Choyal and the Choyal Films " +
    "team have been trusted to document life's most precious moments. We believe " +
    "every frame should feel honest and every album should feel like a memory " +
    "you can hold. Whether it's the joy of a wedding, the energy of an event, or " +
    "the character of a single portrait — we are here to capture it beautifully.",
  logo: "/logo.png", // Replace with "/logo.png" after you add your logo to the public/ folder.
  yearsExperience: "8+",
  happyClients: "500+",
  eventsCovered: "1200+",
}

export const contact = {
  phone: "8296813080",
  // The number used for the "click to call" and WhatsApp links (with country code, no +, no spaces).
  phoneIntl: "918296813080",
  whatsapp: "918296813080",
  email: "", // Optional — add your email here to show an email button, e.g. "hello@choyalfilms.com"
  instagram: "https://www.instagram.com/choyal_films",
  instagramHandle: "@choyal_films",

  /* ---- ADDRESS + GOOGLE MAP -------------------------------------------------
     Replace the address text with your real studio address.
     For the map, paste your location into Google Maps, and either:
       (a) leave `mapQuery` as your address text (simplest — works automatically), OR
       (b) for an exact pin, copy the "Embed a map" iframe SRC from Google Maps
           and paste it into `mapEmbedSrc` below (this overrides mapQuery).
     -------------------------------------------------------------------------- */
  address: "Add your studio address here, City, State - PIN", // TODO: replace with real address
  mapQuery: "Choyal Films", // e.g. "Choyal Films, Jodhpur, Rajasthan"
  mapEmbedSrc: "", // Optional: paste a full Google Maps embed URL here for an exact pin.
}

/* -----------------------------------------------------------------------------
   OTHER PAGE IMAGES (the remaining backgrounds + the About photo)
   Change these exactly like any other image: use a "/images/your-file.jpg" path
   (after putting the file in public/images/) or an online link.
   ----------------------------------------------------------------------------- */
export const siteImages = {
  // Homepage "About the Studio" photo, shown next to Sunil Choyal's intro.
  aboutImage:
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80",
  // Background photo behind the "Ready to Capture Your Story?" banner.
  ctaBackground:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
  // Top banner photo on the Services page.
  servicesHeader:
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1920&q=80",
  // Top banner photo on the Contact page.
  contactHeader:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80",
}

/* -----------------------------------------------------------------------------
   INSTAGRAM LIVE FEED (auto-shows your latest Instagram posts on the homepage)
   -----------------------------------------------------------------------------
   To show your real Instagram feed that updates automatically when you post:
     1. Go to a free widget site — e.g. https://lightwidget.com  or  https://snapwidget.com
     2. Connect / select your account:  @choyal_films
     3. It gives you an EMBED link (an iframe "src" URL). Copy that URL.
     4. Paste it below into `embedUrl` (keep the quotes).

   Leave `embedUrl` empty ("") to instead show a simple "Follow on Instagram"
   card that links to your profile.
   ----------------------------------------------------------------------------- */
export const instagramFeed = {
  // ⚠️ This must be a WIDGET embed link (from lightwidget.com / snapwidget.com),
  // NOT your instagram.com profile link — Instagram blocks its pages from loading
  // inside other websites, so a profile link shows a blank box.
  embedUrl: "", // e.g. "https://lightwidget.com/widgets/xxxxxxxx.html"
  height: 460, // height of the feed area in pixels
}

/* -----------------------------------------------------------------------------
   HERO SLIDES (the big rotating images at the top of the homepage)
   Add or remove slides freely. Each needs an image, and optionally text.
   ----------------------------------------------------------------------------- */
export const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
    heading: "Timeless Wedding Stories",
    subheading: "Every glance, every vow, beautifully preserved.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80",
    heading: "Moments That Matter",
    subheading: "Candid frames full of emotion and life.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80",
    heading: "Portraits With Soul",
    subheading: "Photography that reflects who you truly are.",
  },
]

/* -----------------------------------------------------------------------------
   SERVICES (shown on the Home preview + the Services page)
   Add, remove, or rename any service. `image` is the card photo.
   ----------------------------------------------------------------------------- */
export const services = [
  {
    id: "weddings",
    title: "Wedding Photography",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80",
    short: "Cinematic coverage of your big day, from haldi to vidaai.",
    details:
      "Full-day wedding coverage including candid and traditional photography, " +
      "cinematic films, pre-wedding shoots and premium albums. We capture every " +
      "ritual, emotion and celebration so you relive the day forever.",
    features: ["Candid & Traditional", "Cinematic Films", "Pre-Wedding Shoots", "Premium Albums"],
  },
  {
    id: "events",
    title: "Event Photography",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    short: "Birthdays, corporate events, functions and celebrations.",
    details:
      "Professional coverage for birthdays, anniversaries, corporate functions, " +
      "concerts and family celebrations. Crisp, vibrant photos that keep the " +
      "energy of your event alive.",
    features: ["Birthdays & Parties", "Corporate Events", "Anniversaries", "Live Coverage"],
  },
  {
    id: "portraits",
    title: "Portrait Photography",
    image:
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1200&q=80",
    short: "Studio & outdoor portraits that capture your personality.",
    details:
      "Individual, family and fashion portraits shot in studio or on location. " +
      "Thoughtfully lit and styled to bring out your best, most natural self.",
    features: ["Individual & Family", "Fashion & Model", "Studio & Outdoor", "Maternity & Newborn"],
  },
  {
    id: "prewedding",
    title: "Pre-Wedding Shoots",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    short: "Romantic story-driven shoots at stunning locations.",
    details:
      "Creative, location-based pre-wedding shoots designed around your story. " +
      "We scout beautiful backdrops and direct natural, romantic moments.",
    features: ["Location Scouting", "Concept & Styling", "Cinematic Edits", "Reels & Teasers"],
  },
]

/* -----------------------------------------------------------------------------
   GALLERY (the "Our Work" grid). Add as many photos as you like.
   `category` lets visitors filter (must match one of the filter buttons below).
   ----------------------------------------------------------------------------- */
export const galleryFilters = ["All", "Weddings", "Events", "Portraits", "Pre-Wedding"]

export const gallery = [
  { image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", category: "Weddings", alt: "Bride and groom" },
  { image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80", category: "Weddings", alt: "Wedding ceremony" },
  { image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80", category: "Portraits", alt: "Portrait" },
  { image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80", category: "Events", alt: "Event crowd" },
  { image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80", category: "Pre-Wedding", alt: "Couple pre-wedding" },
  { image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80", category: "Weddings", alt: "Wedding couple" },
  { image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=900&q=80", category: "Portraits", alt: "Woman portrait" },
  { image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80", category: "Events", alt: "Celebration" },
  { image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80", category: "Pre-Wedding", alt: "Couple outdoors" },
  { image: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?auto=format&fit=crop&w=900&q=80", category: "Portraits", alt: "Man portrait" },
  { image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&w=900&q=80", category: "Weddings", alt: "Wedding details" },
  { image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80", category: "Events", alt: "Party lights" },
]

/* -----------------------------------------------------------------------------
   TESTIMONIALS (optional social proof on the homepage). Edit or remove freely.
   ----------------------------------------------------------------------------- */
export const testimonials = [
  {
    name: "Priya & Rahul",
    role: "Wedding, 2024",
    quote:
      "Sunil and the Choyal Films team made our wedding feel like a movie. Every " +
      "photo brings back the exact emotion of that day. Truly gifted!",
  },
  {
    name: "Ankit Sharma",
    role: "Corporate Event",
    quote:
      "Professional, punctual and incredibly talented. The event coverage was " +
      "flawless and the photos exceeded our expectations.",
  },
  {
    name: "Meena Patel",
    role: "Family Portraits",
    quote:
      "The portraits are stunning. They captured our family's personality so " +
      "naturally. Highly recommend Choyal Films.",
  },
]
