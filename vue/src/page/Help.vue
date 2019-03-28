<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>求助中心</span>
    </nav>
    <div class="content">
      <section class="form">
        <div class="title">任何人都可以发布求助信息，无需登录。志愿者可以在此选择就近的求助。</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="求助标题：" prop="header">
            <el-input v-model="ruleForm.header" placeholder="请输入求助标题"></el-input>
          </el-form-item>
          <el-form-item label="所在区域：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
              <el-option label="茂名" value="茂名"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="求助内容：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入求助内容"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="求助人：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入求助人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系号码：" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入联系号码"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')" round>发&nbsp;布</el-button>
            <el-button @click="resetForm('ruleForm')" round>重&nbsp;置</el-button>
          </el-form-item>
        </el-form>
      </section>
      <div class="line"></div>
      <section class="publish">
        <div class="item">
          <div class="item-title">
            <span>如何申诉改名字？</span>
            <span>2018-12-11</span>
          </div>
          <div class="item-info">
            <span>区域：</span>
            <span>茂名</span>
            <span>详细地址：</span>
            <span>牛路水村</span>
            <span>发布人：</span>
            <span>钟阳山</span>
            <span>联系号码：</span>
            <span>13660365510</span>
          </div>
          <div class="item-desc">
            我爱你baby！fasfasdfsadfasd法师法师法
            法法撒旦法师法师fasfasf fas fasfsadf
          </div>
          <div class="line-small"></div>
          <div class="item-remark">
            <span>备注：</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="item">
          <div class="item-title">
            <span>如何申诉改名字？</span>
            <span>2018-12-11</span>
          </div>
          <div class="item-info">
            <span>区域：</span>
            <span>茂名</span>
            <span>详细地址：</span>
            <span>牛路水村</span>
            <span>发布人：</span>
            <span>钟阳山</span>
            <span>联系号码：</span>
            <span>13660365510</span>
          </div>
          <div class="item-desc">
            我爱你baby！fasfasdfsadfasd法师法师法
            法法撒旦法师法师fasfasf fas fasfsadf
          </div>
          <div class="line-small"></div>
          <div class="item-remark">
            <span>备注：</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="50"
          ></el-pagination>
        </div>
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
        desc: "",
        address: "",
        name: "",
        tel: ""
      },
      rules: {
        header: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择所在区域", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写求助内容", trigger: "blur" }],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
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
    .form {
      width: 600px;
      margin: 20px auto 20px;
      .title {
        width: 450px;
        line-height: 35px;
        font-size: 18px;
        margin: 0 auto 15px;
        font-weight: bold;
        text-align: center;
      }
      .btn {
        margin-left: 100px;
        margin-top: 40px;
      }
    }
  }
  .publish {
    width: 100%;
    padding-top: 20px;
    .item {
      padding: 0 100px;
      margin-bottom: 40px;
      font-size: 16px;
      color: #000;
      .item-title {
        display: flex;
        margin: 15px 0px;
        padding: 0px 20px;
        justify-content: space-between;
        span:nth-child(1) {
          font-size: 22px;
        }
        span:nth-child(2) {
          color: $base-font-color;
        }
      }
      .item-info {
        margin: 15px 0px;
        span:nth-child(even) {
          margin-right: 20px;
        }
        span:nth-child(odd) {
          font-weight: 600;
        }
      }
      .item-desc {
        margin: 15px 0px;
        width: 500px;
        line-height: 28px;
        text-indent: 24px;
        color: $base-font-color;
        font-size: 16px;
      }
      .item-remark {
        width: 500px;
        margin: 15px 0px;
        text-indent: 20px;
        color: red;
      }
    }
    .page {
      margin: 70px auto 100px;
      display: flex;
      justify-content: center;
    }
  }
  .line {
    height: 1px;
    margin: 0 5px;
    background-color: $base-border-color;
  }
  .line-small {
    height: 1px;
    background-color: #e4d9d9;
  }
}
</style>
<style lang="scss">
.content {
  .el-form-item__label {
    padding: 0 28px 0 0;
    font-size: 16px;
  }
  .el-input__inner {
    font-size: 16px;
  }
  .el-textarea__inner {
    height: 120px;
    font-size: 16px;
  }
}
</style>


