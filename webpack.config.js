var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './client/src/main.ts'
    ],
    output: {
        path: path.resolve(__dirname + '/client', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    }
};
