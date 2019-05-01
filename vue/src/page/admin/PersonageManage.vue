<template>
  <div class="page">
    <div class="title">志愿人物管理</div>
    <el-table :data="tableData" highlight-current-row max-height="600" width="1000px">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="title" label="标题" width="300"></el-table-column>
      <el-table-column property="type" label="类型" width="50"></el-table-column>
      <el-table-column property="date" label="发布日期" width="120"></el-table-column>
      <el-table-column label="管理" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handlePass(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagin">
      <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
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
        <div class="title">志愿人物修改</div>
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
import { getPersonageAll,getPersonageModify,getPersonageDelete } from "@/api/personage";
export default {
  data() {
    return {
       content: null,
       id: "",
      ruleForm: {
        title: "",
        type: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }]
      },
      dialogVisible: false,
      tableData: [],
    };
  },
  methods: {
    handlePass(val) {
      this.dialogVisible = true;
      this.content = val.content;
      this.ruleForm.title = val.title;
      this.ruleForm.type = val.type;
      this.id = val.id;
      switch(val.type) {
        case 0:
          this.ruleForm.type = '志愿者风采';
          break;
        case 1:
          this.ruleForm.type = '志愿者故事';
          break;
        case 2:
          this.ruleForm.type = '志愿者心语';
          break;
      }
    },
    handleDelete(val) {
      getPersonageDelete({
        id: val.id
      }).then(res => {
        this.$message.success(res.msg)
        this.toPersonageAll()
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toPersonageModify()
          this.dialogVisible = false;
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
     // 获取所有志愿人物信息
    toPersonageAll() {
      getPersonageAll({}).then( res => {
        this.tableData = res
      })
    },
    // 修改志愿人物
    toPersonageModify() {
      if( this.ruleForm.type == '志愿者风采') {
        this.ruleForm.type = 0;
      } else if( this.ruleForm.type == '志愿者故事'){
        this.ruleForm.type = 1;
      } else if( this.ruleForm.type == '志愿者心语'){
        this.ruleForm.type = 2;
      } else {
        this.ruleForm.type = this.ruleForm.type;
      }
      getPersonageModify({
        id: this.id,
        title: this.ruleForm.title,
        type: this.ruleForm.type,
        content: this.content,
      }).then(res => {
        this.$message.success(res.msg)
        this.toPersonageAll()
      });
    }
  },
   mounted() {
    this.toPersonageAll();
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

