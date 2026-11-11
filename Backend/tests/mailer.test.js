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

jest.mock("@emailjs/nodejs", () => ({
  send: jest.fn(),
}));

jest.mock("../config/env", () => ({
  getEnvConfig: jest.fn(),
}));

const emailjs = require("@emailjs/nodejs");
const { getEnvConfig } = require("../config/env");
const { sendEmail } = require("../utils/mailer");

describe("sendEmail", () => {
  beforeEach(() => {
    getEnvConfig.mockReturnValue({
      isTest: true,
      emailjs: {
        serviceId: "service_test",
        templateId: "template_test",
        publicKey: "public_test",
        privateKey: "private_test",
        fromName: "Velora",
        replyTo: "noreply@example.com",
      },
    });
  });

  test("sends the expected EmailJS payload", async () => {
    emailjs.send.mockResolvedValue({ status: 200, text: "OK" });

    const result = await sendEmail({
      to: "user@example.com",
      subject: "Verify your account",
      text: "Plain text body",
      html: "<p>HTML body</p>",
    });

    expect(emailjs.send).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      expect.objectContaining({
        to_email: "user@example.com",
        subject: "Verify your account",
        text: "Plain text body",
        html: "<p>HTML body</p>",
        from_name: "Velora",
        reply_to: "noreply@example.com",
        is_test: true,
      }),
      expect.objectContaining({
        publicKey: "public_test",
        privateKey: "private_test",
      })
    );
    expect(result).toEqual({ status: 200, text: "OK" });
  });

  test("throws when EmailJS is not configured", async () => {
    getEnvConfig.mockReturnValue({
      isTest: true,
      emailjs: {
        serviceId: "",
        templateId: "template_test",
        publicKey: "public_test",
        privateKey: "private_test",
        fromName: "Velora",
        replyTo: "noreply@example.com",
      },
    });

    await expect(
      sendEmail({
        to: "user@example.com",
        subject: "Missing config",
        text: "Body",
        html: "<p>Body</p>",
      })
    ).rejects.toThrow("EmailJS is not configured");
  });
});
