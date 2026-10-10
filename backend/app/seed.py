"""Seeding: 12 curated plots (exact, from data/curated.json) + 9,988 generated plots
(seeded PRNG, seed 20261005 — deterministic). ALL DATA IS SYNTHETIC."""
import json
import os

from .database import SessionLocal
from .generator import generate_registry
from .models import Plot

CURATED_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "curated.json"
)


def _row(p, seq):
    return Plot(
        id=p["id"],
        seq=seq,
        district=p["district"],
        upazila=p["upazila"],
        mouza=p["mouza"],
        dag=p["dag"],
        khatian=p["khatian"],
        owner=p["owner"],
        ptype=p["type"],
        area=float(p["area"]),
        data=p,
    )


def seed_if_empty():
    db = SessionLocal()
    try:
        if db.query(Plot).count() > 0:
            return False
        with open(CURATED_PATH, encoding="utf-8") as f:
            curated = json.load(f)
        rows = [_row(p, i) for i, p in enumerate(curated)]
        rows += [_row(p, len(curated) + i) for i, p in enumerate(generate_registry())]
        db.add_all(rows)
        db.commit()
        return True
    finally:
        db.close()
