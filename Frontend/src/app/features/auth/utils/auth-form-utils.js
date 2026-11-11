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

export const PASSWORD_CRITERIA = [
  { key: "length", label: "At least 8 characters" },
  { key: "uppercase", label: "One uppercase letter" },
  { key: "lowercase", label: "One lowercase letter" },
  { key: "number", label: "A number" },
  { key: "symbol", label: "A special symbol (!@#$%)" },
];

const PASSWORD_RULES = {
  length: (value) => value.length >= 8,
  uppercase: (value) => /[A-Z]/.test(value),
  lowercase: (value) => /[a-z]/.test(value),
  number: (value) => /[0-9]/.test(value),
  symbol: (value) => /[!@#$%^&*(),.?"{}|<>~`_+=:/\\[\]-]/.test(value),
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getPasswordCriteriaState(value) {
  return Object.fromEntries(
    Object.entries(PASSWORD_RULES).map(([key, rule]) => [key, rule(value)]),
  );
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value);
}

export function parseJwtPayload(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}
