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
