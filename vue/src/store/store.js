import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 站点信息
    siteData: JSON.parse(localStorage.getItem('siteData')) ? 
              JSON.parse(localStorage.getItem('siteData')) : 
              {
                pid: 64195,
                name: "广东省",
                grade: 1,
                parentId: "",
                parentName: ""
              },
    // 益农社登录信息
    clubLoginInfor: JSON.parse(localStorage.getItem('clubLoginInfor')),
    // 益农社补充资料
    clubSupplyData: JSON.parse(localStorage.getItem('clubSupplyData')),
    // 委托方登录信息
    entrustData: JSON.parse(sessionStorage.getItem('entrustData')),
    // 购物车信息
    shopCartData: JSON.parse(localStorage.getItem('shopCartData')),
    // 寄件方的信息
    senderInfo: JSON.parse(sessionStorage.getItem('senderInfo')),
    // 收件人的信息
    receiverInfo:JSON.parse(sessionStorage.getItem('receiverInfo')),
  },
  mutations: {
    // 修改站点信息
    updateSite(state, data) {
      state.siteData = data
      localStorage.setItem('siteData', JSON.stringify(data))
    },
    // 修改益农社登录信息
    updateClubLogin(state, data) {
      state.clubLoginInfor = data
      localStorage.setItem('clubLoginInfor', JSON.stringify(data))
    },
    // 修改益农社补充资料
    updateClubSupply(state, data) {
      state.clubSupplyData = data
      localStorage.setItem('clubSupplyData', JSON.stringify(data))
    },
    // 修改委托方登录信息
    updateEntrustData(state, data) {
      state.entrustData = data
      sessionStorage.setItem('entrustData', JSON.stringify(data))
    },
    // 修改购物车信息
    updateShopCartData(state, data) {
      state.shopCartData = data
      localStorage.setItem('shopCartData', JSON.stringify(data))
    },
    //修改寄件方的信息
    updateSenderData(state, data){
      state.senderInfo = data
      sessionStorage.setItem('senderInfo', JSON.stringify(data))
    },
    // 修改收件人的信息
    updateReceiverData(state, data){
      state.receiverInfo = data
      sessionStorage.setItem('receiverInfo', JSON.stringify(data))
    }
  },
  actions: {

  }
})

export default store