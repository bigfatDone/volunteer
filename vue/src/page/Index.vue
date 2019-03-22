<template>
    <div class="container">
        <div class="wrap">
            <img src="~@/../static/images/bar.jpg" alt="">
        </div>
        <div class="wrap">
            <div class="swipper">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/bar.jpg" alt=""></swiper-slide>
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/bar.jpg" alt=""></swiper-slide>
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/bar.jpg" alt=""></swiper-slide>
                    <swiper-slide class="swipper-img"><img src="~@/../static/images/bar.jpg" alt=""></swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          autoplay: true,
          loop : true,
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
<style lang="scss" scoped>
.container {
        width: 1000px;
        margin: 0 auto;
    .wrap {
        margin-top: 10px;
        height: 100px;
        background-color: gray;
        img {
            width: 1000px;
            height: 100px;
        }
    }
    .swipper {
        width: 700px;
        margin-top: 10px;
        background-color: gray;
        .swipper-img img{
            width: 700px;
            height: 400px;
        }
    }
}
</style>

