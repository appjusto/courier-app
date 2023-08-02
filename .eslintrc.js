module.exports = {
  extends: ['universe', 'plugin:react-hooks/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'import/order': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        'import/order': 'off',
      },
    },
  ],
};
