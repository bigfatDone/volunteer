<template>
  <div class="register-wrapper">
    <header>用户注册</header>
    <div class="container">
      <div class="title">账号信息</div>
      <div class="conntent">
        <el-form :model="form" :rules="rule" ref="form" label-width="120px">
          <el-form-item prop="name" label="姓名：">
            <el-input type="text" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码：">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain" label="确认密码：">
            <el-input type="password" v-model="form.passwordAgain"></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain" label="邮箱：">
            <el-input type="password" v-model="form.passwordAgain"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const checkPasswordAgain = (rule, value, callback) => {
        if (!value){
          callback(new Error('密码不能为空'))
        } else if (value !== this.form.password) {
          callback(new Error('输入的密码不一致'))
        } else {
          callback()
        }
    };
    return {
      form: {
        name: '',
        password: '',
        passwordAgain: '',
      },
      rule: {
        name: {required: true, validator: this.checkRule.checkName, trigger: 'blur'},
        password: {required: true, validator: this.checkRule.checkPassword, trigger: 'blur'},
        passwordAgain: {required: true, validator: checkPasswordAgain, trigger: 'blur'},
      }
    }
  }
  
}
</script>
<style lang="scss" scoped>
.register-wrapper {
  width: 960px;
  height: 800px;
  margin: 0 auto;
  border: 1px solid $base-border-color;
  header {
    text-align: center;
    padding: 40px;
    margin: 30px 0 10px;
    font-size: 30px;
  }
  .container {
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      padding-left: 20px; 
      border-radius: 5px;
      background-color: $base-background-color;
    }
    .conntent {
      margin: 20px 0 20px;
    }
  }
}
</style>
<style lang="scss">
.conntent {
  .el-input {
    width: 40%;
  }
  .el-form-item__label {
    font-size: 16px;
    padding:0 20px 0 0;
  }
}
</style>

