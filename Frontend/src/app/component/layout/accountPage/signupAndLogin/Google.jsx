/* global google */
"use client";

import { useEffect, useRef, useState } from "react";

export default function GoogleSignIn({ onLogin }) {
  const btnRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.google) {
      setIsReady(false);
      return;
    }

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCallback,
    });

    if (btnRef.current) {
      google.accounts.id.renderButton(btnRef.current, {
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        width: "100%",
      });
      setIsReady(true);
    }
  }, []);

  function handleCallback(response) {
    onLogin(response.credential);
  }

  return isReady ? (
    <div ref={btnRef} id="google-signin-btn" className="w-full mt-4"></div>
  ) : (
    <button
      type="button"
      disabled
      className="w-full mt-4 rounded-full bg-gray-300 text-gray-600 py-3 text-lg font-semibold cursor-not-allowed"
    >
      Google Sign-In unavailable
    </button>
  );
}
