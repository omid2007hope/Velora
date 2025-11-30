import Account from "../components/Layout/AccountPages/Account";
import { Seo } from "../utils/seo";

function AccountPage() {
  return (
    <>
      <Seo
        title="Account | Velora"
        description="Manage your Velora profile, addresses, and payment methods. Developed by Omid Teimory."
        robots="noindex,nofollow"
      />
      <Account />
    </>
  );
}

export default AccountPage;
