<template>
  <div class="page">
    <header>
      <el-tag v-show="type === 0">审核中</el-tag>
      <el-tag type="success" v-show="type === 1">审核通过</el-tag>
      <el-tag type="danger" v-show="type === 3">审核失败</el-tag>
      社区信息&nbsp;
      <i class="el-icon-edit icon" @click="dialogVisible = true"></i>
    </header>
    <section>
      <div class="item">
        <span>用户名：</span>
        <span>{{this.form.name}}</span>
      </div>
      <div class="item">
        <span>邮箱：</span>
        <span>{{this.form.email}}</span>
      </div>
      <div class="item">
        <span>社区名称：</span>
        <span>{{this.form.realName}}</span>
      </div>
      <div class="item">
        <span>社区负责人：</span>
        <span>{{this.form.manager}}</span>
      </div>
      <div class="item">
        <span>社区编码：</span>
        <span>{{this.form.coding}}</span>
      </div>
      <div class="item">
        <span>电话号码：</span>
        <span>{{this.form.phone}}</span>
      </div>
      <div class="item">
        <span>社区地址：</span>
        <span>{{this.form.address}}</span>
      </div>
    </section>
    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rule" ref="form" label-width="135px">
        <div class="title">账号信息</div>
        <div class="conntent">
          <el-form-item prop="name" label="用户名：">
            <el-input type="text" v-model="form.name" placeholder="请输入用户名：" disabled=""></el-input>
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
            <el-input type="text" v-model="form.realName" placeholder="请输入社区名称"></el-input>
          </el-form-item>
          <el-form-item prop="coding" label="社区编码：">
            <el-input type="text" v-model="form.coding" placeholder="请输入社区负责人" disabled=""></el-input>
          </el-form-item>
          <el-form-item prop="manager" label="社区负责人：">
            <el-input type="text" v-model="form.manager" placeholder="请输入社区负责人"></el-input>
          </el-form-item>
          <el-form-item prop='phone' label="联系人电话：">
            <el-input v-model="form.phone" placeholder="请输入手机号码："></el-input>
          </el-form-item>
          <el-form-item prop='address' label="社区地址：">
            <el-input v-model="form.address" placeholder="请输入社区地址："></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUpdateUser,getCommunityModify } from '@/api/login/login'
export default {
  data() {
    return {
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      type: '',
     form: {
        name: '',
        password: '',
        passwordAgain: '',
        email:'',
        realName: '',
        coding: '',
        manager: '',
        phone: '',
        address: ''
      },
      rule: {
        name: {required: true, validator: this.checkRule.checkName, trigger: 'blur'},
        password: {required: true, validator: this.checkRule.checkPassword, trigger: 'blur'},
        passwordAgain: {required: true, validator: this.getValidator('确认密码'), trigger: 'blur'},
        email: {required: true, validator: this.checkRule.checkEmail, trigger: 'blur'},
        realName: {required: true, validator: this.getValidator('社区名称'), trigger: 'blur'},
        coding: {required: true, message: '不为空', trigger: 'blur'},
        manager: {required: true, validator: this.getValidator('负责人'), strigger: 'blur'},
        phone: {required: true, validator: this.checkRule.checkPhone, strigger: 'blur'},
        address: {required: true, validator: this.getValidator('社区地址'), strigger: 'blur'},
      },
      dialogVisible: false
    };
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
     toUpdateUser() {
       getUpdateUser({
        id: this.$store.state.userInfo.id
      }).then( res => {
        if( res[0].flag == 1) {
        console.log(res)
         this.status = res[0].type,
         this.form.name = res[0].name,
         this.form.password = res[0].password,
         this.form.passwordAgain = res[0].password,
         this.form.email = res[0].email,
         this.form.realName = res[0].cm_realname,
         this.form.coding = res[0].cm_coding,
         this.form.manager = res[0].cm_manager,
         this.form.phone = res[0].phone,
         this.form.address = res[0].cm_address,
         this.type = res[0].type
         } else {
           this.$store.commit('updataUserInfo',{})
         }
      })
    },
     // 提交表单修改
    toCommunityrModify() {
      getCommunityModify({
        id: this.$store.state.userInfo.id,
        name: this.form.name,
        password: this.form.password,
        email: this.form.email,
        realName: this.form.realName,
        coding: this.form.coding,
        manager: this.form.manager,
        phone: this.form.phone,
        address: this.form.address,
      }).then(res => {
        console.log(res)
        if (res.flag == 1) {
          this.$message.success(res.msg);
        } else {
          this.toUpdateUser()
        }
      });
    },
    submitForm(form) {
      this.dialogVisible = false;
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
          this.toCommunityrModify()
        } else {
          this.$message.warning("提交失败");
        }
      });
    }
  },
  mounted() {
  this.toUpdateUser();
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  header {
    height: 40px;
    margin: 20px 0;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    .icon:hover {
      color: $base-color;
      cursor: pointer;
    }
  }
  section {
    margin: 0 130px;
    .item {
      font-size: 16px;
      margin: 16px 0;
      span:nth-child(1) {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      span:nth-child(2) {
        color: $base-font-color;
      }
    }
  }
  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss">
.page {
  .el-dialog__body {
    padding-top: 10px;
  }
  .el-input {
    width: 85%;
  }
}
</style>



