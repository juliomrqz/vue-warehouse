---
title: "Soporte para Vuex"
description: "Soporte de Vue.js Warehouse support para sincronizar los cambios de valores almacenados con el estado Vuex."
createdAt: "2018-03-20T10:57:00Z"
publishedAt: "2018-03-30T23:22:23Z"
updatedAt: "2020-07-17T21:03:44Z"
position: 2
category: "Primeros Pasos"
---

Los cambios de los valores almacenados en el navegador del usuario (localStorage, cookie, etc.) se pueden sincronizar con el estado de Vuex. Por ejemplo:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import VueWarehouseSync from 'vue-warehouse/sync'

import VuexStore from './Vuex/store' // instancia store de Vuex
import VueWarehouseStore from 'store' // instancia store de vue-warehouse

const unsync = VueWarehouseSync(VuexStore, VueWarehouseStore) // listo. Devuelve una funcion unsync

Vue.use(VueWarehouse, {
  store: VueWarehouseStore
})

// Arranca tu aplicación ...

// Durante el demontaje de la aplicación/Vue (Por ejemplo, solo usa Vue.js en
// una parte de tu aplicación y navegas fuera de esa porción y deseas
// liberar/destruir los componentes/recursos de Vue)
unsync() // Desincroniza el estado de VueWarehouse
```

Opcionalmente, puedes establecer un nombre personalizado para el estado en Vuex:

```javascript
VueWarehouseSync(
  VuexStore,
  VueWarehouseStore,
  { moduleName: 'vuexbaulDeLosRecuerdos' }
)
```

## ¿Como funciona?

- Añade un módulo `warehouse` al **store de Vuex**, el cual contiene el estado que representa el cambio hecho al **almacenamiento del navegador** (localStorage, cookie, etc.):

  ```javascript
  store.state.warehouse.action    // acción realizada (set, remove, clearAll)
  store.state.warehouse.key       // clave afectada
  store.state.warehouse.value     // valor enviado
  store.state.warehouse.oldValue  // último valor antes de realizar la acción
  ```

- Cuando se realiza una acción con vue-warehouse, el **estado del store de Vuex** es actualizado.

- **`store.state.warehouse` es inmutable, porque es un estado derivado de los cambios enviados a vue-warehouse, que es la fuente de la verdad**. No debes intenta actualizar el **almacenamiento del navegador** (localStorage, cookie, etc.) mediante la mutación del objeto warehouse. En cambio, solo llama `$warehouse.set()`, `$warehouse.get()`, `$warehouse.remove()` o `$warehouse.clearAll()`.
