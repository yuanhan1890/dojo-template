const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const ROOT_PATH = __dirname
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(ROOT_PATH, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve('ts-loader')
      }
    ]
  },
  devServer: {
    port: 4000,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, './public/index.html')
    })
  ],
  resolve: {
    plugins: [
      new TSConfigPathsPlugin()
    ],
    alias: {
      // input alias
    }
  }
}