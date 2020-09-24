module.exports = {
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parserOptions: { ecmaVersion: 2018 },
  root: true,
  rules: {
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        "newlines-between": "always",
      },
    ],
    "no-plusplus": "off",
  },
  overrides: [
    {
      files: ["test/*.test.js"],
      env: {
        mocha: true,
      },
      globals: {
        artifacts: "readonly",
        contract: "readonly",
      },
      rules: {
        "no-await-in-loop": "off",
      },
    },
  ],
};
