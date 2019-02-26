<template>
  <div class="login-wrapper">
    <div class="w1200">
      <div class="login-box">
        <div class="login-titlt">广东益农信息社申请</div>
        <div class="login-cont">
          <el-form ref="loginForm" :rules="rules" :model="loginForm" class="login-form">
            <el-form-item prop="username">
              <i class="form-item-icon"></i>
              <el-input v-model="loginForm.username" placeholder="用户名 / 手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <i class="form-item-icon password-icon"></i>
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-modu">
            <div class="second-bottom clearfix">
              <router-link to="" class="retrieve-btn">忘记密码？</router-link>
            </div>
            <div class="main-bottom">
              <div class="login-btn" @click="handleLogin">账号登录申报</div>
              <router-link to="/form/clubRegister" class="register-btn">注册账号申报</router-link>
            </div>
          </div>
          <div class="shortcut-modu clearfix">
            <router-link to="" class="shortcut-item download-item">
              <i class="item-icon"></i>
              <p class="item-name">益农社工作指引下载</p>
            </router-link>
            <router-link to="" class="shortcut-item guide-item">
              <i class="item-icon"></i>
              <p class="item-name">益农社申报指南</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clubLogin } from '@/api/login'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },

      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名/手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if(valid) {
          clubLogin(this.loginForm).then(res => {
            // 登录成功
            if(res.success) {
              this.$store.commit('updateClubLogin', res.data)
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$router.push('/form/declareForm')
            }
            // 登录失败
            else {
              this.$message.error(res.message);
            }
          })
        } else {
          console.log('提交失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/login/login";
</style>
<style lang="scss">
@import "../../style/scss/login/login-el";
</style>
