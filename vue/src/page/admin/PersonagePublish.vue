<template>
  <div class="container">
    <div class="content">
      <section class="form">
        <div class="title">志愿人物发布</div>
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
            <el-form-item label="类型：" prop="type">
    <el-select v-model="ruleForm.type" placeholder="请选择志愿人物类型">
      <el-option label="志愿者风采" value="0"></el-option>
      <el-option label="志愿者故事" value="1"></el-option>
      <el-option label="志愿者心语" value="2"></el-option>
    </el-select>
  </el-form-item>
          <div class="editor">
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
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
export default {
  data() {
    return {
      content: null,
      editorOption: {},
      ruleForm: {
        title: "",
        type: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }]
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
      this.content = "";
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    }
  },
  watch: {
    content(val) {
      console.log(val);
    }
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


