// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import Vuetify from 'vuetify'
import './element-ui'
//导入vue-resource，就会在vue对象上绑定一个$http对象，就可以使用ajax方法
import vueResoure from 'vue-resource'
Vue.use(vueResoure)


Vue.use(Vuetify)



Vue.config.productionTip = false

/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>' ,
  store
 

})
