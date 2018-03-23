import Warehouse from './warehouse'

const VueWarehouse = {
  install (
    Vue,
    options = {
      store: null,
      engine: null,
      plugins: null,
      storages: null
    }
  ) {
    const warehouse = Warehouse(options)

    Vue.prototype.$warehouse = warehouse
    Vue.warehouse = warehouse
  }
}

export default VueWarehouse
