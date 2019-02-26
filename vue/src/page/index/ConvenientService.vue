<template>
  <div class="convenient-service yn-index-item">
    <div class="yn-item-title">
      <div class="title-left">
        <p class="title-name">便民服务</p>
      </div>
      <div class="title-right">
        <router-link to="/convenientService" class="more-btn">更多>></router-link>
      </div>
    </div>
    <div class="convenient-content">
      <div class="clearfix">
        <a
          v-for="(item, index) in convenientList"
          :key="index"
          :href="item.routerLink"
          target="_blank"
          class="conven-item">
          <div class="conven-icon">
            <img :src="item.img" alt="">
          </div>
          <div class="conven-name">{{item.name}}</div>
        </a>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      // 便民服务
      convenientList: [
        { 
          name: '购物商城', 
          img: '@/../static/images/fun-icon01.png', 
          routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/lnypMall/MallHome.html?fromMall=1&channelcode=yinong' 
        },
        { 
          name: '物流快递', 
          img: '@/../static/images/fun-icon02.png', 
          routerLink: this.customConfig.baseUrl + '/#/otms/otmsSearch' 
        },
        { 
          name: '违章查询', 
          img: '@/../static/images/fun-icon03.png', 
          routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=122' 
        },
        { 
          name: '健康保险', 
          img: '@/../static/images/fun-icon04.png', 
          routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=93' 
        },
        { 
          name: '司法查询', 
          img: '@/../static/images/fun-icon05.png', 
          routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=68' 
        },
        { 
          name: '购药平台', 
          img: '@/../static/images/fun-icon06.png', 
          routerLink: this.customConfig.baseUrl + '/#/kadShop/kadIndex' 
        },
        { 
          name: '车辆年检', 
          img: '@/../static/images/fun-icon07.png', 
          routerLink: 'https://lnyph5.vpclub.cn/lnyp/templates/yinong/yinong.html?channelcode=yinong&aid=125' 
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/* 便民服务 */
.convenient-service {
  .convenient-content {
    padding: 15px;
    .conven-item {
      width: 196px;
      height: 150px;
      border: 1px dashed $base-border-color;
      margin: -1px 0 0 -1px;
      box-sizing: border-box;
      float: left;
      .conven-icon {
        width: 80px;
        height: 80px;
        margin: 14px auto 0;
      }
      .conven-name {
        font-size: 18px;
        color: #333;
        text-align: center;
        margin-top: 6px;
      }
    }
  }
}
</style>
