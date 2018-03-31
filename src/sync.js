// Based on https://github.com/vuejs/vuex-router-sync/blob/master/src/index.js
const undefinedChanges = {
  action: undefined,
  key: '',
  value: undefined,
  oldValue: undefined
}

export default (store, warehouseStore, options) => {
  const moduleName = (options || {}).moduleName || 'warehouse'

  store.registerModule(moduleName, {
    namespaced: true,
    state: cloneWarehouse(null, warehouseStore, vuexPlugin),
    mutations: {
      WAREHOUSE_CHANGED (state, changes) {
        store.state[moduleName] = cloneWarehouse(changes, null, null)
      }
    }
  })

  function vuexPlugin () {
    let _forceCommit = true

    return {
      set,
      remove,
      clearAll,
      _setForceCommit,
      _getForceCommit,
      _unsetForceCommit
    }

    // overwrite function to fire when appropriate
    function set (superFn, key, value) {
      const oldValue = this.get(key)
      superFn()

      const changes = {
        action: 'set',
        key: key,
        value: value,
        oldValue: oldValue
      }

      commitChanges(changes, _forceCommit)
    }
    function remove (superFn, key) {
      const oldValue = this.get(key)
      superFn()

      const changes = {
        action: 'remove',
        key: key,
        value: undefined,
        oldValue: oldValue
      }

      commitChanges(changes, _forceCommit)
    }
    function clearAll (superFn) {
      const oldValues = {}
      this.each((value, key) => {
        oldValues[key] = value
      })

      superFn()

      Object.keys(oldValues).forEach((key) => {
        const oldValue = oldValues[key]

        const changes = {
          action: 'clearAll',
          key: key,
          value: undefined,
          oldValue: oldValue
        }

        commitChanges(changes, _forceCommit)
      })
    }
    function _setForceCommit () {
      _forceCommit = true
    }
    function _unsetForceCommit () {
      _forceCommit = false
    }
    function _getForceCommit () {
      return _forceCommit
    }
  }

  let currentChanges = Object.freeze(undefinedChanges)

  // sync warehouse on store change
  const warehouseUnwatch = store.watch(
    state => state[moduleName],
    (warehouse) => {
      if (warehouse === currentChanges) {
        return
      }

      warehouseStore._unsetForceCommit()
      warehouseStore.set(warehouse.key, warehouse.value)
      warehouseStore._setForceCommit()
    },
    { sync: true }
  )

  // sync store on router navigation
  const commitChanges = (changes, forceCommit = true) => {
    currentChanges = changes

    if (forceCommit) {
      store.commit(`${moduleName}/WAREHOUSE_CHANGED`, changes)
    }
  }

  return function unsync () {
    // On unsync, remove warehouse watch
    if (warehouseUnwatch != null) {
      warehouseUnwatch()
    }

    // Removing the plugin is not possible,
    // so we disable the internal syncing
    if (warehouseStore) {
      warehouseStore._unsetForceCommit()
    }

    // On unsync, unregister Module with store
    store.unregisterModule(moduleName)
  }
}

function cloneWarehouse (changes, warehouseStore, vuexPlugin) {
  // Register vuexPlugin
  if (warehouseStore && vuexPlugin) {
    warehouseStore.addPlugin(vuexPlugin)
  }

  let clone = changes

  if (!changes) {
    clone = undefinedChanges
  }

  return Object.freeze(clone)
}
