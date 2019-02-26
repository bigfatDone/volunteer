<template>
  <div class="shop-cart-modu">
    <div class="w1200">
      <!-- 页面提示 -->
      <div class="shop-cart-content">
        <span class="shop-title" @click="toHomePage">首页></span>
        <span class="shop-title" @click="toShoping">购物平台></span>
        <span class="shop-cart-name">购物车</span>
      </div>
      <div v-if="carts.length > 0">
        <!-- 选择购物车 -->
        <div class="choose-shop-content">
          <div class="table-title">
            <span class="shop-message-title">商品信息</span>
            <span class="unit-price-title">单价（元）</span>
            <span class="num-subtotal-title">数量</span>
            <span class="num-subtotal-title">小计（元）</span>
            <span class="num-subtotal-title">操作</span>
          </div>
          <div class="detailed-list-content">
            <el-checkbox-group v-model="checkedIdList" @change="handleCheckChange">
              <div
                v-for="(item, index) in carts"
                :key="index"
                class="list-item"
                :class="item.StockStatus =='false' ? 'none-goods-content' :'have-goods-content'"
              >
                <div class="checkbox-content" v-if="item.StockStatus == 'true'">
                  <el-checkbox class="checkbox-input" :label="item.WareSkuCode"></el-checkbox>
                </div>
                <div v-else class="none-goods-tip">无货</div>
                <div class="shop-img-content">
                  <img :src="item.Pic" class="shop-img">
                </div>
                <div class="drug-message-content">
                  <div class="drug-name">{{item.WareName}}</div>
                  <div class="drug-size">{{item.Model}}/{{item.Unit}}</div>
              
                </div>
                <div class="all-price">￥{{item.Price}}</div>
                <div class="num-content" v-if="item.StockStatus == 'true'">
                  <!-- 计数器 -->
                  <el-input-number
                    size="mini"
                    :min="1"
                    :precision="0"
                    v-model="item.BuyNum"
                    @change="changeNum(index, item)"
                  ></el-input-number>
                </div>
                <div v-if="item.StockStatus == 'false'" class="num-content">
                  <span class="num-name">{{item.BuyNum}}</span>
                </div>
                <div class="subtotal-content">￥{{item.TotalPrice}}</div>
                <div class="user-operation" @click="deleteList(item.WareSkuCode)">删除</div>
              </div>
            </el-checkbox-group>
          </div>
        </div>
        <!-- 去结算 -->
        <div class="topay-content">
          <div class="checkbox-content">
            <span class="all-checkbox">
              <el-checkbox @change="handleCheckAllChange" v-model="checkAll"></el-checkbox>
            </span>
            <span class="all-check-tip">全选</span>
            <span class="delete-tip-title" @click="deleteList('')">删除选中的商品</span>
          </div>
          <div class="topay-message-content">
            <div class="topay-btn" @click="toPay">去结算</div>
            <div class="topay-message">
              <span class="choose-tip">已选择</span>
              <span class="checked-num">{{checkNum}}</span>
              <span>件商品</span>
              <span class="all-price">总价（不含运费）：</span>
              <span class="choose-num">￥{{totalMoney}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-cart-content">
        <div class="empty-cart-img"></div>
        <div class="empty-tip">亲，购物车还没有添加商品哦！</div>
      </div>
      <!-- 猜你喜欢标题 -->
      <div class="guess-love-content">
        <div class="guess-title">猜你喜欢</div>
        <div class="refresh-change-content">
          <div class="refresh-img-content">
            <img src="@/../static/img/shop-cart/refresh.png" class="refresh-img">
          </div>
          <div class="change-batch" @click="guessYouLike">换一批</div>
        </div>
      </div>
      <!-- 猜你喜欢列表 -->
      <div class="guess-list-content">
        <div
          v-for="(item, index) in guessList"
          :key="index"
          class="item-guess"
          @click="toDetail(item.WareSkuCode)"
        >
          <div class="item-message-content">
            <div class="item-img-content">
              <img :src="item.Pic800" class="item-img">
            </div>
            <div class="item-name-content">
              <div class="drugs-type" v-if="item.Type == 'OTC'">
                <img src="@/../static/img/shop-cart/otc.png" class="type-img">
              </div>
              <span v-if="item.Type == 'Rx'" class="rx-font">Rx</span>
              <span>{{item.DrugsName}}</span>
              <span>{{item.Model}}/{{item.Unit}}</span>
            </div>
            <div class="item-money">￥{{item.Price}}</div>
          </div>
        </div>
      </div>
      <wechat-login
        @closeDialog="hidePanel"
        :dialogVisible="dialogVisible"
        :state="2"
        :redirect_uri="redirect_uri"
      ></wechat-login>
    </div>
  </div>
</template>

<script>
import wechatLogin from "@/components/WechatLogin";
import { getUserLogin } from "@/api/kadShop/WechatLogin";
import {
  getShopCartList,
  getYouLike,
  updateNum,
  deleteShopCart,
  toPay
} from "@/api/kadShop/ShopCartList";
export default {
  components: {
    wechatLogin
  },
  data() {
    return {
      shopCart: {}, // 购物车对象
      carts: [], // 购物车列表
      guessList: [], // 猜你喜欢列表
      topayList: [], // 勾选了去结算的列表
      totalMoney: 0, // 总共花费的金钱
      checkedIdList: [], // 列表被勾选的下标
      allIdList: [], // 列表所有的下标
      checkAll: false, // 是否是全选
      checkNum: 0, // 选中个数
      dialogVisible: false, //是否弹出微信登录弹窗
      redirect_uri: "http%3A%2F%2F183.63.135.211:7006%2F%23%2FshopCart" // 微信登录重定向地址
    };
  },
  computed: {
    getData() {
      return this.$store.state.shopCartData;
    }
  },
  watch: {
    $route(to, from) {
      this.dialogVisible = false;
      this.getCode();
    },
    getData() {
      this.shopCart = this.$store.state.shopCartData;
      this.carts = this.shopCart.carts;
    }
  },
  mounted() {
    // 获取购物车列表
    this.gettList();
    // 获取猜你喜欢列表
    this.guessYouLike();
    this.shopCartList = this.$store.state.shopCartData;
  },
  methods: {
    // 点击了购物平台
    toShoping() {
      this.$router.push({ path: "/kadShop/kadIndex" });
    },
    // 点击了首页
    toHomePage() {
      this.$router.push({ path: "/index" });
    },
    // 判断是否登录
    getCode() {
      let url = window.location.href;
      if (url.indexOf("code") > 0) {
        let code = url
          .split("?")[1]
          .split("&")[0]
          .split("=")[1];
        let state = url
          .split("?")[1]
          .split("&")[1]
          .split("=")[1];
        if (state == 2) {
          this.getUserMessage(code);
        }
      }
    },
    // 普通用户登录获取信息
    getUserMessage(code) {
      getUserLogin({
        code: code
      }).then(res => {});
    },
    // 获取列表的唯一标志
    getLllIdList() {
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i].StockStatus == "true") {
          this.allIdList.push(this.carts[i].WareSkuCode);
        }
      }
    },
    // 获取购物车列表
    gettList() {
      getShopCartList({
        // userid: "13602289426"
        userid: ""
      }).then(res => {
        if (res.success) {
          if (res.returnMap != null) {
            let shopCart = {};
            shopCart.carts = res.resultList;
            shopCart.totalPrice = res.returnMap.TotalPrice;
            shopCart.totalNum = res.returnMap.totalAmount;
            this.$store.commit("updateShopCartData", shopCart);
            this.shopCart = this.$store.state.shopCartData;
            this.carts = this.shopCart.carts;
            if (this.carts != null) {
              this.getLllIdList();
            } else {
              this.shopCart = {};
              this.carts = [];
            }
          }
        }
      });
    },
    // 猜你喜欢
    guessYouLike() {
      getYouLike().then(res => {
        this.guessList = res.resultList;
      });
    },
    // 点击了猜你喜欢的详情
    toDetail(codeId) {
      this.$router.push({ path: '/kadShop/kadGoodsDetail', query: { id: codeId } });
    },
    // 点击了单个的checkbox
    handleCheckChange(value) {
      // value是一个数组，勾选的唯一code值
      let checkedCount = value.length; // 选择的个数
      this.checkNum = checkedCount; // 选中的个数
      this.checkAll = checkedCount === this.allIdList.length; // 判断是否全选
      this.topayList = []; // 勾选的列表
      // 把当前勾选的值添加到topayList
      for (let i = 0; i < this.carts.length; i++) {
        for (let j = 0; j < this.checkedIdList.length; j++) {
          if (this.checkedIdList[j] == this.carts[i].WareSkuCode) {
            this.topayList.push(this.carts[i]);
          }
        }
      }
      // 算总价钱
      if (this.topayList.length > 0) {
        this.totalMoney = 0; // 总价钱
        for (let j = 0; j < this.topayList.length; j++) {
          this.totalMoney += Number(this.topayList[j].TotalPrice);
        }
        let money = parseFloat(this.totalMoney).toFixed(3);
        let moneyStr = money.toString();
        this.totalMoney = moneyStr.substring(0, moneyStr.length - 1);
      } else {
        this.topayList = [];
        this.totalMoney = 0;
        this.checkNum = 0;
        this.checkedIdList = [];
      }
    },
    // 点击了全选的checkbox
    handleCheckAllChange(val) {
      this.checkedIdList = val ? this.allIdList : [];
      this.checkNum = 0;
      this.checkNum = this.checkedIdList.length;
      // 勾选了全选时
      if (val) {
        for (var i = 0; i < this.carts.length; i++) {
          if (this.carts[i].StockStatus == "true") {
            this.topayList.push(this.carts[i]);
          }
        }
        if (this.topayList.length > 0) {
          this.totalMoney = 0;
          for (let j = 0; j < this.topayList.length; j++) {
            this.totalMoney += Number(this.topayList[j].TotalPrice);
          }
          let money = parseFloat(this.totalMoney).toFixed(3);
          let moneyStr = money.toString();
          this.totalMoney = moneyStr.substring(0, moneyStr.length - 1);
        }
      } else {
        // 都没有勾选
        this.topayList = [];
        this.totalMoney = 0;
        this.checkNum = 0;
        this.checkedIdList = [];
      }
    },
    // 修改数量d
    changeNum(value, item) {
      updateNum({
        BuyNum: item.BuyNum,
        WareName: item.WareName,
        Price: item.Price,
        WareSkuCode: item.WareSkuCode,
        Pic: item.Pic,
        // userid: "13602289426"
        userid: ""
      }).then(res => {
        if (res.success) {
          let shopCart = {};
          shopCart.carts = res.resultList;
          shopCart.totalPrice = res.returnMap.TotalPrice;
          shopCart.totalNum = res.returnMap.totalAmount;
          this.$store.commit("updateShopCartData", shopCart);
          this.shopCart = this.$store.state.shopCartData;
          this.carts = this.shopCart.carts;
          if (this.topayList.length > 0) {
            this.totalMoney = 0;
            for (let j = 0; j < this.topayList.length; j++) {
              if (
                this.topayList[j].WareSkuCode == this.carts[value].WareSkuCode
              ) {
                // 修改topayList
                this.topayList[j] = this.carts[value];
              }
            }
            for (let i = 0; i < this.topayList.length; i++) {
              // 修改总价
              this.totalMoney += Number(this.topayList[i].TotalPrice);
            }
            let money = parseFloat(this.totalMoney).toFixed(3);
            let moneyStr = money.toString();
            this.totalMoney = moneyStr.substring(0, moneyStr.length - 1);
          } else {
            // 不勾选时
            this.topayList = [];
            this.totalMoney = 0;
            this.checkNum = 0;
            this.checkedIdList = [];
          }
        }
      });
    },
    // 点击了去结算，若没有登录就需要先登录
    toPay() {
      this.$message.warning("该渠道尚未开通");
      // let WareList = "";
      // WareList = JSON.stringify(this.topayList);
      // if (this.topayList.length > 0) {
      //   toPay({
      //     UserId: "13602289426",
      //    //  userid: "",
      //     WareList: WareList
      //   }).then(res => {
      //     if (res.success) {
      //       window.location.href = res.data;
      //     }
      //   });
      // } else {
      //   this.$message.warning("请选择购买的商品");
      // }
    },
    // 子关闭微登录弹窗
    hidePanel() {
      this.dialogVisible = false;
    },

    // 点击了全部删除
    deleteList(val) {
      let id;
      // 点击了删除单个
      if (val != "") {
        id = val;
      } else {
        // 点击了删除多个
        if (this.checkedIdList.length > 0) {
          var code = [];
          for (let i = 0; i < this.checkedIdList.length; i++) {
            code.push(this.checkedIdList[i]);
          }
          id = code.join(",");
        } else {
          this.$message.warning("请选择删除的商品");
          return;
        }
      }
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
            if (res.success) {
              let shopCart = {};
              shopCart.carts = res.resultList;
              shopCart.totalPrice = res.returnMap.TotalPrice;
              shopCart.totalNum = res.returnMap.totalAmount;
              this.$store.commit("updateShopCartData", shopCart);
              this.shopCart = this.$store.state.shopCartData;
              this.carts = this.shopCart.carts;
              this.getLllIdList();
              // 1、选择了删除单个的, topayList删除一个，数量减少一个
              if (val != "") {
                for (let i = 0; i < this.topayList.length; i++) {
                  if (this.topayList[i].WareSkuCode == val) {
                    this.topayList.splice(i, 1);
                  }
                }
                this.checkNum -= 1;
              } else {
                // 2、选择删除多个的
                for (let i = 0; i < this.topayList.length; i++) {
                  for (let j = 0; j < code.length; j++) {
                    if (this.topayList[i].WareSkuCode == code[j]) {
                      this.topayList.splice(i, 1);
                    }
                  }
                }
                this.checkNum -= code.length;
              }
              this.totalMoney = 0;
              for (let j = 0; j < this.topayList.length; j++) {
                this.totalMoney += Number(this.topayList[j].TotalPrice);
              }
              let money = parseFloat(this.totalMoney).toFixed(3);
              let moneyStr = money.toString();
              this.totalMoney = moneyStr.substring(0, moneyStr.length - 1);
              this.$refs.toShopCart.refreshCart();
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
  }
};
</script>

<style lang="scss" scoped>
.shop-cart-modu {
  width: 100%;
  min-width: 1200px;
  .shop-cart-content {
    margin-top: 24px;
    width: 100%;
    font-size: 16px;
    .shop-title {
      color: #333;
      cursor: pointer;
    }
    .shop-cart-name {
      color: #999;
    }
  }

  .choose-shop-content {
    width: 1200px;
    border: 1px solid rgba(238, 238, 238, 1);
    margin-top: 24px;
    .table-title {
      font-size: 20px;
      width: 1200px;
      height: 56px;
      line-height: 56px;
      background: rgba(248, 248, 248, 1);
      .all-checkbox {
        margin-left: 10px;
        .checkbox-input {
          widows: 20px;
          height: 20px;
        }
      }
      .shop-message-title {
        margin-left: 193px;
      }
      .unit-price-title {
        margin-left: 180px;
      }
      .num-subtotal-title {
        margin-left: 120px;
      }
    }
    .detailed-list-content {
      width: 1200px;
      .list-item {
        height: 168px;
        border-bottom: 1px solid rgba(235, 235, 235, 1);
        .checkbox-content {
          float: left;
          width: 16px;
          height: 16px;
          margin-top: 65px;
          margin-left: 15px;
          .checkbox-input {
            width: 20px;
            height: 20px;
          }
        }
        .none-goods-tip {
          float: left;
          width: 24px;
          height: 30px;
          margin-top: 80px;
          font-size: 12px;
          margin-left: 8px;
          color: #666;
        }
        .shop-img-content {
          width: 146px;
          height: 111px;
          float: left;
          margin-top: 27px;
          margin-left: 10px;
          .shop-img {
            width: 100%;
            height: 100%;
          }
        }
        .drug-message-content {
          width: 270px;
          float: left;
          margin-top: 40px;
          margin-left: 10px;
          .drug-name {
            width: 199px;
            height: 51px;
            overflow: hidden;
            font-size: 20px;
            line-height: 26px;
          }
          .drug-size {
            font-size: 16px;
            color: rgba(153, 153, 153, 1);
            line-height: 40px;
            margin-top: 10px;
          }
        }
        .all-price {
          float: left;
          width: 170px;
          height: 168px;
          line-height: 168px;
          font-size: 20px;
        }
        .num-content {
          float: left;
          width: 230px;
          height: 168px;
          line-height: 168px;
          .num-name {
            font-size: 14px;
            color: #bbb;
            margin-left: 60px;
          }
        }
        .subtotal-content {
          float: left;
          width: 210px;
          height: 168px;
          line-height: 168px;
          font-size: 20px;
        }
        .user-operation {
          width: 100px;
          height: 168px;
          line-height: 168px;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
          float: left;
          cursor: pointer;
        }
      }
      .have-goods-content {
        .drug-name {
          color: #333;
        }
        .subtotal-content {
          color: hsla(352, 98%, 56%, 1);
        }
      }
      .none-goods-content {
        background: #ebebeb;
        border: 1px solid #e2e2e2;
        .drug-name {
          color: #bbb;
        }
        .all-price {
          color: #bbb;
        }
        .subtotal-content {
          color: #bbb;
        }
      }
    }
  }
  .topay-content {
    margin-top: 16px;
    width: 1200px;
    height: 68px;
    background: rgba(248, 248, 248, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    .checkbox-content {
      line-height: 68px;
      //  width: 650px;
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
      float: left;
      .all-checkbox {
        margin-left: 10px;
        .checkbox-input {
          width: 20px;
          height: 20px;
        }
      }
      .delete-tip-title {
        margin-left: 15px;
        cursor: pointer;
      }
    }
    .topay-message-content {
      margin-top: 15px;
      .topay-message {
        float: right;
        margin-right: 18px;
        line-height: 48px;
        .choose-num {
          color: #fd213e;
          font-size: 20px;
        }
        .checked-num {
          color: #fd213e;
        }
      }
      .topay-btn {
        width: 138px;
        height: 46px;
        float: right;
        cursor: pointer;
        background: rgba(255, 23, 23, 1);
        line-height: 46px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        margin-right: 20px;
      }
    }
  }
  .empty-cart-content {
    width: 1200px;
    text-align: center;
    margin: 30px 0 80px 0;
    .empty-cart-img {
      width: 320px;
      height: 246px;
      background: url("~@/../static/img/ShoppingCart/emptyCart.png");
      margin: 0 auto;
    }
    .empty-tip {
      font-size: 18px;
      font-family: Adobe Heiti Std R;
      font-weight: normal;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
  .guess-love-content {
    width: 1200px;
    height: 56px;
    line-height: 56px;
    margin-top: 26px;
    background: rgba(248, 248, 248, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    .guess-title {
      float: left;
      font-size: 20px;
      margin-left: 25px;
    }
    .refresh-change-content {
      float: right;
      margin-right: 16px;
      .refresh-img-content {
        float: left;
        width: 18px;
        height: 18px;
        margin-top: 18px;
        margin-right: 6px;
        .refresh-img {
          widows: 100%;
          height: 100%;
        }
      }
      .change-batch {
        cursor: pointer;
        float: left;
      }
    }
  }
  .guess-list-content {
    margin-top: 10px;
    width: 1200px;
    height: 320px;
    margin-bottom: 70px;
    .item-guess {
      width: 232px;
      height: 320px;
      float: left;
      border: #e3e3e3 1px solid;
      margin-left: 6px;
      .item-message-content {
        width: 200px;
        height: 288px;
        margin: 16px;
        .item-img-content {
          width: 200px;
          height: 200px;
          .item-img {
            width: 100%;
            height: 100%;
          }
        }
        .item-name-content {
          width: 191px;
          height: 50px;
          font-size: 14px;
          color: #555;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          .drugs-type {
            width: 38px;
            height: 22px;
            display: inline-block;
            .type-img {
              width: 100%;
              height: 100%;
            }
          }
          .rx-font {
            font-weight: 550;
            color: red;
          }
        }
        .item-money {
          font-size: 20px;
          color: hsla(0, 100%, 55%, 1);
        }
      }
    }
    .item-guess:hover {
      box-shadow: 0 0 10px 0 #999;
    }
  }
}
</style>
<style lang="scss" >
.all-checkbox,
.checkbox-content {
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  .el-checkbox__label {
    font-size: 20px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #0a6ae3;
    border-color: #0a6ae3;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #0a6ae3;
  }
  .el-checkbox__inner:hover {
    border-color: #0a6ae3;
  }
  .el-input-number__increase:hover {
    border-color: #0a6ae3 !important;
  }
  .el-checkbox__label {
    display: none !important;
  }
}
</style>

