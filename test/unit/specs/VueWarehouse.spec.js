import Vue from 'vue'
import VueWarehouse from '@/index'

Vue.use(VueWarehouse, {
  store: require('store')
})

describe('VueWarehouse', () => {
  it('should add two numbers', () => {
    expect(1 + 2).toBe(3)
  })
})
