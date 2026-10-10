# LandVault API Contract (v1)

Base URL: `http://localhost:8000` · all JSON · CORS open for the Vite dev server.

## Endpoints

### `GET /api/health`
→ `{ "status": "ok", "plots": 10000, "synthetic": true }`

### `GET /api/plots/search?q={text}&limit=24`
Case-insensitive match on: id, dag, khatian, owner, mouza, upazila, district, type, chain khatians, doc refs.
All space-separated tokens must match.
→ `[ { id, district, upazila, mouza, dag, khatian, area, type, owner, score, tier } ]`
`tier` ∈ `low|med|high|crit`. Empty `q` → first 24 plots (browse mode).

### `GET /api/plots/{id}`
Full dossier:
```json
{
  "id": "SV-007", "district": "Gazipur", "upazila": "Kaliakair", "mouza": "Sutrapur",
  "dag": "19", "khatian": "RS-118", "area": 25.5, "type": "Commercial", "owner": "Belal Sheikh",
  "chain": [ {"s":"CS","kh":"CS-090","owner":"Aziz Master","yr":1921}, ... ],
  "sales": [ {"date":"2024-06-14","deed":"DL-2024-07731","seller":"…","buyer":"…","amount":14200000,"reg":true,"mut":true}, ... ],
  "docs":  [ {"type":"Deed","ref":"DL-2024-07731","hash":"c7d21e90ab44","ok":true}, ... ],
  "flags": { "case": true, "khas": false, "acq": false },
  "risk": {
    "score": 100, "tier": "crit",
    "signals": [
      { "key": "double", "weight": 45, "title_en": "…", "title_bn": "…",
        "desc_en": "…", "desc_bn": "…", "evidence": "…",
        "checklist_en": "…", "checklist_bn": "…" }
    ]
  }
}
```
404 → `{ "detail": "plot not found" }`.

### `GET /api/registry/stats`
→ `{ "total": 10000, "tiers": { "low": 7876, "med": 1334, "high": 658, "crit": 132 } }`
(Exact counts depend on the generator seed; shape must match.)

### `POST /api/deeds/verify`
Body: `{ "deed_no": "DL-2024-11802", "presented_hash": "9f2c41be07d3" }`
→ `{ "found": true, "match": true, "deed_no": "…", "registry_hash": "…", "plot_id": "SV-003" }`
Unknown deed → `{ "found": false, "match": false, ... }`. Compare case-insensitively, trimmed.

## Risk engine (must match the shipped MVP exactly)

Weights: `double +45 · hash +40 · brk +30 · regmut +20 · flip +20 · kase +15 · khas +15 · acq +15`.
Score = min(100, Σ). Tiers: `0–29 low · 30–59 med · 60–89 high · 90+ crit`.

Signal rules (same as `assess()` in `index.html`):
- **double**: `plot.doubleSale` present → evidence lists both deeds/buyers/dates.
- **hash**: any doc with `ok:false` → evidence = `ref: hash`.
- **brk**: `plot.chainBreak` present → evidence = `between — detail`.
- **regmut**: any sale with `reg && !mut && deed != "—"` → evidence = `deed (date)`.
- **flip**: two consecutive real sales (deed ≠ "—") ≤365 days apart → evidence = `deedA (dateA) → deedB (dateB)`.
- **kase/khas/acq**: `flags.case / flags.khas / flags.acq`.

Canonical checks: `SV-001 → 0/low`, `SV-007 → 100/crit`, `SV-009 → 90/crit`.

Signal titles/descriptions/checklists (EN+BN) live in the `I18N` dict in `index.html`
(keys `s_double_t`, `s_double_p`, `c_double`, …). Copy them verbatim.

## Data

- 12 curated plots: `backend/data/curated.json` (exact — SV-001…SV-012).
- 9,988 generated plots: seeded PRNG (seed `20261005`), deterministic. Generator pools
  (districts/upazilas/mouzas/names) are in `index.html` (`GEO`, `MOUZAS`, `FN`, `LN`).
  Exact bit-parity with the JS generator is a bonus, not required — determinism
  (same seed → same registry) and the same fraud-rate shape are required.
- **All data is synthetic.** No real persons, plots, deeds, or NIDs. Never fetch external data.
