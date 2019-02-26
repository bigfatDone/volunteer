<template>
  <div class="header-main">
    <div class="header-content">
      <div class="w1200 clearfix">
        <router-link class="logo" to="/index">
          <img src="@/../static/images/header-logo.png" alt="">
        </router-link>
        <router-link class="yn-goindex-btn" to="/index">
          <i></i>
          <span>返回官网首页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/scss/header";
.header-main {
  border-bottom: 2px solid $base-color;
  .yn-goindex-btn {
    margin-top: 13px;
    float: right;
  }
}
</style>
