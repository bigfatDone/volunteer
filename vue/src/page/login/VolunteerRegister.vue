<template>
  <div class="register-wrapper">
    <header>注册志愿者账号</header>
    <div class="container">
      <el-form :model="form" :rules="rule" ref="form" label-width="135px">
        <div class="title">账号信息</div>
        <div class="conntent">
          <el-form-item prop="name" label="姓名：">
            <el-input type="text" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码：">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain" label="确认密码：">
            <el-input type="password" v-model="form.passwordAgain"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
            <el-input type="email" v-model="form.email"></el-input>
          </el-form-item>
        </div>
        <div class="title">个人基本信息</div>
        <div class="conntent">
          <el-form-item prop="realName" label="真实姓名：">
            <el-input type="text" v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item prop="idCard" label="身份证号码：">
            <el-input type="text" v-model="form.idCard"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别：">
            <el-radio-group v-model="form.sex">
              <el-radio  label="男"></el-radio>
              <el-radio  label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop='date' label="出生日期：">
            <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOption" placeholder="输入出生日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="politic" label="政治面貌：">
            <el-select v-model="form.politic" placeholder="请输入政治面貌">
              <el-option v-for="item in politicOption"
                :key="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop='phone' label="电话：">
            <el-input v-model="form.phone" placeholder="请输入手机号码："></el-input>
          </el-form-item>
          <el-form-item prop='address' label="居住地址：">
            <el-input v-model="form.address" placeholder="请输入居住地址："></el-input>
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
        idCard: '',
        sex: '',
        date: '',
        politic: '',
        phone: '',
      },
      rule: {
        name: {required: true, validator: this.checkRule.checkName, trigger: 'blur'},
        password: {required: true, validator: this.checkRule.checkPassword, trigger: 'blur'},
        passwordAgain: {required: true, validator: this.getValidator('确认密码'), trigger: 'blur'},
        email: {required: true, validator: this.checkRule.checkEmail, trigger: 'blur'},
        realName: {required: true, validator: this.checkRule.checkName, trigger: 'blur'},
        idCard: {required:true, validator: this.checkRule.checkIdCard, trigger: 'blur'},
        sex: {required: true, validator: this.checkRule.checkSex, strigger: 'blur'},
        date: {required: true, validator: this.getValidator('出生日期'), strigger: 'blur'},
        politic: {required: true, validator: this.getValidator('政治面貌'), strigger: 'blur'},
        phone: {required: true, validator: this.checkRule.checkPhone, strigger: 'blur'},
        address: {required: true, validator: this.getValidator('居住地址'), strigger: 'blur'},
      },
      politicOption: [
        {value:'党员'},
        {value:'共青团员'},
        {value:'群众'},
        {value:'其他'},
        ]
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
      } else if (val == '政治面貌') {
        check = checkPolitic;
      } else if (val == '出生日期' || val == '居住地址') {
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

