import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/frame/Index'
import Admin from '@/frame/Admin'
const _import = require('./_import')
Vue.use(Router)

export default new Router({
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: _import('login/Login')
    },
    // 志愿者注册
    {
      path: '/volunteerRegister',
      name: 'volunteerRegister',
      component: _import('login/VolunteerRegister')
    },
    // 社区注册
    {
      path: '/communityRegister',
      name: 'communityRegister',
      component: _import('login/CommunityRegister')
    },
    // 首页
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
          component: _import('Home')
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
        // 志愿人物
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
        // 审核
        {
          path: 'audit',
          name: 'audit',
          component: _import('Audit')
        },
        // 个人中心
        {
          path: 'center',
          name: 'center',
          component: _import('volunteer/Center'),
          redirect: '/center/center-msg',
          children: [
            {
              path: 'center-msg',
              name: 'center-msg',
              component: _import('volunteer/Center-msg')
            },
            {
              path: 'center-activity',
              name: 'center-activity',
              component: _import('volunteer/Center-activity')
            }
          ]
        },
        // 社区中心
        {
          path: 'community-center',
          name: 'community-center',
          component: _import('community/Community-center'),
          redirect: '/community-center/community-msg',
          children: [
            {
              path: 'community-msg',
              name: 'community-msg',
              component: _import('community/Community-msg')
            },
            {
              path: 'community-activity',
              name: 'community-activity',
              component: _import('community/Community-activity')
            }
          ]
        },
        // 志愿人物详情
        {
          path: 'personage-detail',
          name: 'personage-detail',
          component: _import('Personage-detail')
        },
        // 文章详情
        {
          path: 'detail',
          name: 'detail',
          component: _import('Detail')
        },
        // test
        {
          path: 'test',
          name: 'test',
          component: _import('test')
        }
      ]
    },
    //管理员
    {
      path: '/admin/login',
      name: 'admin/login',
      component: _import('admin/Login')
    },
    //首页
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/home',
      children: [
        {
          path: '/admin/home',
          name: 'admin/home',
          component: _import('admin/Home')
        },
        // 志愿者审核
        {
          path: 'admin/volunteer-check',
          name: 'admin/volunteer-check',
          component: _import('admin/VolunteerCheck')
        },
        //  社区审核
        {
          path: 'admin/community-check',
          name: 'admin/community-check',
          component: _import('admin/CommunityCheck')
        },
        //  求助中心审核
        {
          path: 'admin/help-check',
          name: 'admin/help-check',
          component: _import('admin/HelpCheck')
        },
        //  新闻发布
        {
          path: 'admin/news-publish',
          name: 'admin/news-publish',
          component: _import('admin/NewsPublish')
        },
        //  新闻管理
        {
          path: 'admin/news-manage',
          name: 'admin/news-manage',
          component: _import('admin/NewsManage')
        },
        //  志愿人物发布
        {
          path: 'admin/personage-publish',
          name: 'admin/personage-publish',
          component: _import('admin/PersonagePublish')
        },
        //  志愿人物管理
        {
          path: 'admin/personage-manage',
          name: 'admin/personage-manage',
          component: _import('admin/PersonageManage')
        },
        //  志愿项目管理
        {
          path: 'admin/project-manage',
          name: 'admin/project-manage',
          component: _import('admin/ProjectManage')
        },
        //  志愿项目发布
        {
          path: 'admin/project-publish',
          name: 'admin/project-publish',
          component: _import('admin/ProjectPublish')
        },
        //  管理员管理
        {
          path: 'admin/admin-manage',
          name: 'admin/admin-manage',
          component: _import('admin/AdminManage')
        },
      ]
    }
  ]
})

