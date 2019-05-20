const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

    // Tell webpack the root file of our server application
    entry: './src/index.js',

    // Tell webpack where to put the output file that is generated
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build')
    },


    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-react',
                        ['@babel/preset-env', {targets: {browsers: ['last 2 versions','ie >= 11']}}]
                    ],
                    plugins: ['@babel/plugin-transform-runtime', "@babel/plugin-proposal-class-properties"]
                },
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'build/index.html'})
    ]

};

module.exports = config;
