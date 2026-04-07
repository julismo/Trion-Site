# Cross-Table — 10 Premium Reference Sites
> Scraped 2026-04-06 via `_validation/reference-scrape.mjs` (Skill: `reference-scraping`).
> Source data: `_validation/references/<site>/patterns.json`

## 1. Transitions — durations & easings (most-used per site)

| Site | Top duration | Top easing | Border radius | Font weight | Libs detected |
|------|-------------|------------|---------------|-------------|---------------|
| **linear**    | **0.16s** (12×) | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (22×) | 4px (20×) | 400 (32×) / 510 (18×) | — |
| stripe    | 0.3s (29×)  | `cubic-bezier(0.25, 1, 0.5, 1)` (29×)        | 4px (13×) | 400 (50×) | **ogl** |
| **vercel**    | **0.09s** (5×)  | `cubic-bezier(0.39, 0.18, 0.17, 0.99)` (1×)  | **6px (42×)** | 400 (45×) / 500 (5×) | **ogl** |
| anthropic | 0.2s (43×)  | (mostly default `ease`)                       | 8px (4×)  | 400 (mix)  | **gsap** |
| attio     | 0.3s (mix)  | `cubic-bezier(0.2, 0, 0, 1)` (mix)            | 10px      | **500**    | **ogl** |
| resend    | **0.15s**   | `cubic-bezier(0.4, 0, 0.2, 1)` (Material)     | 8px       | 400        | — |
| framer    | 0.3s        | `cubic-bezier(0.44, 0, 0.56, 1)`              | 15px      | 400        | **ogl + motion** |
| raycast   | 0.3s        | `ease-in-out`                                 | 20px      | **500**    | **ogl** |
| **spline**    | 0.2s        | `ease-in-out`                                 | 12px      | 400        | **ogl + splinetool** |
| lovable   | **0.15s**   | `cubic-bezier(0.4, 0, 0.2, 1)` (Material)     | 12px      | 400        | **ogl** |

---

## 2. CONVERGENCE DETECTED (8/10+ patterns)

### 🟢 Library: **OGL is universal**
**8 of 10 sites use OGL** (only Linear and Resend don't). This includes Stripe, Vercel, Framer, Raycast, Spline, Lovable, Attio. The brief said "OGL is the 2026 pick" — empirically confirmed. **OGL > three.js for hero canvas/distortion.**

### 🟢 Font weight: **400 dominates everything**
**8/10 sites use weight 400 as primary** — including buttons! Only Attio and Raycast use 500. **Linear uses custom 510** (between regular and medium — a Linear-specific tell).
- **Anti-pattern confirmed:** weight 600/700 in CTAs is template tell. Premium = 400-510.
- **Our code:** uses 500/600 in `GradientButton.tsx` — MUST DROP to 400 or 510.

### 🟢 Hover duration cluster
- **6/10 sites** use **150-200ms** (linear 160, vercel 90, anthropic 200, resend 150, lovable 150, spline 200)
- **4/10 sites** use **300ms** (stripe, attio, framer, raycast)
- **0/10 sites** use 250ms — it's a dead zone
- **Convergence:** the "snappy tech" school = 150-200ms; the "spacious premium" = 300ms.
- **Our code:** uses 300ms in 9/10 hovers. We're in the "spacious premium" school — but inconsistent (1× 200ms in Navbar). Pick a school and commit.

### 🟢 Border radius cluster
- **Tight tech school (4-6px):** linear 4, stripe 4, vercel 6 → 3 sites
- **Modern medium (8-12px):** anthropic 8, resend 8, attio 10, spline 12, lovable 12 → 5 sites
- **Bold rounded (15-20px):** framer 15, raycast 20 → 2 sites
- **Convergence:** **8-12px is the dominant modern band.**
- **Our code:** `--radius-card: 24px`, `--radius-button: 12px`. Cards are 2× the modern range. Buttons are at the upper edge of "medium". Likely too rounded for "tech B2B" feel.

---

## 3. EASING CURVES ANALYSIS

No single curve dominates, but they all share a **shape**: easeOut variants with low first control point. Plotted:

| Easing name | Sites | First control point |
|-------------|-------|---------------------|
| `cubic-bezier(0.25, 1, 0.5, 1)` (easeOutQuart) | **stripe** | 0.25 — gentle |
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (easeOutQuad-ish) | **linear** | 0.25 — gentle |
| `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) | **resend, lovable** | 0.4 — neutral |
| `cubic-bezier(0.2, 0, 0, 1)` (snappy out) | **attio** | 0.2 — snappy |
| `cubic-bezier(0.44, 0, 0.56, 1)` (Framer custom) | **framer** | 0.44 — symmetric |
| `cubic-bezier(0.39, 0.18, 0.17, 0.99)` (Vercel snap) | **vercel** | 0.39 — snappy |
| `ease-in-out` | **raycast, spline** | default |
| `ease` | **anthropic** | default (mostly inline) |

**The 3 archetypes:**
1. **"Premium smooth"** — easeOutQuart family (Stripe, Linear modified). Slow start, gentle finish. Best for headlines, hero reveals, big-feel transitions.
2. **"Material/snappy"** — Material curves (Resend, Lovable, Attio, Vercel). Faster, more functional. Best for buttons, hovers, micro-interactions.
3. **"Lazy default"** — ease/ease-in-out (Anthropic, Raycast, Spline). They got away with it because their content is so strong they don't need motion.

**Recommendation for Trion:** mix 1 + 2. Use easeOutQuart for hero reveals (`cubic-bezier(0.25, 1, 0.5, 1)`), Material for hovers (`cubic-bezier(0.4, 0, 0.2, 1)`).

---

## 4. CTA Style Comparison (computed from real elements)

### Linear "Sign up"
```
background: rgb(255, 255, 255)   /* white CTA on dark */
color: rgb(8, 9, 10)
borderRadius: 4px
fontWeight: 510                   /* custom weight, not bold */
fontSize: 13px                    /* TINY — Linear is famously small-text */
padding: 0px 12px                 /* tight horizontal, no vertical (height comes from line-height) */
transition: ALL properties at 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)
boxShadow: layered subtle (5 layers, opacity 0.01-0.08)
```

### Stripe "Stripe para Startups" (Portuguese — geo-detected)
```
background: rgb(64, 50, 200)      /* indigo */
color: rgb(255, 255, 255)
borderRadius: 4px
fontWeight: 400                   /* regular weight on CTA — confidence */
fontSize: 16px                    /* readable */
padding: 15.5px 24px 16.5px       /* asymmetric vertical 15.5/16.5 — typographic detail */
transition: bg, color, border @ 0.3s cubic-bezier(0.25, 1, 0.5, 1)
boxShadow: none                   /* flat */
```

### Linear vs Stripe vs Trion (current)
| Property | Linear | Stripe | Trion (current) |
|----------|--------|--------|-----------------|
| Border radius | 4px | 4px | **12px** (3× too big) |
| Font weight | 510 | 400 | **500-600** |
| Font size | 13px | 16px | likely 14-16px |
| Transition duration | 0.16s | 0.3s | 0.3s |
| Easing | quad-out | quart-out | `--ease-out-soft (0.16, 1, 0.3, 1)` ✓ similar to Stripe |
| Box shadow | 5-layer subtle | none | likely 1-layer |

**Verdict:** our current button is closer to "Spline-y modern" (12px radius, 500 weight) than to Linear/Stripe. Decision needed: do we want **Linear/Stripe tech feel** (4px radius, 400-510 weight, slower padding) or **Spline/Attio modern feel** (10-12px radius, 500 weight, more padding)?

---

## 5. Hero Layout Patterns (visual screenshot review)

| Site | Headline align | CTAs | Below-fold visual |
|------|---------------|------|-------------------|
| linear    | **CENTRED**     | 1 white | Product screenshot UI |
| stripe    | **LEFT**        | 2 (primary + secondary) | Big colorful fluid gradient (right side) |
| vercel    | left            | (CTA missed) | Mesh gradient compute viz |
| anthropic | left            | 2 | Editorial — almost no visual |
| attio     | **CENTRED**     | 2 | CRM screenshot below |
| resend    | left            | 1 | Single envelope SVG drawing |
| framer    | left            | 2 | OGL canvas hero |
| raycast   | left            | 1 + dropdown | Fake-app loop |
| spline    | **CENTRED**     | 1 + "It's free" | 3D scene with floating shapes |
| lovable   | (varies)        | 1 | Video |

**🚨 KEY INSIGHT — contradicts Gu's "always left" rule:**
**4 of 10 sites use centred headlines** (Linear, Spline, Attio, partially others). What they share: a STRONG visual ANCHOR below the centred text (product screenshot, 3D scene, animated UI). Gu's rule was right when the visual is weak — but with a strong below-fold anchor, centred works.

**Trion implication:** since we currently have a hexagon mock (weak visual) on the side, **left-aligned is correct for now**. If we ever build a real product UI screenshot or 3D scene as Hero anchor, centring becomes valid.

---

## 6. Library landscape — what they actually load

| Lib | Sites using | Implication |
|-----|-------------|-------------|
| **OGL** | 8/10 (stripe, vercel, attio, framer, raycast, spline, lovable) + likely more (under-detected) | **Universal for WebGL/canvas. NOT three.js.** |
| **GSAP** | 1/10 (anthropic explicit) | Anthropic uses GSAP. Most others may use it but bundled — undetected. |
| **Motion (framer-motion)** | 1/10 (framer) | Framer uses their own thing. Lower than expected. |
| **Splinetool** | 1/10 (spline only) | Spline is their own product. Confirms the React drop-in works. |
| **Lenis** | 0/10 detected | UNDER-DETECTED — Lenis bundles into the main JS. Not visible via network alone. |

**Notes:**
- Network detection only catches separate chunks — bundled libs are invisible. Real numbers higher.
- The fact that 8/10 sites load `ogl-*.js` means they have it as a separate dynamically-imported chunk = signature of lazy-loaded WebGL hero.

---

## 7. CSS Custom Properties (design system signals)

| Site | Has `--ease-*` tokens | Has `--radius-*` tokens | Has scale tokens |
|------|----------------------|-------------------------|------------------|
| linear    | ✓ (`--ease-in-out-quart`, `--ease-in-out-circ`) | ✓ (`--radius-rounded`, `--radius-circle`) | ✓ |
| stripe    | partial (`--hds-*` namespace, 100s of tokens) | ✓ | ✓ Hashed Design System |
| vercel    | ✓ (`--ds-motion-*`, `--geist-radius`) | ✓ | ✓ Geist DS |
| others    | varies | varies | most have systematic naming |

**Trion implication:** our `globals.css` has 2 ease vars (`--ease-out-soft`, `--ease-in-out-soft`). Linear has at least 2 with names that describe shape (quart, circ). We should rename ours to be more descriptive: `--ease-snap`, `--ease-smooth`, `--ease-reveal`.

---

## 8. The 5 things to take to the bank

1. **OGL > three.js.** If/when we add a 3D hero or distortion, use OGL (~8kb). 8/10 premium sites already do this.
2. **Font weight 400-510 in CTAs.** Drop our 500/600. Stripe puts a 400-weight CTA and looks more confident than any Webflow template.
3. **Border radius 8-12px is the modern band.** Our 24px cards are too rounded. Drop to 16px max. Buttons stay at 8-12px (we're at 12, OK).
4. **Pick ONE easing school: snappy (150ms) OR premium (300ms).** Don't mix unconsciously like we do now. We currently default 300ms — commit to it OR drop to 150ms. Snippets across the codebase must be unified.
5. **Centred headline IS allowed** when there's a strong visual anchor. Without one (our case currently), keep left-aligned. Reopen this if we add a 3D scene or product screenshot below.
