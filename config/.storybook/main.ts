import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { dirname } from '../../scripts/dirname.ts';

const __dirname = dirname(import.meta.url);

const config: StorybookConfig = {
  stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-webpack5',
  staticDirs: ['../../public', '../../src/shared/assets/images'],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../../src'),
      };
    }
    if (config.module?.rules) {
      config.module.rules = config.module.rules.filter((rule: any) => {
        const test = rule.test?.toString();
        if (!test) return true;
        return !test.includes('scss') && !test.includes('css');
      });
    }
    config.module?.rules?.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: true,
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              namedExport: false,
              exportLocalsConvention: 'as-is',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@use "@/app/styles/_mixins.scss" as *;`,
          },
        },
      ],
    });
    return config;
  },
};
export default config;
