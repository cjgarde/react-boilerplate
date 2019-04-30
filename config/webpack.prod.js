const webpack = require('webpack');
// create a CSS file per JS file which contains CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// optimize and minimize the CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// to analyze the weight of the bundle visually
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

// some libraries look for process.env.NODE_ENV to optimize and webpack doesn't include it
const environmentPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
    // separate in a file called vendors.js all used in node_modules
    /* splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }, */
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `vendor-src-map/npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    miniCssExtractPlugin,
    environmentPlugin,
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
});
