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
