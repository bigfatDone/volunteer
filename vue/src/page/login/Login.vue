<template>
  <div class="login-wrapper">
     <vue-particles class="particles"
        color="#2A53F8"
      >
    </vue-particles>
    <div class="container">
      <div class="login-box">
        <div class="login-titlt">用户登录</div>
        <div class="login-cont">
          <el-form ref="form" :rules="rules" :model="form"  class="login-form">
            <el-form-item prop="name">
              <i class="form-item-icon"></i>
              <el-input v-model="form.name" placeholder="用戶名"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <i class="form-item-icon password-icon"></i>
              <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="vercode-item">
              <i class="form-item-icon safety-icon"></i>
              <el-input v-model="form.code" class="code" placeholder="请输入验证码">
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
              <router-link to="" class="retrieve-btn">找回密码？</router-link>
            </div>
            <div class="main-bottom">
              <router-link to="/index" class="login-btn" tag="div">登录</router-link>
              <router-link to="/volunteerRegister" class="register-btn" tag="div">注册志愿者账号</router-link>
              <router-link to="/communityRegister" class="register-btn" tag="div">注册社区账号</router-link>
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
      form: {
        name: '',
        password: '',
        code: ''
      },
      
      // 校验规则
      rules: {
        name:[
          {required: true, validator: this.checkRule.checkName, trigger: "blur"}
          ],
        password:[
          {required: true, validator: this.checkRule.checkPassword, trigger: "blur"}
          ],
        code:[
          {required: true, validator: this.checkRule.checkCode, trigger: "blur"}
          ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  // background: url('~@/../static/images/login/login-bg01.jpg') center no-repeat;
  background-color: $base-background-color;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .particles {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 999;
    .login-box {
      width: 460px;
      border-radius: 20px;
      text-align: center;
      background: rgba(255,255,255,.7);
      padding: 20px;
      margin: 50px auto;
      box-sizing: border-box;
      .login-titlt {
        font-size: 30px;
        font-weight: bold;
        color: $base-color;
        line-height: 1;
        border-bottom: 1px solid rgba(0, 0, 0, .17);
        padding: 16px 0 36px;
      }
      .message-item {
        font-size: 14px;
        color: #666;
        line-height: 16px;
        text-align: left;
        background: #FFFBEB;
        border: 1px solid #FFE478;
        padding: 8px 14px;
        margin-bottom: 12px;
        i {
          width: 17px;
          height: 16px;
          background: url('~@/../static/images/base-icon.png') -12px -252px;
          margin-right: 10px;
          float: left;
        }
      }
      .login-cont {
        padding: 22px 28px;
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
          .vercode-item {
            .vercode-img {
              width: 120px;
              height: 100%;
              cursor: pointer;
            }
          }
        }
        .bottom-modu {
          .second-bottom {
            .retrieve-btn {
              font-size: 14px;
              line-height: 1;
              float: right;
            }
          }
          .main-bottom {
            margin-top: 20px;
            .login-btn,
            .register-btn {
              height: 44px;
              font-size: 18px;
              color: #fff;
              line-height: 44px;
              background: #0fae33;
              margin-bottom: 16px;
              box-sizing: border-box;
              display: block;
              cursor: pointer;
            }
            .login-btn {
              background: linear-gradient(#0e95d8,$base-color);
            }
            .register-btn {
              color: $base-color;
              background: #fff;
              border: 1px solid $base-color;
            }
          }
        }
        .shortcut-modu {
          margin-top: 26px;
          .shortcut-item {
            width: 140px;
            float: left;
            .item-icon {
              width: 44px;
              height: 52px;
              background: url('~@/../static/images/base-icon.png') -138px -94px;
              margin: 0 auto;
              display: block;
            }
            .item-name {
              font-size: 14px;
              color: #A0A0A0;
              line-height: 20px;
              margin-top: 10px;
            }
            &.guide-item {
              float: right;
              .item-icon {
                background-position: -138px -174px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login-wrapper {
  .el-form {
    .el-form-item {
      .el-form-item__content {
        .el-input__inner {
          height: 44px;
          font-size: 16px;
          line-height: 44px;
          padding-left: 50px;
        }
      }
    }
    .vercode-item {
      .el-form-item__content {
        .el-input {
          .el-input-group__append {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
