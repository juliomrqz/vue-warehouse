---
title: "Primeros pasos"
description: "Almacenamiento entre navegadores para Vue.js and Nuxt.js, con soporte de complementos y fácil extensibilidad basado en Store.js."
createdAt: "2018-03-29T10:57:00Z"
publishedAt: "2018-03-30T23:11:58Z"
updatedAt: "2020-07-17T21:03:44Z"
position: 1
category: "Primeros Pasos"
---

# Vue.js Warehouse

Almacenamiento entre navegadores para **Vue.js** and **Nuxt.js**, con soporte de complementos y fácil extensibilidad basado en **Store.js**.

Este plugin **seleccionará el mejor almacenamiento de navegador disponible**, y automáticamente **regresa al primer almacenamiento** disponible que funcione.

## Caracteristicas

* Respaldado por la gran librería [Store.js][storejs]
* Soporte para múltiples almacenamientos (localStorage, cookies, etc.)
* Funcionalidad básica de almacenamiento de clave/valor (`get/set/remove/each`)
* Fácil integración con Vue.js
* Soporte para Nuxt.js
* Recibe notificaciónes con Vuex cuando cambien los valores almacenados

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

## Uso

Carga a VueWarehouse en tu aplicación global de Vue y define un *store* predeterminado.

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import Store from 'store'

Vue.use(VueWarehouse, {
  store: Store
})
```

Un **store** expone una API simple para almacenamiento local entre navegadores. En este ejemplo, `import Store from 'store'` carfa el [store predeterminado][store-default-api] por **Store.js**.

Dentro de una instancia de Vue, tienes acceso a la instancia de vue-warehouse como **$warehouse**. Por lo tanto, puedes llamar:

```javascript
// Almacenar el usuario actual
this.$warehouse.set('user', { name: 'John Doe' })

// Obtiene usuario actual
this.$warehouse.get('user')

// Eliminar usuario actual
this.$warehouse.remove('user')

// Borrar todas las claves
this.$warehouse.clearAll()

// Loop sobre todos los valores almacenados
this.$warehouse.each(function(value, key) {
	console.log(key, '==', value)
})
```

## Complementos (plugins)

Cualquier complemento compatible con **Store.js** se puede usar. Puedes crear un complemento personalizado o usar cualquiera de esta [lista][store-plugins-list].

Veamos un ejemplo donde puedes definir una fecha de vencimiento y valores predeterminados:

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

Luego, puedes llamar el API en una instancia de Vue:

```javascript
// Define valores predeterminados
this.$warehouse.defaults({ user: { name: 'John Doe' } })

// Obtiene usuario actual
this.$warehouse.get('user') // -> { name: 'John Doe' }

// Cambiar el usuario actual con una fecha de vencimiento de 2 horas a partir de ahora
const expiration = new Date().getTime() + (3600 * 2000)
this.$warehouse.set('user', { name:'Jane Doe' }, expiration)

// Obtiene la caducidad del usuario actual
this.$warehouse.getExpiration('user')

// Elimina usuario actual
this.$warehouse.remove('user') // devuelve el valor predeterminado -> { name: 'John Doe' }
```

## Almacenamientos (storages)

Se puede usar cualquier almacenamiento que sea compatible con **Store.js**. Se escogerá el mejor almacenamiento disponible y automáticamente volverá al primer almacenamiento disponible que funcione.

Un Almacenamiento básicamente define dónde se almacenarán los datos. Puedes crear un [almacenamiento personalizado][store-custom-storage] o usas alguno de esta [lista][store-storages-list].

Supongamos que deseas utilizar **localStorage** de forma predeterminada y **cookies** como alternativa en caso de que el navegador de tu usuario no permita ninguna interacción con **localStorage** (modo privado de Safari).

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

## *Store* Personalizado

Puede crear *store* personalizados como se describe [acá][store-custom-storage] y enviarlo a **Vue.js Warehouse** usando dos métodos diferentes. Por ejemplo:

### Definir un motor (engine), almacenamientos (storages) y complementos (plugins)

```javascript
// Define un motor, almacenamientos y complementos
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

### Método #1

Usando el atributo `store`:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'

// ... [definicion del motor, almacenamientos y complementos acá]

Vue.use(VueWarehouse, {
  store: engine.createStore(storages, plugins)
})
```

### Method #2

O dejar que **Vue.js Warehouse** cree el **store** por tí:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'

// ... [definicion del motor, almacenamientos y complementos acá]

Vue.use(VueWarehouse, {
  engine: engine,
  plugins: plugins,
  storages: storages
})
```

### Nota

Si defines la propiedad `storages`, debes deininir un **motoro (engine)**. Los complementos son siempre opcionales.

## Nombre personalizado del módulo

Si por algún motivo deseas cambiar el nombre del módulo, puedes hacerlo de esta manera:

```javascript
import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'
import Store from 'store'

Vue.use(VueWarehouse, {
  store: Store,
  moduleName: 'baulDeLosRecuerdos'
})
```

Ahora puedes acceder al API de esta manera:

```javascript
// Almacena el usuario actual
this.$baulDeLosRecuerdos.set('user', { name: 'John Doe' })

// Obtiene el usuario actual
this.$baulDeLosRecuerdos.get('user')

// Elimina el usuario actual
this.$baulDeLosRecuerdos.remove('user')

// Borrar todas las claves
this.$baulDeLosRecuerdos.clearAll()
```

## Opciones

A continuación se encuentran todas las opciones compatibles con que puedes jugar.

<div class="table-responsive">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th style="text-align:left">Nombre</th>
        <th style="text-align:left">Tipo</th>
        <th style="text-align:left">Descripción</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align:left">
          <code>moduleName</code>
        </td>
        <td style="text-align:left">String</td>
        <td style="text-align:left">El nombre utilizado para acceder al módulo en una instancia de Vue.
        <br><strong>Valor por defecto:</strong> warehouse</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>store</code>
        </td>
        <td style="text-align:left">Object</td>
        <td style="text-align:left">Un *store* reúne el motor, los almacenamientos y los complementos</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>engine</code>
        </td>
        <td style="text-align:left">Object</td>
        <td style="text-align:left">Un motor crea la API</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>storages</code>
        </td>
        <td style="text-align:left">Array of objects</td>
        <td style="text-align:left">Una lista de almacenamientos. Un almacenamiento define dónde se almacenarán los datos.</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>plugins</code>
        </td>
        <td style="text-align:left">Array of objects</td>
        <td style="text-align:left">Una lista de complementos. Un complemento extiende la funcionalidad predeterminada de almacenamiento de clave/valor.</td>
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
