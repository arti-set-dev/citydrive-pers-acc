import type { Configuration as WebpackConfiguration } from 'webpack';

type DevServerConfiguration = WebpackConfiguration['devServer'];

export const buildDevServer = (): DevServerConfiguration => {
  return {
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  };
};
