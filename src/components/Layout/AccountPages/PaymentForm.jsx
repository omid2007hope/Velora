import SideBarLayOut from "./Layout";

function PaymentForm() {
  return <div className="min-h-screen bg-orange-50 flex">kir</div>;
}

// ✅ Give the wrapped component a name before export
const WrappedPaymentForm = SideBarLayOut(PaymentForm);

export default WrappedPaymentForm;
