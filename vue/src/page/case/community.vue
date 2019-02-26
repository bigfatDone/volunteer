<template>
  <div class="community-module">
    <div class="contain-banner">
      <div class="banner-tips clearfix">
        <swiper 
          v-for="(item,index) in imgArr"
          :key="index"
          :options="swiperOption" 
          ref="mySwiper">
          <swiper-slide>
            <img :src="item" class="banner-img"/>
          </swiper-slide>
        </swiper>
        <div class="w1200 clearfix">
          <div class="tips-icon"></div>
          <div class="tips-title">益农社信息</div>
          <div class="tips-text yn-text-ellipsis">{{dataResult.notice}}</div>
        </div>
      </div>
    </div>
    <div class="contain-body">
      <div class="w1200 clearfix">
        <div class="wrap-main">
          <div class="main-title">{{dataResult.ynsname}}</div>
          <div class="main-content">
            <ul class="main-ul">
              <li class="main-li">
                <div class="main-item">类型：{{dataResult.lns_type}}</div>
                <div class="main-item">
                  具体地址：<p class="main-address">{{dataResult.address}}</p>
                </div>
              </li>
              <li class="main-li">
                <div class="main-item">信息员：{{dataResult.name}}</div>
                <div class="main-item">场所面积：{{dataResult.sell_area}}</div>
              </li>
              <li class="main-li">
                <div class="main-item">联系方式：{{dataResult.phone}}</div>
              </li>
              <li class="main-li">
                <div class="main-item max-item">
                  主营业务：
                  <p class="main-business">{{dataResult.servicescope}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap-base">
          <div class="item-title">基础设施</div>
          <div class="base-content">
            <ul class="base-ul">
              <li class="base-li">
                <div class="base-item">
                  <i class="base-icon"></i>
                  信息员数量：{{dataResult.persioncount}}
                </div>
                <div class="base-item">
                  <i class="base-icon"></i>
                  配备智能手机数量：{{dataResult.phonecount}}
                </div>
                <div class="base-item">
                  <i class="base-icon"></i>
                  网速：{{dataResult.netspeed_and_wifi}}
                </div>
              </li>
              <li class="base-li">
                <div class="base-item">
                  <i class="base-icon"></i>
                  配备计算机数量：{{dataResult.pc_equipped}}
                </div>
                <div class="base-item">
                  <i class="base-icon"></i>
                  电子显示屏：{{dataResult.screen}}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap-info">
          <ul class="info-item">
            <li class="item-content">
              <div class="item-title">益农社概况</div>
              <div class="item-text" v-html="dataResult.bz"></div>       
            </li>
            <li class="item-content">
              <div class="item-title">乡村简介</div>
              <div class="item-text" v-html="dataResult.village_profile">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCommunityData} from '@/api/base/community'
export default {
  data() {
    return {
      swiperOption: {
        loop: true, // 循环轮播
        autoplay: true, // 自动轮播
        speed: 600, // 轮播速度
        delay: 4000, // 自动切换的时间间隔
        autoplay: {
          disableOnInteraction: false
        }
      },
      imgArr: [],
      dataResult:{},
      id: this.$route.query.id,
    };
  },
  methods: {
    getData(id) {
      getCommunityData({
        id: id
      }).then(res =>{
        if(res.success) {
          this.dataResult = res.returnMap;
          this.imgArr = res.returnMap.img.split(',');
        }
      })
    },
   },
  mounted() {
    this.getData(this.id);
  } 
}
</script>
<style lang="scss" scoped>
.community-module {
  .contain-banner {
    position: relative;
    width: 100%;
    height: 500px;
    .banner-tips {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: rgba(0,0,0,0.6);
      .banner-img {
        width: 100%;
        height: 100%;
      }
      .w1200 {
        padding: 18px 30px;
        color: #fff;
        overflow: hidden;
        .tips-icon {
          display: inline-block;
          width: 38px;
          height: 32px;
          margin-left: 30px;
          vertical-align: middle;
          background: url("~@/../static/img/notice.png") top center no-repeat /100%;
        }
        .tips-title {
          display: inline-block;
          margin-left: 18px;
          font-size: 22px;
          vertical-align: middle;
        }
        .tips-text {
          display: inline-block;
          max-width: 850px;
          margin-left: 31px;
          font-size: 20px;
          vertical-align: middle;
        }
      }
      
    }
  }
  .contain-body {
    .wrap-main {
      .main-title {
        padding: 44px 0 29px 22px;
        font-weight: bold;
        font-size: 32px;
        color: #FF7204;
        border-bottom: 1px solid #129F3B;
      }
      .main-content {
        padding: 30px 22px;
        .main-ul {
          .main-li {
            display: inline-block;
            width: 382px;
            font-size: 20px;
            color: #333;
            vertical-align: top;
            box-sizing: border-box;
            .main-item {             
              margin-bottom: 30px;
              .main-address {
                display: inline-block;
                width: 250px;
                vertical-align: top;
              }
              &.max-item {
                width: 1100px;
                .main-business {
                  display: inline-block;
                  width: 990px;
                  vertical-align: top;
                }
              }
            }
          }
        }
      }
    }
    .item-title {
      padding-left: 21px; 
      line-height: 50px;
      font-size: 32px;
      color: #fff;
      background: url("~@/../static/img/titleImg.png") no-repeat top center /100%;
    }
    .wrap-base {
      .base-content {
        padding: 30px 22px;
        .base-ul {
          .base-li {
            display: inline-block;
            width: 550px;
            font-size: 20px;
            color: #333;
            vertical-align: top;
            box-sizing: border-box;
            .base-item {
              margin-bottom: 30px;
              .base-icon {
                display: inline-block;
                width: 16px;
                height: 15px;
                background: url("~@/../static/img/star.png") no-repeat;
              }
            }
          }
        }
      }
    }
    .wrap-info {
      .info-item {
        .item-content {
          .item-text {
            padding: 22px 6px 70px;
            line-height: 40px;
            font-size: 20px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>