# API Layer Pattern

This file is an instruction reference for AI and developers.
Read this before adding, editing, or calling any API function in the frontend.

---

## The Rule in One Sentence

Every HTTP request in the frontend must go through the centralized Axios client at
`src/api/client.js`. Never use `fetch`, `XMLHttpRequest`, or any other HTTP mechanism.

---

## Where Everything Lives

| Thing                                     | Location                           |
| ----------------------------------------- | ---------------------------------- |
| Axios client (single instance)            | `src/api/client.js`                |
| Central export hub                        | `src/api/index.js`                 |
| Auth API (login, register, verify, reset) | `src/api/auth/Auth_API.js`         |
| Customer API (profile, address, payment)  | `src/api/customer/Customer_API.js` |
| Product API (listing, detail, reviews)    | `src/api/product/Product_API.js`   |
| Seller API (store, seller products)       | `src/api/seller/Seller_API.js`     |
| Order API (checkout, order creation)      | `src/api/order/Order_API.js`       |

Feature-level service files (in `features/*/services/`) re-export from the above.
They must never make direct `fetch` or `axios` calls of their own.

---

## The Axios Client (`client.js`)

```js
import axios from "axios";
import { getAccessToken } from "@/app/lib/browser-storage";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// Automatically attaches Bearer token to every request
client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Re-throws the original Axios error so callers keep full error.response access
client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default client;
```

### Important: do not wrap errors in the interceptor

The response interceptor must re-throw the **original Axios error**, not a plain `new Error(message)`.

Wrapping in a plain `Error` strips `error.response` entirely. This breaks all
field-level validation error display across the app because components read:

```js
error?.response?.data?.details; // array of field validation errors
error?.response?.data?.error; // server error message string
```

If you wrap the error first, both of those become `undefined` and the app silently
shows the wrong fallback message everywhere.

---

## How to Import API Functions

Always import from the central hub or from the feature service layer.
Never import directly from an API file two levels deep.

```js
// ✅ Correct — from the central hub
import { loginCustomer, getProducts } from "@/api";

// ✅ Also correct — from a feature service re-export
import { createSellerProduct } from "@/app/features/seller/services/seller-products-service";

// ❌ Wrong — reaching into the API folder directly
import { createSellerProduct } from "@/api/seller/Seller_API";
```

---

## How to Write an API Function

```js
// In src/api/<feature>/<Feature>_API.js

import client from "@/api/client";

export async function getSomething(id) {
  const response = await client.get(`/server/resource/${id}`);
  return response.data?.data;
}

export async function createSomething(payload) {
  const response = await client.post("/server/resource", payload);
  return response.data?.data;
}
```

Rules:

- Always `await client.get/post/patch/put/delete`
- Return `response.data?.data` for single resource or list responses
- Return `response.data` when the full envelope is needed (e.g. token + data)
- Never catch errors inside API functions — let them bubble to the calling hook or component
- Never put business logic, Redux dispatch, or navigation inside API functions

---

## How to Write a Feature Service File

Feature service files are thin re-export wrappers. They do not add logic.

```js
// src/app/features/seller/services/seller-products-service.js

// Re-exported from the central API layer — do not add logic here.
export {
  getSellerProducts as listSellerProducts,
  createSellerProduct,
} from "@/api/seller/Seller_API";
```

---

## How Components Call APIs

Components never call API functions directly.
They call hooks, which call service functions, which call API functions.

```
Component → Hook → Service → API function → client.js (Axios) → Backend
```

Example:

```js
// Component
const { form, handleSubmit } = useSellerProductForm();

// Hook (use-seller-product-form.js)
const payload = createSellerProductPayload(form);
await createSellerProduct(payload); // service function

// Service (seller-products-service.js)
export { createSellerProduct } from "@/api/seller/Seller_API";

// API (Seller_API.js)
export async function createSellerProduct(payload) {
  const response = await client.post("/server/seller/products", payload);
  return response.data?.data;
}
```

---

## Error Handling in Hooks

Hooks catch errors and format them for the UI. Never show raw Axios errors.

```js
try {
  await someApiFunction(payload);
} catch (requestError) {
  // Try to read field-level validation details first
  const details = requestError?.response?.data?.details;
  const message = Array.isArray(details)
    ? details.map((entry) => `${entry.path}: ${entry.message}`).join(", ")
    : requestError?.response?.data?.error || // server error message
      requestError?.message || // network / timeout error
      "Something went wrong.";

  setError(message);
}
```

---

## Environment Variable

The API base URL is read from:

```
NEXT_PUBLIC_API_URL
```

If not set, the client falls back to `""` (empty string) which routes requests
through Next.js proxying to the same origin. Set this in `.env.local` for local development:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## What Is Forbidden

```js
// ❌ Never use fetch
const res = await fetch("/api/products");

// ❌ Never use axios directly — always use the shared client
import axios from "axios";
axios.get("/api/products");

// ❌ Never call backend URLs from inside a component
const res = await client.get("/server/products"); // only allowed in API files

// ❌ Never swallow errors silently in API functions
export async function getProducts() {
  try {
    const response = await client.get("/server/products");
    return response.data?.data;
  } catch {
    return []; // ❌ hides the real error from the hook
  }
}
```

---

## Adding a New API Resource

1. Create `src/api/<feature>/<Feature>_API.js`
2. Import `client` from `@/api/client`
3. Write and export async functions
4. Re-export from `src/api/index.js`
5. If a feature service wrapper is needed, create it in `src/app/features/<feature>/services/`
   and re-export from there — do not add logic
6. Create a hook in `src/app/features/<feature>/hooks/` that calls the service
7. Use the hook in your component
