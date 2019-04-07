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
//引进原子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// 引入校验规则
import Check from './utils/check.vue'
Vue.prototype.checkRule = Check

// 引进富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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