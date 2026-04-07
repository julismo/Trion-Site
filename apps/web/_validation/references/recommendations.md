# Recommendations — Apply to Trion Site V2
> Based on `cross-table.md` (10-site forensic scrape, 2026-04-06).
> Format: each recommendation has the **evidence** (which sites converged), the **current state** in our code (with file:line), and the **change** to make.

---

## 🔴 PRIORITY 1 — Hits all 4 anti-tells we identified earlier

### R1. Standardize on 1 easing system (kill the 5-system chaos)
**Evidence:** Every premium site has 1 dominant easing curve. Linear has 2. Anthropic uses ease (lazy). The "snappy school" (Material/Vercel/Resend/Lovable) and the "smooth school" (Stripe/Linear) are both valid but each commits.

**Current:** `apps/web/app/globals.css` line 51-52 has 2 vars (`--ease-out-soft`, `--ease-in-out-soft`). GSAP files use 5 different easings (`power2.inOut`, `power2.out`, `power3.out`, `power4.out`, `none`). 7 of 9 hovers use Tailwind's default `cubic-bezier(0.4, 0, 0.2, 1)` by accident (Material), 2 use `--ease-out-soft`. Total: **5 systems coexisting unconsciously.**

**Change:**
1. Add to `globals.css` (replace lines 50-52):
```css
/* ----- Easing — 2 curves, intentional ----- */
--ease-snap: cubic-bezier(0.2, 0, 0, 1);          /* Attio — UI feedback (hovers, focus) */
--ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);     /* Stripe easeOutQuart — reveals, big motions */
```
2. **Replace globally** across all `.tsx`:
   - `ease-[var(--ease-out-soft)]` → `ease-[var(--ease-snap)]`
   - All hover transitions get `var(--ease-snap)`
3. **GSAP files** use either:
   - `ease: 'expo.out'` for reveals (= our `--ease-smooth` shape)
   - `ease: 'power3.out'` for hovers/quick (= our `--ease-snap` shape)
   - **DELETE** `power4.out` (used in `SplitTextReveal.tsx:44`) and `power2.inOut` (Loader).

**Files to touch:** `globals.css`, `SplitTextReveal.tsx:44`, `FadeInScroll.tsx:35`, `Loader.tsx:36/42/47`, `GradientButton.tsx:20`, `Navbar.tsx:35/63/73`, `Footer.tsx:88`, `CasosSection.tsx:32/50`, `ParaQuemSection.tsx:39/42`.

---

### R2. Drop button font-weight from 500/600 → 400 (like Stripe) or 510 (like Linear)
**Evidence:** **8/10 premium sites use weight 400 in CTAs**. Linear uses custom 510 (between regular and medium). Bold CTAs are template tells.

**Current:** `GradientButton.tsx` line 20 base class uses `font-medium` (= 500). The plan refers to `--font-weight-medium: 500` and `--font-weight-semibold: 600` — both used in buttons.

**Change:**
1. `GradientButton.tsx:20` — `font-medium` → `font-normal` (= 400)
2. **Optional** (Linear-style): add `--font-weight-cta: 510;` to globals.css and use that — gives a "Linear-feel" intermediate weight.
3. Audit other interactive elements for `font-medium` / `font-semibold` and consider lowering.

---

### R3. Hover duration: commit to 150ms OR 300ms (currently mixed)
**Evidence:** **6/10 sites use 150-200ms** for hovers. **4/10 use 300ms.** Zero use 250ms (dead zone). The split is: "snappy tech" (Linear/Vercel/Resend/Lovable/Anthropic/Spline) vs "spacious premium" (Stripe/Attio/Framer/Raycast).

**Current:** 9 hovers use `duration-300`, 1 uses `duration-200`. We're "spacious premium" by accident.

**Decision needed:**
- **Path A — "Snappy tech" (Linear/Vercel side):** change all `duration-300` → `duration-150`. Better for B2B "feels fast" — matches our "AI agency" positioning.
- **Path B — "Spacious premium" (Stripe/Attio side):** keep `duration-300`, add the missing `--ease-snap` curve so it doesn't feel sluggish.

**Recommendation: Path A (150ms).** Reasoning: AI agencies should feel snappy, not luxurious. Linear is the closest spiritual reference for what Trion is. Plus 150ms feels more "modern" in 2026.

**Files:** any file with `duration-300` (10 occurrences). Find/replace.

---

### R4. Border radius — drop card from 24px → 16px
**Evidence:** **8/10 sites use 8-12px on buttons** and **most stay at ≤16px on cards**. Only Raycast goes to 20px. Our 24px cards are above the modern range.

**Current:** `globals.css:41` `--radius-card: 1.5rem` (24px). `--radius-button: 0.75rem` (12px) ✓ already in range.

**Change:**
- `globals.css:41` — `--radius-card: 1.5rem` → `--radius-card: 1rem` (16px). Within the modern 8-12-16 ladder.
- Optional: add `--radius-card-lg: 1.25rem` (20px) for hero-level cards if we want that "Raycast feel" anywhere.

---

## 🟡 PRIORITY 2 — Strong improvements, lower risk

### R5. Hero — keep left-aligned (validated by data)
**Evidence:** 4/10 sites are centered (Linear, Spline, Attio, partially others), but each has a STRONG visual anchor (product UI, 3D scene, CRM screenshot). We have a hexagon mock — a weak placeholder. **Left-aligned is correct for now.**

**Re-open this rule** if/when:
- We replace the hexagon mock with a real product screenshot (mockup), OR
- We add a Spline/OGL 3D scene as Hero anchor (see R8)

### R6. SplitTextReveal — adopt the rotateX clip (anti-tell #1)
**Already in plan B2 from previous Fase 1 plan.** Confirmed by data: not a single one of the 10 sites uses the default `gsap.from(words, { y, opacity })` look.

**Change:** in `SplitTextReveal.tsx:40-46`:
```js
const split = SplitText.create(ref.current, { type: 'words', wordsClass: 'word' })
gsap.set(split.words, { yPercent: 110, rotateX: -40, opacity: 0, transformOrigin: '50% 100%' })
gsap.to(split.words, {
  yPercent: 0, rotateX: 0, opacity: 1,
  duration: 1.1, stagger: 0.06,
  ease: 'expo.out',
})
```
Change default `type` from `'chars'` to `'words'` (line 27).

### R7. Add `tabular-nums` + `text-balance` selectively
**Evidence:** Stripe Press, Vercel, Linear all use `font-variant-numeric: tabular-nums` on counters/metrics. None of them use `text-balance` everywhere — only on H1.

**Change:**
- `MetricsSection.tsx`/`AnimatedCounter.tsx` — add `font-variant-numeric: tabular-nums` (Tailwind: `tabular-nums`).
- `HeroSection.tsx:57-69` — ticker should be `tabular-nums`.
- Headlines (H1/H2) — already use `text-balance` via react-wrap-balancer (verify usage).

---

## 🟢 PRIORITY 3 — Strategic / future

### R8. Replace three.js with OGL (or skip 3D entirely)
**Evidence:** **8/10 premium sites use OGL.** Three.js is rare in 2026 for premium hero work. Our `package.json` has `three` and `@types/three` but they're unused.

**Change:**
1. **Now:** `npm uninstall three @types/three` — kill the dead weight (~600KB un-tree-shaken).
2. **Later:** if we want a hero canvas signature, install `ogl` (~8kb) instead. The brief includes a snippet pattern.
3. **Alternative path:** use **`@splinetool/react-spline`** + a free Spline community scene for a no-code 3D Hero anchor. Confirmed working: spline.design loads `splinetool` chunks. Spline scenes are exported as `.splinecode` files, the React component is one line.

**Decision needed:** drop three.js now? Recommended: **YES** — we're not using it.

### R9. Add Lenis (deferred decision from Fase 1 plan)
**Evidence:** Network scrape didn't detect Lenis on any site (it bundles into main JS). But the brief said "Awwwards crowd uses Lenis." Inconclusive from our scrape — keep it deferred.

**Decision:** keep ScrollSmoother for now. Reopen after R1-R7 are validated visually.

### R10. CSS variable naming convention
**Evidence:** Linear has `--ease-in-out-quart`, Vercel has `--ds-motion-overlay-duration`, Stripe has `--hds-color-*` (Hashed DS). Premium sites have systematic naming with prefixes/suffixes that describe the shape.

**Change:** rename our easing tokens for clarity:
- `--ease-out-soft` → `--ease-smooth` (used for reveals)
- `--ease-in-out-soft` → `--ease-snap` (used for UI feedback)
And add `--duration-fast: 150ms`, `--duration-base: 300ms` if we go Path A on R3.

---

## 📋 Apply order (compound effect)

| Order | Item | Time | Owner |
|-------|------|------|-------|
| 1 | R1 — easing standardization | 1h | Builder |
| 2 | R3 — duration commit (150ms) | 30min | Builder |
| 3 | R2 — font-weight 400/510 in buttons | 20min | Builder |
| 4 | R4 — radius card 24→16 | 10min | Builder |
| 5 | R6 — SplitTextReveal rotateX (already in Fase 1 plan as B2) | 30min | Builder |
| 6 | R7 — tabular-nums on counters/ticker | 20min | Claude (this chat) |
| 7 | R8 — drop three.js | 5min | Claude (this chat) |
| 8 | R10 — CSS var rename | 20min | Builder (with R1) |

**Total Builder:** ~2.5h. **Total Claude:** ~25min.

---

## 📊 Defensibility — what to tell stakeholders

When someone (Domingos, André, a future client) asks "why this duration / curve / radius?":

> "Because we measured the top 10 premium B2B sites in 2026 — Linear, Stripe, Vercel, Anthropic, Attio, Resend, Framer, Raycast, Spline, Lovable — and 8 of them converged on these values. Snapshot saved at `_validation/references/`. We're not guessing."

That's the difference between this approach and a Webflow template.
