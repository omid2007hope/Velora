import { absoluteUrl, getSiteUrl } from "@/app/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account",
          "/account/",
          "/order",
          "/order/",
          "/reset-password",
          "/reset-password/",
          "/verify-email",
          "/verify-email/",
          "/api/",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
