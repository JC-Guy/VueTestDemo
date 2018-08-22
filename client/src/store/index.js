import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store =new Vuex.Store({
  state:{
    user:undefined,
    doneOrNot:1
  },
  mutations:{
    login(state,payload){
      state.user=payload
    },
    logout(state){
      state.user=undefined
    },
    register(state,payload){
      state.user=payload
    }
  },
  actions:{
    login(context,payload){
      context.commit('login',payload)
    },
    logout(context){
      context.commit('logout')
    },
    register(context,payload){
      context.commit('register',payload)
    }
  }

})

export default store