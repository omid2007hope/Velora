Here’s the same idea, written cleanly as **instructions you can follow step-by-step**.

---

# Frontend API Structure — Instructions

## 1. Create a central API folder

Inside your `src` directory, create:

```
src/api/
```

This folder will contain all communication with your backend.

---

## 2. Create a base API client

Create a file:

```
src/api/client.js
```

Purpose:

- Store base URL (`/api`)
- Handle headers, tokens, errors
- Avoid repeating config in every request

What it should include:

- Axios (or fetch) instance
- Base URL pointing to your backend
- Optional interceptors for auth and error handling

---

## 3. Organize APIs by feature (NOT by HTTP method)

Inside `api/`, create folders per resource:

```
api/
  customer/
  product/
  seller/
  auth/
```

Each folder represents one backend resource.

---

## 4. Create one API file per resource

Inside each folder, create a single file:

```
Customer_API.js
Product_API.js
Seller_API.js
Auth_API.js
```

---

## 5. Inside each API file, group all requests

Each file should contain:

- GET functions
- POST functions
- PATCH functions
- DELETE functions

Example structure (conceptually):

```
GET:
- getAll
- getById

POST:
- create

PATCH:
- update

DELETE:
- remove
```

All functions call your backend endpoints using the base client.

---

## 6. Keep naming consistent

Use clear, predictable naming:

- `getCustomers`
- `getCustomerById`
- `createCustomer`
- `updateCustomer`
- `deleteCustomer`

This makes usage obvious everywhere in your app.

---

## 7. Create a central export file

Create:

```
src/api/index.js
```

This file should export all API modules.

Goal:

- Import everything from one place
- Avoid deep import paths

---

## 8. Use APIs inside components

In your React components:

- Import from `api/index.js`
- Call functions directly
- Handle responses and errors

---

## 9. (Optional but recommended) Add a hooks layer

If using React:

Create custom hooks like:

```
useProducts
useCustomers
```

These hooks:

- Call API functions
- Manage loading + error state
- Keep components clean

---

## 10. How to add a new resource

Example: adding `orders`

Step-by-step:

1. Create folder:

```
api/order/
```

2. Create file:

```
Order_API.js
```

3. Add functions:

- getOrders
- getOrderById
- createOrder
- updateOrder
- deleteOrder

4. Export it in:

```
api/index.js
```

---

## 11. Important rules to follow

- Do NOT split files by HTTP method on frontend
- Do keep one file per resource
- Do keep function names consistent
- Do use a shared API client
- Do not duplicate base URLs or configs
- Keep everything simple and readable

---

## 12. Mental model

- Backend = strict, method-separated, deeply modular
- Frontend = simple, feature-based, easy to use
