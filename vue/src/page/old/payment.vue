<template>
  <div class="content-modu">
    <div class="w1200">
      <div class="payment-modu">
        <div class="title-box">
          <i class="title-icon"></i>
          <span>提交成功，请继续完成支付....</span>
        </div>
        <div class="payment-tab">
          <ul class="tab-pane clearfix">
            <li
              class="pane-li"
              :class="index == curIndex ? 'cur' : ''"
              v-for="(item, index) in titleData"
              :key="index"
              @click="paySelect(index)"
            >{{item.title}}</li>
          </ul>
          <div class="tab-cont">
            <div class="tab-cont-item mobile-pay" v-show="contShow == 0">
              <div class="item-bd clearfix">
                <div class="scan-code">
                  <div class="code-img" v-if="typePay == 0">
                    <!-- <img src="../assets/images/pany-code01.png"> -->
                    <qr-code
                      :amount="pay*100"
                      channel="WXPAY"
                      :icon="iconWeChat"
                      :width="230"
                      :height="230"
                      @getTradeNo="getTradeNoWeChat"
                      :url="this.customConfig.baseUrl + '/portal/authenticPay'"
                    ></qr-code>
                  </div>
                  <div class="code-infor clearfix">
                    <i class="scan-icon"></i>
                    <div class="scan-text">
                      <p>请使用微信扫一扫</p>
                      <p>扫描二维码支付</p>
                    </div>
                  </div>
                </div>
                <div class="operate-cont">
                  <div class="oper-img">
                    <img src="/static/img/old/weixin-pay.png">
                  </div>
                  <div class>
                    支付金额：
                    <span class="money-item">¥
                      <span class="num">{{pay}}</span>
                    </span>
                    元
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-cont-item mobile-pay" v-show="contShow == 1">
              <div class="item-bd clearfix">
                <div class="scan-code">
                  <div class="code-img" v-if="typePay == 1">
                    <!-- <img src="../assets/images/pany-code01.png"> -->
                    <qr-code
                      :amount="pay*100"
                      channel="ALIPAY"
                      :icon="iconAlipay"
                      :width="230"
                      :height="230"
                      @getTradeNo="getTradeNoAlipay"
                      :url="this.customConfig.baseUrl + '/portal/authenticPay'"
                    ></qr-code>
                  </div>
                  <div class="code-infor clearfix">
                    <i class="scan-icon"></i>
                    <div class="scan-text">
                      <p>请使用支付宝扫一扫</p>
                      <p>扫描二维码支付</p>
                    </div>
                  </div>
                </div>
                <div class="operate-cont">
                  <div class="oper-img">
                    <img src="/static/img/old/zhifubao-pay.png">
                  </div>
                  <div class>
                    支付金额：
                    <span class="money-item">¥
                      <span class="num">{{pay}}</span>
                    </span>
                    元
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-cont-item account-pay" v-show="contShow == 2">
              <div class="item-hd">
                <p>您的现金账户余额为
                  <span class="value-text" v-text="'￥'+personalBalance"></span>
                </p>
              </div>
              <div class="item-bd"></div>
              <div class="item-ft clearfix">
                <div class="ft-left">
                  支付金额：
                  <span class="money-item">¥
                    <span class="num">{{pay}}</span>
                  </span>
                  元
                </div>
                <div class="ft-right" @click="paying">立即支付</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from "./QrCode.vue";
import axios from 'axios';
import { payOrdinary, payWeChat, payAlipay } from "@/api/old/payment";
import { getUserDetail } from "@/api/old/person";
export default {
  data() {
    return {
      titleData: [
        { title: "微信" },
        { title: "支付宝" },
        { title: "余额支付" }
      ],
      curIndex: 0,
      contShow: 0,
      pay: 0,
      typePay: 0,
      orderData: '',
      appointTime: '',
      typeLevel: '',
      iconWeChat: require('@/../static/img/old/wechat.png'),
      iconAlipay: require('@/../static/img/old/alipay.png'),
      timer: '',
      requestCount:0,
      personalBalance: 0,
      wechatData: {}
    };
  },
  methods: {
    paySelect(num) {
      if(num == 2) {
        this.getPersonalBalance()
      }
      this.typePay = num
      this.curIndex = num
      this.contShow = num
    },

    //普通支付方式
    paying() {
      if(this.personalBalance >= this.pay) {
        payOrdinary({
          token: this.wechatData.token,
          entrustxxb_id: this.wechatData.wxId,
          entrust_order_id: this.orderData,
          deal_money: this.pay
        }).then(res => {
          if (res.success) {
            this.payDetail = res.returnMap;
            this.$router.push({
              name: "paySuccess",
              query: {
                orderNum: this.payDetail.ENTRUST_ORDER_ID,
                appointTime: this.payDetail.APPOINTMENT_TIME,
                typeLevel: this.payDetail.TYPENAME
              }
            });
          }
        });
      } else {
        this.$message({
          message: '账户余额不足',
          type: 'warning'
        });
      }
    },

    //微信支付方式
    getTradeNoWeChat(tradeNo) {
      this.requestCount = 0;
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.requestPayWeChat(tradeNo)
      }, 10000)
    },
    requestPayWeChat(tradeNo) {
      let _self = this
      axios.post(this.customConfig.baseUrl + "/portal/authenticPayResult", {tradeNo: tradeNo})
      .then(function(res){
        _self.requestCount++;
        if(res.data.messageid == 1){
          clearInterval(_self.timer)
          payWeChat({
            entrustxxb_id: _self.wechatData.wxId,
            entrust_order_id: _self.orderData,
            deal_money: _self.pay
          }).then(res => {
            if (res.success) {
              clearInterval(_self.timer)
              _self.payDetail = res.returnMap
              _self.$router.push({
                name: 'paySuccess',
                query: {
                  orderNum: _self.payDetail.ENTRUST_ORDER_ID,
                  appointTime: _self.payDetail.APPOINTMENT_TIME,
                  typeLevel: _self.payDetail.TYPENAME
                }
              })
            }
          });
        } else if (_self.requestCount > 3 && (res.data.messageid == 0 || res.data.messageid == -1)){
          clearInterval(_self.timer)
          if(_self.$route.path == '/payment') {
            _self.$router.push({
              name: 'payFail',
              query: {
                orderNum: _self.orderData,
                appointTime: _self.appointTime,
                typeLevel: _self.typeLevel,
                payMoney: _self.pay
              }
            })
          }
        }
      })
    },

    //支付宝支付方式
    getTradeNoAlipay(tradeNo) {
      this.requestCount = 0;
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.requestPayAlipay(tradeNo)
      }, 10000)
    },
    requestPayAlipay(tradeNo) {
      let _self = this
      axios.post(this.customConfig.baseUrl + "/portal/authenticPayResult", {tradeNo: tradeNo})
      .then(function(res){
        _self.requestCount++;
        if(res.data.messageid == 1){
          clearInterval(_self.timer)
          payAlipay({
            entrustxxb_id: _self.wechatData.wxId,
            entrust_order_id: _self.orderData,
            deal_money: _self.pay
          }).then(res => {
            if (res.success) {
              clearInterval(_self.timer)
              _self.payDetail = res.returnMap
              _self.$router.push({
                name: 'paySuccess',
                query: {
                  orderNum: _self.payDetail.ENTRUST_ORDER_ID,
                  appointTime: _self.payDetail.APPOINTMENT_TIME,
                  typeLevel: _self.payDetail.TYPENAME
                }
              })
            }
          });
        } else if (_self.requestCount > 3 && (res.data.messageid == 0 || res.data.messageid == -1)){
          clearInterval(_self.timer)
          if(_self.$route.path == '/payment') {
            _self.$router.push({
              name: 'payFail',
              query: {
                orderNum: _self.orderData,
                appointTime: _self.appointTime,
                typeLevel: _self.typeLevel,
                payMoney: _self.pay
              }
            })
          }
        }
      })
    },
    
    //查询用户余额
    getPersonalBalance(){
      getUserDetail({
        token: this.wechatData.token,
        entrustxxb_id: this.wechatData.wxId,
      }).then(res => {
          if (res.success) {
            this.personalBalance = res.returnMap.MONEY;
          }
      });
    },
  },
  created() {
    this.pay = this.$route.query.pay
  },
  mounted() {
    this.orderData = this.$route.query.orderData
    this.appointTime = this.$route.query.appointTime
    this.typeLevel = this.$route.query.typeLevel
    this.wechatData = this.$store.state.entrustData
  },
  components: {
    "qr-code": QrCode
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.content-modu {
  .payment-modu {
    width: 860px;
    margin: 0 auto 70px;
    .title-box {
      font-size: 24px;
      color: #333;
      line-height: 30px;
      text-align: center;
      margin: 60px auto;
      .title-icon {
        width: 60px;
        height: 60px;
        vertical-align: middle;
        background: url(/static/img/old/type-icon01.png) center center
          no-repeat;
        background-size: 100%;
        margin-right: 10px;
        display: inline-block;
      }
    }
    .payment-tab {
      .tab-pane {
        padding: 0;
        margin: 0;
        .pane-li {
          width: 200px;
          height: 60px;
          font-size: 22px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #666;
          padding: 15px 0;
          margin-left: -1px;
          box-sizing: border-box;
          cursor: pointer;
          float: left;
          &.cur {
            color: #00a8c6;
            border-color: #00a8c6;
            position: relative;
            z-index: 1;
          }
        }
      }
      .tab-cont {
        min-height: 530px;
        border: 1px solid #666;
        margin: -1px 0 0 -1px;
        padding: 40px 50px;
        box-sizing: border-box;
        .tab-cont-item {
          font-size: 24px;
          line-height: 30px;
          .item-hd {
            height: 60px;
            .value-text {
              color: #e45a10;
            }
          }
          .item-ft {
            .ft-left {
              margin-top: 12px;
              float: left;
            }
            .ft-right {
              float: right;
              width: 160px;
              height: 46px;
              font-size: 16px;
              color: #fff;
              line-height: 46px;
              text-align: center;
              background: #1591cf;
              border-radius: 4px;
              display: block;
              cursor: pointer;
            }
          }
          .money-item {
            color: #97120b;
            .num {
              font-size: 34px;
              font-weight: bold;
            }
          }
        }
        .account-pay {
          .item-bd {
            height: 300px;
            margin-bottom: 20px;
          }
        }
        .mobile-pay {
          width: 696px;
          margin: 0 auto;
          .item-bd {
            .scan-code {
              width: 280px;
              margin-top: 33px;
              float: left;
              .code-infor {
                font-size: 14px;
                color: #fff;
                line-height: 20px;
                background: #ff6a69;
                padding: 14px 36px 14px 52px;
                margin-top: 30px;
                .scan-icon {
                  width: 40px;
                  height: 40px;
                  background: url(/static/img/old/scan.png);
                  margin-right: 24px;
                  float: left;
                }
                .scan-text {
                  float: left;
                }
              }
            }
            .operate-cont {
              width: 296px;
              text-align: center;
              margin-left: 120px;
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>
