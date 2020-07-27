---
title: "Soporte para Nuxt.js"
description: "Soporte de Vue.js Warehouse para Nuxt.js"
createdAt: "2018-03-29T10:57:00Z"
publishedAt: "2018-03-30T23:24:15Z"
updatedAt: "2020-07-17T21:03:44Z"
position: 3
category: "Primeros Pasos"
---

La configuración de este plugin con Nuxt.js es extremadamente simple y fácil.

## Instalación

El proceso de instalación es el mismo que sigues para Vue.js:

```bash
npm install --save store vue-warehouse
```

o

```bash
yarn add store vue-warehouse
```

## Configuración

## Básica

Añade **vue-warehouse/nuxt** a la sección de módulos de nuxt.config.js

```javascript
{
  modules: [
    'vue-warehouse/nuxt'
  ]
}
```

Si no se especifica ninguna opción, `require('store/dist/store.modern')` se utilizará como un *store* predeterminado, que solo admite navegadores modernos. No se definirá ningún complemento o motor personalizado.

## Complementos (plugins)

Puede sdefinir complementos que indiquen la ubicación dentro de la estructura de tu proyecto o un paquete npm.

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

**Nota:** Vue.js Warehouse incluirá cada una de esas ubicaciones de complementos como módulos, de la siguiente manera: <br> `require('plugin-location-here')`.

## Almacenamientos (storages)

Puedes definir almacenamientos de la misma manera que defines los complementos:

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

## Motor personalizado

Definir un motor personalizado no es muy diferente a la definición de complementos y almacenamientos:

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

## Nombre personalizado del módulo

Si por algún motivo deseas cambiar el nombre del módulo, puedes hacerlo de esta manera:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        moduleName: 'baulDeLosRecuerdos'
      }
    ],
  ]
}
```

## Uso

Dentro de una instancia de Vue o en el contexto de Nuxt.js, tienes acceso a la instancia de vue-warehouse como **$warehouse**. Por ejemplo:

**Instancia de Vue:**

```javascript
// Almacena el usuario actual
this.$warehouse.set('user', { name:'Marcus' })

// Obtiene el usuario actual
this.$warehouse.get('user')
```

**Contexto de Nuxt.js:**

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

## Soporte para Vuex

Los cambios de los valores almacenados en el navegador del usuario (localStorage, cookie, etc.) se pueden sincronizar con el estado de Vuex. Puedes activar esta función de la siguiente manera:

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

Opcionalmente, puedes establecer un nombre personalizado para el estado en Vuex:

```javascript
{
  modules: [
    ['vue-warehouse/nuxt',
      {
        vuex: {
          moduleName: 'vuexbaulDeLosRecuerdos'
        }
      }
    ],
  ]
}
```

## Uso Avanzado

Para obtener una guía completa sobre cómo usar este complemento, ve a la página [Primeros Pasos](/es/docs/vue-warehouse).

## Opciones

A continuación se muestran todas las opciones disponibles que puedes usar con Nuxt.js.

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
        <td style="text-align:left">Cadena de Caracteres</td>
        <td style="text-align:left">El nombre utilizado para acceder al módulo en una instancia de Vue.
        <br><strong>Valor por defecto:</strong> warehouse</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>store</code>
        </td>
        <td style="text-align:left">Cadena de Caracteres</td>
        <td style="text-align:left">Un *store* reúne el motor, los almacenamientos y los complementos</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>engine</code>
        </td>
        <td style="text-align:left">Cadena de Caracteres</td>
        <td style="text-align:left">Un motor crea la API</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>storages</code>
        </td>
        <td style="text-align:left">Un Array de Cadenas de Caracteres</td>
        <td style="text-align:left">Una lista de almacenamientos. Un almacenamiento define dónde se almacenarán los datos.</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>plugins</code>
        </td>
        <td style="text-align:left">Un Array de Cadenas de Caracteres</td>
        <td style="text-align:left">Una lista de complementos. Un complemento extiende la funcionalidad predeterminada de almacenamiento de clave/valor.</td>
      </tr>
      <tr>
        <td style="text-align:left">
          <code>vuex</code>
        </td>
        <td style="text-align:left">Un Buleano o Un Objeto</td>
        <td style="text-align:left">Agregue compatibilidad para sincronizar los cambios de valores almacenados con el estado Vuex.</td>
      </tr>
    </tbody>
  </table>
</div>


[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[store.js]: https://github.com/marcuswestin/store.js/
