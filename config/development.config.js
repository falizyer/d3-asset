"use strict";
const {argv} = require("yargs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                production: argv.production
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks(module)  {
                return isExternal(module);
            }
        }),
        new HtmlWebpackPlugin({
            template: "./index.ejs",
            target: "head"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

function isExternal(module) {
    let userRequest = module.userRequest;

    if (typeof userRequest !== "string") {
        return false;
    }

    return userRequest.indexOf("bower_components") >= 0 ||
        userRequest.indexOf("node_modules") >= 0 ||
        userRequest.indexOf("libraries") >= 0 ||
        userRequest.indexOf("!") < 0;
}
