<template>
  <div class="content-modu">
    <div class="w1200">
      <div class="payment-modu">
        <div class="title-box">
          <i class="title-icon"></i>
          <span class="title-text">支付成功，等待益农社检测！</span>
        </div>
        <div class="content-box">
            <div>
                <span>订单编号：</span>
                <span>{{orderNum}}</span>
            </div>
            <div>
                <span>预约时间：</span>
                <span>{{appointTime}}</span>
            </div>
            <div>
                <span>检测级别：</span>
                <span>{{typeLevel}}</span>
            </div>
        </div>
        <div class="check-button">
            <router-link to="/center/record" class="check-record">查看检测记录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNum: '',
      appointTime: '',
      typeLevel: ''
    }
  },
  mounted(){
    this.orderNum = this.$route.query.orderNum
    this.appointTime = this.$route.query.appointTime
    this.typeLevel = this.$route.query.typeLevel
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.content-modu {
  .payment-modu {
    width: 860px;
    margin: 0 auto 70px;
    .title-box {
      font-size: 24px;
      color: #333;
      text-align: center;
      margin: 60px auto 30px auto;
      .title-icon {
        width: 60px;
        height: 60px;
        vertical-align: middle;
        background: url(/static/img/old/type-icon01.png) center center no-repeat;
        background-size: 100%;
        margin-right: 10px;
        display: inline-block;
      }
      .title-text {
          font-size:28px;
          font-weight:bold;
      }
    }
    .content-box {
        width: 400px;
        margin-left: 34%;
        div{
            margin-bottom:10px;
        }
    }
    .check-button {
        margin-left: 34%;
        margin-top: 50px;
        margin-bottom: 270px;
        width: 160px;
        height: 46px;
        font-size: 16px;
        color: #fff;
        line-height: 46px;
        text-align: center;
        background: #1591CF;
        border-radius: 4px;
        display: block;
        .check-record{
            color:white;
        }
    }

  }
}
</style>
