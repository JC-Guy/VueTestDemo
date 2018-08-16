import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Home.vue'
import login from '../components/Login.vue'


Vue.use(Router)


export default new Router({
  linkActiveClass: 'mui-active',
  routes: [
    {
      path:'/',
      name:'homepage',
      component:home
    },
    {
      path:'/login',
      name:'login',
      component:login
    }


  ]
})
