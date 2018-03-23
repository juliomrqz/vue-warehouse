/*
  Nuxt.js module for vue-warehouse
  Usage:
    - Install vue-warehouse
    - Add this into your nuxt.config.js file:
    {
      modules: [
        'vue-warehouse/nuxt'
      ],
      warehouse: {
        store: 'store',
        plugins: [
          'store/plugins/expire'
        ]
      }
    }
*/

const { resolve } = require('path')

module.exports = function Warehouse (moduleOptions) {
  // Merge all option sources
  const options = Object.assign({}, this.options.warehouse, moduleOptions)

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-warehouse.js',
    options
  })
}

module.exports.meta = require('../package.json')
