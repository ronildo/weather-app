import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'bulma/css/bulma.css'

// Plugins
import VueAxiosPlugin from '@/plugins/axios'

// Filters
import { FromUnix } from '@/filters/FromUnix'
import { FormatDate } from '@/filters/FormatDate'
import { DegreesToCompass } from '@/filters/DegreesToCompass'
import { TemperatureConverter } from '@/filters/TemperatureConverter'

Vue.filter('fromUnix', FromUnix)
Vue.filter('formatDate', FormatDate)
Vue.filter('degreesToCompass', DegreesToCompass)
Vue.filter('TemperatureConverter', TemperatureConverter)
Vue.use(VueAxiosPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
