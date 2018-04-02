import Vue from 'vue'
import Vuex from 'vuex'
import VueWarehouse from 'vue-warehouse'
import VueWarehouseSync from 'vue-warehouse/sync'

import VueWarehouseStore from 'store' // vue-warehouse store instance

console.log(process.env.NODE_ENV)

Vue.use(Vuex)
Vue.use(VueWarehouse, {
  store: VueWarehouseStore
})

const VuexStore = new Vuex.Store()

VueWarehouseSync(VuexStore, VueWarehouseStore)

new Vue({
  store: VuexStore,
  data: {
    saveFormInputDataKey: 'name',
    saveFormInputDataValue: 'Jhon Doe',
    showAlertMessage: false
  },
  methods: {
    save: function () {
      this.$warehouse.set(this.saveFormInputDataKey, this.saveFormInputDataValue)

      this.showAlertMessage = true
    },
    remove: function () {
      this.$warehouse.remove(this.saveFormInputDataKey)

      this.showAlertMessage = true
    },
    clearAll: function () {
      this.$warehouse.clearAll()

      this.showAlertMessage = true
    }
  },
  computed: {
    vuexData () {
      return JSON.stringify({
        key: this.$store.state.warehouse.key || '',
        value: this.$store.state.warehouse.value || '',
        oldValue: this.$store.state.warehouse.oldValue || '',
        action: this.$store.state.warehouse.action || ''
      }, null, '\t')
    }
  },
  template: `   
    <div>  
      <form id="saveForm">
        <div v-if="showAlertMessage" class="alert alert-info fade show" role="alert">
          Don't forget to Check your browser storage
        </div>

        <div class="form-group">
          <label for="saveFormInputDataKey">Data key</label>
          <input 
            v-model="saveFormInputDataKey"
            id="saveFormInputDataKey"
            type="text" 
            class="form-control" 
            placeholder="Enter your data key" 
            value="name">
        </div>
        <div class="form-group">
          <label for="saveFormInputDataValue">Data value</label>
          <input 
            v-model="saveFormInputDataValue"
            id="saveFormInputDataValue"
            type="text" 
            class="form-control" 
            placeholder="Enter your data value">
        </div>

        <button @click.prevent="save" type="submit" class="btn btn-primary">
          Save
        </button>
        <button @click.prevent="remove" type="submit" class="btn btn-danger">
          Remove
        </button>
        <button @click.prevent="clearAll" type="submit" class="btn btn-warning">
          Clear All
        </button>
      </form>

      <hr>

      <form id="retrieveForm">
        <div class="form-group">
          <label for="retrieveFormInputDataValue">Data from Vuex state</label>
          <textarea 
            v-model="vuexData"
            class="form-control" 
            id="retrieveFormInputDataValue"
            rows="7"></textarea>
        </div>
      </form>
    </div>
  `
}).$mount('#app')
