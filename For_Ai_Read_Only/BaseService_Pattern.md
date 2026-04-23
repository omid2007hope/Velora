# BaseService Pattern — Velora Backend

Every service in this project extends `BaseService`.
This document explains the pattern, available methods, and how to create a new service.

---

## File location

```
Backend/services/BaseService/index.js
```

---

## The pattern

Every service file MUST follow this exact structure:

```js
const Model = require("../model/ModelName");
const BaseService = require("./BaseService");
// other imports (bcrypt, jwt, stripe, etc.)

module.exports = new (class ServiceName extends BaseService {
  // private helpers (prefix with _)
  _helperMethod() { ... }

  // public business logic methods
  async doSomething(args) {
    // use this.model or inherited this.* methods
  }
})(Model);
```

- The class is **anonymous** and **immediately instantiated** with the Mongoose model.
- `module.exports` is the **instance**, not the class.
- Controllers import and call methods directly on the instance:
  ```js
  const productService = require("../services/ProductService");
  await productService.listProducts({ category: "shoes" });
  ```

---

## BaseService inherited methods

All methods below are available inside any service via `this.*`.

### Find methods

| Method                          | Signature                            | Description                                                                  |
| ------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| `findAll`                       | `(condition = {})`                   | Find all **non-deleted** docs matching condition                             |
| `findAllWithSort`               | `(condition = {}, sort = {})`        | Find all non-deleted with sort                                               |
| `findAllWithPagination`         | `(condition, { page, limit, sort })` | Paginated query. Returns `{ data, metaData: { pages, total, currentPage } }` |
| `findAllAndPopulate`            | `(condition, populate)`              | Find all non-deleted with populate                                           |
| `findAllRecursive`              | `(parentField)`                      | Build a full tree from root nodes (where `parentField` is `null`)            |
| `findAllRecursiveByCondition`   | `(condition, parentField)`           | Build a tree starting from matching nodes                                    |
| `findAllDeleted`                | `()`                                 | Find all documents where `isDeleted: true`                                   |
| `findById`                      | `(id)`                               | Find by `_id`                                                                |
| `findByIdPopulate`              | `(id, populate)`                     | Find by `_id` with populate                                                  |
| `findOneByCondition`            | `(condition)`                        | Find one **non-deleted** doc by condition                                    |
| `findOneByConditionAndPopulate` | `(condition, populate)`              | Find one non-deleted with populate                                           |

### Write methods

| Method                | Signature                             | Description                                        |
| --------------------- | ------------------------------------- | -------------------------------------------------- |
| `createObject`        | `(data)`                              | `new Model(data).save()`                           |
| `update`              | `(condition, data, returnNew = true)` | `findOneAndUpdate`, returns updated doc by default |
| `updateAll`           | `(condition, data)`                   | `updateMany`                                       |
| `updateBySoftDelete`  | `(condition, data, req)`              | Soft-delete old doc then create new replacement    |
| `softDelete`          | `(condition, user)`                   | Set `isDeleted: true`, `deletedBy: user`           |
| `softDeleteRecursive` | `(parentField, condition, user)`      | Soft-delete parent + all children recursively      |
| `hardDelete`          | `(condition)`                         | `findOneAndDelete`                                 |
| `hardDeleteMany`      | `(condition)`                         | `deleteMany`                                       |
| `restoreSoftDelete`   | `(condition)`                         | Set `isDeleted: false`, clear `deletedBy`          |

### Private helpers (internal to BaseService)

| Method                           | Description                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `_active(condition)`             | Appends `{ isDeleted: { $ne: true } }` to any condition. Used internally by all `find*` methods. |
| `_buildTree(nodes, parentField)` | Recursively builds parent/child tree structure.                                                  |

---

## When to use `this.model` directly

Use `this.model.*` only when you need features BaseService does not expose:

- `.select("+hiddenField")` — for password or secret fields
- `.lean()` — for plain JS object instead of Mongoose document
- Complex aggregations or chained queries

Example:

```js
const user = await this.model.findOne({ email }).select("+password").lean();
```

---

## Private methods

Prefix internal/helper methods with `_` so it is clear they are not part of the public API:

```js
_generateToken(hoursValid = 24) { ... }
_buildClientLink(pathname, token) { ... }
_mapToPublicShape(doc) { ... }
```

Do **not** call `_` methods from controllers.

---

## Services with multiple models

If a service needs more than one model, pass the **primary** model to `BaseService` and import the secondary model directly:

```js
const Cart = require("../model/Cart");
const Product = require("../model/Product"); // secondary model
const BaseService = require("./BaseService");

module.exports = new (class CartService extends BaseService {
  async addCartItem({ userId, item }) {
    const product = await Product.findById(item.productId).lean(); // direct use
    // ... rest uses this.model (Cart)
  }
})(Cart);
```

---

## Current services and their models

| Service file              | Class name             | Primary model   | Secondary models |
| ------------------------- | ---------------------- | --------------- | ---------------- |
| `AccountService.js`       | `AccountService`       | `Account`       | —                |
| `AddressService.js`       | `AddressService`       | `Address`       | —                |
| `CartService.js`          | `CartService`          | `Cart`          | `Product`        |
| `CustomerService.js`      | `CustomerService`      | `Customer`      | —                |
| `OrderService.js`         | `OrderService`         | `Order`         | `Product`        |
| `PaymentService.js`       | `PaymentService`       | `Payment`       | Stripe client    |
| `PaymentIntentService.js` | `PaymentIntentService` | `PaymentIntent` | Stripe client    |
| `ProductService.js`       | `ProductService`       | `Product`       | —                |
| `ReviewService.js`        | `ReviewService`        | `Review`        | —                |
| `StoreOwnerService.js`    | `StoreOwnerService`    | `StoreOwner`    | —                |
| `StoreService.js`         | `StoreService`         | `Store`         | —                |

---

## How to add a new service

1. Create `Backend/services/NewResourceService.js`
2. Follow the pattern:

```js
const NewResource = require("../model/NewResource");
const BaseService = require("./BaseService");

module.exports = new (class NewResourceService extends BaseService {
  async listAll() {
    return this.findAll({});
  }

  async createOne(data) {
    return this.createObject(data);
  }
})(NewResource);
```

3. Import in your controller:

```js
const newResourceService = require("../services/NewResourceService");
```

4. Call methods directly:

```js
const result = await newResourceService.listAll();
```

---

## Rules summary

- ✅ Always extend `BaseService`
- ✅ Export `new (class ... extends BaseService { })(Model)`
- ✅ Use `this.*` inherited methods when they fit
- ✅ Use `this.model.*` only for features BaseService does not expose
- ✅ Prefix internal helpers with `_`
- ❌ Never use `req` or `res` in a service
- ❌ Never export a plain object of functions
- ❌ Never call `new Model(...).save()` — use `this.createObject(data)` instead
- ❌ Never use `Model.findOneAndUpdate(...)` directly — use `this.update(condition, data)` instead
