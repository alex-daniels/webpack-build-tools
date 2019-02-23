var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "../src/js/app.js" ,
  output: {
    path: __dirname + "/dist/js/",
    filename: "app.min.js",
    publicPath: '/'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
    new MiniCssExtractPlugin ({ filename: '/dist/css/style.css' }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './app/index.html',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      //JS
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      //CSS
      //SCSS
      {
         test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }, {
            loader: "sass-loader", options: {
                sourceMap: true
            }
          }],
         use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      //Images
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
      
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
};