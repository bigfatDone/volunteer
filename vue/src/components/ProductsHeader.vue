<template>
  <div class="header-main">
    <div class="w1200 clearfix">
      <div class="header-left">
        <div class="header-login">
          <router-link to='/index'>
            <img src="@/../static/images/shake/head-log.png" alt="">
          </router-link>
        </div>
        <div class="sub-login">
          <router-link to='/superiorProducts' class="sub-login-img">
            <img src="@/../static/images/shake/yn-log.png" alt="">
          </router-link>
        </div>
        <router-link class="yn-goindex-btn" to="/index">
          <i></i>
          <span>返回官网首页</span>
        </router-link>
      </div>
      <div class="header-right">
        <span class="welcome">欢迎您</span>
        <router-link to="" class="link-btn">登录</router-link>
        <span class="ver-line"></span>
        <router-link to="" class="link-btn">免费注册</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-main {
  width: 100%;
  min-width: 1200px;
  height: 70px;
  background: #fff;
  border-bottom: 4px solid #f2f2f2;
  .header-left {
    margin-top: 15px;
    float: left;
    .header-login {
      width: 389px;
      float: left;
    }
    .sub-login {
      border-left: 1px solid #bababa;
      padding-left: 16px;
      margin: 5px 0 0 16px;
      float: left;
      .sub-login-img {
        width: 83px;
      }
    }
    .yn-goindex-btn {
      margin: 5px 0 0 34px;
    }
  }
  .header-right {
    font-size: 15px;
    line-height: 16px;
    margin-top: 25px;
    float: right;
    .welcome {
      color: #000;
      margin-right: 6px;
      float: left;
    }
    .ver-line {
      width: 1px;
      height: 16px;
      background:#ababab;
      float: left;
    }
    .link-btn {
      color: #1F9933;
      margin: 0 10px;
      float: left;
    }
  }
}
</style>
