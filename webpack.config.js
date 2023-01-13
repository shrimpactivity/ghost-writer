const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, '/client/public'),
    filename: 'main.js'
  },
  devServer: {
    static: path.resolve(__dirname, '/client/public'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        router: () => 'http://localhost:3001',
        logLevel: 'debug'
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ]
}

module.exports = config