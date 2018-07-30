const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './src/test.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vue-sure-toast.min.js',
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"] // Preset used for env setup
                    }
                }
            }
        ]
    }
}