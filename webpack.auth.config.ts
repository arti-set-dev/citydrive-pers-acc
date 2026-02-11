import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import { buildRules } from './config/build/buildRules.ts';
import { dirname } from './scripts/dirname.ts';
import { buildPlugins } from './config/build/buildPlugins.ts';
import { buildResolves } from './config/build/buildResolves.ts';
import type { BuildEnv, BuildPaths } from './config/build/types/types.ts';

const __dirname = dirname(import.meta.url);

const config = (env: BuildEnv): webpack.Configuration => {
  const isDev = env.mode === 'development';
  const paths: BuildPaths = {
    html: path.resolve(__dirname, 'apps', 'auth', 'public', 'index.html'),
    src: path.resolve(__dirname, 'apps', 'auth', 'src'),
  };

  return {
    mode: env.mode,
    target: 'browserslist',
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
    entry: path.resolve(__dirname, 'apps', 'auth', 'src', 'index.tsx'),
    module: {
      rules: buildRules(env),
    },
    resolve: buildResolves(paths),
    output: {
      path: path.resolve(__dirname, 'build', 'auth'),
      filename: '[name].[contenthash].js',
      publicPath: 'auto',
      clean: true,
      environment: {
        asyncFunction: true,
      },
    },
    plugins: [
      ...buildPlugins(paths, env),
      new webpack.container.ModuleFederationPlugin({
        name: 'auth',
        filename: 'remoteEntry.js',
        exposes: {
          './LoginPage': './apps/auth/src/pages/LoginPage/LoginPage.tsx',
          './RegistrationPage':
            './apps/auth/src/pages/RegistrationPage/RegistrationPage.tsx',
          './ForgotPasswordPage':
            './apps/auth/src/pages/ForgotPasswordPage/ForgotPasswordPage.tsx',
          './ResetPasswordPage':
            './apps/auth/src/pages/ResetPasswordPage/ResetPasswordPage.tsx',
        },
        shared: {
          react: { singleton: true, requiredVersion: false, eager: true },
          'react-dom': { singleton: true, requiredVersion: false, eager: true },
          'react-router-dom': {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          '@reduxjs/toolkit': {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          'react-redux': {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
        },
      }),
    ],
    devServer: {
      historyApiFallback: true,
      port: 3002,
      open: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
};

export default config;
