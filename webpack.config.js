var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + "/client",
    entry: {
        main: './src/main.ts',
        style: './public/stylesheets/style.css'
    },
    output: {
        path: path.resolve(__dirname + '/client', 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader'},
            { test: /\.json$/, loader: 'json-loader'},
            { test: /\.html$/, loader: 'html-loader'},
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/static/template.html'
        }),
        new ExtractTextPlugin("[name].css")
    ]
};
