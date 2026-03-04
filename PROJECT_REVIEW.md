# Velora Project Review (2026-03-04)

## Quick Profile
- Solo-built e-commerce prototype (Next.js frontend + Express/MongoDB backend) aimed at showcasing hiring readiness.
- Implements products, reviews, cart, checkout, addresses, payments, and account flows with MongoDB persistence.
- Uses layered backend design (controller → service → model) with reusable `BaseService`.

## Strengths
- Clear domain breakdown: products, reviews, cart, orders, payment intents, customer profile.
- Input validation and normalization in controllers (e.g., idempotent create routes, basic format checks).
- Services encapsulate business logic; schemas indexed for common queries.
- Environment-driven configuration and CORS whitelist support.

## Critical Risks (fix before sharing)
- Secrets committed: `Backend/.env` & `.env.local` expose real MongoDB URI and JWT secret. Remove from repo history and rotate credentials immediately.
- PCI risk: raw card data (even hashed CVV/card) stored in `Payment` model/service; must be replaced with Stripe (tokenized) and no CVV/number storage.
- Packages: `express@5` (still not LTS), typo dependency `cours`, invalid `dotenv@17.x`; pinned versions likely fail fresh installs.
- Security gaps: no auth/authorization middleware; JWT tokens issued but never verified on protected routes; no rate limiting or input sanitization middleware.
- Data validation limited; no schema-level validation for cart/order totals, currency, or product existence.
- Tests absent; no CI. `node_modules` and `.next` are committed—bloats repo and signals inexperience.

## Frontend Gaps
- Next.js used purely as SPA with `react-router-dom`; SSR/SEO benefits are lost and routing is duplicated.
- React 19 + Next 15 + Tailwind 4 RC combo is untested; may not build reliably.
- LocalStorage-era flows remain (e.g., payment/address/cart fallbacks) instead of full API integration.
- Accessibility and performance unknown (no Lighthouse/tests); global styles minimal.

## One-Week Fix Plan (minimum viable to demo to employers)
1) **Security/cleanup**: Delete committed secrets, rotate MongoDB user/JWT secret, add `.env.example`, remove `node_modules`/`.next`, add `.gitignore` entries.
2) **Dependencies**: Downgrade to stable `express@4.19`, `dotenv@16`, remove `cours`, lock Node LTS in `.nvmrc`.
3) **Payments**: Remove card storage; integrate Stripe Payment Intents (client secret creation + webhook stub) and keep only provider IDs/last4/brand.
4) **Auth**: Add JWT verify middleware; protect cart/order/profile routes; hash passwords with bcrypt + salt rounds; add refresh token endpoint.
5) **Validation**: Add Zod/Joi request schemas; enforce product existence and price snapshot validation on cart/order.
6) **Testing/CI**: Add Jest + Supertest smoke tests for products, auth, cart, orders; GitHub Actions running lint + test.

## Medium-Term Improvements
- Product admin CRUD + inventory checks per variant.
- Rate limiting (express-rate-limit) and Helmet for security headers.
- Observability: structured logs (pino) and error middleware.
- Frontend: replace React Router with Next App Router routes; fetch via `app/api` or server actions; add SEO metadata and loading/error states.
- UX: address/payment forms with client-side validation and Stripe Elements; add order history page.

## How to Pitch This Project (Austria-focused)
- Emphasize end-to-end build: designed data models, secured Mongo connection, implemented layered services, and wired REST endpoints the frontend consumes.
- Highlight security learnings: moving from naive card storage to PCI-safe tokenization and secret management.
- Show testing/CI improvements to prove engineering maturity.
- Mention adaptability: built both UI and backend, ready to work across stack in a small team.

## Next Actions Checklist
- [ ] Purge secrets from git history and rotate credentials.
- [ ] Fix dependencies and lock versions; fresh `npm install` works.
- [ ] Implement JWT auth middleware + protected routes.
- [ ] Swap payment flow to Stripe intents; delete CVV/number fields.
- [ ] Add request validation + basic tests; set up GitHub Actions.
- [ ] Refactor frontend routing to native Next.js pages and connect to live APIs.
