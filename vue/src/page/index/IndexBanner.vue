<template>
  <div class="banner-modu yn-index-item">
    <div class="banner-show">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide>
          <router-link to="/form/clubLogin" class="banner-list">
            <img src="@/../static/images/banner-03.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide>
          <router-link to="/ynongClub" class="banner-list">
            <img src="@/../static/images/banner-02.jpg" alt="">
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        loop: true, // 循环轮播
        autoplay: true, // 自动轮播
        speed: 600, // 轮播速度
        delay: 4000, // 自动切换的时间间隔
        autoplay: {
          disableOnInteraction: false
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
/* banner模块 */
.banner-modu {
  padding-left: 250px;
  box-sizing: border-box;
  .banner-show {
    width: 100%;
    height: 600px;
    overflow: hidden;
    .banner-list {
      display: block;
    }
  }
}
</style>
