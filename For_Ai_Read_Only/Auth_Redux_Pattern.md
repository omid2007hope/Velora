# Auth & Popup State — Redux Pattern

This file is an instruction reference for AI and developers.
Read this before touching anything related to auth state, popup visibility, or the seller/customer session.

---

## The Rule in One Sentence

All auth state (who is signed in) and all popup visibility (which dialog is open)
live in Redux under `state.auth`. Never use DOM events, window events, or localStorage
subscriptions for these purposes.

---

## Where Everything Lives

| Thing                  | Location                                                                      |
| ---------------------- | ----------------------------------------------------------------------------- |
| Redux slice            | `src/app/redux/slice/authSlice.js`                                            |
| Redux store            | `src/app/redux/store/index.js`                                                |
| Seller session hook    | `src/app/features/seller/hooks/use-seller-session.js`                         |
| localStorage helpers   | `src/app/lib/browser-storage.js`                                              |
| Auth view constants    | `src/app/features/auth/utils/auth-popup-events.js` (exports `AUTH_VIEW` only) |
| Behavior documentation | `EVENT-BEHAVIOR-README.md`                                                    |

---

## `state.auth` Shape

```js
{
  user: null | object,          // signed-in customer
  storeOwner: null | object,    // signed-in seller
  hydrated: false | true,       // true after first client-side localStorage read
  loginPopupOpen: false | true, // customer login dialog
  sellerPopupOpen: false | true // seller login dialog
}
```

---

## Available Actions — import from `authSlice.js`

```js
import {
  hydrateAuth, // call once on mount with { user, storeOwner }
  setUser, // setUser(userObject) or setUser(null)
  setStoreOwner, // setStoreOwner(ownerObject) or setStoreOwner(null)
  clearAuth, // clears both user and storeOwner
  openLoginPopup, // opens customer login dialog
  closeLoginPopup, // closes customer login dialog
  openSellerPopup, // opens seller login dialog
  closeSellerPopup, // closes seller login dialog
} from "@/app/redux/slice/authSlice";
```

---

## Common Patterns

### Open a popup

```js
const dispatch = useDispatch();

dispatch(openLoginPopup()); // customer
dispatch(openSellerPopup()); // seller
```

### Read auth in a component

```js
const user = useSelector((state) => state.auth.user);
const storeOwner = useSelector((state) => state.auth.storeOwner);
```

### Seller route guard hook

```js
const { storeOwner, hasHydrated } = useSellerSession();
// hasHydrated = state.auth.hydrated
// storeOwner  = state.auth.storeOwner
```

### After a successful login (customer example)

```js
// 1. Remove opposite role from both places
window.localStorage.removeItem("storeOwner");
dispatch(setStoreOwner(null));

// 2. Persist the new session
saveAuthSession({ user, token, refreshToken });

// 3. Update Redux
dispatch(setUser(user));

// 4. Close the popup
dispatch(closeLoginPopup());

// 5. Navigate
router.push("/account");
```

### After sign-out

```js
clearAuthSession(); // removes everything from localStorage
dispatch(clearAuth()); // clears user and storeOwner in Redux
```

### Hydration (Header.jsx, runs once on mount)

```js
useEffect(() => {
  dispatch(
    hydrateAuth({
      user: getStoredUser(),
      storeOwner: getStoredStoreOwner(),
    }),
  );
}, [dispatch]);
```

### Open popup based on `authView` (reset/verify pages)

```js
dispatch(authView === AUTH_VIEW.SELLER ? openSellerPopup() : openLoginPopup());
```

---

## What Is Forbidden

Never write any of the following. They are from the old event-based system and have been removed.

```js
// ❌ FORBIDDEN
document.dispatchEvent(new CustomEvent("open-login-popup"));
document.dispatchEvent(new CustomEvent("open-sellerPanel-popup"));
window.dispatchEvent(new Event("user-updated"));
window.dispatchEvent(new Event("storeOwner-updated"));
document.addEventListener("open-login-popup", handler);
subscribeToStorageChanges(callback); // for auth reactivity
openAuthPopup(authView); // function no longer exists
getAuthPopupEvent(authView); // function no longer exists
```

---

## Adding a New Component That Needs Auth State

1. Import `useSelector` from `react-redux`
2. Read `state.auth.user` or `state.auth.storeOwner`
3. If you need to open a login popup, import `useDispatch` and dispatch `openLoginPopup()` or `openSellerPopup()`
4. Do not pass auth state down as props through many layers — read it from Redux directly

---

## Adding a New Popup That Should Open From Anywhere

1. Add `somePopupOpen: false` to the `authSlice` initial state
2. Add `openSomePopup` and `closeSomePopup` reducers
3. Export the actions
4. The popup component reads its open state from `useSelector`
5. Callers dispatch `openSomePopup()` directly — no events needed

---

## Role Switch Rules

When the customer signs in, the seller session must be cleared.
When the seller signs in, the customer session must be cleared.

Always do both:

- `window.localStorage.removeItem("storeOwner")` or `"user"`
- `dispatch(setStoreOwner(null))` or `dispatch(setUser(null))`

Never clear one without the other.
