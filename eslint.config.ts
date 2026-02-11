// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import importX from 'eslint-plugin-import-x';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';

export default defineConfig([
  {
    ignores: [
      'build/**',
      'node_modules/**',
      'jest-report',
      'json-server/**',
      '*.config.js',
      '*.config.mjs',
      'storybook-static/**',
      'scripts/*.{js,ts}',
      'src/shared/utils/jest/providers/JestProvider.tsx',
      'config/jest/EmptyMock.js',
      'babel.config.cjs',
      '.lintstagedrc.cjs',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      boundaries,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'import-x': importX,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'react-hooks': fixupPluginRules(reactHooks as any),
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json', './cypress/tsconfig.json'],
      },
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './cypress/tsconfig.json'],
        },
        node: true,
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './cypress/tsconfig.json'],
        },
        node: true,
      },
      'boundaries/base-path': '.',
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
        { type: 'app', pattern: 'apps/*/src/app' },
        { type: 'pages', pattern: 'apps/*/src/pages/*' },
        { type: 'widgets', pattern: 'apps/*/src/widgets/*' },
        { type: 'features', pattern: 'apps/*/src/features/*' },
        { type: 'entities', pattern: 'apps/*/src/entities/*' },
        { type: 'shared', pattern: 'apps/*/src/shared/*' },
        { type: 'features', pattern: 'packages/*/src/features/*' },
        { type: 'entities', pattern: 'packages/entities/src/*' },
        { type: 'shared', pattern: 'packages/shared/src/*' },
      ],
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
          propElementValues: 'always',
        },
      ],
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              target: [['shared']],
              allow: '**',
            },
            {
              target: ['app', 'pages', 'widgets', 'features', 'entities'],
              allow: ['**/index.ts', '**/index.tsx'],
            },
          ],
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '${file.type} не может импортировать ${dependency.type}',
          rules: [
            {
              from: 'app',
              allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'pages',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
    },
  },
  {
    files: ['packages/shared/src/utils/jest/**/*.{ts,tsx}'],
    rules: {
      'boundaries/element-types': 'off',
      'boundaries/entry-point': 'off',
    },
  },
  eslintConfigPrettier,
]);
