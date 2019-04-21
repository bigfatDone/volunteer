import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    adminInfo: JSON.parse(localStorage.getItem('adminInfo')),
  },
  mutations: {
    updataUserInfo(state,data) {
      state.userInfo = data;
      localStorage.setItem('userInfo',JSON.stringify(data));
    },
    updataAdminInfo(state,data) {
      state.adminInfo = data;
      localStorage.setItem('adminInfo',JSON.stringify(data));
    }
  },
  actions: {

  }
})

export default store