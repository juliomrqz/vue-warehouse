function VueWarehouseStore (options) {
  var store = options.store;
  var engine = options.engine;

  if (options.storages && !engine) {
    throw new Error('You must define an \'engine\' when storages are defined')
  }

  if (!store && !engine) {
    throw new Error('You must define a \'store\' or an \'engine\'')
  }

  if (!options.storages || options.storages.length === 0) {
    // Add plugins
    if (options.plugins) {
      options.plugins.forEach(function (plugin) {
        store.addPlugin(plugin);
      });
    }
  } else {
    store = engine.createStore(options.storages, options.plugins);
  }

  return store
}

var VueWarehouse = {
  install: function install (Vue, options) {
    if ( options === void 0 ) options = {};

    var moduleName = (options || {}).moduleName || 'warehouse';

    var warehouse = VueWarehouseStore(options);

    Vue.prototype['$' + moduleName] = warehouse;
    Vue[moduleName] = warehouse;
  }
};

export default VueWarehouse;
