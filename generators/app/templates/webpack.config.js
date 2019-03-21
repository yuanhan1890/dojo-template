const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_PATH = __dirname
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(ROOT_PATH, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [
              require.resolve('@babel/preset-env'),
              {
                "loose": true,
                "modules": "cjs"
              }
            ]
          ],
          plugins: [
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-transform-runtime')
          ]
        }
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
    alias: {
      // input alias
    }
  }
}