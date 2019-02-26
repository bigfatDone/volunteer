<template>
  <div class="whole">
    <div class="contains">
      <div class="title">
        <router-link :to="{path: 'record' }">检测认证记录</router-link>>详情
      </div>
      <div class="main">
        <div class="item">
          <p class="item-tab">
            <span>订单编号：{{this.detailResult.ENTRUST_ORDER_ID}}</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>订单状态：</span>
            <span class="color-brown" v-if="this.detailResult.ORDER_STATUS == 0">待支付</span>
            <span class="color-brown" v-if="this.detailResult.ORDER_STATUS == 1">待检测</span>
            <span class="color-brown" v-if="this.detailResult.ORDER_STATUS == 2">检测合格 （未绑定标签码）</span>
            <span class="item-tab-color" v-if="this.detailResult.ORDER_STATUS == 3">检测合格 （已绑定标签码）</span>
            <span class="color-red" v-if="this.detailResult.ORDER_STATUS == 4">检测不合格</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>商品分类：{{this.detailResult.DICNAMEALL}}</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>商品品牌：{{this.detailResult.GOODS_BRAND}}</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>所需标签：{{this.detailResult.TAG_NUMBER}}个</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span class="space">农户：{{this.detailResult.NAME}}</span>
          </p>
          <div class="item-details">
            <p class="item-detail-cell">
              <span>姓名：{{this.detailResult.NAME}}</span>
            </p>
            <p class="item-detail-cell">
              <span>手机号：{{this.detailResult.PHONE}}</span>
            </p>
            <p class="item-detail-cell">
              <span>地址：{{this.detailResult.CURRENT_PLACE}}</span>
            </p>
          </div>
        </div>
        <div class="item">
          <p class="item-tab">
            <span v-if="this.detailResult.TYPE == 1">检测类别：A级</span>
            <span v-if="this.detailResult.TYPE == 2">检测类别：B级</span>
            <span v-if="this.detailResult.TYPE == 3">检测类别：C级</span>
          </p>
          <div class="item-details">
            <p
              class="item-detail-cell"
              v-for="(item, index) in this.detailResult.DETECTIONRESULT"
              :key="index"
            >
              <span>{{item.FITEMNAME}}{{item.ITEMNAME}}</span>
              <span class="item-cell-quali">{{item.RESULT}}</span>
            </p>
          </div>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>检测方式：上门检测</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>预约时间：{{this.detailResult.APPOINTMENT_TIME}}</span>
          </p>
        </div>
        <div class="item">
          <p class="item-tab">
            <span class="yn-club">益农社：{{this.detailResult.YNSNAME}}</span>
          </p>
          <div class="item-details">
            <p class="item-detail-cell">
              <span>具体地址：{{this.detailResult.ADDRESS}}</span>
            </p>
            <p class="item-detail-cell">
              <span>联系电话：{{this.detailResult.YNSPHONE}}</span>
            </p>
          </div>
        </div>
        <div class="item">
          <p class="item-tab">
            <span>下单时间：{{this.detailResult.COMMIT_TIME}}</span>
          </p>
        </div>
        <div v-if="this.detailResult.ORDER_STATUS != 0">
          <div class="item">
            <p class="item-tab">
              <span>支付时间：{{this.detailResult.PAY_TIME}}</span>
            </p>
          </div>
          <div class="item">
            <p class="item-tab">
              <span v-if="this.detailResult.PAY_TYPE == 1">支付方式：支付宝支付</span>
              <span v-if="this.detailResult.PAY_TYPE == 2">支付方式：微信支付</span>
              <span v-if="this.detailResult.PAY_TYPE == 3">支付方式：账户余额支付</span>
            </p>
          </div>
          <div class="item">
            <p class="item-tab">
              <span>支付金额：</span>
              <strong>￥{{this.detailResult.TOTAL_FEE}}</strong>
              <span
                class="item-tab-pay"
              >（基础服务费：￥{{this.detailResult.BASIC_FEE}} 认证标签费：￥{{this.detailResult.CERTIFICATION_FEE}}）</span>
            </p>
          </div>
        </div>
        <div v-if="this.detailResult.ORDER_STATUS == 4 && this.detailResult.REFUND_STATUS == 3">
          <div class="item">
            <p class="item-tab">
              <span>退款金额：￥</span>
              <strong class="red-color">{{this.detailResult.RETURN_MONEY}}</strong>
            </p>
          </div>
          <div class="item">
            <p class="item-tab">
              <span>退款时间：{{this.detailResult.RETURN_TIME}}</span>
            </p>
          </div>
          <div class="item">
            <p class="item-tab">
              <span>退款渠道：</span>
              <span v-if="this.detailResult.RETURN_MODE == 1">支付宝</span>
              <span v-if="this.detailResult.RETURN_MODE == 2">微信</span>
              <span v-if="this.detailResult.RETURN_MODE == 3">账户余额</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { testDetail } from "@/api/old/person";
export default {
  data() {
    return {
      detailResult: {},
      id: this.$route.query.id,
      wxUser: ""
    };
  },
  methods: {
    // 获取详情
    getDetail() {
      testDetail({
        token: this.wxUser.token,
        entrustxxb_id: this.wxUser.wxId,
        entrust_order_id: this.id
      }).then(res => {
        if (res.success) {
          this.detailResult = res.returnMap;
        } else {
          if (res.message == "登录信息失效,请重新登录") {
            this.$message.error(res.message);
            let wechatData = {};
            this.$store.commit("updateEntrustData", wechatData);
            this.$router.push({ path: "/index" });
          }
        }
      });
    }
  },
  mounted() {
    this.wxUser = this.$store.state.entrustData;
    this.getDetail();
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.whole {
  width: 930px;
  background-color: #fff;
  padding: 34px 50px 34px 50px;
  box-sizing: border-box;
  .contains {
    width: 100%;
    .title {
      width: 100%;
      height: 24px;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    .main {
      margin: 22px 0px 0px 72px;
      .item {
        .item-tab {
          padding: 10px 0px;
          margin: 0px;
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          .red-color {
            color: #f00;
          }
          .space {
            margin-left: 35px;
          }
          .yn-club {
            margin-left: 17px;
          }
        }
        .item-details {
          width: 388px;
          margin: 0 0 10px 85px;
          padding: 12px 20px;
          background: rgba(241, 241, 241, 1);
          border-radius: 2px;
          box-sizing: border-box;
          .item-detail-cell {
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            line-height: 22px;
            padding: 4px 0px;
          }
        }
        .item-cell-quali {
          float: right;
        }
        .item-tab-pay {
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          line-height: 11px;
        }
        .item-tab-color {
          color: #009900;
        }
        .color-red {
          color: #f00;
        }
        .color-grey {
          color: #a9a9a9;
        }
        .color-brown {
          color: #6b0000;
        }
      }
    }
  }
}
</style>

