<template>
  <div class="container">
    <div class="content">
      <section class="form">
        <div class="title">新闻填报</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题：" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <div class="editor">
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
            ></quill-editor>
          </div>
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
import { getNews } from '@/api/news'
export default {
  data() {
    return {
      content: null,
      ruleForm: {
        title: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交志愿信息
    toNews(val) {
      getNews({
        title: this.ruleForm.title,
        content: this.content,
        date: this.getNowFormatDate()
        }).then(res => {
          this.$message.success(res.msg)
          this.resetForm();
      });
    },
    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toNews();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置按钮
    resetForm(formName) {
      this.ruleForm.title = "";
      this.content = "";
    },
     // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto 20px;
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
        text-align: center;
      }
      .line {
        padding-left: 15px;
      }
      .btn {
        margin: 40px 0 60px 100px;
      }
      .editor {
        height: 400px;
        .quill-editor {
          height: 300px;
        }
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
  .ql-snow .ql-editor img {
    height: 100px;
    width: 100px;
  }
}
</style>


