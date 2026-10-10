# LandVault — Phase-2 Frontend (React + Vite + Tailwind)

Citizen land-record verification portal ("Verify before you buy land") for **LandHack 2026 · CSE-TECH, DIU**.

## Run

```bash
cd frontend
npm install
npm run dev        # → http://localhost:5173
```

## Build

```bash
npm run build      # → dist/
npm run preview    # serve the production build locally
```

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | FastAPI backend base URL |

Copy `.env.example` to `.env` to override.

## Data modes

- **API mode** — on startup the app probes `GET {VITE_API_URL}/api/health`. If reachable, all
  search / dossier / stats / deed-verify calls go to the backend (see `../docs/API.md`).
- **Offline mode** — if the API is unreachable, the app falls back to the bundled synthetic
  registry: the exact seeded generator + risk engine extracted from the Phase-1 MVP
  (`src/lib/registry.js`, seed `20261005`, 10,000 plots). A small "offline demo data" note
  appears in the header. Both modes are fully functional.

## Routes (HashRouter — works from `file://` and any static host)

| Route | Page |
|---|---|
| `#/` | Home: hero search, demo cases, registry overview, deed verifier, how-it-works |
| `#/plot/:id` | Verification dossier: risk dial, signals, CS→SA→RS→BS chain, mutations, documents, checklist |
| `#/verify` | Deed authenticity checker (accepts `?deed=` + `?hash=`) |
| `#/methodology` | The six fraud signals, tier bands, honesty statement |

## Project layout

```
src/
  lib/
    strings.js    EN/BN dictionary (extracted from Phase-1 MVP)
    registry.js   synthetic registry generator + deterministic risk engine (extracted)
    i18n.jsx      LangProvider / useLang / t()
    api.js        data layer: backend client with offline fallback
  components/     Header, PlotCard, Overview, Verifier, RiskDial, TierBadge, Footer
  pages/          Home, Dossier, VerifyPage, Methodology
```

`src/lib/strings.js` and `src/lib/registry.js` are auto-extracted from
`../index.html` (the Phase-1 MVP) by `/tmp/extract-modules.js` — do not hand-edit them.

## AI-assistance disclosure

Per the LandHack 2026 rulebook: this project was built with AI coding assistance
(Muse, Meta). All code, data and logic were reviewed and are fully explainable by the
team. The risk engine is deterministic — every point of risk maps to a visible record.

## Demo data

100% synthetic. No real persons, plots, deeds or NIDs. No government portals were
accessed or scraped.
