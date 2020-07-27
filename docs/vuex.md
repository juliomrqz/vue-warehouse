---
title: "Vuex Support"
description: "Vue.js Warehouse support for syncing the stored values changes with Vuex state."
createdAt: "2018-03-20T10:57:00Z"
publishedAt: "2018-03-30T23:22:23Z"
updatedAt: "2020-07-17T21:03:44Z"
position: 2
category: "Getting started"
---

The stored browser values (localStorage, cookie, etc.) changes can be synced with Vuex state. For example:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import VueWarehouseSync from 'vue-warehouse/sync'

import VuexStore from './Vuex/store' // Vuex store instance
import VueWarehouseStore from 'store' // vue-warehouse store instance

const unsync = VueWarehouseSync(VuexStore, VueWarehouseStore) // done. Returns an unsync callback function

Vue.use(VueWarehouse, {
  store: VueWarehouseStore
})

// bootstrap your app...

// During app/Vue teardown (e.g., you only use Vue.js in a portion of your app and you
// navigate away from that portion and want to release/destroy Vue components/resources)
unsync() // Unsyncs store from VueWarehouse
```

You can optionally set a custom Vuex module name:

```javascript
VueWarehouseSync(
  VuexStore,
  VueWarehouseStore,
  { moduleName: 'vuexTrunkOfMemories' }
)
```

## How does it work?

- It adds a `warehouse` module into the **Vuex store**, which contains the state representing the last change made to the **browser store** (localStorage, cookie, etc.):

  ```javascript
  store.state.warehouse.action    // action performed (set, remove, clearAll)
  store.state.warehouse.key       // key affected
  store.state.warehouse.value     // sent value
  store.state.warehouse.oldValue  // last value before performing the action
  ```

- When an action is performed with vue-warehouse, the **Vuex store's state** is updated.

- **`store.state.warehouse` is immutable, because it is derived state from the changes sent to vue-warehouse, which is the source of truth**. You should not attempt to update the **browser store** (localStorage, cookie, etc.) by mutating the warehouse object. Instead, just call `$warehouse.set()`, `$warehouse.get()`, `$warehouse.remove()` or `$warehouse.clearAll()`.
