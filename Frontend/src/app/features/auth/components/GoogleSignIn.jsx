// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
 */

/* global google */
"use client";

import { useEffect, useRef, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const loadGoogleScript = (callback) => {
  const existingScript = document.getElementById("google-gsi-script");

  if (window.google) {
    callback();
    return null;
  }

  if (existingScript) {
    existingScript.addEventListener("load", callback, { once: true });
    return existingScript;
  }

  const script = document.createElement("script");
  script.id = "google-gsi-script";
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  script.addEventListener("load", callback, { once: true });
  document.head.appendChild(script);

  return script;
};

export default function GoogleSignIn({ onLogin }) {
  const buttonRef = useRef(null);
  const onLoginRef = useRef(onLogin);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onLoginRef.current = onLogin;
  }, [onLogin]);

  function handleCallback(response) {
    if (!response?.credential) {
      console.error("Google login failed");
      return;
    }

    onLoginRef.current(response.credential);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) return;
      if (!CLIENT_ID) {
        console.error("Google Client ID missing");
        return;
      }
      if (buttonRef.current.childElementCount > 0) {
        setIsReady(true);
        return;
      }

      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallback,
      });

      google.accounts.id.renderButton(buttonRef.current, {
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        width: "100%",
      });
      setIsReady(true);
    };

    const script = loadGoogleScript(initializeGoogle);

    return () => {
      if (script) script.removeEventListener("load", initializeGoogle);
    };
  }, []);

  return (
    <div className="mt-4 w-full">
      <div
        ref={buttonRef}
        id="google-signin-btn"
        aria-busy={!isReady}
        className={isReady ? "" : "hidden"}
      />

      {!isReady ? (
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-full bg-gray-300 py-3 text-lg font-semibold text-gray-600"
        >
          Loading Google Sign-In...
        </button>
      ) : null}
    </div>
  );
}
