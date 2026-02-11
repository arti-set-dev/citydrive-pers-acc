import path from 'path';
import webpack from 'webpack';
import type { BuildPaths } from './types/types.ts';

export const buildResolves = (paths: BuildPaths): webpack.ResolveOptions => {
  return {
    alias: {
      '@': paths.src,
      '@citydrive/shared': path.resolve(
        process.cwd(),
        'packages',
        'shared',
        'src',
      ),
      '@citydrive/entities': path.resolve(
        process.cwd(),
        'packages',
        'entities',
        'src',
      ),
      '@citydrive/auth': path.resolve(process.cwd(), 'packages', 'auth', 'src'),
    },
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules'],
  };
};
