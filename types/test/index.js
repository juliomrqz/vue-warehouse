import Vue from "vue";
// import Vuex from "vuex";
import VueWarehouse from "../index";
// import WarehouseSync from "../sync";
// import WarehouseStore from '@/store'
var store = require("store");
// Vue.use(Vuex);
Vue.use(VueWarehouse, {
    store: store
});
var moduleName = "warehouse";
// WarehouseSync(Vue.prototype.$store, store, {
//   moduleName: moduleName
// });
// Set new user
Vue.prototype.$warehouse.set("user", "John");
// Vue.prototype.$store.state[moduleName].key;
// Vue.prototype.$store.state[moduleName].value;
// Vue.prototype.$store.state[moduleName].oldValue;
// Update user
Vue.prototype.$warehouse.set("user", "Jane");
// Vue.prototype.$store.state[moduleName].key;
// Vue.prototype.$store.state[moduleName].value;
// Vue.prototype.$store.state[moduleName].oldValue;
// Remove user
Vue.prototype.$warehouse.remove("user");
// Vue.prototype.$store.state[moduleName].key;
// Vue.prototype.$store.state[moduleName].value;
// Vue.prototype.$store.state[moduleName].oldValue;
// Clear all values
Vue.prototype.$warehouse.set("user", "Jane");
Vue.prototype.$warehouse.set("id", 1);
Vue.prototype.$warehouse.clearAll();
// Vue.prototype.$store.state[moduleName].key;
// Vue.prototype.$store.state[moduleName].value;
// Vue.prototype.$store.state[moduleName].oldValue;
