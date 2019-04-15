<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>审核</span>
    </nav>
    <div class="content">
      <section>
        <div class="title">
          <span>报名审核</span>
        </div>
        <div class="form">
          <el-table
            :data="tableData"
            border
          >
            <el-table-column
              fixed
              prop="title"
              label="标题"
              width="300">
            </el-table-column>
            <el-table-column
              prop="date"
              label="报名日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="手机号码"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
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
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="10">
          </el-pagination>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        title: '茂名志愿老人服务行动',
        date: '2016-05-02',
        name: '王小虎',
        sex: '男',
        address: '上海市普陀区金沙江路 1518 弄',
        tel: 13660365522,
        status: '0'
      }, {
        title: '茂名志愿老人服务行动',
        date: '2016-05-04',
        name: '王小虎',
        sex: '女',
        address: '上海市普陀区金沙江路的在撒打发斯蒂芬放水阀 1517 弄',
        tel: 149885565554,
        status: '1'
      }, {
        title: '茂名志愿老人服务行动',
        date: '2016-05-01',
        name: '王小虎',
        sex: '男',
        address: '上海市普陀区金沙江路 1519 弄',
        tel: 13046251984,
        status: '0'
      }, {
        title: '茂名志愿老人服务行动',
        date: '2016-05-03',
        name: '王小虎',
        sex: '不详',
        address: '上海市普陀区金沙江路 1516 弄',
        tel: 13660365510,
        status: '2'
      }]
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
    },
    handleNoPass(val) {
      val.status = 2;
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
        width: 1000px;
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


