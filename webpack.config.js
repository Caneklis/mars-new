import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
const { CircularDependencyPlugin1 } = CircularDependencyPlugin;

import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
const { DuplicatePackageCheckerPlugin1 } = DuplicatePackageCheckerPlugin;

const __dirname = path.resolve();
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

export const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    common: './js/common.js'
  },
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build/js')
  },
  optimization: {
    minimize: isDev ? false : true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\bmapbox-gl-csp-worker.js\b/i,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new DuplicatePackageCheckerPlugin(), new CircularDependencyPlugin()]
};
