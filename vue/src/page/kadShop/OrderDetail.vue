<template>
  <div class="goods-details">
    <div class="w1200">
      <div class="tag-top">
        首页 >
        <span @click="jumpPage" class="becursor">购药平台 ></span>
        <span @click="jumpOrder" class="becursor">我的订单 ></span>
        <!-- <router-link :to="{ name: 'kadOrder', query: { userid: $route.query.userid} }">我的订单 </router-link>> -->
        <span class="tag-detail">订单详情</span>
      </div>
      <div class="container">
        <!-- 内容 -->
        <div class="container-top clearfix">
          <div class="top-left">
            <div class="top-details">
              <p>
                <span>订单编号 :</span>
                <span>{{ items.OrderCode }}</span>
              </p>
            </div>
            <div class="top-details">
              <p>
                <span>下单时间 :</span>
                <span>{{ items.CreateTime }}</span>
              </p>
            </div>
          </div>
          <div class="top-right">
            <div class="top-details">
              <p>
                <span>订单状态 :</span>
                <span>{{ items.OrderStatus }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="container-center">
          <div class="goods-message">
            <div class="message-head">
              <span>商品信息</span>
            </div>
            <div class="message-form clearfix">
              <div class="form-goods">
                <div class="goods-top">
                  <span>商品</span>
                </div>
              </div>
              <div class="form-item">
                <div class="item-top">数量</div>
              </div>
              <div class="form-item">
                <div class="item-top">单价</div>
              </div>
              <div class="form-item">
                <div class="item-top">小计</div>
              </div>
            </div>
            <div class="message-form clearfix" v-for="(Item,Index) in items.WareList" :key="Index">
              <div class="form-goods">
                <div class="goods-bottom clearfix">
                  <div class="bottom-pic">
                    <img :src="Item.Pic" class="goodsPic" alt>
                  </div>
                  <div class="bottom-message">
                    <div class="bottom-title">{{ Item.WareName }}</div>
                    <div class="bottom-size">
                      <p>
                        <span>规格 :</span>
                        <span>{{ Item.Model }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="item-bottom">{{ Item.BuyNum }}</div>
              </div>
              <div class="form-item">
                <div class="item-bottom">￥{{ Item.Price }}</div>
              </div>
              <div class="form-item">
                <div class="item-bottom">￥{{ Item.TotalPrice }}</div>
              </div>
              <div class="lineHeight"></div>
            </div>
            <div class="goods-list">
              <div class="list-head">收货信息</div>
              <div class="list-item">收货人姓名 : {{items.Accepter}}</div>
              <div
                class="list-item"
              >收货地址 : {{items.Province}}{{items.City}}{{items.District}}{{items.Address}}</div>
              <div class="list-item">联系电话 : {{items.MobilePhone}}</div>
            </div>
            <div class="lineHeight"></div>
            <div class="goods-list">
              <div class="list-head">支付方式及配送方式</div>
              <div class="list-item">支付方式 : {{items.PayTypeCode}}</div>
              <div class="list-item">配送方式 : 快递配送</div>
            </div>
            <div class="lineHeight"></div>
            <div class="goods-list">
              <div class="list-head">发票信息</div>
              <div class="list-item">
                是否开发票 :
                <span v-if="items.IsInvoice == 0">否</span>
                <span v-if="items.IsInvoice == 1">是</span>
              </div>
              <div class="list-item" v-if="items.IsInvoice == 1">发票抬头 : {{items.InvoiceTitle}}</div>
            </div>
            <div class="lineHeight"></div>
          </div>
        </div>
        <div class="container-bottom clearfix">
          <div class="bottom-total">
            <div class="goods-style">￥{{items.NetAmt}}</div>
            <div class="goods-style">￥{{items.FreightCost}}</div>
            <div class="order-total">￥{{items.SumAmt}}</div>
            <div class="order-pay">￥{{items.NetAmt}}</div>
          </div>
          <div class="bottom-total">
            <div class="goods-style">商品总价 :</div>
            <div class="goods-style">运费 :</div>
            <div class="order-total">订单总价 :</div>
            <div class="order-pay toblack">实付金额 :</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderDetails } from "@/api/kadShop/orderDetails";
export default {
  data() {
    return {
      items: "" //数据列表
    };
  },
  mounted() {
    this.getOrderInfo();
    // console.log(this.$route.query.orderCode)
  },
  methods: {
    //后台获取数据
    getOrderInfo() {
      getOrderDetails({
        orderCode: this.$route.query.orderCode,
        // userId: "13602289426"
        userId:''
      }).then(res => {
        // console.log(res);
        if (res.success) {
          this.items = res.returnMap;
        }
      });
    },
    //跳转订单列表
    jumpOrder() {
      this.$router.push({
        path: "/kadShop/kadOrder",
        //query: { userid: "13602289426" }
        query: { userid: "" }
      });
    },
    //跳转购药平台
    jumpPage() {
      this.$router.push({ path: "/kadShop/kadIndex" });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-details {
  font-family: Adobe Heiti Std R;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 80px;
  // 设置placeholder的字体颜色
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgba(51, 51, 51, 1);
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(51, 51, 51, 1);
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(51, 51, 51, 1);
  }
  .w1200 {
    .tag-top {
      margin-top: 21px;
      font-size: 16px;
      color: #333333;
      .becursor {
        cursor: pointer;
      }
      .tag-detail {
        color: #999999;
        line-height: 40px;
        cursor: default;
      }
    }
    .container {
      border: 1px solid #ededed;
      // height: 1465px;
      .container-top {
        height: 144px;
        padding: 12px 40px;
        box-sizing: border-box;
        background: rgba(236, 243, 249, 1);
        .top-left {
          height: 118px;
          width: 538px;
          float: left;
        }
        .top-right {
          height: 118px;
          width: 580px;
          float: left;
        }
        .top-details {
          height: 59px;
          width: 100%;
          display: flex;
          font-size: 20px;
          align-items: center;
        }
      }
      .container-center {
        // height: 980px;
        width: 100%;
        padding: 0px 41px;
        box-sizing: border-box;
        .goods-message {
          // height: 299px;
          width: 100%;
          padding: 32px 0 8px;
          box-sizing: border-box;
          .message-head {
            height: 63px;
            width: 100%;
            box-sizing: border-box;
            padding-top: 8px;
            font-size: 24px;
          }
          .message-form {
            width: 100%;
            .form-goods {
              height: 100%;
              width: 460px;
              float: left;
              .goods-top {
                height: 48px;
                width: 100%;
                text-align: center;
                font-size: 20px;
                line-height: 64px;
                border: 1px solid rgba(242, 242, 242, 1);
                border-collapse: collapse;
              }
              .goods-bottom {
                height: 148px;
                width: 100%;
                padding: 24px 20px;
                box-sizing: border-box;
                .bottom-pic {
                  float: left;
                  height: 100px;
                  width: 100px;
                  .goodsPic {
                    height: 100px;
                    width: 100px;
                  }
                }
                .bottom-message {
                  float: left;
                  height: 100px;
                  width: 320px;
                  box-sizing: border-box;
                  padding: 0 25px 0 15px;
                  .bottom-title {
                    height: 70px;
                    width: 100%;
                    box-sizing: border-box;
                    padding-top: 10px;
                    font-size: 20px;
                  }
                  .bottom-size {
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    color: rgba(102, 102, 102, 1);
                  }
                }
              }
            }
            .form-item {
              width: 218px;
              height: 100%;
              float: left;
              font-size: 20px;
              .item-top {
                height: 48px;
                width: 100%;
                text-align: center;
                line-height: 48px;
                border: 1px solid rgba(242, 242, 242, 1);
                border-collapse: collapse;
              }
              .item-bottom {
                height: 156px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
        .goods-list {
          width: 100%;
          margin: 40px 0 20px 0;
          .list-head {
            height: 63px;
            font-size: 24px;
            line-height: 63px;
          }
          .list-item {
            height: 45px;
            line-height: 46px;
            font-size: 20px;
          }
        }
      }
      .container-bottom {
        height: 254px;
        width: 100%;
        margin: 48px 0 38px 0;
        padding: 0 40px;
        font-size: 20px;
        box-sizing: border-box;
        .bottom-total {
          height: 100%;
          width: 280px;
          float: right;
          text-align: right;
          .goods-style {
            height: 41px;
            line-height: 41px;
          }
          .order-total {
            height: 47px;
            font-size: 24px;
            line-height: 47px;
          }
          .order-pay {
            height: 84px;
            line-height: 84px;
            font-size: 32px;
            color: rgba(255, 0, 0, 1);
          }
          .toblack {
            color: rgba(51, 51, 51, 1);
          }
        }
        .bottom-style {
          height: 100%;
          width: 280px;
          float: right;
        }
      }
      .lineHeight {
        width: 1120px;
        height: 1px;
        background: rgba(237, 237, 237, 1);
        clear: both;
      }
    }
  }
}
</style>
