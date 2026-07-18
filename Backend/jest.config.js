module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["**/tests/**/*.test.js"],
  clearMocks: true,
  restoreMocks: true,
  testTimeout: 60000,
  testPathIgnorePatterns: ["/node_modules/"],
};
