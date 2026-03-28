# Instruções do Agente — Trion Scale Website

> Este arquivo é espelhado em CLAUDE.md (symlink).
> Para recriar: `ln -s AGENTS.md CLAUDE.md`

---

## Identidade

- **Projeto:** Trion Scale — Website Institucional B2B
- **Empresa:** Trion Scale (serviços de IA sob medida para empresas)
- **Stack atual:** HTML + CSS + JavaScript vanilla · Formspree (leads) · Vercel / GitHub Pages (deploy)
- **Tipo:** Landing Page / Website Institucional B2B com geração de leads
- **Comunicação:** Português (PT-PT)

---

## O que é este projeto

Website institucional B2B da Trion Scale — empresa de soluções de IA personalizadas (agentes, automações, software sob medida).

**Função central:** Explicar a proposta de valor, transmitir autoridade técnica e converter tráfego qualificado em leads para conversa comercial.

**Como funcionam os leads:**
- Formulários no site enviam dados via **Formspree**
- Formspree encaminha para email/CRM — sem backend próprio necessário na fase atual

**Stack em detalhe:**
- `apps/web/` — site estático: `index.html`, `css/style.css`, `js/main.js`
- `apps/api/` — scaffold FastAPI (Python) preparado para fases futuras; **não está em produção**
- `packages/shared/` — schemas Pydantic preparados para fases futuras; **não está em uso ativo**
- `directives/` — PRD, milestones e constraints do projeto

**PRD completo:** `directives/specs.md`

---

## Estrutura de Pastas

```
trion-site/
├── AGENTS.md                 ← Este ficheiro (constituição)
├── CLAUDE.md                 ← symlink → AGENTS.md
├── .env.example              ← variáveis de ambiente (nunca commitar .env)
├── .gitignore
├── .pre-commit-config.yaml   ← ruff + mypy (para quando apps/api estiver ativo)
├── package.json              ← root PNPM workspace
├── pnpm-workspace.yaml
├── progress.txt              ← memória entre sessões (padrão Ralph — nunca sobrescrever)
│
├── directives/               ← DIRETIVAS DO PROJETO
│   ├── specs.md              ← PRD completo (fonte de verdade do produto)
│   ├── milestones.md         ← Fases de implementação com checkboxes
│   └── constraints.md        ← Out-of-scope, regras de negócio, edge cases
│
├── apps/
│   ├── web/                  ← ATIVO — site vanilla HTML/CSS/JS
│   │   ├── index.html
│   │   ├── css/style.css
│   │   ├── js/main.js
│   │   └── package.json
│   └── api/                  ← SCAFFOLDED — FastAPI Python (fase futura)
│       ├── pyproject.toml
│       ├── .python-version
│       └── src/api/
│           ├── main.py
│           ├── config.py     ← settings via env vars (DATABASE_URL via Tailscale)
│           └── routers/
│               └── health.py
│
└── packages/
    └── shared/               ← SCAFFOLDED — schemas Pydantic (fase futura)
        └── src/shared/schemas/
            └── lead.py       ← LeadCreate, LeadResponse, AreaInteresse
```

---

## Princípios de Operação

### 1. Leia o PRD antes de codificar
**SEMPRE** ler `directives/specs.md` antes de gerar qualquer código.

### 2. Plan Mode primeiro
Planear antes de executar. Para bug fixes simples, execução direta. Para features novas, Plan Mode.

### 3. Complexidade adaptativa
- **Bug fix / copy / CSS** → execução direta, sem planeamento
- **Nova secção / componente** → Plan Mode breve
- **Nova integração / sistema** → PRD + milestones + fases

### 4. progress.txt — Memória entre sessões
- **Nunca sobrescrever** — sempre append
- Registar após cada tarefa: o que foi feito, ficheiros alterados, padrões descobertos
- Ler no início de cada sessão nova

### 5. Segurança de secrets
- Nunca colocar API keys, tokens ou URLs de Formspree em código versionado
- Sempre via `.env` ou variáveis de ambiente no deploy
- `.env` está no `.gitignore` — nunca commitar

### 6. Tipagem (quando apps/api estiver ativo)
- Schemas vivem em `packages/shared/` — importar daqui, nunca duplicar
- mypy strict obrigatório no backend Python

---

## Integração de Leads (estado atual)

O site usa **Formspree** para captura de leads. Não há backend próprio.

- Endpoint Formspree: definido em variável de ambiente / hardcoded no JS (ver `apps/web/js/main.js`)
- Dados capturados: nome, email, empresa, cargo, área de interesse, descrição da dor
- Destino: email configurado no painel Formspree

**Quando o volume de leads justificar:**
→ Ativar `apps/api/` com router `/leads` que valida via `packages/shared/schemas/lead.py` e envia para CRM

---

## Infraestrutura Disponível

### Vercel / GitHub Pages
- **Deploy atual:** site estático em `apps/web/`
- **Deploy:** push para GitHub (auto-deploy via Vercel) ou `vercel --prod`

### VPS Hetzner (Tailscale) — disponível para fases futuras
- **Acesso:** `ssh vps-trion`
- **Tem:** n8n (Docker), Docker, Claude Code autónomo
- **Usar para:** automações 24/7, n8n workflows, agentes IA quando o produto evoluir

### Formspree — ativo
- Gestão de formulários sem backend
- Painel: formspree.io

---

## Roadmap resumido

| Fase | O que é | Estado |
|------|---------|--------|
| 0 — Scaffold | Monorepo PNPM, FastAPI stub, schemas Pydantic | ✅ Feito |
| 1 — MVP Site | Home completa, Sobre, Soluções, Contacto, 1 caso de sucesso | 🔄 Em curso |
| 2 — Conversão | Landing pages por dor, A/B tests, chatbot opcional | ⏳ Futuro |
| 3 — Escala | Conteúdo SEO, campanhas pagas, portal de clientes | ⏳ Futuro |

---

## Decision Framework — quando ativar o backend

| Situação | Ação |
|----------|------|
| Leads simples (nome, email, empresa) | Formspree — sem backend |
| Qualificação avançada + CRM próprio | Ativar `apps/api/` router `/leads` |
| Automações entre SaaS (Slack, Notion, email) | n8n na VPS |
| Portal de clientes autenticado | Fase futura — fora de escopo V1 |

---

*Versão: 1.0 — Website Institucional B2B · Stack vanilla + Formspree*
*Última atualização: 2026-03-27*
