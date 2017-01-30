var merge = require('webpack-merge')
var base = require('./webpack.config.base')

var outputFile = 'ibut-vue2-grid'
var globalName = 'IbutVue2Grid'

module.exports = merge(base, {
  output: {
    path: './dist',
    filename: outputFile + '.common.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
})
