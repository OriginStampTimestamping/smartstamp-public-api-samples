module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["off"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    "max-len": ["off"],
    "require-jsdoc": 0,
    "no-prototype-builtins": 0,
    "guard-for-in": 0,
    "quote-props": ["warn", "consistent-as-needed"],
    "@typescript-eslint/no-explicit-any": ["off"],
  },
};
