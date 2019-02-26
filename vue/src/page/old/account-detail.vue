<template>
  <div class="whole">
    <div class="balance">
      <div class="mybalance">
        <span>账户余额：￥{{money}}</span>
      </div>
      <div class="account-detail">
        <span>账户明细</span>
      </div>
    </div>
    <div class="hr"></div>
    <div class="main" v-if="this.accountList.length">
      <div class="item" v-for="(item, index) in accountList" :key="index">
        <div class="item-box">
          <div class="item-box-number">
            <span>订单编号：{{item.ENTRUST_ORDER_ID}}</span>
          </div>
          <div class="item-box-spend">
            <span v-if="item.DEAL_TYPE  == 0">费用退款</span>
            <span v-if="item.DEAL_TYPE   == 1">检测认证消费</span>
            <span v-if="item.DEAL_TYPE   == 2">账户充值</span>
            <span v-if="item.DEAL_TYPE == 0">+ {{item.DEAL_MONEY}}元</span>
            <span v-else>- {{item.DEAL_MONEY}}元</span>
          </div>
          <div class="item-box-success">
            <span v-if="item.DEAL_TYPE  == 0 ">退款成功</span>
            <span v-if="item.DEAL_TYPE  == 1">支付成功</span>
            <span v-if="item.DEAL_TYPE  == 2">充值成功</span>
          </div>
          <div class="item-box-time">
            <span>{{item.DEAL_TIME}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.accountList.length" class="pagination">
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        @current-change="handlePage"
        :current-page="currentPage"
        :page-size="4"
      ></el-pagination>
    </div>
    <div v-else class="blank">
      <div class="blank-img">
        <img src="@/../static/img/old/null.png" class="img">
      </div>
      <div class="tip">
        <span>没有相关信息！</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getAccountDetail } from "@/api/old/person";
export default {
  data() {
    return {
      accountList: [],
      money: 0,
      name: "",
      id: "",
      total: 0,
      currentPage: 0,
      wxUser: ""
    };
  },
  methods: {
    // 获取微信登录
    getWxUser() {
      this.wxUser = this.$store.state.entrustData;
      this.id = this.wxUser.wxId;
      this.name = this.wxUser.wxName;
    },
    getAccountInfo(val) {
      this.getWxUser();
      getAccountDetail({
        token: this.wxUser.token,
        entrustxxb_id: this.wxUser.wxId,
        showCount: 4, // 每页显示条数
        currentPage: val
      }).then(res => {
        if (res.success) {
          this.money = res.returnMap.MONEY;
          this.total = res.returnMap.totalResult;
          this.accountList = res.resultList;
        } else {
          if (res.message == "登录信息失效,请重新登录") {
            let wechatData = {};
            this.$message.error(res.message);
            this.$store.commit("updateEntrustData", wechatData);
            this.$router.push({ path: "/index" });
          }
        }
      });
    },
    /* 翻页的效果 */
    handlePage(val) {
      this.currentPage = val;
      this.getAccountInfo(val);
    }
  },
  mounted() {
    this.getAccountInfo(1);
  }
};
</script>
<style lang="scss" scoped>
.whole {
  width: 930px;
  height: 100%;
  .balance {
    box-sizing: border-box;
    height: 120px;
    padding: 40px 50px 39px 80px;
    background-color: #fff;
    .mybalance {
      width: 400px;
      height: 30px;
      float: left;
      font-size: 24px;
      font-family: Adobe Heiti Std R;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
    }
    .account-detail {
      box-sizing: border-box;
      width: 120px;
      height: 40px;
      float: right;
      padding: 9px 28px;
      background: rgba(153, 153, 153, 1);
      border-radius: 4px;
      span {
        width: 64px;
        height: 16px;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        cursor: pointer;
      }
    }
  }
  .hr {
    height: 10px;
    width: 100%;
    background: #f2f2f2;
  }
  .main {
    .item {
      padding: 24px 11px 24px 20px;
      margin-bottom: 10px;
      margin-left: 20px;
      width: 910px;
      height: 192px;
      box-sizing: border-box;
      border-radius: 2px;
      background: #fff;
      .item-box {
        .item-box-number {
          height: 44px;
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .item-box-spend {
          height: 46px;
          font-size: 20px;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          display: flex;
          justify-content: space-between;
          span:nth-child(2) {
            font-weight: bold;
          }
        }
        .item-box-success {
          height: 36px;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
          line-height: 22px;
          display: flex;
          justify-content: space-between;
        }
        .item-box-time {
          height: 16px;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .color-brown {
      color: #6b0000;
    }
    .color-green {
      color: #019900;
    }
  }
  .pagination {
    height: 60px;
    text-align: center;
    margin: 0 auto;
    padding-top: 21px;
    background: #fff;
    margin-left: 18px;
  }
  .blank {
    width: 100%;
    border-radius: 1px;
    height: 880px;
    background: #fff;
    .blank-img {
      width: 300px;
      height: 230px;
      margin-top: 20px;
      padding-top: 150px;
      margin-left: 255px;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .tip {
      font-size: 20px;
      color: #aaa;
      line-height: 24px;
      margin-left: 334px;
      margin-top: 28px;
    }
  }
}
</style>
