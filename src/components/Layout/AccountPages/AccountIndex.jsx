import { useState } from "react";
import Account from "./Account";
import { UserIcon } from "lucide-react";
import SignOutForm from "./SignOutForm";

function AccountIndex() {
  const loadYourUser = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-orange-50 flex">
        <aside className="fixed w-64 h-screen bg-orange-50 hidden md:flex flex-col border-r-1 border-amber-950 shadow-md shadow-amber-950 ">
          <div className="flex flex-col items-center py-6 rounded-md border-amber-950">
            <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center border-1 border-amber-950 ">
              <UserIcon className="h-8 w-8 text-amber-950 " />
            </div>
            <h2 className="mt-2 font-semibold text-amber-950">
              {loadYourUser?.fullName}
            </h2>
          </div>
          <nav className="flex-1 px-4 space-y-2 \">
            {["Personal Information", "Addresses", "Payment Methods"].map(
              (item) => (
                <button
                  key={item}
                  className={`w-full text-left px-3 py-2 rounded-md text-amber-950 hover:text-white hover:bg-amber-950 transition border-b-2 border-l-2 mt-2.5 border-amber-950 shadow-md shadow-amber-950 ${
                    item === "Personal Information"
                      ? "bg-amber-950 text-white font-semibold"
                      : ""
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </nav>
          <div className="px-4 py-4">
            <button
              onClick={() => setOpen(true)}
              className="w-full text-left text-red-500 font-bold hover:text-red-500/50 active:text-red-500"
            >
              Sign Out
            </button>
          </div>
        </aside>
        <div className="w-full h-full flex flex-col justify-center items-center ml-0 md:ml-60 lg:ml-60">
          <Account />
          <SignOutForm open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}

export default AccountIndex;
