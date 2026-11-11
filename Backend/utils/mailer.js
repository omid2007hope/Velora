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

const emailjs = require("@emailjs/nodejs");
const { getEnvConfig } = require("../config/env");

async function sendEmail({ to, subject, text, html }) {
  const { emailjs: emailConfig, isTest } = getEnvConfig();

  if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
    throw new Error("EmailJS is not configured");
  }

  return emailjs.send(
    emailConfig.serviceId,
    emailConfig.templateId,
    {
      to_email: to,
      subject,
      text,
      html,
      from_name: emailConfig.fromName,
      reply_to: emailConfig.replyTo,
      is_test: isTest,
    },
    {
      publicKey: emailConfig.publicKey,
      privateKey: emailConfig.privateKey,
    }
  );
}

module.exports = {
  sendEmail,
};
