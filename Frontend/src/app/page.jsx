// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import HomePage from "@/features/home/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const homeTitle = "Modern fashion, watches, and accessories";
const homeDescription =
  "Shop curated clothing, statement watches, and everyday accessories at Velora, with refined essentials, new arrivals, and fast checkout for modern wardrobes.";

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


