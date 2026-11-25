import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignore build output directories
  globalIgnores(['dist']),

  /* Presets/shareable configs from plug-ins */
  // Javascript recommended rules
  js.configs.recommended,
  // React recommended rules
  react.configs.flat.recommended,
  // Modern JSX transform rules
  react.configs.flat['jsx-runtime'],
  // React hooks rules
  reactHooks.configs.flat.recommended,
  // Vite fast refresh
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.recommended,

  /* Main React config block */
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      /* Vite React Refresh rules */
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      /* React plug-in rules */
      // Disallow usage of button elements without an explicit type attribute
      'react/button-has-type': 'warn',
      // Disallow usage of Array index in keys
      'react/no-array-index-key': 'warn',
      // Forces sanitizing the input
      'react/no-danger': 'error',
      // Helps to find redundant prop variables
      'react/destructuring-assignment': ['warn', 'always'],
      // Disallows JSX context provider values from taking values that will cause needless rerenders
      'react/jsx-no-constructed-context-values': 'warn',
      // Disallow .bind() or arrow functions in JSX props
      'react/jsx-no-bind': 'warn',
      // Enhances readability of code by being more explicit about what props are received by the component
      'react/jsx-props-no-spreading': 'warn',
      // Enforces consistent linebreaks in curly braces
      'react/jsx-curly-newline': 'warn',
    },
    settings: {
      react: {
        // Automatically detects the React version
        version: 'detect',
      },
    },
  },
])
