const USER_STORAGE_EVENT = "user-updated";
const USER_KEY = "user";
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

function emitUserUpdated() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(USER_STORAGE_EVENT));
  }
}

export function getStoredUser() {
  if (!isBrowser()) {
    return null;
  }

  return parseJson(window.localStorage.getItem(USER_KEY), null);
}

export function saveStoredUser(user) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  emitUserUpdated();
}

export function getAccessToken() {
  if (!isBrowser()) {
    return "";
  }

  return window.localStorage.getItem(TOKEN_KEY) || "";
}

export function saveAuthSession({ user, token, refreshToken }) {
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

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  emitUserUpdated();
}

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  emitUserUpdated();
}

export function subscribeToStoredUser(callback) {
  if (!isBrowser()) {
    return () => {};
  }

  window.addEventListener("storage", callback);
  window.addEventListener(USER_STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(USER_STORAGE_EVENT, callback);
  };
}

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
