<template>
  <div class="container">
    <div class="content">
      <section>
        <div class="title">
          <span>求助信息管理</span>
        </div>
        <div class="form">
          <el-table
            :data="tableData"
            border
          >
            <el-table-column
              fixed
              prop="name"
              label="用户名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="password"
              label="密码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话号码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="120">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="card"
              label="身份证号码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="50">
            </el-table-column>
            <el-table-column
              prop="user_date"
              label="出生日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="politic"
              label="政治面貌"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="居住地址"
              width="200">
            </el-table-column>
            <el-table-column
              prop="create_date"
              label="注册日期"
              width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <div v-if=" scope.row.status == 0">
                  <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="handleNoPass(scope.row)" type="text" size="small">不通过</el-button>
                </div>
                <el-tag
                type="primary"
                v-else-if="scope.row.status == 1"
                disable-transitions
                >已通过</el-tag>
                <el-tag
                type="danger"
                v-else
                disable-transitions
                >不通过</el-tag>
                <el-button @click="dialogVisible = true" type="text" size="small">备注</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
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
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="ruleForm.mark" placeholder="请输入备注"></el-input>
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
export default {
  data() {
    return {
      dialogVisible:false,
      tableData: [
        {
          name: 'bigfat',
          password: 111111,
          email: '1964005690@qq.com',
          phone: '13660365510',
          user_name: '钟阳山',
          card: 440923199502092154,
          user_date: '1995-02-09',
          politic: '团员',
          address: '上海市普陀区金沙江路 1518 弄',
          create_date: '2019-04-11',
          status: '0'
        },
        {
          name: 'bigfat',
          password: 111111,
          email: '1964005690@qq.com',
          phone: '13660365510',
          realname: '钟阳山',
          card: 440923199502092154,
          user_date: '1995-02-09',
          politic: '团员',
          address: '上海市普陀区金沙江路 1518 弄',
          create_date: '2019-04-11',
          status: '1'
        },
        {
          name: 'bigfat',
          password: 111111,
          email: '1964005690@qq.com',
          phone: '13660365510',
          realname: '钟阳山',
          card: 440923199502092154,
          user_date: '1995-02-09',
          politic: '团员',
          address: '上海市普陀区金沙江路 1518 弄',
          create_date: '2019-04-11',
          status: '2'
        },
        ],
        ruleForm: {
        header: "",
        region: "",
        desc: "",
        mark: "",
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
    toDetail() {
      this.$router.push({
        name: "project-detail"
      })
    },
    handlePass(val) {
      val.status = 1;
      console.log(val);
    },
    handleNoPass(val) {
      val.status = 2;
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
  },
  mounted() {
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


