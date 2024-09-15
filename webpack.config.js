const path = require('path')
const Copylugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/main.ts', // Existing entry point
        about: './src/about.ts', // New entry point for about.html
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true
    },
    output: {
        filename: '[name].min.js', // Output filenames based on entry names
        path: path.resolve(__dirname, 'dist'),
        clean: true
        // filename: "app.min.js",
        // path: path.join(__dirname, 'dist')
    },
    plugins: [
        new Copylugin({
            patterns: [{from: 'public'}]
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}
