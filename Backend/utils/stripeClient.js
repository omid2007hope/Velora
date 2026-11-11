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

// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const crypto = require("crypto");
const Stripe = require("stripe");

const secret = process.env.STRIPE_SECRET_KEY;

if (secret) {
  module.exports = Stripe(secret, {
    apiVersion: "2024-11-20",
    typescript: false,
  });
} else {
  // Lightweight mock for local development/tests to avoid real Stripe calls
  module.exports = {
    paymentIntents: {
      create: async ({ amount, currency, metadata }) => ({
        id: `pi_mock_${crypto.randomBytes(6).toString("hex")}`,
        client_secret: `pi_mock_secret_${crypto.randomBytes(6).toString("hex")}`,
        status: "requires_payment_method",
        amount,
        currency,
        metadata,
      }),
      retrieve: async (id) => ({
        id,
        status: "requires_payment_method",
      }),
    },
    paymentMethods: {
      retrieve: async (id) => ({
        id,
        type: "card",
        card: {
          brand: "visa",
          last4: "4242",
          exp_month: 12,
          exp_year: 2030,
        },
        billing_details: {
          name: "Test User",
        },
      }),
    },
    webhooks: {
      constructEvent: () => {
        throw new Error("Webhook signature validation unavailable without key");
      },
    },
  };
}
