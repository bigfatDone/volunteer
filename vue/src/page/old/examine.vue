<template>
  <div class="whole">
    <div class="line"></div>
    <div class="page">
      <div class="content">
        <img src="@/../static/img/old/shijian.png" class="img">
        <span>已提交认证，等待审核...</span>
        <div class="person-center" @click="toPersonCenter">个人中心</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wxUser:'',
      name: '',
      id: ''
    };
  },
  methods: {
    // 获得属性
    getWxUser(){
      this.wxUser = this.$store.state.entrustData
      this.name = this.wxUser.wxName
      this.id = this.wxUser.wxId 
    },
    toPersonCenter() {
      // 跳转到个人中心
      this.$router.push({
        name: "account-msg"
      });
    }
  },
  mounted(){
    this.getWxUser();
  }
};
</script>


<style lang="scss" scoped>
.whole {
  width: 100%;
  .line {
    width: 100%;
    height: 4px;
    background-color: #00a8c6;
  }
  .page {
    max-width: 1920px;
    margin: 0 auto;
    padding-top: 100px;
    min-width: 1200px;
    .content {
      width: 600px;
      margin: 0 auto;
      line-height: 90px;
      height: 520px;
      .img {
        width: 60px;
        height: 60px;
        padding: 10px;
        float: left;
      }
      span {
        line-height: 90px;
        font-size: 28px;
        font-weight: 200;
        font-family: Adobe Heiti Std R;
        font-weight: bold;
        color: rgba(58, 58, 58, 1);
      }
      .person-center {
        display: block;
        width: 110px;
        background: #1A992F;
        color: #fff;
        line-height: 34px;
        border-radius: 10px;
        margin-left: 80px;
        margin-top: 50px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>

