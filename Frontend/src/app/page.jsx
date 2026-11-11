/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import HomePage from "@/app/features/home/HomePage";
import JsonLd from "@/app/components/seo/JsonLd";
import { buildPageMetadata, buildWebPageSchema } from "@/app/lib/seo";

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
