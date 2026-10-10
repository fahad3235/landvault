"""API tests via FastAPI TestClient. Seeding runs once per session (SQLite)."""
import os

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite:////tmp/lv_test.db")
if os.path.exists("/tmp/lv_test.db"):
    os.remove("/tmp/lv_test.db")

from app.main import app  # noqa: E402


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


def test_health(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"
    assert body["plots"] == 10000
    assert body["synthetic"] is True


def test_search_basic(client):
    r = client.get("/api/plots/search", params={"q": "142"})
    assert r.status_code == 200
    ids = [p["id"] for p in r.json()]
    assert "SV-001" in ids


def test_search_all_tokens_must_match(client):
    r = client.get("/api/plots/search", params={"q": "Birulia Karim"})
    ids = [p["id"] for p in r.json()]
    assert "SV-001" in ids
    r2 = client.get("/api/plots/search", params={"q": "Birulia zzznope"})
    assert r2.json() == []


def test_search_case_insensitive_and_limit(client):
    r = client.get("/api/plots/search", params={"q": "rs-881"})
    assert any(p["id"] == "SV-001" for p in r.json())
    r = client.get("/api/plots/search", params={"q": "a", "limit": 5})
    assert len(r.json()) == 5


def test_search_empty_browse(client):
    r = client.get("/api/plots/search")
    body = r.json()
    assert len(body) == 24
    assert body[0]["id"] == "SV-001"  # curated first, insertion order


def test_search_result_shape(client):
    r = client.get("/api/plots/search", params={"q": "SV-007"})
    p = r.json()[0]
    assert p["score"] == 100 and p["tier"] == "crit"
    for k in ["id", "district", "upazila", "mouza", "dag", "khatian",
              "area", "type", "owner", "score", "tier"]:
        assert k in p


def test_dossier(client):
    r = client.get("/api/plots/SV-007")
    assert r.status_code == 200
    d = r.json()
    assert d["id"] == "SV-007"
    assert len(d["chain"]) == 4
    assert d["risk"]["score"] == 100 and d["risk"]["tier"] == "crit"
    sig = d["risk"]["signals"][0]
    for k in ["key", "weight", "title_en", "title_bn", "desc_en", "desc_bn",
              "evidence", "checklist_en", "checklist_bn"]:
        assert k in sig


def test_dossier_404(client):
    r = client.get("/api/plots/NOPE-999")
    assert r.status_code == 404
    assert r.json()["detail"] == "plot not found"


def test_stats(client):
    r = client.get("/api/registry/stats")
    body = r.json()
    assert body["total"] == 10000
    assert sum(body["tiers"].values()) == 10000
    assert set(body["tiers"]) == {"low", "med", "high", "crit"}


def test_verify_match(client):
    r = client.post("/api/deeds/verify",
                    json={"deed_no": "DL-2024-11802", "presented_hash": "9f2c41be07d3"})
    body = r.json()
    assert body == {"found": True, "match": True, "deed_no": "DL-2024-11802",
                    "registry_hash": "9f2c41be07d3", "plot_id": "SV-003"}


def test_verify_case_insensitive_trimmed(client):
    r = client.post("/api/deeds/verify",
                    json={"deed_no": "  dl-2024-11802 ", "presented_hash": " 9F2C41BE07D3 "})
    assert r.json()["match"] is True


def test_verify_mismatch(client):
    r = client.post("/api/deeds/verify",
                    json={"deed_no": "DL-2024-11802", "presented_hash": "9f2c41be07d4"})
    body = r.json()
    assert body["found"] is True and body["match"] is False
    assert body["registry_hash"] == "9f2c41be07d3"


def test_verify_unknown(client):
    r = client.post("/api/deeds/verify",
                    json={"deed_no": "DL-0000-00000", "presented_hash": "abc"})
    body = r.json()
    assert body["found"] is False and body["match"] is False
    assert body["registry_hash"] is None and body["plot_id"] is None


def test_cors_open(client):
    r = client.options("/api/health", headers={
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "GET",
    })
    assert r.headers.get("access-control-allow-origin") == "*"
