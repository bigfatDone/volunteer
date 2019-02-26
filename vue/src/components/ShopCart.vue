<template>
  <div class="sidebar-wrapper" :class="{current: isShow}">
    <div class="cart-guide">
      <div class="close-btn" v-show="isShow" @click.stop="sidebarClose"></div>
      <div class="guide-main" @click="sidebarShow">
        <div class="guide-content">
          <div class="cart-icon">
            <em class="red-point">{{ totalNum }}</em>
          </div>
          <div class="cart-txt">购物车</div>
        </div>
      </div>
      <a class="top-btn" href="javascript:scrollTo(0,0);" @click.stop="toTop">
        <div class="top-icon"></div>
        <div class="top-txt">TOP</div>
      </a>
    </div>
    <div class="cart-content">
      <div class="cart-tips">
        <i class="cart-icon"></i>
        <p class="cart-name">购物车</p>
      </div>
      <div class="cont-one" v-if="carts.length>0">
        <div class="cart-box">
          <ul class="cart-list">
            <li
              v-for="(item,index) in carts"
              :key="index"
              @mouseenter="deleteShow(index)"
              @mouseleave="hiddenDelete"
            >
              <div v-show="item.StockStatus !='false'" class="list-item clearfix have-stock-item">
                <div class="list-img">
                  <img :src="item.Pic">
                </div>
                <div class="text-box">
                  <div class="list-text">{{item.WareName}}</div>
                  <div class="list-msg">
                    <span class="list-price">￥{{item.Price}}</span>
                    <span class="list-num">x{{item.BuyNum}}</span>
                    <span
                      class="delete-tip"
                      v-show="showDelete == index"
                      @click="deleteGoods(item.WareSkuCode)"
                    >删除</span>
                  </div>
                </div>
              </div>
              <div v-show="item.StockStatus =='false'" class="list-item clearfix none-stock-item">
                <div class="list-img">
                  <img :src="item.Pic">
                </div>
                <div class="text-box">
                  <div class="list-text">{{item.WareName}}</div>
                  <div class="list-msg">
                    <span>￥{{item.Price}}</span>
                    <span class="list-num">x{{item.BuyNum}}</span>
                    <span class="none-tip">无货</span>
                    <span
                      class="delete-tip"
                      v-show="showDelete == index"
                      @click="deleteGoods(item.WareSkuCode)"
                    >删除</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="cart-account" v-show="isShow">
          <div class="account-text clearfix">
            <span class="account-num">{{carts.length}}件商品</span>
            <span class="account-price">￥{{totalPrice}}</span>
          </div>
          <button class="account-btn" @click="tobuy">去购物车结算</button>
        </div>
      </div>
      <div class="cont-two" v-else>
        <div class="empty-img">
          <img src="@/../static/img/ShoppingCart/emptyCart.png" alt>
        </div>
        <div class="empty-text">亲，购物车还没有添加商品哦！</div>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteShopCart } from "@/api/kadShop/ShopCartList";
import { getShopCartList } from "@/api/kadShop/ShopCartList";

export default {
  data() {
    return {
      isShow: false,
      carts: [],
      totalNum: 0, //购物车数量
      totalPrice: 0, // 总价钱
      showDelete: "null" // 显示删除
    };
  },
  mounted() {
    this.getAllCartList();
    // this.getCartData();
  },
  methods: {
    // 请求后台拿数据
    getAllCartList() {
      getShopCartList({
        // userid: "13602289426"
        userid:''
      }).then(res => {
        if (res.success) {
          let shopCart = {};
          shopCart.carts = res.resultList;
          shopCart.totalPrice = res.returnMap.TotalPrice;
          shopCart.totalNum = res.returnMap.totalAmount;
          this.$store.commit("updateShopCartData", shopCart);
          this.getCartData()
        }
      });
    },
    // 获取购物车信息
    getCartData() {
      if (this.$store.state.shopCartData != null) {
        this.shopCartList = this.$store.state.shopCartData;
        this.carts = this.shopCartList.carts;
        this.totalPrice = this.shopCartList.totalPrice;
        this.totalNum = this.shopCartList.totalNum;
      } else {
        this.totalNum = 0;
      }
    },
    //hover显示删除
    deleteShow(index) {
      this.showDelete = index;
    },
    // 隐藏删除
    hiddenDelete() {
      this.showDelete = "null";
    },
    // 侧边栏购物车显示
    sidebarShow() {
      this.isShow = true;
      this.getAllCartList();
      // this.getCartData();
    },
    toTop() {
      this.isShow = false;
    },

    // 侧边栏购物车隐藏
    sidebarClose() {
      this.isShow = false;
    },
    //跳转购买页面
    tobuy() {
      this.$router.push({ path: "/kadShop/kadShopCart" });
      this.isShow = false;
    },
    // 删除商品
    deleteGoods(id) {
      this.$confirm("确定从购物车中删除此商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteShopCart({
            WareSkuCodes: id,
            // userid: "13602289426"
            userid: ""
          }).then(res => {
            if (res.returnMap == null) {
              this.shopCartList = {};
              this.carts = [];
              this.totalPrice = "0.00";
              this.totalNum = 0;
            } else {
              let shopCart = {};
              shopCart.carts = res.resultList;
              shopCart.totalPrice = res.returnMap.TotalPrice;
              shopCart.totalNum = res.returnMap.totalAmount;
              this.$store.commit("updateShopCartData", shopCart);
              this.shopCartList = this.$store.state.shopCartData;
              this.carts = this.shopCartList.carts;
              this.totalPrice = this.shopCartList.totalPrice;
              this.totalNum = this.shopCartList.totalNum;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    getData() {
      return this.$store.state.shopCartData;
    }
  },
  watch: {
    getData() {
      this.shopCartList = this.$store.state.shopCartData;
      this.carts = this.shopCartList.carts;
      this.totalPrice = this.shopCartList.totalPrice;
      this.totalNum = this.shopCartList.totalNum;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  width: 360px;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transform: translate(320px, 0);
  transition: all 0.4s;
  &.current {
    transform: translate(0, 0);
  }
  .cart-guide {
    float: left;
    width: 40px;
    height: 100%;
    font-size: 18px;
    color: #fff;
    text-align: center;
    background: #0a6ae3;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    .close-btn {
      width: 18px;
      height: 18px;
      background: url("~@/../static/img/ShoppingCart/close_x.png");
      margin: 0 auto;
      position: absolute;
      left: 10px;
      top: 16px;
    }
    .guide-main {
      height: 100%;
      .guide-content {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -50px;
        .cart-icon {
          width: 26px;
          height: 26px;
          margin: 0 auto;
          position: relative;
          background: url("~@/../static/img/ShoppingCart/shoppingCart1.png");
          .red-point {
            display: block;
            border-radius: 8px;
            height: 16px;
            padding: 2px 6px 0 6px;
            height: 19px;
            line-height: 16px;
            top: -15px;
            left: 4px;
            color: #fff;
            font-size: 14px;
            position: absolute;
            background-color: #e4393c;
          }
        }
        .cart-txt {
          width: 19px;
          margin: 12px auto 0;
        }
      }
    }
    .top-btn {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 20px;
      .top-icon {
        width: 14px;
        height: 9px;
        margin: 0 auto 4px;
        background: url("~@/../static/img/ShoppingCart/top.png");
      }
      .top-txt {
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
    }
  }
  .cart-content {
    float: right;
    width: 320px;
    height: 100%;
    background: #eee;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    .cart-tips {
      padding: 18px 14px;
      background: #e2e2e2;
      .cart-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("~@/../static/img/ShoppingCart/shoppingCart2.png");
      }
      .cart-name {
        display: inline-block;
        margin-left: 16px;
        font-size: 20px;
        vertical-align: top;
      }
    }
    .cont-one {
      .cart-box {
        .cart-list {
          margin-bottom: 400px;
          .list-item {
            position: relative;
            padding: 16px 10px 16px 6px;
            margin-bottom: 12px;
            box-sizing: border-box;
            .list-img {
              float: left;
              width: 76px;
              height: 76px;
              background-color: skyblue;
            }
            .text-box {
              // float: left;
              width: 222px;
              margin-left: 6px;

              .list-msg {
                position: absolute;
                bottom: 15px;
                font-size: 18px;
                margin-left: 75px;
                .list-num {
                  margin-left: 7px;
                  color: #808080;
                }
                .delete-tip {
                  font-size: 14px;
                  color: #666;
                  position: relative;
                  cursor: pointer;
                  margin-left: 10px;
                }
              }
            }
          }
          .have-stock-item {
            background: #fff;
            .list-text {
              max-height: 48px;
              line-height: 24px;
              font-size: 16px;
              color: #222;
              overflow: hidden;
            }
            .list-price {
              color: #ff1717;
            }
          }
          .none-stock-item {
            background: #e2e2e2;
            color: #999;
            .none-tip {
              font-size: 12px;
              background: #e2e2e2;
              padding: 2px 3px;
            }
            .list-text {
              max-height: 48px;
              line-height: 24px;
              font-size: 16px;
              overflow: hidden;
            }
          }
        }
      }
      .cart-account {
        position: fixed;
        bottom: 0;
        width: 300px;
        background: #e2e2e2;
        padding: 13px 10px;
        .account-text {
          margin: 0 11px 13px 6px;
          .account-num {
            float: left;
            font-size: 18px;
          }
          .account-price {
            float: right;
            font-size: 20px;
            color: #ff1717;
          }
        }
        .account-btn {
          width: 100%;
          height: 42px;
          font-size: 18px;
          color: #fff;
          line-height: 42px;
          text-align: center;
          background-color: #ff1717;
          border: none;
          border-radius: 4px;
        }
      }
    }
    .cont-two {
      .empty-img {
        width: 320px;
        height: 220px;
        margin-top: 177px;
      }
      .empty-text {
        margin-top: 14px;
        font-size: 16px;
        color: #999;
        text-align: center;
      }
    }
  }
  .cart-content::-webkit-scrollbar {
    display: none;
  }
}
</style>

