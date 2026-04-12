# Model

model = "gpt-5.4"
model_reasoning_effort = "medium"

# Environment

[windows]
sandbox = "elevated"

# Development focus

[development]
stack = ["html", "tailwind", "react", "nextjs", "express", "mongodb"]

# Code style preferences

[code]
style = "clean"
comments = true
simplicity = "high"
remove_unnecessary_code = true

# Debugging

[debug]
enabled = true
explain_errors = true
suggest_fixes = true

# Testing

[test]
generate_tests = true
focus = ["logic", "api", "ui"]

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
- If repeated CRUD logic exists, create a base service only if it clearly improves clarity.

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

Review my backend/frontend project for duplication and refactor safely.

Goals:
1. Find duplicate files, duplicate logic, duplicate helpers, duplicate middleware shims, and duplicate old-vs-new layers.
2. Remove duplication only when it is clearly safe.
3. Keep the app fully operational after cleanup.
4. Preserve current behavior unless a bug is obvious.
5. Do not remove active routes, active imports, or newly adopted architecture by mistake.
6. Run tests after every meaningful cleanup phase and summarize results.
7. Use apply_patch for edits.

Safety rules:
1. First inspect the project structure and map:
   - routes
   - controllers
   - services
   - middleware
   - models
   - tests
2. Before deleting anything, search for all references to the target file/function/module.
3. Only delete files when they are confirmed unused or fully replaced by the newer layer.
4. If there are “old” and “new” implementations side by side:
   - keep the active one
   - remove only the inactive one
5. If compatibility shim files exist:
   - update imports to point to the real canonical module first
   - then delete the shim only if no imports depend on it
6. If duplicate helper logic exists across multiple files:
   - extract one shared helper only if it reduces duplication safely
   - update imports
   - run tests
7. Never remove route files just because they are in a versioned folder.
   - confirm whether the route files are the active ones first
8. Never remove anything unrelated to duplication cleanup.
9. If something looks risky or ambiguous, stop and explain instead of guessing.

How to work:
1. Inspect the codebase first.
2. List duplication findings grouped by:
   - safe duplicate files
   - safe duplicate helpers
   - possible risky duplication
3. Start with the safest removals first.
4. After each cleanup phase:
   - verify imports
   - run tests
   - report what still works
5. Continue until the obvious safe duplication is removed.

Output format I want:
1. What duplication you found
2. What you removed
3. What you kept and why
4. Which files changed
5. Test results
6. Any remaining duplication that was intentionally left because it was risky

Important project-specific instruction:
- Keep all newly written canonical files.
- Remove only the old duplicated layer after confirming it is unused.
- Be especially careful with:
  - versioned routes
  - compatibility re-export files
  - duplicate controller/service generations
  - duplicate auth/validation helpers

Definition of “safe to remove”:
- no active imports remain
- tests still pass
- behavior stays the same
- route wiring still works

Look at my backend structure and refactor the routing/server setup using this exact pattern:

Goals:

1. Keep routes separated by feature and HTTP method.
2. Wire all route files together cleanly through nested `index.js` files.
3. Merge `app.js` into `Server.js` so there is only one server entry file.
4. Preserve testability so the Express app can still be imported in tests.
5. Do not break existing endpoint behavior unless clearly necessary.
6. Fix missing imports or broken route files while doing the refactor.
7. Run tests after the refactor and tell me what passed or failed.

Required route architecture:

- `routes/index.js`
  - top-level router
  - includes health route like `/server`
  - mounts all version one routes
  - mounts both:
    - unversioned paths
    - versioned paths like `/v1`
- `routes/versionOne/index.js`
  - combines all resource routers
- Each resource folder should keep separate files for each method:
  - `Get_*.js`
  - `Post_*.js`
  - `Patch_*.js`
  - `Delete_*.js`
- Each resource folder must also have its own `index.js` that imports and mounts those separate method files.

Required server architecture:

- Remove `app.js`
- Move all Express app setup into `Server.js`
- `Server.js` must include:
  - `dotenv` config
  - express app creation
  - middleware
  - `/api` mounting
  - 404 handler
  - error handler
  - database connection startup
  - `app.listen(...)`
- `Server.js` must export the Express app for tests
- Only start listening when run directly, using:
  - `if (require.main === module) { ... }`

Implementation rules:

- Keep the code clean and simple
- Add comments only where actually helpful
- Do not change unrelated code
- Do not remove route separation
- If route files are missing imports like `asyncHandler` or validators, fix them
- If documented endpoints exist but route files are missing, create them in the same pattern
- Keep CommonJS if the project already uses CommonJS
- Use `apply_patch` for edits

What I want back:

1. Make the refactor directly in the codebase
2. Explain how the route tree is wired
3. Tell me which files were added/changed
4. Tell me how to add new routes in the same pattern
5. Run tests and summarize the result

 
 Look at my frontend structure and refactor it using this exact pattern:

Goals:
1. Make the frontend cleaner, more separated, and easier to scale.
2. Keep code organized by feature and responsibility.
3. Preserve the current UI/behavior unless a fix is clearly needed.
4. Remove unnecessary code and reduce duplication.
5. Keep components readable, reusable, and testable.
6. Keep styling consistent and intentional.
7. Run tests/build/lint if available and tell me what passed or failed.

Frontend architecture rules:

GENERAL STRUCTURE
- Organize the frontend by feature and responsibility, not randomly by file type.
- Keep pages focused on page composition.
- Move reusable UI into dedicated component folders.
- Move business/data logic out of large page files.
- Keep naming consistent across folders and files.

If using Next.js App Router:
- `app/` should contain route segments and page-level entry files
- each route page should stay thin
- page files should mostly assemble sections/components and call needed hooks/actions
- avoid putting large UI blocks, fetch logic, and helper logic all inside one `page.jsx`

PAGES
- Page files should:
  - define the route-level page
  - compose sections/components
  - keep only page-specific logic
- Page files should NOT:
  - become giant component dumps
  - contain too many inline handlers, helpers, and fetch utilities
  - mix layout, business logic, and reusable UI all together

COMPONENTS
- Put reusable UI in a clear components structure.
- Separate:
  - shared UI components
  - feature-specific components
  - layout components
- Example structure:
  - `src/components/ui/`
  - `src/components/layout/`
  - `src/features/account/components/`
  - `src/features/products/components/`
- Components should:
  - have one clear job
  - receive clean props
  - avoid deeply mixed responsibilities
- Split large components when they are doing too much:
  - view rendering
  - form state
  - API calls
  - data transformation
  - modal logic
  - list rendering
- Prefer smaller purposeful components over one huge file.

FEATURE STRUCTURE
- Group related frontend logic by feature when possible.
- Example:
  - `src/features/account/`
  - `src/features/profile/`
  - `src/features/products/`
- A feature folder can contain:
  - `components/`
  - `hooks/`
  - `services/`
  - `utils/`
  - `schemas/`
  - `constants/`
- Keep feature-specific code inside the feature instead of scattering it globally.

HOOKS
- Put reusable stateful logic into hooks.
- Use hooks for:
  - data fetching coordination
  - form behavior
  - filtering/sorting state
  - modal/open-close logic
  - debounced search
  - pagination behavior
- Hooks should NOT:
  - render UI
  - become dumping grounds for unrelated logic
- Keep hooks focused and clearly named.
- Example:
  - `useAddressForm`
  - `useAccountProfile`
  - `useProductsFilter`

SERVICES / API LAYER
- Put API calls in a dedicated service layer.
- Do not scatter fetch/axios calls across pages and components.
- Example:
  - `src/services/accountService.js`
  - `src/features/account/services/addressService.js`
- Service functions should:
  - make the request
  - normalize data only if useful
  - return data/errors in a predictable way
- Components should call hooks or services, not build request logic repeatedly inline.

FORMS
- Keep forms modular and readable.
- Separate:
  - form UI
  - validation/schema
  - submit logic
  - reusable field components
- Large forms should be broken into:
  - field groups
  - reusable inputs
  - helper hooks
- Avoid giant page files with all form state and JSX mixed together.

STYLING
- Keep styling consistent with the existing design system or project direction.
- Do not introduce random one-off styles unless necessary.
- Extract repeated class patterns into reusable components or helpers when useful.
- Keep class names readable and intentional.
- If using Tailwind:
  - avoid huge unreadable class blobs when a component can be extracted
  - reuse style patterns through components
  - keep spacing, typography, and layout consistent
- Preserve the existing visual language unless I explicitly ask for redesign.

LAYOUT
- Separate layout structure from page content.
- Use dedicated layout components for:
  - headers
  - sidebars
  - account navigation
  - dashboard shells
  - section wrappers
- Avoid repeating the same structural markup across pages.

UTILS
- Put pure helper functions in `utils/`.
- Helpers should be:
  - pure
  - small
  - reusable
- Do not hide business logic in vague utility files.
- If logic belongs to a feature, keep it in that feature’s `utils/`.

CONSTANTS / CONFIG
- Move repeated labels, options, static config, and mappings into constants files.
- Avoid hardcoding repeated option arrays or display config in many components.

STATE MANAGEMENT
- Keep state close to where it is used, but not trapped in giant page files.
- Local UI state stays local.
- Shared feature state can move into hooks/context/store only when truly needed.
- Do not over-engineer global state for simple local behavior.

DATA FLOW
- Keep data flow predictable:
  - page assembles feature
  - feature hook/service gets data
  - components render data
- Avoid mixing fetching, formatting, mutation, and rendering all in one component.

ERROR / LOADING / EMPTY STATES
- Every data-driven page or section should handle:
  - loading state
  - error state
  - empty state
- Keep these states clean and intentional, not ad hoc in every file.

REUSABILITY RULES
- Extract a component only when it improves clarity or reuse.
- Do not over-fragment simple UI.
- Do not keep duplicated UI blocks in multiple pages if they represent the same thing.

NAMING RULES
- Use clear names that describe purpose.
- Prefer names like:
  - `AddressForm`
  - `AddressList`
  - `AccountSidebar`
  - `ProfileHeader`
  - `useAddressForm`
  - `accountService`
- Avoid vague names like:
  - `Helper`
  - `BoxThing`
  - `DataManager`

CLEANUP RULES
- Remove dead code, unused imports, commented-out code, and unnecessary wrappers.
- Simplify overcomplicated JSX where possible.
- Keep files focused and readable.
- Do not change unrelated behavior.

TESTABILITY RULES
- Keep logic in places that are easy to test:
  - helpers in utils
  - request logic in services
  - stateful logic in hooks
  - UI in components
- Do not bury important logic inside giant JSX trees.

NEXT.JS RULES
- Preserve App Router conventions if the project uses them.
- Keep server/client boundaries clean.
- Only use `"use client"` where needed.
- Do not turn everything into client components unnecessarily.
- If data can stay server-side cleanly, prefer that.
- If interactive behavior is needed, isolate it into client components.

IMPLEMENTATION RULES
- Refactor directly in the codebase.
- Keep the existing stack and style unless I explicitly ask to change them.
- Preserve working behavior unless there is a bug or structural issue.
- Fix inconsistent naming, bad separation, duplicated fetch logic, oversized page files, or reusable UI that is still trapped inside pages.
- Use `apply_patch` for edits.

What I want back:
1. Refactor the frontend directly
2. Explain the final structure
3. Tell me which files were added or changed
4. Tell me how to keep adding new pages/features in the same pattern
5. Run tests/build/lint if available and summarize the result

Review my frontend project for duplication and refactor safely.

Goals:
1. Find duplicate components, duplicate pages, duplicate hooks, duplicate utilities, duplicate validation logic, duplicate API wrappers, duplicate styling, and duplicate old-vs-new frontend layers.
2. Remove duplication only when it is clearly safe.
3. Keep the frontend fully operational after cleanup.
4. Preserve current behavior and UI unless a bug is obvious.
5. Do not remove active routes, active components, or newly adopted architecture by mistake.
6. Run tests/build/lint after every meaningful cleanup phase and summarize results.
7. Use apply_patch for edits.

Safety rules:
1. First inspect the frontend structure and map:
   - app/pages/routes
   - components
   - hooks
   - services/api
   - utils/helpers
   - styles
   - validation
   - tests
2. Before deleting anything, search for all references to the target file/function/component/hook.
3. Only delete files when they are confirmed unused or fully replaced by the newer layer.
4. If there are “old” and “new” implementations side by side:
   - keep the active one
   - remove only the inactive one
5. If compatibility wrapper files exist:
   - update imports to point to the real canonical module first
   - then delete the wrapper only if no imports depend on it
6. If duplicate logic exists across multiple components:
   - extract one shared helper/hook/component only if it reduces duplication safely
   - update imports
   - run tests/build
7. Never remove route files just because they look similar.
   - confirm whether they are active and connected to the router/app structure first
8. Never remove anything unrelated to duplication cleanup.
9. If something looks risky or ambiguous, stop and explain instead of guessing.

Frontend duplication to look for:
1. Duplicate UI components with the same behavior but different names
2. Duplicate form logic that should be a shared hook or form component
3. Duplicate fetch/api logic that should be a shared service function
4. Duplicate loading/error/empty-state UI
5. Duplicate validation schemas or input normalization
6. Duplicate style blocks, utility classes, or repeated layout wrappers
7. Duplicate auth guards / route protection logic
8. Duplicate state-handling logic across pages/components
9. Old component folders and new component folders both existing at once
10. Unused components, hooks, or utility files

How to work:
1. Inspect the codebase first.
2. List duplication findings grouped by:
   - safe duplicate files
   - safe duplicate components/hooks/helpers
   - possible risky duplication
3. Start with the safest removals first.
4. After each cleanup phase:
   - verify imports
   - run tests/build/lint
   - report what still works
5. Continue until the obvious safe duplication is removed.

Output format I want:
1. What duplication you found
2. What you removed
3. What you kept and why
4. Which files changed
5. Test/build/lint results
6. Any remaining duplication that was intentionally left because it was risky

Important project-specific instruction:
- Keep all newly written canonical files.
- Remove only the old duplicated layer after confirming it is unused.
- Be especially careful with:
  - app router / pages router files
  - layout wrappers
  - shared form components
  - auth guards
  - API utility layers
  - old and new component folders existing together

Definition of “safe to remove”:
- no active imports remain
- tests/build/lint still pass
- behavior stays the same
- routing still works
- visible UI is not accidentally broken

