"use strict";
const path = require("path");
const webpack = require("webpack");
const WebpackCleanPlugin = require("webpack-clean");
const config = require("./default.config");
const {plugins, devtool} = require("./development.config");

const webpackConfig = {
    context: config.context,
    entry: config.source.entry,
    devtool,
    output: {
        path: path.resolve(config.context, config.dist.path),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        root: [path.resolve(config.context, config.source.path)],
        modulesDirectories: ["node_modules"],
        extensions: ["", ".css", ".js"]
    },
    plugins: [
        new WebpackCleanPlugin([
            "dist/"
        ]),
        ...plugins
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/,
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: config.babel
        }]
    }
};

module.exports = webpackConfig;
