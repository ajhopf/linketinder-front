const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        index: './src/js/main.ts',
        registration: './src/js/registration/registration.ts',
    },
    output: {
        filename: '[name].min.js', // Output filenames based on entry names
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            chunks: ['index'],
            filename: 'index.html',
            minify: false
        }),
        new HtmlWebpackPlugin({
            template: './public/registration.html',
            chunks: ['registration'],
            filename: 'registration.html',
            minify: false
        }),
        new CopyPlugin({
            patterns: [{from: 'public/css', to:'css/'}]
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}
