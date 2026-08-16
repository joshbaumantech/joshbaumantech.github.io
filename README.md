# Bauman Consulting Group — website

A single-page static site. No build step, no dependencies, no framework. Three files do the work: `index.html`, `styles.css`, `script.js`.

---

## Before you publish — replace these placeholders

| Placeholder | Where | Replace with |
|---|---|---|
| `(636) 555-0100` | `index.html` (hero plaque, contact section), `script.js` | Real phone. Also update the `tel:+16365550100` links. |
| `josh@baumanconsultinggroup.com` | `index.html`, `script.js` | Real email address |
| `YOUR_FORM_ID` | `index.html` (form `action`) | Formspree form ID — see below |

`555-0100` is a reserved fictional number and the email is a guess. Both need to be real before this goes live.

---

## Publish it on GitHub Pages

1. Create a new repository on GitHub — for example `bauman-consulting-group`.
2. Upload `index.html`, `styles.css`, `script.js`, and `.nojekyll` to the repository root.
   From the command line:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/bauman-consulting-group.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**. Set branch to `main` and folder to `/ (root)`. Save.
5. Wait about a minute. The site appears at `https://YOUR-USERNAME.github.io/bauman-consulting-group/`.

### Using a custom domain (recommended)

If you own something like `baumanconsultinggroup.com`:

1. In **Settings → Pages → Custom domain**, enter the domain and save. GitHub creates a `CNAME` file in the repo.
2. At your domain registrar, add these DNS records:

   **Apex domain** (`baumanconsultinggroup.com`) — four `A` records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   **Subdomain** (`www.baumanconsultinggroup.com`) — one `CNAME` record pointing to `YOUR-USERNAME.github.io`

3. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate is issued (usually within an hour).

---

## The contact form

GitHub Pages serves static files only, so it can't process form submissions on its own. The form uses [Formspree](https://formspree.io), which has a free tier:

1. Sign up and create a form. Formspree gives you an ID like `xayzqwer`.
2. In `index.html`, change `action="https://formspree.io/f/YOUR_FORM_ID"` to your ID.
3. Confirm the email address Formspree sends you.

Until that's configured, the form falls back to opening the visitor's email client with the message pre-filled — so it still works, just less smoothly.

---

## Editing content

Everything is plain HTML with commented sections. The pieces you'll most likely want to change:

- **Services** — the six `<article class="card">` blocks in the `#services` section.
- **Approach** — the three `<li>` items in the `.steps` list.
- **Bio** — the `#principal` section and the "At a glance" panel beside it.
- **Industries** — the `<li>` items in `.chips`.

### Colors and type

Everything is defined once at the top of `styles.css`:

```css
--petrol:  #0F3B3E;   /* primary dark green */
--brass:   #C08A16;   /* accent */
--mineral: #E7EDEA;   /* section wash */
--paper:   #F7F9F8;   /* page background */
--ink:     #101A1C;   /* text */
```

Change a value there and it updates everywhere.

Fonts load from Google Fonts: Bricolage Grotesque (headings), Source Serif 4 (body), IBM Plex Mono (labels).

---

## A note on the bio

The credentials listed — MS-ISAC Executive Committee, Missouri State Cybersecurity Committee, Missouri Student Data Privacy Alliance, K12 Tech Talk, EdTech Magazine 2025 — come from publicly available sources. Verify each one reads the way Josh wants it to before publishing, and consider whether to mention his current full-time employer anywhere on a consulting site.

## Suggested additions later

- A headshot in the `#principal` section
- One or two client testimonials
- A privacy policy page if you add analytics
- A Google Business Profile, which does more for local search than anything on the site itself
