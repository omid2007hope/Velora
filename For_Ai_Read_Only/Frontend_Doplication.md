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
