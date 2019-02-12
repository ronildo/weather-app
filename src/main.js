import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bulma/css/bulma.css'

import { FormatDate } from '@/filters/FormatDate'
import { DegreesToCompass } from '@/filters/DegreesToCompass'
import { TemperatureConverter } from '@/filters/TemperatureConverter'
Vue.filter('formatDate', FormatDate)
Vue.filter('degreesToCompass', DegreesToCompass)
Vue.filter('TemperatureConverter', TemperatureConverter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
