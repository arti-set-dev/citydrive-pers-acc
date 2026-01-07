import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import { buildRules } from './config/build/buildRules.ts';
import { dirname } from './config/build/utils/dirname.ts';
import { buildPlugins } from './config/build/buildPlugins.ts';
import { buildDevServer } from './config/build/buildDevServer.ts';
import { buildResolves } from './config/build/buildResolves.ts';
import type { BuildEnv, BuildPaths } from './config/build/types/types.ts';

const __dirname = dirname(import.meta.url);

const config = (env: BuildEnv): webpack.Configuration => {
  const isDev = env.mode === 'development';
  const paths: BuildPaths = {
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  return {
    mode: env.mode,
    target: 'browserslist',
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
      rules: buildRules(env),
    },
    resolve: buildResolves(paths),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
      clean: true,
    },
    plugins: buildPlugins(paths, env),
    devServer: buildDevServer(),
  };
};

export default config;
