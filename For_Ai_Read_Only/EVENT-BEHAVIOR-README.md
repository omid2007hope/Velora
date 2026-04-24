# Auth State & Popup Behavior README

This file explains how auth state and popup visibility are managed in the frontend.

## ⚠️ Migration Notice — April 2026

The previous implementation used DOM custom events (`open-login-popup`, `open-sellerPanel-popup`)
and window events (`user-updated`, `storeOwner-updated`) to communicate auth changes between
components. That system has been fully removed.

**All auth state and popup control is now handled through Redux (`state.auth`).**

---

## Purpose

The app keeps customer and seller auth in two separate localStorage entries:

- `user` — for customers
- `storeOwner` — for sellers

Auth state is loaded into Redux once on client mount and is the single source of truth
for all components. localStorage is still used for persistence across page refreshes,
but the UI never reads localStorage directly — it reads from Redux.

---

## Redux Auth Slice — `state.auth`

Location: `src/app/redux/slice/authSlice.js`
Registered in: `src/app/redux/store/index.js` under the key `auth`

### State shape

```js
{
  user: null,          // signed-in customer object, or null
  storeOwner: null,    // signed-in seller object, or null
  hydrated: false,     // true after the first client-side read from localStorage
  loginPopupOpen: false,   // controls customer login dialog visibility
  sellerPopupOpen: false,  // controls seller login dialog visibility
}
```

### Actions

| Action                              | Description                                                         |
| ----------------------------------- | ------------------------------------------------------------------- |
| `hydrateAuth({ user, storeOwner })` | Called once on mount — reads localStorage and sets `hydrated: true` |
| `setUser(user)`                     | Set or clear the current customer                                   |
| `setStoreOwner(storeOwner)`         | Set or clear the current seller                                     |
| `clearAuth()`                       | Clear both `user` and `storeOwner`                                  |
| `openLoginPopup()`                  | Open the customer sign-in dialog                                    |
| `closeLoginPopup()`                 | Close the customer sign-in dialog                                   |
| `openSellerPopup()`                 | Open the seller sign-in dialog                                      |
| `closeSellerPopup()`                | Close the seller sign-in dialog                                     |

---

## Hydration

`Header.jsx` dispatches `hydrateAuth` once inside a `useEffect` on mount:

```js
useEffect(() => {
  dispatch(
    hydrateAuth({
      user: getStoredUser(),
      storeOwner: getStoredStoreOwner(),
    }),
  );
  setHasMounted(true);
}, [dispatch]);
```

After this runs, `state.auth.hydrated` becomes `true`.

Components that need to wait for hydration before rendering (such as `SellerPanelGuard`)
read `state.auth.hydrated` via `useSellerSession()`.

---

## Opening Popups

Any component that needs to open the login or seller popup dispatches an action:

```js
// Customer login
dispatch(openLoginPopup());

// Seller login
dispatch(openSellerPopup());
```

### Where this is called from

| File                                                        | Popup opened                    |
| ----------------------------------------------------------- | ------------------------------- |
| `Header.jsx` — desktop "Sell on Velora" button              | Seller                          |
| `Header.jsx` — mobile "Sell on Velora" button               | Seller                          |
| `Header.jsx` — "Sign in" button                             | Customer                        |
| `Header.jsx` — `?auth=login` query param                    | Customer                        |
| `SellerPanelGuard.jsx` — "Open seller sign in" button       | Seller                          |
| `SignupPopup.jsx` — "Back" / `goBack()`                     | Customer                        |
| `SellerSignupPopup.jsx` — "Back" / `goBack()`               | Seller                          |
| `ResetPasswordPopup.jsx` — "Back to sign in"                | Based on `authView` prop        |
| `EmailVerificationPopup.jsx` — "Sign in now"                | Based on `authView` prop        |
| `verify-email/page.jsx` — after successful verification     | Based on `authView` query param |
| `reset-password/page.jsx` — after successful password reset | Based on `authView` query param |

---

## Closing Popups

`LoginPopup` and `LogIntoSellerPanelPopup` both have zero props.
They read their open state from Redux and dispatch the close action themselves:

```js
// LoginPopup
const open = useSelector((state) => state.auth.loginPopupOpen);
dispatch(closeLoginPopup());

// LogIntoSellerPanelPopup
const open = useSelector((state) => state.auth.sellerPopupOpen);
dispatch(closeSellerPopup());
```

---

## Auth State After Login

After a successful login, the popup component:

1. Clears the opposite role from both localStorage and Redux
2. Saves the session to localStorage via `saveAuthSession`
3. Dispatches `setUser` or `setStoreOwner` to update Redux
4. Dispatches `closeLoginPopup` or `closeSellerPopup`
5. Navigates to `/account` or `/seller`

### Customer login (`LoginPopup`)

```js
window.localStorage.removeItem("storeOwner"); // clear seller from storage
dispatch(setStoreOwner(null)); // clear seller from Redux
saveAuthSession({ user, token, refreshToken });
dispatch(setUser(user));
dispatch(closeLoginPopup());
router.push("/account");
```

### Seller login (`LogIntoSellerPanelPopup`)

```js
window.localStorage.removeItem("user"); // clear customer from storage
dispatch(setUser(null)); // clear customer from Redux
saveAuthSession({ storeOwner, token, refreshToken });
dispatch(setStoreOwner(storeOwner));
dispatch(closeSellerPopup());
router.push("/seller");
```

---

## Reading Auth State in Components

Use `useSelector` directly or use the provided hook:

```js
// Direct
const user = useSelector((state) => state.auth.user);
const storeOwner = useSelector((state) => state.auth.storeOwner);

// Via hook (for seller-specific components)
const { storeOwner, hasHydrated } = useSellerSession();
```

`useSellerSession` is at `src/app/features/seller/hooks/use-seller-session.js`.
It reads `state.auth.storeOwner` and `state.auth.hydrated` from Redux — no localStorage access.

---

## Route and Query Triggers

### `?auth=login`

When `Header.jsx` detects `?auth=login` in the URL it dispatches `openLoginPopup()`
and removes the query param from the URL. No events are used.

Who creates it:

- `AccountAccessGuard` — when someone visits `/account` without a signed-in customer

---

## Connection Map

### Customer Sign-In Flow

1. User clicks "Sign in" → `dispatch(openLoginPopup())`
2. `LoginPopup` opens (reads `state.auth.loginPopupOpen`)
3. User submits credentials
4. Success → seller entry cleared from localStorage + Redux
5. Customer data saved to localStorage and Redux via `dispatch(setUser(...))`
6. Popup closed via `dispatch(closeLoginPopup())`
7. Navigate to `/account`
8. All components reading `state.auth.user` update automatically

### Seller Sign-In Flow

1. User clicks "Sell on Velora" → `dispatch(openSellerPopup())`
2. `LogIntoSellerPanelPopup` opens (reads `state.auth.sellerPopupOpen`)
3. User submits credentials
4. Success → customer entry cleared from localStorage + Redux
5. Seller data saved to localStorage and Redux via `dispatch(setStoreOwner(...))`
6. Popup closed via `dispatch(closeSellerPopup())`
7. Navigate to `/seller`
8. All components reading `state.auth.storeOwner` update automatically

### Sign-Out Flow

1. `clearAuthSession()` removes all keys from localStorage
2. `dispatch(clearAuth())` clears `user` and `storeOwner` from Redux
3. All auth-aware UI returns to signed-out state automatically

### Verify Email / Reset Password Flow

1. User opens email link → `/verify-email?token=...&authView=seller`
2. Page confirms with backend
3. On success → `dispatch(openSellerPopup())` or `dispatch(openLoginPopup())` based on `authView`
4. The popup opens in the Header which is always mounted in the layout

---

## Screen Responsibilities

### Header

- Reads `state.auth.user` and `state.auth.storeOwner` from Redux
- Dispatches `hydrateAuth` once on mount
- Dispatches `openLoginPopup` / `openSellerPopup` from buttons
- Renders `<LoginPopup />` and `<LogIntoSellerPanelPopup />` (no props needed)
- Handles `?auth=login` query param by dispatching `openLoginPopup()`

### LoginPopup / LogIntoSellerPanelPopup

- Zero props — fully self-contained
- Read open state from Redux
- Dispatch Redux actions on close and after login

### SellerPanelGuard

- Reads `state.auth.storeOwner` and `state.auth.hydrated` via `useSellerSession()`
- Shows loading skeleton until `hasHydrated` is `true`
- Dispatches `openSellerPopup()` if no seller is signed in

### AccountAccessGuard

- Reads `state.auth.user` from Redux
- Redirects unsigned-in visitors to `/?auth=login`

---

## What Was Removed

The following are no longer in the codebase and must not be re-introduced:

| Removed                                                             | Replacement                          |
| ------------------------------------------------------------------- | ------------------------------------ |
| `document.dispatchEvent(new CustomEvent("open-login-popup"))`       | `dispatch(openLoginPopup())`         |
| `document.dispatchEvent(new CustomEvent("open-sellerPanel-popup"))` | `dispatch(openSellerPopup())`        |
| `window.dispatchEvent(new Event("user-updated"))`                   | `dispatch(setUser(...))`             |
| `window.dispatchEvent(new Event("storeOwner-updated"))`             | `dispatch(setStoreOwner(...))`       |
| `subscribeToStorageChanges(callback)`                               | `useSelector(state => state.auth.*)` |
| `openAuthPopup(authView)` function                                  | Direct Redux dispatch                |
| `getAuthPopupEvent(authView)` function                              | Not needed                           |
| `document.addEventListener("open-login-popup", ...)`                | Not needed                           |
| `document.addEventListener("open-sellerPanel-popup", ...)`          | Not needed                           |
| `emitUserUpdated()` in `browser-storage.js`                         | Not needed                           |
| `emitStoreOwnerUpdated()` in `browser-storage.js`                   | Not needed                           |

`auth-popup-events.js` now only exports the `AUTH_VIEW` constant.
`browser-storage.js` no longer emits any window events.

---

## Project Rule

Auth state lives in Redux.

- When customer auth changes → `dispatch(setUser(...))` + update localStorage
- When seller auth changes → `dispatch(setStoreOwner(...))` + update localStorage
- When a role switch removes the other role → `dispatch(setUser/setStoreOwner(null))` + `localStorage.removeItem(...)`
- When a popup should open → dispatch the matching open action
- When a component needs auth state → `useSelector(state => state.auth.*)`
- Never listen to DOM events for auth or popup changes
- Never call `openAuthPopup()` — it no longer exists

## Purpose

The app now keeps customer and seller auth in separate local storage entries:

- `user` for customers
- `storeOwner` for sellers

The UI does not only depend on local storage itself. It also depends on events that tell components when they should re-check storage and refresh what is shown on screen.

The current implementation also makes customer and seller auth flows use their own backend endpoints while keeping the frontend auth state synchronized through events.

## Main Event Groups

There are three event groups in this area:

- storage update events
- popup open events
- route and state change triggers

## Storage Update Events

### `user-updated`

What it means:

- the stored customer changed

When it happens:

- after saving a customer as `user`
- after clearing the customer entry during sign-out
- after seller login removes the old customer entry during a role switch

Who reacts to it:

- Header
- AccountShell
- AccountAccessGuard
- any component using `subscribeToStorageChanges`

Visible result:

- customer account UI refreshes
- signed-in customer state is re-read from local storage
- customer-only screens can close or redirect if the customer session was removed

### `storeOwner-updated`

What it means:

- the stored seller changed

When it happens:

- after saving a seller as `storeOwner`
- after clearing the seller entry during sign-out
- after customer login removes the old seller entry during a role switch

Who reacts to it:

- Header
- AccountAccessGuard
- any component using `subscribeToStorageChanges`

Visible result:

- seller-related visibility refreshes
- account page restrictions can update
- seller-only UI does not stay stale after switching back to a customer account

### `storage`

What it means:

- local storage changed in another browser tab or window

When it matters:

- when the changed key is `user`
- when the changed key is `storeOwner`

Who reacts to it:

- `subscribeToStorageChanges`
- then the components using that helper

Visible result:

- another open tab can update its auth UI automatically

## Popup Open Events

### `open-login-popup`

What it means:

- open the customer sign-in popup

Who can send it:

- any part of the app that wants to trigger customer login

Who reacts to it:

- Header
- LoginPopup

Visible result:

- the customer login modal opens

### `open-sellerPanel-popup`

What it means:

- open the seller sign-in popup

Who can send it:

- any part of the app that wants to trigger seller login

Who reacts to it:

- Header
- LogIntoSellerPanelPopup

Visible result:

- the seller login modal opens

## Route and Query Triggers

### `?auth=login`

What it means:

- the page should open the customer login popup after navigation

Who creates it:

- `AccountAccessGuard` when someone visits `/account` without a signed-in customer

Who reacts to it:

- Header

Visible result:

- the app returns to home
- the customer login popup opens automatically

## Connection Map

### Customer Sign-In Flow

1. customer signs in
2. any existing seller entry is removed from local storage
3. `storeOwner-updated` is sent so seller listeners refresh too
4. customer data is saved as `user`
5. `user-updated` is sent
6. Header and account-related UI re-read auth state
7. customer account UI becomes available
8. seller panel should be hidden for that signed-in customer

### Seller Sign-In Flow

1. seller signs in
2. seller login uses the seller endpoint, not the customer endpoint
3. any existing customer entry is removed from local storage
4. `user-updated` is sent so customer listeners refresh too
5. seller data is saved as `storeOwner`
6. `storeOwner-updated` is sent
7. Header and route guard re-read auth state
8. seller state becomes active in the UI
9. customer account page should be hidden or blocked for that seller

### Seller Sign-Up Flow

1. seller signs up
2. seller signup uses the seller register endpoint
3. seller email verification is sent through seller verification routes
4. when the seller opens the verification link, the seller confirmation page uses the seller confirm endpoint

### Password Reset Flow

1. the popup sends a reset request based on auth view
2. customer reset uses customer reset routes
3. seller reset uses seller reset routes
4. when the reset link is opened, the confirmation page uses the matching customer or seller confirm endpoint

### Sign-Out Flow

1. auth session is cleared
2. `user` and `storeOwner` are removed
3. both storage update events are sent
4. auth-aware UI returns to signed-out state

### Cross-Tab Flow

1. auth changes in one browser tab
2. the browser sends `storage` to the other tab
3. the other tab re-reads auth storage
4. the UI updates there too

## Screen Responsibilities

### Header

The Header is responsible for:

- showing or hiding the seller panel entry
- showing or hiding the customer account link
- refreshing its auth state when auth events happen
- opening the login popup when the URL contains `?auth=login`

### AccountShell

The AccountShell is responsible for:

- showing customer account information
- refreshing customer information when customer auth changes

### AccountAccessGuard

The AccountAccessGuard is responsible for:

- checking whether `/account` should render
- allowing the page for a customer
- blocking or redirecting a seller from the customer account area
- redirecting a signed-out visitor away from `/account`
- sending the user to home with `?auth=login` so the login popup opens instead of leaving a blank page

## Important Mental Model

Use this simple rule:

- local storage holds the auth data
- events tell the UI that the auth data changed
- components hear the event and then re-read storage
- role switches must notify both sides if one role is removed and the other role is added

Short version:

- `user-updated` means customer changed
- `storeOwner-updated` means seller changed
- `storage` means another tab changed auth
- `open-login-popup` means open customer login
- `open-sellerPanel-popup` means open seller login
- `?auth=login` means return home and open the customer login popup

## Project Rule

Whenever customer auth changes, the customer update path must stay in sync.

Whenever seller auth changes, the seller update path must stay in sync.

Whenever a role switch removes the other role from storage, the matching update event must also be sent.

The goal is simple:

- storage changes
- the correct event is fired
- the correct UI updates
- the correct customer or seller backend route is used
