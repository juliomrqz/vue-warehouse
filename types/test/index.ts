declare var require: any;

import Vue from "vue";
import Vuex from "vuex";

import VueWarehouse from "../index";
import { sync as WarehouseSync } from "../index";
import { store as WarehouseStore } from "../index";

const store = WarehouseStore({
  store: require("store")
});

Vue.use(Vuex);
Vue.use(VueWarehouse, {
  store: store
});

const moduleName = "warehouse";

const VuexStore = new Vuex.Store({
  state: { msg: "foo" }
});

WarehouseSync(VuexStore, store, {
  moduleName: moduleName
});

// Set new user
Vue.prototype.$warehouse.set("user", "John");
// Update user
Vue.prototype.$warehouse.set("user", "Jane");
// Remove user
Vue.prototype.$warehouse.remove("user");
// Clear all values
Vue.$warehouse.clearAll();

Vue.prototype.$store.state[moduleName].key;
Vue.prototype.$store.state[moduleName].value;
Vue.prototype.$store.state[moduleName].oldValue;