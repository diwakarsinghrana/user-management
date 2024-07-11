const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.ts',
    target: 'node',
    mode: 'production', // or 'development'
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        // Exclude node_modules from being bundled
        'cache-manager': 'commonjs cache-manager',
        'cache-manager-redis-store': 'commonjs cache-manager-redis-store',
        '@nestjs/websockets': 'commonjs @nestjs/websockets',
        '@nestjs/microservices': 'commonjs @nestjs/microservices',
        snappy: 'commonjs snappy',
        socks: 'commonjs socks',
        aws4: 'commonjs aws4',
        'mongodb-client-encryption': 'commonjs mongodb-client-encryption',
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^optional-module$/,
        }),
    ],
};
