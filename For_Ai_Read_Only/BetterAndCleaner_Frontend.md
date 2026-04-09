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
