# Milestones — Trion Scale Website

> Derivado do PRD em `directives/specs.md`. Atualizar conforme progresso.

---

## Milestone 0 — Setup & Scaffold ✅
**Objetivo:** Infraestrutura base do monorepo pronta para desenvolvimento.

- [x] PNPM workspaces inicializado
- [x] `apps/web/` — site vanilla movido da raiz
- [x] `apps/api/` — FastAPI scaffold com strict typing (mypy)
- [x] `packages/shared/` — schemas Pydantic centralizados (LeadCreate, LeadResponse)
- [x] Ruff + pre-commit hooks configurados
- [x] `.env.example` com placeholders (DATABASE_URL via Tailscale)
- [x] `directives/` populada (specs.md, milestones.md, constraints.md)

---

## Milestone 1 — React Migration + Rebranding ✅
**Objetivo:** Migrar site vanilla HTML para Next.js 15 com novo design system.
**Concluído:** 2026-03-28

### 1.1 Stack
- [x] Next.js 15 (App Router, TypeScript strict, Turbopack)
- [x] Tailwind CSS v4 + oklch design tokens
- [x] Three.js sistema de partículas interativo (hero)
- [x] Framer Motion (motion v12) para animações
- [x] Formspree para captura de leads (endpoint xykbzqjg)

### 1.2 Secções migradas
- [x] Header (sticky, blur backdrop, hamburger mobile)
- [x] Hero (partículas Three.js + texto animado + InfiniteSlider tech stack)
- [x] ParaQuem (4 cards com Lucide icons)
- [x] Soluções (3 cards expandidos com features e casos de uso)
- [x] Metodologia (timeline vertical 5 passos)
- [x] Diferencial (tabela comparativa)
- [x] Prova Social (logo marquee + testimonials slider)
- [x] Segurança (2 colunas enterprise features)
- [x] Sobre (3 pilares com Lucide icons)
- [x] CTA final (card com radial gradient)
- [x] Footer (4 colunas, links, social)
- [x] Modal de contacto (Formspree, 6 campos)

### 1.3 Próximos steps (novo PRD)
- [ ] Mobile responsiveness audit
- [ ] prefers-reduced-motion nos sliders e partículas
- [ ] SEO on-page (meta tags, sitemap, OG tags)
- [ ] Google Analytics + event tracking
- [ ] Vercel deploy (push + testar standalone build)
- [ ] Modal: testar submissão real ao Formspree

---

## Milestone 2 — Otimização para Conversão (Fase 2 do PRD)
**Objetivo:** Aumentar taxa de conversão visit→lead para 2–4%.
**Referência PRD:** Fase 2 — 6 a 8 semanas após MVP.

- [ ] Landing pages específicas por dor (ex: "IA para Operações", "Automação Financeira")
- [ ] Expansão de recursos/artigos (min. 5 artigos otimizados para SEO de cauda longa)
- [ ] Testes A/B em headlines e CTAs principais
- [ ] Chatbot/assistente (RF9 do PRD) — opcional
- [ ] Área de download de materiais ricos (lead magnets)

---

## Milestone 3 — Escala e Experimentação (Fase 3 do PRD)
**Objetivo:** Crescimento orgânico 5–10%/mês + pipeline de leads qualificados.
**Referência PRD:** Fase 3 — contínuo.

- [ ] Produção constante de conteúdos fundo de funil
- [ ] Expansão de provas sociais (depoimentos, logos, métricas)
- [ ] Integração com campanhas pagas (Google Ads, LinkedIn Ads)
- [ ] Portal de clientes autenticado (fora de escopo V1, mas preparar arquitetura)

---

*Última atualização: 2026-03-28*
