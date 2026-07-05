# Choyal Films — Website

Elegant, photo-centric website for **Choyal Films**, photography by **Sunil Choyal**.
Built with **React (Vite)** and **React Router**.

- Home · Services · Contact pages
- Rotating hero, portfolio gallery with filters + lightbox
- Click-to-call, WhatsApp booking, Instagram link
- Google Map embed on the Contact page
- **All images & text are editable from ONE file** — no coding needed

---

## 🚀 Run the website on your computer

You need [Node.js](https://nodejs.org) installed (version 18 or newer).

```bash
# 1. Install (only needed the first time)
npm install

# 2. Start the website (opens in your browser)
npm run dev
```

Then open the link it shows (usually **http://localhost:5173**).
The site updates live as you edit files.

To make a final version for hosting:

```bash
npm run build      # creates a "dist" folder you can upload to any host
npm run preview    # preview that final build locally
```

---

## ✏️ How to change images, text, phone number & address

**Everything on the website is controlled by ONE file:**

> `public/content.json`

This file holds all the content — business name, phone, address, services, gallery,
Instagram, and every image link. Open it in any text editor, change a value, **save,
and refresh the site** — no rebuild, no code. (On a live/hosted site, upload the edited
`content.json` and refresh — changes appear immediately.)

It is JSON, so keep the quotes and commas valid. If unsure, paste it into
[jsonlint.com](https://jsonlint.com) to check before saving.

| Section in content.json | What it controls                                        |
| ----------------------- | ------------------------------------------------------- |
| `business`              | Business name, owner name, tagline, about text, logo    |
| `contact`               | Phone, WhatsApp, Instagram, email, **address & map**    |
| `siteImages`            | About photo + the page banner/background photos         |
| `instagramFeed`         | The live Instagram feed embed link                      |
| `heroSlides`            | The big rotating photos on the homepage                 |
| `services`              | The photography services (title, photo, description)    |
| `gallery`               | The portfolio grid photos (+ their category)            |
| `testimonials`          | Client reviews on the homepage                          |

> Safety net: if `content.json` is ever missing or has a typo, the site falls back to
> the built-in defaults in `src/content/siteContent.js`, so it never goes blank.

### Changing a photo — 2 ways

**A) Use your own photo files (best for your real photos)**

1. Put your photo into the `public/images/` folder,
   e.g. `public/images/my-wedding-photo.jpg`
2. In `content.json`, set the image to that path (start with `/`):
   ```json
   "image": "/images/my-wedding-photo.jpg"
   ```

**B) Use an online link**

```json
"image": "https://link-to-your-photo.jpg"
```

> 💡 **Instagram photos:** open a photo on your Instagram
> (https://www.instagram.com/choyal_films), download it, drop it into
> `public/images/`, then use option **A** above. This is the reliable way to
> feature your Instagram work on the site.

---

## 🖼️ Adding your real logo

A placeholder gold logo (`public/logo.svg`) is used right now.
To use your actual logo:

1. Put your logo file in the `public/` folder, e.g. `public/logo.png`
2. In `siteContent.js`, change:
   ```js
   logo: "/logo.svg",   →   logo: "/logo.png",
   ```

---

## 📍 Setting your address & Google Map

In `siteContent.js`, inside `contact`:

```js
address: "Your full studio address, City, State - PIN",
mapQuery: "Choyal Films, Your City",   // used to place the map pin
```

That is enough — the map finds your location automatically.

**For an exact pin** (optional): open [Google Maps](https://maps.google.com),
search your studio → **Share → Embed a map → Copy HTML**, take the link inside
`src="..."`, and paste it into `mapEmbedSrc`:

```js
mapEmbedSrc: "https://www.google.com/maps/embed?pb=....",
```

---

## 📞 Current contact details

- **Phone / WhatsApp:** 8296813080
- **Instagram:** https://www.instagram.com/choyal_films
- **Address:** _to be added in `siteContent.js`_

> The booking form on the Contact page opens WhatsApp with the customer's
> details pre-filled and sends them straight to your number.

---

## 📁 Project structure

```
public/
  logo.svg            ← your logo (replace with logo.png)
  images/             ← put your own photos here
src/
  content/
    siteContent.js    ← 👈 EDIT THIS FILE to change everything
  components/          ← navbar, footer, gallery, icons, buttons
  pages/              ← Home, Services, Contact
  hooks/              ← scroll animations
  index.css           ← styling / colours
  App.jsx, main.jsx   ← app wiring
```

---

Made with care for **Choyal Films** — _Capturing Moments, Creating Memories._
