# SnapURL — Frontend

A clean, minimal URL shortener frontend built with React, Vite, and shadcn/ui. Paste a long URL, get a short one, share it, and track visit analytics.

---

## Live App

```
https://snap-url-frontend-red.vercel.app
```

---

## Tech Stack

- **Framework** — React 18
- **Build tool** — Vite
- **UI components** — shadcn/ui
- **HTTP client** — Axios
- **Hosting** — Vercel

---

## Features

- Shorten any URL instantly
- One-click copy of the short link
- View total visit count and timestamp history via analytics
- Fully connected to the live SnapURL backend API

---

## Getting Started Locally

### Prerequisites
- Node.js v18+

### Installation

```bash
git clone https://github.com/yourusername/snapurl-frontend.git
cd snapurl-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://snapurl-hf8u.onrender.com
```

For local backend development:

```env
VITE_API_URL=http://localhost:8000
```

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
snapurl-frontend/
├── src/
│   ├── api/
│   │   └── api.js          # Axios functions: shortenUrl, getAnalytics
│   ├── pages/
│   │   └── Home.jsx        # Main UI: shorten form + analytics panel
│   ├── components/ui/      # shadcn/ui components
│   ├── App.jsx
│   └── main.jsx
├── .env                    # VITE_API_URL (not committed)
└── vite.config.js
```

---

## API Integration

All API calls are in `src/api/api.js`:

```js
const BASE_URL = import.meta.env.VITE_API_URL

export const shortenUrl = (url) =>
    axios.post(`${BASE_URL}/api/link`, { url })

export const getAnalytics = (shortID) =>
    axios.get(`${BASE_URL}/api/analytics/${shortID}`)
```

The analytics function expects just the **short ID** (e.g. `kPDoCpnR`), not the full URL.

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework will auto-detect as **Vite**
4. Add the environment variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://snapurl-hf8u.onrender.com` |

5. Hit Deploy — Vercel gives you a live URL in ~1 minute.

Vercel redeploys automatically on every push to `main`.

---

## Backend

The frontend connects to the SnapURL backend API. See the [backend repo](https://github.com/yourusername/snapurl-backend) for setup, endpoints, and deployment instructions.

---

## Notes

- File names are case-sensitive on Vercel (Linux). Make sure `Home.jsx` uses an uppercase `H` — importing `./pages/Home` while the file is named `home.jsx` builds fine on Windows but breaks on Vercel.
- After shortening a URL, pass only the `shortID` field (from the API response) to the analytics input — not the full link.