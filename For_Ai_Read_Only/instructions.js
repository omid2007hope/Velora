/**
 * VELORA — AI INSTRUCTION PROMPTS
 *
 * This is the single source of truth for all AI prompts used in this project.
 * Every constant is a self-contained instruction you can paste directly into
 * any AI chat (GitHub Copilot, ChatGPT, Claude, etc.) and always get the same result.
 *
 * HOW TO USE
 * ----------
 * Pick the constant that matches your task and paste its value as your prompt.
 * You do NOT need to paste the whole file — just the one constant you need.
 *
 * INDEX
 * -----
 *  PROJECT_CONTEXT          — stack, style, and general rules every AI must know
 *  BETTER_BACKEND           — refactor / clean up the backend architecture
 *  BETTER_FRONTEND          — refactor / clean up the frontend architecture
 *  ROUTER_PATTERN           — refactor routing and server entry file
 *  BASE_SERVICE_PATTERN     — how every backend service must be written
 *  AUTH_REDUX_PATTERN       — auth state and popup visibility via Redux only
 *  API_LAYER_PATTERN        — all HTTP calls go through the Axios client
 *  BACKEND_DEDUP            — find and remove backend duplication safely
 *  FRONTEND_DEDUP           — find and remove frontend duplication safely
 */

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CONTEXT
// Paste this when the AI needs to understand the project before doing anything.
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECT_CONTEXT = `
You are working on Velora, a full-stack e-commerce project.

Stack:
  Frontend : Next.js (App Router), React, Redux Toolkit, Tailwind CSS, Axios, Headless UI
  Backend  : Node.js, Express, MongoDB, Mongoose, Stripe, JWT

Frontend root  : Frontend/src/
Backend root   : Backend/

Code style rules:
- Write clean, simple, readable code.
- Add comments only where genuinely helpful.
- Remove unnecessary code and dead imports.
- Keep naming descriptive and consistent.
- Never use DOM custom events or window events for shared state — use Redux.
- Never use fetch or raw axios in components — use the shared Axios client.
- Every backend service must extend BaseService.
- All HTTP calls on the frontend go through src/api/client.js.
- Auth state and popup visibility live in Redux under state.auth.
`;

// ─────────────────────────────────────────────────────────────────────────────
// BETTER BACKEND
// Paste this when you want to refactor or clean up the backend.
// ─────────────────────────────────────────────────────────────────────────────
export const BETTER_BACKEND = `
Look at my backend and refactor it into a clean, scalable, separated architecture using this exact logic.

Main goals:
1. Keep the backend clean, structured, and easy to scale.
2. Separate responsibilities clearly between routes, middleware, controllers, services, models, config, and utilities.
3. Preserve existing API behavior unless a clear bug needs to be fixed.
4. Remove unnecessary code and fix broken wiring, missing imports, or inconsistent structure.
5. Keep the code testable.
6. Run tests after the refactor and summarize the result.

ROUTES
- Keep routes inside routes/
- Organize routes by API version first, then by feature/resource.
- Example:
    routes/index.js
    routes/versionOne/index.js
    routes/versionOne/products/
    routes/versionOne/profile/
- Keep route files separated by HTTP method:
    Get_Products.js  /  Post_Products.js  /  Patch_Products.js  /  Delete_Products.js
- Each feature folder must have its own index.js that combines those method files.
- routes/versionOne/index.js combines all feature routers.
- routes/index.js mounts health routes plus all API routes.
- Support versioned routing: /api/v1/...

MIDDLEWARE
- Keep middleware inside middleware/
- Group by responsibility: validation / auth / request / error
- Middleware is only for cross-cutting concerns — no business logic.

CONTROLLERS
- One controller file per resource (e.g. controller/ProductController.js)
- Controllers read req.params / req.query / req.body, call service methods, return HTTP responses.
- Controllers must NOT query the database directly or contain business logic.

SERVICES
- One service file per resource (e.g. services/ProductService.js)
- Services contain business logic and model interaction.
- Services must NOT use req/res or return HTTP status codes.
- Every service MUST extend BaseService from services/BaseService/index.js

BASE SERVICE PATTERN (every service must follow this exactly):
  const Model = require("../model/ModelName");
  const BaseService = require("./BaseService");

  module.exports = new (class ServiceName extends BaseService {
    async doSomething(args) { /* use this.model or inherited this.* methods */ }
  })(Model);

MODELS — schema and persistence rules only, no request logic.
CONFIG  — keep env/database/app config inside config/ — no scattering.
UTILS   — pure shared helpers inside utils/ — no business logic.

SERVER
- Single Server.js as the only entry file.
- Server.js must include: env loading, express app, middleware, route mounting,
  404 handler, error handler, database connection, app.listen.
- Server.js must export the Express app for tests.
- Only start the listener when run directly: if (require.main === module) { ... }

RESPONSIBILITY SPLIT
  Routes      → define paths, attach middleware, pass to controller
  Middleware  → validate / sanitize / protect
  Controllers → HTTP ↔ service translation
  Services    → business logic + model access
  Models      → schema/data persistence
  Utils       → shared helpers
  Config      → environment / database / app constants

NAMING RULES — keep consistent across all layers:
  route folder: products  →  controller: ProductController.js  →  service: ProductService.js  →  model: Product.js

ERROR HANDLING — use centralized handlers and shared asyncHandler; no repeated try/catch everywhere.

What I want back:
1. Refactor the backend directly.
2. Explain the final backend structure.
3. Tell me which files were added or changed.
4. Tell me how to add a new resource in the same pattern.
5. Run tests and summarize the result.
`;

// ─────────────────────────────────────────────────────────────────────────────
// BETTER FRONTEND
// Paste this when you want to refactor or clean up the frontend.
// ─────────────────────────────────────────────────────────────────────────────
export const BETTER_FRONTEND = `
Look at my frontend structure and refactor it using this exact pattern.

Goals:
1. Make the frontend cleaner, more separated, and easier to scale.
2. Keep code organized by feature and responsibility.
3. Preserve the current UI/behavior unless a fix is clearly needed.
4. Remove unnecessary code and reduce duplication.
5. Keep components readable, reusable, and testable.
6. Run tests/build/lint if available and tell me what passed or failed.

GENERAL STRUCTURE
- Organize by feature and responsibility, not randomly by file type.
- Keep pages focused on page composition (thin page files).
- Move reusable UI into dedicated component folders.
- Move business/data logic out of large page files.

If using Next.js App Router:
- app/ contains route segments and page-level entry files.
- Page files assemble sections/components and call hooks/actions — nothing more.

COMPONENTS
- Shared UI    : src/components/ui/
- Layout       : src/components/layout/
- Feature-level: src/features/<name>/components/
- Components have one clear job, receive clean props, avoid mixed responsibilities.
- Split large components when they do too much at once.

FEATURE STRUCTURE
  src/features/<name>/
    components/
    hooks/
    services/
    utils/
    schemas/
    constants/
- Keep feature-specific code inside the feature — not scattered globally.

HOOKS
- Put reusable stateful logic into hooks (data fetching, form behavior, modal open/close, etc.).
- Hooks must NOT render UI or become dumping grounds.

SERVICES / API LAYER
- All API calls live in a dedicated service layer — never scattered in pages or components.
- src/api/<feature>/<Feature>_API.js  →  re-exported from src/api/index.js
- Component call chain: Component → Hook → Service → API function → client.js (Axios) → Backend

STATE MANAGEMENT (Redux)
- Redux store is at src/app/redux/store/index.js
- Slices are at src/app/redux/slice/
- Current slices:
    BasketSlice  — shopping basket (state.basket)
    authSlice    — auth state + popup visibility (state.auth)
- Read state with useSelector. Write state with useDispatch.
- Do NOT use DOM custom events or window events to share state — use Redux actions.
- Do NOT use subscribeToStorageChanges for auth reactivity — use useSelector.

AUTH STATE RULES
- state.auth.user              — signed-in customer
- state.auth.storeOwner        — signed-in seller
- state.auth.hydrated          — true after first client-side localStorage read
- state.auth.loginPopupOpen    — customer login dialog
- state.auth.sellerPopupOpen   — seller login dialog
- Open popup: dispatch(openLoginPopup()) / dispatch(openSellerPopup())
- Read auth:  useSelector(state => state.auth.user / state.auth.storeOwner)
- Seller guard: useSellerSession() hook
- Never re-introduce openAuthPopup(), document.dispatchEvent, or subscribeToStorageChanges.

NEXT.JS RULES
- Preserve App Router conventions.
- Only use "use client" where interactive behavior is actually needed.
- Keep server/client boundaries clean.

STYLING (Tailwind)
- Avoid huge unreadable class blobs — extract into components.
- Reuse spacing, typography, and layout patterns consistently.
- Preserve existing visual language unless explicitly asked to redesign.

NAMING RULES — use descriptive names:
  AddressForm / AddressList / AccountSidebar / useAddressForm / accountService
  Avoid: Helper / BoxThing / DataManager

CLEANUP RULES
- Remove dead code, unused imports, and commented-out code.
- Do not change unrelated behavior.

What I want back:
1. Refactor the frontend directly.
2. Explain the final structure.
3. Tell me which files were added or changed.
4. Tell me how to keep adding new pages/features in the same pattern.
5. Run tests/build/lint if available and summarize the result.
`;

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER PATTERN
// Paste this when you want to refactor the backend routing and server entry file.
// ─────────────────────────────────────────────────────────────────────────────
export const ROUTER_PATTERN = `
Look at my backend structure and refactor the routing/server setup using this exact pattern.

Goals:
1. Keep routes separated by feature and HTTP method.
2. Wire all route files together cleanly through nested index.js files.
3. Merge app.js into Server.js so there is only one server entry file.
4. Preserve testability so the Express app can still be imported in tests.
5. Do not break existing endpoint behavior unless clearly necessary.
6. Fix missing imports or broken route files while doing the refactor.
7. Run tests after the refactor and tell me what passed or failed.

Required route architecture:
  routes/index.js
    → top-level router
    → includes health route like /server
    → mounts all version one routes (both unversioned and /v1)

  routes/versionOne/index.js
    → combines all resource routers

  Each resource folder keeps separate files per HTTP method:
    Get_*.js  /  Post_*.js  /  Patch_*.js  /  Delete_*.js
  Each resource folder has its own index.js that mounts those method files.

Required server architecture:
  - Remove app.js — move everything into Server.js
  - Server.js must include:
      dotenv config, express app creation, middleware, /api mounting,
      404 handler, error handler, database connection, app.listen
  - Server.js must export the Express app for tests
  - Only start listening when run directly: if (require.main === module) { ... }

Implementation rules:
- Keep code clean and simple.
- Add comments only where actually helpful.
- Do not change unrelated code.
- Fix missing imports (asyncHandler, validators, etc.) if found.
- If documented endpoints exist but route files are missing, create them.
- Keep CommonJS if the project already uses CommonJS.

What I want back:
1. Make the refactor directly in the codebase.
2. Explain how the route tree is wired.
3. Tell me which files were added/changed.
4. Tell me how to add new routes in the same pattern.
5. Run tests and summarize the result.
`;

// ─────────────────────────────────────────────────────────────────────────────
// BASE SERVICE PATTERN
// Paste this when writing or reviewing any backend service file.
// ─────────────────────────────────────────────────────────────────────────────
export const BASE_SERVICE_PATTERN = `
Every service in this project extends BaseService located at:
  Backend/services/BaseService/index.js

Every service file MUST follow this exact structure:

  const Model = require("../model/ModelName");
  const BaseService = require("./BaseService");

  module.exports = new (class ServiceName extends BaseService {
    _helperMethod() { /* prefix private methods with _ */ }

    async doSomething(args) {
      // use this.model or inherited this.* methods
    }
  })(Model);

Rules:
- The class is anonymous and immediately instantiated with the Mongoose model.
- module.exports is the instance, not the class.
- Controllers import the instance and call methods directly.
- Private/helper methods must be prefixed with _ and never called from controllers.

BaseService inherited methods (use via this.*):
  findAll(condition)
  findAllWithSort(condition, sort)
  findAllWithPagination(condition, { page, limit, sort })  → returns { data, metaData: { pages, total, currentPage } }
  findAllAndPopulate(condition, populate)
  findAllRecursive(parentField)
  findAllRecursiveByCondition(condition, parentField)
  findAllDeleted()
  findById(id)
  findByIdPopulate(id, populate)
  findOneByCondition(condition)
  findOneByConditionAndPopulate(condition, populate)
  createObject(data)
  update(condition, data, returnNew = true)
  updateAll(condition, data)
  updateBySoftDelete(condition, data, req)
  softDelete(condition, user)
  softDeleteRecursive(parentField, condition, user)
  hardDelete(condition)
  hardDeleteMany(condition)
  restoreSoftDelete(condition)

Private helpers inside BaseService (used internally, not by services):
  _active(condition)             — appends { isDeleted: { $ne: true } } to any condition
  _buildTree(nodes, parentField) — recursively builds parent/child tree

When to use this.model directly (only when BaseService does not cover it):
  - .select("+hiddenField")   — for password or secret fields
  - .lean()                   — for plain JS object instead of Mongoose document
  - Complex aggregations or chained queries BaseService does not expose

Services with multiple models:
  Pass the primary model to BaseService via the constructor.
  Import secondary models directly at the top of the file.
  Example: CartService uses Cart as primary and imports Product directly.
`;

// ─────────────────────────────────────────────────────────────────────────────
// AUTH REDUX PATTERN
// Paste this when touching auth state, popup visibility, or seller/customer session.
// ─────────────────────────────────────────────────────────────────────────────
export const AUTH_REDUX_PATTERN = `
All auth state and popup visibility live in Redux under state.auth.
Never use DOM events, window events, or localStorage subscriptions for these purposes.

Where everything lives:
  Redux slice         : src/app/redux/slice/authSlice.js
  Redux store         : src/app/redux/store/index.js
  Seller session hook : src/app/features/seller/hooks/use-seller-session.js
  localStorage helpers: src/app/lib/browser-storage.js
  Auth view constants : src/app/features/auth/utils/auth-popup-events.js  (exports AUTH_VIEW only)

state.auth shape:
  {
    user: null | object,           // signed-in customer
    storeOwner: null | object,     // signed-in seller
    hydrated: false | true,        // true after first client-side localStorage read
    loginPopupOpen: false | true,  // customer login dialog
    sellerPopupOpen: false | true  // seller login dialog
  }

Available actions (import from authSlice.js):
  hydrateAuth({ user, storeOwner })  — call once on mount
  setUser(userObject | null)
  setStoreOwner(ownerObject | null)
  clearAuth()                        — clears both user and storeOwner
  openLoginPopup()  /  closeLoginPopup()
  openSellerPopup() /  closeSellerPopup()

Common patterns:

  Open a popup:
    dispatch(openLoginPopup())   // customer
    dispatch(openSellerPopup())  // seller

  Read auth in a component:
    const user       = useSelector(state => state.auth.user);
    const storeOwner = useSelector(state => state.auth.storeOwner);

  Seller route guard:
    const { storeOwner, hasHydrated } = useSellerSession();

  After successful customer login:
    window.localStorage.removeItem("storeOwner");   // clear opposite role
    dispatch(setStoreOwner(null));
    saveAuthSession({ user, token, refreshToken });  // persist to localStorage
    dispatch(setUser(user));
    dispatch(closeLoginPopup());
    router.push("/account");

  After sign-out:
    clearAuthSession();   // removes everything from localStorage
    dispatch(clearAuth()); // clears user and storeOwner in Redux

  Hydration (Header.jsx, runs once on mount):
    useEffect(() => {
      dispatch(hydrateAuth({ user: getStoredUser(), storeOwner: getStoredStoreOwner() }));
    }, [dispatch]);

  Open popup based on authView (reset/verify pages):
    dispatch(authView === AUTH_VIEW.SELLER ? openSellerPopup() : openLoginPopup());

Role switch rules:
  When customer signs in → clear the seller session (localStorage + Redux).
  When seller signs in   → clear the customer session (localStorage + Redux).
  Always do BOTH: removeItem from localStorage AND dispatch set**(null).

FORBIDDEN — never write any of these:
  document.dispatchEvent(new CustomEvent("open-login-popup"))
  document.dispatchEvent(new CustomEvent("open-sellerPanel-popup"))
  window.dispatchEvent(new Event("user-updated"))
  window.dispatchEvent(new Event("storeOwner-updated"))
  document.addEventListener("open-login-popup", handler)
  subscribeToStorageChanges(callback)  // for auth reactivity
  openAuthPopup(authView)              // function no longer exists
  getAuthPopupEvent(authView)          // function no longer exists
`;

// ─────────────────────────────────────────────────────────────────────────────
// API LAYER PATTERN
// Paste this when adding, editing, or calling any API function in the frontend.
// ─────────────────────────────────────────────────────────────────────────────
export const API_LAYER_PATTERN = `
Every HTTP request in the frontend must go through the centralized Axios client at
src/api/client.js. Never use fetch, XMLHttpRequest, or any other HTTP mechanism.

Where everything lives:
  Axios client (single instance) : src/api/client.js
  Central export hub             : src/api/index.js
  Auth API                       : src/api/auth/Auth_API.js
  Customer API                   : src/api/customer/Customer_API.js
  Product API                    : src/api/product/Product_API.js
  Seller API                     : src/api/seller/Seller_API.js
  Order API                      : src/api/order/Order_API.js

Feature-level service files (features/*/services/) re-export from the above.
They must never make direct fetch or axios calls of their own.

The Axios client (client.js):
  import axios from "axios";
  import { getAccessToken } from "@/app/lib/browser-storage";

  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Attach Bearer token to every request
  client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  });

  // Re-throw the original Axios error — never wrap it in new Error()
  client.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),  // preserves error.response
  );

  export default client;

IMPORTANT — do NOT wrap errors in the interceptor.
Wrapping strips error.response entirely, which breaks all field-level validation
display. Components read:
  error?.response?.data?.details   // array of field validation errors
  error?.response?.data?.error     // server error message string

How to import API functions:
  ✅ import { loginCustomer } from "@/api";                               // central hub
  ✅ import { createSellerProduct } from "@/app/features/seller/services/seller-products-service";
  ❌ import { createSellerProduct } from "@/api/seller/Seller_API";       // too deep

How to write an API function:
  // In src/api/<feature>/<Feature>_API.js
  import client from "@/api/client";

  export async function getSomething(id) {
    const response = await client.get(\`/server/resource/\${id}\`);
    return response.data?.data;
  }

  Rules:
  - Always await client.get/post/patch/put/delete
  - Return response.data?.data for single resource or list responses
  - Return response.data when full envelope is needed (e.g. token + data)
  - Never catch errors inside API functions — let them bubble to the hook
  - Never put business logic, Redux dispatch, or navigation inside API functions

Component call chain:
  Component → Hook → Service → API function → client.js (Axios) → Backend

Error handling in hooks:
  try {
    await someApiFunction(payload);
  } catch (requestError) {
    const details = requestError?.response?.data?.details;
    const message = Array.isArray(details)
      ? details.map(e => \`\${e.path}: \${e.message}\`).join(", ")
      : requestError?.response?.data?.error ||
        requestError?.message ||
        "Something went wrong.";
    setError(message);
  }

Environment variable:
  NEXT_PUBLIC_API_URL=http://localhost:5000    (in .env.local)
  Falls back to "" (same-origin proxy) if not set.

How to add a new API resource:
  1. Create src/api/<feature>/<Feature>_API.js
  2. Import client from @/api/client
  3. Write and export async functions
  4. Re-export from src/api/index.js
  5. If a feature service wrapper is needed, create it in features/<feature>/services/
     and re-export — do not add logic there
  6. Create a hook in features/<feature>/hooks/
  7. Use the hook in your component

FORBIDDEN:
  const res = await fetch("/api/products");          // never use fetch
  import axios from "axios"; axios.get(...)          // never use raw axios
  await client.get("/server/products")               // inside a component — only allowed in API files
  try { ... } catch { return []; }                   // never swallow errors in API functions
`;

// ─────────────────────────────────────────────────────────────────────────────
// BACKEND DEDUP
// Paste this when cleaning up duplication in the backend.
// ─────────────────────────────────────────────────────────────────────────────
export const BACKEND_DEDUP = `
Review my backend project for duplication and refactor safely.

Goals:
1. Find duplicate files, duplicate logic, duplicate helpers, duplicate middleware shims, and duplicate old-vs-new layers.
2. Remove duplication only when it is clearly safe.
3. Keep the app fully operational after cleanup.
4. Preserve current behavior unless a bug is obvious.
5. Do not remove active routes, active imports, or newly adopted architecture by mistake.
6. Run tests after every meaningful cleanup phase and summarize results.

Safety rules:
1. First inspect the project structure and map: routes, controllers, services, middleware, models, tests.
2. Before deleting anything, search for all references to the target file/function/module.
3. Only delete files when they are confirmed unused or fully replaced by the newer layer.
4. If "old" and "new" implementations exist side by side: keep the active one, remove only the inactive one.
5. If compatibility shim files exist: update imports to point to the real canonical module first,
   then delete the shim only if no imports depend on it.
6. If duplicate helper logic exists: extract one shared helper, update imports, run tests.
7. Never remove route files just because they are in a versioned folder — confirm they are active first.
8. If something looks risky or ambiguous, stop and explain instead of guessing.

Definition of "safe to remove":
  - no active imports remain
  - tests still pass
  - behavior stays the same
  - route wiring still works

What I want back:
1. What duplication you found.
2. What you removed.
3. What you kept and why.
4. Which files changed.
5. Test results.
6. Any remaining duplication intentionally left because it was risky.
`;

// ─────────────────────────────────────────────────────────────────────────────
// FRONTEND DEDUP
// Paste this when cleaning up duplication in the frontend.
// ─────────────────────────────────────────────────────────────────────────────
export const FRONTEND_DEDUP = `
Review my frontend project for duplication and refactor safely.

Goals:
1. Find duplicate components, hooks, utilities, validation logic, API wrappers, styling,
   and duplicate old-vs-new frontend layers.
2. Remove duplication only when it is clearly safe.
3. Keep the frontend fully operational and visually unchanged after cleanup.
4. Run tests/build/lint after every meaningful cleanup phase and summarize results.

Safety rules:
1. First inspect: app/pages/routes, components, hooks, services/api, utils/helpers, styles, validation, tests.
2. Before deleting anything, search for all references to the target file/function/component/hook.
3. Only delete files when confirmed unused or fully replaced by the newer layer.
4. If "old" and "new" implementations exist side by side: keep the active one, remove only the inactive one.
5. If compatibility wrapper files exist: update imports first, then delete the wrapper if no imports remain.
6. If duplicate logic exists across components: extract one shared helper/hook/component, update imports, run build.
7. Never remove route files just because they look similar — confirm they are active and connected first.
8. If something looks risky or ambiguous, stop and explain instead of guessing.

Frontend duplication to look for:
  - Duplicate UI components with the same behavior but different names
  - Duplicate form logic that should be a shared hook
  - Duplicate fetch/api logic that should be a shared service function
  - Duplicate loading / error / empty-state UI
  - Duplicate validation schemas or input normalization
  - Duplicate style blocks or repeated layout wrappers
  - Duplicate auth guards / route protection logic
  - Duplicate state-handling logic across pages/components
  - Old and new component folders both existing at once
  - Unused components, hooks, or utility files

Definition of "safe to remove":
  - no active imports remain
  - tests/build/lint still pass
  - behavior stays the same
  - routing still works
  - visible UI is not accidentally broken

What I want back:
1. What duplication you found.
2. What you removed.
3. What you kept and why.
4. Which files changed.
5. Test/build/lint results.
6. Any remaining duplication intentionally left because it was risky.
`;
