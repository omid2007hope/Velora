import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import * as CustomerApi from "../../../API/Customer";

export default function LoginPopup(props) {
  const [code, setCode] = useState("");

  async function Login() {
    const sendBody = { email: props.email, verifyCode: code };

    const { data, status } = await CustomerApi.Login(sendBody);

    // console.log(data, status);

    if (status === 200) {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", JSON.stringify(data.data.token));

      props.setUser(data.data);
      props.setOpen(false);
    }

    // if (!data || !data[0]) {
    //   return;
    // }

    // const User = data[0];
  }

  return (
    <div className="flex flex-col px-8 py-10">
      {/* Header */}
      <div className="mx-auto text-center">
        <h2 className="text-2xl font-bold tracking-tight text-amber-950">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-amber-700">
          Sign in to continue shopping
        </p>
      </div>

      {/* Form */}
      <form action="#" method="POST" className="mt-8 space-y-5">
        {/* Email */}
        <input
          value={props.email}
          disabled
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          required
          autoComplete="email"
          className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950/50 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
        />

        {/* Password */}
        <div>
          <input
            onChange={(e) => setCode(e.target.value.trim())}
            id="code"
            name="code"
            type="text"
            placeholder="code"
            required
            autoComplete="current-code"
            className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* Button */}
        <button
          onClick={Login}
          type="button"
          className="w-full rounded-full bg-amber-950 px-6 py-3 text-lg font-semibold text-white hover:bg-amber-900 transition"
        >
          Sign in
        </button>
        <button
          onClick={() => props.setStep(1)}
          type="button"
          className="w-full rounded-full bg-amber-950 px-6 py-3 text-lg font-semibold text-white hover:bg-amber-900 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}
