import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/frame/Index'
const _import = require('./_import')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: 'login',
      name: 'login',
      component: _import('login/Login'),
      children: [
        {path: 'volunteerRegister',name: 'volunteerRegister',component: _import('login/VolunteerRegister')},
        {path: 'communityRegister',name: 'communityRegister',component: _import('login/CommunityRegister')}
      ]
    },
    {
      path: '/',
      name: '',
      component: Index,
/*       redirect: '/index',
      children: [
        // 首页
        {
          path: 'index',
          name: 'index',
          component: '../frame/Index.vue'
        },
      ] */
    }
  ]
})
