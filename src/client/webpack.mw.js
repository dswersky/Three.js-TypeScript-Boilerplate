const NodemonPlugin = require('nodemon-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/client.ts',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist/client',
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            fs: false,
            util: false
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client')
    },
    performance: {
        hints: false
    },
    plugins:[new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../../dist/client/index.html'),
        title: 'Your website'
      })], 
};