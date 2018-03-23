'use strict'
require('./check-versions')()

const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  output: {
	path: path.resolve(__dirname, '../dist'),
	filename: 'vue-warehouse.umd.js',
	library: 'VueWarehouse',
	libraryTarget: 'umd'
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    })
  ]
})

module.exports = webpackConfig

