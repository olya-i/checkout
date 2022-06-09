/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/* eslint-env node */
module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",

  globals: {},
  testEnvironment: "jsdom",
  testMatch: [
    "**/tests/unit/**/*.spec.[jt]s?(x)",
    "**/tests/integration/**/*.spec.[jt]s?(x)",
  ],
  transform: {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  snapshotSerializers: ["jest-serializer-vue-tjw"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest-setup.ts"],
};
