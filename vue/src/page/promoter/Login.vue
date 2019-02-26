<template>
  <div class="promoter-login login-wrapper">
    <div class="title-name">推广员工作汇报系统</div>
    <div class="login-cont">
      <el-form ref="loginForm" :rules="rules" :model="loginForm" class="login-form">
        <el-form-item prop="username">
          <i class="form-item-icon"></i>
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="form-item-icon password-icon"></i>
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom-modu">
        <div class="login-btn">登  录</div>
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
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.promoter-login {
  padding: 20px;
  .title-name {
    font-size: 21px;
    text-align: center;
    margin: 38px 0;
  }
  .login-cont {
    .login-form {
      .form-item-icon {
        width: 24px;
        height: 24px;
        background: url('~@/../static/images/base-icon.png') -48px -88px;
        display: block;
        position: absolute;
        left: 13px;
        top: 10px;
        z-index: 2;
        &.password-icon {
          background-position: -48px -128px;
        }
        &.safety-icon {
          background-position: -48px -128px;
        }
      }
    }
    .bottom-modu {
      margin-top: 50px;
      .login-btn {
        height: 46px;
        font-size: 16px;
        color: #fff;
        line-height: 46px;
        text-align: center;
        background-color: #008DEE;
        border-radius: 2px;
        box-shadow: 0 0 10px rgba(0, 141, 238, .28), 0 0 10px rgba(0, 141, 238, .28);
      }
    }
  }
}
</style>
<style lang="scss">
@import "../../style/scss/login/login-el";
</style>
