export const AUTH_VIEW = {
  CUSTOMER: "customer",
  SELLER: "seller",
};

export function getAuthPopupEvent(authView = AUTH_VIEW.CUSTOMER) {
  return authView === AUTH_VIEW.SELLER
    ? "open-sellerPanel-popup"
    : "open-login-popup";
}

export function openAuthPopup(authView = AUTH_VIEW.CUSTOMER) {
  document.dispatchEvent(new CustomEvent(getAuthPopupEvent(authView)));
}
