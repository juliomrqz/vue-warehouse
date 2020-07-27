---
title: "Getting Started"
description: "A Cross-browser storage for Vue.js and Nuxt.js, with plugins support and easy extensibility based on Store.js."
createdAt: "2018-03-29T10:57:00Z"
publishedAt: "2018-03-30T23:11:58Z"
updatedAt: "2020-07-17T21:03:44Z"
position: 1
category: "Getting started"
---

# Vue.js Warehouse

A Cross-browser storage for **Vue.js** and **Nuxt.js**, with plugins support and easy extensibility based on **Store.js**.

This plugin will **pick the best available browser storage**, and automatically **falls back to the first available** storage that works.

## Features

* Backed by the great library [Store.js][storejs]
* Support for multiple Storages (localStorage, cookies, etc.)
* Basic key/value storage functionality (`get/set/remove/each`)
* Easy integration with Vue.js
* Support for Nuxt.js
* Get notified with Vuex when the stored values change

## Why use this plugin

Some reasons why you could consider to use this plugin:

* Use a **fallback Browser storage** method in case the user's browser has limitations. Safari in Private mode can deny writing data in localStorage.
* Easy extensibility with **Plugins**. Support for expiring stored values at a given time, declare default values, etc.
* A **consistent API** across browsers for a key/value storage functionality.
* Easy definition of **alternative Storage methods**. For example: you could reuse a Vue Component, that relies on a storage method, in the user's browser (using **localStorage**) or a mobile app (using **NativeScript application-settings** module) just by changing the storage method without modifying the internal logic of the component.
* **Synchronization** of stored values changes with **Vuex**.

## Installation

This module is distributed via [npm][npm-homepage] which is bundled with [node][node-homepage] and should be installed as one of your project's `dependencies`:

<docs-code-group>
  <docs-code-block label="Yarn" active>

  ```bash
  yarn add store vue-warehouse
  ```

  </docs-code-block>
  <docs-code-block label="NPM">

  ```bash
  npm install --save store vue-warehouse
  ```

  </docs-code-block>
</docs-code-group>

## Usage

Load VueWarehouse into your vue app globally and define a default store.

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import Store from 'store'

Vue.use(VueWarehouse, {
  store: Store
})
```

A **store** exposes a simple API for cross-browser local storage. In this example, `import Store from 'store'` loads the [default store][store-default-api] by **Store.js**.

Inside of a Vue instance, you have access to the vue-warehouse instance as **$warehouse**. You can therefore call:

```javascript
// Store current user
this.$warehouse.set('user', { name: 'John Doe' })

// Get current user
this.$warehouse.get('user')

// Remove current user
this.$warehouse.remove('user')

// Clear all keys
this.$warehouse.clearAll()

// Loop over all stored values
this.$warehouse.each(function(value, key) {
	console.log(key, '==', value)
})
```

## Plugins

Any plugin that is supported by **Store.js** can be used. You can create a custom plugin or use any from this [list][store-plugins-list].

Let's see an example where you can define an expiration date and default values:


```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'

Vue.use(VueWarehouse, {
  store: require('store'),
  plugins: [
    require('store/plugins/expire'),
    require('store/plugins/defaults')
  ]
})
```

Then, you could call in a Vue instance:

```javascript
// Define defaults values
this.$warehouse.defaults({ user: { name: 'John Doe' } })

// Get current user
this.$warehouse.get('user') // -> { name: 'John Doe' }

// Change current user with an expiration date of 2 hours starting from now
const expiration = new Date().getTime() + (3600 * 2000)
this.$warehouse.set('user', { name:'Jane Doe' }, expiration)

// Get current user expiration
this.$warehouse.getExpiration('user')

// Remove current user
this.$warehouse.remove('user') // return the default value -> { name: 'John Doe' }
```

## Storages

Any storage that is supported by **Store.js** can be used. The best available storage will be picked, and automatically falls back to the first available storage that works.

A Storage basically defines where the data will be stored. You can create a [custom storage][store-custom-storage] or use any from this [list][store-storages-list].

Suppose you want to use **localStorage** by default and **cookies** as an alternative in case your user's browser doesn't allow any interaction with **localStorage** (Safari Private mode).

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import Store from 'store'

Vue.use(VueWarehouse, {
  store: Store,
  plugins: [
    require('store/plugins/expire')
  ],
  storages: [
    require('store/storages/localStorage'),
    require('store/storages/cookieStorage')
  ]
})
```

## Custom store

You can create custom stores as described [here][store-custom-storage] and send it to **Vue.js Warehouse** using two different methods. For example:

### Define engine, storages and plugins

```javascript
// Define engine, storages and plugins
const engine = require('store/src/store-engine')
const storages = [
	require('store/storages/localStorage'),
	require('store/storages/cookieStorage')
]
const plugins = [
	require('store/plugins/defaults'),
	require('store/plugins/expire')
]
// ...
```

### Method #1

Using the `store` attribute:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'

// ... [engine, storages and plugins definition here]

Vue.use(VueWarehouse, {
  store: engine.createStore(storages, plugins)
})
```

### Method #2

Or let **Vue.js Warehouse** create the **store** for you:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'

// ... [engine, storages and plugins definition here]

Vue.use(VueWarehouse, {
  engine: engine,
  plugins: plugins,
  storages: storages
})
```

### Note

If you define the `storages` property, you must define an **engine**. Plugins are are always optional.

## Custom module name

If for any reason you want to change the name of the module you can do it this way:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import Store from 'store'

Vue.use(VueWarehouse, {
  store: Store,
  moduleName: 'trunkOfMemories'
})
```

Now you can access the API this way:

```javascript
// Store current user
this.$trunkOfMemories.set('user', { name: 'John Doe' })

// Get current user
this.$trunkOfMemories.get('user')

// Remove current user
this.$trunkOfMemories.remove('user')

// Clear all keys
this.$trunkOfMemories.clearAll()
```

## Options

Below are all the supported options you can play around.

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th style="text-align:left">Name</th>
        <th style="text-align:left">Type</th>
        <th style="text-align:left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align:left">
          <code>moduleName</code>
        </td>
        <td style="text-align:left">String</td>
        <td style="text-align:left">The name used to access the module in a Vue instance.
        <br><strong>Default value:</strong> warehouse</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>store</code>
        </td>
        <td style="text-align:left">Object</td>
        <td style="text-align:left">A store gather together the engine, storages, and plugins</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>engine</code>
        </td>
        <td style="text-align:left">Object</td>
        <td style="text-align:left">An engine creates the API</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>storages</code>
        </td>
        <td style="text-align:left">Array of objects</td>
        <td style="text-align:left">A list of storages. An storage defines where the data will be stored.</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>plugins</code>
        </td>
        <td style="text-align:left">Array of objects</td>
        <td style="text-align:left">A list of plugins. A plugin extends the default key/value storage functionality.</td>
      </tr>
    </tbody>
  </table>
</div>



[npm-homepage]: https://www.npmjs.com/
[node-homepage]: https://nodejs.org
[storejs]: https://github.com/marcuswestin/store.js/
[store-default-api]: https://github.com/marcuswestin/store.js/#installation
[store-plugins-list]: https://github.com/marcuswestin/store.js/#plugins
[store-custom-storage]: https://github.com/marcuswestin/store.js/#write-your-own-storage
[store-storages-list]: https://github.com/marcuswestin/store.js/#storages
[store-custom-storage]: https://github.com/marcuswestin/store.js/#make-your-own-build
