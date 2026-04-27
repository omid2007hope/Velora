# Velora — Project To-Do List

> Last updated: **27 April 2026**  
> This document tracks every outstanding task across the Backend and Frontend.  
> Work through each section top-to-bottom. Check items off as they are completed.

---

## Table of Contents

1. [Backend — Store API](#1-backend--store-api)
2. [Backend — Database Schema Fixes](#2-backend--database-schema-fixes)
3. [Backend — Business Rule: Mandatory Store Before Product](#3-backend--business-rule-mandatory-store-before-product)
4. [Backend — Validation, Auth & Token Audit](#4-backend--validation-auth--token-audit)
5. [Frontend — Search Bar Fix](#5-frontend--search-bar-fix)
6. [Frontend — Product Card: Show Store Name](#6-frontend--product-card-show-store-name)
7. [Frontend — Add-to-Basket Popup](#7-frontend--add-to-basket-popup)
8. [Frontend — Mandatory Auth Popup (Cart & Buy)](#8-frontend--mandatory-auth-popup-cart--buy)
9. [Frontend — Seller Panel Full Redesign](#9-frontend--seller-panel-full-redesign)
10. [Frontend — Better Customer Account Page](#10-frontend--better-customer-account-page)
11. [Frontend — Optional Login Popup on Site Open](#11-frontend--optional-login-popup-on-site-open)
12. [Rebrand / Copyright](#12-rebrand--copyright)

---

## 1. Backend — Store API

### Current State

Only two endpoints exist for `/store`:
| Method | Route | Status |
|--------|-------|--------|
| `POST` | `/store` | ✅ Done |
| `GET` | `/store` | ✅ Done — returns the **logged-in owner's own** store |

### Missing Endpoints to Implement

#### 1.1 `GET /stores` — Get All Stores (public)

- [ ] Add `getAllStores` handler in `StoreController.js`
- [ ] Add `getAllStores()` method in `StoreService.js` (use `this.model.find({}).sort({ createdAt: -1 })`)
- [ ] Create route file `Backend/routes/versionOne/store/Get_all_stores.js`
  - No auth required — public endpoint
- [ ] Register the route in `Backend/routes/versionOne/store/index.js`

#### 1.2 `GET /stores/:id` — Get Store By ID (public)

- [ ] Add `getStoreById` handler in `StoreController.js`
  - Validate `:id` is a valid ObjectId, return 400 if not
  - Return 404 if store not found
- [ ] Add `getStoreById(id)` method in `StoreService.js` (use `this.findById(id)`)
- [ ] Add route in `Get_store.js` (or a dedicated `Get_store_by_id.js`)
  - `router.get("/:id", validateStoreId, getStoreById)` — no auth required
- [ ] Add `validateStoreId` middleware in `StoreValidation.js`

#### 1.3 `PATCH /store/:id` — Patch Store By ID (seller only)

- [ ] Add `patchStoreById` handler in `StoreController.js`
  - Verify `req.user.id === store.ownerOfStore` — 403 if not the owner
  - Only update fields that are present in `req.body` (partial update)
- [ ] Add `updateStore(id, patch)` method in `StoreService.js`
- [ ] Create route `PATCH /store/:id` with `requireSeller` + `validatePatchStore` middleware
- [ ] Add `validatePatchStore` middleware in `StoreValidation.js` (all fields optional, same rules as create)

#### 1.4 `DELETE /store/:id` — Delete Store By ID (seller only)

- [ ] Add `deleteStoreById` handler in `StoreController.js`
  - Verify `req.user.id === store.ownerOfStore` — 403 if not the owner
  - Decide: **hard delete** or **soft delete** (add `isDeleted` flag to `Store` schema). Soft delete is recommended.
  - If soft delete → add `isDeleted: { type: Boolean, default: false }` to `StoreSchema`
- [ ] Add `deleteStore(id)` / `softDeleteStore(id)` method in `StoreService.js`
- [ ] Create route `DELETE /store/:id` with `requireSeller`
- [ ] Consider cascading: when a store is deleted, should its products be soft-deleted too? Decision needed.

#### 1.5 General Store Debugging

- [ ] `StoreController.js` — `getStoreData` does **not** guard against `req.user` being undefined (no `requireSeller` check in the GET route, only `requireAuth`). Decide whether GET own-store should also verify role is `seller`.
- [ ] `StoreService.js` — `getStoreData` calls `findOne({ ownerOfStore: ownerId })`. If no store exists yet it returns `null`. The controller returns `{ data: null }` — the frontend should handle this gracefully; add a proper 404 or empty-state response.
- [ ] Test all four new endpoints with the Postman collection (`Velora.postman_collection.json`).

---

## 2. Backend — Database Schema Fixes

### Current Problem

Several models reference `User` or mix up `Customer` vs `Seller` references.  
The intended relationship is:

| Concept          | Model                                                                        | ObjectId field should reference                                   |
| ---------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **CustomerId**   | `Review`, `Account` (CustomerDetails), `Address`, `Order`, `Cart`, `Payment` | `Customer` model                                                  |
| **StoreOwnerID** | `Store.ownerOfStore`                                                         | `Seller` model ✅ already correct                                 |
| **StoreId**      | `Product`                                                                    | `Store` model ❌ currently references `Seller` via `storeOwnerId` |

### Tasks

#### 2.1 Fix `Review` model (`Backend/model/Review.js`)

- [ ] `userId` currently refs `"User"` → change ref to `"Customer"`
  ```js
  // Before
  userId: { type: ObjectId, ref: "User" }
  // After
  userId: { type: ObjectId, ref: "Customer" }
  ```

#### 2.2 Fix `Cart` model (`Backend/model/Cart.js`)

- [ ] `userId` currently refs `"User"` → change ref to `"Customer"`

#### 2.3 Fix `Order` model (`Backend/model/Order.js`)

- [ ] `userId` currently refs `"User"` → change ref to `"Customer"`

#### 2.4 Fix `Product` model (`Backend/model/Product.js`)

- [ ] **`storeOwnerId` references `Seller` — this is wrong per the intended data model.**
- [ ] Add a `storeId` field that references the `Store` model:
  ```js
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,   // enforce after store creation guard is in place
    index: true,
  }
  ```
- [ ] Keep `storeOwnerId` for ownership checks (or derive it via the Store document — decide which approach).
- [ ] Update `ProductService.createProduct()` to accept and save `storeId`.
- [ ] Update `createSellerProduct` in `ProductController.js` to look up the seller's store, get its `_id`, and pass it as `storeId`.
- [ ] Update `listProducts` and `getProductById` to populate `storeId` (store name at minimum) so the frontend can display it.

#### 2.5 Consistency — `User` model audit

- [ ] Check `Backend/model/User.js` — clarify whether this is a shared base model or a legacy artifact. If unused, remove it to avoid confusion.
- [ ] Search entire codebase for `ref: "User"` and confirm each one is intentional or needs changing to `"Customer"`.

---

## 3. Backend — Business Rule: Mandatory Store Before Product

### Current State

A seller can call `POST /seller/products` without having a store. `createSellerProduct` in `ProductController.js` does not check for an existing store.

### Tasks

- [ ] Create a middleware `requireSellerHasStore` in `Backend/middleware/` (or inside `StoreService.js`):
  ```js
  // Pseudocode
  const store = await storeService.getStoreData(req.user.id);
  if (!store)
    throw createHttpError(
      403,
      "You must create a store before adding products.",
    );
  req.sellerStore = store; // pass store downstream
  ```
- [ ] Apply `requireSellerHasStore` to the `POST /seller/products` route in `Backend/routes/versionOne/products/Post_products.js`.
- [ ] In `createSellerProduct`, use `req.sellerStore._id` as the `storeId` for the new product (ties in with task 2.4).
- [ ] **Frontend guard** — In `SellerPanelShell.jsx` / `SellerProductsOverview`, before showing "Add Product" CTA, check if the seller has a store. If not, redirect to `/seller/store/:id` with an informative message like _"Create your store first before listing products."_

---

## 4. Backend — Validation, Auth & Token Audit

### Tasks

- [ ] **Read & fully understand** `Backend/middleware/auth/authenticate.js`:
  - `requireAuth` — checks Bearer token, sets `req.user = { id, email, role }`
  - `optionalAuth` — same but doesn't block on missing token
  - `requireSeller` — calls `requireAuth` then checks `req.user.role === "seller"` (verify this logic is complete in the full file)
- [ ] Verify `JWT_SECRET` is always set in `config/env.js` and that an error is thrown at startup if it is missing.
- [ ] Audit every route file — confirm the correct middleware (`requireAuth` vs `requireSeller` vs `optionalAuth` vs none) is applied:
  - Public routes (product list, product detail, store list): **no auth**
  - Customer routes (cart, order, payment, review, address, account): **`requireAuth`** + confirm `role === "customer"` where needed
  - Seller routes (store CRUD, product create): **`requireSeller`**
- [ ] Check all validation middleware files in `Backend/middleware/validation/` — ensure every required field is validated before it reaches the controller, and that validation errors return `400` with a clear message.
- [ ] Confirm `StoreValidation.js` exists and covers all required fields (`storeName`, `storeDescription`, `countryStoreLocatedIn`, `cityStoreLocatedIn`, `storeAddress`, `storeZipcode`).
- [ ] Run existing tests (`npm test` in Backend) — fix any failing tests and add tests for the new store routes.

---

## 5. Frontend — Search Bar Fix

### Current State

`Frontend/src/app/features/catalog/components/ProductSearchBar.jsx` works via **form submit** (user must press Enter or click the search button). The search in `CatalogPage.jsx` only triggers `updateQuery` on `onSubmit`.

### Task

- [ ] Change the search to trigger **on every keystroke** (`onChange`) instead of requiring a submit.
- [ ] In `CatalogPage.jsx`, wire `onSearchChange` so it calls `updateQuery` with the new text directly:
  ```jsx
  // In CatalogSidebar and inline search bar props:
  onChange={(text) => {
    setSearchText(text);
    updateQuery(routeState.category, text, routeState.isNew, routeState.subCategory);
  }}
  ```
- [ ] Consider **debouncing** the query update (e.g. 300 ms) to avoid firing an API call on every single character. Use a `useDebounce` custom hook or `lodash.debounce`.
- [ ] Remove the `onSubmit` prop from `ProductSearchBar` and delete the `<button type="submit">` (or keep it as an accessibility-friendly visible affordance but make search reactive regardless).
- [ ] Apply the same fix in both the desktop sidebar (`CatalogSidebar.jsx`) and the mobile inline search bar inside `CatalogPage.jsx`.

---

## 6. Frontend — Product Card: Show Store Name

### Current State

`ProductCard.jsx` and `ProductDetailPage.jsx` do not display the store name. The `Product` model currently stores `storeOwnerId` but not a populated store name.

### Tasks

- [ ] **Backend prerequisite**: Complete task 2.4 (add `storeId` to Product + populate store name in `getProductById` and `listProducts`).
- [ ] In `ProductDetailPage.jsx`, read `product.storeId?.storeName` (or however the API returns it after population) and render it prominently — e.g. below the product name:
  ```jsx
  {
    product.storeName && (
      <p className="text-sm text-amber-800">
        Sold by <strong>{product.storeName}</strong>
      </p>
    );
  }
  ```
- [ ] In `ProductCard.jsx`, optionally show the store name as a subtitle below the product name.
- [ ] Make the store name a clickable link to the store's public page once store pages exist.

---

## 7. Frontend — Add-to-Basket Popup

### Current State

In `ProductDetailPage.jsx`, `addToBasket()` dispatches to Redux but shows no visual feedback.

### Tasks

- [ ] Create a reusable `ToastNotification` or `BasketPopup` component in `Frontend/src/app/components/ui/`.
- [ ] The popup should show:
  - Product thumbnail
  - Product name
  - Confirmation message: _"Added to your basket!"_
  - A CTA button: _"View Basket"_ → navigates to `/order`
  - Auto-dismiss after ~3 seconds
- [ ] Trigger it inside `addToBasket()` in `ProductDetailPage.jsx` (or via a Redux side-effect / middleware listener on the `addItem` action).
- [ ] Position it as a **toast** (top-right or bottom-center) using a portal (`createPortal`) so it floats above all page content.
- [ ] Ensure it is accessible (role="alert", aria-live="polite").

---

## 8. Frontend — Mandatory Auth Popup (Cart & Buy)

### Current State

`addToBasket()` and `buyNow()` in `ProductDetailPage.jsx` execute without checking if the user is logged in. Unauthenticated users can add items to the local Redux basket without any account.

### Tasks

- [ ] Create a reusable `AuthRequiredModal` component:
  - Heading: _"Sign in to continue"_
  - Message: _"You need an account to add items to your basket or place an order."_
  - Two buttons: **Log In** and **Sign Up** — both navigate to the auth page (or open an auth drawer)
  - Close/dismiss button (optional — but user should still be able to browse without logging in)
- [ ] In `ProductDetailPage.jsx`:
  - Before dispatching `addItem` or calling `buyNow`, check if a valid auth token / user session exists.
  - If not authenticated → show `AuthRequiredModal` and abort the basket action.
- [ ] Determine the auth state source:
  - Check if a Redux auth slice exists (`Frontend/src/app/redux/`) or if auth state comes from `localStorage` (as seen in `SellerPanelShell.jsx` for seller session).
  - Create or reuse a `useCustomerSession` hook analogous to `useSellerSession`.
- [ ] Apply the same guard to the **checkout / order flow** (`/order` page).

---

## 9. Frontend — Seller Panel Full Redesign

### Current State

The seller panel (`/seller`) has a basic working layout (`SellerPanelShell.jsx`) with a sidebar and dashboard page, but only covers product publishing. It needs a full professional redesign and expanded functionality.

### Design & UX Tasks

- [ ] Define a design system / colour tokens specifically for the seller panel (already uses amber/orange — formalise into Tailwind config variables).
- [ ] **Sidebar**:
  - Add more navigation items as features are built: Dashboard, Store, Products, Orders, Analytics, Settings
  - Show active store name (not just owner name) once store exists
  - Collapse to icon-only sidebar on smaller screens
- [ ] **Dashboard page** (`/seller`):
  - Add stat cards: Total Products, Total Orders (future), Revenue (future)
  - Add a prominent _"Create Store"_ banner/CTA if the seller has no store yet (connects to task 3)
  - Clean up the placeholder text ("Start with product creation now. Store setup... can plug in later") — replace with real live data
- [ ] **Store management page** (`/seller/store/:id`):
  - `SellerStoreForm.jsx` — review and redesign form layout
  - `SellerStoreOverview.jsx` — review and redesign overview/display
  - Add Edit (PATCH) and Delete (soft) actions once backend endpoints are ready (tasks 1.3 & 1.4)
- [ ] **Products page** (`/seller/products`):
  - List all seller products in a data table with columns: Image, Name, Price, Category, Status
  - Add Edit and Delete (soft delete) actions per product
  - Add pagination or infinite scroll for large catalogs
- [ ] **Add Product page** (`/seller/products/new`):
  - If seller has no store → block the form and show _"You must create a store first"_ with a link (task 3 frontend guard)
  - Improve the product form layout — group fields by section (Basic Info, Pricing, Images, Variants, SEO)
- [ ] **Responsive**: All seller panel pages must work on tablet and mobile.

---

## 10. Frontend — Better Customer Account Page

### Current State

The account feature exists at `Frontend/src/app/features/account/` but needs a redesign.

### Tasks

- [ ] Audit existing components in `Frontend/src/app/features/account/components/`
- [ ] Redesign the account page layout to include clear sections:
  - **Profile** — Full name, email, change password
  - **Personal Details** — Gender, date of birth, phone number (maps to `CustomerDetails` / `Account` model)
  - **Addresses** — List saved addresses, add new, edit, delete (maps to `Address` model)
  - **Payment Methods** — List saved cards (maps to `Payment` model)
  - **Order History** — List past orders with status (maps to `Order` model)
- [ ] Add proper loading skeletons and empty states for each section.
- [ ] Add inline edit capability (click to edit, save, cancel) rather than navigating away.
- [ ] Ensure all API calls go through the existing service files in `Frontend/src/app/features/account/services/`.

---

## 11. Frontend — Optional Login Popup on Site Open

> **Skipped for now as of 27 April 2026.**  
> Re-evaluate when auth popup component (task 8) is built — the same component can be repurposed here with minor changes.

- [ ] _(Future)_ On first visit (no active session), show a dismissible login/signup modal after a short delay (e.g. 2–3 seconds).
- [ ] Use `localStorage` flag `velora_login_prompt_shown` to show it only once per session.

---

## 12. Rebrand / Copyright

> **To be done last, once all features are complete.**

- [ ] Audit all text, logos, icons, and font choices for third-party copyright exposure.
- [ ] Choose a new brand name, logo, and colour palette.
- [ ] Replace all instances of the current brand name throughout:
  - Frontend: page titles, `<title>` tags, `manifest.js`, `opengraph-image.js`, `twitter-image.js`, metadata in `layout.js`
  - Backend: `package.json` name field, log messages, email templates in `utils/mailer.js`
  - README files, Postman collection name
- [ ] Update favicon and social-preview images.
- [ ] Check that any third-party UI component libraries or icon packs (Heroicons, Lucide) are used within their licence terms (both are MIT — confirm nothing else is used).

---

## Quick Reference — Files Most Affected Per Task

| Task             | Backend files                                                                                | Frontend files                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1 — Store API    | `StoreController.js`, `StoreService.js`, `routes/versionOne/store/*`, `StoreValidation.js`   | —                                                                                            |
| 2 — DB Schema    | `model/Review.js`, `model/Cart.js`, `model/Order.js`, `model/Product.js`                     | Product services/hooks                                                                       |
| 3 — Store Gate   | `middleware/requireSellerHasStore.js`, `routes/.../Post_products.js`, `ProductController.js` | `SellerPanelShell.jsx`, `seller/products/new` page                                           |
| 4 — Auth Audit   | `middleware/auth/authenticate.js`, all route files, `middleware/validation/*`                | —                                                                                            |
| 5 — Search Bar   | —                                                                                            | `ProductSearchBar.jsx`, `CatalogPage.jsx`, `CatalogSidebar.jsx`                              |
| 6 — Store Name   | `ProductService.js` (populate), `ProductController.js`                                       | `ProductCard.jsx`, `ProductDetailPage.jsx`                                                   |
| 7 — Basket Popup | —                                                                                            | New `ToastNotification.jsx`, `ProductDetailPage.jsx`                                         |
| 8 — Auth Guard   | —                                                                                            | New `AuthRequiredModal.jsx`, `ProductDetailPage.jsx`, `/order` page, `useCustomerSession.js` |
| 9 — Seller UI    | —                                                                                            | All files under `app/seller/` and `features/seller/`                                         |
| 10 — Account UI  | —                                                                                            | All files under `app/account/` and `features/account/`                                       |
| 12 — Rebrand     | `package.json`, `mailer.js`                                                                  | `layout.js`, `manifest.js`, all meta files                                                   |
