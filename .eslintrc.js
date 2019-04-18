module.exports = {
  extends: ["eslint-config-with-prettier"],
  rules: {
    "jest/valid-expect": "warn",
    "linebreak-style": 0,
    "no-console": "error",
    "no-unused-vars": "error",
    "prettier/prettier": [
      "error",
      {
        semi: true,
        printWidth: 100,
        quotes: "double"
      }
    ],
    "class-methods-use-this": 0,
    "import/no-unresolved": 0,
    "import/no-dynamic-require": 0,
    "no-underscore-dangle": 0,
    "camelcase": 0
  }
}