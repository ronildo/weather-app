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
      path: '/weather/:location',
      name: 'weather',
      props: true,
      component: () => import(
        /* webpackChunkName: "weather" */
        './views/WeatherPage.vue'
      )
    }
  ]
})
