import Warehouse from 'vue-warehouse/dist/warehouse.esm'
<% if (typeof(options.vuex) !== 'undefined') { %>
import WarehouseSync from 'vue-warehouse/dist/sync.esm'
<% } %>

<% if (typeof(options.moduleName) !== 'undefined') { %>
// Define store in options
const moduleName = '<%= options.moduleName %>'
<% } else { %>
// Define default store
const moduleName = 'warehouse'
<% } %>

<% if (typeof(options.store) !== 'undefined') { %>
// Define store in options
import store from '<%= options.store %>'
<% } else { %>
// Define default store
import store from 'store'
<% } %>

<% if (typeof(options.storages) !== 'undefined') { %>
<% if (typeof(options.engine) !== 'undefined') { %>
// Define engine in options
import engine from '<%= options.engine %>'
<% } else { %>
// Define default engine
import engine from 'store/src/store-engine'
<% } %>
<% } %>

<% if (typeof(options.plugins) !== 'undefined') { %>
// Active plugins
<%= options.plugins.map(plugin => `import ${'plugin_' + hash(plugin)} from '${plugin}'`).join('\n') %>
const plugins = [
  <%= options.plugins.map(plugin => 'plugin_' + hash(plugin)).join(',\n  ') %>
]
<% } %>

<% if (typeof(options.storages) !== 'undefined') { %>
// Active storages
<%= options.storages.map(storage => `import ${'storage_' + hash(storage)} from '${storage}'`).join('\n') %>
const storages = [
  <%= options.storages.map(storage => 'storage_' + hash(storage)).join(',\n  ') %>
]
<% } %>


export default (ctx, inject) => {
  const warehouseStore = Warehouse({
    moduleName: moduleName,
  <% if (typeof(options.storages) !== 'undefined') { %>  engine: engine,<% } %>
    store: store,
  <% if (typeof(options.plugins) !== 'undefined') { %>  plugins: plugins,<% } %>
  <% if (typeof(options.storages) !== 'undefined') { %>  storages: storages<% } %>
  })

  <% if (typeof(options.vuex) !== 'undefined') { %>
    <% if (typeof(options.vuex) === 'object') { %>
  const syncModuleName = options.vuex.moduleName
    <% } else { %>
  const syncModuleName = moduleName
    <% } %>

  WarehouseSync(ctx.store, warehouseStore, {
    moduleName: syncModuleName
  })
  <% } %>

  // Inject Warehouse to the context as $moduleName
  ctx['$' + moduleName] = warehouseStore
  inject(moduleName, warehouseStore)
}