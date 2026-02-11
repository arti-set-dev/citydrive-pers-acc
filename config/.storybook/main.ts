import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { dirname } from '../../scripts/dirname.ts';

const __dirname = dirname(import.meta.url);

const config: StorybookConfig = {
  stories: [
    '../../src/**/*.mdx',
    '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../packages/shared/src/**/*.mdx',
    '../../packages/shared/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-themes',
  ],
  framework: '@storybook/react-webpack5',
  staticDirs: ['../../public', '../../packages/shared/src/assets/images'],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../../src'),
        '@citydrive/shared': path.resolve(
          __dirname,
          '../../packages/shared/src',
        ),
        '@citydrive/entities': path.resolve(
          __dirname,
          '../../packages/entities/src',
        ),
        '@citydrive/auth': path.resolve(__dirname, '../../packages/auth/src'),
      };
    }

    if (config.module?.rules) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config.module.rules = config.module.rules.filter((rule: any) => {
        const test = rule.test?.toString();
        return test ? !test.includes('scss') : true;
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config.module.rules = config.module.rules.map((rule: any) => {
        if (rule.test?.toString().includes('svg')) {
          return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      });

      config.module.rules.push({
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: { currentColor: true },
                  },
                ],
              },
            },
          },
        ],
      });

      config.module.rules.push({
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
              additionalData: `@use "@citydrive/shared/styles/_mixins.scss" as *;`,
            },
          },
        ],
      });
    }

    return config;
  },
};

export default config;
