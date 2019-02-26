<template>
  <div class="wechat-wrapper" v-if="dialogShow">
    <el-dialog title="微信登录" :visible.sync="loginDialog.visible" :width="dialogW580" :before-close="handleClose" class="yn-dialog wechat-dialog">
      <div class="wechat-content">
        <div id="wechat"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWechatUser } from '@/api/login'
export default {
  data() {
    return {
      dialogShow: false,
      dialogW580: '580px', 
      loginDialog: {
        visible: true
      },

      // 微信登录信息
      url: '',  // 生成二维码的路径
      appid: 'wxc6af5e7c7c9081a9',  // 申请微信登录应用的appid
      redirect_uri: 'http%3A%2F%2F'+ this.customConfig.baseUrl.replace('http://','') +'%2F%23%2Findex',  // 微信的回调地址，记得这里要url转码
      state: 1
    };
  },
  methods: {
    // 设置好生成二维码的路径
    setPath() {
      this.url =
        "https://open.weixin.qq.com/connect/qrconnect?appid=" +
        this.appid +
        "&redirect_uri=" +
        this.redirect_uri +
        "&response_type=code&scope=snsapi_login&state=" +
        this.state +
        "#wechat_redirect"
    },
    // 生成二维码
    generateCode(data) {
      this.dialogShow = true
      this.setPath()
      if(data.state) {
        this.state = data.state
      }
      if(data.redirect_uri) {
        this.redirect_uri = data.redirect_uri
      }
      setTimeout(() => {
        let code = new WxLogin({
          id: "wechat",
          appid: "wxc6af5e7c7c9081a9",
          scope: "snsapi_login",
          redirect_uri: this.redirect_uri,
          state: this.state,
          style: "",
          href: ""
        });
      }, 200)
    },
    // 关闭弹窗
    handleClose() {
      this.dialogShow = false
    },
    // 登录成功，获取登录信息
    getWechatUser() {
      let url = window.location.href
      if(url.indexOf('code') > 0) {
        let code = this.getQueryString('code')
        let state = this.getQueryString('state')
        // 委托方登录
        if(state == 1) {
          getWechatUser({ code: code }).then(res => {
            if(res.success) {
              let wechatData = {
                token: res.message,
                wxId: res.entrustxxb_ID,
                wxName: res.wechatname,
                wxImg: res.headimgurl
              }
              this.$store.commit('updateEntrustData', wechatData)
              this.dialogShow = false
            } else {
              this.$message.error(res.message)
            }
          })
        }
      }
    },
    // 获取地址栏上面的参数
    getQueryString(name) {
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
      let r = window.location.href.split('?')[1].match(reg)
      if(r != null) return unescape(r[2])
      return null
    }
  }
};
</script>

<style lang="scss">
.wechat-dialog {
  .el-dialog {
    .el-dialog__body {
      text-align: center;
    }
  }
}
</style>
