import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import = require('./_import')

export default new Router({
  routes: [
    {path: '/login',name: 'login',component: _import('login/Login')},
    {path: '/volunteerRegister',name: 'volunteerRegister',component: _import('login/VolunteerRegister')},
    {path: '/communityRegister',name: 'communityRegister',component: _import('login/CommunityRegister')},
  ]
})
