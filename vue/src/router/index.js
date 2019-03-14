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

/* export default new Router({
  routes: [
    // 公共主体
    {
      path: '/',
      name: '',
      component: Index,
      redirect: '/index',
      children: [
        // 首页
        {
          path: 'index',
          name: 'index',
          component: _import('Index')
        },
        // 站点切换
        {
          path: 'siteSwitch',
          name: 'siteSwitch',
          component: _import('SiteSwitch')
        },
        // 模块搜索
        {
          path: 'moduSearch',
          name: 'moduSearch',
          component: _import('subPage/ModuSearch')
        },
        // 益农社搜索
        {
          path: 'clubSearch',
          name: 'clubSearch',
          component: _import('subPage/ClubSearch')
        },
        // 
        {
          path: 'publicService-test',
          name: 'publicService-test',
          component: _import('PublicService')
        },
        // 便民服务
        {
          path: 'convenientService',
          name: 'convenientService',
          component: _import('ConvenientService')
        },



        // 益农信息社
        {
          path: 'ynongClub',
          name: 'ynongClub',
          component: _import('case/yn-information-society')
        },
        // 益农信息社详情
        {
          path: 'ynongClubInfor',
          name: 'ynongClubInfor',
          component: _import('case/community')
        },
        // 关于益农
        {
          path: 'about',
          name: 'about',
          component: _import('case/about-yn')
        },
        // 公益服务
        {
          path: 'publicService',
          name: 'publicService',
          component: _import('case/publicService')
        },
        // 公益服务详情
        {
          path: 'publicServiceInfo',
          name: 'publicServiceInfo',
          component: _import('case/public-service-info')
        },
        // 粤农优品
        {
          path: 'superiorProducts',
          name: 'superiorProducts',
          component: _import('case/farmerProducts')
        },
        // 粤农优品详情
        {
          path: 'superiorProductInfo',
          name: 'superiorProductInfo',
          component: _import('case/farmerProductInfo')
        },
        // 电子商务
        {
          path: 'commerce',
          name: 'commerce',
          component: _import('case/electronic-business')
        },
        // 电子商务详情
        {
          path: 'commerceInfor',
          name: 'commerceInfor',
          component: _import('case/e-commerce-info')
        },
        // 培训服务
        {
          path: 'trainService',
          name: 'trainService',
          component: _import('case/training-service')
        },
        // 培训服务详情
        {
          path: 'trainServiceInfor',
          name: 'trainServiceInfor',
          component: _import('case/service-details')
        },
        // 培训视频
        {
          path: 'coursePlay',
          name: 'coursePlay',
          component: _import('case/coursePlay')
        },
        // 新闻公告
        {
          path: 'noticeNews',
          name: 'noticeNews',
          component: _import('case/notice-board')
        },
        // 新闻公告详情
        {
          path: 'noticeNewsInfo',
          name: 'noticeNewsInfo',
          component: _import('case/notice-news-info')
        },


        // old
        // 粤农优品认证
        {
          path: 'goodAuthentic',
          name: 'goodAuthentic',
          component: _import('old/goodAuthentic')
        },
        // 在线支付
        {
          path: 'payment',
          name: 'payment',
          component: _import('old/payment')
        },
        // 支付成功
        {
          path: 'paySuccess',
          name: 'paySuccess',
          component: _import('old/pay-success')
        },
        // 支付失败
        {
          path: 'payFail',
          name: 'payFail',
          component: _import('old/pay-fail')
        },
        // 资质认证
        {
          path: 'qualificationAuthentic',
          name: 'qualificationAuthentic',
          component: _import('old/qualificationAuthentic')
        },
        // 认证过度页
        {
          path: "authenticWait",
          name: 'authenticWait',
          component: _import('old/examine')
        },
        // 个人中心
        {
          path: "/center",
          name: 'center',
          component: _import('old/center'),
          redirect: '/center/account-msg',
          children: [
            // 个人详情
            {
              path: "account-msg",
              name: 'account-msg',
              component: _import('old/account-msg')
            },
            // 检测合格
            {
              path: "qualify",
              name: 'qualify',
              component: _import('old/qualify')
            },
            // 检测不合格
            {
              path: "unqualify",
              name: 'unqualify',
              component: _import('old/unqualify')
            },
            // 检测认证记录
            {
              path: "record",
              name: 'record',
              component: _import('old/record')
            },
            // 检测详情
            {
              path: "testing-details",
              name: 'testing-details',
              component: _import('old/testing-details')
            },
            // 账户明细
            {
              path: "account-detail",
              name: 'account-detail',
              component: _import('old/account-detail')
            },
            // 待支付
            {
              path: "topay",
              name: 'topay',
              component: _import('old/topay')
            },
            // 待检测
            {
              path: "toqualify",
              name: 'toqualify',
              component: _import('old/toqualify')
            }
          ]
        }
      ]
    },
    // 申报指南
    {
      path: '/declareGuide',
      name: 'declareGuide',
      component: _import('DeclareGuide')
    },
    // 大数据模块
    {
      path: '/dataCount',
      name: 'dataCount',
      component: _import('DataCount')
    },
    // 摇一摇活动
    {
      path: '/shake',
      name: 'shake',
      component: _import('Shake')
    },
    // 登录注册 资料提交
    {
      path: '/form',
      name: 'form',
      component: Form,
      redirect: '/form/clubLogin',
      children: [
        // 登录
        {
          path: 'login',
          name: 'login',
          component: _import('login/Login')
        },
        // 益农社登录
        {
          path: 'clubLogin',
          name: 'clubLogin',
          component: _import('login/ClubLogin')
        },
        // 益农社注册
        {
          path: 'clubRegister',
          name: 'clubRegister',
          component: _import('login/ClubRegister')
        },
        // 找回密码
        {
          path: 'retrieve',
          name: 'retrieve',
          component: _import('login/Retrieve')
        },
        // 信息员信息
        {
          path: 'userInfor',
          name: 'userInfor',
          component: _import('login/UserInfor'),
          meta: {
            isLogin: false // true则需要登录
          }
        },       
        // 申报资料
        {
          path: 'declareForm',
          name: 'declareForm',
          component: _import('form/ClubDeclare'),
          meta: {
            isLogin: false // true则需要登录
          }
        },
        // 补充资料
        {
          path: 'supplyForm',
          name: 'supplyForm',
          component: _import('form/SupplyForm'),
          meta: {
            isLogin: false // true则需要登录
          }
        }
      ]
    },

    // 康爱多商城
    {
      path: '/kadShop',
      name: '',
      component: kadFrame,
      redirect: '/kadShop/kadIndex',
      children: [
        // 首页
        {
          path: 'kadIndex',
          name: 'kadIndex',
          component: _import('kadShop/Index')
        },
        // 商品详情
        {
          path: 'kadGoodsDetail',
          name: 'kadGoodsDetail',
          component: _import('kadShop/GoodsDetail')
        },
        // 购物车
        {
          path: 'kadShopCart',
          name: 'kadShopCart',
          component: _import('kadShop/ShopCart')
        },
        // 订单列表
        {
          path: 'kadOrder',
          name: 'kadOrder',
          component: _import('kadShop/Order')
        },
        // 订单详情
        {
          path: 'kadOrderDetail',
          name: 'kadOrderDetail',
          component: _import('kadShop/OrderDetail')
        },
        // 物流信息
        {
          path: 'kadLogistics',
          name: 'kadLogistics',
          component: _import('kadShop/Logistics')
        }
      ]
    },
    
    // otms快递物流
    {
      path: '/otms',
      name: '',
      component: SimpleFrame,
      redirect: '/otms/otmsSearch',
      children: [
        // 快递查询
        {
          path: 'otmsSearch',
          name: 'otmsSearch',
          component: _import('otms/IndexSearch')
        },
        // 寄件单-1 寄件人信息
        {
          path: 'otmsSender',
          name: 'otmsSender',
          component: _import('otms/SenderInfor')
        },
        // 寄件单-2 收件人信息
        {
          path: 'otmsAddressee',
          name: 'otmsAddressee',
          component: _import('otms/AddresseeInfo')
        }, 
        // 寄件单-3 预约信息
        {
          path: 'otmsOrder',
          name: 'otmsOrder',
          component: _import('otms/OrderInfor')
        },
        // 提交成功
        {
          path: 'otmsSuccess',
          name: 'otmsSuccess',
          component: _import('otms/Success')
        }
      ]
    },

    // 益农信息社及信息员登记表（移动端表单）
    {
      path: "/messengerRegister",
      name: 'messengerRegister',
      component: _import('other/MessengerRegister')
    },
    // 用户登录
    {
      path: "/givenLogin",
      name: 'givenLogin',
      component: _import('other/givenLogin')
    },
    // 统计
    {
      path: "/totalTabel",
      name: 'totalTabel',
      component: _import('other/totalTabel')
    },

    // 推广员工作汇报
    {
      path: '/promoter',
      name: 'promoter',
      component: PromoterFrame,
      redirect: '',
      children: [
        // 登录
        {
          path: 'login',
          name: 'prompterLogin',
          component: _import('promoter/Login')
        },
        // 新增工作记录
        {
          path: 'addWord',
          name: 'addWord',
          component: _import('promoter/AddWord')
        },
        // 修改个人资料
        {
          path: 'editUser',
          name: 'editUser',
          component: _import('promoter/EditUserInfor')
        }
      ]
    },
  ]
}) */