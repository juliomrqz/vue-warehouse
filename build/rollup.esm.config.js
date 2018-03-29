require('./check-versions')();

import buble from 'rollup-plugin-buble';
import filesize from 'rollup-plugin-filesize';

const base = {
  plugins: [
    buble({
      objectAssign: 'Object.assign'
    }),
    filesize()
  ]
}

export default [
  Object.assign({}, base, {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/vue-warehouse.esm.js',
        format: 'es'
      }
    ]
  }),
  Object.assign({}, base, {
    input: 'src/warehouse.js',
    output: [
      {
        file: 'dist/warehouse.esm.js',
        format: 'es'
      }
    ]
  })
]
