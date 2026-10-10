"""Deterministic synthetic registry generator — Python port of generateRegistry() in index.html.

Seed 20261005 must ALWAYS produce the same registry. mulberry32 is ported
bit-for-bit from the JS implementation; R() call order matches the JS exactly.
"""
import math
from datetime import date, timedelta

from .pools import GEO, MOUZAS, FN, LN, PTYPES

SEED = 20261005
N_GENERATED = 9988


def _u32(x):
    return x & 0xFFFFFFFF


def _s32(x):
    x &= 0xFFFFFFFF
    return x - 0x100000000 if x & 0x80000000 else x


def _imul(x, y):
    return _s32(_u32(x) * _u32(y))


def mulberry32(seed):
    a = _s32(seed)

    def rand():
        nonlocal a
        a = _s32(a + 0x6D2B79F5)
        t = _imul(_s32(a) ^ (_u32(a) >> 15), _s32(1 | a))
        inner = _imul(_s32(t) ^ (_u32(t) >> 7), _s32(61 | t))
        t = _s32(_s32(t + inner) ^ t)
        return _u32(_s32(t) ^ (_u32(t) >> 14)) / 4294967296.0

    return rand


def _rpick(R, arr):
    return arr[math.floor(R() * len(arr))]


def _rhex(R, n):
    c = "0123456789abcdef"
    return "".join(c[math.floor(R() * 16)] for _ in range(n))


def _rname(R):
    return _rpick(R, FN) + " " + _rpick(R, LN)


def _jround(x):
    """JS Math.round for positive numbers (round half up)."""
    return math.floor(x + 0.5)


def generate_registry(n=N_GENERATED, seed=SEED):
    R = mulberry32(seed)
    out = []
    deed_seq = 30000
    for i in range(n):
        g = _rpick(R, GEO)
        district, upazila, mouza = g[0], _rpick(R, g[1]), _rpick(R, MOUZAS)
        dag = str(1 + math.floor(R() * 880))
        ptype = _rpick(R, PTYPES)
        area = _jround((3 + R() * 37) * 4) / 4
        is_khas = R() < 0.025
        owner = "\u2014" if is_khas else _rname(R)

        surveys = ["CS", "SA", "RS", "BS"]
        chain = []
        co = _rname(R)
        for si in range(4):
            if si > 0 and R() < 0.22:
                co = _rname(R)
            # JS object-literal order: kh (1 R call) THEN yr array (4 R calls)
            kh = surveys[si] + "-" + str(100 + math.floor(R() * 900))
            yrs = [
                1920 + math.floor(R() * 8),
                1955 + math.floor(R() * 8),
                1988 + math.floor(R() * 8),
                2010 + math.floor(R() * 12),
            ]
            chain.append({"s": surveys[si], "kh": kh, "owner": co, "yr": yrs[si]})
        chain[3]["owner"] = owner

        sales = []
        docs = [{"type": "Khatian (RS)", "ref": chain[2]["kh"], "hash": _rhex(R, 12), "ok": True}]
        if not is_khas:
            ns = 1 + math.floor(R() * 2.4)
            prev_owner = chain[0]["owner"]
            prev_y = 1985 + math.floor(R() * 10)
            for k in range(ns):
                y = min(2026, prev_y + math.floor(R() * 9))
                m = 1 + math.floor(R() * 12)
                d = 1 + math.floor(R() * 28)
                dt = f"{y}-{m:02d}-{d:02d}"
                buyer = owner if k == ns - 1 else _rname(R)
                deed = f"DL-{y}-{deed_seq}"
                deed_seq += 1
                rate = {"Commercial": 950000, "Industrial": 700000,
                        "Residential": 450000}.get(ptype, 180000)
                amount = _jround(area * rate * (0.7 + R() * 0.8))
                reg = R() < 0.94
                sales.append({
                    "date": dt, "deed": deed, "seller": prev_owner, "buyer": buyer,
                    "amount": amount, "reg": reg,
                    "mut": (R() < 0.88) if reg else False,
                })
                docs.append({"type": "Deed", "ref": deed, "hash": _rhex(R, 12), "ok": True})
                prev_owner = buyer
                prev_y = y

        flags = {"case": False, "khas": is_khas, "acq": False}
        double_sale = None
        chain_break = None

        if not is_khas and sales and R() < 0.07:
            s0 = sales[0]
            dd = date.fromisoformat(s0["date"]) + timedelta(days=30 + math.floor(R() * 300))
            date2 = dd.isoformat()
            deed2 = f"DL-{date2[:4]}-{deed_seq}"
            deed_seq += 1
            buyer2 = _rname(R)
            double_sale = {"deedA": s0["deed"], "buyerA": s0["buyer"], "dateA": s0["date"],
                           "deedB": deed2, "buyerB": buyer2, "dateB": date2}
            sales.append({"date": date2, "deed": deed2, "seller": s0["seller"],
                          "buyer": buyer2, "amount": s0["amount"],
                          "reg": True, "mut": R() < 0.4})
            docs.append({"type": "Deed", "ref": deed2, "hash": _rhex(R, 12), "ok": True})

        if not is_khas and len(docs) > 1 and R() < 0.05:
            tdd = docs[-1]
            h = tdd["hash"]
            tdd["ok"] = False
            tdd["hash"] = "REGISTRY:" + h + " / PAPER:" + h[:-1] + ("b" if h[-1:] == "a" else "a")

        if R() < 0.06:
            chain_break = {
                "between": "SA \u2192 RS",
                "detail": ("SA owner \u201C" + chain[1]["owner"] + "\u201D does not connect to RS owner \u201C"
                           + chain[2]["owner"] + "\u201D \u2014 no transfer or succession record bridges the gap."),
            }
        if R() < 0.08:
            flags["case"] = True
        if R() < 0.035:
            flags["acq"] = True

        out.append({
            "id": f"LV-{i + 1:04d}", "district": district, "upazila": upazila,
            "mouza": mouza, "dag": dag, "khatian": chain[2]["kh"], "area": area,
            "type": ptype, "owner": owner, "chain": chain, "sales": sales,
            "docs": docs, "flags": flags, "doubleSale": double_sale,
            "chainBreak": chain_break,
        })
    return out
