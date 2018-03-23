import Vue from 'vue'
import VueWarehouse from '@/index'

describe('VueWarehouse No settings', () => {
  it('should ask for a store or engine', () => {
    expect(() => {
      Vue.use(VueWarehouse)
    }).toThrowError(
      new Error("You must define a 'store' or an 'engine'")
    )
  })

  it('should ask for an engine when storages are defined', () => {
    expect(() => {
      Vue.use(VueWarehouse, {
        store: require('store'),
        storages: [
          require('store/storages/localStorage'),
          require('store/storages/cookieStorage')
        ]
      })
    }).toThrowError(
      new Error("You must define an 'engine' when storages are defined")
    )
  })
})
