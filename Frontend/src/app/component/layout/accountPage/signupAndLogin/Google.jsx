// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
/* global google */
"use client";

import { useEffect, useRef, useState } from "react";

export default function GoogleSignIn({ onLogin }) {
  const btnRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function initializeGoogle() {
      if (!window.google || !btnRef.current) return;

      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCallback,
      });

      google.accounts.id.renderButton(btnRef.current, {
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        width: "100%",
      });
      setIsReady(true);
    }

    const existingScript = document.getElementById("google-gsi-script");

    if (window.google) {
      initializeGoogle();
    } else if (existingScript) {
      existingScript.addEventListener("load", initializeGoogle, {
        once: true,
      });
    } else {
      const script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", initializeGoogle, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById("google-gsi-script");
      if (script) script.removeEventListener("load", initializeGoogle);
    };
  }, []);

  function handleCallback(response) {
    onLogin(response.credential);
  }

  return (
    <div className="w-full mt-4">
      <div
        ref={btnRef}
        id="google-signin-btn"
        className={isReady ? "" : "hidden"}
      ></div>

      {!isReady && (
        <button
          type="button"
          disabled
          className="w-full rounded-full bg-gray-300 text-gray-600 py-3 text-lg font-semibold cursor-not-allowed"
        >
          Google Sign-In unavailable
        </button>
      )}
    </div>
  );
}


