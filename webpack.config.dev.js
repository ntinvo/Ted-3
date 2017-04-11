var path = require('path');

export default {
    entry: path.join(__dirname, 'client/index.js'),
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, // search for js extension
                exclude: /(node_modules)/,
                include: path.join(__dirname, 'client'),
                loaders: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [' ', '.js']
    },
    watch: true
}
