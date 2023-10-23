module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      node: {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': ['warn', {
      alphabetize: { 'order': 'asc' },
      groups: [
        ['builtin', 'external', 'internal'],
        ['parent', 'sibling', 'index']
      ],
      'newlines-between': 'always',
      pathGroups: [
        { group: 'builtin', pattern: 'react**', position: 'before' },
        { group: 'external', pattern: '@material-ui/**', position: 'after' },
      ],
      pathGroupsExcludedImportTypes: [
        'builtin'
      ]
    }]
  },
}
