# Constraints & Regras de Negócio — Trion Scale

> Limitações, restrições técnicas e edge cases que o agente deve respeitar.
> Derivado do PRD (`directives/specs.md`) + decisões de arquitetura.

---

## Fora de Escopo (V1)

Os seguintes itens estão **explicitamente excluídos** da versão inicial:

- Portal de clientes autenticado (área logada)
- Dashboard interativo de acompanhamento de projetos
- Comunidade online ou fórum
- Blog multilíngue completo (apenas português na V1; infraestrutura preparada para i18n futuro)
- E-commerce ou contratação self-service de produtos

---

## Segurança — Zero Trust / Tailscale

- **NUNCA** usar IPs públicos em `DATABASE_URL` ou qualquer conexão de infraestrutura.
- Todas as ligações a serviços internos (DB, Redis, etc.) devem usar IPs da rede Tailscale (`100.x.x.x`).
- Secrets **nunca** entram em código ou em ficheiros versionados. Sempre via `.env` (local) ou variáveis de ambiente injetadas pelo runtime (Vercel, Docker).
- API keys de terceiros (CRM, analytics, email) apenas em `.env`, nunca em frontend ou logs.

---

## Tipagem

- Backend Python: **mypy strict** obrigatório. Zero `Any` implícito.
- Schemas partilhados vivem **exclusivamente** em `packages/shared/`. Frontend e backend importam daqui.
- Se um campo existe no frontend mas não no schema Pydantic → erro de validação, não silêncio.

---

## Performance

- LCP (Largest Contentful Paint) < 2,5 segundos em conexões de banda larga média (RNF1).
- Imagens otimizadas antes de commit (WebP preferred, max 500KB).
- Sem dependências de CDN externo para assets críticos (fonte de falha).

---

## Conformidade e Privacidade

- HTTPS obrigatório em todas as páginas (RNF4).
- Cookie consent em conformidade com GDPR para visitantes da UE (RNF5).
- Dados de formulários armazenados em serviços conformes com privacidade corporativa (RNF6).
- Emails corporativos nos formulários de lead (validar domínio se possível, ou pelo menos formato).

---

## Manutenibilidade

- Conteúdo editável por equipa não técnica: usar CMS ou estrutura de ficheiros simples (RNF7).
- Novas landing pages e conteúdos sem necessidade de dev pesado (RNF8).
- Código comentado em zonas não óbvias; sem comentários redundantes (RNF9).

---

## Lead Quality

- Campo `descricao_dor` no formulário é importante para qualificação — não tornar obrigatório (aumenta fricção), mas incentivar preenchimento.
- Meta de 40%+ leads qualificados (MQL/SQL) sobre total.
- Formulários com campos suficientes para qualificar mas sem excesso (máx. 6–7 campos visíveis na V1).

---

## Idioma e Tom

- Comunicação em **Português (PT-PT)** em toda a interface e conteúdos.
- Tom: profissional mas acessível, confiante sem hype, orientado a valor (ver PRD §"Tom de voz").
- Evitar jargão técnico sem explicação quando público é misto (negócio + tecnologia).

---

*Última atualização: 2026-03-27*
