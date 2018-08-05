'use strict'

const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'vue-sure-toast.min': './src/vue-sure-toast.js'
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          // this will apply to both plain `.js` files
          // AND `<script>` blocks in `.vue` files
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          // this will apply to both plain `.css` files
          // AND `<style>` blocks in `.vue` files
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
    }
}