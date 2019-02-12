import axios from 'axios'
import { API_KEY } from '@/utils/Constants'

const config = {
  baseURL: '//api.openweathermap.org/data/2.5/',
  timeout: 60 * 1000 // Timeout
}

const _axios = axios.create(config)

_axios.interceptors.request.use(config => {
  let { url } = config
  console.log('url :', url)
  config.url = `${url}&APPID=${API_KEY}`

  return config
})

const VueAxiosPlugin = {}

VueAxiosPlugin.install = (Vue) => {
  Vue.prototype.$API_GET = _axios.get
  Vue.prototype.$API_POST = _axios.post

  // 4. add an instance method
  Vue.prototype.$axios = function (methodOptions) {
    // some logic ...
  }
}

export default VueAxiosPlugin