<template>
  <div class="site-nav-wrapper">
    <!-- 站点导航 -->
    <div class="site-nav">
      <div class="w1200 clearfix">
        <ul class="site-nav-l">
          <li class="sitenav-item contact-way">
            <i class="call-icon"></i>
            <span>全国免费热线：</span>
            <span class="phone-num">400 606 1296</span>
          </li>
          <li class="sitenav-item download-list">
            <div class="download-content">
              <span class="fl">手机客户端下载</span>
              <i class="phone-icon"></i>
            </div>
            <div class="download-dialog">
              <i></i>
              <img src="@/../static/images/qrcode-01.jpg" alt="">
            </div>
          </li>
        </ul>
        <div class="site-nav-r">
          <div class="welcome" v-if="itemShow">
            <p class="welmone-text">欢迎您，</p>
            <div class="user-content">
              <div class="user-name">{{entrustData.wxName}}</div>
              <div class="operate-ul">
                <ul>
                  <li class="operate-list" @click="jumpUserInfor">个人中心</li>
                  <li class="operate-list" @click="signOutLogin">退出登录</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="link-btn" @click="onEntrustLogin" v-else>委托方登录</div>
          <router-link to="/form/clubLogin" class="link-btn">益农信息社申报</router-link>
          <a :href="this.customConfig.baseUrl + '/login_toLogin'" target="_blank" class="link-btn">市县农业局审核</a>
        </div>
      </div>
    </div>
    <wechatLogin ref="wechatLogin"></wechatLogin>
  </div>
</template>

<script>
import wechatLogin from "@/components/WechatLogin"
export default {
  components: {
    wechatLogin
  },
  data() {
    return {
      // 委托方信息
      entrustData: {},
      itemShow: false,
      wechatData: {
        state: 1
      }
    }
  },
  mounted() {
    this.judgeEntrustLogin()
  },
  methods: {
    // 判断委托方是否登录
    judgeEntrustLogin() {
      let entrustStore = this.$store.state.entrustData
      if(entrustStore && entrustStore.token) {
        this.entrustData = entrustStore
        this.itemShow = true
      } else {
        this.entrustData = entrustStore
        this.itemShow = false
      }
    },
    // 点击委托方登录
    onEntrustLogin() {
      this.$refs.wechatLogin.generateCode(this.wechatData)
    },
    // 点击个人中心
    jumpUserInfor() {
      this.$router.push('/center/account-msg')
    },
    // 退出登录
    signOutLogin() {
      this.$store.commit('updateEntrustData', {})
      this.$router.push('/index')
      this.judgeEntrustLogin()
    }
  },
  computed: {
    entrustStore() {
      return this.$store.state.entrustData
    }
  },
  watch: {
    $route(to, from) {
      this.$refs.wechatLogin.getWechatUser()
    },
    entrustStore() {
      console.log('11111111111')
      this.judgeEntrustLogin()
    }
  }
}
</script>

<style lang="scss" scoped>
.site-nav-wrapper {
  .site-nav {
    width: 100%;
    height: 30px;
    font-size: 15px;
    color: #666;
    line-height: 30px;
    background-color: #F5F5F5;
    .sitenav-item {
      float: left;
    }
    .site-nav-l {
      float: left;
      .contact-way {
        .call-icon {
          width: 13px;
          height: 16px;
          background: url('~@/../static/images/base-icon.png') -13px -12px;
          margin: 8px 6px 0 0;
          float: left;
        }
        .phone-num {
          font-size: 16px;
        }
      }
      .download-list {
        margin-left: 40px;
        position: relative;
        cursor: pointer;
        .download-content {
          .phone-icon {
            width: 10px;
            height: 16px;
            background: url('~@/../static/images/base-icon.png') -15px -53px;
            margin: 8px 6px 0 0;
            float: left;
          }
        }
        .download-dialog {
          width: 90px;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 4px;
          margin-left: -45px;
          position: absolute;
          left: 50%;
          top: 40px;
          display: none;
          i {
            width: 0;
            height: 0;
            border-width: 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent #ccc;
            margin-left: -10px;
            position: absolute;
            top: -10px;
            left: 50%;
            &:after {
              content: "";
              display: block;
              width: 0;
              height: 0;
              border-width: 0 10px 10px;
              border-style: solid;
              border-color: transparent transparent #fff; /*透明 透明  黄*/
              position: absolute;
              top: 1px;
              left: -10px;
            }
          }
        }
        &:hover {
          .download-dialog {
            display: block;
          }
        }
      }
    }
    .site-nav-r {
      float: right;
      .welcome {
        margin: 0 14px;
        float: left;
        .welmone-text {
          float: left;
        }
        .user-content {
          float: left;
          position: relative;
          .user-name {
            color: #1F9933;
            cursor: pointer;
          }
          .operate-ul {
            width: 100px;
            text-align: center;
            background: #fff;
            border: 1px solid #e3e3e3;
            box-shadow: 0 0 2px rgba(0, 0, 0, .06);
            position: absolute;
            left: 0;
            top: 30px;
            z-index: 2;
            display: none;
            .operate-list {
              margin: 4px 0;
              cursor: pointer;
              &:hover {
                color: #fff;
                background: $base-color;
              }
            }
          }
          &:hover {
            .operate-ul {
              display: block;
            }
          }
        }
      }
      .ver-line {
        width: 1px;
        height: 16px;
        background-color: #666;
        margin: 7px 0;
        float: left;
      }
      .link-btn {
        color: #1F9933;
        margin: 0 14px;
        float: left;
        cursor: pointer;
      }
    }
  }
}
</style>
