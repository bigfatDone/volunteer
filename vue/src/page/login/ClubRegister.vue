<template>
  <div class="club-register">
    <div class="register-box yn-info-modu">
      <div class="yn-info-head">广东益农信息社注册</div>
      <div class="yn-info-body">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="230px" class="info-custom-form">
          <el-form-item label="用户名：" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="againPassword">
            <el-input v-model="registerForm.againPassword" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="信息员姓名：" prop="name">
            <el-input v-model="registerForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="学历：">
            <el-select v-model="registerForm.educate" placeholder="请选择学历">
              <el-option
                v-for="item in educationList"
                :key="item.value"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-select v-model="registerForm.age" placeholder="请选择年龄段">
              <el-option
                v-for="item in ageList"
                :key="item.value"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="验证码：">
            <el-row :gutter="15">
              <el-col :span="16">
                <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="8">
                <div class="item-sub-col">
                  <img src="@/../static/images/login/code-img01.png" alt="" class="yn-fill-img">
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="手机验证码：">
            <el-row :gutter="15">
              <el-col :span="16">
                <el-input v-model="registerForm.phoneCode" placeholder="请输入手机验证码"></el-input>
              </el-col>
              <el-col :span="8">
                <div class="item-sub-col sub-col-btn">发送验证码</div>
              </el-col>
            </el-row>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" class="form-foot-btn" @click="submitRegister">提交注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { clubRegister } from '@/api/login'
export default {
  data() {
    // 自定义校验规则
    const comparePassword = (rule, value, callback) => {
      if(value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    }

    return {
      registerForm: {
        username: '',
        password: '',
        againPassword: '',
        phone: '',
        name: '',
        educate: '',
        age: ''
      },

      // 下拉列表数据
      educationList: [
        { value: 1, name: '小学' },
        { value: 2, name: '初中' },
        { value: 3, name: '高中' },
        { value: 4, name: '大学及以上' }
      ],
      ageList: [
        { value: 1, name: '35周岁以下（含35）' },
        { value: 2, name: '35周岁至45周岁（含45）' },
        { value: 3, name: '45周岁以上' }
      ],

      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: this.checkRule.checkPasswork, trigger: 'blur' }
        ],
        againPassword: [
          { required: true, validator: this.checkRule.checkPasswork, trigger: 'blur' },
          { required: true, validator: comparePassword, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: this.checkRule.checkPhone, trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        educate: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请选择年龄段', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitRegister() {
      this.$refs.registerForm.validate(valid => {
        if(valid) {
          delete this.registerForm.againPassword
          clubRegister(this.registerForm).then(res => {
            if(res.success) {
              this.$store.commit('updateClubLogin', res.data)
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push('/form/declareForm')
            } else {
              this.registerForm.againPassword = this.registerForm.password
              this.$message.error(res.message);
            }
          })
        } else {
          console.log('提交失败!!');
          return false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.club-register {
  width: 1000px;
  margin: 60px auto;
  overflow: hidden;
}
@media screen and (max-width: $phone-max-size) {
  .club-register {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
