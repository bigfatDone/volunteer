<template>
  <div class="goodsDetail">
    <div class="w1200">
      <div class="tag-top">
        <span @click="toHomePage" class="index-name">首页 ></span>
        <span @click="toShoping" class="shopping-name">购药平台 ></span>
        <span class="tag-detail">商品详情</span>
      </div>
      <div class="goods-middle">
        <div class="goods-images">
          <div class="big-picture">
            <transition-group name="el-fade-in-linear">
              <div
                class="big-picture-item"
                v-for="(bigPicture , index) in goodsPictures"
                :key="bigPicture"
                v-show="index==nowBigPictureIndex"
              >
                <img :src="bigPicture">
              </div>
            </transition-group>
          </div>
          <div class="more-img">
            <div class="turn-left" @click="onTurnLeft" :class="{active:nowBigPictureIndex==0}"></div>
            <div class="small-picture">
              <ul id="smallImgBox">
                <li
                  class="small-picture-item"
                  v-for="(smallPicture, index) in goodsPictures"
                  :key="index"
                  @click="onTabBigPicture(index)"
                  :class="{active:index==nowBigPictureIndex}"
                >
                  <img :src="smallPicture">
                </li>
              </ul>
            </div>
            <div class="turn-right" @click="onTurnRight"></div>
          </div>
          <div class="goods-num">商品编号： {{goodsDetailList.ProductCode}}</div>
          <div class="line"></div>
          <div class="warn-text">
            <span class="warm-warning">温馨提示：</span>
            <span>图片均为康爱多对原品的真实拍摄，仅供参考；如遇新包装上市可能存在上新滞后，请以实物为准。</span>
          </div>
        </div>
        <div class="base-condition">
          <div class="title-top">
            <div class="tag-first">
              <img :src="typeImg">
            </div>
            <span>{{goodsDetailList.WareName}}</span>
          </div>
          <div class="brief-info">{{goodsDetailList.Functions}}</div>
          <div class="price-bg">
            <span class="price-text">价格</span>
            <span class="price-sign">¥</span>
            <span class="price-num">{{goodsDetailList.Price}}</span>
            <span class="price-old">¥{{goodsDetailList.Price}}</span>
          </div>
          <div class="product-info">
            <el-row class="product-box">
              <el-col :span="4" class="product-text">生产厂家</el-col>
              <el-col :span="20" class="company-text">{{goodsDetailList.ManufacturerName}}</el-col>
            </el-row>
            <el-row class="approve-box">
              <el-col :span="4" class="approve-text">批准文号</el-col>
              <el-col :span="20">
                <span class="sign-text">{{goodsDetailList.RegisTrationNumber}}</span>
                <span class="brackets-text">（国家食药总局查询）</span>
              </el-col>
            </el-row>
            <el-row class="type-box">
              <el-col :span="4" class="type-text">类别</el-col>
              <el-col :span="20" class="type-detail">{{classification}}</el-col>
            </el-row>
          </div>
          <div class="goods-info">
            <el-row class="standard-box">
              <el-col :span="4" class="standard-text">规格</el-col>
              <el-col :span="20">
                <div
                  class="mount-button"
                  @click="onSelectType"
                  v-bind:class="{active:nowSelectIndex}"
                >
                  {{goodsDetailList.Model}}
                  <div class="one-triangle"></div>
                </div>
              </el-col>
            </el-row>
            <el-row class="mount-box">
              <el-col :span="4" class="mount-text">数量</el-col>
              <el-col :span="20">
                <div class="edit-box">
                  <div class="decrease-button" @click="onDecreaseMount" :class="{active:mount==1}">-</div>
                  <div class="mount-textbox">
                    <input
                      v-model="mount"
                      class="num-content"
                      @change="changenum(mount)"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    >
                  </div>
                  <div class="increase-button" @click="onIncreaseMount">+</div>
                </div>
                <span class="now-goods">现在{{stock}}</span>
                <span class="post-money">(支持79元包邮)</span>
              </el-col>
            </el-row>
            <div :class="bugbtnbg ? 'bug-button' : 'bug-none-button'">
              <div class="bug-img"></div>
              <span class="bug-text" @click="addCart">加入购物车</span>
            </div>
            <el-row class="promise-box">
              <el-col :span="4" class="promise-text">承诺</el-col>
              <el-col :span="4" class="promise-item">
                <div class="promise-img"></div>
                <div class="promise-detail">正品保证</div>
              </el-col>
              <el-col :span="4" class="promise-item">
                <div class="promise-img"></div>
                <div class="promise-detail">专业药师</div>
              </el-col>
              <el-col :span="4" class="promise-item">
                <div class="promise-img"></div>
                <div class="promise-detail">隐私包装</div>
              </el-col>
              <el-col :span="4" class="promise-item">
                <div class="promise-img"></div>
                <div class="promise-detail">货到付款</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="introduce-bottom">
        <div class="goods-introduce">商品介绍</div>
        <div class="introduce-detail">
          <el-row :gutter="30" class="introduce-page">
            <el-col :span="6">商品名称：{{goodsDetailList.DrugsName}}</el-col>
            <el-col :span="10">肾茶规格：{{goodsDetailList.Model}}</el-col>
            <el-col :span="8">生产企业：{{goodsDetailList.ManufacturerName}}</el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6">通用名称：{{goodsDetailList.WareGeneralName}}</el-col>
            <el-col :span="10" class="eat-method">食用方法：{{goodsDetailList.Usage}}</el-col>
            <el-col :span="8">相关许可：卫食健字（1997）第074号</el-col>
          </el-row>
        </div>
        <div class="introduce-essay">
          <div class="introduce-img">
            <img :src="goodsDetailList.Pic800">
          </div>
          <div class="introduce-summary" v-html="goodsDetailList.Instruction"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsinfo, postAddGoodsToCart } from "@/api/kadShop/goodsDetail";
export default {
  data() {
    return {
      goodsDetailList: [], //商品详情列表
      goodsPictures: [], //图片列表
      nowBigPictureIndex: 0, //当前显示大图
      //types: ["250ml*5瓶", "250ml*5瓶"],
      //nowSelectIndex: 0,
      typeImg: "", //标题前类别图片
      nowSelectIndex: true, //规格选择
      classification: "", //类别
      stock: "", //库存
      mount: 1, //数量
      bugbtnbg: true, //库存状态按钮背景显示
      id: "",
      price: "" //定价
    };
  },
  mounted() {
    //获取商品详情
    this.getGoodsDetail();
  },
  methods: {
    // 点击了首页
    toHomePage() {
      this.$router.push({ path: "../index" });
    },
    // 点击了购物平台
    toShoping() {
      this.$router.push({ path: "/kadShop/kadIndex" });
    },
    //点击小图切换大图并给图片添加边框样式
    onTabBigPicture(index) {
      this.nowBigPictureIndex = index;
    },
    //点击向左
    onTurnLeft() {
      //点击向左时给图片添加边框样式
      if (this.nowBigPictureIndex > 0) {
        this.nowBigPictureIndex--;
      }
      //多于5张图片时点击向左使整列图片整体向左移动
      if (
        (this.nowBigPictureIndex < this.goodsPictures.length - 1 &&
          this.nowBigPictureIndex >= 4) ||
        smallImgBox.offsetLeft != 0
      ) {
        smallImgBox.style.left = smallImgBox.offsetLeft + 67 + "px";
      } else if (this.nowBigPictureIndex <= 0) {
        this.nowBigPictureIndex = 0;
      }
    },
    //点击向右
    onTurnRight() {
      //点击向右时给图片添加边框样式
      if (this.nowBigPictureIndex < this.goodsPictures.length - 1) {
        this.nowBigPictureIndex++;
      } else if (
        this.nowBigPictureIndex < 5 &&
        this.nowBigPictureIndex == this.goodsPictures.length - 1
      ) {
        this.nowBigPictureIndex = 0;
      } else if (
        this.nowBigPictureIndex > 4 &&
        this.nowBigPictureIndex == this.goodsPictures.length - 1
      ) {
        this.nowBigPictureIndex = 0;
        smallImgBox.style.left =
          smallImgBox.offsetLeft + 67 * (this.goodsPictures.length - 5) + "px";
      }
      //多于5张图片时点击向右使整列图片整体向右移动
      if (
        this.nowBigPictureIndex <= this.goodsPictures.length - 1 &&
        this.nowBigPictureIndex > 4 &&
        smallImgBox.offsetLeft != -67 * (this.goodsPictures.length - 5)
      ) {
        smallImgBox.style.left = smallImgBox.offsetLeft - 67 + "px";
      }
    },
    //点击商品规格选择框时添加样式
    onSelectType() {
      if (this.nowSelectIndex) {
        this.nowSelectIndex = false;
      } else {
        this.nowSelectIndex = true;
      }
    },
    //点击减少数量
    onDecreaseMount() {
      if (this.mount > 1) {
        this.mount--;
      }
    },
    //点击增加数量
    onIncreaseMount() {
      this.mount++;
    },
    // 手动修改价钱
    changenum(money) {
      if (money <= 0) {
        this.mount = 1;
      }
    },
    //获取商品详情
    getGoodsDetail() {
      this.id = this.$route.query.id;
      getGoodsinfo({
        wareSkuCode: this.id
      }).then(res => {
        if (res.success) {
          this.goodsDetailList = res.returnMap;
          this.price = this.goodsDetailList.Price;
          this.goodsPictures = res.returnMap.WarePicList;
          var smallImgBox = document.getElementById("smallImgBox");
          smallImgBox.style.width = this.goodsPictures.length * 67 + "px"; //获取全部缩略图并排时的宽度
          if (this.goodsDetailList.StockStatus) {
            this.stock = "有货";
            this.bugbtnbg = true;
          } else {
            this.stock = "无货";
            this.bugbtnbg = false;
          }
          if (this.goodsDetailList.IsRx) {
            this.classification = "Rx";
            this.typeImg = "/static/img/goodsDetail/RX.png";
          } else {
            this.classification = "OTC";
            this.typeImg = "/static/img/goodsDetail/OTC.png";
          }
        }
      });
    },
    //点击添加商品到购物车
    addCart() {
      this.stock === "有货" && this.Price != "0.00"
        ? this.addGoodsToCart()
        : this.$message.error("暂时无货或者定价");
    },
    //添加购物车
    addGoodsToCart() {
      postAddGoodsToCart({
        // userid: "13602289426",
        userid: "",
        BuyNum: this.mount.toString(),
        WareName: this.goodsDetailList.DrugsName,
        Price: this.goodsDetailList.Price,
        WareSkuCode: this.goodsDetailList.WareSkuCode,
        Pic: this.goodsDetailList.Pic800,
        Model: this.goodsDetailList.Model,
        Unit: this.goodsDetailList.Unit,
        StockStatus: this.goodsDetailList.StockStatus
      }).then(res => {
              console.log(res)
        if (res.success) {
          let shopCart = {};
          shopCart.carts = res.resultList;
          shopCart.totalPrice = res.returnMap.TotalPrice;
          shopCart.totalNum = res.returnMap.totalAmount;
    
          this.$store.commit("updateShopCartData", shopCart);
          this.$message.success("加入购物车成功");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsDetail {
  font-size: 0px;
  min-width: 1200px;
  .w1200 {
    .tag-top {
      margin-top: 23px;
      font-size: 16px;
      .index-name,
      .shopping-name {
        cursor: pointer;
      }
      .tag-detail {
        color: #999999;
      }
    }
    .goods-middle {
      margin-top: 24px;
      padding: 15px;
      border: 1px solid rgba(238, 238, 238, 1);
      .goods-images {
        width: 400px;
        display: inline-block;
        .big-picture {
          position: relative;
          width: 400px;
          height: 400px;
          overflow: hidden;
          .big-picture-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 400px;
            height: 400px;
            z-index: 0;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .more-img {
          margin-top: 18px;
          width: 400px;
          height: 65px;
          text-align: center;
          .turn-left {
            float: left;
            background: url("/static/img/goodsDetail/toleft1.png") no-repeat;
            width: 5px;
            height: 10px;
            margin-top: 28px;
            cursor: pointer;
          }
          .turn-left.active {
            float: left;
            background: url("/static/img/goodsDetail/toleft2.png") no-repeat;
            width: 5px;
            height: 10px;
            margin-top: 28px;
            cursor: pointer;
          }
          .small-picture {
            position: relative;
            display: inline-block;
            width: 335px;
            height: 67px;
            margin: 0 auto;
            overflow: hidden;
            ul {
              height: 67px;
              position: absolute;
              top: 0;
              left: 0px;
              .small-picture-item {
                float: left;
                width: 65px;
                height: 65px;
                border: 1px solid rgba(235, 235, 235, 1);
                cursor: pointer;
              }
              .small-picture-item.active {
                float: left;
                width: 65px;
                height: 65px;
                border: 1px solid rgba(255, 55, 56, 1);
                cursor: pointer;
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .turn-right {
            float: right;
            background: url("/static/img/goodsDetail/toright1.png") no-repeat;
            width: 5px;
            height: 10px;
            margin-top: 28px;
            cursor: pointer;
          }
        }
        .goods-num {
          margin-top: 24px;
          font-size: 14px;
        }
        .line {
          margin-top: 22px;
          width: 400px;
          height: 1px;
          background: rgba(204, 204, 204, 1);
        }
        .warn-text {
          margin-top: 20px;
          font-size: 14px;
          .warm-warning {
            color: #ff7805;
          }
        }
      }
      .base-condition {
        width: 684px;
        display: inline-block;
        vertical-align: top;
        margin-left: 50px;
        .title-top {
          margin-top: 30px;
          .tag-first {
            width: 44px;
            height: 26px;
            display: inline-block;
            vertical-align: bottom;
          }
          span {
            margin-left: 10px;
            font-size: 24px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
          }
        }
        .brief-info {
          margin-top: 16px;
          font-size: 16px;
          color: #ff3738;
        }
        .price-bg {
          margin-top: 15px;
          padding-top: 12px;
          height: 60px;
          background: rgba(242, 242, 242, 1);
          .price-text {
            margin-left: 18px;
            font-size: 16px;
            color: rgba(119, 119, 119, 1);
          }
          .price-sign {
            margin-left: 52px;
            font-size: 20px;
            color: #fc2d2f;
          }
          .price-num {
            font-size: 34px;
            color: #fc2d2f;
          }
          .price-old {
            position: absolute;
            margin-left: 33px;
            margin-top: 12px;
            font-size: 16px;
            color: rgba(119, 119, 119, 1);
            text-decoration: line-through;
          }
        }
        .product-info {
          padding: 21px 18px;
          border-bottom: 1px solid rgba(204, 204, 204, 1);
          .product-box {
            .product-text {
              font-size: 16px;
              color: rgba(119, 119, 119, 1);
            }
            .company-text {
              font-size: 16px;
              color: rgba(74, 74, 74, 1);
            }
          }
          .approve-box {
            margin-top: 21px;
            .approve-text {
              font-size: 16px;
              color: rgba(119, 119, 119, 1);
            }
            .sign-text {
              font-size: 16px;
              color: rgba(74, 74, 74, 1);
            }
            .brackets-text {
              margin-left: 5px;
              font-size: 16px;
              color: #0a6ae3;
            }
          }
          .type-box {
            margin-top: 21px;
            .type-text {
              font-size: 16px;
              color: rgba(119, 119, 119, 1);
            }
            .type-detail {
              font-size: 16px;
              color: rgba(74, 74, 74, 1);
            }
          }
        }
        .goods-info {
          padding: 19px 18px;
          .standard-box {
            .standard-text {
              font-size: 16px;
              color: rgba(119, 119, 119, 1);
              line-height: 40px;
            }
            .mount-button {
              padding: 0 16px;
              height: 40px;
              display: inline-block;
              margin-right: 39px;
              border: 1px solid rgba(238, 238, 238, 1);
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              text-align: center;
              line-height: 40px;
              cursor: pointer;
            }
            .mount-button.active {
              //background: url("/static/img/goodsDetail/selectBox.png");
              height: 40px;
              position: relative;
              display: inline-block;
              margin-right: 39px;
              border: 1px solid rgba(255, 64, 64, 1);
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              text-align: center;
              line-height: 40px;
              cursor: pointer;
              .one-triangle {
                width: 19px;
                height: 19px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url("/static/img/goodsDetail/triangleImg.png");
              }
            }
          }
          .mount-box {
            margin-top: 18px;
            .mount-text {
              font-size: 16px;
              color: rgba(119, 119, 119, 1);
              line-height: 40px;
            }
            .edit-box {
              display: inline-block;
              width: 140px;
              height: 36px;
              border: 1px solid rgba(204, 204, 204, 1);
              .decrease-button {
                display: inline-block;
                width: 35px;
                height: 36px;
                border-right: 1px solid rgba(204, 204, 204, 1);
                font-size: 18px;
                text-align: center;
                line-height: 36px;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
              .decrease-button.active {
                display: inline-block;
                width: 35px;
                height: 36px;
                border-right: 1px solid rgba(204, 204, 204, 1);
                font-size: 18px;
                text-align: center;
                line-height: 36px;
                cursor: pointer;
                color: rgb(218, 218, 218);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
              .mount-textbox {
                display: inline-block;
                width: 68px;
                height: 36px;
                font-size: 16px;
                text-align: center;
                line-height: 36px;
                .num-content {
                  width: 100%;
                  height: 30px;
                  text-align: center;
                }
              }
              .increase-button {
                display: inline-block;
                width: 35px;
                height: 36px;
                border-left: 1px solid rgba(204, 204, 204, 1);
                font-size: 18px;
                text-align: center;
                line-height: 36px;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
            }
            .now-goods {
              margin-left: 20px;
              font-size: 16px;
              color: #0a6ae3;
            }
            .post-money {
              margin-left: 10px;
              font-size: 14px;
              color: #777777;
            }
          }
          .bug-button {
            margin-top: 30px;
            margin-left: 108px;
            width: 244px;
            height: 55px;
            background: rgba(255, 59, 1, 1);
            text-align: center;
            line-height: 55px;
            cursor: pointer;
            .bug-img {
              display: inline-block;
              background: url("/static/img/goodsDetail/shoppingImg.png");
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
            .bug-text {
              margin-left: 20px;
              display: inline-block;
              font-size: 22px;
              color: rgba(255, 255, 255, 1);
              vertical-align: top;
            }
          }
          .bug-none-button {
            margin-top: 30px;
            margin-left: 108px;
            width: 244px;
            height: 55px;
            background: rgba(153, 153, 153, 1);
            text-align: center;
            line-height: 55px;
            cursor: pointer;
            .bug-img {
              display: inline-block;
              background: url("/static/img/goodsDetail/shoppingImg.png");
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
            .bug-text {
              margin-left: 20px;
              display: inline-block;
              font-size: 22px;
              color: rgba(255, 255, 255, 1);
              vertical-align: top;
            }
          }
          .promise-box {
            margin-top: 26px;
            .promise-text {
              font-size: 16px;
              color: rgba(119, 119, 119, 1);
            }
            .promise-item {
              margin-right: 10px;
              .promise-img {
                display: inline-block;
                background: url("/static/img/goodsDetail/promiseImg.png");
                width: 14px;
                height: 14px;
              }
              .promise-detail {
                display: inline-block;
                margin-left: 8px;
                font-size: 16px;
                color: rgba(119, 119, 119, 1);
              }
            }
          }
        }
      }
    }
    .introduce-bottom {
      margin-top: 24px;
      margin-bottom: 77px;
      border: 1px solid rgba(225, 225, 225, 1);
      .goods-introduce {
        height: 58px;
        background: rgba(242, 242, 242, 1);
        border-bottom: 1px solid rgba(225, 225, 225, 1);
        font-size: 20px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 58px;
        padding-left: 29px;
      }
      .introduce-detail {
        padding: 23px 21px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        border-bottom: 1px solid rgba(225, 225, 225, 1);
        .introduce-page {
          margin-bottom: 10px;
        }
        .eat-method {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .introduce-essay {
        padding: 20px 20px;
        .introduce-img {
          width: 1160px;
          height: 471px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
          }
        }
        .introduce-summary {
          margin-top: 26px;
          margin-bottom: 70px;
          width: 1160px;
          font-size: 18px;
          color: rgba(74, 74, 74, 1);
        }
      }
    }
  }
}
</style>

