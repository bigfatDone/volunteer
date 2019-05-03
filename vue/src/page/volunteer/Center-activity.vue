<template>
  <div class="page">
    <div class="title">项目列表</div>
    <el-table
      :data="tableData"
      highlight-current-row
      max-height="600"
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="100">
      </el-table-column>
      <el-table-column
        property="title"
        label="项目"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址"
        width="200">
      </el-table-column>
      <el-table-column
        property="realname"
        label="社区名称"
        width="120">
      </el-table-column>
      <el-table-column
        property="phone"
        label="联系号码"
        width="120">
      </el-table-column>
      <el-table-column
        property="cm_address"
        label="社区地址"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        property="tag"
        label="报名状态"
        width="120">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.type == 0" :type="'primary'" disable-transitions>审核中</el-tag>
          <el-tag v-show="scope.row.type == 1" :type="'primary'" disable-transitions>成功</el-tag>
          <el-tag v-show="scope.row.type == 2" :type="'danger'" disable-transitions>失败</el-tag>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVolunteerProject } from "@/api/project";
  export default {
    data() {
      return {
        tableData: [],
        currentRow: null
      }
    },

    methods: {
      // 获取当前点击的列
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      // 志愿者参加志愿项目状态
      toVolunteerProject() {
        getVolunteerProject({
          id: this.$store.state.userInfo.id
        }).then( res => {
          this.tableData = res;
        })
      }
    },
    mounted() {
      this.toVolunteerProject()
    }
  }
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
  }
</style>
<style>
    .el-table th.is-leaf, .el-table td {
      text-align: center!important;
    }
</style>

