<template>
  <div class="whole">
    <div class="contains">
      <div class="title">
        <span>检测认证记录</span>
      </div>
      <div class="main" v-if="this.unqualifyList.length">
        <div class="item" v-for="(item, index) in unqualifyList" :key="index">
          <div class="item-left">
            <div class="item-left-number">
              <span>订单编号：{{item.ENTRUST_ORDER_ID}}</span>
            </div>
            <div class="item-left-category">
              <span>{{item.NAME}}</span>
              <span class="color-red">（检测不合格）</span>
            </div>
            <div class="item-left-class">
              <span v-if="item.TYPE == 1">检测级别：A类</span>
              <span v-if="item.TYPE == 2">检测级别：B类</span>
              <span v-if="item.TYPE == 2">检测级别：C类</span>
            </div>
            <div class="item-left-time">
              <span>下单时间：{{item.COMMIT_TIME}}</span>
            </div>
          </div>
          <div class="item-right">
            <div class="box">
              <div class="box-top">
                <span>￥{{item.TOTAL_FEE}}</span>
              </div>
              <div class="refund-tip">
                <span v-if="item.REFUND_STATUS == 0">退款失败</span>
                <span v-if="item.REFUND_STATUS == 1">待审核</span>
                <span v-if="item.REFUND_STATUS == 2">退款中</span>
                <span v-if="item.REFUND_STATUS == 3">退款成功</span>
              </div>
              <div class="box-bottom">
                <div class="box-bottom-detail">
                  <router-link
                    :to="{path: 'testing-details', query: {name: 'name', id:item.ENTRUST_ORDER_ID} }"
                  >查看详情</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.unqualifyList.length" class="pagination">
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
  </div>
</template>
<script>
import { record } from "@/api/old/person";
export default {
  data() {
    return {
      unqualifyList: [],
      name: "",
      id: "",
      total: 0, // 记录总条数
      currentPage: 0, // 记录当前你页码
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
    // 不合格列表
    getUnqualifyList(val) {
      this.getWxUser();
      record({
        token: this.wxUser.token,
        entrustxxb_id: this.wxUser.wxId,
        order_status: 3,
        showCount: 4, // 每页显示条数
        currentPage: val
      }).then(res => {
        if (res.success) {
          this.unqualifyList = res.resultList;
          this.total = res.returnMap.totalResult;
        } else {
          if (res.message == "登录信息失效,请重新登录") {
            this.$message.error(res.message);
            let wechatData = {};
            this.$store.commit("updateEntrustData", wechatData);
            this.$router.push({ path: "/index" });
          }
        }
      });
    },
    /* 翻页的效果 */
    handlePage(val) {
      this.currentPage = val;
      this.getUnqualifyList(val);
    }
  },
  mounted() {
    this.getUnqualifyList(1);
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.whole {
  width: 930px;
  background-color: #f9f9f9;
  padding: 14px 20px 34px 20px;
  box-sizing: border-box;
  .contains {
    .title {
      padding: 20px;
      height: 78px;
      box-sizing: border-box;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      background: #fff;
    }
    .main {
      margin-top: 26px;
      .item {
        padding: 24px 26px 24px 20px;
        margin-top: 10px;
        width: 890px;
        height: 192px;
        box-sizing: border-box;
        border-radius: 2px;
        background: #fff;
        .item-left {
          float: left;
          width: 432px;
          .item-left-number {
            height: 44px;
            font-size: 18px;
            color: rgba(102, 102, 102, 1);
            line-height: 22px;
            background: #fff;
          }
          .item-left-category {
            height: 46px;
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
          .item-left-class {
            height: 36px;
            font-size: 16px;
            color: rgba(153, 153, 153, 1);
            line-height: 22px;
          }
          .item-left-time {
            height: 16px;
            font-size: 16px;
            color: rgba(153, 153, 153, 1);
          }
        }
        .item-right {
          float: right;
          width: 406px;
          .box {
            margin: 25px 0px;
            height: 94px;
            .box-top {
              height: 47px;
              text-align: right;
              font-size: 24px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
            }
            .box-bottom {
              float: right;
              height: 32px;
              margin-top: 15px;
              .box-bottom-detail {
                padding: 5px 23px;
                box-sizing: border-box;
                float: left;
                width: 110px;
                height: 32px;
                background: #1a992f;
                border-radius: 2px;
                color: rgba(255, 255, 255, 1);
                line-height: 22px;
              }
            }
            .refund-tip {
              margin-left: 340px;
              color: #f30;
            }
          }
        }
      }
      .pagination {
        height: 60px;
        text-align: center;
        margin: 0 auto;
        padding-top: 21px;
        background: #fff;
        margin-top: 10px;
      }
      .color-red {
        color: #f00;
      }
    }
    .pagination {
      height: 60px;
      text-align: center;
      margin: 0 auto;
      padding-top: 21px;
      background: #fff;
      margin-top: 10px;
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
}
</style>

