'use strict'

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: {
      'vue-sure-toast': './src/vue-sure-toast.js'
    },
    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].min.js',
      libraryTarget: 'udm',
      library: 'vue-sure-toast',
      umdNamedDefine: true
	  },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "id.css"
      })
    ]
}