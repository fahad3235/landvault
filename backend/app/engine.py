"""Risk engine — exact Python port of assess() in index.html (Phase-1 MVP).

Weights: double +45, hash +40, brk +30, regmut +20, flip +20, kase/khas/acq +15.
Score = min(100, sum). Tiers: 0-29 low, 30-59 med, 60-89 high, 90+ crit.
Signal titles/descriptions/checklists are copied VERBATIM from the I18N dict.
"""
from datetime import date

from .strings import STR

W = {
    "double": 45,
    "hash": 40,
    "brk": 30,
    "regmut": 20,
    "flip": 20,
    "kase": 15,
    "khas": 15,
    "acq": 15,
}

# signal key -> (title_key, desc_key, checklist_key) in STR
_SIG_TEXT = {
    "double": ("s_double_t", "s_double_p", "c_double"),
    "hash": ("s_hash_t", "s_hash_p", "c_hash"),
    "brk": ("s_break_t", "s_break_p", "c_break"),
    "regmut": ("s_regmut_t", "s_regmut_p", "c_regmut"),
    "flip": ("s_flip_t", "s_flip_p", "c_flip"),
    "kase": ("s_case_t", "s_case_p", "c_case"),
    "khas": ("s_khas_t", "s_khas_p", "c_khas"),
    "acq": ("s_acq_t", "s_acq_p", "c_acq"),
}


def _signal(key, evidence=""):
    tk, pk, ck = _SIG_TEXT[key]
    return {
        "key": key,
        "weight": W[key],
        "title_en": STR[tk]["en"],
        "title_bn": STR[tk]["bn"],
        "desc_en": STR[pk]["en"],
        "desc_bn": STR[pk]["bn"],
        "evidence": evidence,
        "checklist_en": STR[ck]["en"],
        "checklist_bn": STR[ck]["bn"],
    }


def _parse(d):
    return date.fromisoformat(d)


def assess(plot):
    """plot: dict with doubleSale, docs, chainBreak, sales, flags. Returns score/tier/signals."""
    sigs = []

    ds = plot.get("doubleSale")
    if ds:
        ev = f"{ds['deedA']} ({ds['buyerA']}, {ds['dateA']}) \u2192 {ds['deedB']} ({ds['buyerB']}, {ds['dateB']})"
        sigs.append(_signal("double", ev))

    for d in plot.get("docs", []):
        if not d.get("ok"):
            sigs.append(_signal("hash", f"{d['ref']}: {d['hash']}"))

    cb = plot.get("chainBreak")
    if cb:
        sigs.append(_signal("brk", f"{cb['between']} \u2014 {cb['detail']}"))

    for s in plot.get("sales", []):
        if s.get("reg") and not s.get("mut") and s.get("deed") and s["deed"] != "\u2014":
            sigs.append(_signal("regmut", f"{s['deed']} ({s['date']})"))

    real = [s for s in plot.get("sales", []) if s.get("deed") and s["deed"] != "\u2014"]
    for i in range(1, len(real)):
        delta = (_parse(real[i]["date"]) - _parse(real[i - 1]["date"])).days
        if 0 <= delta <= 365:
            sigs.append(_signal(
                "flip",
                f"{real[i-1]['deed']} ({real[i-1]['date']}) \u2192 {real[i]['deed']} ({real[i]['date']})",
            ))
            break

    flags = plot.get("flags", {}) or {}
    if flags.get("case"):
        sigs.append(_signal("kase"))
    if flags.get("khas"):
        sigs.append(_signal("khas"))
    if flags.get("acq"):
        sigs.append(_signal("acq"))

    score = min(100, sum(s["weight"] for s in sigs))
    tier = "crit" if score >= 90 else "high" if score >= 60 else "med" if score >= 30 else "low"
    return {"score": score, "tier": tier, "signals": sigs}
