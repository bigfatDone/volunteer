<template>
  <div class="register-wrapper">
    <header>注册志愿者账号</header>
    <div class="container">
      <el-form :model="form" :rules="rule" ref="form" label-width="135px">
        <div class="title">账号信息</div>
        <div class="conntent">
          <el-form-item prop="name" label="用户名：">
            <el-input type="text" v-model="form.name" placeholder="请输入用户名："></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码：">
            <el-input type="password" v-model="form.password" placeholder="请输入密码："></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain" label="确认密码：">
            <el-input type="password" v-model="form.passwordAgain" placeholder="再次输入密码："></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
            <el-input type="email" v-model="form.email"  placeholder="请输入邮箱："></el-input>
          </el-form-item>
        </div>
        <div class="title">社区基本信息</div>
        <div class="conntent">
          <el-form-item prop="realName" label="社区名称：">
            <el-input type="text" v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item prop="manager" label="社区负责人：">
            <el-input type="text" v-model="form.manager"></el-input>
          </el-form-item>
          <el-form-item prop='phone' label="联系人电话：">
            <el-input v-model="form.phone" placeholder="请输入手机号码："></el-input>
          </el-form-item>
          <el-form-item prop='address' label="社区地址：">
            <el-input v-model="form.address" placeholder="请输入社区地址："></el-input>
          </el-form-item>
        </div>
        <el-form-item class="btn-form">
          <el-button type="primary" @click="submitForm('form')" class="btn" round>提&nbsp;交</el-button>
          <el-button type="info" @click="goback" class="btn" round>返&nbsp;回</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      form: {
        name: '',
        password: '',
        passwordAgain: '',
        email:'',
        realName: '',
        manager: '',
        date: '',
        phone: '',
        address: ''
      },
      rule: {
        name: {required: true, validator: this.checkRule.checkName, trigger: 'blur'},
        password: {required: true, validator: this.checkRule.checkPassword, trigger: 'blur'},
        passwordAgain: {required: true, validator: this.getValidator('确认密码'), trigger: 'blur'},
        email: {required: true, validator: this.checkRule.checkEmail, trigger: 'blur'},
        realName: {required: true, validator: this.getValidator('社区名称'), trigger: 'blur'},
        manager: {required: true, validator: this.getValidator('负责人'), strigger: 'blur'},
        phone: {required: true, validator: this.checkRule.checkPhone, strigger: 'blur'},
        address: {required: true, validator: this.getValidator('社区地址'), strigger: 'blur'},
      }
    }
  },
  methods: {
    getValidator(val) {
      let check = '';
      const checkPasswordAgain = (rule, value, callback) => {
        if (!value){
          callback(new Error('请输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('输入的密码不一致'))
        } else {
          callback()
        }
      };
      const checkPolitic = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择政治面貌'))
        } else {
          callback()
        }
      };
      const checkDate = (rule, value, callback) => {
        if (!value){
          callback(new Error(`请输入${val}`))
        } else {
          callback()
        }
      };
      if(val == '确认密码'){
        check = checkPasswordAgain;
     
      } else if (val == '社区地址' || val == '负责人' || val == '社区名称') {
        check = checkDate;
      } else {
      }
    return check;
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if(valid){
          console.log(this.form)
        } else {
          this.$message.warning('提交失败')
        }
      }
      )},
      goback() {
        this.$router.push('/login');
      }
  }
}
</script>
<style lang="scss" scoped>
.register-wrapper {
  width: 960px;
  height: 800px;
  margin: 0 auto;
  header {
    text-align: center;
    padding: 40px;
    margin: 10px 0 10px;
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
      padding: 20px 80px;
      box-sizing: border-box;
      border: 1px solid $base-border-color;
    }
    .btn-form {
      margin: 40px 120px 40px;
      .btn {
        margin-left: 30px;
        width: 150px;
        font-size: 20px;
      }
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
  .el-select {
    width: 50%;
    .el-option {
      width: 60%;
    }
  }
    
}
</style>

