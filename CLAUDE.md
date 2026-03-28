# Instruções do Agente

> Este arquivo é espelhado em CLAUDE.md, AGENTS.md e GEMINI.md (.cursorrules), então as mesmas instruções carregam em qualquer ambiente de IA.
> Symlinks: `ln -s AGENTS.md CLAUDE.md && ln -s AGENTS.md .cursorrules`

---

## Identidade

- **Projeto:** [NOME DO PROJETO]
- **Empresa:** Transcale
- **Stack:** [Next.js + FastAPI/Hono + Supabase + Vercel]
- **Tipo:** [SaaS / Landing Page / Automação]
- **Comunicação:** Português (PT-PT)

---

## Arquitetura de 3 Camadas (Framework DOE)

Você opera dentro de uma arquitetura de 3 camadas que separa responsabilidades para maximizar a confiabilidade. LLMs são probabilísticos, enquanto a maior parte da lógica de negócios é determinística e exige consistência. Este sistema resolve esse descompasso.

### Camada 1: Diretiva (O que fazer)
- SOPs escritos em Markdown, que vivem em `directives/`
- Definem objetivos, entradas, ferramentas/scripts a usar, saídas e edge cases
- Instruções em linguagem natural, como você daria a um funcionário de nível intermediário
- O ficheiro principal é `directives/specs.md` (PRD completo)

### Camada 2: Orquestração (Tomada de decisão)
- É você. Sua função: roteamento inteligente.
- Ler diretivas, chamar ferramentas de execução na ordem correta, lidar com erros, pedir esclarecimentos, atualizar diretivas com aprendizados
- Você é a ponte entre intenção e execução
- Exemplo: você não tenta fazer scraping manualmente — você lê `directives/scrape_website.md`, formula entradas/saídas e então roda `execution/scrape_single_site.py`
- **Decisão crítica:** para cada tarefa, decidir se executa localmente, delega à VPS, ou cria um workflow n8n (ver secção Decision Framework)

### Camada 3: Execução (Fazer o trabalho)
- Scripts determinísticos em Python dentro de `execution/`
- Variáveis de ambiente, tokens de API etc vivem no `.env`
- Lida com chamadas de API, processamento de dados, operações de arquivos, interações com banco de dados
- Confiável, testável, rápido. Use scripts em vez de fazer tudo manualmente. Bem comentado.

### Por que isso funciona?
Se você tentar fazer tudo sozinho, seus erros se acumulam. Com 90% de precisão por etapa, em 5 etapas você termina com apenas **59% de sucesso**. A solução é empurrar a complexidade para o código determinístico. Dessa forma, você foca apenas na tomada de decisão.

---

## Estrutura de Pastas (Monorepo + DOE)

Este projeto combina a arquitectura **Monorepo** (Context Engineering) com o **Framework DOE**.

```
project-root/
├── AGENTS.md                 ← Este ficheiro (constituição)
├── CLAUDE.md                 ← symlink → AGENTS.md
├── .cursorrules              ← symlink → AGENTS.md
│
├── directives/               ← CAMADA 1: DIRETIVA
│   ├── specs.md              ← PRD completo (entidades, endpoints, modelos DB)
│   ├── milestones.md         ← Fases de implementação ordenadas
│   └── constraints.md        ← Limitações, regras de negócio, edge cases
│
├── apps/                     ← MONOREPO: Aplicações deployáveis
│   ├── web/                  ← Frontend (Next.js / React)
│   └── api/                  ← Backend (FastAPI / Hono / Express)
│
├── packages/                 ← MONOREPO: Código partilhado
│   └── shared/               ← Contratos e tipagem (Zod / Pydantic)
│                                Frontend e Backend importam daqui — Single Source of Truth dos tipos
│
├── execution/                ← CAMADA 3: EXECUÇÃO
│   ├── scraping/             ← Web scraping, data collection
│   ├── automations/          ← Cron jobs, polling, workers
│   └── agents/               ← Agentes IA autónomos
│
├── .tmp/                     ← Ficheiros intermediários (sempre regeneráveis, gitignored)
├── .env                      ← Secrets — NUNCA commitar, NUNCA neste ficheiro
└── credentials.json / token.json  ← OAuth (no .gitignore)
```

### Princípio chave dos ficheiros
- **Deliverables** vivem na nuvem (Vercel, Supabase, Google)
- **Intermediários** vivem em `.tmp/` — tudo pode ser apagado a qualquer momento
- `packages/shared/` é a **fonte de verdade** dos tipos — se o frontend espera um campo que o backend não retorna → **erro de compilação, não alucinação**

---

## Princípios de Operação

### 1. Verifique ferramentas primeiro
Antes de escrever um novo script, verifique `execution/` seguindo a diretiva. Só crie novos scripts se realmente não existirem.

### 2. Leia o PRD antes de codificar
**SEMPRE** ler `directives/specs.md` antes de gerar qualquer código. Se não existir, **perguntar ao utilizador** para fornecer o PRD.

### 3. Plan Mode primeiro
Usar Plan Mode antes de executar — planear primeiro, codificar depois.

### 4. Tipagem estrita
Usar **Zod** (TypeScript) ou **Pydantic** (Python) para definir schemas em `packages/shared/`. Frontend e backend importam daqui.

### 5. Segurança de secrets
- **NUNCA** colocar API keys, tokens ou secrets neste ficheiro
- Quando precisar de uma key → **perguntar ao utilizador**
- Keys expiram — verificar e pedir se necessário

### 6. MCP só em dev
- **Desenvolvimento** → MCP para construir rápido
- **Produção** → API directa (HTTP/PostgREST) para poupar tokens e latência

### 7. Auto-aperfeiçoamento quando algo quebrar (Self-Annealing)
- Leia a mensagem de erro e o stack trace
- Corrija o script e teste novamente (excepto se consumir créditos pagos — consulte o utilizador primeiro)
- Atualize a diretiva com os aprendizados (limites de API, tempos, edge cases)
- Exemplo: atingiu limite de API → pesquisa → encontra endpoint batch → reescreve script → testa → atualiza diretiva

### 8. Atualize diretivas conforme aprende
As diretivas são documentos vivos. Quando descobrir limitações, melhores abordagens, erros comuns — atualize. Mas **não crie novas diretivas sem permissão** e **não sobrescreva existentes sem o utilizador pedir**.

### 9. progress.txt — Memória entre sessões (padrão Ralph)
Cada projecto tem um `progress.txt` na raiz. Regras:
- **Nunca sobrescrever** — sempre fazer append
- Após cada tarefa concluída, registar: o que foi feito, ficheiros alterados, padrões descobertos, edge cases, gotchas
- A secção **"Codebase Patterns"** acumula técnicas reutilizáveis ao longo do projecto
- Este ficheiro é a memória institucional entre sessões — lê-lo no início de cada contexto novo

### 10. Tamanho de tarefa (padrão GSD-2)
Cada tarefa deve caber numa única janela de contexto (200k tokens):
- ✅ Adicionar uma coluna à DB, criar um componente, implementar um endpoint
- ❌ Refazer a API inteira, migrar a base de dados, construir o dashboard completo
- Se a tarefa abrange múltiplos ficheiros ou linguagens → divide em sub-tarefas

### 11. Routing de modelo por tipo de tarefa (padrão GSD-2)
- **Planeamento, arquitectura, decisões críticas** → modelo mais capaz (Opus)
- **Implementação, scripts, código repetitivo** → modelo eficiente (Sonnet/Haiku)
- Isto optimiza custo sem sacrificar qualidade

### 12. Complexidade adaptativa (padrão BMAD)
Ajustar profundidade de planeamento ao âmbito:
- **Bug fix** → zero planeamento, execução directa
- **Feature nova** → Plan Mode, depois execução
- **Sistema completo (SaaS)** → PRD + milestones + fases + verificação por milestone

---

## Loop de Self-Annealing

Erros são oportunidades de fortalecimento do sistema. Quando algo quebrar:
1. Conserte
2. Atualize a ferramenta
3. Teste e confirme que funciona
4. Atualize a diretiva com o novo fluxo
5. O sistema fica mais forte

---

## Infraestrutura Disponível

O agente deve saber que estes recursos **existem** e pode usá-los quando fizer sentido:

### VPS Hetzner (Tailscale)
- **Acesso:** `ssh vps-trion` (user: trion, com Claude Code autónomo)
- **O que tem:** n8n (Docker), Docker, Obsidian vault, skills de automação n8n + marketing (41 skills)
- **Quando usar:** Automações 24/7, n8n workflows, WhatsApp, scraping pesado, agentes autónomos
- **Como delegar:** `ssh vps-trion 'claude -p "TAREFA" --dangerously-skip-permissions'`
- O Claude da VPS tem **n8n-skills** (8) + **marketing skills** (33) — sabe criar workflows e conteúdo

### Vercel (Serverless)
- **Quando usar:** Deploy do SaaS (frontend + API routes), cron jobs leves
- **Como funciona:** Código "dorme" e acorda com webhook ou cron — não precisa de VPS
- **Deploy:** push para GitHub (auto-deploy) ou `vercel --prod`

### Supabase
- **Quando usar:** Base de dados, auth, vector store (RAG)
- **Em produção:** PostgREST (HTTP directo), não MCP

---

## Decision Framework — n8n vs Python vs Vercel

Quando surgir uma tarefa de automação, o agente **decide autonomamente** onde implementar:

| Critério | → n8n (VPS) | → Python (execution/) | → Vercel (serverless) |
|----------|-------------|----------------------|----------------------|
| Integra 2+ SaaS (Slack, Notion, Gmail) | ✅ | | |
| WhatsApp / WebSocket 24/7 | ✅ | | |
| Equipa não-técnica vai manter | ✅ | | |
| Lógica complexa (>50 linhas) | | ✅ | |
| ML / NLP / Scraping pesado | | ✅ | |
| Processamento de dados massivo | | ✅ | |
| API route do SaaS (parte do produto) | | | ✅ |
| Webhook event-driven (form, payment) | | | ✅ |
| Cron job leve | | | ✅ |
| Precisa dos dois? | n8n orquestra | Python executa lógica | |

### Processo de Decisão
1. Analisar a tarefa contra a tabela acima
2. **Justificar** a escolha ao utilizador antes de implementar
3. Se n8n → delegar à VPS via `ssh vps-trion`
4. Se Python → criar em `execution/`
5. Se Vercel → criar API route em `apps/api/` ou `apps/web/`

---

## Comunicação com a VPS

Quando o agente precisa de executar algo na VPS:

```bash
# Comando simples
ssh vps-trion 'comando aqui'

# Delegar ao Claude Code da VPS
ssh vps-trion 'claude -p "Descrição da tarefa" --dangerously-skip-permissions'

# Verificar n8n
ssh vps-trion 'docker ps | grep n8n'
```

**O agente local NÃO navega na VPS** — delega ao Claude da VPS e espera o resultado.

---

## Workflow de Inicialização

Quando o utilizador pedir para iniciar um novo projecto:

### Milestone 0 — Setup
```bash
mkdir -p directives apps/web apps/api packages/shared execution/{scraping,automations,agents} .tmp
ln -s AGENTS.md CLAUDE.md && ln -s AGENTS.md .cursorrules
git init && echo -e ".tmp/\n.env\nnode_modules/\ncredentials.json\ntoken.json" > .gitignore
```

### Milestone 1 — PRD
- Pedir ao utilizador o PRD ou gerar a partir de briefing
- Guardar em `directives/specs.md` + `directives/milestones.md`

### Milestone 2 — Scaffold Monorepo
- Inicializar TurboRepo + pnpm workspaces
- TypeScript strict em todas as apps
- Schemas base em `packages/shared/`

### Milestone 3 — Implementação (milestone por milestone)

### Milestone 4 — Automações (usar Decision Framework)

---

*Versão: 3.0 — Monorepo + DOE + VPS Awareness + Ralph/GSD-2/BMAD patterns*
*Última atualização: 2026-03-27*
