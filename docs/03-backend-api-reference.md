# 03. Backend REST API Reference Overview

Velora exposes a RESTful JSON API organized under the `/api/server/` prefix.

---

## 1. Standard Response Formats

### 1.1. Successful Response
Successful API responses return JSON payloads with relevant entity data:
```json
{
  "status": "success",
  "data": { ... }
}
```

### 1.2. Paginated Response
Endpoints supporting pagination return data arrays accompanied by a `metaData` envelope:
```json
{
  "data": [ ... ],
  "metaData": {
    "pages": 5,
    "total": 48,
    "currentPage": 1
  }
}
```

### 1.3. Error Response
Error responses follow a standard structure containing the HTTP status code and an error message:
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "details": [
    { "path": "email", "message": "Invalid email address" }
  ]
}
```

---

## 2. Global Endpoint Directory

| Route Prefix | Domain | Auth Required | Description |
|---|---|---|---|
| `/api/server/customer` | Customer Auth | No | Customer registration, login, password reset |
| `/api/server/store-owner` | Seller Auth | No | Store owner registration, login, password reset |
| `/api/server/seller/store` | Store Admin | Yes (Seller) | Create and manage merchant stores |
| `/api/server/store/products` | Seller Products | Yes (Seller) | Create, update, and soft-delete store products |
| `/api/server/product` | Public Catalog | No | Browse, filter, paginate, and search products |
| `/api/server/cart` | Cart Operations | Optional | Add, update quantity, and remove cart items |
| `/api/server/checkout` | Stripe Checkout | Optional | Create payment intents and finalize orders |
| `/api/server/customer/login/account` | Account Profile | Yes (Customer) | Manage user profile and settings |
| `/api/server/customer/login/account/address` | Address Book | Yes (Customer) | Saved customer shipping addresses |
| `/api/server/reviews` | Product Reviews | Optional / Yes | Submit and retrieve product ratings & reviews |
| `/api/server/webhook/stripe` | Stripe Webhook | No (Signature) | Process asynchronous Stripe transaction events |
| `/health` | System Health | No | Server liveness probe |
