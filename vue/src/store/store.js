import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  mutations: {
    updataUserInfo(state,data) {
      state.userInfo = data;
      localStorage.setItem('userInfo',JSON.stringify(data));
    }
  },
  actions: {

  }
})

export default store