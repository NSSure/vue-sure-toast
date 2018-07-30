let path = require('path');

var  ExtractTextPlugin =  require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/vue-sure-toast.css',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vue-sure-toast.min.css',
        publicPath: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
}