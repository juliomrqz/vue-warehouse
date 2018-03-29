import Warehouse from './warehouse'

const VueWarehouse = {
  install (
    Vue,
    options = {
      store: null,
      engine: null,
      plugins: null,
      storages: null,
      moduleName: 'warehouse'
    }
  ) {
    const moduleName = (options || {}).moduleName || 'warehouse'

    const warehouse = Warehouse(options)

    Vue.prototype['$' + moduleName] = warehouse
    Vue[moduleName] = warehouse
  }
}

export default VueWarehouse
