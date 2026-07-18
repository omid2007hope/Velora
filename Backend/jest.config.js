module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["**/tests/**/*.test.js"],
  clearMocks: true,
  restoreMocks: true,
  testPathIgnorePatterns: ["/node_modules/"],
};
