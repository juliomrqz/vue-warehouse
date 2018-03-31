/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import { WarehouseStoreAPI } from "./warehouse";

declare module 'vue/types/vue' {
  interface VueConstructor {
    $warehouse: WarehouseStoreAPI
  }

  interface Vue {
    $warehouse: WarehouseStoreAPI;
  }
}
