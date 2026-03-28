"""Lead schemas — single source of truth for lead data contracts.

Both the API (apps/api) and any automation scripts (execution/)
must import from here to guarantee consistency.
"""

from enum import StrEnum

from pydantic import BaseModel, EmailStr, Field


class AreaInteresse(StrEnum):
    AGENTES_IA = "agentes_ia"
    AUTOMACOES = "automacoes"
    SOFTWARE_SOB_MEDIDA = "software_sob_medida"
    OUTRO = "outro"


class LeadCreate(BaseModel):
    """Payload recebido pelo formulário de contacto do website."""

    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    empresa: str = Field(..., min_length=1, max_length=100)
    cargo: str = Field(..., min_length=1, max_length=100)
    area_interesse: AreaInteresse
    # Não obrigatório — reduz fricção no formulário, mas importante para qualificação
    descricao_dor: str = Field("", max_length=2000)


class LeadResponse(BaseModel):
    """Resposta devolvida ao frontend após submissão bem-sucedida."""

    id: str
    mensagem: str = "Lead recebido com sucesso. Entraremos em contacto em breve."
