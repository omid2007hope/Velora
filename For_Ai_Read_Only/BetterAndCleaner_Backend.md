Look at my backend and refactor it into a clean, scalable, separated architecture using this exact logic.

Main goals:

1. Keep the backend clean, structured, and easy to scale.
2. Separate responsibilities clearly between routes, middleware, controllers, services, models, config, and utilities.
3. Preserve existing API behavior unless a clear bug needs to be fixed.
4. Remove unnecessary code and fix broken wiring, missing imports, or inconsistent structure.
5. Keep the code testable.
6. Run tests after the refactor and summarize the result.

Required backend structure:

ROUTES

- Keep routes inside `routes/`
- Organize routes by API version first, then by feature/resource
- Example:
  - `routes/index.js`
  - `routes/versionOne/index.js`
  - `routes/versionOne/products/`
  - `routes/versionOne/profile/`
- Keep route files separated by HTTP method when that pattern already exists or when I ask for it:
  - `Get_Products.js`
  - `Post_Products.js`
  - `Patch_Products.js`
  - `Delete_Products.js`
- Each feature folder must have its own `index.js` that combines those method files.
- `routes/versionOne/index.js` should combine all feature routers.
- `routes/index.js` should mount health routes plus all API routes.
- Support versioned routing cleanly, such as `/api/v1/...`
- If needed, also preserve existing unversioned routes for backward compatibility.

MIDDLEWARE

- Keep middleware inside `middleware/`
- Group middleware by responsibility:
  - `middleware/validation/`
  - `middleware/auth/`
  - `middleware/request/`
  - `middleware/error/`
- Middleware is only for cross-cutting concerns such as:
  - validation
  - sanitization
  - auth/access control
  - request normalization
  - shared request guards
- Do not place business logic in middleware.
- Reuse middleware instead of duplicating validation across routes.

CONTROLLERS

- Keep controllers inside `controller/`
- Use one controller file per resource
- Example:
  - `controller/ProductController.js`
  - `controller/ProfileController.js`
- Controllers should:
  - read `req.params`, `req.query`, and `req.body`
  - call service methods
  - return HTTP responses with correct status codes
  - handle not-found responses where appropriate
- Controllers should NOT:
  - query the database directly unless the project explicitly uses that simple pattern and changing it would be unnecessary
  - contain large business logic
  - duplicate validation logic

SERVICES

- Keep services inside `services/`
- Use one service file per resource
- Services should:
  - contain business logic
  - handle model/database interaction
  - centralize reusable operations
  - return data, not HTTP responses
- Services should NOT:
  - use `req` or `res`
  - contain route logic
  - send status codes directly
- Every service MUST extend `BaseService` from `services/BaseService/index.js`

BASE SERVICE PATTERN

- All services must use this exact pattern:

```js
const Model = require("../model/ModelName");
const BaseService = require("./BaseService");
// other imports...

module.exports = new (class ServiceName extends BaseService {
  // business logic methods using this.model
})(Model);
```

- The class is anonymous, instantiated immediately with the Mongoose model
- `BaseService` is located at `services/BaseService/index.js`
- Import path from any service file: `require("./BaseService")`

BASESERVICE METHODS AVAILABLE
Use these inherited methods inside any service via `this.*`:

| Method                                                         | Description                                                                 |
| -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `this.findAll(condition)`                                      | Find all non-deleted documents matching condition                           |
| `this.findAllWithSort(condition, sort)`                        | Find all with sort                                                          |
| `this.findAllWithPagination(condition, { page, limit, sort })` | Paginated find, returns `{ data, metaData: { pages, total, currentPage } }` |
| `this.findAllAndPopulate(condition, populate)`                 | Find all with populate                                                      |
| `this.findAllRecursive(parentField)`                           | Find all as tree (root nodes only, then children recursively)               |
| `this.findAllRecursiveByCondition(condition, parentField)`     | Recursive tree from condition                                               |
| `this.findAllDeleted()`                                        | Find all soft-deleted documents                                             |
| `this.findById(id)`                                            | Find by `_id`                                                               |
| `this.findByIdPopulate(id, populate)`                          | Find by `_id` with populate                                                 |
| `this.findOneByCondition(condition)`                           | Find one non-deleted by condition                                           |
| `this.findOneByConditionAndPopulate(condition, populate)`      | Find one non-deleted with populate                                          |
| `this.createObject(data)`                                      | Create and save a new document                                              |
| `this.update(condition, data, returnNew?)`                     | `findOneAndUpdate`, returns updated doc by default                          |
| `this.updateAll(condition, data)`                              | `updateMany`                                                                |
| `this.updateBySoftDelete(condition, data, req)`                | Soft-delete then create a new replacement                                   |
| `this.softDelete(condition, user)`                             | Mark `isDeleted: true`, set `deletedBy`                                     |
| `this.softDeleteRecursive(parentField, condition, user)`       | Soft-delete parent + all children recursively                               |
| `this.hardDelete(condition)`                                   | `findOneAndDelete`                                                          |
| `this.hardDeleteMany(condition)`                               | `deleteMany`                                                                |
| `this.restoreSoftDelete(condition)`                            | Set `isDeleted: false`, clear `deletedBy`                                   |

PRIVATE HELPER IN BASESERVICE

- `this._active(condition)` — appends `{ isDeleted: { $ne: true } }` to any condition. Used internally by most `find*` methods.
- `this._buildTree(nodes, parentField)` — recursively builds parent/child trees.

WHEN TO USE `this.model` DIRECTLY

- Use `this.model.*` directly only when you need chaining that BaseService does not expose:
  - `.select("+hiddenField")`
  - `.lean()`
  - `.sort(...)` combined with custom filters not supported by BaseService
  - Raw MongoDB queries with complex operators

PRIVATE/HELPER METHODS IN A SERVICE

- Prefix private/internal methods with `_`
- Example: `_generateToken()`, `_buildClientLink()`, `_mapStoreOwner()`
- These methods should NOT be called from controllers

SERVICES WITH MULTIPLE MODELS

- Pass the primary model to `BaseService` via the constructor
- Import secondary models (e.g. `Product`) directly at the top of the file
- Example: `CartService` uses `Cart` as primary model and imports `Product` directly

MODELS

- Keep models inside `model/` or `models/` based on the project’s current convention
- Use one model per resource
- Models should define schema and persistence rules only
- Do not place request logic or controller logic in models

CONFIG

- Keep config files inside `config/`
- Example:
  - database config
  - env config
  - app constants if needed
- Centralize reusable environment/config logic instead of scattering it

UTILS

- Keep pure shared helpers inside `utils/`
- Example:
  - async handler
  - HTTP error helper
  - formatting helpers
- Do not place business logic in vague utility files

SERVER

- Prefer a single `Server.js` if I ask for one-file server setup
- `Server.js` should contain:
  - dotenv/env loading
  - express app creation
  - middleware setup
  - API route mounting
  - 404 handler
  - centralized error handler
  - database connection startup
  - `app.listen(...)`
- `Server.js` must still export the Express app for tests
- Only start the listener when run directly:
  - `if (require.main === module) { ... }`

RESPONSIBILITY SPLIT

- Routes:
  - define endpoint paths
  - attach middleware
  - pass control to controller
- Middleware:
  - validate/sanitize/protect requests
- Controllers:
  - translate HTTP request to service call
  - translate service result to HTTP response
- Services:
  - contain business logic and model access
- Models:
  - define schema/data persistence
- Utils:
  - hold shared helpers
- Config:
  - hold environment/database/app configuration

NAMING RULES

- Keep naming consistent across all layers
- Example:
  - route folder: `products`
  - controller: `ProductController.js`
  - service: `ProductService.js`
  - model: `Product.js`
- Keep names descriptive and predictable
- Avoid vague files like:
  - `helper.js`
  - `stuff.js`
  - `misc.js`

STYLE RULES

- Keep the code simple and readable
- Prefer small functions with clear purpose
- Add comments only where helpful
- Remove dead code, unused imports, and unnecessary wrappers
- Do not change unrelated code
- Keep module style consistent with the project (CommonJS if already CommonJS)

ERROR HANDLING RULES

- Use centralized error handling
- Use shared helpers such as `asyncHandler` or HTTP error utilities when appropriate
- Do not repeat large try/catch blocks everywhere if the project already has a cleaner pattern
- Keep validation errors, cast errors, duplicate key errors, and 404 behavior consistent

TESTABILITY RULES

- Keep app exportable for tests
- Keep controllers testable by mocking services
- Keep services testable by mocking models
- Keep middleware testable in isolation where practical
- Do not tightly couple layers unnecessarily

REFACTOR RULES

- Refactor directly in the codebase
- Fix broken route/controller/service wiring
- Fix missing imports
- Create missing route aggregation files if needed
- If documented endpoints exist but are not wired, wire them properly
- Preserve behavior unless a fix is necessary
- Use `apply_patch` for edits

What I want back:

1. Refactor the backend directly
2. Explain the final backend structure
3. Tell me which files were added or changed
4. Tell me how to add a new resource in the same pattern
5. Run tests and summarize the result
