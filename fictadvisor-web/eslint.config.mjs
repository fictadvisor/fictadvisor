import next from 'eslint-config-next';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginQuery from '@tanstack/eslint-plugin-query';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      '.next/**',
      '.husky/**',
      '.github/**',
      'next-env.d.ts',
      '**/*.css',
      '**/*.css.map',
    ],
  },
  ...next,
  {
    // Pin the React version so eslint-plugin-react (v7.37) skips auto-detection,
    // which calls the `context.getFilename()` API removed in ESLint 10.
    settings: { react: { version: '19.2.7' } },
  },
  {
    // eslint-config-next's own parser (v16) targets ESLint 9 and crashes on
    // ESLint 10 (scopeManager.addGlobals). It only applies to JS-family files
    // (all TS files use the typescript-eslint parser), so override those with
    // the ESLint 10-compatible parser.
    files: ['**/*.{js,cjs,mjs,jsx}'],
    languageOptions: { parser: tsParser },
  },
  ...pluginQuery.configs['flat/recommended'],
  prettierRecommended,
  {
    // TypeScript-specific rules — the `@typescript-eslint` plugin is registered
    // by eslint-config-next for these files, so scope these rules to match.
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': [
        'error',
        { allowSingleExtends: true },
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      // React Compiler rules added by eslint-plugin-react-hooks v7 / Next 16.
      // These flag pre-existing patterns not previously enforced; keep them
      // visible as warnings rather than blocking lint.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/refs': 'warn',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // `react` first, then other packages.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
];
