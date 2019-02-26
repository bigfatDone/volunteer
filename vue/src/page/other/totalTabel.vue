<template>
  <div>
    <div class="custom-table">
      <div class="table-name table-tr">益农信息社申报认定工作开展情况</div>
      <div class="table-infor table-tr">
        <div class="item-l">统计时间</div>
        <div class="item-r">{{date}}</div>
      </div>
      <div class="table-title table-tr">已完成地市申报情况汇总表</div>
      <el-table :data="goodList" border style="width: 100%">
        <el-table-column prop="INDEX" label="序号" min-width="10%"></el-table-column>
        <el-table-column prop="CITY" label="地级市" min-width="10%"></el-table-column>
        <el-table-column prop="TASKCOUNT" label="任务数" min-width="10%"></el-table-column>
        <el-table-column prop="DISTRICTCOUNT" label="县级认定" min-width="10%"></el-table-column>
        <el-table-column prop="ACCOMPLISHRATE" label="完成率" min-width="10%">
          <template slot-scope="scope">{{scope.row.ACCOMPLISHRATE | percentFil}}</template>
        </el-table-column>
        <el-table-column prop="CITYCOUNT" label="市级备案" min-width="10%"></el-table-column>
      </el-table>
      <div class="table-title table-tr">未完成地市申报情况汇总表</div>
      <el-table :data="badList" border style="width: 100%" :show-header="false">
        <el-table-column prop="INDEX" label="序号" min-width="10%"></el-table-column>
        <el-table-column prop="CITY" label="地级市" min-width="10%"></el-table-column>
        <el-table-column prop="TASKCOUNT" label="任务数" min-width="10%"></el-table-column>
        <el-table-column prop="DISTRICTCOUNT" label="县级认定" min-width="10%"></el-table-column>
        <el-table-column prop="ACCOMPLISHRATE" label="完成率" min-width="10%">
          <template slot-scope="scope">{{scope.row.ACCOMPLISHRATE | percentFil}}</template>
        </el-table-column>
        <el-table-column prop="CITYCOUNT" label="市级备案" min-width="10%"></el-table-column>
      </el-table>
      <el-table
        :data="totalList"
        border
        style="width: 100%"
        :show-header="false"
        class="total-table"
      >
        <el-table-column prop="title" min-width="10%"></el-table-column>
        <el-table-column prop="name" min-width="10%"></el-table-column>
        <el-table-column prop="task" min-width="10%"></el-table-column>
        <el-table-column prop="district" min-width="10%"></el-table-column>
        <el-table-column prop="accomp" min-width="10%">
          <template slot-scope="scope">{{scope.row.accomp | percentFil}}</template>
        </el-table-column>
        <el-table-column prop="cityCount" min-width="10%"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import userinfor from "./userinfor.js";
import { postGivenLogin } from "@/api/base/given-login";
export default {
  data() {
    return {
      date: "",
      goodList: [],
      badList: [],
      totalList: [
        {
          title: "合计",
          name: "任务合计",
          task: 0,
          district: 0,
          accomp: "0%",
          cityCount: 0
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  filters: {
    //数字转百分比
    percentFil(value) {
      if (value) {
        return parseFloat(value).toFixed(1) + "%";
      } else {
        return "0%";
      }
    }
  },
  methods: {
    getList() {
      let userData = userinfor.getUser();
      postGivenLogin({
        username: userData.username,
        password: userData.password
      }).then(res => {
        if (res.success && res.resultList) {
          for (let i = 0; i < res.resultList.length; i++) {
            res.resultList[i].INDEX = i + 1;
            //已完成
            if (res.resultList[i].ACCOMPLISHRATE >= 100) {
              this.goodList.push(res.resultList[i]);
            }
            //未完成
            else if (res.resultList[i].ACCOMPLISHRATE < 100) {
              this.badList.push(res.resultList[i]);
            }
            //统计
            else {
              this.totalList[0].task = res.resultList[i].TASKCOUNTALL;
              // this.totalList[0].task = '';
              this.totalList[0].district = res.resultList[i].DISTRICTCOUNTALL;
              this.totalList[0].accomp = res.resultList[i].ACCOMPLISHRATEALL;
              this.totalList[0].cityCount = res.resultList[i].CITYCOUNTALL;
              this.date = res.resultList[i].STATISTICSDATE;
            }
          }
          //统计日期转换
          if (this.date) {
            let d = this.date.split("-");
            this.date = d[0] + "年" + d[1] + "月" + d[2] + "日";
          }
        } else {
          this.$router.push("/givenLogin");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$border-color: #787878;
.custom-table {
  font-size: 15px;
  width: 92%;
  max-width: 1000px;
  text-align: center;
  margin: 20px auto;
  .table-tr {
    font-weight: bold;
    line-height: 24px;
    border: 1px solid $border-color;
    border-bottom: 0;
    padding: 6px 0;
    overflow: hidden;
  }
  .table-name {
    font-size: 16px;
    line-height: 30px;
  }
  .table-infor {
    border-bottom: 1px solid $border-color;
    padding: 0;
    .item-l,
    .item-r {
      padding: 6px 0;
      box-sizing: border-box;
      float: left;
    }
    .item-l {
      width: 20%;
      border-right: 1px solid $border-color;
    }
    .item-r {
      width: 80%;
    }
  }
  .table-title {
    border-top: 0;
  }
  .total-table {
    margin-top: -1px;
  }
}
@media all and (max-width: 576px) {
  .custom-table {
    .table-infor {
      .item-l {
        width: 30%;
      }
      .item-r {
        width: 70%;
      }
    }
  }
}
</style>

<style lang="scss">
$border-color: #787878;
.custom-table {
  .el-table {
    border-color: $border-color;
    &::after,
    &::before {
      background-color: $border-color;
    }
    td,
    th {
      color: #333;
      border-color: $border-color;
      padding: 6px 0;
    }
  }
}
@media all and (max-width: 576px) {
  .custom-table {
    .el-table {
      td,
      th {
        .cell {
          line-height: 20px;
          padding: 0 6px;
        }
      }
    }
  }
}
</style>