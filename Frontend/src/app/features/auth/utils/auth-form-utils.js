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
