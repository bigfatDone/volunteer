// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vuex
import Vuex from 'vuex'
import store from './store/store'
Vue.use(Vuex)

// 引入element
import ElementUI from 'element-ui'
import './style/base/element-variables.scss' // 更换element-ui主题色
Vue.use(ElementUI)

//
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 引入JQuery
import $ from 'jquery'

// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 引入地图组件
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'yns-map-key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})

// 引入header
import BaseHeader from './components/BaseHeader' // 公共头部组件
Vue.component('base-header', BaseHeader)
import BaseFooter from './components/BaseFooter' // 公共底部组件
Vue.component('base-footer', BaseFooter)
import SimpleHeader from './components/SimpleHeader' // 简单头部组件
Vue.component('simple-header', SimpleHeader)
import ProductsHeader from './components/ProductsHeader' // 优品头部组件
Vue.component('products-header', ProductsHeader)
import PhoneSelect from './components/PhoneSelect' // 优品头部组件
Vue.component('phone-selectr', PhoneSelect)


// 引入校验规则
import Check from './utils/check.vue'
Vue.prototype.checkRule = Check

// 自定义公共变量
Vue.prototype.customConfig = {
  // 正式服务器
  // baseUrl: 'http://www.gd12316.com.cn'

  // 测试服务器
  // baseUrl: 'http://120.77.169.160:7006'
  baseUrl: 'http://localhost:8080'
}

// 设置路由跳转
router.afterEach((to, from, next) => {
  // 设置路由跳转回到顶部
  window.scrollTo(0, 0)
})
router.beforeEach((to, from, next) => {
  // if(store.state.clubLoginInfor.token) {
  //   const token = store.state.clubLoginInfor.token
  // }
  // 判断该路由是否需要登录权限
  if(to.meta.isLogin) {
    // 判断是否已经登录：如果已经登录，则进入当前路由；否则，跳到登录页面
    if(token) {
      next()
    } 
    else {
      next({
        path: '/form/clubLogin'
      })
    }
  } 
  else {
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})