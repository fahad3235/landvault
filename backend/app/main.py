"""LandVault Phase-3 backend — citizen land-record verification API.

ALL DATA IS SYNTHETIC (LandHack 2026 rulebook: no real personal data,
no government-portal scraping). See README.md.
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from .database import Base, engine, get_db, wait_for_db
from .engine import assess
from .models import Plot
from .seed import seed_if_empty

# ---- in-memory indexes (built once at startup; 10k plots) ----
_PLOTS = []          # list of full plot dicts, insertion order
_HAYSTACKS = {}      # plot_id -> lowercase searchable text
_DEEDS = {}          # deed_no.lower() -> {"plot_id", "registry_hash"}
_STATS = {"total": 0, "tiers": {"low": 0, "med": 0, "high": 0, "crit": 0}}


def _haystack(p):
    parts = [p["id"], p["dag"], p["khatian"], p["owner"], p["mouza"],
             p["upazila"], p["district"], p["type"]]
    parts += [c["kh"] for c in p.get("chain", [])]
    parts += [d["ref"] for d in p.get("docs", [])]
    return " ".join(parts).lower()


def _deed_registry_hash(h):
    # mirrors the JS DEED_INDEX: tampered docs store "REGISTRY:<h> / PAPER:<h'>"
    if h.startswith("REGISTRY:"):
        return h.split("/")[0].replace("REGISTRY:", "").strip()
    return h


def _build_indexes(db: Session):
    _PLOTS.clear(); _HAYSTACKS.clear(); _DEEDS.clear()
    _STATS.update({"total": 0, "tiers": {"low": 0, "med": 0, "high": 0, "crit": 0}})
    for row in db.query(Plot).order_by(Plot.seq):
        p = row.data
        _PLOTS.append(p)
        _HAYSTACKS[p["id"]] = _haystack(p)
        for d in p.get("docs", []):
            if d.get("type") == "Deed":
                _DEEDS[d["ref"].lower()] = {
                    "plot_id": p["id"],
                    "registry_hash": _deed_registry_hash(d["hash"]),
                }
        tier = assess(p)["tier"]
        _STATS["tiers"][tier] += 1
        _STATS["total"] += 1


@asynccontextmanager
async def lifespan(app: FastAPI):
    wait_for_db()
    Base.metadata.create_all(bind=engine)
    seed_if_empty()
    _build_indexes(next(get_db()))
    yield


app = FastAPI(title="LandVault API", version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _summary(p):
    r = assess(p)
    return {
        "id": p["id"], "district": p["district"], "upazila": p["upazila"],
        "mouza": p["mouza"], "dag": p["dag"], "khatian": p["khatian"],
        "area": p["area"], "type": p["type"], "owner": p["owner"],
        "score": r["score"], "tier": r["tier"],
    }


@app.get("/api/health")
def health():
    return {"status": "ok", "plots": _STATS["total"], "synthetic": True}


@app.get("/api/plots/search")
def search(q: str = "", limit: int = 24):
    q = (q or "").strip().lower()
    if not q:
        hits = _PLOTS
    else:
        tokens = q.split()
        hits = [p for p in _PLOTS if all(t in _HAYSTACKS[p["id"]] for t in tokens)]
    return [_summary(p) for p in hits[: max(1, limit)]]


@app.get("/api/plots/{plot_id}")
def dossier(plot_id: str):
    p = next((x for x in _PLOTS if x["id"] == plot_id), None)
    if p is None:
        raise HTTPException(status_code=404, detail="plot not found")
    risk = assess(p)
    return {
        "id": p["id"], "district": p["district"], "upazila": p["upazila"],
        "mouza": p["mouza"], "dag": p["dag"], "khatian": p["khatian"],
        "area": p["area"], "type": p["type"], "owner": p["owner"],
        "chain": p["chain"], "sales": p["sales"], "docs": p["docs"],
        "flags": p["flags"], "risk": risk,
    }


@app.get("/api/registry/stats")
def stats():
    return {"total": _STATS["total"], "tiers": dict(_STATS["tiers"])}


class VerifyBody(BaseModel):
    deed_no: str
    presented_hash: str


@app.post("/api/deeds/verify")
def verify_deed(body: VerifyBody):
    deed_no = (body.deed_no or "").strip()
    presented = (body.presented_hash or "").strip().lower()
    rec = _DEEDS.get(deed_no.lower())
    if rec is None:
        return {"found": False, "match": False, "deed_no": deed_no,
                "registry_hash": None, "plot_id": None}
    match = rec["registry_hash"].lower() == presented
    return {"found": True, "match": match, "deed_no": deed_no,
            "registry_hash": rec["registry_hash"], "plot_id": rec["plot_id"]}
