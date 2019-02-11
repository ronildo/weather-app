import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(
        /* webpackChunkName: "home" */
        './views/HomePage.vue'
      )
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import(
        /* webpackChunkName: "weather" */
        './views/WeatherPage.vue'
      )
    }
  ]
})
