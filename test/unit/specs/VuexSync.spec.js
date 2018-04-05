import Vue from 'vue'
import Vuex from 'vuex'
import WarehouseSync from '@/sync'
import WarehouseStore from '@/store'

Vue.use(Vuex)

const run = (originalModuleName, done) => {
  const moduleName = originalModuleName || 'warehouse'

  const store = new Vuex.Store({
    state: { msg: 'foo' }
  })

  const warehouseStore = WarehouseStore({
    store: require('store')
  })

  WarehouseSync(store, warehouseStore, {
    moduleName: originalModuleName
  })

  // Set new user
  warehouseStore.set('user', 'John')

  expect(store.state[moduleName].key).toBe('user')
  expect(store.state[moduleName].value).toEqual('John')
  expect(store.state[moduleName].oldValue).toBe(undefined)

  // Update user
  warehouseStore.set('user', 'Jane')

  expect(store.state[moduleName].key).toBe('user')
  expect(store.state[moduleName].value).toEqual('Jane')
  expect(store.state[moduleName].oldValue).toBe('John')

  // Remove user
  warehouseStore.remove('user')

  expect(store.state[moduleName].key).toBe('user')
  expect(store.state[moduleName].value).toEqual(undefined)
  expect(store.state[moduleName].oldValue).toBe('Jane')

  // Clear all values
  warehouseStore.set('user', 'Jane')
  warehouseStore.set('id', 1)
  warehouseStore.clearAll()

  expect(store.state[moduleName].key).toBe('user')
  expect(store.state[moduleName].value).toEqual(undefined)
  expect(store.state[moduleName].oldValue).toBe('Jane')

  Vue.nextTick(() => {
    done()
  })
}

describe('Warehouse Vuex Sync', () => {
  test('default usage #1', done => {
    run(null, done)
  })
  test('with custom moduleName #1', done => {
    run('moduleName', done)
  })
})

describe('Warehouse Vuex Unsync', () => {
  test('unsync', done => {
    const store = new Vuex.Store()

    /* eslint-disable-next-line no-undef */
    spyOn(store, 'watch').and.callThrough()

    const warehouseStore = WarehouseStore({
      store: require('store')
    })

    const moduleName = 'testDesync'
    const unsync = WarehouseSync(store, warehouseStore, {
      moduleName: moduleName
    })

    expect(unsync).toBeInstanceOf(Function)

    // Test module registered, store watched
    expect(store.state[moduleName]).toBeDefined()
    expect(store.watch).toHaveBeenCalled()
    expect(store._watcherVM).toBeDefined()
    expect(store._watcherVM._watchers).toBeDefined()
    expect(store._watcherVM._watchers.length).toBe(1)
    expect(store._watcherVM._watchers.length).toBe(1)

    expect(warehouseStore._setForceCommit()).toBeUndefined()
    expect(warehouseStore._getForceCommit()).toBeTruthy()
    expect(warehouseStore._unsetForceCommit()).toBeUndefined()
    expect(warehouseStore._getForceCommit()).toBeFalsy()

    // Now unsync warehouse vuex sync
    unsync()

    // Ensure store-unwatched, module unregistered and
    // disabled internal syncing
    expect(store._watcherVm).toBeUndefined()
    expect(store.state[moduleName]).toBeUndefined()
    expect(warehouseStore._getForceCommit()).toBeFalsy()

    done()
  })
})
