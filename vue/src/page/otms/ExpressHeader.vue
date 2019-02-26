<template>
  <div class="express-header-modu">
    <div class="w1200">
      <div class="header-tip">
        <span class="home-page-espress" @click="toHomePage">首页 ></span>
        <span class="home-page-espress" @click="toOtmsIndex">快递物流 ></span>
        <span class="send-title">我要寄件</span>
      </div>
      <div class="title-tip">{{title}}</div>
      <div class="title-container">
        <div class="step-modu" v-for="(item, index) in titleList" :key="index">
          <div
            class="step-container"
            :class="acitveStep == index ? 'current-step' : 'step-content'"
          >
            <span class="message-tip">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleList: ["1、寄件人信息", "2、收件人信息", "3、预约信息"],
      title: "我要寄件"
    };
  },
  props: ["acitveStep"],
  methods: {
    // 跳转到首页
    toHomePage() {
      this.$router.push("/index");
    },
    // 跳转到物流首页
    toOtmsIndex() {
      this.$router.push("/otms/otmsSearch");
    }
  }
};
</script>
<style lang="scss" scoped>
.express-header-modu {
  min-width: 1200px;
  width: 100%;
  .w1200 {
    .header-tip {
      margin-top: 24px;
      font-size: 16px;
      .home-page-espress {
        color: #333;
        cursor: pointer;
      }
      .send-title {
        color: #999;
      }
    }
    .title-tip {
      width: 100%;
      margin: 40px 0 48px 0;
      text-align: center;
      font-size: 36px;
    }
    .title-container {
      height: 72px;
      .step-modu {
        width: 900px;
        margin: 0 auto;
        font-size: 26px;
        .step-container {
          float: left;
          width: 300px;
          height: 72px;
          color: #999;
          line-height: 72px;
          text-align: center;
          cursor: pointer;
        }
        .step-content {
          background: url("~@/../static/img/otms/step-gray.png") no-repeat 100%;
        }
        .current-step {
          background: url("~@/../static/img/otms/step-orange.png") no-repeat
            100%;
          color: #fff;
        }
      }
    }
  }
}
</style>


