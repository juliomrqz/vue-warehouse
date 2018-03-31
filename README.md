[![Bazzite Project](https://img.shields.io/badge/Bazzite-project-blue.svg)](https://www.bazzite.com/docs/vue-warehouse)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6fd62c3807d84982bfbd6e3298707bef)](https://www.codacy.com/app/bazzite/vue-warehouse?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bazzite/vue-warehouse&amp;utm_campaign=Badge_Grade)
[![Travis](https://img.shields.io/travis/bazzite/vue-warehouse.svg)](https://travis-ci.org/bazzite/vue-warehouse)
[![codecov](https://codecov.io/gh/bazzite/vue-warehouse/branch/develop/graph/badge.svg)](https://codecov.io/gh/bazzite/vue-warehouse)
[![David](https://img.shields.io/david/bazzite/vue-warehouse.svg)](https://david-dm.org/bazzite/vue-warehouse)
[![David](https://img.shields.io/david/dev/bazzite/vue-warehouse.svg)](https://david-dm.org/bazzite/vue-warehouse?type=dev)
[![version](https://img.shields.io/npm/v/vue-warehouse.svg?style=flat-square)](https://www.npmjs.com/package/vue-warehouse)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/bazzite/vue-warehouse/develop/LICENSE)

# [BETA] Vue.js Warehouse

A Cross-browser storage for **Vue.js** and **Nuxt.js**, with plugins support and easy extensibility based on **Store.js**. 

This plugin will **pick the best available browser storage**, and automatically **falls back to the first available** storage that works.

## Features

* Backed by the great library [Store.js][storejs]
* Support for multiple Storages (localStorage, cookies, etc.)
* Basic key/value storage functionality (`get/set/remove/each`) 
* Easy integration with Vue.js 
* Support for Nuxt.js
* Get notified when stored values change with Vuex

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```bash
npm install --save vue-warehouse
```

or

```bash
yarn add vue-warehouse
```

## Example of use

Suppose you want to use **localStorage** by default and **cookies** as an alternative in case your user's browser doesn't allow any interaction with **localStorage** (Safari Private mode). Besides, you want to define **defaults values** and an **expiration date** for all the data that is going to be saved.

### Configuration for Vue.js

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import VueWarehouseSync from 'vue-warehouse/sync'

import VuexStore from './vuex/store' // vuex store instance
import VueWarehouseStore from 'store' // vue-warehouse store instance

VueWarehouseSync(VuexStore, VueWarehouseStore)

Vue.use(VueWarehouse, {
  store: VueWarehouseStore,
  plugins: [
    require('store/plugins/expire'),   // Expire stored values at a given time
    require('store/plugins/defaults')  // Declare default values
  ],
  storages: [
    require('store/storages/localStorage'),  // localStorage support
    require('store/storages/cookieStorage')  // cookies support
  ]
})
```

### Configuration for Nuxt.js

```javascript
{
  modules: [
    ['vue-warehouse/nuxt', 
      { 
        vuex: true,
        plugins: [
          'store/plugins/expire',
          'store/plugins/defaults'
        ],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage'
        ]
      }
    ],
  ]
}
```

### API Usage

```javascript
// Define defaults values
this.$warehouse.defaults({ user: { name: 'John Doe' } })

// Change current user with an expiration date of 2 hours starting from now
const expiration = new Date().getTime() + (3600 * 2000)
this.$warehouse.set('user', { name:'Jane Doe' }, expiration)

// Get current user value
this.$warehouse.get('user')

// Get current user expiration
this.$warehouse.getExpiration('user')

// Remove current user
this.$warehouse.remove('user') // return the default value -> { name: 'John Doe' }

// Clear all keys
this.$warehouse.clearAll()

// Loop over all stored values
this.$warehouse.each(function(value, key) {
	console.log(key, '==', value)
})
```

### Vuex State

The last change made to the **browser store** (localStorage, cookie, etc.)

```javascript
// Store current user
this.$warehouse.set('user', { name: 'John Doe' })

// get state values
store.state.warehouse.action    // action performed -> set
store.state.warehouse.key       // key affected     -> user
store.state.warehouse.value     // sent value       -> { name: 'John Doe' }
store.state.warehouse.oldValue  // last value       -> undefined
```

## Documentation & Support

If you want extra details of how to configure and use this plugin, the full documentation is available at [https://www.bazzite.com/docs/vue-warehouse][documentation].

For questions and support, use the [Issues section][issues].

You may also want to [follow the company suporting this project on Twitter][twitter].

## Contributing

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

## Code of Conduct

Everyone participating in this project is expected to agree to abide by the [Code of Conduct][code-of-conduct].

## Comercial Support

This project is sponsored by [Bazzite][bazzite-website]. If you require assistance on your project(s), please contact us at [https://www.bazzite.com/contact][contact-page].

[storejs]: https://github.com/marcuswestin/store.js/
[documentation]: https://www.bazzite.com/docs/vue-warehouse
[contributing]: https://www.bazzite.com/docs/vue-warehouse/contributing
[code-of-conduct]: https://www.bazzite.com/open-source/code-of-conduct/
[issues]: https://github.com/bazzite/vue-warehouse/issues
[twitter]: https://twitter.com/BazziteTech
[bazzite-website]: https://www.bazzite.com
[contact-page]: https://www.bazzite.com/contact