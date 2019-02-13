import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.css'

// Plugins
import VueAxiosPlugin from '@/plugins/axios'

// Filters
import { FromUnix } from '@/filters/FromUnix'
import { FormatDate } from '@/filters/FormatDate'
import { DegreesToCompass } from '@/filters/DegreesToCompass'
import { TemperatureConverter } from '@/filters/TemperatureConverter'

// Instantiate Filters
Vue.filter('fromUnix', FromUnix)
Vue.filter('formatDate', FormatDate)
Vue.filter('degreesToCompass', DegreesToCompass)
Vue.filter('TemperatureConverter', TemperatureConverter)
Vue.use(VueAxiosPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
