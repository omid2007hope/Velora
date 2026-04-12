// ! Update Storage
const USER_STORAGE_EVENT = "user-updated";
const STOREOWNER_STORAGE_EVENT = "storeOwner-updated";

// ! Data
const USER_KEY = "user";
const STOREOWNER_KEY = "storeOwner";

// ! Auth
const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const ADDRESS_KEY = "savedAddress";
const BASKET_KEY = "BasketItems";
const PAYMENT_DRAFT_KEY = "savedPayment";

function isBrowser() {
  return typeof window !== "undefined";
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// !!! Store Owner LocalStorages

// ! Update Store Owner
function emitStoreOwnerUpdated() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(STOREOWNER_STORAGE_EVENT));
  }
}

// ! Save Store Owner
export function saveStoredStoreOwner(storeOwner) {
  if (!isBrowser()) {
    return null;
  }

  // ! save the storeOwner as STOREOWNER_KEY in  LocalStorage

  window.localStorage.setItem(STOREOWNER_KEY, JSON.stringify(storeOwner));
  emitStoreOwnerUpdated();
}

// ! Get Store Owner
export function getStoredStoreOwner() {
  if (!isBrowser()) {
    return null;
  }

  return parseJson(window.localStorage.getItem(STOREOWNER_KEY), null);
}

// !!! User LocalStorages

// ! Get User

export function getStoredUser() {
  if (!isBrowser()) {
    return null;
  }

  return parseJson(window.localStorage.getItem(USER_KEY), null);
}

// ! Save User

export function saveStoredUser(user) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  emitUserUpdated();
}

// ! Update User

function emitUserUpdated() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(USER_STORAGE_EVENT));
  }
}

// ! Global Get Token

export function getAccessToken() {
  if (!isBrowser()) {
    return "";
  }

  return window.localStorage.getItem(TOKEN_KEY) || "";
}

export function saveAuthSession({ storeOwner, user, token, refreshToken }) {
  if (!isBrowser()) {
    return;
  }

  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  if (storeOwner !== undefined) {
    window.localStorage.setItem(STOREOWNER_KEY, JSON.stringify(storeOwner));
    emitStoreOwnerUpdated();
  }

  if (user !== undefined) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    emitUserUpdated();
  }
}

// ! Global Clear Auth Sassion

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);

  window.localStorage.removeItem(STOREOWNER_KEY);
  emitStoreOwnerUpdated();

  window.localStorage.removeItem(USER_KEY);
  emitUserUpdated();
}

// !

export function subscribeToStorageChanges(callback) {
  if (!isBrowser()) {
    return () => {};
  }

  const events = ["storage", USER_STORAGE_EVENT, STOREOWNER_STORAGE_EVENT];

  const handler = (e) => {
    if (e.type === "storage") {
      if (e.key !== USER_KEY && e.key !== STOREOWNER_KEY) {
        return;
      }
    }

    callback(e);
  };

  events.forEach((event) => {
    window.addEventListener(event, handler);
  });

  return () => {
    events.forEach((event) => {
      window.removeEventListener(event, handler);
    });
  };
}

// ! user only

export function getSavedAddress() {
  if (!isBrowser()) {
    return {};
  }

  return parseJson(window.localStorage.getItem(ADDRESS_KEY), {});
}

export function saveSavedAddress(address) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
}

export function clearSavedPaymentDraft() {
  if (isBrowser()) {
    window.localStorage.removeItem(PAYMENT_DRAFT_KEY);
  }
}

export function getStoredBasket() {
  if (!isBrowser()) {
    return [];
  }

  return parseJson(window.localStorage.getItem(BASKET_KEY), []);
}

export function saveStoredBasket(items) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(BASKET_KEY, JSON.stringify(items));
}
