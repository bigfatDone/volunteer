<template>
  <div class="child-table-wrapper">
    <div class="child-table">
      <div class="child-table-hd">{{this.$route.query.name}}益农信息社实时申报数据</div>
      <div class="child-table-bd">
        <ul class="table-theader">
          <li class="table-tr clearfix">
            <div class="table-th">地市<br/>名称</div>
            <div class="table-th">
              <p>2018年各地市申报任务数</p> 
              <p>（各地市总任务的40%）</p>  
            </div>
            <div class="table-th">经县级认定并市级备案实时数据</div>
          </li>
        </ul>
        <div class="table-tbody" v-if="parentData.length">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide 
              v-for="(item, index) in parentData"
              :key="index"
              class="table-tr">
              <div class="clearfix">
                <div class="table-td yn-text-ellipsis">{{item.name}}</div>
                <div class="table-td">{{item.num_task}}</div>
                <!-- <div class="table-td blue-text">{{item.over_num_task}}</div> -->
                <div class="table-td blue-text">{{item.acceptance_quantity_num}}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['parentData'],
  data() {
    return {
      swiperOption: {
        // 所有的参数同swiper官方api参数
        direction : 'vertical',
        slidesPerView: 'auto',
        speed: 400, // 轮播速度
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        autoHeight:true,      // 解决垂直滚动
        observer: true,       // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      },
    }
  },
  filters: {
    // 根据地区等级返回对应的名称
    gradeFil(value) {
      if(value == 1) return '市'
      if(value == 2) return '区(县)'
      if(value == 3) return '街道(镇)'
      if(value == 4) return '村(居)'
      if(value == 5) return ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.child-table-wrapper {
  .child-table {
    width: 360px;
    margin: 22px auto 0;
    .child-table-hd {
      font-size: 22px;
      line-height: 24px;
    }
    .child-table-bd {
      margin-top: 16px;
      .table-tr {
        .table-th,
        .table-td {
          width: 25%;
          text-align: center;
          float: left;
          &:nth-of-type(2) {
            width: 45%;
          }
          &:nth-of-type(3) {
            width: 30%;
          }
        }
      }
      .table-theader {
        background: rgba(255, 255, 255, .15);
        margin-bottom: 4px;
        .table-th {
          font-size: 14px;
          line-height: 20px;
          color: #fff;
          margin: 4px 0;
        }
      }
      .table-tbody {
        width: 100%;
        height: 400px;
        overflow-y: hidden;
        .table-tr {
          height: 40px;
          font-size: 18px;
          line-height: 40px;
          &:nth-of-type(2n) {
            background: rgba(255, 255, 255, .08);
          }
        }
        .blue-text {
          color: #00E7E8;
        }
      }
      
    }
  }
}

// 设置高度解决轮播问题
.swiper-container-autoheight, 
.swiper-container-autoheight .swiper-slide {
  height: 400px;
}
</style>
