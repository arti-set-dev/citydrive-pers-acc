// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

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

export default defineConfig([
  {
    ignores: ['build/**', 'node_modules/**', '*.config.js'],
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
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
        node: true,
      },
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
        node: true,
      },
      'boundaries/base-path': 'src',
      'boundaries/elements': [
        { type: 'app', pattern: 'app' },
        { type: 'pages', pattern: 'pages/*' },
        { type: 'widgets', pattern: 'widgets/*' },
        { type: 'features', pattern: 'features/*' },
        { type: 'entities', pattern: 'entities/*' },
        { type: 'shared', pattern: 'shared/*' },
      ],
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
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
              allow: 'index.ts',
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
  eslintConfigPrettier,
]);
