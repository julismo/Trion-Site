"""Smoke tests — verify the app starts and core routes respond."""

from fastapi.testclient import TestClient

from api.main import app

client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_unknown_route_returns_404() -> None:
    response = client.get("/nonexistent")
    assert response.status_code == 404
