'use strict';
var extend = require('xtend');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pkg = require('../package.json');


var config = {
    filename: 'boilerplate',
    library: 'Boilerplate',
    demoDirectory: 'demo',
};

var common = {
    exports: {
        entry: [
            './' + config.demoDirectory + '/index'
        ],
        resolve: {
            extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg'],
        },
    },
};

var commonLoaders = [
    {
        test: /\.css$/,
        loaders: ['style', 'css'],
    },
    {
        test: /\.md$/,
        loader: 'html!highlight!markdown',
    },
    {
        test: /\.png$/,
        loader: 'url?limit=100000&mimetype=image/png',
    },
    {
        test: /\.jpg$/,
        loader: 'file',
    },
    {
        test: /\.json$/,
        loader: 'json',
    },
];

exports.dev = extend(common, {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './' + config.demoDirectory + '/index',
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/' + config.demoDirectory + '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: commonLoaders.concat([{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'jsx?harmony'],
        }])
    }
});

exports.ghpages = extend(common, {
    entry: [
        './' + config.demoDirectory + '/index'
    ],
    output: {
        path: './gh-pages',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        new HtmlWebpackPlugin({
            title: pkg.name + ' - ' + pkg.description
        }),
    ],
    module: {
        loaders: commonLoaders.concat([{
            test: /\.jsx?$/,
            loaders: ['jsx?harmony'],
        }])
    }
});

var commonDist = extend(common, {
    entry: './lib/index',
    externals: {
        react: 'react',
        'react/addons': 'react/addons'
    },
    module: {
        loaders: commonLoaders.concat([{
            test: /\.jsx?$/,
            loaders: ['jsx?harmony'],
            exclude: /node_modules/,
        }])
    }
});

exports.dist = extend(commonDist, {
    output: {
        path: './dist',
        filename: config.filename + '.js',
        libraryTarget: 'umd',
        library: config.library,
    },
});

exports.distMin = extend(commonDist, {
    output: {
        path: './dist',
        filename: config.filename + '.min.js',
        libraryTarget: 'umd',
        library: config.library,
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
    ],
});
