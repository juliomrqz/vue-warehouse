(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueWarehouseSync = {})));
}(this, (function (exports) { 'use strict';

  // Based on https://github.com/vuejs/vuex-router-sync/blob/master/src/index.js
  var undefinedChanges = {
    action: undefined,
    key: '',
    value: undefined,
    oldValue: undefined
  };

  function sync (store, warehouseStore, options) {
    var moduleName = (options || {}).moduleName || 'warehouse';

    store.registerModule(moduleName, {
      namespaced: true,
      state: cloneWarehouse(null, warehouseStore, vuexPlugin),
      mutations: {
        WAREHOUSE_CHANGED: function WAREHOUSE_CHANGED (state, changes) {
          store.state[moduleName] = cloneWarehouse(changes, null, null);
        }
      }
    });

    function vuexPlugin () {
      var _forceCommit = true;

      return {
        set: set,
        remove: remove,
        clearAll: clearAll,
        _setForceCommit: _setForceCommit,
        _getForceCommit: _getForceCommit,
        _unsetForceCommit: _unsetForceCommit
      }

      // overwrite function to fire when appropriate
      function set (superFn, key, value) {
        var oldValue = this.get(key);
        superFn();

        var changes = {
          action: 'set',
          key: key,
          value: value,
          oldValue: oldValue
        };

        commitChanges(changes, _forceCommit);
      }
      function remove (superFn, key) {
        var oldValue = this.get(key);
        superFn();

        var changes = {
          action: 'remove',
          key: key,
          value: undefined,
          oldValue: oldValue
        };

        commitChanges(changes, _forceCommit);
      }
      function clearAll (superFn) {
        var oldValues = {};
        this.each(function (value, key) {
          oldValues[key] = value;
        });

        superFn();

        Object.keys(oldValues).forEach(function (key) {
          var oldValue = oldValues[key];

          var changes = {
            action: 'clearAll',
            key: key,
            value: undefined,
            oldValue: oldValue
          };

          commitChanges(changes, _forceCommit);
        });
      }
      function _setForceCommit () {
        _forceCommit = true;
      }
      function _unsetForceCommit () {
        _forceCommit = false;
      }
      function _getForceCommit () {
        return _forceCommit
      }
    }

    var currentChanges = Object.freeze(undefinedChanges);

    // sync warehouse on store change
    var warehouseUnwatch = store.watch(
      function (state) { return state[moduleName]; },
      function (warehouse) {
        if (warehouse === currentChanges) {
          return
        }

        warehouseStore._unsetForceCommit();
        warehouseStore.set(warehouse.key, warehouse.value);
        warehouseStore._setForceCommit();
      },
      { sync: true }
    );

    // sync store on router navigation
    var commitChanges = function (changes, forceCommit) {
      if ( forceCommit === void 0 ) forceCommit = true;

      currentChanges = changes;

      if (forceCommit) {
        store.commit((moduleName + "/WAREHOUSE_CHANGED"), changes);
      }
    };

    return function unsync () {
      // On unsync, remove warehouse watch
      if (warehouseUnwatch != null) {
        warehouseUnwatch();
      }

      // Removing the plugin is not possible,
      // so we disable the internal syncing
      if (warehouseStore) {
        warehouseStore._unsetForceCommit();
      }

      // On unsync, unregister Module with store
      store.unregisterModule(moduleName);
    }
  }

  function cloneWarehouse (changes, warehouseStore, vuexPlugin) {
    // Register vuexPlugin
    if (warehouseStore && vuexPlugin) {
      warehouseStore.addPlugin(vuexPlugin);
    }

    var clone = changes;

    if (!changes) {
      clone = undefinedChanges;
    }

    return Object.freeze(clone)
  }

  exports.default = sync;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
