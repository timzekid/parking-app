/*eslint-disable */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
global.Promise = require('bluebird');

module.exports = {
    entry: "./src/main.js",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
            }
        }),
        new ExtractTextPlugin('main.css', {allChunks: true})
    ],
    output: {
        path: __dirname + '/public/static/build/',
        filename: "main.js",
        publicPath: "/static/build/"
    },

    module: {
        noParse: [/autoit.js/],
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer!less")
            },
            { test: /\.jsx$/, loader: "react-hot!babel!eslint-loader", exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: "babel!eslint-loader", exclude: [/node_modules/, /public/] },
            { test: /\.json$/, loader: "json-loader"}
        ]
    },

    eslint: {
        configFile: '.eslintrc'
    },

    devServer: {
        historyApiFallback: true
    }
};
