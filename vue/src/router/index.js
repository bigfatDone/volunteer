import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/frame/Index'
const _import = require('./_import')
Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {
      path: '/login',
      name: 'login',
      component: _import('login/Login'),
    },
    //志愿者注册
    {
      path: '/volunteerRegister',
      name: 'volunteerRegister',
      component: _import('login/VolunteerRegister')
    },
    //社区注册
    {
      path: '/communityRegister',
      name: 'communityRegister',
      component: _import('login/CommunityRegister')
    },
    //首页
    {
      path: '/',
      name: '',
      component: Index,
      redirect: '/index',
      children: [
        // 首页内容
        {
          path: 'index',
          name: 'index',
          component: _import('Index')
        },
        // 志愿项目
        {
          path: 'project',
          name: 'project',
          component: _import('Project')
        },
        // 志愿项目详情
        {
          path: 'project-detail',
          name: 'project-detail',
          component: _import('Project-detail')
        },
        // 求助中心
        {
          path: 'help',
          name: 'help',
          component: _import('Help')
        },
        // 志愿快讯
        {
          path: 'news',
          name: 'news',
          component: _import('News')
        },
        //志愿人物
        {
          path: 'personage',
          name: 'personage',
          component: _import('Personage')
        },
        // 发布项目
        {
          path: 'publish',
          name: 'publish',
          component: _import('Publish')
        },
      ]
    }
  ]
})
