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

import { buildNoIndexMetadata } from "@/app/lib/seo";
import AccountAccessGuard from "@/app/components/account/AccountAccessGuard";

export const metadata = buildNoIndexMetadata({
  title: "My Account – Profile & Settings",
  description:
    "Manage your Velora account profile, shipping addresses, and payment details. Keep your personal information up to date for a faster checkout experience.",
  path: "/account",
});

export default function AccountLayout({ children }) {
  return <AccountAccessGuard>{children}</AccountAccessGuard>;
}
