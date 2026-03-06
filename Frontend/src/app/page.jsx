// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import HomePage from "./page/HomePage.jsx";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const homeTitle = "Modern fashion, watches, and accessories";
const homeDescription =
  "Discover curated clothing, statement watches, and everyday accessories from Velora's latest collections.";

export const metadata = buildPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          title: homeTitle,
          description: homeDescription,
          path: "/",
        })}
      />
      <HomePage />
    </>
  );
}


