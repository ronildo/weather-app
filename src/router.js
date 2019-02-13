import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // split component into chunks
      component: () => import(
        // This comment below gives the chunk a name
        /* webpackChunkName: "home" */
        './views/HomePage.vue'
      )
    },
    {
      path: '/weather/:location',
      name: 'weather',
      props: true,
      // split component into chunks
      component: () => import(
        // This comment below gives the chunk a name
        /* webpackChunkName: "weather" */
        './views/WeatherPage.vue'
      )
    }
  ]
})
