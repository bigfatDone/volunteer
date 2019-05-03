<template>
  <div class="page">
    <div class="title">管理员管理&nbsp;&nbsp;<el-button type="primary" @click="dialogVisible = true" circle size="small">添加</el-button></div>
    <el-table :data="tableData" highlight-current-row max-height="600" style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column property="name" label="用户名" width="200"></el-table-column>
      <el-table-column property="password" label="密码" width="200"></el-table-column>
      <el-table-column label="管理" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handlePass(scope.row)">删除</el-button>
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
          <div class="title">添加管理员</div>
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')" round>取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" round>修 改</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import { getAdminAll,getAdminDelete,getAdminAdd } from '@/api/userCheck'
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      dialogVisible: false,
      tableData: []
    };
  },

  methods: {
    toAdminAdd() {
      getAdminAdd({
        name: this.ruleForm.name,
        password: this.ruleForm.password
      }).then( res => {
        this.$message.success(res.msg);
        this.resetForm();
        this.toAdminAll();
      })
    },
    toAdminAll() {
      getAdminAll({}).then( res => {
        this.tableData = res;
      })
    },
    handlePass(val) {
      getAdminDelete({
        id: val.id
      }).then( res => {
        this.$message.success(res.msg);
        this.toAdminAll();
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toAdminAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.dialogVisible = false;
      this.ruleForm.password = "";
      this.ruleForm.name;
    }
  },
  mounted() {
    this.toAdminAll();
  }
};
</script>

<style lang="scss" scoped>
.page {
  .title {
    padding: 15px 0 10px;
    font-size: 18px;
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
  .el-input {
    width: 80%;
  }
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

