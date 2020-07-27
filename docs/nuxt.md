---
title: "Nuxt.js Support"
description: "Vue.js Warehouse support for Nuxt.js"
createdAt: "2018-03-29T10:57:00Z"
publishedAt: "2018-03-30T23:24:15Z"
updatedAt: "2020-07-17T21:03:44Z"
position: 3
category: "Getting started"
---

Configuring the plugin for Nuxt.js is extremely simple and easy.

## Configuration

## Basic

Add **vue-warehouse/nuxt** to modules section of nuxt.config.js

```javascript
{
  modules: [
    'vue-warehouse/nuxt'
  ]
}
```

If no option is specified, `require('store/dist/store.modern')` will be used as a default store, supporting only modern browsers. No plugin or custom engine will be defined.

## Plugins

You can defined plugins indicating the location inside your project structure or an npm package.

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        plugins: [
          '~utils/my-custom-plugin',
          'store/plugins/expire',
          'store/plugins/defaults'
        ]
      }
    ],
  ]
}
```

**Note:** Vue.js Warehouse will include each of that plugins locations as modules, as follows: <br> `require('plugin-location-here')`.

## Storages

You can define storages the same way you define plugins:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        storages: [
          '~utils/my-custom-storage',
          'store/storages/localStorage',
          'store/storages/cookieStorage'
        ]
      }
    ],
  ]
}
```

## Custom engine

Defining a custom engine is not different from defining plugins and storages:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        engine: '~utils/my-custom-engine'
      }
    ],
  ]
}
```

### Custom module name

If for any reason you want to change the name of the module you can do it this way:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        moduleName: 'trunkOfMemories'
      }
    ],
  ]
}
```

## Usage

Inside of a Vue instance or in the Nuxt.js context, you have access to the vue-warehouse instance as **$warehouse**. For example:

**Vue Instance:**

```javascript
// Store the current user
this.$warehouse.set('user', { name:'Marcus' })

// Get the current user
this.$warehouse.get('user')
```

**Nuxt.js context:**

```javascript
export default {
  asyncData (context) {
    const userId = context.$warehouse.get('userId')

    return axios.get(`https://my-api/user/${userId)}`)
    .then((res) => {
      return { name: res.data.name }
    })
  }
}
```

## Vuex Support

The changes of the stored values in the user's browser (localStorage, cookie, etc.) can be synced with Vuex state. You can activate this feature this way:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        vuex: true
      }
    ],
  ]
}
```

You can optionally set a custom vuex module name:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        vuex: {
          moduleName: 'vuexTrunkOfMemories'
        }
      }
    ],
  ]
}
```

## Advanced Usage

For a complete guide of how to use this plugin, go to the [Overview](/docs/vue-warehouse) page.

## Options

Below are all the available options you can use with Nuxt.js.

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
        <td style="text-align:left">String</td>
        <td style="text-align:left">A store gather together the engine, storages, and plugins</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>engine</code>
        </td>
        <td style="text-align:left">String</td>
        <td style="text-align:left">An engine creates the API</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>storages</code>
        </td>
        <td style="text-align:left">An Array of strings</td>
        <td style="text-align:left">A list of storages. A store defines where the data will be stored.</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>plugins</code>
        </td>
        <td style="text-align:left">An Array of strings</td>
        <td style="text-align:left">A list of plugins. A plugin extends the default key/value storage functionality.</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>vuex</code>
        </td>
        <td style="text-align:left">A Boolean or An Object</td>
        <td style="text-align:left">Add support for syncing the stored values changes with Vuex state.</td>
      </tr>
    </tbody>
  </table>
</div>


[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[store.js]: https://github.com/marcuswestin/store.js/
