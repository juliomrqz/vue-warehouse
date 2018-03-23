/*
  Nuxt.js module for bootstrap-vue
  Usage:
    - Install both bootstrap and bootstrap-vue packages
    - Add this into your nuxt.config.js file:
    {
      modules: [
        'vue-warehouse/nuxt'
      ],
      warehouse: {
        store: 'store',
        engine: 'store/src/store-engine',
        plugins: [
          'store/plugins/expire',
          'store/plugins/defaults',
          '~/utils/custom-plugin.js',
        ],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage'
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