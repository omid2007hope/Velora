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
