/* global google */
import { useEffect } from "react";

export default function GoogleSignIn({ onLogin }) {
  useEffect(() => {
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallback,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      {
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        width: "100%",
      }
    );
  }, []);

  function handleCallback(response) {
    onLogin(response.credential);
  }

  return <div id="google-signin-btn" className="w-full mt-4"></div>;
}
