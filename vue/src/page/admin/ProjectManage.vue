<template>
  <div class="container">
    <div class="content">
      <section>
        <div class="title">
          <span>志愿项目管理</span>
        </div>
        <div class="form">
          <el-table :data="tableData" border>
            <el-table-column fixed prop="header" label="标题" width="150"></el-table-column>
            <el-table-column prop="region" label="所在区域" width="100"></el-table-column>
            <el-table-column prop="number" label="招募人数" width="100"></el-table-column>
            <el-table-column prop="st_time" label="招募开始日期" width="120"></el-table-column>
            <el-table-column prop="end_time" label="招募结束日期" width="120"></el-table-column>
            <el-table-column prop="work_st_time" label="开始日期" width="120"></el-table-column>
            <el-table-column prop="work_end_time" label="招募结束日期" width="120"></el-table-column>
            <el-table-column prop="desc" label="项目描述" width="150"></el-table-column>
            <el-table-column prop="detail" label="项目详情" width="180"></el-table-column>
            <el-table-column prop="address" label="详细地址" width="120"></el-table-column>
            <el-table-column prop="community" label="社区名称" width="120"></el-table-column>
            <el-table-column prop="tel" label="联系号码" width="120"></el-table-column>
            <el-table-column prop="communityAddr" label="社区地址" width="140"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <div v-if=" scope.row.status == 0">
                  <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="handleNoPass(scope.row)" type="text" size="small">不通过</el-button>
                </div>
                <el-tag type="primary" v-else-if="scope.row.status == 1" disable-transitions>已通过</el-tag>
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
      dialogVisible: false,
      tableData: [
        {
          header: "支援中国",
          region: "茂名",
          number: 1,
          st_time: "2018-12-11",
          end_time: "2019-01-12",
          work_st_time: "2018-12-15",
          work_end_time: "2019-01-13",
          desc: "很nice的志愿",
          detail: "照顾茂名空巢老人",
          address: "东沙街24",
          community: "仲恺",
          name: "钟阳山",
          tel: "13660355510",
          communityAddr: "大元帅府"
        }
      ],
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
    toDetail() {
      this.$router.push({
        name: "project-detail"
      });
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
    }
  },
  mounted() {}
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


