"""FastAPI application factory."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import get_settings
from api.routers import health


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title="Trion Scale API",
        version="0.1.0",
        debug=settings.debug,
        # Disable docs in production
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Restrict to frontend domain in production
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )

    app.include_router(health.router)

    return app


app = create_app()
