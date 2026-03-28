"""Application settings — all values read from environment variables.

Never hardcode IPs or secrets here. Database connections must use
Tailscale IPs (100.x.x.x) to respect the Zero Trust architecture.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database — must be a Tailscale IP in production (100.x.x.x)
    database_url: str = ""

    # API security
    secret_key: str = "changeme"

    # Server
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    debug: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
