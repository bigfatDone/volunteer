<template>
  <div class="container">
    <div class="content">
      <section>
        <div class="title">
          <span>求助信息管理</span>
        </div>
        <div class="form">
          <el-table :data="tableData" border>
            <el-table-column fixed prop="title" label="求助标题" width="150"></el-table-column>
            <el-table-column prop="area" label="所在区域" width="100"></el-table-column>
            <el-table-column prop="content" label="求助内容" width="180"></el-table-column>
            <el-table-column prop="mark" label="备注" width="120"></el-table-column>
            <el-table-column prop="address" label="详细地址" width="150"></el-table-column>
            <el-table-column prop="name" label="求助人" width="100"></el-table-column>
            <el-table-column prop="phone" label="联系号码" width="120"></el-table-column>
            <el-table-column prop="date" label="发布日期" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <div v-if=" scope.row.grade == 0">
                  <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="handleNoPass(scope.row)" type="text" size="small">不通过</el-button>
                </div>
                <el-tag type="primary" v-else-if="scope.row.grade == 1" disable-transitions>已通过</el-tag>
                <el-tag type="danger" v-else disable-transitions>不通过</el-tag>
                <el-button @click="dialogVisible = true" type="text" size="small">备注</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
        </div>
      </section>
      <el-dialog :visible.sync="dialogVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="求助标题：" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入求助标题"></el-input>
          </el-form-item>
          <el-form-item label="所在区域：" prop="area">
            <el-select v-model="ruleForm.area" placeholder="请选择所在区域">
              <el-option label="茂名" value="茂名"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="求助内容：" prop="content">
            <el-input type="textarea" v-model="ruleForm.content" placeholder="请输入求助内容"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="ruleForm.mark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="求助人：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入求助人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系号码：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系号码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" round>取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" round>修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getHelpAll } from "@/api/help";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      ruleForm: {
        title: "",
        area: "",
        content: "",
        mark: "",
        address: "",
        name: "",
        phone: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        area: [
          { required: true, message: "请选择所在区域", trigger: "change" }
        ],
        content: [{ required: true, message: "请填写求助内容", trigger: "blur" }],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        name: [
          {
            required: true,
            validator: this.checkRule.checkName,
            trigger: "blur"
          }
        ],
        phone: [
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
    toDetail() {
      this.$router.push({
        name: "project-detail"
      });
    },
    handlePass(val) {
      val.grade = 1;
      console.log(val);
    },
    handleNoPass(val) {
      val.grade = 2;
    },
    toHelpAll() {
      getHelpAll({}).then(res => {
        this.tableData = res;
      });
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
    }
  },
  mounted() {
    this.toHelpAll()
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 0 auto 20px;
  .content {
    display: flex;
    justify-content: space-between;
    section {
      border: 1px solid #c5e9fb;
      .title {
        width: 450px;
        line-height: 35px;
        font-size: 18px;
        margin: 20px auto 15px;
        text-align: center;
      }
      .form {
        width: 700px;
      }
      .page {
        margin: 70px auto 100px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>

<style lang="scss">
.container {
  .el-table--enable-row-transition .el-table__body td {
    text-align: center;
  }
  .el-table th {
    text-align: center;
  }
}
</style>


