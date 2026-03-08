const { getEnvConfig } = require("../config/env");

function canLog() {
  return !getEnvConfig().isTest;
}

function info(...args) {
  if (canLog()) {
    console.log(...args);
  }
}

function warn(...args) {
  if (canLog()) {
    console.warn(...args);
  }
}

function error(...args) {
  console.error(...args);
}

module.exports = {
  info,
  warn,
  error,
};
