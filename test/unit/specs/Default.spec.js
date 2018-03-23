import Vue from 'vue'
import VueWarehouse from '@/index'

Vue.use(VueWarehouse, {
  store: require('store')
})

describe('VueWarehouse Default settings', () => {
  it('should set a variable', () => {
    const user = { name: 'Marcus' }

    // Set User
    Vue.prototype.$warehouse.set('user', user)

    expect(Vue.prototype.$warehouse.get('user')).toEqual(user)
    expect(Vue.prototype.$warehouse.get('user').name).toBe(user.name)
  })

  it('should change a existing variable', () => {
    const user2 = { name: 'John' }

    // Set User2
    Vue.prototype.$warehouse.set('user', user2)

    expect(Vue.prototype.$warehouse.get('user')).toEqual(user2)
    expect(Vue.prototype.$warehouse.get('user').name).toBe(user2.name)
  })

  it('should remove a variable', () => {
    // Remove User
    Vue.prototype.$warehouse.remove('user')

    expect(Vue.prototype.$warehouse.get('user')).toEqual(undefined)
  })
})
