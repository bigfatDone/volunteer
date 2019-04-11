<template>
  <div class="page">
    <div class="title">志愿人物管理</div>
    <el-table :data="tableData" highlight-current-row max-height="600" style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="title" label="标题" width="400"></el-table-column>
      <el-table-column property="type" label="类型" width="50"></el-table-column>
      <el-table-column label="管理" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handlePass(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handlePass(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagin">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <section class="dialog">
      <el-dialog :visible.sync="dialogVisible">
         <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <div class="title">资讯修改</div>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" round>取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" round>修 改</el-button>
        </div>
      </el-dialog>
    </section>
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
      },
      dialogVisible: false,
      tableData: [
        {
          title: "法师法师法撒发生大公司的股份收到广东省分公司大股东幅度发",
          type: '0'
        },
        {
          title: "发生发撒的发生的发放",
          type: '1'
        }
      ],
    };
  },

  methods: {
    handlePass(val) {
      this.dialogVisible = true;
      console.log(val.title);
    },
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
  }
};
</script>

<style lang="scss" scoped>
.page {
  .title {
    padding: 15px 0 10px;
    font-size: 23px;
    text-align: center;
  }
  .el-table tr {
    cursor: pointer;
  }
  .pagin {
    margin: 70px auto 100px;
    display: flex;
    justify-content: center;
  }
  .dialog {
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
</style>

<style lang="scss">
.page {
  .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
  .el-table th {
    text-align: center;
  }
  .ql-snow .ql-editor img {
    height: 100px;
    width: 100px;
  }
  .el-dialog__body {
    padding: 0px 20px;
  }
}
</style>

