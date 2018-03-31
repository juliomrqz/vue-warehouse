import VueWarehouseStore from './store'

const VueWarehouse = {
  install (Vue, options = {}) {
    const moduleName = (options || {}).moduleName || 'warehouse'

    const warehouse = VueWarehouseStore(options)

    Vue.prototype['$' + moduleName] = warehouse
    Vue[moduleName] = warehouse
  }
}

export default VueWarehouse
