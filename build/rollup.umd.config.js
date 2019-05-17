require('./check-versions')()

import buble from 'rollup-plugin-buble'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'

const base = (activateTerser = false) => {
  return {
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      buble({
        transforms: {
          dangerousForOf: true
        },
        objectAssign: 'Object.assign'
      }),
      commonjs(),
      replace({
        'process.env': JSON.stringify({
          NODE_ENV: 'production'
        })
      }),
      activateTerser ? terser() : {},
      filesize()
    ]
  }
}

export default [
  Object.assign({}, base(true), {
    input: 'src/index.js',
    output: [
      {
        name: 'VueWarehouse',
        exports: 'named',
        file: 'dist/vue-warehouse.min.js',
        format: 'umd'
      }
    ]
  }),
  Object.assign({}, base(), {
    input: 'src/index.js',
    output: [
      {
        name: 'VueWarehouse',
        exports: 'named',
        file: 'dist/vue-warehouse.js',
        format: 'umd'
      }
    ]
  }),
  Object.assign({}, base(true), {
    input: 'src/sync.js',
    output: [
      {
        name: 'VueWarehouseSync',
        exports: 'named',
        file: 'dist/vue-warehouse-sync.min.js',
        format: 'umd'
      }
    ]
  }),
  Object.assign({}, base(), {
    input: 'src/sync.js',
    output: [
      {
        name: 'VueWarehouseSync',
        exports: 'named',
        file: 'dist/vue-warehouse-sync.js',
        format: 'umd'
      }
    ]
  })
]
