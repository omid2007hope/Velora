// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const nodemailer = require("nodemailer");

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  SMTP_SECURE,
  NODE_ENV,
} = process.env;

const hasSmtpConfig = SMTP_HOST && SMTP_PORT;

// Fallback transport that just logs messages to the console. Useful for local
// development and automated tests when no SMTP server is configured.
const fallbackTransport = nodemailer.createTransport({
  streamTransport: true,
  newline: "unix",
  buffer: true,
});

const transport = hasSmtpConfig
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true", // true for 465, false for others
      auth:
        SMTP_USER && SMTP_PASS
          ? {
              user: SMTP_USER,
              pass: SMTP_PASS,
            }
          : undefined,
    })
  : fallbackTransport;

async function sendEmail({ to, subject, text, html }) {
  const from = SMTP_FROM || "no-reply@velora.local";

  const info = await transport.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  // When using the fallback transport, surface the email contents to the logs
  // for easy inspection in dev/test.
  if (!hasSmtpConfig || NODE_ENV === "test") {
    console.log("[mail debug]", info.message?.toString?.() || info);
  }

  return info;
}

module.exports = {
  sendEmail,
};
