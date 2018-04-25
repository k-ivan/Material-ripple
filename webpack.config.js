var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/ripple.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'js/ripple.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // use: {'css-loader', 'postcss-loader'],
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')({ browsers: ['last 2 versions'] })]
              }
            }
          ],
          publicPath: 'dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('./css/ripple.css'),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html'
    })
  ]
}