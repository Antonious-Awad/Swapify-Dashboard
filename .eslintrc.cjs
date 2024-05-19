module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint", "react-refresh", "prettier"],
  extends: [
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "plugin:storybook/recommended",
        "airbnb/hooks"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
