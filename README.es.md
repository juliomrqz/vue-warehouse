[![Proyecto Bazzite](https://img.shields.io/badge/Proyecto-Bazzite-blue.svg)](https://www.bazzite.com/docs/vue-warehouse)
[![Codacy Badge](https://img.shields.io/codacy/grade/6fd62c3807d84982bfbd6e3298707bef.svg)](https://www.codacy.com/app/bazzite/vue-warehouse?utm_source=github.com&utm_medium=referral&utm_content=bazzite/vue-warehouse&utm_campaign=Badge_Grade)
[![Travis](https://img.shields.io/travis/bazzite/vue-warehouse.svg)](https://travis-ci.org/bazzite/vue-warehouse)
[![Build status](https://ci.appveyor.com/api/projects/status/5ihdnfef7siyph3n?svg=true)](https://ci.appveyor.com/project/bazzite/vue-warehouse)
[![codecov](https://img.shields.io/codecov/c/github/bazzite/vue-warehouse/develop.svg)](https://codecov.io/gh/bazzite/vue-warehouse)
[![David](https://img.shields.io/david/peer/bazzite/vue-warehouse.svg)](https://david-dm.org/bazzite/vue-warehouse?type=peer)
[![David](https://img.shields.io/david/dev/bazzite/vue-warehouse.svg)](https://david-dm.org/bazzite/vue-warehouse?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/bazzite/vue-warehouse.svg)](https://greenkeeper.io/)
[![version](https://img.shields.io/npm/v/vue-warehouse.svg)](https://www.npmjs.com/package/vue-warehouse)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/bazzite/vue-warehouse/develop/LICENSE)

# Vue.js Warehouse

Almacenamiento entre navegadores para **Vue.js** and **Nuxt.js**, con soporte de complementos y fácil extensibilidad basado en **Store.js**.

Este plugin **seleccionará el mejor almacenamiento de navegador disponible**, y automáticamente **regresa al primer almacenamiento** disponible que funcione.

*Read this in other languages: [English](README.md), [Español](README.es.md)*

## Características

* Respaldado por la gran librería [Store.js][storejs]
* Soporte para múltiples almacenamientos (localStorage, cookies, etc.)
* Funcionalidad básica de almacenamiento de clave/valor (`get/set/remove/each`)
* Fácil integración con Vue.js
* Soporte para Nuxt.js
* Recibe notificaciones con Vuex cuando cambien los valores almacenados

## Por qué usar este plugin

Algunas razones por las que podrías considerar usar este complemento:

* Usar un método de **almacenamiento de navegador alternativo** en caso de que el navegador del usuario tenga limitaciones. Safari en modo privado puede denegar la escritura de datos en localStorage.
* Fácil extensibilidad con **complementos**. Soporte para expirar valores almacenados en un momento dado, declarar valores predeterminados, etc.
* Una **API consistente** en todos los navegadores para una funcionalidad de almacenamiento de clave/valor.
* Definición fácil de **métodos de almacenamiento alternativos**. Por ejemplo: puede reutilizar un Componente Vue, que depende de en un método de almacenamiento, en el navegador del usuario (usando **localStorage**) o una aplicación móvil (usando el módulo **application-settings de NativeScript**) simplemente cambiando el método de almacenamiento sin modificar la lógica interna del componente.
* **Sincronización** de los cambios de los valores almacenados con **Vuex**.

## Instalación

Este módulo se distribuye a través de [npm][npm-homepage] el cual es armado con [node][node-homepage] y debería ser instalado como una de las `dependencias` de tu proyecto:

```bash
npm install --save store vue-warehouse
```

o

```bash
yarn add store vue-warehouse
```

## Ejemplo de Uso

Supongamos que deseas utilizar **localStorage** de forma predeterminada y **cookies** como alternativa en caso de que el navegador de tu usuario no permita ninguna interacción con **localStorage** (modo privado de Safari). Además, quieres definir **valores predeterminados** y una **fecha de expiración** para toda la información que va a ser guardada.

### Configuración para Vue.js

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import VueWarehouseSync from 'vue-warehouse/sync'

import VuexStore from './vuex/store' // instancia store de Vuex
import VueWarehouseStore from 'store' // instancia store de vue-warehouse

VueWarehouseSync(VuexStore, VueWarehouseStore)

Vue.use(VueWarehouse, {
  store: VueWarehouseStore,
  plugins: [
    require('store/plugins/expire'),   // Expira la información a un tiempo determinado
    require('store/plugins/defaults')  // Declarar valores predeterminados
  ],
  storages: [
    require('store/storages/localStorage'),  // soporte para localStorage
    require('store/storages/cookieStorage')  // soporte para cookies
  ]
})
```

### Configuración para Nuxt.js

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

### Uso del API

```javascript
// Define valores predeterminados
this.$warehouse.defaults({ user: { name: 'John Doe' } })

// Cambia el usuario actual con una fecha de expiración de 2 horas a
// partir de ahora
const expiration = new Date().getTime() + (3600 * 2000)
this.$warehouse.set('user', { name:'Marie Doe' }, expiration)

// Obtiene el valor actual del usuario
this.$warehouse.get('user')

// Obtiene la fecha de expiración actual
this.$warehouse.getExpiration('user')

// Elimina el usuario actuals
this.$warehouse.remove('user') // regresa el valor predeterminado -> { name: 'John Doe' }

// Borrar todas las claves
this.$warehouse.clearAll()

// Loop sobre todos los valores almacenados
this.$warehouse.each(function(value, key) {
  console.log(key, '==', value)
})
```

### Estado de Vuex

Los últimos cambios hechos al **almacenamiento del navegador** (localStorage, cookie, etc.) son sincronizados con el estado de Vuex:

```javascript
// Almacena el usuario actual
this.$warehouse.set('user', { name: 'John Doe' })

// Actualiza el usuario actual
this.$warehouse.set('user', { name: 'Marie Doe' })

// obtiene los valores del estado
store.state.warehouse.action    // acción realizada -> set
store.state.warehouse.key       // clave afectada   -> user
store.state.warehouse.value     // valor enviado    -> { name: 'Marie Doe' }
store.state.warehouse.oldValue  // último valor     -> { name: 'John Doe' }
```

## Documentación y Soporte

Si deseas detalles extras acerca de como configurar y usar este plugin, la documentación completa está disponible en [https://www.bazzite.com/es/docs/vue-warehouse][documentation].

Para preguntas y soporte, usa la [seción de Problemas (Issues)][issues].

Quizás quieras [seguir en Twitter a la compañía que soporta este proyecto][twitter].

### Soporte Comercial

Este proyecto está patrocinado por [Bazzite][bazzite-website]. Si necesita ayuda en tu(s) proyecto(s), contáctanos en [https://www.bazzite.com/es/contact][contact-page].

## Contribución

Por favor, asegúrate de leer la [Guía de Contribución][contributing] antes de hacer un pull request.

## Código de Conducta

Se espera que todos los que participen en este proyecto acepten acatar el [Código de Conducta][code-of-conduct].

## Licencia

Código publicado bajo la [Licencia MIT][license-page].

[npm-homepage]: https://www.npmjs.com/
[node-homepage]: https://nodejs.org
[storejs]: https://github.com/marcuswestin/store.js/
[documentation]: https://www.bazzite.com/es/docs/vue-warehouse?utm_source=github&utm_medium=readme&utm_campaign=vue-warehouse
[contributing]: https://www.bazzite.com/es/docs/vue-warehouse/contributing?utm_source=github&utm_medium=readme&utm_campaign=vue-warehouse
[code-of-conduct]: https://www.bazzite.com/es/open-source/code-of-conduct?utm_source=github&utm_medium=readme&utm_campaign=vue-warehouse
[issues]: https://github.com/bazzite/vue-warehouse/issues
[twitter]: https://twitter.com/BazziteES
[bazzite-website]: https://www.bazzite.com/es?utm_source=github&utm_medium=readme&utm_campaign=vue-warehouse
[contact-page]: https://www.bazzite.com/es/contact?utm_source=github&utm_medium=readme&utm_campaign=vue-warehouse
[license-page]: https://www.bazzite.com/es/docs/vue-warehouse/license?utm_source=github&utm_medium=readme&utm_campaign=vue-warehouse
