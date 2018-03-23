import Vue from 'vue'
import VueWarehouse from '@/index'

describe('VueWarehouse No settings', () => {
  it('should ask for a store or engine', () => {
    expect(() => {
      Vue.use(VueWarehouse)
    }).toThrowError(
      new Error("You must define the 'store' or 'engine' option")
    )
  })
})
