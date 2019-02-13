import axios from 'axios'
import { API_KEY } from '@/utils/Constants'

const config = {
  // Use // so the request will http or https based on the browser url
  baseURL: '//api.openweathermap.org/data/2.5/',
  timeout: 60 * 1000 // Timeout
}

const _axios = axios.create(config)

_axios.interceptors.request.use(config => {
  let { url } = config
  config.url = `${url}&APPID=${API_KEY}`

  return config
})

const VueAxiosPlugin = {}

// Use axios as plugin
VueAxiosPlugin.install = (Vue) => {
  Vue.prototype.$API_GET = _axios.get
}

export default VueAxiosPlugin
