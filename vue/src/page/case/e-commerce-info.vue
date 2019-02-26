<template>
  <div class="goods-info-content">
    <div class="w1200">
      <!-- 面包屑导航模块 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <span class="tips">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/commerce' }">农产品电商</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/commerce', query: {id: dirId}}">{{ dirName }}</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 介绍商品信息 -->
      <div class="message-modu">
        <!-- 左侧的图片区域 -->
        <div class="img-content">
          <div class="main-img">
            <img :src="img" class="img-position">
          </div>
          <div class="small-img-content">
            <div
              v-for="(item, index) in imgArr"
              :key="index"
              class="pic-list"
              @mouseenter="setImg(item)"
            >
              <img :src="item" class="img-position">
            </div>
          </div>
          <div class="collection-share">
            <div class="collection">
              <img src="../../../static/img/connect.png" class="img">
              <span>收藏</span>
            </div>
            <div class="share">
              <img src="../../../static/img/share.png" class="img">
              <span>分享</span>
            </div>
          </div>
        </div>
        <!-- 右侧的文字描述区域 -->
        <div class="introduce-content">
          <div class="name">{{this.dataInfo.title}}</div>
          <div class="message-text">
            <p>品牌：{{this.dataInfo.brand}}</p>
          </div>
          <div class="message-text">
            <p>规格：{{this.dataInfo.gg}}</p>
          </div>
          <div class="message-text">
            <p>上架时间：{{this.dataInfo.creation_time}}</p>
          </div>
          <div class="message-text">
            <p>商品描述：{{this.dataInfo.second_title}}</p>
          </div>
          <div class="buy-content">
            <div class="shop">
              <img src="../../../static/img/shop-cart.png" class="shop-car">
            </div>
            <div class="buy-button">立即购买</div>
          </div>
        </div>
      </div>
      <!-- 粤农优品详情模块 -->
      <div class="detail-modu">
        <!-- 左侧的详情区域 -->
        <div class="info-content">
          <div class="yn-item-title">
            <div class="title-left">
              <p class="title-name">粤农优品详情</p>
            </div>
          </div>
          <div v-html="dataInfo.description" class="data-content"></div>
        </div>
        <!-- 右侧是商城热面区域 -->
        <div class="recommend-content">
          <div class="title-content">
            <span class="title">商城热卖</span>
          </div>
          <div class="recommend-list" v-for="(item, index) in recommendList" :key="index">
            <div class="img">
              <img src="../../../static/img/orange.png">
            </div>
            <div class="goods-introduce">
              <div class="name">德庆皇帝柑</div>
              <div class="content">果大，果型好、肉色橙红、嫩滑、汁 化渣、甜中带酸、味清甜带香</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo } from "@/api/base/service";
export default {
  data() {
    return {
      picList: [1, 2, 3, 4, 5], // 小图片列表
      recommendList: [1, 2, 3], // 推荐商品的列表
      dataInfo: {},
      imgArr: [],
      img: "",
      // 上一级目录名字
      dirName: '',
      // 上一级目录id
      dirId: '',
    };
  },
  methods: {
    // 获取页面数据
    getData(id) {
      getGoodsInfo({
        goodsid: id
      }).then(res => {
        if (res.success) {
          this.dataInfo = res.returnMap;
          this.imgArr = res.returnMap.img.split(',');
          this.img = this.imgArr.length > 0 ? this.imgArr[0] : '';

          // 获取上一级目录名字和ID
          this.dirName = res.returnMap.ditionaries_name;
          this.dirId = res.returnMap.ditionaries_id;
        }
      });
    },

    // 修改展示大图片
    setImg(url) {
      this.img = url;
    }
  },
  mounted() {
    // 获取页面数据
    this.getData(this.$route.query.id);
  }
};
</script>

<style lang="scss" scoped>
.goods-info-content {
  margin-top: 40px;
  .w1200 {
    // 面包屑导航模块
    .breadcrumb {
      font-size: 16px;
      line-height: 28px;
      margin: 22px 0 25px 0;
      vertical-align: middle;
      .el-breadcrumb {
        font-size: 16px;
        line-height: 28px;
        display: inline-block;
        .tips {
          font-weight: bold;
          margin-right: 4px;
          float: left;
        }
      }
    }
    // 电子商务商品简介模块
    .message-modu {
      // 左侧商品大图样式
      .img-content {
        width: 480px;
        margin: 0 auto;
        display: inline-block;
        .main-img {
          width: 450px;
          height: 450px;
          .img-position {
            width: 100%;
            height: 100%;
            object-fit: cover;
            align-items: center; 
            justify-content: center;
          }
        }
        .small-img-content {
          margin-top: 10px;
          .pic-list {
            width: 80px;
            height: 80px;
            float: left;
            margin: 5px;
            cursor: pointer;
            .img-position {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        .collection-share {
          width: 200px;
          padding-top: 10px;
          display: flex;
          clear: both;
          .collection {
            flex: 1;
            .img {
              display: inline-block;
              width: 20px;
            }
            span {
              font-size: 14px;
              color: #999;
            }
          }
          .share {
            flex: 1;
            .img {
              display: inline-block;
              width: 20px;
            }
            span {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      // 右侧简介样式
      .introduce-content {
        width: 597px;
        float: right;
        margin-right: 40px;
        // 商品名称
        .name {
          font-size: 30px;
          font-family: Adobe Heiti Std R;
          font-weight: bold;
          color: #ff7204;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }
        // 其他介绍
        .message-text {
          font-size: 18px;
          line-height: 33px;
          font-size: 20px;
          font-family: Adobe Heiti Std R;
          font-weight: nomal;
          color: rgba(51, 51, 51, 1);
          p {
            margin-bottom: 15px;
          }
        }
        .buy-content {
          width: 278px;
          height: 123px;
          background-image: url("../../../static/img/pay-button.png");
          float: right;
          text-align: center;
          margin-top: 20px;
          .shop {
            float: left;
            margin-top: 45px;
            margin-left: 61px;
            .shop-car {
              width: 36px;
              height: 32px;
            }
          }
          .buy-button {
            font-size: 23px;
            color: #fff;
            margin-top: 47px;
            margin-right: 43px;
          }
        }
      }
    }
    // 粤农优品详情模块
    .detail-modu {
      margin: 40px 0 50px 0;
      .info-content {
        width: 950px;
        display: inline-block;
        .data-content {
          margin: 20px;
          min-height: 1000px;
        }
      }
      .recommend-content {
        width: 230px;
        float: right;
        min-height: 600px;
        .title-content {
          line-height: 50px;
          background: #ebebeb;
          font-size: 20px;
          .title {
            font-size: 24px;
            font-family: Adobe Heiti Std R;
            color: rgba(34, 34, 34, 1);
            line-height: 21px;
            padding-left: 20px;
          }
        }
        .recommend-list {
          width: 228px;
          border: solid 1px #eee;
          margin-bottom: 20px;
          .img {
            width: 210px;
            padding: 10px;
          }
          .goods-introduce {
            margin-left: 10px;
            .name {
              font-size: 16px;
              font-family: Adobe Heiti Std R;
              font-weight: bold;
              color: rgba(45, 45, 45, 1);
              line-height: 21px;
            }
            .content {
              font-size: 12px;
              font-family: Adobe Heiti Std R;
              font-weight: normal;
              color: rgba(142, 142, 142, 1);
              line-height: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
