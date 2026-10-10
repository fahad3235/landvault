# LandVault Backend (Phase 3)

FastAPI + SQLAlchemy API for the LandVault land-record verification portal
(LandHack 2026, DIU — track: Digital Land Records, Verification & Digitization).

Implements [`docs/API.md`](../docs/API.md) exactly: plot search, full dossiers with an
explainable 0–100 fraud-risk score (EN+BN), registry stats, and deed-hash verification.

## Quick start (local, SQLite)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

On first boot the app creates `landvault.db` in this directory and seeds it:
12 curated plots + 9,988 generated plots = **10,000 total** (~5s, one time only).

Try it:

```bash
curl http://127.0.0.1:8000/api/health
curl "http://127.0.0.1:8000/api/plots/search?q=142"
curl http://127.0.0.1:8000/api/plots/SV-007
curl http://127.0.0.1:8000/api/registry/stats
curl -X POST http://127.0.0.1:8000/api/deeds/verify \
  -H 'Content-Type: application/json' \
  -d '{"deed_no":"DL-2024-11802","presented_hash":"9f2c41be07d3"}'
```

## Docker (backend + PostgreSQL)

```bash
cd backend
docker compose up --build
```

The backend waits for Postgres (`wait_for_db()` + compose healthcheck) and reads
`DATABASE_URL` from the environment, so the same image runs on SQLite locally and
Postgres in compose. API is at `http://localhost:8000`.

## Tests

```bash
cd backend
pytest tests/ -q
```

22 tests: risk-engine canonicals (SV-001→0/low, SV-007→100/crit, SV-009→90/crit),
tier boundaries, bilingual signal text, and full API coverage via TestClient
(search, dossier, stats, verify match/mismatch/unknown, 404, CORS).

## Project layout

```
backend/
  app/
    main.py        FastAPI app, routes, CORS, startup lifespan
    models.py      SQLAlchemy Plot model
    database.py    engine/session, DATABASE_URL, wait_for_db()
    seed.py        curated.json + generated registry seeding
    generator.py   seeded PRNG registry generator (seed 20261005, deterministic)
    engine.py      risk engine port (weights/tiers identical to the Phase-1 MVP)
    pools.py       generator pools (districts/upazilas/mouzas/names)
    strings.py     EN/BN signal strings, copied verbatim from index.html I18N
  data/curated.json   12 hand-built showcase plots (exact)
  tests/              pytest suite
  Dockerfile / docker-compose.yml / requirements.txt
```

## Synthetic-data note

**Every record served by this API is synthetic demo data** generated for the
LandHack 2026 hackathon. No real persons, plots, deeds, or NID numbers are used;
no government portals were accessed or scraped — per the hackathon rulebook
(synthetic/sample/public-open data only; data-rule violations disqualify).
The generator is deterministic: seed `20261005` always produces the same registry
(bit-parity with the Phase-1 JavaScript generator verified for the PRNG and the
first plots; tier distribution matches exactly: 7876/1334/658/132).

## AI-assistance disclosure

Per the LandHack 2026 rulebook: this backend was built with AI coding assistance
(Muse, Meta). All code, the risk engine, and the data generator were reviewed and
are fully explainable by the team. The risk engine is deterministic — every point
of risk maps to a visible record, no ML black box.
