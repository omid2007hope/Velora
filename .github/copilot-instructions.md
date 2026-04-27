# Velora — Copilot Instructions

## Project Overview

Full-stack e-commerce app. **Frontend**: Next.js 14 (App Router), React, Redux Toolkit, Tailwind CSS, Axios, Headless UI. **Backend**: Node.js, Express, MongoDB/Mongoose, JWT, Stripe. CommonJS throughout the backend; ESM on the frontend.

- Frontend root: `Frontend/src/`
- Backend root: `Backend/`

---

## Developer Workflows

```bash
# Backend
cd Backend && npm run dev        # nodemon Server.js
cd Backend && npm test           # jest --runInBand (uses mongodb-memory-server)

# Frontend
cd Frontend && npm run dev       # next dev
cd Frontend && npm run build     # next build
cd Frontend && npm run lint      # eslint
```

---

## Backend Architecture

**Layer responsibilities** — never mix them:

- `routes/` → paths + middleware attachment only; no logic
- `controller/` → HTTP ↔ service translation only; reads `req.*`, returns responses
- `services/` → all business logic + model access; never use `req`/`res`
- `model/` → Mongoose schemas only
- `middleware/` → grouped by `auth/`, `validation/`, `error/`, `request/`
- `utils/` → pure shared helpers (`asyncHandler`, `httpError`, `logger`, etc.)

**Route tree**: `Server.js` → `routes/index.js` → `routes/versionOne/index.js` → `routes/versionOne/<resource>/index.js` → per-method files (`Get_Products.js`, `Post_Products.js`, etc.)

**`Server.js`** is the sole entry point; exports the Express app for tests. Only binds the port when `require.main === module`.

### BaseService Pattern (every service must follow this exactly)

```js
const Model = require("../model/ModelName");
const BaseService = require("./BaseService");

module.exports = new (class ServiceName extends BaseService {
  _helperMethod() {
    /* prefix privates with _ */
  }
  async doSomething(args) {
    /* use this.model or inherited methods */
  }
})(Model);
```

`module.exports` is the **instance**, not the class. Controllers call methods on it directly. Inherited helpers: `findAll`, `findOne`, `findAllWithPagination` (returns `{ data, metaData: { pages, total, currentPage } }`), `create`, `update`, `softDelete`. All `find*` methods automatically exclude soft-deleted documents. Services with multiple models pass the primary model to `BaseService` and import secondary models at the top of the file (e.g. `CartService` uses `Cart` + imports `Product`).

---

## Frontend Architecture

**API call chain** — never skip a layer:

```
Component → Hook → Service → API function → src/api/client.js (Axios) → Backend
```

- `src/api/client.js` — single Axios instance; attaches `Bearer` token from `getAccessToken()` via request interceptor; **re-throws errors as-is** (no wrapping)
- `src/api/<feature>/<Feature>_API.js` — async functions that call `client.*`; return `response.data?.data`; never catch, never dispatch, never navigate
- `src/api/index.js` — central re-export hub; **always import from here** (never from two levels deep)
- `src/app/features/<feature>/services/` — thin re-export wrappers only; no added logic

**Import rule:**

```js
// ✅ import { loginCustomer } from "@/api";
// ❌ import { loginCustomer } from "@/api/auth/Auth_API";
```

**Feature structure**: `src/app/features/<name>/{components,hooks,services,utils,schemas,constants}/`

### Auth & State

- All auth state and popup visibility live in Redux under `state.auth` (`src/app/redux/slice/authSlice.js`)
- **Never** use DOM events, `window` events, or `localStorage` subscriptions for shared state — use Redux actions
- Tokens stored via `src/app/lib/browser-storage.js` helpers

---

## Key Conventions

- Naming is resource-consistent: folder `products` → `ProductController.js` → `ProductService.js` → `Product.js`
- No `try/catch` scattered in controllers — use `asyncHandler` from `utils/asyncHandler.js`
- Errors go through `middleware/error/errorHandler.js`; throw via `utils/httpError.js`
- Frontend hooks handle data fetching coordination; they must **not** render UI
- Keep feature-specific code inside its feature folder — not scattered globally
- `For_Ai_Read_Only/` contains canonical pattern docs; treat them as ground truth
