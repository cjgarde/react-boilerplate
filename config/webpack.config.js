const path = require('path');
const webpack = require('webpack');
// remove/clean build folder(s) before building
const CleanWebpackPlugin = require('clean-webpack-plugin');
// generates an HTML5 file for you that includes all your webpack bundles in the body using script tags
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');
const srcPath = rootPath + '/src/';
const staticPath = rootPath + '/static/';
const testsPath = rootPath + '/__tests__/';

// Plugins definition
const cleanWebPackPlugin = new CleanWebpackPlugin();
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: srcPath + 'index.html',
  filename: 'index.html',
});

module.exports = {
  entry: ['@babel/polyfill', srcPath + 'index.js'],
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, rootPath + '/public'),
    publicPath: '',
    sourceMapFilename: '[name].js.map',
  },
  resolve: {
    alias: {
      helpers: path.resolve(__dirname, srcPath + 'helpers/'),
      base_components: path.resolve(__dirname, srcPath + 'components/'),
      constants: path.resolve(__dirname, srcPath + 'constants/'),
      hocs: path.resolve(__dirname, srcPath + 'hocs/'),
      state: path.resolve(__dirname, srcPath + 'state/'),
      static: path.resolve(__dirname, staticPath),
      static_fonts: path.resolve(__dirname, staticPath + 'fonts/'),
      static_images: path.resolve(__dirname, staticPath + 'images/'),
      store: path.resolve(__dirname, srcPath + 'store/'),
      test_helpers: path.resolve(__dirname, testsPath + 'utils/utils.js'),
      views: path.resolve(__dirname, srcPath + 'views/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: false } }],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|url)$/i,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]',
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Adds CSS to the DOM by injecting a <style> tag --> https://github.com/webpack-contrib/style-loader
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Interprets @import and url() like import/require() and will resolve them -->  https://github.com/webpack-contrib/css-loader
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: true,
              // to configure the generated identification: [name of the component]_[name of class/id]_[random unique hash]
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              // minimize: true,
            },
          },
          // Loads a Sass/SCSS file and compiles it to CSS --> https://github.com/webpack-contrib/sass-loader
          'sass-loader',
          // @import SASS resources into every required SASS module --> https://github.com/shakacode/sass-resources-loader
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: [
                srcPath + 'styles/_palette.scss',
                srcPath + 'styles/_variables.scss',
                srcPath + 'styles/_mixins.scss',
              ],
            },
          },
        ],
      }],
  },
  plugins: [
    new webpack.ProgressPlugin( (percentage, message, ...args) => {
      console.info(percentage, message, ...args);
    }),
    cleanWebPackPlugin,
    htmlWebpackPlugin,
  ],
  node: { fs: 'empty' }, // so we don't trigger errors when a library is using fs, i.e.
};
