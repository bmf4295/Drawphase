import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'node_modules/**', 'eslint.config.js']),
  {
    files: ['**/*.{ts,js}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      // TypeScript specific
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@/prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',

      // General JavaScript/Node.js
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Handled by TypeScript rule
      'prefer-const': 'error',
      'no-var': 'error',

      // Node.js specific
      'no-process-exit': 'error',
      'no-path-concat': 'error',

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // Code quality
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error'
    },
  },
  {
    files: ['src/db/migrate.ts', 'src/db/seed.ts'],
    rules: {
      'no-console': 'off',
      'no-process-exit': 'off',
      '@typescript-eslint/no-floating-promises': 'off'
    }
  },
  {
    files: ['src/index.ts'],
    rules: {
      'no-console': 'off' // Allow console logs in main server file
    }
  },
])
