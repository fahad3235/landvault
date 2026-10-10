# LandVault — UI/UX + Full-Stack Design Blueprint (v2)

*Track: Digital Land Records, Verification & Digitization · LandHack 2026 · CSE-TECH, DIU*
*Status: design blueprint. Current shipped MVP = Phase 1 (single-file static app, 10,000-plot synthetic registry).*

---

## 1. Product definition

**One line:** "Verify before you buy land" — a citizen-facing portal that turns a dag/khatian number into one verified dossier with an explainable fraud-risk score.

**Primary users**

| User | Goal | Context |
|---|---|---|
| Citizen buyer | Check a plot before paying | Phone, low bandwidth, Bangla or English |
| Citizen seller | Prove their plot is clean | Shares dossier link/QR with buyer |
| Hackathon judge | Grasp the concept in 5 minutes | Live demo, big screen |
| Land officer (future) | Review flagged records | Desktop, authenticated |

**Non-goals for the hackathon:** replacing DLRS systems, legal opinions, real-data ingestion (forbidden by the rulebook).

---

## 2. UX — user journeys

### J1 · Pre-purchase check (the 60-second core loop)
1. Land on home → big search field (dag / khatian / mouza / owner / plot ID), live results as you type.
2. Tap a result → dossier opens: risk dial + tier at the top (the verdict is visible in <5s).
3. Scroll the evidence: ownership chain CS→SA→RS→BS, mutation table, document hashes.
4. Read the buyer checklist ("get both deeds certified…").
5. Download/share a one-page verification report (PDF) — Phase 3.

### J2 · Deed authenticity check (30 seconds)
Deed number + hash from the paper copy → instant AUTHENTIC / MISMATCH verdict with the registry hash shown side-by-side. Tamper-simulation toggle for demos.

### J3 · Judge demo path (5 minutes)
Clean plot → double-sold plot (100/CRITICAL) → forged deed → tamper simulation → Bangla toggle. Every step is one tap from the home screen.

### UX principles
- **Verdict first, evidence on demand.** Score and tier above the fold; details collapse/expand.
- **No dead ends.** Empty search browses; no-match suggests what to try; every error states the next action.
- **Honest demo.** "Synthetic demo" badge persistent in header; disclaimers on every dossier.
- **Bilingual from day one.** Full EN/BN toggle, not machine-translated afterthoughts.

---

## 3. Information architecture

```
/                 Home: hero search, demo cases, registry overview, how-it-works
/plot/:id         Dossier: summary + risk panel + chain + mutations + docs + checklist
/verify           Deed authenticity checker (also reachable from any dossier)
/methodology      How scoring works, signal weights, data honesty statement
/api/docs         (Phase 3) OpenAPI docs for the backend
```

---

## 4. UI design system

### Brand feel
Trust of a government service, polish of a fintech app. Calm, official, never playful — people's land money is on the line.

### Tokens
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F6F8F4` warm paper | Page background |
| `--card` | `#FFFFFF` | Surfaces |
| `--ink` | `#17281F` | Text |
| `--muted` | `#5D6D63` | Secondary text |
| `--em` | `#0E6B4A` emerald | Primary actions, trust |
| `--em-deep` | `#0A4A34` | Hero, risk dial track |
| `--gold` | `#C9A227` | Accent, CTAs on dark |
| Risk scale | `#2FA36B → #E0A020 → #E06A1B → #E0483A` | Low → Med → High → Critical |

### Typography
- System stack + `Hind Siliguri`/`Noto Sans Bengali` fallback for Bangla. Headings 600–800 weight, tight leading.
- **Tabular numerals everywhere** (`font-variant-numeric: tabular-nums`) — scores, areas, dates must align.
- Bangla numerals stay Arabic (0–100) for scannability; prose fully translated.

### Components (with states)
- **Risk dial** — SVG arc, tier-colored, score + "/100", tier chip below.
- **Signal cards** — left border color = severity, `+weight` top-right, evidence hash in mono chip.
- **Chain timeline** — 4 cards CS/SA/RS/BS with arrows (→ desktop, ↓ mobile); broken link highlighted red.
- **Hash chips** — monospace, truncated with copy button.
- **Tier filter chips** — toggle pills with counts; active = emerald ring.
- **Search** — live results, capped at 24 with "showing X of Y", debounced 280ms, browse-on-empty.
- **Checklist** — gold-tinted cards, checkbox squares, printable.
- **Skeletons & empty states** — shimmer cards while assessing; friendly no-match with examples.

### Page specs
- **Home:** sticky header (logo, nav, demo badge, EN/বাং) → emerald hero (headline, search, 3 demo chips, 4 stats) → registry overview (distribution bar + tappable tier chips) → deed verifier → 3-step "how it works" → disclaimer footer.
- **Dossier:** back link → plot summary card + risk card (side by side desktop, stacked mobile) → signals → chain → mutations table → documents table (each deed row: Verify →) → buyer checklist → disclaimer.
- **Mobile (390px):** single column, full-width search + button stacked, chain vertical, tables scroll-x with sticky first column.

---

## 5. Frontend architecture (Phase 2)

- **React 18 + Vite + Tailwind CSS + React Router.** Component-per-section; the current single file maps 1:1 to components.
- **Data:** React Query against the backend; 60s stale-while-revalidate; the seeded generator stays as the offline fallback/PWA cache seed.
- **i18n:** `react-i18next`, `en`/`bn` namespaces; translators translate `locales/bn.json`, never code.
- **Charts:** Recharts for the distribution bar; SVG for the dial (no chart lib needed).
- **PWA:** installable, works offline with cached registry — important for field demos.
- **Budgets:** <200KB gzipped JS, LCP <2.5s on 4G, WCAG AA contrast, full keyboard nav.

---

## 6. Backend architecture (Phase 3)

**Stack:** FastAPI (Python) + PostgreSQL + PostGIS + Redis cache. One Docker Compose for judges; deploys to any VPS.

### Services
| Service | Responsibility |
|---|---|
| Registry API | Plot CRUD/search, survey chains, mutations, documents |
| Risk engine | Port of the deterministic rules (same 6 signals + weights); returns score + signal evidence JSON |
| Hash service | SHA-256 over canonical deed JSON; verify endpoint compares presented vs registry hash |
| QR service | Issues QR codes encoding `deed_id + hash` for paper deeds (P2) |
| OCR pipeline | P1: Bangla printed+handwritten khatian/porcha → structured fields (Tesseract `ben` + layout heuristics + human review queue) |
| Report service | One-page PDF verification report per dossier |

### API (REST, OpenAPI at `/api/docs`)
```
GET  /api/plots/search?q=142&limit=24
GET  /api/plots/{id}                 → full dossier incl. risk assessment
GET  /api/registry/stats             → tier distribution
POST /api/deeds/verify               {deed_no, presented_hash} → {match, registry_hash}
POST /api/reports/{plot_id}          → PDF
```

### Database (PostgreSQL)
```
plots(id, district, upazila, mouza, dag_no, area_decimal, land_type, current_owner_ref, geom)
survey_records(id, plot_id, survey ENUM[CS,SA,RS,BS], khatian_no, owner_ref, survey_year)
owners(id, full_name)                       -- synthetic in demo
mutations(id, plot_id, date, type, from_owner, to_owner, deed_no, registered, mutated)
documents(id, plot_id, type, ref_no, hash_sha256, verified)
risk_assessments(id, plot_id, score, tier, signals JSONB, assessed_at)
```
PostGIS `geom` reserves the future: plot-boundary polygons for map view.

### Auth & roles (future officer portal)
JWT; roles `citizen` (public read), `officer` (flag review), `admin`. Demo ships with public-read only.

---

## 7. Data strategy

1. **Now (rulebook-compliant):** seeded synthetic generator — deterministic, documented, clearly labeled. It *is* the demo dataset and the test fixture.
2. **Pipeline shape:** `generator → JSON → import script → Postgres` — so swapping in real open data later is a connector change, not a rewrite.
3. **Later (post-hackathon, with MoU):** DLRS open-data endpoints, scanned-record digitization queue feeding the OCR pipeline. Never scrape; only contracted feeds.

---

## 8. Non-functionals

- **Performance:** search <100ms at 10k plots (measured 25ms full-registry assess); API p95 <300ms.
- **Security:** no real PII anywhere in repo; hashes are of synthetic docs; rate-limit verify endpoint.
- **Honesty:** every AI-assisted part disclosed in README (rulebook requirement); "DEMO" watermark on PDFs.

---

## 9. Build phases

| Phase | Scope | Status |
|---|---|---|
| 1 | Static single-file MVP, 10k synthetic plots, EN/BN | **Shipped** |
| 2 | React + Tailwind rebuild to this design system, PWA | Next |
| 3 | FastAPI + Postgres backend, QR + PDF reports | After |
| 4 | Bangla OCR pipeline (P1), officer review queue | Stretch |

*All demo data in every phase remains synthetic unless a formal data agreement exists.*
