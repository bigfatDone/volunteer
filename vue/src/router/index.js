import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import = require('./_import')

export default new Router({
  routes: [
    {path: '/',name: 'login',component: _import('login/Login')},
    {path: '/register',name: 'register',component: _import('login/Register')},
  ]
})
