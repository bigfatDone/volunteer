<template>
  <div class="retrieve-wrapper">
    <div class="register-box yn-info-modu">
      <div class="yn-info-head">重新设置密码</div>
      <div class="yn-info-body">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="230px" class="info-custom-form">
          <el-form-item label="手机号码：">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号码"></el-input>
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
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="registerForm.againPassword" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="form-foot-btn">确定修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        phone: '',
        password: '',
        againPassword: '',
        phoneCode: ''
      },

      // 校验规则
      rules: {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.retrieve-wrapper {
  width: 1000px;
  margin: 60px auto;
  overflow: hidden;
}
</style>
