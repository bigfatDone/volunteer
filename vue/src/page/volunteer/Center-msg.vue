<template>
  <div class="page">
    <header>
      <el-tag v-show="status === 0">审核中</el-tag>
      <el-tag type="success" v-show="status === 1">审核通过</el-tag>
      <el-tag type="danger" v-show="status === 2">审核失败</el-tag>
      个人信息&nbsp;
      <i class="el-icon-edit icon" @click="dialogVisible = true"></i>
    </header>
    <section>
      <div class="item">
        <span>用户名：</span>
        <span>bigfat</span>
      </div>
      <div class="item">
        <span>邮箱：</span>
        <span>1964005690@qq.com</span>
      </div>
      <div class="item">
        <span>真实姓名：</span>
        <span>钟阳山</span>
      </div>
      <div class="item">
        <span>身份证号码：</span>
        <span>440923199502092152</span>
      </div>
      <div class="item">
        <span>性别：</span>
        <span>男</span>
      </div>
      <div class="item">
        <span>出生日期：</span>
        <span>1995-02-11</span>
      </div>
      <div class="item">
        <span>政治面貌：</span>
        <span>团员</span>
      </div>
      <div class="item">
        <span>电话号码：</span>
        <span>13660365510</span>
      </div>
      <div class="item">
        <span>居住地址：</span>
        <span>仲恺农业工程学院</span>
      </div>
    </section>
    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="form" :rules="rule" ref="form" label-width="135px">
        <div class="title">账号信息</div>
        <div class="conntent">
          <el-form-item prop="name" label="用户名：">
            <el-input type="text" v-model="form.name" disabled></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码：">
            <el-input type="password" v-model="form.password" placeholder="请输入密码："></el-input>
          </el-form-item>
          <el-form-item prop="passwordAgain" label="确认密码：">
            <el-input type="password" v-model="form.passwordAgain" placeholder="再次输入密码："></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱：">
            <el-input type="email" v-model="form.email" placeholder="请输入邮箱："></el-input>
          </el-form-item>
        </div>
        <div class="title">个人基本信息</div>
        <div class="conntent">
          <el-form-item prop="realName" label="真实姓名：">
            <el-input type="text" v-model="form.realName" placeholder="请输入真实姓名："></el-input>
          </el-form-item>
          <el-form-item prop="idCard" label="身份证号码：">
            <el-input type="text" v-model="form.idCard" placeholder="请输入身份证号码："></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别：">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="date" label="出生日期：">
            <el-date-picker
              v-model="form.date"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOption"
              placeholder="输入出生日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="politic" label="政治面貌：">
            <el-select v-model="form.politic" placeholder="请输入政治面貌">
              <el-option v-for="item in politicOption" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="phone" label="电话：">
            <el-input v-model="form.phone" placeholder="请输入手机号码："></el-input>
          </el-form-item>
          <el-form-item prop="address" label="居住地址：">
            <el-input v-model="form.address" placeholder="请输入居住地址："></el-input>
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
import { getUpdateUser } from '@/api/login/login'
export default {
  data() {
    return {
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      status: '',
      userInfo: {},
      form: {
        name: "钟阳山",
        password: "",
        passwordAgain: "",
        email: "",
        realName: "",
        idCard: "",
        sex: "",
        date: "2019-03-12",
        politic: "",
        phone: ""
      },
      rule: {
        name: {
          required: true,
          validator: this.checkRule.checkName,
          trigger: "blur"
        },
        password: {
          required: true,
          validator: this.checkRule.checkPassword,
          trigger: "blur"
        },
        passwordAgain: {
          required: true,
          validator: this.getValidator("确认密码"),
          trigger: "blur"
        },
        email: {
          required: true,
          validator: this.checkRule.checkEmail,
          trigger: "blur"
        },
        realName: {
          required: true,
          validator: this.checkRule.checkName,
          trigger: "blur"
        },
        idCard: {
          required: true,
          validator: this.checkRule.checkIdCard,
          trigger: "blur"
        },
        sex: {
          required: true,
          validator: this.checkRule.checkSex,
          strigger: "blur"
        },
        date: {
          required: true,
          validator: this.getValidator("出生日期"),
          strigger: "blur"
        },
        politic: {
          required: true,
          validator: this.getValidator("政治面貌"),
          strigger: "blur"
        },
        phone: {
          required: true,
          validator: this.checkRule.checkPhone,
          strigger: "blur"
        },
        address: {
          required: true,
          validator: this.getValidator("居住地址"),
          strigger: "blur"
        }
      },
      politicOption: [
        { value: "党员" },
        { value: "共青团员" },
        { value: "群众" },
        { value: "其他" }
      ],
      dialogVisible: false
    };
  },
  methods: {
    getValidator(val) {
      let check = "";
      const checkPasswordAgain = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (value !== this.form.password) {
          callback(new Error("输入的密码不一致"));
        } else {
          callback();
        }
      };
      const checkPolitic = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请选择政治面貌"));
        } else {
          callback();
        }
      };
      const checkDate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(`请输入${val}`));
        } else {
          callback();
        }
      };
      if (val == "确认密码") {
        check = checkPasswordAgain;
      } else if (val == "政治面貌") {
        check = checkPolitic;
      } else if (val == "出生日期" || val == "居住地址") {
        check = checkDate;
      } else {
      }
      return check;
    },
    toUpdateUser() {
       getUpdateUser({
        id: this.$store.state.userInfo.id
      }).then( res => {
         this.status = res[0].type
      })
    },
    submitForm(form) {
      this.dialogVisible = false;
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form);
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



