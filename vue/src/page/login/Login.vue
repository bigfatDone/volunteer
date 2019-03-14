<template>
  <div class="login-wrapper">
    <div class="w1200">
      <div class="login-box">
        <div class="login-titlt">用户登录</div>
        <div class="login-cont">
          <div class="message-item">
            <i></i>
            <span>公共场所不建议自动登录，以防账号丢失</span>
          </div>
          <el-form ref="loginForm" :rules="rules" :model="loginForm" class="login-form">
            <el-form-item>
              <i class="form-item-icon"></i>
              <el-input v-model="loginForm.username" placeholder="用户名 / 手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <i class="form-item-icon password-icon"></i>
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="vercode-item">
              <i class="form-item-icon safety-icon"></i>
              <el-input v-model="loginForm.username" placeholder="请输入验证码">
                <template slot="append"> 
                  <div class="vercode-img">
                    <img class="yn-fill-img" src="@/../static/images/login/code-img01.png" alt="">
                  </div>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-modu">
            <div class="second-bottom clearfix">
              <router-link to="" class="retrieve-btn">忘记密码？</router-link>
            </div>
            <div class="main-bottom">
              <div class="login-btn">登录</div>
              <router-link to="" class="register-btn">微信登录</router-link>
              <router-link to="" class="register-btn">注册账号</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      
      // 校验规则
      rules: {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/login/login";
.login-wrapper {
  .login-box {
    width: 460px;
  }
}
</style>
<style lang="scss">
@import "../../style/scss/login/login-el";
</style>
