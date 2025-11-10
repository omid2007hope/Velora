import SideBarLayOut from "./Layout";

function AccountForm() {
  return <div className="min-h-screen bg-orange-50 flex">kir </div>;
}

// ✅ Give the wrapped component a name before export
const WrappedPaymentForm = SideBarLayOut(AccountForm);

export default WrappedPaymentForm;
