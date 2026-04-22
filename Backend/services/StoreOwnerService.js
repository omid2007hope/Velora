const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const StoreOwner = require("../model/storeOwner");
const { sendEmail } = require("../utils/mailer");
const { getEnvConfig } = require("../config/env");

const SALT_ROUNDS = 12;

function generateToken(hoursValid = 24) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + hoursValid * 60 * 60 * 1000);
  return { token, expires };
}

function buildClientLink(pathname, token) {
  const { primaryClientUrl } = getEnvConfig();
  return `${primaryClientUrl.replace(/\/$/, "")}${pathname}?token=${token}&authView=seller`;
}

function mapStoreOwner(storeOwner) {
  return {
    _id: storeOwner._id,
    storeOwnerName: storeOwner.storeOwnerName,
    storeOwnerEmailAddress: storeOwner.storeOwnerEmailAddress,
    storeOwnerProvider: storeOwner.storeOwnerProvider,
    storeOwner: !!storeOwner.storeOwner,
    isEmailVerified: !!storeOwner.isEmailVerified,
  };
}

async function registerStoreOwner({
  storeOwnerName,
  storeOwnerEmailAddress,
  storeOwnerPassword,
}) {
  const normalizedStoreOwner = {
    storeOwnerName: storeOwnerName.trim(),
    storeOwnerEmailAddress: storeOwnerEmailAddress.trim().toLowerCase(),
    storeOwnerPasswordHash: await bcrypt.hash(storeOwnerPassword, SALT_ROUNDS),
  };

  const existingStoreOwner = await StoreOwner.findOne({
    storeOwnerEmailAddress: normalizedStoreOwner.storeOwnerEmailAddress,
  }).lean();

  if (existingStoreOwner) {
    return {
      source: "database",
      existed: true,
      data: mapStoreOwner(existingStoreOwner),
    };
  }

  const savedStoreOwner = await new StoreOwner(normalizedStoreOwner).save();
  let emailVerificationToken;

  try {
    const { token, expires } = generateToken(24);

    await StoreOwner.findOneAndUpdate(
      { _id: savedStoreOwner._id },
      {
        emailVerificationToken: token,
        emailVerificationExpires: expires,
      },
      { returnDocument: "after" },
    );

    const verificationLink = buildClientLink("/verify-email", token);

    await sendEmail({
      to: savedStoreOwner.storeOwnerEmailAddress,
      subject: "Verify your Velora seller account",
      text: `Welcome to Velora! Confirm your seller email by visiting: ${verificationLink}`,
      html: `<p>Welcome to Velora!</p><p>Please confirm your seller email by clicking the link below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
    });

    emailVerificationToken =
      process.env.NODE_ENV === "production" ? undefined : token;
  } catch (_error) {
    emailVerificationToken = undefined;
  }

  return {
    source: "created",
    existed: false,
    data: mapStoreOwner(savedStoreOwner),
    emailVerificationToken,
  };
}

async function loginStoreOwner({ storeOwnerEmailAddress, storeOwnerPassword }) {
  const storeOwner = await StoreOwner.findOne({
    storeOwnerEmailAddress: storeOwnerEmailAddress.trim().toLowerCase(),
  })
    .select("+storeOwnerPasswordHash")
    .lean();

  if (!storeOwner || !storeOwner.storeOwnerPasswordHash) {
    return { authenticated: false };
  }

  const isPasswordValid = await bcrypt.compare(
    storeOwnerPassword,
    storeOwner.storeOwnerPasswordHash,
  );

  if (!isPasswordValid) {
    return { authenticated: false };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  const tokenPayload = {
    sub: storeOwner._id.toString(),
    email: storeOwner.storeOwnerEmailAddress,
    role: "seller",
  };

  return {
    authenticated: true,
    data: mapStoreOwner(storeOwner),
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
      role: payload.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );
}

async function requestEmailVerification(storeOwnerEmailAddress) {
  const storeOwner = await StoreOwner.findOne({
    storeOwnerEmailAddress: storeOwnerEmailAddress.trim().toLowerCase(),
  });

  if (!storeOwner) {
    return { ok: true, status: "noop" };
  }

  if (storeOwner.isEmailVerified) {
    return { ok: true, status: "already-verified" };
  }

  const { token, expires } = generateToken(24);

  await StoreOwner.findOneAndUpdate(
    { _id: storeOwner._id },
    {
      emailVerificationToken: token,
      emailVerificationExpires: expires,
    },
    { returnDocument: "after" },
  );

  const verificationLink = buildClientLink("/verify-email", token);

  await sendEmail({
    to: storeOwner.storeOwnerEmailAddress,
    subject: "Verify your Velora seller account",
    text: `Confirm your Velora seller account by visiting: ${verificationLink}`,
    html: `<p>Confirm your Velora seller account by clicking below:</p><p><a href="${verificationLink}">Verify email</a></p><p>This link expires in 24 hours.</p>`,
  });

  return {
    ok: true,
    status: "sent",
    email: storeOwner.storeOwnerEmailAddress,
    token: process.env.NODE_ENV === "production" ? undefined : token,
  };
}

async function confirmEmailVerification(token) {
  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  const storeOwner = await StoreOwner.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() },
  });

  if (!storeOwner) {
    return { ok: false, reason: "invalid-or-expired" };
  }

  await StoreOwner.findOneAndUpdate(
    { _id: storeOwner._id },
    {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    },
    { returnDocument: "after" },
  );

  return { ok: true, email: storeOwner.storeOwnerEmailAddress };
}

async function requestPasswordReset(storeOwnerEmailAddress, newPassword) {
  const storeOwner = await StoreOwner.findOne({
    storeOwnerEmailAddress: storeOwnerEmailAddress.trim().toLowerCase(),
  });

  if (!storeOwner) {
    return { ok: true, status: "noop" };
  }

  const hashedPendingPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const { token, expires } = generateToken(1);

  await StoreOwner.findOneAndUpdate(
    { _id: storeOwner._id },
    {
      passwordResetToken: token,
      passwordResetExpires: expires,
      pendingPasswordHash: hashedPendingPassword,
    },
    { returnDocument: "after" },
  );

  const resetLink = buildClientLink("/reset-password", token);

  await sendEmail({
    to: storeOwner.storeOwnerEmailAddress,
    subject: "Reset your Velora seller password",
    text: `Someone requested a seller password reset. To apply the new password, open: ${resetLink} (expires in 1 hour). If you did not request this, ignore the email.`,
    html: `<p>We received a request to reset your Velora seller password.</p><p>To apply the new password you chose, click the button below within 1 hour:</p><p><a href="${resetLink}">Reset password</a></p><p>If you didn't request this, you can ignore this email.</p>`,
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

  const storeOwner = await StoreOwner.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: new Date() },
  }).select("+pendingPasswordHash");

  if (!storeOwner || !storeOwner.pendingPasswordHash) {
    return { ok: false, reason: "invalid-or-expired" };
  }

  await StoreOwner.findOneAndUpdate(
    { _id: storeOwner._id },
    {
      storeOwnerPasswordHash: storeOwner.pendingPasswordHash,
      pendingPasswordHash: null,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
    { returnDocument: "after" },
  );

  return { ok: true, email: storeOwner.storeOwnerEmailAddress };
}

module.exports = {
  registerStoreOwner,
  loginStoreOwner,
  refreshAccessToken,
  requestEmailVerification,
  confirmEmailVerification,
  requestPasswordReset,
  confirmPasswordReset,
};
