import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import * as tsEslint from 'typescript-eslint'

export default [
  eslintPluginPrettierRecommended,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ['.node_modules/*'],
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,

  /** Import config */
  {
    rules: {
      /** Change console to warn */
      'no-console': 'warn',
      /** Import requirements.
       * Prefer to organize the imports to easily identify the layer of
       * dependencies (external, internal, relatives) of a module
       * */
      'import/order': [
        'error',
        {
          /** Alphabetic import */
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          /** Group imports */
          groups: [
            'builtin',
            'external',
            'index',
            'parent',
            'sibling',
            'internal',
          ],
          /** Split imports on new lines */
          'newlines-between': 'always-and-inside-groups',
        },
      ],
      /** Disable export default
       * Prefer named import for tracking the original module
       * */
      'import/prefer-default-export': ['off'],
      /** Turn off explicit return */
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      /** Turn off triple slash ref error */
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  /** Import resolver */
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: '<root>/tsconfig.json',
        },
      },
    },
  },
]
