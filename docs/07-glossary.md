# 07. Glossary & Domain Terminology

This glossary defines core architectural terms, e-commerce concepts, and abbreviations used across the Velora codebase and documentation.

---

## 1. Domain Entities & Roles

- **Customer**: An end-user shopping on the platform who can browse catalog items, manage a cart, execute checkouts, write reviews, and maintain a profile.
- **Store Owner / Seller**: A registered merchant with authorized access to the Seller Panel (`/seller`), empowered to create and manage stores and product inventories.
- **Store**: A distinct merchant business entity registered in Velora that groups product listings under an owner account.
- **Product**: An item listed for sale within a store, containing pricing, inventory variants (color/size), imagery, and hierarchical category classifications.
- **Cart / Basket**: An ephemeral or persisted set of selected product variants intended for purchase.
- **Order**: An immutable transaction record storing financial totals, ordered item snapshots, and delivery address details.
- **Address Snapshot**: A frozen copy of shipping address details embedded inside an `Order` at checkout time to prevent historical data mutation if a user updates their profile later.
- **Review**: A star rating (1–5) and written testimonial submitted by a customer for a specific product.

---

## 2. Architectural & Technical Terms

- **App Router**: Next.js 14 file-system-based routing architecture utilizing React Server Components and nested layouts.
- **BaseService**: A generic repository class abstracting Mongoose query operations, pagination envelopes, hierarchical tree lookups, and soft-delete mechanics.
- **Feature-Folder Architecture**: A frontend codebase organization pattern where UI components, custom hooks, API calls, and helpers are grouped by functional business domain in `src/app/features/`.
- **JWT (JSON Web Token)**: A compact, URL-safe standard used for securely transmitting claims between the client and REST API.
- **PaymentIntent**: A Stripe API object representing a payment lifecycle from initiation to settlement.
- **RBAC (Role-Based Access Control)**: An authorization mechanism that restricts API endpoint access based on verified user roles (`customer` vs `seller`).
- **Soft Delete**: An architectural pattern where database documents are flagged (`isDeleted: true`, `deletedAt`, `deletedBy`) instead of physically removed from disk.
- **Zod**: A TypeScript/JavaScript-first schema declaration and runtime validation library used across Velora for request payload validation.

---

## 3. HTTP Status Codes Reference

| Status Code | Meaning | Common Usage in Velora |
|---|---|---|
| `200 OK` | Successful Request | Standard response for successful reads and updates |
| `201 Created` | Resource Created | Successful user registration, store creation, product addition, or order placement |
| `204 No Content` | Successful Empty Response | Successful deletion or state clear |
| `400 Bad Request` | Validation Error | Payload failed Zod schema checks or missing required fields |
| `401 Unauthorized` | Authentication Failure | Missing, invalid, or expired Bearer token |
| `403 Forbidden` | Authorization Failure | Caller authenticated but lacks required role (e.g. customer hitting seller endpoints) |
| `404 Not Found` | Resource Missing | Requested product, store, order, or route does not exist |
| `429 Too Many Requests` | Rate Limit Exceeded | Client exceeded requests-per-minute threshold |
| `500 Internal Server Error` | Server Exception | Unexpected server-side fault or third-party service outage |
