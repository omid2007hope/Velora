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

// ! Save Store Owner
export function saveStoredStoreOwner(storeOwner) {
  if (!isBrowser()) {
    return null;
  }

  window.localStorage.setItem(STOREOWNER_KEY, JSON.stringify(storeOwner));
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
  }

  if (user !== undefined) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

// ! Global Clear Auth Session

export function clearAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(STOREOWNER_KEY);
  window.localStorage.removeItem(USER_KEY);
}

// !

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
