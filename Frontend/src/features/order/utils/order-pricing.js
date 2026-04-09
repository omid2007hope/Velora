export const SHIPPING_FEE = 5;
export const TAX_AMOUNT = 8.32;

export function calculateOrderPricing(items = []) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.newPrice ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);

  const shipping = items.length ? SHIPPING_FEE : 0;
  const tax = items.length ? TAX_AMOUNT : 0;
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
}
