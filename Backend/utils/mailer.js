const nodemailer = require("nodemailer");
const { getEnvConfig } = require("../config/env");
const logger = require("./logger");

const { smtp, isTest } = getEnvConfig();
const hasSmtpConfig = smtp.host && smtp.port && !isTest;

const fallbackTransport = nodemailer.createTransport({
  streamTransport: true,
  newline: "unix",
  buffer: true,
});

const transport = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port),
      secure: smtp.secure,
      auth:
        smtp.user && smtp.pass
          ? {
              user: smtp.user,
              pass: smtp.pass,
            }
          : undefined,
    })
  : fallbackTransport;

async function sendEmail({ to, subject, text, html }) {
  const info = await transport.sendMail({
    from: smtp.from,
    to,
    subject,
    text,
    html,
  });

  if (!hasSmtpConfig) {
    logger.info("[mail debug]", info.message?.toString?.() || info);
  }

  return info;
}

module.exports = {
  sendEmail,
};
