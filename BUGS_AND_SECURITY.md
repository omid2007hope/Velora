# 🔐 Velora — Bug & Security Audit Report

> Generated: 2026-04-28  
> Audited: Full Backend (Node/Express/MongoDB) + Full Frontend (Next.js/React/Redux)

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 6 |
| 🟠 High | 13 |
| 🟡 Medium | 15 |
| 🔵 Low | 10 |
| **Total** | **44** |

---

## 🔴 CRITICAL

---

### [C-1] Refresh Token Accepted as Access Token on ALL Protected Endpoints
**File:** `Backend/middleware/auth/authenticate.js` L38–53  
**Category:** Security — Authentication  
**Description:** `verifyTokenPayload()` iterates through **both** `JWT_SECRET` and `JWT_REFRESH_SECRET`. A 7-day refresh token (signed with `JWT_REFRESH_SECRET`) is accepted as a valid Bearer token on every `requireAuth`-protected endpoint. The 15-minute access token window is entirely bypassed.  
**Fix:** Only verify access tokens with `JWT_SECRET`. Create a separate `verifyRefreshToken()` that uses only `JWT_REFRESH_SECRET`, and use it exclusively in the refresh endpoint.

---

### [C-2] Stripe Webhook Silently Accepted When Secret Is Not Configured
**File:** `Backend/controller/WebhookController.js` L10–12  
**Category:** Security — Payment Integrity  
**Description:** If `STRIPE_WEBHOOK_SECRET` is not set in environment, the webhook handler returns `200 { received: true, skipped: true }` without signature verification. An attacker can `POST` a fake `payment_intent.succeeded` event to mark any order as paid without payment.  
**Fix:** Throw a `500` or refuse to start if `STRIPE_WEBHOOK_SECRET` is not configured. Never silently skip verification.

---

### [C-3] Any Authenticated User Can Self-Escalate Order Payment Status to "paid"
**File:** `Backend/controller/OrderController.js` L38–63; `Backend/validation/schemas.js` L177–185  
**Category:** Security — Authorization / Payment Bypass  
**Description:** `PATCH /server/order/:id` allows any authenticated user to update `paymentStatus` and `orderStatus` on their own order. `orderStatusSchema` accepts `paymentStatus: z.string().min(1)` — any string including `"paid"`. A user can create an order, then immediately `PATCH` it with `{ "paymentStatus": "paid" }` to bypass Stripe entirely.  
**Fix:** Remove `paymentStatus` from the user-facing update schema. Status transitions should only be performed by the webhook handler. Constrain `orderStatus` to allowed enum values (`pending`, `processing`, `shipped`, `delivered`, `cancelled`).

---

### [C-4] Product Creation Route Has No Authentication
**File:** `Backend/routes/versionOne/products/Post_products.js` L13  
**Category:** Security — Authorization  
**Description:** `router.post("/products", validateCreateProduct, createProduct)` — no `requireAuth` or `requireSeller` middleware. Any unauthenticated user can create products.  
**Fix:** Add `requireSeller` middleware: `router.post("/products", requireSeller, validateCreateProduct, createProduct)`.

---

### [C-5] Review `userId` Controlled Entirely by Client Body
**File:** `Backend/controller/ReviewController.js` L12; `Backend/routes/versionOne/reviews/Post_reviews.js` L10–15  
**Category:** Security — Authorization / Data Integrity  
**Description:** `userId: req.body.userId` — the review author is set from untrusted client input. There is also no authentication middleware on `POST /server/products/:productId/reviews`. Anyone (unauthenticated) can post a review as any user.  
**Fix:** Add `requireAuth` to the review POST route; set `userId: req.user.id` in the controller (ignoring the body value).

---

### [C-6] Google Sign-In Has No Backend Verification — Creates Unauthenticated Sessions
**File:** `Frontend/src/app/features/auth/components/LoginPopup.jsx` L87–106; `LogIntoSellerPanelPopup.jsx` L90–109; `SellerSignupPopup.jsx` L87–93  
**Category:** Security — Authentication  
**Description:** Google credential handling is purely client-side: `parseJwtPayload(token)` is just a base64 decode (`atob`) with no signature verification. No backend API is called to validate the Google ID token or create a server session. The user is placed in Redux state and localStorage without ever receiving a backend JWT. Subsequent authenticated API calls will fail silently (no Bearer token).  
**Fix:** Send the Google credential token to a backend endpoint (e.g. `POST /server/auth/google`). On the backend, verify it with `google-auth-library`, look up or create the account, and return a proper JWT pair.

---

## 🟠 HIGH

---

### [H-1] ReDoS via Unescaped User Input in MongoDB `$regex`
**File:** `Backend/services/ProductService.js` L21  
**Category:** Security — Denial of Service  
**Description:** `filter.name = { $regex: search, $options: "i" }` — the raw `search` query parameter is passed directly to MongoDB regex. A crafted input like `(a+)+b` can cause catastrophic backtracking and consume excessive CPU.  
**Fix:** Escape regex metacharacters before use:  
```js
filter.name = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" };
```  
Also add a max-length validation on the search parameter.

---

### [H-2] Routes Mounted Twice — All Endpoints Exist at Up to Four Paths
**File:** `Backend/routes/index.js` L17–20; `Backend/Server.js` L55–56  
**Category:** Security / API Design  
**Description:** `versionOneRoutes` is mounted both at root (no prefix) and at `/v1` in `routes/index.js`. In `Server.js`, the entire router is mounted at both `/` and `/api`. Every endpoint is reachable at up to 4 URLs: `/server/...`, `/v1/server/...`, `/api/server/...`, `/api/v1/server/...`. This doubles the attack surface, complicates rate-limiting and logging, and makes path-based middleware bypasses possible.  
**Fix:** Pick one canonical path (`/api/v1/server/...`) and remove the extra mounts.

---

### [H-3] Token Refresh Interceptor Hardcoded to Seller Endpoint — Customers Silently Logged Out
**File:** `Frontend/src/api/client.js` L98–99  
**Category:** Bug — Authentication  
**Description:** The Axios response interceptor always calls `/server/store-owner/token/refresh`. When a customer's access token expires, their refresh request hits the seller endpoint, which rejects the customer refresh token → `expireSession()` is called → customer is logged out, even though their customer refresh token is still valid.  
**Fix:** Determine the user type from Redux state before choosing the refresh endpoint: use `/server/customer/token/refresh` for customers and `/server/store-owner/token/refresh` for sellers.

---

### [H-4] `window.dispatchEvent` Used for Session Expiry — Violates Redux Architecture and Breaks SSR
**File:** `Frontend/src/api/client.js` L55–60; `Frontend/src/app/features/seller/components/SellerPanelGuard.jsx` L17–26  
**Category:** Architecture / Design  
**Description:** `expireSession()` uses `window.dispatchEvent(new CustomEvent("auth:session-expired"))` to trigger logout. Per project conventions, shared state must go through Redux actions, not window events. This pattern is fragile and breaks SSR.  
**Fix:** Import the Redux store directly into the API client (or use a callback registered at app startup) and dispatch `clearAuth()` / `clearStoreOwner()` from the Redux slice instead.

---

### [H-5] Stripe Payment Method Owner Not Verified
**File:** `Backend/services/PaymentService.js` L7–44  
**Category:** Security — Payment  
**Description:** `paymentMethodId` is client-supplied. The code retrieves the payment method from Stripe but does NOT verify it belongs to the current user. A user could use another customer's `pm_xxx` ID.  
**Fix:** After retrieving the payment method, verify `paymentMethod.customer === stripeCustomerId`. Alternatively, use Stripe Setup Intents so the payment method is created in the context of the authenticated customer.

---

### [H-6] `refreshAccessToken` Does Not Validate Token Type
**File:** `Backend/services/CustomerService.js` L117–127; `Backend/services/StoreOwnerService.js` L144–155  
**Category:** Security — Authentication  
**Description:** The refresh endpoint verifies the token with `JWT_REFRESH_SECRET || JWT_SECRET` but does not check any `type` claim. An unexpired access token could be used on the refresh endpoint to produce new access tokens indefinitely, bypassing the 15-minute expiry.  
**Fix:** Include `{ tokenType: "refresh" }` in the refresh token payload at signing time. In `refreshAccessToken`, verify `decoded.tokenType === "refresh"` before issuing a new access token.

---

### [H-7] `BaseService.softDeleteRecursive` Crashes on Missing Parent (Null Dereference)
**File:** `Backend/services/BaseService/index.js` L114  
**Category:** Bug — Runtime Error  
**Description:** If `findOneAndUpdate` returns `null` (document not found), `getChildren(parent._id)` throws `TypeError: Cannot read properties of null (reading '_id')`. The `catch` block swallows the error and returns `null`, silently failing the operation.  
**Fix:** Guard against null: `if (!parent) throw createHttpError(404, "Resource not found")` before calling `getChildren`.

---

### [H-8] `BaseService.updateBySoftDelete` References `req.admin` — Service Layer Accesses Request Object
**File:** `Backend/services/BaseService/index.js` L128–132  
**Category:** Architecture / Bug  
**Description:** `deletedBy: req.admin?.userName` — service layer code directly accesses an Express request object. `req.admin` is not defined anywhere in this codebase (no admin role exists), so `deletedBy` is always `undefined`. This violates service/controller separation.  
**Fix:** Pass `deletedBy` as an explicit string parameter. Remove `req` from service methods entirely.

---

### [H-9] `findById` Bypasses Soft-Delete Filter
**File:** `Backend/services/BaseService/index.js` L69  
**Category:** Bug — Data Integrity  
**Description:** `findById = async (id) => this.model.findById(id)` — unlike all other `find*` methods, this does not apply `_active()`. Soft-deleted documents are returned when fetched by ID.  
**Fix:** `findById = async (id) => this.model.findOne(this._active({ _id: id }))`.

---

### [H-10] Password Reset Accepts New Password Before Email Verification
**File:** `Backend/services/CustomerService.js` L182–210; `Backend/services/StoreOwnerService.js` L223–257  
**Category:** Security — Authentication Flow  
**Description:** `requestPasswordReset` accepts the user's **new password** in the request body and stores its hash before the user has verified via email link. This is non-standard: the new password travels over the wire before identity is confirmed; multiple reset requests with different passwords create a TOCTOU race condition; and anyone with DB access between request and confirmation obtains the hash of the intended new password.  
**Fix:** Standard flow: request phase stores only the reset token. The confirmation step (from the email link) accepts the new password; the server verifies the token and then applies the change.

---

### [H-11] Stripe `clientSecret` Stored Persistently in Database
**File:** `Backend/model/PaymentIntent.js`; `Backend/services/PaymentIntentService.js` L7–25  
**Category:** Security — Payment Data  
**Description:** The Stripe `client_secret` is stored in the `PaymentIntent` MongoDB collection. Although `select: false` is set, it is persisted indefinitely. Stripe's guidelines state client secrets should never be stored.  
**Fix:** Do not persist the `clientSecret`. Return it directly from the Stripe API response during order creation. If needed again, call `stripe.paymentIntents.retrieve(intentId)`.

---

### [H-12] `alert()` Displays Stripe Client Secret in Browser — Debug Code Left in Production
**File:** `Frontend/src/app/features/order/hooks/use-checkout-form.js` L119–124  
**Category:** Security / Bug  
**Description:** `alert("Payment intent created. Use Stripe Elements... client secret:\n" + orderResponse.paymentIntent.clientSecret)` — leftover debug code that exposes the Stripe `clientSecret` as plain text in a browser dialog.  
**Fix:** Remove the `alert()` block entirely. Complete the payment programmatically using `stripe.confirmPayment()` or `stripe.confirmCardPayment()`.

---

### [H-13] CORS Allows All Localhost Origins Unconditionally (Including Production)
**File:** `Backend/Server.js` L16, L22–28  
**Category:** Security — CORS  
**Description:** `localhostPattern` is evaluated in the CORS `origin` callback regardless of `NODE_ENV`. In production, any request from `localhost:*` is allowed with credentials. An attacker running code on a victim's machine (malware, compromised extension) can make credentialed cross-origin requests to the production API.  
**Fix:** Only allow localhost in non-production environments:  
```js
if (process.env.NODE_ENV !== 'production' && localhostPattern.test(origin)) { ... }
```

---

## 🟡 MEDIUM

---

### [M-1] `orderStatus` and `paymentStatus` Accept Any Arbitrary String
**File:** `Backend/validation/schemas.js` L177–185  
**Category:** Bug — Validation  
**Description:** `orderStatusSchema` uses `z.string().min(1)` for both fields. No enum constraint is enforced. A user can set their order status to `"shipped"`, `"delivered"`, etc.  
**Fix:** `orderStatus: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).optional()`. Remove `paymentStatus` from this schema (set only by webhooks).

---

### [M-2] Client-Supplied `shipping` and `tax` Values Used Without Server Validation
**File:** `Backend/services/OrderService.js` L48–71; `Backend/validation/schemas.js` L104–106  
**Category:** Security — Business Logic  
**Description:** `shipping` and `tax` are passed directly from the client request body and stored without server-side recalculation. A user can POST `{ "shipping": 0, "tax": 0 }` to avoid fees.  
**Fix:** Calculate shipping and tax server-side and ignore client-supplied values.

---

### [M-3] `PaymentIntentService` Allows $0 Amount
**File:** `Backend/services/PaymentIntentService.js` L12  
**Category:** Bug — Business Logic  
**Description:** `const amountInCents = Math.round(Number(amount || 0) * 100)` — if `amount` is falsy or `0`, a $0 payment intent is created. Combined with client-controlled fees, a user could engineer a $0 order.  
**Fix:** Add a minimum amount check: `if (amountInCents < 50) throw createHttpError(400, "Order amount too low")` (Stripe minimum is 50 cents).

---

### [M-4] No Transactions for Multi-Step DB Operations (Order + PaymentIntent)
**File:** `Backend/controller/OrderController.js` L7–27  
**Category:** Bug — Data Integrity  
**Description:** `createOrder()` and `createPaymentIntentForOrder()` are called sequentially without a MongoDB transaction. If payment intent creation fails, the order document is stranded in `"pending"` status permanently with no path to payment.  
**Fix:** Use a MongoDB session/transaction wrapping both operations, or implement compensating cleanup (delete the order if payment intent creation fails).

---

### [M-5] `POST /server/cart` Incorrectly Handles GET Cart Logic
**File:** `Backend/routes/versionOne/cart/Post_cart.js` L13  
**Category:** Bug — API Design  
**Description:** `router.post("/", requireAuth, getCart)` — the `getCart` read handler is registered on the POST route. This violates REST semantics.  
**Fix:** Remove this line. The `getCart` handler should only exist on `GET /server/cart`.

---

### [M-6] `phoneNumber` Has `unique: true` Without `sparse: true` — Only One User Can Omit Phone Number
**File:** `Backend/model/Account.js` L27–29  
**Category:** Bug — Data Integrity  
**Description:** MongoDB's unique index treats multiple `null` values as duplicates unless `sparse: true` is set. A second user who omits a phone number will receive a duplicate key error.  
**Fix:** Add `sparse: true` to the `phoneNumber` field definition.

---

### [M-7] Product `imageUrl` Accepts Any String — No URL Validation
**File:** `Backend/validation/schemas.js` L159  
**Category:** Security / Validation  
**Description:** `imageUrl: z.string().min(1)` accepts any non-empty string including `javascript:alert(1)` or `data:text/html,...` URIs which could execute in certain rendering contexts.  
**Fix:** `imageUrl: z.string().url()` — Zod's `.url()` validator enforces proper URL format and rejects javascript/data URIs.

---

### [M-8] `listSellerProducts` Returns Soft-Deleted Products
**File:** `Backend/services/ProductService.js` L27–29  
**Category:** Bug — Data Integrity  
**Description:** `listSellerProducts(storeOwnerId)` queries without an `isDeleted: false` filter. Deleted products appear in the seller panel.  
**Fix:** Add `isDeleted: false` to the query, or use `this.findAllByCondition({ storeOwnerId })` which inherits `_active()` from `BaseService`.

---

### [M-9] Email Verification Failure Silently Swallowed on Registration
**File:** `Backend/services/CustomerService.js` L63–67  
**Category:** Bug — UX / Reliability  
**Description:** If `mailer.sendVerificationEmail()` throws, the error is caught and logged but registration still returns success. The user's account is created but they never receive a verification email and have no way to know.  
**Fix:** Either propagate the error (fail the registration) or include an explicit `{ emailSent: false }` flag in the response so the client can inform the user.

---

### [M-10] `UserSlice.js` and `StoreOwnerSlice.js` Are Dead Code — Not Registered in Redux Store
**File:** `Frontend/src/app/redux/slice/UserSlice.js`; `Frontend/src/app/redux/slice/StoreOwnerSlice.js`; `Frontend/src/app/redux/store/index.js`  
**Category:** Bug — Architecture  
**Description:** These slices call `localStorage` at module load time but are not imported or registered in `store/index.js`. They are entirely unused dead code that will cause confusion about where auth state lives.  
**Fix:** Delete `UserSlice.js` and `StoreOwnerSlice.js`. All auth state is managed in `authSlice.js`.

---

### [M-11] Google Sign-Up for Sellers Closes Popup Without Actually Registering
**File:** `Frontend/src/app/features/auth/components/SellerSignupPopup.jsx` L87–93  
**Category:** Bug — Broken Flow  
**Description:** `handleGoogleSignup(token)` only calls `parseJwtPayload(token)`, closes the modal, and opens the email verification popup — without calling `registerStoreOwner()` or any backend API. The seller account is never created. A `console.log` is called instead.  
**Fix:** Implement a proper backend Google OAuth flow. Until then, remove the Google signup button from the seller form or show an explicit "not supported" message.

---

### [M-12] `BasketSlice` Hydration Mismatch (SSR vs. Client)
**File:** `Frontend/src/app/redux/slice/BasketSlice.js` L6  
**Category:** Bug — SSR / Hydration  
**Description:** `initialState: getStoredBasket()` is evaluated at module load time. During SSR, `isBrowser()` returns `false` → empty array. On the client it returns stored data. This mismatch causes a React hydration error and a flash of an empty basket.  
**Fix:** Use `initialState: []` and dispatch a `hydrate` action in a `useEffect`, matching the pattern already used in `authSlice.js`.

---

### [M-13] Tax Is a Hardcoded Flat Dollar Amount Regardless of Order Size
**File:** `Frontend/src/app/features/order/utils/order-pricing.js` L1–2  
**Category:** Bug — Business Logic  
**Description:** `TAX_AMOUNT = 8.32` is a fixed flat value regardless of order total, item types, or user jurisdiction. A $5 order has the same tax as a $5000 order.  
**Fix:** Calculate tax as a percentage of the subtotal on the server side. Remove client-side tax calculation.

---

### [M-14] No Rate Limiting on Registration or Email Verification Endpoints
**File:** `Backend/routes/versionOne/customer/Post_customer.js` L24; `Backend/routes/versionOne/storeOwner/Post_storeOwner.js` L24; email verification/resend routes  
**Category:** Security — Abuse Prevention  
**Description:** Registration and email resend endpoints only have the general `apiLimiter` (200 req/15min). An attacker can trigger mass account creation or spam verification emails to a target address.  
**Fix:** Apply `authLimiter` (10 req/15min) to registration, email verification, and password reset endpoints.

---

### [M-15] Cart `addCartItem` Has Race Condition — No Atomic Update
**File:** `Backend/services/CartService.js` L27–81  
**Category:** Bug — Concurrency  
**Description:** The add-to-cart flow reads the cart, modifies items in memory, then writes it back. Two concurrent requests can both read the same cart version and the second write will overwrite the first.  
**Fix:** Use MongoDB's atomic array operators: `$push` with `$each` for new items, `$inc` on the quantity field for existing items, using `arrayFilters` for targeted updates.

---

## 🔵 LOW

---

### [L-1] Backward-Compatible Token Extraction Fallback Accepts Raw Header Value
**File:** `Backend/middleware/auth/authenticate.js` L14–15  
**Category:** Security — Hardening  
**Description:** If the `Authorization` header is present but lacks the `Bearer ` prefix, the raw header value is used as the token. This is non-standard and widens the token acceptance surface.  
**Fix:** Remove the fallback. Only accept properly formatted `Authorization: Bearer <token>` headers.

---

### [L-2] `!origin` (No Origin Header) Always Allowed by CORS
**File:** `Backend/Server.js` L24–25  
**Category:** Security — CORS  
**Description:** `if (!origin) return callback(null, true)` allows all requests without an `Origin` header (curl, Postman, server-to-server). CORS is not meaningful protection for non-browser clients.  
**Fix:** Acceptable for an API that supports non-browser clients, but document this intentional behavior. Consider adding an API key requirement for server-to-server calls in production.

---

### [L-3] JWT Not Invalidated on Logout — 7-Day Refresh Token Remains Valid
**File:** Backend generally  
**Category:** Security — Session Management  
**Description:** No token blocklist exists. After logout, a stolen refresh token remains valid for up to 7 days and can generate new access tokens.  
**Fix:** Implement a token revocation mechanism: store a `jti` claim in each JWT; on logout, add the `jti` to a Redis blocklist; check it during token verification.

---

### [L-4] `BaseService.softDeleteRecursive` Swallows All Errors
**File:** `Backend/services/BaseService/index.js` L115–118  
**Category:** Bug — Error Handling  
**Description:** `catch (err) { console.error(err); return null; }` — errors are logged but the caller receives `null` with no indication of failure. Dependent operations silently fail.  
**Fix:** Re-throw the error (or a wrapped `HttpError`) so the controller can respond appropriately.

---

### [L-5] MongoDB `autoIndex: true` in Production
**File:** `Backend/database/MongoDB.js`  
**Category:** Performance  
**Description:** Mongoose defaults to `autoIndex: true`. On large collections in production, index recreation at startup causes blocking I/O and slow startup times.  
**Fix:** Set `autoIndex: process.env.NODE_ENV !== 'production'` in Mongoose connection options and manage indexes via migrations.

---

### [L-6] `mailer.js` Calls `getEnvConfig()` at Module Load Time
**File:** `Backend/utils/mailer.js` L6  
**Category:** Bug — Initialization Order  
**Description:** `getEnvConfig()` is called at the top level when the module is first `require()`d. If `loadEnv()` hasn't been called yet (e.g., in some test setups), environment variables will be undefined and the SMTP transport will be silently misconfigured.  
**Fix:** Move env config access inside the function bodies (lazy initialization), or ensure `loadEnv()` is always called before any module imports in entry points.

---

### [L-7] No Stock / Inventory Check During Order Creation
**File:** `Backend/services/OrderService.js` L7–46  
**Category:** Bug — Business Logic  
**Description:** Order creation does not validate product availability or decrement inventory. Any quantity can be ordered for any product regardless of stock.  
**Fix:** Check product availability and decrement stock atomically (using MongoDB transactions) when an order is created.

---

### [L-8] `x-access-token` Header Accepted for Bearer Token
**File:** `Backend/middleware/auth/authenticate.js` L18–32  
**Category:** Security — Hardening  
**Description:** The `x-access-token` header is a second accepted token channel, including handling for array values. Array values could be confused in some proxy setups, and maintaining two auth channels increases complexity.  
**Fix:** Support only the standard `Authorization: Bearer <token>` header unless there is a documented client requirement.

---

### [L-9] `alert()` Used Throughout Frontend for All Error Handling
**File:** `Frontend/src/app/features/auth/components/LoginPopup.jsx`, `SignupPopup.jsx`, `SellerSignupPopup.jsx`, `LogIntoSellerPanelPopup.jsx`; `use-checkout-form.js`  
**Category:** UX / Design  
**Description:** `alert()` is used as the sole error feedback mechanism everywhere. It blocks the UI thread, is inaccessible, cannot be styled, and may be blocked in some embedded contexts (iframes).  
**Fix:** Replace with in-form error state rendered in JSX, e.g. a `<p className="text-red-600">` below the submit button.

---

### [L-10] `checkoutForm` Sends Shipping/Tax From Client-Side Calculation
**File:** `Frontend/src/app/features/order/hooks/use-checkout-form.js` L104–106  
**Category:** Security — Business Logic  
**Description:** `shippingFee: SHIPPING_FEE` and `tax: TAX_AMOUNT` are hard-coded frontend constants sent in the order creation request. The server accepts these values without recalculation (see [M-2]).  
**Fix:** Remove shipping and tax from the client payload. Compute them server-side.

---

## Fix Priority Order

Fix these first — they allow payments to be bypassed or forged:

1. **[C-2]** Stripe webhook without signature verification → payment fraud
2. **[C-3]** User self-escalating `paymentStatus` to `"paid"` → payment bypass
3. **[H-12]** `alert()` exposing Stripe `clientSecret` → secret leakage
4. **[H-11]** `clientSecret` persisted in database → violates Stripe guidelines
5. **[C-1]** Refresh token accepted as access token → auth bypass
6. **[C-4]** Unauthenticated product creation → data integrity
7. **[C-5]** Unauthenticated / spoofed reviews → data integrity
8. **[C-6]** Google sign-in with no backend verification → fake sessions
9. **[H-3]** Customer token refresh broken → production usability regression
10. **[H-13]** CORS allows localhost in production → credentialed cross-origin access
