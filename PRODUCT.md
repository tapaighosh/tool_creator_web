# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Decision-makers at startups, SMEs, and mid-market companies (founders, CTOs, heads of operations) who want to automate repetitive business processes but lack the internal machine-learning team to build bespoke AI solutions.

**Secondary:** Enterprise IT and digital transformation leads evaluating AI integration partners; agencies wanting a white-label or partner route to offer AI automation services to their clients.

**Situation:** Visitors arrive aware a problem exists (e.g., manual customer support, slow data pipelines, no chatbot) but uncertain whether to buy off-the-shelf software, hire engineers, or engage a specialist agency. They are evaluating trust and delivery credibility as much as capability.

## Product Purpose

AI Tool Creator designs, builds, and deploys custom AI agents and automation solutions — WhatsApp bots, conversational AI agents, workflow automation pipelines, and enterprise-grade AI integrations. Delivery is measured in days, not months. Success means a client's specific business workflow is automated and running in production with minimal handholding.

## Positioning

The company's meaningfully different mechanism: **custom-built, not configured** — bespoke agents trained on the client's data, integrated into their existing stack (WhatsApp, CRM, email, ERP), with a 48-hour-to-production commitment that off-the-shelf SaaS cannot credibly match and general-purpose dev shops cannot match on speed.

## Operating Context

Visitors arrive via search, referral, or LinkedIn. They browse on desktop primarily (B2B decision workflow). The primary conversion goal is **booking a consultation call** — not a free trial or self-serve signup. The site must establish technical credibility rapidly; buyers vet vendors before agreeing to a call, not after.

Core pages confirmed:
- **Home** — Mission, proof, primary CTA
- **Solutions** — Service categories (WhatsApp bot, AI agents, workflow automation, enterprise pipelines)
- **AI Agents** — Deep-dive on the agent product; how they work, what they can do
- **Technology** — Stack transparency (models, integrations, security posture)
- **Contact** — Consultation booking form / lead capture (integrated with MongoDB leads model)

## Capabilities and Constraints

- Confirmed deliverables: WhatsApp bots, AI agents, workflow automation, enterprise AI pipelines
- Stack: Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion, MongoDB (leads)
- Lead capture API already scaffolded at `src/app/api/leads/route.ts`
- No self-serve pricing page — service is bespoke, so pricing is consultation-gated
- No user authentication required for marketing site
- Competitor reference noted by client: flowiseai.com (open-source LLM flow builder — establishes technical sophistication bar)

## Brand Commitments

- **Name:** AI Tool Creator
- **Voice:** Technically confident, direct, outcome-focused. Not playful. Not hype-heavy. Earns trust through specificity.
- **Visual identity (pinned by client):** Dark mode only — deep navy `#0A0F1E` ground, glassmorphism cards, electric indigo-to-violet gradient accents (`#6366F1` → `#8B5CF6`), cyan highlights (`#06B6D4`), neon glow effects.
- **Font system (pinned by client):** Space Grotesk (headings, weight 700/800) + Inter (body, weight 400/500). Both already loaded via `next/font/google` in layout.tsx.
- **Design mode:** Persuade — visitor must decide to book a consultation.

## Evidence on Hand

- HeroSection component exists with mock AI dashboard (`24 agents active`, `12.4K messages/day`, `99.2% accuracy`) — **synthetic demonstration data, must be replaced with real client metrics if available**.
- Gradient, glow, and glassmorphism utility classes established in `globals.css`.
- Lead model (`src/models/Lead.ts`) and API route scaffolded.
- No real client logos, case studies, or testimonials exist yet — **must not be fabricated; use placeholders clearly marked for replacement**.

## Product Principles

1. **Credibility through specificity.** Every claim is grounded in a mechanism, a number, or a concrete outcome — no vague "AI-powered" language without proof.
2. **Delivery speed is the differentiator.** The 48-hour promise is the brand's sharpest edge; every section reinforces it.
3. **Custom, not configured.** The product's identity rests on bespoke work, not reselling SaaS. The site must never look or feel like a platform template.
4. **Enterprise trust, startup speed.** The design signals enterprise-grade security and reliability while the copy communicates startup-like responsiveness.
5. **One clear action.** Every page resolves to a single primary conversion: book a consultation.

## Accessibility & Inclusion

WCAG AA minimum required (confirmed via design-system query — Soft UI Evolution style is WCAG AA+). `prefers-reduced-motion` must be respected for all Framer Motion animations.
