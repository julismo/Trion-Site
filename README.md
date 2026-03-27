# Trion Scale — Website Institucional B2B

Website institucional de alta conversão para a **Trion Scale**, empresa de tecnologia especializada em soluções de inteligência artificial personalizadas para empresas de médio e grande porte.

---

## 🌐 Visão Geral do Projeto

**Empresa:** Trion Scale  
**Tipo:** Website institucional B2B — Single Page Application (SPA)  
**Idioma:** Português (pt-BR / pt-PT)  
**Objetivo principal:** Gerar leads qualificados para projetos de IA sob medida

---

## ✅ Funcionalidades Implementadas

### Estrutura de Páginas (SPA com scroll suave)
- **Header sticky** com efeito transparente → sólido ao scroll e menu mobile responsivo
- **Hero Section** com headline principal, sub-headline, CTAs e ticker animado de métricas
- **Para Quem** — 4 cards de personas (COO, CIO, Dir. Inovação, CEO/Fundador)
- **Soluções** — 3 soluções detalhadas com visualizações interativas (Agentes de IA, Automações, Software Sob Medida)
- **Como Trabalhamos** — Processo em 5 etapas com code block decorativo
- **Diferencial** — Tabela comparativa IA Genérica vs. IA Sob Medida (Trion Scale)
- **Casos de Sucesso** — 3 case studies com métricas (Indústria, Logística, Serviços Financeiros)
- **Prova Social** — Marquee de logos de clientes + slider de testemunhos
- **Segurança e Integração** — Badges GDPR, SSL, Encryption + features
- **Recursos** — 3 artigos de pré-visualização com categorias
- **Sobre** — Missão, descrição e 3 pilares da empresa
- **CTA Final** — Seção com fundo escuro e chamada à ação forte
- **Footer** completo com navegação, redes sociais e links legais

### Funcionalidades Técnicas
- ✅ Formulário de contacto modal com validação HTML5
- ✅ Captura de leads via RESTful Table API (tabela `leads`)
- ✅ Animações de reveal ao scroll (IntersectionObserver)
- ✅ Slider de testemunhos com autoplay e controles
- ✅ Ticker animado de métricas (CSS animation)
- ✅ Marquee infinito de logos (CSS animation)
- ✅ Botão "Scroll to Top"
- ✅ Menu mobile responsivo (hamburger)
- ✅ Active nav link highlighting
- ✅ Smooth scroll para todas as âncoras
- ✅ Analytics tracking placeholder (gtag)
- ✅ Contador animado em números de resultados

### Design e UX
- ✅ Design moderno inspirado em referência Optimus (v0-optimus-delta.vercel.app)
- ✅ Paleta: Navy escuro `#0a0f1e` + Accent azul `#0ea5e9` + Teal `#0d9488`
- ✅ Tipografia Inter (Google Fonts)
- ✅ Grid pattern sutil no hero e CTA final
- ✅ Cards com hover effects e animações
- ✅ Seções numeradas (01, 02, 03) estilo Optimus
- ✅ Fully responsive: desktop, tablet, mobile

---

## 🗂️ Estrutura de Ficheiros

```
index.html          # Página principal (SPA)
css/
  style.css         # Estilos principais completos
js/
  main.js           # JavaScript principal
README.md           # Este ficheiro
```

---

## 📡 Endpoints da API

### Tabela: `leads`
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `tables/leads` | Criar novo lead |
| `GET`  | `tables/leads` | Listar leads |
| `GET`  | `tables/leads/{id}` | Ver lead específico |
| `PATCH`| `tables/leads/{id}` | Atualizar lead |
| `DELETE`| `tables/leads/{id}` | Remover lead |

### Schema da Tabela `leads`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | text | Identificador único (auto) |
| `nome` | text | Nome do contacto |
| `email` | text | Email corporativo |
| `empresa` | text | Nome da empresa |
| `cargo` | text | Cargo (COO, CIO, etc.) |
| `interesse` | text | Área de interesse principal |
| `descricao` | rich_text | Descrição do desafio/objetivo |
| `origem` | text | Origem do lead (website_formulario) |
| `data_submissao` | datetime | Timestamp da submissão |

---

## 🚀 Próximos Passos Recomendados

### Curto prazo
- [ ] Criar páginas individuais de soluções (Agentes de IA, Automações, Software Sob Medida)
- [ ] Criar páginas detalhadas de casos de sucesso
- [ ] Criar página de Recursos/Blog com artigos completos
- [ ] Integrar calendário de agendamento (Calendly ou similar)
- [ ] Configurar Google Analytics 4 + Tag Manager

### Médio prazo
- [ ] Landing pages específicas por dor (ex: "IA para Logística", "Automação Financeira")
- [ ] Sistema de newsletter (integração Mailchimp, Brevo, etc.)
- [ ] Chatbot/assistente de qualificação de leads
- [ ] Implementar i18n para versão em inglês/espanhol
- [ ] Testes A/B em headlines e CTAs

### Funcionalidades Fora de Escopo (V1)
- Portal de clientes autenticado
- Dashboard interativo de projetos
- E-commerce / contratação self-service
- Blog multilíngue completo
- Área de membros / comunidade

---

## 🎨 Guia de Design

### Paleta de Cores
| Nome | Hex | Uso |
|------|-----|-----|
| Primary (Navy) | `#0a0f1e` | Textos principais, botões |
| Secondary | `#1a2744` | Hover states, dark sections |
| Accent (Blue) | `#0ea5e9` | Destaques, links, ícones |
| Teal | `#0d9488` | Badges alternativos, gradients |
| Gray 50 | `#f8fafc` | Seções alternadas |

### Tipografia
- **Família:** Inter (300, 400, 500, 600, 700, 800, 900)
- **Headings:** 800-900 weight, letter-spacing: -0.02em a -0.03em
- **Body:** 400-500 weight, line-height: 1.6-1.7

---

© 2026 Trion Scale. Todos os direitos reservados.
