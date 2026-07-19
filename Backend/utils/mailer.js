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
