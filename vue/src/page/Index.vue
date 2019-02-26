<template>
  <div class="index-wrapper">
    <div class="w1200">
      <!-- banner模块 -->
      <banner></banner>
      <!-- 主要功能 -->
      <majorFunct></majorFunct>
      <!-- 绿色通道 -->
      <greenChannel></greenChannel>
      <!-- 新闻公告 -->
      <noticeNews></noticeNews>
      <!-- 公益服务 -->
      <publicService></publicService>
      <!-- 便民服务 -->
      <convenientService></convenientService>
      <!-- 电子商务 -->
      <commerce></commerce>
      <!-- 培训体验服务 -->
      <trainService></trainService>
      <!-- 粤农优品 -->
      <superiorProducts></superiorProducts>
    </div>
  </div>
</template>

<script>
import banner from "./index/IndexBanner"; // 引入banner轮播图组件
import majorFunct from "./index/MajorFunct"; // 引入主要功能组件
import greenChannel from "./index/GreenChannel"; // 引入绿色通道组件
import noticeNews from "./index/NoticeNews"; // 引入新闻公告组件
import publicService from "./index/PublicService"; // 引入公益服务组件
import convenientService from "./index/ConvenientService"; // 引入便民服务组件
import commerce from "./index/CommerceModu"; // 引入电子商务组件
import trainService from "./index/TrainService"; // 引入培训体验服务组件
import superiorProducts from "./index/SuperiorProducts"; // 引入粤农优品组件

export default {
  components: {
    banner,
    majorFunct,
    greenChannel,
    noticeNews,
    publicService,
    convenientService,
    commerce,
    trainService,
    superiorProducts
  }
};
</script>

<style lang="scss" scoped>
.index-wrapper {
  background: #f6f6f6;
  overflow: hidden;
}
</style>
