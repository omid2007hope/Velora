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
