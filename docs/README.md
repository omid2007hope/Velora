# Velora Documentation Index

Welcome to the official technical documentation for **Velora**, a modern dual-role e-commerce platform engineered with a decoupled architecture comprising a Next.js 14 App Router frontend and an Express/MongoDB REST API backend.

---

## Table of Contents

### 1. Project Overview & Setup
- [01. Project Overview](01-project-overview.md) — High-level introduction, architecture philosophy, key achievements, and repository anatomy.
- [01.1. Getting Started & Development Setup](01.1-getting-started.md) — Prerequisites, environment variables configuration, local database setup, and running services.
- [01.2. Architecture Roadmap & Design Decisions](01.2-architecture-roadmap.md) — System boundaries, separation of concerns, dual-role isolation, and future roadmap.
- [01.3. Postman Collection & API Testing Reference](01.3-postman-api-testing.md) — Environment variables, token automation, and comprehensive Postman collection walkthrough.

### 2. Backend Architecture & Core Engine
- [02. Backend Architecture](02-backend-architecture.md) — Layered Controller-Service-Model architecture and request flow.
- [02.1. Server Entry & Middleware Pipeline](02.1-server-entry-middleware.md) — Express bootstrap, Helmet, CORS, rawBody capturing for Stripe, rate limiting, and centralized error handling.
- [02.2. BaseService & Repository Layer](02.2-baseservice-data-access.md) — Generic CRUD abstraction, soft deletes (`isDeleted`), tree recursion (`_buildTree`), and pagination.
- [02.3. Data Models & Mongoose Schemas](02.3-data-models.md) — Schema definitions, indexes, relationships, and validation rules for all 11 domain models.
- [02.4. Authentication & RBAC Middleware](02.4-auth-middleware.md) — JWT extraction, signature verification, token lifecycle, and role guards (`Customer` vs `Seller`).
- [02.5. Centralized Validation Layer](02.5-validation-layer.md) — Zod schema validation architecture, schema composition, and validation middleware.
- [02.6. Utilities & Shared Infrastructure](02.6-utilities.md) — Winston logger, `httpError` factory, password hashing, and email notification drivers.

### 3. Backend REST API Reference
- [03. Backend API Reference Overview](03-backend-api-reference.md) — Standard HTTP response envelopes, status codes, route mounting, and versioning.
- [03.1. Authentication API](03.1-auth-api.md) — Customer & Seller registration, login, token refresh, email verification, and password resets.
- [03.2. Store Management API](03.2-store-api.md) — Store creation, owner lookup, store update, and soft deletion.
- [03.3. Product Management & Catalog API](03.3-product-api.md) — Product creation, updating, store-scoped listings, category filtering, search, and pagination.
- [03.4. Cart, Checkout & Order API](03.4-cart-checkout-order-api.md) — Shopping cart operations, Stripe PaymentIntent creation, checkout completion, and order management.
- [03.5. Reviews, Account, Address & Webhook API](03.5-reviews-account-address-webhook-api.md) — Product review ratings, customer profile settings, saved shipping addresses, and Stripe webhook handler.
- [03.6. Integration Test Suite](03.6-integration-test-suite.md) — Jest test architecture, in-memory MongoDB (`mongodb-memory-server`), and Supertest integration coverage.

### 4. Frontend Architecture
- [04. Frontend Architecture](04-frontend-architecture.md) — Next.js 14 App Router, Feature-Folder structure, and component hierarchy.
- [04.1. Redux Toolkit State Management](04.1-redux-state.md) — Slices (`authSlice`, `BasketSlice`, `UserSlice`, `StoreOwnerSlice`), hydration, and localStorage persistence.
- [04.2. API Client Layer & Interceptors](04.2-api-client-layer.md) — Axios client configuration, Bearer token injection, automatic 401 token refresh queue, and session expiration.
- [04.3. Layout, Navigation & SEO Shell](04.3-layout-header-navigation.md) — Root layout, responsive header, category navigation, dynamic OpenGraph images, robots, and sitemap.
- [04.4. Frontend Authentication Flows](04.4-authentication-flows.md) — Dual-role authentication state, login/signup modals, token storage, and route guarding.

### 5. Customer-Facing Features
- [05. Customer Features Overview](05-customer-features.md) — End-to-end customer journey and domain map.
- [05.1. Home Page Experience](05.1-home-page.md) — Hero promotional carousel, featured product grid, and category discovery.
- [05.2. Product Catalog & Search](05.2-product-catalog-search.md) — Catalog browsing, price range filtering, category tree navigation, and product detail view.
- [05.3. Cart, Checkout & Payment Flow](05.3-cart-checkout-order-flow.md) — Slide-over basket drawer, checkout steps, Stripe Elements payment processing, and order confirmation.
- [05.4. Customer Account & Orders](05.4-customer-account.md) — Customer profile management, address book CRUD, and order history tracking.

### 6. Seller Panel
- [06. Seller Panel Overview](06-seller-panel.md) — Merchant platform architecture, dual-role onboarding, and seller ecosystem.
- [06.1. Seller Panel Shell & Layout](06.1-seller-panel-shell.md) — Seller dashboard shell, responsive sidebar navigation, and store switcher.
- [06.2. Store Onboarding & Settings](06.2-store-management.md) — Store creation wizard, business metadata settings, and store profile management.
- [06.3. Product Management & Inventory](06.3-product-management.md) — Product creation, image uploading, stock tracking, pricing, and product deletion.

### 7. Glossary & Reference
- [07. Glossary & Domain Terminology](07-glossary.md) — Domain definitions, acronyms (RBAC, JWT, DTO), entity terminology, and status code quick reference.
