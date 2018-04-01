import Vue from 'vue'
import VueWarehouse from 'vue-warehouse'

const engine = require('store/src/store-engine')
const storages = [
  require('store/storages/cookieStorage')
]
const plugins = [
  require('store/plugins/expire')
]

Vue.use(VueWarehouse, {
  engine,
  plugins,
  storages
})

new Vue({
  data: {
    saveFormInputDataKey: 'name',
    saveFormInputDataExpiration: 5,
    saveFormInputDataValue: 'Jhon Doe',
    retrieveFormInputDataKey: 'name',
    retrieveFormInputDataValue: '',
    showAlertMessage: false
  },
  methods: {
    save: function () {
      this.$warehouse.set(
        this.saveFormInputDataKey,
        this.saveFormInputDataValue,
        new Date().getTime() + (this.saveFormInputDataExpiration * 1000))

      this.showAlertMessage = true
    },
    retrieve: function () {
      this.retrieveFormInputDataValue = this.$warehouse.get(this.retrieveFormInputDataKey)
    },
    remove: function () {
      this.$warehouse.remove(this.saveFormInputDataKey)

      this.showAlertMessage = true
    }
  },
  template: `   
    <div>  
      <form id="saveForm">
        <div v-if="showAlertMessage" class="alert alert-info fade show text-center" role="alert">
          Don't forget to Check your browser storage
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="saveFormInputDataKey">Data key</label>
            <input 
              v-model="saveFormInputDataKey"
              id="saveFormInputDataKey"
              type="text" 
              class="form-control" 
              placeholder="Enter your data key" 
              value="name">
          </div>
          <div class="form-group col-md-6">
            <label for="saveFormInputDataExpiration">Data expiration (seconds)</label>
            <input 
              v-model="saveFormInputDataExpiration"
              id="saveFormInputDataExpiration"
              type="number" 
              class="form-control" 
              placeholder="Enter your data expiration" 
              value="name">
          </div>
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
      </form>

      <hr>

      <form id="retrieveForm">
        <div class="form-group">
          <label for="retrieveFormInputDataKey">Data key</label>
          <input
            v-model="retrieveFormInputDataKey"
            id="retrieveFormInputDataKey"
            type="text"
            class="form-control"
            placeholder="Enter the data key" value="name">
        </div>
        <div class="form-group">
          <label for="retrieveFormInputDataValue">Data value</label>
          <textarea 
            v-model="retrieveFormInputDataValue"
            class="form-control" 
            id="retrieveFormInputDataValue"></textarea>
        </div>
        <button @click.prevent="retrieve" type="submit" class="btn btn-primary">Retrieve</button>
      </form>
    </div>
  `
}).$mount('#app')
