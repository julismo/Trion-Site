# Tokens extraídos — grupowebhub.com.br/home (2026-04-07)

Captura forense via Playwright + computed styles. Para uso como referência na hero do Trion-Site v2 (NÃO copiar literal — adaptar à brand Trion).

## Stack confirmada
- **GSAP 3.14.1** + **ScrollTrigger** + **SplitText** + **ScrollSmoother**
- **Three.js GLTFLoader** (para outras secções, não hero)
- **Sem Framer Motion, sem Lenis, sem AOS, sem Swiper, sem Lottie**
- **Pure GSAP stack** — mesma que nós já temos

## Fontes
| Uso | Família | Weight | Notas |
|---|---|---|---|
| **Display (h1/h2)** | **Clash Display** | 400, 500, 700 | Indian Type Foundry — free pessoal e comercial. Geometric, premium. |
| **Body / UI** | **Inter** | 100-900 variable | Sans neutra, padrão B2B. |

→ Para Trion: já temos **Geist** (similar premium feel). Poderíamos adicionar **Clash Display** ou **Space Grotesk** para headlines, mas Geist em weight 600 já cumpre a função visual.

## Cores (RGB)
| Token | Valor | Uso |
|---|---|---|
| `body bg` | `#000000` (pure black) | Toda a página — NÃO é oklch dark, é preto puro |
| `fg primary` | `rgba(255,255,255,0.9)` | Headlines, body text principal |
| `fg muted` | `rgba(255,255,255,0.75)` | Subtitles, descrições |
| `fg subtle` | `rgba(255,255,255,0.5)` | Captions |
| `border subtle` | `rgba(255,255,255,0.204)` | Borders de pill buttons secundários |
| `eyebrow text` | `#dfdfdf` | Texto dentro do cardSubtitulo (h3) |
| accent | (não usam — neutral palette) | Trion mantém orange `oklch(0.7 0.18 40)` |

## Tipografia exacta da hero
| Elemento | Família | Weight | Size | Line-height | Color | Align |
|---|---|---|---|---|---|---|
| **H2 hero (textoAnimado)** | Clash | **400** | **54.72px** (3.42rem) | **72px** (1.31) | white 90% | center |
| **P subtitle** | Inter | 400 | 16px | 25.6px (1.6) | white 75% | center |
| **H3 eyebrow** | Inter | 500 | 14px | normal | #dfdfdf | center |

→ Insight crítico: usam Clash em **weight 400 (regular)** mas a font é naturalmente bold-feeling. Para igualar com Geist precisaríamos weight 600/700.

## Container hero
| Prop | Valor | Notas |
|---|---|---|
| Section height | **900px** (fixa, não min-h) | Quase full screen |
| Padding | **40px** (todos os lados) | |
| Layout | Centered (text-align center) | |

## Buttons (PILL design — diferente do nosso!)
### Primário (`botaoPrimario`)
| Prop | Valor |
|---|---|
| bg | `rgba(255,255,255,0.9)` (quase branco) |
| color text | `rgba(0,0,0,0.9)` (quase preto) |
| border | nenhum |
| **border-radius** | **40px (full pill)** |
| padding | **8px 8px 8px 20px** (asymmetric — deixa espaço para ícone seta à direita) |
| font | Inter 400 16px |

### Secundário (`botaoSecundario`)
| Prop | Valor |
|---|---|
| bg | `rgba(0,0,0,0.9)` (quase preto) |
| color text | `rgba(255,255,255,0.9)` |
| border | **2px solid rgba(255,255,255,0.204)** |
| border-radius | 40px (pill) |
| padding | 8px 8px 8px 20px |
| font | Inter 400 16px |

→ Para Trion: aplicar pill shape + 8/20 padding asymmetric, mas manter accent orange como primário (não copiar branco neutro). Tem sentido B2B premium.

## Eyebrow / cardSubtitulo
- DIV pill com video bg interior (`card-subtitulo.mp4`)
- border-radius: 40px
- text "VAMOS CRIAR ALGO INCRÍVEL JUNTOS" em 14px Inter Medium #dfdfdf
- Para Trion: **podemos fazer um eyebrow estático** (sem video) — pill com `border + bg-bg-elevated` e accent dot/icon.

## Background & overlays
- **Sem gradient base no `<section>`** — herda body `#000`
- O bg vem todo do `<video>` element absoluto cobrindo a hero
- **Sem CSS overlay sobre o video** — o próprio video está composto com áreas dark intencionais
- Lição: o video do grupowebhub é desenhado com **safe areas** (top dark, lava middle, bottom dark) — não precisam de overlay

→ Para nós (sem video custom): vamos usar 4 camadas conforme plano (gradient + glow + grid + noise) para gerar um bg sintético dark-with-ambient.

## Animações detectadas (script.js)
```js
// Hero text reveal — linha 384-404 do script.js
const textos = document.querySelectorAll(".textoAnimado");
textos.forEach((texto) => {
  const split = new SplitText(texto, { types: "lines, words, chars" });
  gsap.from(split.chars, {
    filter: "blur(20px)",
    opacity: 0,
    duration: 0.3,
    stagger: { each: 0.02, from: "random" },
    scrollTrigger: { trigger: texto, start: "top 80%", toggleActions: "play none restart none" },
  });
});
```

→ Já replicado em `SplitTextReveal effect="blur"`.

## Video hero specs (já recolhido)
| Spec | Valor |
|---|---|
| Resolução | 1920×1060 |
| Codec | H.264 |
| Duração | 7.42s loop |
| Tamanho | 1.88 MB |
| Bit rate | 2.03 Mbps |
| Atributos | autoplay muted loop playsInline |
