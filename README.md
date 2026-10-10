# LandVault
### Verify Before You Buy Land — AI-Assisted Land Record Verification
**LandHack 2026 · DIU CSE-TECH · Track: Digital Land Records, Verification & Digitization**

[![GitHub Repository](https://img.shields.io/badge/GitHub-fahad3235%2Flandvault-blue.svg?logo=github)](https://github.com/fahad3235/landvault)
[![LandHack 2026](https://img.shields.io/badge/LandHack-2026-emerald.svg)](https://github.com/fahad3235/landvault)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB.svg?logo=python)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.142-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg?logo=vite)](https://vitejs.dev)
[![Deterministic](https://img.shields.io/badge/Risk%20Engine-Deterministic-orange.svg)]()
[![Synthetic Data](https://img.shields.io/badge/Data-100%25%20Synthetic-purple.svg)]()

> *"Before money moves on land, verify the record. See the chain, understand the risk, buy with confidence."*

---

## 1. Project Overview

### 1.1 The Problem Addressed
Land disputes are among the most common and most painful legal battles in Bangladesh. A buyer today has almost no practical way to verify a plot before paying:

1. **Opaque ownership history** — paper khatians across four survey generations (CS → SA → RS → BS) are hard to trace, so broken chains go unnoticed.
2. **Double-selling fraud** — the same plot is sold to multiple buyers; nothing warns the second buyer in time.
3. **Forged deeds** — tampered deed copies circulate with no easy authenticity check.
4. **Language barrier** — records and processes are hard to navigate for ordinary citizens, especially in Bangla.

**One plot rarely tells the whole story in one document.** Risk lives in the *confluence* of a double sale, a hash mismatch, a broken chain, a registration–mutation gap, a suspiciously rapid resale, and pending litigation or khas/acquisition flags.

### 1.2 Proposed Solution: LANDVAULT
**LandVault** is a citizen-facing land-record verification portal. A buyer enters a dag / khatian / mouza / owner name and gets one verified dossier per plot: ownership chain, mutation & transfer history, registered documents with hash status, an explainable fraud-risk score (0–100), a deed authenticity checker, and a buyer's checklist generated from the detected signals — in full Bangla or English.

```
                    CITIZEN SEARCH (dag / khatian / mouza / owner)
                                         │
                                         ▼
                              SYNTHETIC REGISTRY
                        (10,000 plots · seeded PRNG)
                                         │
            ┌────────────────────────────┼────────────────────────────┐
            ▼                            ▼                            ▼
     OWNERSHIP CHAIN              MUTATION HISTORY            REGISTERED DOCUMENTS
   (CS → SA → RS → BS)         (transfers, status)          (deed hash verification)
            │                            │                            │
            └────────────────────────────┼────────────────────────────┘
                                         ▼
                           DETERMINISTIC RISK ENGINE
                        (6 additive signals · score 0–100)
                                         │
                                         ▼
                          EXPLAINED VERDICT + CHECKLIST
                     (tier, signals, buyer's next steps)
```

### 1.3 Purpose & Core Philosophy
- **Deterministic Truth**: every risk point maps to a visible record. No ML black box — the engine is six weighted signals, fully auditable.
- **Explainable Verdicts**: each signal is shown with its weight and the record that triggered it, plus a concrete buyer's checklist.
- **Citizen-First**: Bangla/English toggle throughout; a zero-install offline MVP for the fastest possible demo.
- **Synthetic & Honest**: 100% synthetic data, clearly labeled. No real persons, plots, deeds, or NID numbers. No government portals were accessed or scraped — per the LandHack 2026 rulebook.

---

## 2. Features

### 2.1 Implemented Features Matrix
| Feature Module | Path | Description & Impact |
| :--- | :--- | :--- |
| **Citizen Search** | `/` (Home) | As-you-type search across dag, khatian, mouza, and owner name (capped at 24 results); empty search browses the registry. |
| **Plot Dossier** | `/dossier/:id` | One verified page per plot: ownership chain CS → SA → RS → BS, mutation & transfer table, registered documents, risk verdict with explained signals, buyer's checklist. |
| **Deed Verifier** | `/verify` | Paste a deed number + the hash from the paper copy; tamper-simulation demo proves forgery detection via hash mismatch. |
| **Methodology** | `/methodology` | Plain-language explanation of all six risk signals, weights, and tier bands — the engine with nothing to hide. |
| **Bangla / English UI** | Global toggle | Full i18n across every route ("B — Gov Portal" design, team-selected). |
| **Offline MVP** | `index.html` | Single-file, zero-network demo with a 12-plot curated registry — opens in any browser, no build step. |
| **Risk Engine API** | `backend/` | FastAPI service: search, dossier, deed verification, registry stats (5 endpoints); API scores match the offline MVP exactly. |

### 2.2 How the Risk Engine Works
Six deterministic signals, summed and capped at 100:

| Signal | Weight | Meaning |
| :--- | :--- | :--- |
| Double sale detected | +45 | Same plot claimed by more than one owner |
| Deed hash mismatch | +40 | Paper-copy hash ≠ registered hash (forgery indicator) |
| Ownership chain break | +30 | Missing khatian link across survey generations |
| Registration–mutation gap | +20 | Registered transfer never mutated in records |
| Suspicious rapid resale | +20 | Abnormally fast flip pattern |
| Pending litigation / khas / acquisition | +15 each | Legal or state encumbrance flags |

**Tiers:** `low` < 30 · `med` 30–59 · `high` 60–89 · `crit` ≥ 90.

---

## 3. Technology Stack

- **Frontend**: React 19, Vite 8.3, Tailwind CSS, React Router (4 routes)
- **Backend**: Python 3.12, FastAPI 0.142, SQLAlchemy 2.1, SQLite (seeded on first boot)
- **Data**: Deterministic synthetic registry — 10,000 plots via seeded PRNG (seed `20261005`; same seed ⇒ same registry), plus 12 hand-written curated demo plots
- **Offline MVP**: Single self-contained `index.html` (no build, no network)
- **Quality**: `pytest` backend suite · headless-Chrome frontend checks · Docker + compose included

---

## 4. Requirements & Prerequisites

- **Python**: 3.11+ (3.12 recommended) — backend only
- **Node.js**: 18+ with `npm` — frontend only
- **Browser**: any modern browser for the offline MVP
- **Optional**: Docker & Docker Compose for the containerized full stack

---

## 5. Installation and Setup

### Option A — Offline MVP (fastest, 30 seconds)
No installation. Open `index.html` in any modern browser. That's the whole demo.

### Option B — Full Stack

**Step 1: Clone the repository**
```bash
git clone https://github.com/fahad3235/landvault.git
cd landvault
```

**Step 2: Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app        # seeds the 10,000-plot registry on first boot
```

**Step 3: Frontend (second terminal)**
```bash
cd frontend
npm install
npm run dev
```

### Option C — Docker
```bash
cd backend
docker compose up --build
```
See `backend/` for service details.

---

## 6. Run and Build Commands

| Command | What it does |
| :--- | :--- |
| `uvicorn app.main:app` (in `backend/`) | Starts the API (default `http://127.0.0.1:8000`) |
| `npm run dev` (in `frontend/`) | Starts the Gov Portal UI with hot reload |
| `npm run build` (in `frontend/`) | Production build of the frontend |
| `pytest` (in `backend/`) | Runs the 22-test backend suite |

### API Surface
| Method & Path | Purpose |
| :--- | :--- |
| `GET /api/health` | Service liveness |
| `GET /api/plots/search?q=…` | Plot search (dag / khatian / mouza / owner) |
| `GET /api/plots/{plot_id}` | Full dossier: chain, mutations, documents, risk |
| `GET /api/registry/stats` | Registry-wide statistics |
| `POST /api/deeds/verify` | Deed authenticity check (`deed_no` + `hash`) |

---

## 7. Testing Instructions

### 7.1 Automated Tests
```bash
cd backend && pytest        # 22/22 passing: risk engine + API, incl. API-vs-MVP score parity
```
Frontend: 23/23 headless-Chrome checks, zero console errors (Gov Portal rebuild).

### 7.2 Guided 60-Second Demo for Judges
1. Click **⚠ Double-sold plot** → dossier opens at **100/CRITICAL** with 4 explained signals.
2. Scroll the ownership chain CS → SA → RS → BS and the mutation table showing the same plot sold twice.
3. Click **Verify →** on deed `DL-2025-01208`, then **Simulate a tampered copy** → hash-mismatch forgery verdict.
4. Toggle **বাং** for the full Bangla UI.

### 7.3 Scripted Fraud Cases
| Plot | Scenario | Score / Tier | What the judge sees |
| :--- | :--- | :--- | :--- |
| SV-001 | Clean plot, unbroken chain | 0 / low | A clean verdict with the full chain to back it |
| SV-007 | Double-sold plot | 100 / crit | The engine's heaviest signal (+45) fires; dossier shows both claimants |
| SV-009 | Forged deed | 90 / crit | Deed-hash mismatch (+40); tamper simulation proves the forgery |

---

## 8. Repository Layout

| Path | What it is |
| :--- | :--- |
| `index.html` | Offline MVP — 12-plot curated registry, single file, zero network calls |
| `frontend/` | React 19 + Vite + Tailwind app (Gov Portal skin): Home, Dossier, Verify, Methodology |
| `backend/` | FastAPI + SQLAlchemy API: search, dossier, deed verification, stats |
| `docs/` | `DESIGN.md` (UI/UX blueprint) · `API.md` (endpoint reference) |
| `design-options/` | Design alternatives explored before the team picked option B (Gov Portal) |

---

## 9. Synthetic Data Disclosure

- **100% synthetic.** 12 hand-written demo plots (Dhaka, Gazipur, Cumilla, Chattogram) + 9,988 deterministically generated plots (seeded PRNG, seed `20261005`).
- **No real data**: no real persons, plots, deeds, or NID numbers are used anywhere.
- **No scraping**: no government portals were accessed or scraped — per the LandHack 2026 rulebook.

---

## 10. AI Assistance Disclosure

Per the LandHack 2026 rulebook: this project was built with AI coding assistance (Muse, Meta). All code, data, and logic were reviewed by the team and are fully explainable by both members. The deterministic risk engine contains no ML black box — every point of risk maps to a visible record.

## License / IP

Team retains full IP ownership per the LandHack 2026 rulebook. Demo code is shared publicly for judging purposes.

---

### Team Information

- **Contest**: LandHack 2026 — DIU CSE-TECH
- **Track**: Digital Land Records, Verification & Digitization
- **Project**: LandVault
- **Repository**: [fahad3235/landvault](https://github.com/fahad3235/landvault)
- **Team Members**:
  - **Md. Fahad** (`@fahad3235`)
  - Teammate — *to be confirmed*
