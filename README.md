# LandVault — Verify Before You Buy Land

**LandHack 2026 · CSE-TECH, DIU · Track: Digital Land Records, Verification & Digitization**
**Problem statements addressed:** P5 (Citizen Pre-Purchase Verification) with a P3 (Fraud & Double-Selling Detection) engine underneath.

LandVault is a citizen-facing land-record verification portal. A buyer enters a dag / khatian / mouza / owner name and gets one verified dossier per plot:

- **Ownership chain** across all four survey generations (CS → SA → RS → BS) with khatian references
- **Mutation & transfer history** with registration/mutation status
- **Registered documents** with cryptographic hash status
- **Explainable fraud-risk score (0–100)** from 6 deterministic signals: double sale (+45), deed hash mismatch (+40), ownership chain break (+30), registration–mutation gap (+20), suspicious rapid resale (+20), pending litigation / khas / acquisition (+15 each)
- **Deed authenticity checker** — paste a deed number + the hash from the paper copy; a tamper-simulation demo shows forgery detection
- **Buyer's checklist** generated from the detected signals
- **Full Bangla / English UI toggle**, "B — Gov Portal" design (team-selected)

## Repo layout

| Path | What it is |
|---|---|
| `index.html` | Offline MVP — 12-plot synthetic registry, single file, zero network calls. Open in any browser. |
| `frontend/` | React 19 + Vite + Tailwind app (Gov Portal skin): Home search, Plot dossier, Deed verify, Methodology — 4 routes. |
| `backend/` | FastAPI + SQLAlchemy API: plot search, dossier, deed verification, registry stats (5 endpoints). |
| `docs/` | UI/UX + full-stack design blueprint. |
| `design-options/` | Design alternatives explored before the team picked option B. |

## Data

**100% synthetic.** 12 hand-written demo plots (Dhaka, Gazipur, Cumilla, Chattogram) + 9,988 deterministically generated plots (seeded PRNG, seed `20261005` — the same seed always produces the same registry). No real persons, plots, deeds or NID numbers are used. No government portals were accessed or scraped — per the LandHack 2026 rulebook.

Scripted fraud cases for the demo:

| Plot | Scenario | Risk score / tier | What the judge sees |
|---|---|---|---|
| SV-001 | Clean plot, unbroken chain | 0 / Low | A clean verdict with the full chain to back it |
| SV-007 | Double-sold plot | 100 / Critical | The engine's heaviest signal (+45) fires; dossier shows both claimants |
| SV-009 | Forged deed | 90 / Critical | Deed-hash mismatch (+40); tamper simulation proves the forgery |

Search is capped at 24 results as-you-type; API scores match the offline MVP exactly.

## Run

**Offline MVP (fastest demo):** open `index.html` in any modern browser. No build step, no backend, no network.

**Full stack:**

```bash
cd backend && pip install -r requirements.txt && uvicorn app.main:app   # seeds the registry on first boot
cd ../frontend && npm install && npm run dev                            # second terminal
```

API surface: `GET /api/health`, `GET /api/plots/search`, `GET /api/plots/{plot_id}`, `GET /api/registry/stats`, `POST /api/deeds/verify`. `Dockerfile` + compose included; see `backend/`.

## Demo script (60 seconds)

1. Click **⚠ Double-sold plot** → dossier opens at 100/CRITICAL with 4 explained signals.
2. Scroll the ownership chain CS → SA → RS → BS and the mutation table showing the same plot sold twice.
3. Click **Verify →** on deed DL-2025-01208, then **Simulate a tampered copy** → hash mismatch verdict.
4. Toggle **বাং** for the full Bangla UI.

## Verification status

- Backend: 22/22 pytest passing (risk engine + API, incl. API-vs-MVP score parity)
- Frontend: 23/23 headless-Chrome checks, zero console errors (Gov Portal rebuild)

## AI assistance disclosure

Per the LandHack 2026 rulebook: this project was built with AI coding assistance (Muse, Meta). All code, data and logic were reviewed and are fully explainable by the team. The deterministic risk engine contains no ML black box — every point of risk maps to a visible record.

## License / IP

Team retains full IP ownership per the hackathon rulebook. Demo code shared for judging purposes.
