import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import * as UserApi from "../../../API/User";

export default function LoginPopup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    const { data } = await UserApi.LoginFun(email, password);

    // console.log(data);

    if (!data || !data[0]) {
      return;
    }

    const User = data[0];

    localStorage.setItem("user", JSON.stringify(User));
    props.setUser(User);
    props.setOpen(false);
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
          onChange={(e) => setEmail(e.target.value.trim())}
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          required
          autoComplete="email"
          className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
        />

        {/* Password */}
        <div>
          <input
            onChange={(e) => setPassword(e.target.value.trim())}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="block w-full rounded-lg border border-amber-950 bg-white px-4 py-3 text-amber-950 placeholder:text-amber-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-600"
          />
          <div className="mt-2 flex justify-end">
            <a
              href="#"
              className="text-sm font-medium text-amber-700 hover:text-amber-900"
            >
              Forgot password?
            </a>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={Login}
          type="button"
          className="w-full rounded-full bg-amber-950 px-6 py-3 text-lg font-semibold text-white hover:bg-amber-900 transition"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
