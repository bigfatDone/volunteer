<template>
  <div class="login-wrapper">
     <vue-particles class="particles"
        color="#2A53F8"
      >
    </vue-particles>
    <div class="container">
      <div class="login-box">
        <div class="login-titlt">管理员登录</div>
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
                  <div class="vercode-img" @click="toCode()">
                    {{append}}
                  </div>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-modu">
            <div class="main-bottom">
              <div class="login-btn" @click="login('form')">登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdminLogin,getCode } from '@/api/login/login';
export default {
  data() {
    const checkCode = (rule, value, callback) => {
  if(!value) {
    callback(new Error('请输入验证码'));
  } else {
    if(!/^\d{4}$/.test(value)){
      callback(new Error('验证码格式错误'));
   } else if(value != this.append){
     callback(new Error('验证码错误'));
   } else {
     callback();
   }
  }
};
    return {
      append: 1156,
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
          {required: true, validator: checkCode, trigger: "blur"}
          ]
      }
    }
  },
  methods:{
    test() {
      console.log(111)
    },
    toLogin() {
      getAdminLogin({
        name: this.form.name,
        password: this.form.password
      }).then( res => {
        console.log(res)
        if(res[0].flag === 1) {
          this.$store.commit('updataAdminInfo',{
            name: res[0].name,
            grade: res[0].grade 
          })
          this.$router.push({name: 'admin/home'})
        } else {
          this.$store.commit('updataAdminInfo',{
            name: '',
            grade: ''
          })
          this.$message.error(res[0].msg)
        }
      })
    },
     toCode() {
      console.log(111)
      getCode().then( res => {
        this.append = res.code;
        console.log(res)
      }).catch( res => {
        this.append = res.code;
        console.log(res)
      })
    },
    login(form) {
      this.$refs[form].validate((valid) => {
          if (valid) {
            this.toLogin();
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    }
  },
  mounted() {
    this.toCode();
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
      margin: 80px auto;
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
              width: 110px;
              height: 100%;
              font-size: 26px;
              color: transparent;
              text-shadow: #111 0 0 3px;
              letter-spacing: 4px;
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
            margin-top: 50px;
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
