<template>
  <div class="container">
    <div class="content">
      <section>
        <div class="title">
          <span>社区审核</span>
        </div>
        <div class="form">
          <el-table :data="tableData" border v-loading='loading'>
            <el-table-column fixed prop="name" label="用户名" width="100"></el-table-column>
            <el-table-column prop="password" label="密码" width="100"></el-table-column>
            <el-table-column prop="phone" label="电话号码" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="cm_realname" label="社区名称" width="100"></el-table-column>
            <el-table-column prop="cm_manager" label="社区负责人" width="100"></el-table-column>
            <el-table-column prop="cm_address" label="社区地址" width="150"></el-table-column>
            <el-table-column prop="date" label="注册日期" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <div v-if=" scope.row.type == 0">
                  <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="handleNoPass(scope.row)" type="text" size="small">不通过</el-button>
                </div>
                <el-tag type="primary" v-else-if="scope.row.type == 1" disable-transitions>已通过</el-tag>
                <el-tag type="danger" v-else disable-transitions>不通过</el-tag>
                <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { getCommunityCheck,getCommunityPass,getCommunityNoPass,getCommunityDelete } from '@/api/userCheck';
export default {
  data() {
    return {
      loading: true,
      tableData: [
        {
          name: "bigfat",
          password: 111111,
          email: "1964005690@qq.com",
          phone: "13660365510",
          cm_realname: "钟阳山社区",
          cm_manager: "钟阳山",
          cm_address: "上海市普陀区金沙江路 1518 弄",
          date: "2019-04-11",
          type: "0"
        }
      ]
    };
  },
  methods: {
    handlePass(val) {
        getCommunityPass({
        id: val.id
      }).then( req => {
        this.$message.success(req.msg)
        this.toCommunityCheck()
      })
    },
    handleNoPass(val) {
       getCommunityNoPass({
        id: val.id
      }).then( req => {
        this.$message.success(req.msg)
        this.toCommunityCheck()
      })
    },
      handleDelete(val) {
      getCommunityDelete({
        id: val.id
      }).then( res => {
        this.$message.success(res.msg)
        this.toCommunityCheck()
      })
    },
    toCommunityCheck(){
    getCommunityCheck({}).then( (res) =>{
      this.loading = false;
      this.tableData = res
    })
    }
  },
  mounted() {
     this.toCommunityCheck()
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


