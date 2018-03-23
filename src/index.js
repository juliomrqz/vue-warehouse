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
    let store = options.store
    const engine = options.engine

    if (!store && !engine) {
      throw new Error("You must define the 'store' or 'engine' option")
    }

    if (!options.storages) {
      // Add plugins
      if (options.plugins) {
        options.plugins.forEach(plugin => {
          store.addPlugin(plugin)
        })
      }
    } else {
      store = engine.createStore(options.storages, options.plugins)
    }

    Vue.prototype.$warehouse = store
    Vue.warehouse = store
  }
}

export default VueWarehouse
