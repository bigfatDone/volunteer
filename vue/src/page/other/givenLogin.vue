<template>
  <div>
    <div class="login-modu">
      <div class="login-box">
        <h3>用户登录</h3>
        <div class="loging-cont">
          <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
            <el-form-item label="账号：" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
          </el-form>
          <div class="foot-btn">
            <el-button type="primary" @click="login">登 录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import userinfor from '../common/userinfor.js'
import userinfor from "./userinfor.js"
import {postGivenLogin} from "@/api/base/given-login"
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          postGivenLogin({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            if (res.success) {
              //存储用户信息
              let data = {
                username: this.loginForm.username,
                password: this.loginForm.password,
                date: new Date().getTime()
              };
              userinfor.setUser(JSON.stringify(data));
              this.$router.push("/totalTabel");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-modu {
  width: 100%;
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    width: 100%;
    height: 240px;
    background: $base-color;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .login-box {
    width: 420px;
    background: #fff;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    padding: 20px;
    margin: 100px auto;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    h3 {
      font-size: 20px;
      font-weight: normal;
      text-align: center;
      border-bottom: 1px solid #e3e3e3;
      padding-bottom: 20px;
      margin: 0;
    }
    .loging-cont {
      margin-top: 20px;
      .foot-btn {
        width: 80%;
        margin: 40px auto 20px;
        .el-button {
          width: 100%;
          background: $base-color;
          border-color: $base-color;
        }
      }
    }
  }
}
@media all and (max-width: 576px) {
  .login-modu {
    &:after {
      height: 100px;
    }
    .login-box {
      width: 90%;
      margin: 60px auto;
    }
  }
}
</style>
