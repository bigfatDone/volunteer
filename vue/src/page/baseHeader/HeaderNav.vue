<template>
  <div class="header-nav">
    <div class="w1200">
      <div class="header-nav-content clearfix">
        <!-- 快捷入口 -->
        <div class="category-type" :class="categoryType === 1 ? 'isShow' : ''">
          <div class="category-head" @click="categoryClick()">
            <span>快捷入口</span>
            <i class="arr-icon"></i>
          </div>
          <ul class="category-tab-content">
            <li
              v-for="item in tabNavs"
              :key="item.id"
              class="tab-item"
              :class="item.id == tabIndex ? 'current' : ''"
              @mouseenter="subTabShow(item.id)"
              @mouseleave="subTabHidden()">
              <div class="tab-item-main">
                <div class="tab-main-cont">
                  <router-link :to="item.routerLink" class="item-name">{{item.name}}</router-link>
                  <div class="item-sub clearfix">
                    <div
                      class="list-name"
                      @click="jumpPage(item, item.subNav[0])">
                        {{item.subNav[0].name}}
                    </div>
                    <div
                      class="list-name"
                      @click="jumpPage(item, item.subNav[1])">
                        {{item.subNav[1].name}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-item-cont">
                <router-link :to="item.routerLink" class="title-name">{{item.name}}</router-link>
                <div class="sub-list clearfix">
                  <div
                    v-for="(subItem, index) in item.subNav"
                    :key="index"
                    class="list-name"
                    @click="jumpPage(item, subItem)">
                      {{subItem.name}}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 导航栏 -->
        <div class="main-nav clearfix">
          <router-link
            v-for="(item, index) in navList"
            :key="index"
            :to="item.routerLink"
            class="main-nav-list"
            :class="curName == item.routerName ? 'current' : ''"
            @click="navClick(item, index)">
              {{item.name}}
          </router-link>
        </div>
        <wechatLogin ref="wechatLogin"></wechatLogin>
      </div>
    </div>
  </div>
</template>

<script>
import wechatLogin from "@/components/WechatLogin"
import {
  getPublicType,
  getProductType,
  getTrainType,
  getYnProductsType
} from "@/api/index";

export default {
  components: {
    wechatLogin
  },
  data() {
    return {
      // 快捷入口
      categoryType: 0,
      tabIndex: 0,
      tabNavs: [
        {
          id: 1,
          name: "公益服务",
          routerLink: "/publicService",
          subNav: [{ name: "" }, { name: "" }]
        },
        {
          id: 2,
          name: "便民服务",
          routerLink: "/convenientService",
          subNav: [
            { name: "购物商城", routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/lnypMall/MallHome.html?fromMall=1&channelcode=yinong' },
            { name: "物流快递", routerLink: this.customConfig.baseUrl + '/#/otms/otmsSearch' },
            { name: "违章查询", routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=122' },
            { name: "健康保险", routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=93' },
            { name: "司法查询", routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=68' },
            { name: "购药平台", routerLink: this.customConfig.baseUrl + '/#/kadShop/kadIndex' },
            { name: "车辆年检", routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=125' }
          ]
        },
        {
          id: 3,
          name: "电子商务",
          routerLink: "/commerce",
          subNav: [{ name: "" }, { name: "" }]
        },
        {
          id: 4,
          name: "培训体验服务",
          routerLink: "/trainService",
          subNav: [{ name: "" }, { name: "" }]
        },
        {
          id: 5,
          name: "粤农优品",
          routerLink: "/superiorProducts",
          subNav: [{ name: "" }, { name: "" }]
        }
      ],

      // 导航栏
      curName: "index",
      navList: [
        {
          name: "首页",
          routerName: "index",
          routerLink: "/index"
        },
        {
          name: "益农信息社",
          routerName: "ynongClub",
          routerLink: "/ynongClub"
        },
        {
          name: "关于益农",
          routerName: "about",
          routerLink: "/about"
        }
      ],

      // 微信登录
      wechatData: {
        state: 1,
        redirect_uri: 'http%3A%2F%2F'+ this.customConfig.baseUrl.replace('http://','') +'%2F%23%2FgoodAuthentic'
      }
    }
  },
  mounted() {
    this.getTabNavsList();
  },
  methods: {
    // 判断当前导航栏对应的项
    curRouterItem(name) {
      this.curName = name
    },

    // 获取快速入口列表
    getTabNavsList() {
      // 获取公益服务类型
      getPublicType().then(res => {
        if (res.success) {
          this.tabNavs[0].subNav = res.resultList
        }
      });
      // 获取农产品类型
      getProductType().then(res => {
        if (res.success) {
          this.tabNavs[2].subNav = res.resultList
        }
      });
      // 培训体验服务类型
      getTrainType().then(res => {
        if (res.success) {
          this.tabNavs[3].subNav = res.resultList
        }
      });
      // 培训粤农优品类型
      getYnProductsType().then(res => {
        if (res.success) {
          this.tabNavs[4].subNav = res.resultList
        }
      });
      // 判断快速入口收缩或展示
      this.judgeNavs();
    },

    // 判断快速入口收缩或展示
    judgeNavs() {
      let routerName = this.$route.name;
      if (routerName == "index") {
        this.categoryType = 1
      } else {
        this.categoryType = 0
      }
    },

    // 快捷入口切换：如果是首页，则快捷入口默认是展开并且不能收缩；如果是其它页面，默认是收起，并且可以切换
    categoryClick() {
      let routerName = this.$route.name;
      if (routerName == "index") {
        this.categoryType = 1
      } else {
        if (this.categoryType === 0) {
          this.categoryType = 1
        } else {
          this.categoryType = 0
        }
      }
    },

    // 鼠标移上快速入口
    subTabShow(num) {
      this.tabIndex = num
    },
    // 鼠标移出快速入口
    subTabHidden() {
      this.tabIndex = 0
    },

    // 点击快捷入口选项，跳转到相应页面
    jumpPage(item, subItem) {
      // 如果点击的是粤农优品认证下单：需要判断是否登录
      if (item.id == 5 && subItem.name == '粤农优品认证下单') {
        let entrustStore = this.$store.state.entrustData
        if(entrustStore && entrustStore.token) {
          this.$router.push("/goodAuthentic")
        } else {
          this.$refs.wechatLogin.generateCode(this.wechatData)
        }
      }
      else if(subItem.routerLink) {
        window.open(subItem.routerLink, '_blank')
      }
      else {
        this.$router.push({ path: item.routerLink, query: { id: subItem.dictionaries_id } })
      }
    },
    // 点击导航
    navClick(item, index) {
      this.curIndex = index
    }
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.$refs.wechatLogin.dialogShow = false
      this.judgeNavs()
      this.curRouterItem(this.$route.name)
    }
  }
}
</script>

<style lang="scss" scoped>
$categoryW: 250px;

.header-nav {
  width: 100%;
  height: 46px;
  background-color: #f7fbfd;
  border-bottom: 2px solid $base-color;
  box-sizing: border-box;
  .header-nav-content {
    .item-name,
    .title-name {
      font-size: 19px;
      font-weight: bold;
      line-height: 20px;
      color: $base-color;
    }
    .sub-list, 
    .item-sub {
      font-size: 14px;
      margin-top: 2px;
      .router-link-active,
      .list-name {
        color: #666;
        line-height: 20px;
        margin: 8px 20px 0 0;
        display: block;
        float: left;
        cursor: pointer;
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
      }
    }
    .category-type {
      width: $categoryW;
      position: relative;
      z-index: 10;
      float: left;
      &.isShow {
        .category-head {
          .arr-icon {
            transform: rotate(180deg);
            transform-origin: 50% 50%;
          }
        }
        .category-tab-content {
          display: block;
        }
      }
      .category-head {
        height: 46px;
        font-size: 22px;
        color: #fff;
        text-align: center;
        line-height: 46px;
        background-color: $base-color;
        cursor: pointer;
        .arr-icon {
          width: 18px;
          height: 9px;
          background: url('~@/../static/images/base-icon.png') -12px -96px;
          vertical-align: middle;
          margin-left: 6px;
          display: inline-block;
        }
      }
      .category-tab-content {
        width: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        top: 46px;
        display: none;
        .tab-item {
          position: relative;
          .tab-item-main {
            border-left: 2px solid $base-color;
            border-right: 2px solid $base-color;
            .tab-main-cont {
              height: 120px;
              border-top: 2px solid transparent;
              border-bottom: 1px solid #E8E7E9;
              padding: 30px 28px;
              box-sizing: border-box;
              .item-name {
                line-height: 26px;
                &:after {
                  content: '';
                  width: 26px;
                  height: 26px;
                  background: url('~@/../static/images/base-icon.png') -87px -7px;
                  margin-right: 10px;
                  float: left;
                }
              }
            }
          }
          .tab-item-cont {
            width: 660px;
            background: #fff;
            padding: 24px 20px;
            border: 2px solid $base-color;
            border-left: 0 none;
            box-sizing: border-box;
            position: absolute;
            left: $categoryW;
            top: 0;
            display: none;
            .sub-list {
              margin: 14px 0 0 10px;
              .list-name {
                margin-right: 30px;
              }
            }
          }
          &:nth-of-type(2) {
            .item-name:after {
              background-position: -87px -47px !important;
            }
          }
          &:nth-of-type(3) {
            .item-name:after {
              background-position: -87px -87px !important;
            }
          }
          &:nth-of-type(4) {
            .item-name:after {
              background-position: -87px -167px !important;
            }
          }
          &:nth-of-type(5) {
            .tab-main-cont {
              border-bottom: 2px solid $base-color;
              .item-name:after {
                background-position: -87px -207px;
              }
            }
          }
          &.current {
            .tab-item-main {
              border-right: 0 none;
              .tab-main-cont {
                border-top: 2px solid $base-color;
                border-bottom: 2px solid $base-color;
              }
            }
            .tab-item-cont {
              display: block;
            }
          }
        }
      }
    }
    .main-nav {
      margin: 0 30px;
      float: left;
      .main-nav-list {
        font-size: 22px;
        color: #333;
        line-height: 46px;
        padding: 0 20px;
        margin: 0 10px;
        cursor: pointer;
        float: left;
        &.current {
          color: $base-color;
        }
      }
    }
  }
}
</style>
