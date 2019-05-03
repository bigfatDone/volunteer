<template>
  <div class="page">
    <div class="title">项目列表</div>
    <el-table
      :data="tableData"
      highlight-current-row
      max-height="600"
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="date" label="日期" width="120"></el-table-column>
      <el-table-column property="title" label="项目" width="120"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
      <el-table-column property="status" label="审核状态" width="120">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.status == 0" :type="'primary'" disable-transitions>审核中</el-tag>
          <el-tag v-show="scope.row.status == 1" :type="'primary'" disable-transitions>成功</el-tag>
          <el-tag v-show="scope.row.status == 2" :type="'danger'" disable-transitions>失败</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCommunityProject } from "@/api/project";
import { getPower } from "@/api/common";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null
    };
  },
  methods: {
    // 获取当前点击的列
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    toCommunityProject() {
      getCommunityProject({
        id: this.$store.state.userInfo.id
      }).then(res => {
        this.tableData = res;
      });
    },
    // 获取权限
    toPower() {
      getPower({
        id: this.$store.state.userInfo.id
      }).then(res => {});
    }
  },
  mounted() {
    this.toCommunityProject();
    this.toPower();
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
}
</style>
