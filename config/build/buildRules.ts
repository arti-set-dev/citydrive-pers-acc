import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import type { BuildEnv } from './types/types';
import path from 'path';

export const buildRules = (mode: BuildEnv): webpack.RuleSetRule[] => {
  const isDev = mode.mode === 'development';
  const isProd = !isDev;
  const mixinsPath = path.posix.join('@', 'app', 'styles', '_mixins.scss');

  return [
    {
      test: /\.tsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          envName: isProd ? 'production' : 'development',

          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: isProd ? 'usage' : false,
                corejs: isProd ? '3.35' : undefined,
                modules: false,
              },
            ],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
        },
      },
      exclude: /node_modules/,
    },
    {
      test: /\.(s[ac]ss|css)$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              namedExport: false,
              localIdentName: isDev
                ? '[name]__[local]--[hash:base64:5]'
                : '[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            // Здесь магия
            additionalData: `@use "${mixinsPath}" as *;`,
          },
        },
      ],
    },
    {
      test: /\.(woff2|woff|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name][ext][query]',
      },
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
          },
        },
      ],
    },
  ];
};
