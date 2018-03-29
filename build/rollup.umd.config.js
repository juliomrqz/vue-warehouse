require('./check-versions')()

import buble from 'rollup-plugin-buble'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

export default {
  input: 'src/index.js',
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
    uglify(),
    filesize()
  ],
  output: [
    {
      name: 'VueWarehouse',
      exports: 'named',
      file: `dist/vue-warehouse.js`,
      format: 'umd'
    }
  ]
}