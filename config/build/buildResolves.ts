import webpack from 'webpack';
import type { BuildPaths } from './types/types.ts';

export const buildResolves = (paths: BuildPaths): webpack.ResolveOptions => {
  return {
    alias: {
      '@': paths.src,
    },
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules'],
  };
};
