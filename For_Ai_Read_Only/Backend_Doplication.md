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
