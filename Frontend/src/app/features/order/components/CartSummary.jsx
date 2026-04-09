export default function CartSummary({ pricing, title = "Order Summary" }) {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold text-amber-950">{title}</h2>

      <dl className="space-y-3">
        <div className="flex justify-between">
          <dt className="text-sm text-amber-800">Subtotal</dt>
          <dd className="text-sm font-medium text-amber-950">
            ${pricing.subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-sm text-amber-800">Shipping</dt>
          <dd className="text-sm font-medium text-amber-950">
            ${pricing.shipping.toFixed(2)}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-sm text-amber-800">Tax</dt>
          <dd className="text-sm font-medium text-amber-950">
            ${pricing.tax.toFixed(2)}
          </dd>
        </div>

        <div className="mt-4 flex justify-between border-t border-amber-900 pt-4">
          <dt className="text-base font-semibold text-amber-950">Order total</dt>
          <dd className="text-base font-semibold text-amber-950">
            ${pricing.total.toFixed(2)}
          </dd>
        </div>
      </dl>
    </>
  );
}
