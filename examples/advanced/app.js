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
    saveDataKey: 'name',
    saveDataExpiration: 10,
    saveDataValue: 'Jhon Doe',
    retrieveDataKey: 'name',
    retrieveDataValue: '',
    retrieveDataRemainingSeconds: 0,
    showAlertMessage: false
  },
  methods: {
    save: function () {
      this.$warehouse.set(
        this.saveDataKey,
        this.saveDataValue,
        new Date().getTime() + (this.saveDataExpiration * 1000))

      this.showAlertMessage = true
    },
    retrieve: function () {
      this.retrieveDataValue = this.$warehouse.get(this.retrieveDataKey)
      this.retrieveDataRemainingSeconds =
        (this.$warehouse.getExpiration(this.retrieveDataKey) - new Date().getTime()) / 1000
    },
    remove: function () {
      this.$warehouse.remove(this.saveDataKey)

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
            <label for="saveDataKey">Data key</label>
            <input 
              v-model="saveDataKey"
              id="saveDataKey"
              type="text" 
              class="form-control" 
              placeholder="Enter your data key" 
              value="name">
          </div>
          <div class="form-group col-md-6">
            <label for="saveDataExpiration">Data expiration (seconds)</label>
            <input 
              v-model="saveDataExpiration"
              id="saveDataExpiration"
              type="number" 
              class="form-control" 
              placeholder="Enter your data expiration" 
              value="name">
          </div>
        </div>

        <div class="form-group">
          <label for="saveDataValue">Data value</label>
          <input 
            v-model="saveDataValue"
            id="saveDataValue"
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
        <div class="form-row">
          <div class="form-group col-md-6">
          <label for="retrieveDataKey">Data key</label>
          <input
            v-model="retrieveDataKey"
            id="retrieveDataKey"
            type="text"
            class="form-control"
            placeholder="Enter the data key" value="name">
          </div>
          <div class="form-group col-md-6">
            <label for="retrieveDataRemainingSeconds">Remaining Seconds</label>
            <input
              v-model="retrieveDataRemainingSeconds"
              id="retrieveDataRemainingSeconds"
              type="number"
              class="form-control"
              disabled="disabled"
              value="name">
          </div>
        </div>

        <div class="form-group">
          <label for="retrieveDataValue">Data value</label>
          <textarea 
            v-model="retrieveDataValue"
            class="form-control" 
            id="retrieveDataValue"></textarea>
        </div>
        <button @click.prevent="retrieve" type="submit" class="btn btn-primary">Retrieve</button>
      </form>
    </div>
  `
}).$mount('#app')
