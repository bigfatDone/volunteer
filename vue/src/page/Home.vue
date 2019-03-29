<template>
    <div class="container">
        <div class="guide">
            <div class="swipper">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/swiper1.jpg" alt=""></swiper-slide>
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/swiper2.jpg" alt=""></swiper-slide>
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/swiper3.jpg" alt=""></swiper-slide>
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/swiper4.jpg" alt=""></swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <div class="guide-content">
              <div class="guide-to tohelp @mouseover=" @mouseenter=" helpState = !helpState" v-show="helpState">
                <img src="~@/../static/images/help.png" alt="">
                <div class="guide-option">求助者</div>
              </div>
              <div class="guide-to help-detail" @mouseleave=" helpState = !helpState" v-show="!helpState">
                <div class="option">寻求帮助</div>
                <div class="option">注册志愿者</div>
              </div>
              <div class="guide-to tovolunteer" @mouseenter=" volunteerState = !volunteerState" v-show="volunteerState">
                <img src="~@/../static/images/tovolunteer.png" alt="">
                <div class="guide-option">志愿者</div>
              </div>
              <div class="guide-to volunteer-detail" @mouseleave=" volunteerState = !volunteerState" v-show="!volunteerState">
                <div class="option">实名注册</div>
                <div class="option">参加项目</div>
                <div class="option">已参加项目</div>
              </div>
              <div class="guide-to tocommunity"  @mouseenter=" communityState = !communityState" v-show="communityState">
                <img src="~@/../static/images/tocommunity.png" alt="">
                <div class="guide-option">社区服务</div>
              </div>
              <div class="guide-to community-detail" @mouseleave=" communityState = !communityState" v-show="!communityState">
                <div class="option">社区注册</div>
                <div class="option">发布项目</div>
                <div class="option">已发布时间</div>
              </div>
            </div>
        </div>
        <div class="info">
          <div class="volunteer-info info-left clearfix">
            <div class="title">
              <p>
                <span>热点资讯</span>
                <span>更多>></span>
                </p>
            </div>
            <div class="details">
              <ul>
                <li class="clearfix" @click="toDetail"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
              </ul>
            </div>
          </div>
          <div class="volunteer-info info-right clearfix">
            <div class="title">
              <p>
                <span>最新项目</span>
                <span>更多>></span>
                </p>
            </div>
            <div class="details">
              <ul>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
                <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋志愿服务推动日fsfsafsadfsfafdd</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="activity">
          <div class="pic pic-left"><img src="~@/../static/images/gotoCommunity.jpg" alt=""></div>
          <div class="pic"><img src="~@/../static/images/useBike.jpg" alt=""></div>
        </div>
        <div class="excellent">
          <div class="title">
              <p>
                <span>优秀志愿者</span>
                <span>更多>></span>
              </p>
            </div>
          <div class="icon clearfix">
          <div class="pic">
            <img src="~@/../static/images/head.png" alt="">
            <div class="name"><span>姓名:</span>&nbsp;&nbsp;<span>钟阳山</span></div>
          </div>
          <div class="pic">
            <img src="~@/../static/images/head.png" alt="">
            <div class="name"><span>姓名:</span>&nbsp;&nbsp;<span>钟阳山</span></div>
          </div>
          <div class="pic">
            <img src="~@/../static/images/head.png" alt="">
            <div class="name"><span>姓名:</span>&nbsp;&nbsp;<span>钟阳山</span></div>
          </div>
          <div class="pic">
            <img src="~@/../static/images/head.png" alt="">
            <div class="name"><span>姓名:</span>&nbsp;&nbsp;<span>钟阳山</span></div>
          </div>
          <div class="pic">
            <img src="~@/../static/images/head.png" alt="">
            <div class="name"><span>姓名:</span>&nbsp;&nbsp;<span>钟阳山</span></div>
          </div>
          <div class="pic">
            <img src="~@/../static/images/head.png" alt="">
            <div class="name"><span>姓名:</span>&nbsp;&nbsp;<span>钟阳山</span></div>
          </div>
          </div>
        </div>
        <div class="link">
          <a href="http://www.bjyouth.gov.cn/"><img src="~@/../static/images/link1.png" alt=""></a>
          <a href="http://www.cvf.org.cn/"><img src="~@/../static/images/link2.png" alt=""></a>
          <a href="http://www.zgzyz.org.cn/"><img src="~@/../static/images/link3.png" alt=""></a>
          <a href="http://www.bjwmb.gov.cn/"><img src="~@/../static/images/link4.png" alt=""></a>
          <a href="http://www.bjshjs.gov.cn/"><img src="~@/../static/images/link5.png" alt=""></a>
          <a href="http://www.beijingyouth.org.cn/"><img src="~@/../static/images/link6.png" alt=""></a>
          <a href="http://www.chinavolunteer.cn/"><img src="~@/../static/images/link7.png" alt=""></a>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          pagination: {
              el: '.swiper-pagination',
            },
          autoplay: true,
          loop : true,
        },
        helpState: true,
        volunteerState: true,
        communityState: true,
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      toDetail(){
        console.log(1215)
        this.$router.push({ name: 'detail' })
      }
    }
  }
</script>
<style lang="scss" scoped>
.container {
        width: 1000px;
        margin: 0 auto;
    .wrap {
        margin-top: 10px;
        img {
            width: 1000px;
            height: 100px;
        }
    }
  .guide {
    margin-top: 10px;
    height: 400px;
    .swipper {
      width: 600px;
      background-color: gray;
      float: left;
      .swipper-img img{
          width: 600px;
          height: 400px;
      }
    }
    .guide-content {
      width: 400px;
      height: 400px;
      float: left;
      .guide-to {
        display: flex;
        width: 360px;
        height: 125px;
        margin:0 20px; 
        padding-left: 20px;
        align-items: center;
        border-radius: 10px;
        img {
          height: 100px;
          width: 110px;
        }
        .guide-option {
          padding-left: 30px;
          color: #fff;
          font-size: 40px
        }
        
      }
      .tohelp {
        background-color: #F87543;
      }
      .help-detail {
        width: 380px;
        display: block;
        padding-top: 10px;
        padding-left: 0;
        box-sizing: border-box;
        background-color: #F87543;
        .option {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .option:hover {
          color: $base-color;
          background: #fff;
        }
      }
      .tovolunteer {
        margin: 10px 20px;
        background-color: #96C933;
      }
      .volunteer-detail {
        display: block;
        width: 380px;
        padding-top: 10px;
        padding-left: 0;
        margin: 10px 20px;
        box-sizing: border-box;
        background-color: #96C933;
        .option {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .option:hover {
          color: $base-color;
          background: #fff;
        }
      }
      .tocommunity {
        background-color: #33B4F4;
      }
      .community-detail {
        width: 380px;
        display: block;
        padding-top: 10px;
        padding-left: 0;
        box-sizing: border-box;
        background-color: #33B4F4;
        .option {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .option:hover {
          color: $base-color;
          background: #fff;
        }
      }
    }
  }
  .info {
    width: 1000px;
    height: 400px;
    margin-top: 10px;
    .volunteer-info {
      width: 480px;
      float: left;
      border-left: 2px solid $base-border-color;
      border-right: 2px solid $base-border-color;
      border-bottom: 2px solid $base-border-color;
      .title {
        height: 40px;
        line-height: 40px;
        background-color: $base-background-color;
        p {
          display: flex;
          padding: 0 5px 0 0;
          justify-content: space-between;
          span:nth-child(1){
            width: 120px;
            height: 38px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            border-top: 2px solid #0088cc;
            background-color: #fff;
          }
          span:nth-child(2){
            font-size: 16px;
          }
        }
      }
      .details {
        margin-top: 10px;
        ul {
          li {
            display: flex;
            height: 26px;
            font-size: 16px;
            align-items: center;
            cursor: pointer;
            &:hover {
              color: rgb(238, 26, 26);
            }
            span:nth-child(1) {
              padding: 0 10px;
            }
            img {
              height: 10px;
              width: 10px;
            }
          }
        }
      }
    }
    .info-left {
      margin-right: 30px;
    }
  }
  .activity {
    height: 90px;
    .pic {
      float: left;
      img {
        height: 90px;
        width: 490px;
      }
    }
    .pic-left {
      margin-right: 20px;
    }
  }
  .excellent {
    width: 1000px;
    height: 210px;
    margin-top: 10px;
    box-sizing: border-box;
    border: 1px solid $base-border-color;
      .title {
        height: 40px;
        line-height: 40px;
        background-color: $base-background-color;
        p {
          display: flex;
          padding: 0 5px 0 0;
          justify-content: space-between;
          span:nth-child(1){
            width: 120px;
            height: 38px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            border-top: 2px solid #0088cc;
            background-color: #fff;
          }
          span:nth-child(2){
            font-size: 16px;
          }
        }
      }
    .icon {
      padding: 10px 10px;
      .pic {
        width: 120px;
        height: 150px;
        float: left;
        margin-right: 10px;
        border-radius: 5px;
        img {
          width: 120px;
          height: 110px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
        .name {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          text-align: center;
          color: #676060;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          border: 1px solid $base-border-color;
        }
      }
    }
  }
  .link {
    display: flex;
    width: 1000px;
    height: 70px;
    margin-top: 10px;
    border: 1px solid $base-border-color;
    align-items: center;
    justify-content: space-around;
    img {
      width: 120px;
      height: 50px;
    }
  }
}
</style>

