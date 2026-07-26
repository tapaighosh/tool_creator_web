# Design System

<!-- impeccable:design-schema 1 -->

## World

**Identity:** Cinematic dark-mode enterprise — deep navy space, electric indigo-violet gradient energy, frosted glass surfaces, and controlled neon glow. The interface feels like a mission-control dashboard from a technically sophisticated, well-funded company: authoritative, precise, and alive.

**Not:** consumer SaaS pastels, startup gradient blobs over white, cyberpunk glitch effects, or the generic near-black + one neon accent look. The discipline is in restraint: glow is used as accent emphasis, not decoration; glass is used to layer surfaces, not to obscure content.

## Mode

**Dark only.** No light-mode variant. Background is always `#0A0F1E` (deep navy), never pure black. Color-scheme is `dark`.

## Color

### Strategy: Committed (indigo-violet carries ~40% of the surface; cyan as secondary accent; navy as the field)

| Role | Token | Value |
|---|---|---|
| Background (deep) | `--color-background` | `#0A0F1E` |
| Surface (card base) | `--color-surface` | `#111827` |
| Surface elevated | `--color-surface-elevated` | `#1E293B` |
| Border (default) | `--color-border` | `rgba(255, 255, 255, 0.08)` |
| Border (accent) | `--color-border-accent` | `rgba(99, 102, 241, 0.40)` |
| Accent – Indigo | `--color-accent-indigo` | `#6366F1` |
| Accent – Violet | `--color-accent-violet` | `#8B5CF6` |
| Accent – Cyan | `--color-accent-cyan` | `#06B6D4` |
| Accent – Blue | `--color-accent-blue` | `#3B82F6` |
| Text primary | `--color-text-primary` | `#F1F5F9` |
| Text secondary | `--color-text-secondary` | `#94A3B8` |
| Text muted | `--color-text-muted` | `#475569` |
| Gradient – Brand | `--gradient-brand` | `linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)` |
| Gradient – Hero | `--gradient-hero` | `radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.10) 40%, transparent 70%)` |
| Gradient – Card | `--gradient-card` | `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)` |

### Glow values (do not exceed these opacities)

| Effect | Value |
|---|---|
| Indigo glow | `box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1)` |
| Violet glow | `box-shadow: 0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)` |
| Text glow | `text-shadow: 0 0 20px rgba(99, 102, 241, 0.6)` |
| Ambient blob (hero) | `opacity: 0.08–0.12`, `filter: blur(80–120px)` |

## Typography

| Role | Face | Weights | CSS var |
|---|---|---|---|
| Display / Heading | **Space Grotesk** | 700, (800 via synthesis) | `var(--font-space-grotesk)` |
| Body / UI | **Inter** | 400, 500, 600 | `var(--font-inter)` |

Both loaded via `next/font/google` in `src/app/layout.tsx`.

### Scale

| Token | Size | Usage |
|---|---|---|
| Hero headline | `5xl–8xl` / `clamp(3rem, 7vw, 5rem)` | H1 on hero only |
| Section headline | `3xl–5xl` | H2 per section |
| Card title | `xl–2xl` | H3 inside cards |
| Body | `16px` (min) | Paragraphs, descriptions |
| Caption / label | `12–14px` | Badge text, metadata |
| Mono | `system-ui` / `font-mono` | Code snippets only |

- Line height: `1.15` headings, `1.6` body
- Letter spacing: `-0.01em` to `-0.02em` on large display text
- Never use Inter as display at large size — Space Grotesk only for H1/H2

## Surfaces

### Glass card (`.glass-card`)
```
background: rgba(255, 255, 255, 0.04)
backdrop-filter: blur(12px)
border: 1px solid rgba(255, 255, 255, 0.08)
border-radius: 16px
```

### Glass card strong (`.glass-card-strong`)
```
background: rgba(255, 255, 255, 0.07)
backdrop-filter: blur(20px)
border: 1px solid rgba(99, 102, 241, 0.2)
border-radius: 16px
```

### Neon border (`.neon-border`)
```
border: 1px solid transparent
background: linear-gradient(#0A0F1E, #0A0F1E) padding-box,
            linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4) border-box
```

### Background patterns
- **Grid:** `linear-gradient` lines at `rgba(99, 102, 241, 0.05)`, `60px × 60px`
- **Dots:** `radial-gradient` at `rgba(99, 102, 241, 0.15)`, `24px × 24px`
- **Ambient gradient bg:** animated `#0A0F1E → #0D1628 → #121A2E → #0A1020`, 15s cycle

## Motion

| Token | Duration | Easing | Use |
|---|---|---|---|
| Micro | `150ms` | `ease-out` | Hover color/border |
| Interaction | `200–300ms` | `ease-out` | Button press, toggle |
| Reveal | `0.5–0.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Component fade-in (Framer Motion) |
| Page transition | `400–600ms` | `power2.inOut` | Route change overlay |
| Ambient blob | `6–8s` | `ease-in-out infinite` | Hero atmosphere |
| Float | `6s` | `ease-in-out infinite` | Decorative elements |
| Pulse glow | `3s` | `ease-in-out infinite` | Glow blob opacity |

**All animations must be wrapped in `prefers-reduced-motion` check.**

Framer Motion entry pattern (established in `HeroSection.tsx`):
```jsx
initial={{ opacity: 0, y: 20–30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5–0.6, delay: staggered 0.1s }}
```

## Icons

**Lucide React only.** No emojis as icons. Consistent size within context (14px badge, 16–18px inline, 24px standalone). Use `cursor-pointer` on all interactive elements.

Lucide icons currently in use: `ArrowRight`, `Sparkles`, `Zap`.

## Layout

- Max-width: `max-w-7xl` (1280px) — consistent across all sections
- Section padding: `5rem` vertical (mobile), `7rem` (lg+)
- Container: `px-4 sm:px-6 lg:px-8`
- Navbar: floating, `top-4 left-4 right-4` pattern (not edge-to-edge)
- Z-index scale: `10` (overlays), `20` (dropdowns), `30` (modals), `50` (toasts/alerts)
- Responsive breakpoints: `375px · 768px · 1024px · 1440px`

## Prohibitions

1. **No light mode.** `#0A0F1E` is the only background; `color-scheme: dark` always.
2. **No pure `#000000` background** — use `#020203` minimum if darker areas are needed.
3. **No emoji as icons** — Lucide SVG only.
4. **No AI purple/pink gradients as full-section backgrounds** — gradient fills are accent-only (buttons, text clips, borders).
5. **No playful or consumer-facing copy** — brand voice is technical, direct, specific.
6. **No fabricated claims** — synthetic stats (agent counts, accuracy rates) must be labeled or replaced with real data before launch.
7. **No font-family overrides to Inter at display size** — Space Grotesk owns H1/H2.
8. **Glow effects must be subtle** — ambient blobs at `opacity: 0.08–0.12` max; buttons at `rgba(*, *, *, 0.4)` max.
9. **No layout shift on hover** — use color/opacity/shadow transitions, not scale on parent elements that affect document flow.
10. **No transitions > 500ms** for UI interactions — page transitions and ambient motion are exempt.

## Scrollbar

Custom styled: `width: 6px`, track `#0A0F1E`, thumb `rgba(99, 102, 241, 0.4)` → hover `rgba(99, 102, 241, 0.7)`, `border-radius: 3px`.
