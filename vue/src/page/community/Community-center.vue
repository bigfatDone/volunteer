<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>社区中心</span>
    </nav>
    <div class="content">
      <aside>
        <router-link to="/community-center/community-msg" class="msg" tag="div">社区信息</router-link>
        <router-link to="/community-center/community-activity" class="msg" tag="div">已发布项目</router-link>
      </aside>
      <router-view class="router"></router-view>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 0 auto 20px;
  nav {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    margin: 10px;
    font-size: 18px;
    border: 1px solid #eee;
    border-radius: 5px;
    span:nth-child(2) {
      font-size: 16px;
      color: $base-color;
      cursor: pointer;
    }
    span:nth-child(3) {
      font-size: 16px;
      // color: $base-color;
      // cursor: pointer;
    }
  }
  .content {
    display: flex;
    width: 800px;
    margin: 0 auto;
    min-height: 600px;
    border: 1px solid #c5e9fb;
    border-radius: 5px;
    aside {
      width: 20%;
      box-sizing: border-box;
      background-color: $base-color;
      .msg {
        height: 40px;
          font-size: 18px;
        text-align: center;
        color: #fff;
        line-height: 40px;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
      }
      .router-link-active {
        color: $base-color;
        background-color: #fff;
      }
    }
    .router {
      width: 80%;
    }
  }
}
</style>



