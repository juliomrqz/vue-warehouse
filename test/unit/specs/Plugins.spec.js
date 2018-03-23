import Vue from 'vue'
import VueWarehouse from '@/index'

const expiration = new Date().getTime() + (3600 * 60)

Vue.use(VueWarehouse, {
  store: require('store'),
  plugins: [
    require('store/plugins/expire'),
    require('store/plugins/defaults')
  ]
})

const defaultUser = { name: 'Doe' }
Vue.prototype.$warehouse.defaults({ user: defaultUser })

describe('VueWarehouse Plugins settings', () => {
  it('should be a default value', () => {
    expect(Vue.prototype.$warehouse.get('user')).toEqual(defaultUser)
    expect(Vue.prototype.$warehouse.get('user').name).toBe(defaultUser.name)
  })

  it('should set a variable', () => {
    const user = { name: 'Marcus' }

    // Set User
    Vue.prototype.$warehouse.set('user', user, expiration)

    expect(Vue.prototype.$warehouse.get('user')).toEqual(user)
    expect(Vue.prototype.$warehouse.get('user').name).toBe(user.name)
    expect(Vue.prototype.$warehouse.getExpiration('user')).toBeGreaterThan(0)
  })

  it('should change a existing variable', () => {
    const user2 = { name: 'John' }

    // Set User2
    Vue.prototype.$warehouse.set('user', user2, expiration)

    expect(Vue.prototype.$warehouse.get('user')).toEqual(user2)
    expect(Vue.prototype.$warehouse.get('user').name).toBe(user2.name)
    expect(Vue.prototype.$warehouse.getExpiration('user')).toBeGreaterThan(0)
  })

  it('should remove a variable', () => {
    // Remove User
    Vue.prototype.$warehouse.remove('user')

    expect(Vue.prototype.$warehouse.get('user')).toEqual(defaultUser)
    expect(Vue.prototype.$warehouse.get('user').name).toBe(defaultUser.name)
    expect(Vue.prototype.$warehouse.getExpiration('user')).toEqual(undefined)
  })
})
