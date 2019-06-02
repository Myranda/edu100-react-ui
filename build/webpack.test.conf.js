'use strict';
const merge = require('webpack-merge');
const WebpackDevConfig = require('./webpack.dev.conf').config;

const WebpackTestConfig = merge(WebpackDevConfig, {});

delete WebpackTestConfig.entry;

module.exports = WebpackTestConfig;
