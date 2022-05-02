const path = require('path')
const webpack = require('webpack')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack transpilation',
      template: './src/index.html',
      filename: './index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
        charset: 'UTF-8',
      },
    }),
    new webpack.ProgressPlugin({ percentBy: 'entries' }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
}
