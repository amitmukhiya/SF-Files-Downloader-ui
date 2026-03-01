# SF File Downloader — Website

Marketing & documentation website for the **SF File Downloader** Chrome Extension.

Built with **React 18** + **React Router v6**. No CSS frameworks — all styles are hand-crafted with CSS variables and component-scoped files.

---

## Project Structure

```
sf-downloader-website/
├── public/
│   └── index.html              # HTML shell + Google Fonts
├── src/
│   ├── App.js                  # Root component + BrowserRouter routing
│   ├── index.js                # ReactDOM entry point
│   ├── styles/
│   │   └── global.css          # CSS variables, reset, shared utilities
│   ├── hooks/
│   │   └── useReveal.js        # IntersectionObserver scroll-reveal hook
│   └── components/
│       ├── Navbar.jsx           # Sticky top navigation
│       ├── Navbar.css
│       ├── Footer.jsx           # Site footer with links
│       ├── Footer.css
│       └── pages/
│           ├── Home.jsx         # Landing page: hero, features, quick start
│           ├── Home.css
│           ├── Documentation.jsx  # Tabbed docs with sidebar navigation
│           ├── Documentation.css
│           ├── ReleaseNotes.jsx   # Changelog
│           ├── ReleaseNotes.css
│           ├── PrivacyPolicy.jsx  # Google CWS-compliant privacy policy
│           └── PrivacyPolicy.css
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm 8 or higher

### Install & Run

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, feature grid, SOQL quick-start |
| `/documentation` | Documentation | Sidebar + tabbed: Installation, Export, Downloads, AI, S3, FAQ |
| `/release-notes` | Release Notes | Changelog by version |
| `/privacy-policy` | Privacy Policy | Google Chrome Web Store compliant policy (13 sections) |

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#141210` | Primary text, borders, backgrounds |
| `--accent` | `#d4500a` | Active states, CTAs, highlights |
| `--accent2` | `#1a56db` | Links, info callouts |
| `--accent3` | `#0e7a4e` | Success, "Never" tags, NEW badges |
| `--bg` | `#f5f4f0` | Page background |
| `--paper` | `#ffffff` | Card/panel backgrounds |

Fonts: **DM Sans** (body) + **DM Mono** (code, labels)

---

## Deployment

The build output in `build/` is a standard static site. Deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: drag `build/` folder to app.netlify.com
- **GitHub Pages**: use `gh-pages` package with `"homepage"` in package.json

For React Router to work on deployed static hosts, configure the host to serve `index.html` for all routes (Netlify: add `_redirects` file with `/* /index.html 200`).

---

## Privacy Policy Notes

The Privacy Policy (`/privacy-policy`) is structured to satisfy the Chrome Web Store Developer Program Policies, including:
- Single purpose statement (Section 02)
- Complete data inventory table with "Transmitted To" column (Section 03)
- Per-permission justification (Section 05)
- No remotely-hosted code statement (Section 10)
- Explicit no-data-sale statement (Section 09)

Submit the URL of the hosted `/privacy-policy` page in the Chrome Web Store Developer Dashboard under **Store listing → Privacy practices**.
# SF-Files-Downloader-ui
