import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/frame/Index'
import Form from '@/frame/Form'
import kadFrame from '@/frame/kadFrame'
import SimpleFrame from '@/frame/SimpleFrame'
import PromoterFrame from '@/frame/PromoterFrame'
Vue.use(Router)

const _import = require('./_import')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: _import('login/Login')
    },
  ]
})
