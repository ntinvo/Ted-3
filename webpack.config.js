var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + "/client",
    entry: {
        main: './src/main.ts',
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
            { test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/static/template.html'
        })
    ]
};
