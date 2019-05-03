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
              prop="time"
              label="报名日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="user_sex"
              label="性别"
              width="120">
            </el-table-column>
            <el-table-column
              prop="user_address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号码"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <div v-if=" scope.row.type == 0">
                  <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="handleNoPass(scope.row)" type="text" size="small">不通过</el-button>
                </div>
                <el-tag
                type="primary"
                v-else-if="scope.row.type == 1"
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
import { getAuditAll,getAuditPass,getAuditNoPass } from '@/api/project'
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    // 审核通过
    handlePass(val) {
      getAuditPass({
        id: val.id
      }).then( res => {
        this.$message.success(res.msg);
        this.toAuditAll();
      })
    },
    // 审核不通过
    handleNoPass(val) {
       getAuditNoPass({
        id: val.id
      }).then( res => {
        this.$message.success(res.msg);
        this.toAuditAll();
      })
    },
    // 获取志愿项目审核
    toAuditAll() {
      getAuditAll({
        id: this.$store.state.userInfo.id
      }).then( res => {
        this.tableData = res;
      })
    }
  },
  mounted() {
    this.toAuditAll();
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


