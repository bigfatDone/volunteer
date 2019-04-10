<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>发布项目</span>
    </nav>
    <div class="content">
      <section class="form">
        <div class="title">项目填报</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题：" prop="header">
            <el-input v-model="ruleForm.header" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="所在区域：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
              <el-option label="茂名" value="茂名"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招募人数：">
            <el-input-number v-model="ruleForm.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="招募开始日期：" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.st_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="输入招募开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;&nbsp;-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.end_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="输入招募结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="开始日期：" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.work_st_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;&nbsp;-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.work_end_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="输入结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="项目描述：" prop="desc">
            <el-input v-model="ruleForm.desc" placeholder="请输入项目描述"></el-input>
          </el-form-item>
          <el-form-item label="项目详情：" prop="detail">
            <el-input type="textarea" v-model="ruleForm.detail" placeholder="项目详情"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <div class="title">社区资料填写</div>
          <el-form-item label="社区名称：" prop="community">
            <el-input v-model="ruleForm.community" placeholder="请输入社区名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系号码：" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入联系号码"></el-input>
          </el-form-item>
          <el-form-item label="社区地址：" prop="communityAddr">
            <el-input v-model="ruleForm.communityAddr" placeholder="请输入社区地址"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')" round>发&nbsp;布</el-button>
            <el-button @click="resetForm('ruleForm')" round>重&nbsp;置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        header: "",
        region: "",
        number: 1,
        st_time: "",
        end_time: "",
        work_st_time: "",
        work_end_time: "",
        desc: "",
        detail: "",
        address: "",
        community: "",
        name: "",
        tel: "",
        communityAddr: ""
      },
      rules: {
        header: [{ required: true, message: "请输入标题", trigger: "blur" }],
        region: [
          { required: true, message: "请选择所在区域", trigger: "change" }
        ],
        number: [
          { required: true, message: "请输入招募人数", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写项目描述", trigger: "blur" }],
        detail: [
          { required: true, message: "请填写项目详情", trigger: "blur" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        community: [
          { required: true, message: "请填写社区名称", trigger: "blur" }
        ],
        name: [
          {
            required: true,
            validator: this.checkRule.checkName,
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            validator: this.checkRule.checkPhone,
            trigger: "blur"
          }
        ],
        communityAddr: [
          { required: true, message: "请填写社区地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 0 auto 20px;
  nav {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    margin: 10px;
    font-size: 18px;
    border: 1px solid #eee;
    border-radius: 5px;
    span:nth-child(2) {
      font-size: 16px;
      color: $base-color;
      cursor: pointer;
    }
    span:nth-child(3) {
      font-size: 16px;
      // color: $base-color;
      // cursor: pointer;
    }
  }
  .content {
    border: 1px solid #c5e9fb;
    border-radius: 5px;
    margin: 0 50px;
    .form {
      width: 600px;
      margin: 20px auto 20px;
      .title {
        width: 450px;
        line-height: 35px;
        font-size: 18px;
        margin: 0 auto 15px;
        text-align: center;
      }
      .line {
        padding-left: 15px;
      }
      .btn {
        margin: 40px 0 60px 100px;
      }
    }
  }
}
</style>
<style lang="scss">
.content {
  .el-form-item__label {
    padding: 0 20px 0 0;
    font-size: 16px;
  }
  .el-input__inner {
    font-size: 15px;
  }
  .el-textarea__inner {
    height: 110px;
    font-size: 15px;
  }
}
</style>


