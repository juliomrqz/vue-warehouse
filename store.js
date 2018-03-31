'use strict';

function store (options) {
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

module.exports = store;
