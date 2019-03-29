<template>
  <div class="page">
    <div class="title">项目列表</div>
    <el-table
      :data="tableData"
      highlight-current-row
      stripe="true"
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
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="项目"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
      <el-table-column
        property="tag"
        label="报名状态"
        width="120">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '成功' ? 'primary' : 'danger'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '成功'
        }, {
          date: '2016-05-04',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '成功'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-01',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '失败'
        }, {
          date: '2016-05-03',
          name: '志愿茂名',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '成功'
        }],
        currentRow: null
      }
    },

    methods: {
      // 获取当前点击的列
      handleCurrentChange(val) {
        this.currentRow = val;
      }
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
