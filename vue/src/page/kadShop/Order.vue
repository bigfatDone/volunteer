<template>
  <div class="goods-list">
    <div class="w1200">
      <div class="tag-top">
        首页 >
        <span @click="jumpPage" class="becursor">购药平台 ></span>
        <span class="tag-detail">我的订单</span>
      </div>
      <div class="list">
        <div class="list-top">
          <span class="list-top-title">我的订单</span>
        </div>
        <div class="list-content">
          <div class="list-status">
            <div class="list-time">下单时间</div>
            <div class="block list-start-time">
              <el-date-picker
                v-model="startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                class="date-width"
                :picker-options="pickerOptions0"
              ></el-date-picker>
              <span class="to">至</span>
              <el-date-picker
                v-model="endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                class="date-width"
                :picker-options="pickerOptions0"
              ></el-date-picker>
              <span class="list-status">订单状态</span>
              <el-select class="all-status" v-model="status" placeholder="全部状态">
                <el-option
                  v-for="(item, index) in orderOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.status"
                ></el-option>
              </el-select>
              <div class="search-btn" @click="search">查询</div>
            </div>
          </div>
          <div class="content-order">
            <div>商品信息</div>
            <div>数量</div>
            <div>单价</div>
            <div>总金额</div>
            <div>订单状态</div>
            <div>操作</div>
          </div>
          <div class="content" v-for="( item, index ) in items" :key="index">
            <div class="content-tag">
              <span>订单编号 : {{ item.ZYJOrderCode }}</span>
              <span>下单时间 : {{ item.order_time }}</span>
            </div>
            <div class="content-text-more">
              <div class="content-text-left">
                <div
                  class="content-text-each"
                  v-for="( wareItem, Index ) in item.warelist"
                  :key="Index"
                >
                  <div>
                    <div class="content-img">
                      <img :src="wareItem.Pic">
                    </div>
                    <div class="content-message">
                      <div class="message-name">{{ wareItem.WareName }}</div>
                      <div class="message-desc">规格 : {{ wareItem.Model }}</div>
                    </div>
                  </div>
                  <div class="content-sum">
                    <span>{{ wareItem.BuyNum }}</span>
                  </div>
                  <div class="content-price">
                    ￥
                    <span>{{ wareItem.Price }}</span>
                  </div>
                </div>
              </div>
              <div class="content-total">
                ￥
                <span>{{ item.total_price }}</span>
              </div>
              <div class="content-status">
                <span>{{ item.orderStatus }}</span>
              </div>

              <div class="content-deliver">
                <div
                  class="pay-now"
                  @click="toOrderPay(item)"
                  v-if="item.orderStatus === '未提交' ||item.orderStatus === '未付款' "
                >立即付款</div>
                <div
                  class="view-logistics"
                  v-if="
                 item.orderStatus === '已付款'
                 || item.orderStatus === '已审核'
                 || item.orderStatus === '部分出库'
                 || item.orderStatus === '完全出库'
                 || item.orderStatus === '完全出库'
                 ||item.orderStatus === '已完成'
                 "
                >查看物流</div>
                <router-link
                  :to="{ name: 'kadOrderDetail', query:{ userid: $route.query.userid, orderCode: item.ZYJOrderCode } }"
                >
                  <div class="pay-now-detail">详情</div>
                </router-link>
                <div
                  class="pay-now-cancel"
                  @click="showDialog"
                  v-if="item.orderStatus === '已付款'
                   || item.orderStatus === '未付款'
                   || item.orderStatus === '已审核'
                   || item.orderStatus === '部分出库'
                   || item.orderStatus === '完全出库'"
                >取消订单</div>
              </div>
            </div>
            <!-- 遮罩层 -->
            <div class="shadow-cont" v-show="isShow" @touchmove.prevent>
              <!-- 弹窗 -->
              <div class="dialog-box" v-show="isShow">
                <div class="title-box clearfix">
                  <div class="title-name">取消订单</div>
                  <div class="close-btn" @click="closeDialog"></div>
                </div>
                <div class="content-box">
                  <div class="main-cont">取消原因：
                    <div class="select-wrap">
                      <el-select v-model="quiteValue" placeholder="请选择">
                        <el-option
                          v-for="(item, index)  in options"
                          :key="index"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </div>
                  </div>
                  <button
                    class="cancel-btn"
                    @click="cancelDialog(item.ZYJOrderCode, item.user_id)"
                  >确认取消</button>
                </div>
              </div>
            </div>
          </div>
          <div class="toPages">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              prev-text="上一页"
              next-text="下一页"
              :current-page="currentPage"
              @current-change="changePage"
              :page-size="5"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsList } from "@/api/kadShop/goodsList";
import { toPay, cancelOrder } from "@/api/kadShop/ShopCartList";
// import { getLogisticsInfo } from "@/api/kadShop/logisticsQuery"
export default {
  data() {
    return {
      isShow: false, //弹框
      startTime: "", //开始时间
      endTime: "", //结束时间
      status: "", //订单状态
      items: "", //商品列表
      currentPage: 1, //当前页码
      total: 0, //总页码
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      // 订单状态
      orderOptions: [
        {
          status: "",
          label: "全部"
        },
        {
          status: "12",
          label: "未提交"
        },
        {
          status: "0",
          label: "未付款"
        },
        {
          status: "3",
          label: "已付款"
        },
        {
          status: "4",
          label: "已审核"
        },
        {
          status: "8",
          label: "部分出库"
        },
        {
          status: "9",
          label: "完全出库"
        },
        {
          status: "10",
          label: "已取消"
        },
        {
          status: "11",
          label: "已完成"
        }
      ],

      options: [
        { value: "200005", name: "暂时不想购买" },
        { value: "203", name: "支付不成功" },
        { value: "200017", name: "商品价格较贵" },
        { value: "201005", name: "等待收货时间较长" },
        { value: "201004", name: "商品缺货" },
        { value: "200", name: "更换商品" },
        { value: "200014", name: "错误重复下单" }
      ], // 取消订单的原因
      quiteValue: "" // 取消订单对应的值
    };
  },
  mounted() {
    this.getOrderDetails(1);
  },
  methods: {
    //翻页
    changePage(val) {
      this.currentPage = val;
      this.getOrderDetails(val);
    },
    //展示弹框
    showDialog() {
      this.isShow = true;
      //遮罩层出现时窗口不能滚动设置
      var top = $(document).scrollTop();
      $(document).on("scroll.unable", function(e) {
        $(document).scrollTop(top);
      });
    },
    //关闭弹框
    closeDialog() {
      this.isShow = false;
      //恢复滚动
      $(document).unbind("scroll.unable");
    },
    // 确定取消订单
    cancelDialog(status, userId) {
      if (this.quiteValue == "") {
        this.$message.error("请选择取消订单的原因");
      } else {
        cancelOrder({
          orderCode: status,
          typeCode: this.quiteValue,
          userId: userId
        }).then(res => {
          this.$message.success(res.message);
        });
        this.isShow = false;
        //恢复滚动
        $(document).unbind("scroll.unable");
      }
    },
    //后台获取订单列表
    getOrderDetails(page) {
      getGoodsList({
        userid: this.$route.query.userid,
        currentPage: page,
        showCount: 5,
        startTime: this.startTime,
        endTime: this.endTime,
        status: this.status
      }).then(res => {
        if (res.success) {
          this.items = res.resultList;
          this.total = res.returnMap.totalResult;
        }
      });
    },
    //搜索
    search() {
      this.getOrderDetails(1);
      this.currentPage = 1;
    },
    //跳转购药平台
    jumpPage() {
      this.$router.push({ path: "/kadShop/kadIndex" });
    },
    toOrderPay(val) {
      toPay({
        UserId: val.user_id,
        ZYJOrderCode: val.ZYJOrderCode
      }).then(res => {
        if (res.success) {
          window.location.href = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  font-family: Adobe Heiti Std R;
  font-size: 16px;
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
        font-weight: normal;
        line-height: 40px;
        cursor: default;
      }
    }
    .list {
      .list-top {
        height: 56px;
        background: rgba(248, 248, 248, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        .list-top-title {
          width: 94px;
          height: 24px;
          font-size: 24px;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
          line-height: 50px;
          margin-left: 41px;
        }
      }
      .list-content {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        padding: 32px 20px 0px 20px;
        .list-status {
          .list-time {
            margin-left: 10px;
            margin-top: 8px;
            height: 16px;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
            line-height: 21px;
            display: inline-block;
          }
          .list-start-time {
            display: inline-block;
            margin-left: 30px;
            color: rgba(51, 51, 51, 1);
            .date-width {
              width: 160px;
            }
            .to {
              margin: 0 16px 0 17px;
              color: rgba(51, 51, 51, 1);
            }
            .list-status {
              margin: 0 14px 0 90px;
              color: rgba(51, 51, 51, 1);
            }
            .all-status {
              width: 160px;
              margin-right: 80px;
            }
            .search-btn {
              width: 100px;
              height: 36px;
              cursor: pointer;
              background: rgba(255, 162, 0, 1);
              display: inline-block;
              vertical-align: top;
              text-align: center;
              line-height: 2;
              color: rgba(255, 255, 255, 1);
              border: 1px solid rgba(238, 238, 238, 1);
            }
          }
        }
        .content-order {
          margin: 37px 0 0px 0;
          height: 56px;
          background: rgba(248, 248, 248, 1);
          font-size: 20px;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          line-height: 50px;
          div:nth-child(1) {
            width: 379px;
            height: 100%;
            display: inline-block;
            border-right: 1px solid rgba(235, 245, 255, 1);
          }
          div:nth-child(2) {
            width: 119px;
            height: 100%;
            display: inline-block;
            border-right: 1px solid rgba(235, 245, 255, 1);
          }
          div:nth-child(3) {
            width: 139px;
            height: 100%;
            display: inline-block;
            border-right: 1px solid rgba(235, 245, 255, 1);
          }
          div:nth-child(4) {
            width: 159px;
            height: 100%;
            display: inline-block;
            border-right: 1px solid rgba(235, 245, 255, 1);
          }
          div:nth-child(5) {
            width: 159px;
            height: 100%;
            display: inline-block;
            border-right: 1px solid rgba(235, 245, 255, 1);
          }
          div:nth-child(6) {
            width: 160px;
            height: 100%;
            display: inline-block;
          }
        }
        .content {
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(235, 245, 255, 1);
          margin-top: 24px;
          .content-tag {
            height: 48px;
            background: rgba(236, 243, 249, 1);
            span {
              padding-top: 16px;
              display: inline-block;
              text-align: center;
              color: rgba(51, 51, 51, 1);
            }
            span:nth-child(1) {
              margin-left: 28px;
            }
            span:nth-child(2) {
              margin-left: 91px;
            }
            span:nth-child(3) {
              margin-left: 9px;
            }
          }
          .content-text-more {
            display: table;
            div {
              vertical-align: top;
            }
            .content-text-left {
              width: 645px;
              display: inline-block;
              .content-text-each {
                border-bottom: 1px solid rgba(235, 245, 255, 1);
                height: 140px;
                width: 645px;
                div:nth-child(1) {
                  width: 380px;
                  height: 100%;
                  display: inline-block;
                  .content-img {
                    width: 100px;
                    height: 100px;
                    margin: 20px 0 0 31px;
                    img {
                      background: rgba(235, 235, 235, 1);
                      width: 100px;
                      height: 100px;
                    }
                  }
                  .content-message {
                    margin: 29px 0 0 14px;
                    height: 100px;
                    width: 225px;
                    display: inline-block;
                    .message-name {
                      overflow: hidden; 
                      text-overflow: ellipsis;
                      display: -webkit-box; 
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2; 
                      width: 225px;
                      font-size: 20px;
                      color: rgba(51, 51, 51, 1);
                      max-height: 55px;
                    }
                    .message-desc {
                      width: 225px;
                      height: 16px;
                      color: rgba(153, 153, 153, 1);
                    }
                  }
                }
                div:nth-child(2) {
                  width: 120px;
                  height: 100%;
                  display: inline-block;
                }
                div:nth-child(3) {
                  width: 134px;
                  height: 100%;
                  display: inline-block;
                  border-right: 1px solid rgba(235, 245, 255, 1);
                }
                .content-sum,
                .content-price {
                  vertical-align: middle;
                  text-align: center;
                  line-height: 140px;
                  font-size: 18px;
                  display: inline-block;
                }
              }
              .content-text-each:last-child {
                border-bottom: none;
              }
            }
            .content-total,
            .content-status {
              vertical-align: middle;
              text-align: center;
              height: 100%;
              font-size: 18px;
              display: table-cell;
            }
            .content-total {
              width: 163px;
              color: #fd2340;
              border-right: 1px solid rgba(235, 245, 255, 1);
            }
            .content-status {
              width: 164px;
              border-right: 1px solid rgba(235, 245, 255, 1);
            }
            .content-deliver {
              width: 177px;
              display: table-cell !important;
              vertical-align: middle;
              .pay-now-detail,
              .pay-now-cancel,
              .view-logistics {
                height: 30px;
                text-align: center;
              }
              .view-logistics {
                margin-top: 0 !important;
              }
              .pay-now-detail,
              .pay-now-cancel {
                border: none;
                margin-top: 8px;
              }
              .pay-now-detail,
              .view-logistics {
                color: #1f8fff;
                cursor: pointer;
              }
              .pay-now-cancel {
                color: #999999;
                cursor: pointer;
              }
              .pay-now {
                width: 100px;
                height: 30px;
                margin: 18px 0 0 39px;
                text-align: center;
                line-height: 2;
                cursor: pointer;
              }
              .pay-now {
                background: rgba(255, 162, 0, 1);
                color: rgba(255, 255, 255, 1);
              }
            }
          }
          // 遮罩层样式
          .shadow-cont {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(102, 102, 102, 0.4);
            z-index: 998;
            .dialog-box {
              position: absolute;
              top: calc(50% - 218px);
              left: calc(50% - 500px);
              width: 1000px;
              height: 436px;
              background: #fff;
              z-index: 999;
              .title-box {
                height: 80px;
                padding: 22px 40px;
                font-size: 24px;
                color: #fff;
                background: #1f8fff;
                box-sizing: border-box;
                .title-name {
                  float: left;
                }
                .close-btn {
                  float: right;
                  width: 48px;
                  height: 48px;
                  margin-top: -8px;
                  background: url(~@/../static/img/goods-list/close-dialog.png);
                }
              }
              .content-box {
                overflow: hidden;
                .main-cont {
                  margin: 60px 200px 0;
                  font-size: 24px;
                  color: #333;
                  .select-wrap {
                    width: 470px;
                    height: 48px;
                    display: inline-block;
                  }
                  // ie清除select样式
                  select::-ms-expand {
                    display: none;
                  }
                  // 火狐、谷歌清除
                  select {
                    font-size: 20px;
                    color: #999;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    padding: 0 28px;
                    background: url(~@/../static/img/goods-list/select-down.png)
                      no-repeat scroll 97% center transparent;
                  }
                }
                .cancel-btn {
                  width: 200px;
                  height: 56px;
                  margin: 132px 400px 60px;
                  font-size: 20px;
                  color: #1f8fff;
                  line-height: 56px;
                  text-align: center;
                  background: #fff;
                  border: 1px solid #1f8fff;
                }
              }
            }
          }
        }
        .pages {
          margin: 28px 0;
          color: #1f8fff;
          .el-pagination {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.toPages {
  margin: 28px 0;
  .el-pagination {
    text-align: center;
  }
  .el-pager li:not(.disabled).active {
    background-color: #1f8fff !important;
  }
  .el-form {
    .el-form-item__label {
      font-size: 20px;
      color: #1f8fff;
    }
  }
}
.select-wrap {
  .el-select {
    width: 100% !important;
  }
  .el-input__inner {
    font-size: 16px;
  }
  .el-select .el-input__inner:focus .el-input.is-focus .el-input__inner {
    border-color: #1f8fff;
  }
  // .el-select .el-input.is-focus .el-input__inner {
  //   border-color: #1f8fff !important;
  // }
  .el-select-dropdown__item.selected {
    color: #1f8fff !important;
  }
}
</style>