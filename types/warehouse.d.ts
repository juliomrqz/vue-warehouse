import Vue, { PluginObject, PluginFunction } from "vue";
import { Store } from "vuex";

export class VueWarehouse implements PluginObject<VueWarehouseStoreOptions> {
  install: PluginFunction<VueWarehouseStoreOptions>;

  static install(pVue: typeof Vue, options?: VueWarehouseStoreOptions | undefined): void;
}

// Sync
declare function sync(
  store: Store<any>,
  warehouseStore: WarehouseStoreAPI,
  options: WarehouseSyncOptions
): any;

declare namespace sync {
  const prototype: {};
}

// Internal Store
declare function store(
  options: WarehouseStoreOptions
): WarehouseStoreAPI;

declare namespace store {
  const prototype: {};
}

// Interfaces
interface WarehouseStoreOptions {
  store?: StoreJsAPI;
  engine?: StoreJsEngine;
  plugins?: Function[];
  storages?: any[];
}

interface VueWarehouseStoreOptions extends WarehouseStoreOptions {
  moduleName?: string;
}

export interface WarehouseStoreAPI extends StoreJsAPI {
  _unsetForceCommit(): void;
  _setForceCommit(): void;
  _getForceCommit(): boolean;
}

interface WarehouseSyncOptions {
  moduleName?: string | null;
}

interface StoreJsAPI {
  readonly version: string;
  readonly enabled: boolean;
  get(key: string, optionalDefaultValue?: any): any;
  set(key: string, value: any): any;
  remove(key: string): void;
  each(callback: (val: any, namespacedKey: string) => void): void;
  clearAll(): void;
  hasNamespace(namespace: string): boolean;
  createStore(plugins?: Function[], namespace?: string): StoreJsAPI;
  addPlugin(plugin: Function): void;
  namespace(namespace: string): StoreJsAPI;
}

interface StoreJsEngine {
  createStore(storages: any[], plugins?: any[], namespace?: string): StoreJsAPI;
}