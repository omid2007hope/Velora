const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Customer = require("../model/Register");
const { sendEmail } = require("../utils/mailer");
const { getEnvConfig } = require("../config/env");

const SALT_ROUNDS = 12;

function generateToken(hoursValid = 24) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
  return { token, expires };
}

async function registerCustomer({ email, fullName, password }) {
  const normalizedCustomer = {
    email: email.trim().toLowerCase(),
    fullName: fullName.trim(),
    password: await bcrypt.hash(password, SALT_ROUNDS),
  };

  const existingCustomer = await Customer.findOne({
    email: normalizedCustomer.email,
  }).lean();

  if (existingCustomer) {
    return {
      source: "database",
      existed: true,
      data: {
        _id: existingCustomer._id,
        email: existingCustomer.email,
        fullName: existingCustomer.fullName,
        isEmailVerified: !!existingCustomer.isEmailVerified,
      },
    };
  }

  const savedCustomer = await new Customer(normalizedCustomer).save();
  let emailVerificationToken;

  try {
    const { token, expires } = generateToken(24);

    await Customer.findOneAndUpdate(
      { _id: savedCustomer._id },
      {
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      },
      { returnDocument: "after" },
    );

    const { primaryClientUrl } = getEnvConfig();
    const verificationLink = `${primaryClientUrl.replace(/\/$/, "")}/verify-email?token=${token}`;

    await sendEmail({
      to: savedCustomer.email,
      subject: "Verify your Velora account",
      text: `Welcome to Velora! Confirm your email by visiting: ${verificationLink}`,
      html: `<p>Welcome to Velora!</p><p>Please confirm your email by clicking the link below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
    });

    emailVerificationToken =
      process.env.NODE_ENV === "production" ? undefined : token;
  } catch (_error) {
    emailVerificationToken = undefined;
  }

  return {
    source: "created",
    existed: false,
    data: {
      _id: savedCustomer._id,
      email: savedCustomer.email,
      fullName: savedCustomer.fullName,
      isEmailVerified: !!savedCustomer.isEmailVerified,
    },
    emailVerificationToken,
  };
}

async function loginCustomer({ email, password }) {
  const customer = await Customer.findOne({
    email: email.trim().toLowerCase(),
  })
    .select("+password")
    .lean();

  if (!customer) {
    return { authenticated: false };
  }

  const isPasswordValid = await bcrypt.compare(password, customer.password);

  if (!isPasswordValid) {
    return { authenticated: false };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const tokenPayload = {
    sub: customer._id.toString(),
    email: customer.email,
  };

  return {
    authenticated: true,
    data: {
      _id: customer._id,
      email: customer.email,
      fullName: customer.fullName,
      isEmailVerified: !!customer.isEmailVerified,
    },
    token: jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "15m" }),
    refreshToken: jwt.sign(
      tokenPayload,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: "7d" },
    ),
  };
}

async function refreshAccessToken(refreshToken) {
  const payload = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
  );

  return jwt.sign(
    {
      sub: payload.sub,
      email: payload.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );
}

async function requestEmailVerification(email) {
  const customer = await Customer.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!customer) {
    return { ok: true, status: "noop" };
  }

  if (customer.isEmailVerified) {
    return { ok: true, status: "already-verified" };
  }

  const { token, expires } = generateToken(24);

  await Customer.findOneAndUpdate(
    { _id: customer._id },
    {
      emailVerificationToken: token,
      emailVerificationExpires: expires,
    },
    { returnDocument: "after" },
  );

  const clientUrl =
    process.env.CLIENT_URL?.split(",")?.[0]?.trim() || "http://localhost:3000";
  const verificationLink = `${clientUrl.replace(/\/$/, "")}/verify-email?token=${token}`;

  await sendEmail({
    to: customer.email,
    subject: "Verify your Velora account",
    text: `Confirm your Velora account by visiting: ${verificationLink}`,
    html: `<p>Confirm your Velora account by clicking below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
  });

  return {
    ok: true,
    status: "sent",
    email: customer.email,
    token: process.env.NODE_ENV === "production" ? undefined : token,
  };
}

async function confirmEmailVerification(token) {
  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const customer = await Customer.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() },
  });

  if (!customer) {
    return { ok: false, reason: "invalid-or-expired" };
  }

  await Customer.findOneAndUpdate(
    { _id: customer._id },
    {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    },
    { returnDocument: "after" },
  );

  return { ok: true, email: customer.email };
}

async function requestPasswordReset(email, newPassword) {
  const customer = await Customer.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!customer) {
    return { ok: true, status: "noop" };
  }

  const hashedPendingPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const { token, expires } = generateToken(1);

  await Customer.findOneAndUpdate(
    { _id: customer._id },
    {
      passwordResetToken: token,
      passwordResetExpires: expires,
      pendingPasswordHash: hashedPendingPassword,
    },
    { returnDocument: "after" },
  );

  const clientUrl =
    process.env.CLIENT_URL?.split(",")?.[0]?.trim() || "http://localhost:3000";
  const resetLink = `${clientUrl.replace(/\/$/, "")}/reset-password?token=${token}`;

  await sendEmail({
    to: customer.email,
    subject: "Reset your Velora password",
    text: `Someone requested a password reset. To apply the new password, open: ${resetLink} (expires in 1 hour). If you did not request this, ignore the email.`,
    html: `<p>We received a request to reset your Velora password.</p><p>To apply the new password you chose, click the button below within 1 hour:</p><p><a href="${resetLink}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
  });

  return {
    ok: true,
    status: "sent",
    token: process.env.NODE_ENV === "production" ? undefined : token,
  };
}

async function confirmPasswordReset(token) {
  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const customer = await Customer.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: new Date() },
  }).select("+pendingPasswordHash");

  if (!customer || !customer.pendingPasswordHash) {
    return { ok: false, reason: "invalid-or-expired" };
  }

  await Customer.findOneAndUpdate(
    { _id: customer._id },
    {
      password: customer.pendingPasswordHash,
      pendingPasswordHash: null,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
    { returnDocument: "after" },
  );

  return { ok: true, email: customer.email };
}

module.exports = {
  registerCustomer,
  loginCustomer,
  refreshAccessToken,
  requestEmailVerification,
  confirmEmailVerification,
  requestPasswordReset,
  confirmPasswordReset,
};
