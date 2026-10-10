"""Engine tests: canonical scores, tier boundaries, bilingual signal text."""
import json
import os

from app.engine import assess

CURATED = os.path.join(os.path.dirname(__file__), "..", "data", "curated.json")


def _plots():
    with open(CURATED, encoding="utf-8") as f:
        return {p["id"]: p for p in json.load(f)}


def _mk(signals):
    """Minimal plot with only the given signal triggers."""
    p = {
        "doubleSale": None, "docs": [], "chainBreak": None, "sales": [],
        "flags": {"case": False, "khas": False, "acq": False},
    }
    p.update(signals)
    return p


def test_canonical_sv001():
    p = _plots()["SV-001"]
    r = assess(p)
    assert (r["score"], r["tier"]) == (0, "low")
    assert r["signals"] == []


def test_canonical_sv007():
    p = _plots()["SV-007"]
    r = assess(p)
    assert (r["score"], r["tier"]) == (100, "crit")
    keys = [s["key"] for s in r["signals"]]
    assert keys == ["double", "regmut", "flip", "kase"]


def test_canonical_sv009():
    p = _plots()["SV-009"]
    r = assess(p)
    assert (r["score"], r["tier"]) == (90, "crit")
    keys = [s["key"] for s in r["signals"]]
    assert keys == ["hash", "brk", "regmut"]


def test_tier_boundaries():
    assert assess(_mk({"flags": {"case": True, "khas": False, "acq": False}}))["tier"] == "low"   # 15
    p = _mk({"chainBreak": {"between": "SA \u2192 RS", "detail": "x"}})
    assert assess(p)["tier"] == "med"     # 30
    p = _mk({"flags": {"case": True, "khas": False, "acq": True}})
    assert assess(p)["tier"] == "med"     # 30
    p = _mk({"doubleSale": {"deedA": "A", "buyerA": "B", "dateA": "2020-01-01",
                            "deedB": "C", "buyerB": "D", "dateB": "2020-06-01"}})
    assert assess(p)["tier"] == "med"     # 45
    p["flags"] = {"case": True, "khas": False, "acq": False}
    assert assess(p)["tier"] == "high"    # 60
    p["flags"] = {"case": True, "khas": True, "acq": True}
    assert assess(p)["tier"] == "crit"    # 90
    p["flags"] = {"case": True, "khas": True, "acq": False}
    assert assess(p)["tier"] == "high"    # 75


def test_score_capped_at_100():
    p = _plots()["SV-007"]
    r = assess(p)
    assert r["score"] <= 100


def test_regmut_rule():
    p = _mk({"sales": [
        {"date": "2020-01-01", "deed": "DL-2020-00001", "seller": "A", "buyer": "B",
         "amount": 1, "reg": True, "mut": False},
        {"date": "2020-01-01", "deed": "\u2014", "seller": "A", "buyer": "B",
         "amount": 0, "reg": True, "mut": False},  # em-dash deed: ignored
    ]})
    keys = [s["key"] for s in assess(p)["signals"]]
    assert keys == ["regmut"]


def test_flip_rule_boundary():
    def sale(d):
        return {"date": d, "deed": f"DL-{d}", "seller": "A", "buyer": "B",
                "amount": 1, "reg": True, "mut": True}
    # 2020 is a leap year: 2020-01-01 -> 2021-01-01 = 366 days -> NO flip
    assert "flip" not in [s["key"] for s in assess(_mk({"sales": [sale("2020-01-01"), sale("2021-01-01")]}))["signals"]]
    # 365 days -> flip
    assert "flip" in [s["key"] for s in assess(_mk({"sales": [sale("2021-01-01"), sale("2022-01-01")]}))["signals"]]


def test_bilingual_text_verbatim():
    p = _plots()["SV-007"]
    dbl = next(s for s in assess(p)["signals"] if s["key"] == "double")
    assert dbl["title_en"] == "Double sale detected"
    assert dbl["title_bn"] == "\u098f\u0995\u09be\u09a7\u09bf\u0995 \u09ac\u09bf\u0995\u09cd\u09b0\u09bf \u09b6\u09a8\u09be\u0995\u09cd\u09a4"
    assert dbl["checklist_en"].startswith("Get certified copies of BOTH deeds")
    assert dbl["evidence"] == ("DL-2024-07731 (Belal Sheikh, 2024-06-14) \u2192 "
                               "DL-2025-01208 (Nasrin Akter, 2025-02-02)")
