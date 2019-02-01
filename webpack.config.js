var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const path = require('path')

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      // javascript = babel + uglify
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: "babel-loader" }]
      },

      // css file: extract to css file with mini extract plugin
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },

  // uglifyjs
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },

  // plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),
  ]
};
