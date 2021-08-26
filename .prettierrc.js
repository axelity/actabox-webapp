module.exports = {
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  printWidth: 120,
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
}
