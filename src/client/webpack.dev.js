const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/client/client.ts',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist/client',
        hot: true,
    },
    externals: {
        "fs": "require('fs')"
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
            fs: false
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client')
    },
    performance: {
        hints: false
    }    
};