"use strict";
const path = require("path");
const {argv} = require("yargs");

const config = {
    get context() {
        return path.resolve(__dirname, "../");
    },
    source: {
        path: "./src",
        get entry() {
            return {
                "d3-asset": `./${path.join(this.path, "d3-asset.js")}`
            };
        }
    },
    dist: {
        path: "./dist"
    },
    babel: {
        presets: ["es2015"],
        plugins: []
    }
};

module.exports = config;
