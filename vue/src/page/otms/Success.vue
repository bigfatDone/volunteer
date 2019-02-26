<template>
  <div class="success-module">
    <div class="w1200 clearfix">
      <div class="position-tips">
        <span @click="toHomePage">首页 ></span>
        <span class="tips-last" @click="toOtmsIndex">物流快递</span> >
        <span class="tips-msg">我要寄件</span>
      </div>
      <div class="contain-main clearfix">
        <div class="succ-content">
          <i class="succ-icon"></i>
          <p class="succ-text">提交订单成功！</p>
        </div>
        <div class="return-btn" @click="toSearchModule">返回首页</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toSearchModule() {
      this.$router.push({ path: "/otms/otmsSearch" });
    },
    toHomePage() {
      this.$router.push("/index");
    },
    toOtmsIndex() {
      this.$router.push("/otms/otmsSearch");
    }
  }
};
</script>
<style lang="scss" scoped>
.success-module {
  .position-tips {
    margin-top: 24px;
    color: #333;
    .tips-last {
      cursor: pointer;
    }
    .tips-msg {
      color: #999;
    }
  }
  .contain-main {
    margin: 110px 400px 0;
    .succ-content {
      min-width: 400px;
      .succ-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        vertical-align: top;
        background: url("~@/../static/img/searchModule/success.png");
      }
      .succ-text {
        display: inline-block;
        margin-left: 41px;
        line-height: 60px;
        font-size: 36px;
        color: #333;
      }
    }
    .return-btn {
      width: 118px;
      padding: 11px 24px;
      margin: 47px auto;
      text-align: center;
      line-height: 28px;
      font-size: 18px;
      color: #fff;
      background: #3a8ce2;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>


