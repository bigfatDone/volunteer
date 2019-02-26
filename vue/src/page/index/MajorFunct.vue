<template>
  <div class="major-function clearfix">
    <!-- 数据地图 -->
    <div class="data-modu clearfix">
      <div class="child-table" v-if="isTable">
        <div class="child-table-hd">{{this.mapData.name}}益农信息社实时申报数据</div>
        <div class="child-table-tz">
          <ul>
            <li class="tz-list">
              <p>{{this.mapData.name}}2018年益农信息社申报任务数：{{totalData.totalNum}}</p>
              <p>（{{this.mapData.name}}总任务的40%）</p>
            </li>
            <li class="tz-list">
              <p>{{this.mapData.name}}经县级认定并市级备案实时数据：{{totalData.checkNum}}</p>
            </li>
          </ul>
        </div>
        <div class="child-table-bd">
          <ul class="table-theader">
            <li class="table-tr clearfix">
              <div class="table-th">地市<br/>名称</div>
              <div class="table-th">2018年各地市申报任务数（各地市总任务的40%）</div>
              <div class="table-th">经县级认定并市级备案实时数据</div>
            </li>
          </ul>
          <div class="table-tbody" v-if="childData.length">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide 
                v-for="(item, index) in childData"
                :key="index"
                class="table-tr">
                <div class="clearfix">
                  <div class="table-td yn-text-ellipsis">{{item.name}}</div>
                  <div class="table-td">{{item.num_task}}</div>
                  <div class="table-td">{{item.acceptance_quantity_num}}</div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div class="data-map">
        <indexMap @childValue="getMapValue"></indexMap>
      </div>
      <router-link
        :to="{
          path: '/dataCount',
          query: {
            name: this.mapData.name,
            id: this.mapData.id,
            grade: this.mapData.grade,
            nameAll: this.mapData.nameAll
          }
        }"
        target="_blank"
        class="jump-btn">
        数据中心
      </router-link>
    </div>

    <!-- 申报审核 -->
    <div class="apple-examine">
      <div class="item-cont apple-item">
        <div class="title-name">益农信息社申报</div>
        <div class="sub-text">已提交申请可查看审核状态</div>
        <router-link to="/form/clubLogin" class="item-btn">立即查看</router-link>
      </div>
      <div class="item-cont examine-item">
        <div class="title-name">市县农业局审核</div>
        <div class="sub-text">进入管理后台审核益农社申请</div>
        <a
          :href="this.customConfig.baseUrl + '/login_toLogin'"
          target="_blank"
          class="item-btn">
          立即查看
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getTotalData } from '@/api/data'
import indexMap from "@/page/map/IndexMap";

export default {
  components: {
    indexMap,
  },
  data() {
    return {
      // 站点信息
      siteData: {},
      // 地图数据
      mapData: {
        id: "",
        name: "",
        grade: 1,
        nameAll: ""
      },
      totalData: {
        totalNum: 0,
        checkNum: 0
      },
      // 数据列表
      isTable: true,
      childData: [],
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
      }
    };
  },
  mounted() {
    this.getSiteData()
  },
  methods: {
    // 获取当前站点信息
    getSiteData() {
      this.siteData = this.$store.state.siteData
      if(this.siteData.grade == 3) {
        this.mapData.id = this.siteData.parentId
        this.mapData.name = this.siteData.parentName
        this.mapData.grade = this.siteData.grade - 1
        this.mapData.nameAll = ''
      } else {
        this.mapData.id = this.siteData.pid;
        this.mapData.name = this.siteData.name;
        this.mapData.grade = this.siteData.grade;
        this.mapData.nameAll = "";
      }
      this.getAreaData()
    },
    // 获取地图信息
    getMapValue(val) {
      this.mapData = val
      this.isTable = false
      this.getAreaData()
    },
    // 获取当前区域的数据
    getAreaData() {
      getTotalData({ xzqyId: this.mapData.id }).then(res => {
        if(res.success) {
          this.totalData.totalNum = res.returnMap.num_task
          this.totalData.checkNum = res.returnMap.acceptance_quantity_num
          this.childData = res.returnMap.childData
          this.isTable = true
        }
      })
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }
};
</script>

<style lang="scss" scoped>
/* 主要功能 */
.major-function {
  margin-bottom: 30px;
  height: 440px;

  /* 数据地图 */
  .data-modu {
    width: 840px;
    height: 100%;
    background: #fff;
    padding-left: 20px;
    box-sizing: border-box;
    position: relative;
    float: left;
    .child-table {
      width: 320px;
      border: 1px solid $base-border-color;
      margin-top: 20px;
      box-sizing: border-box;
      float: left;
      .child-table-hd {
        font-size: 17px;
        color: #129F3B;
        line-height: 1;
        padding: 10px;
        overflow: hidden;
      }
      .child-table-tz {
        font-size: 13px;
        color: #333;
        line-height: 20px;
        border-top: 1px solid $base-border-color;
        padding: 8px;
        .tz-list {
          padding-left: 14px;
          margin-bottom: 4px;
          position: relative;
          &:after {
            content: '';
            width: 6px;
            height: 6px;
            background: $base-color;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 7px;
          }
          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
        }
      }
      .child-table-bd {
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
          background: #6FC068;
          .table-th {
            font-size: 12px;
            line-height: 16px;
            color: #fff;
            margin: 4px 0;
          }
        }
        .table-tbody {
          width: 100%;
          height: 238px;
          overflow-y: hidden;
          .table-tr {
            height: 34px;
            font-size: 16px;
            line-height: 34px;
            border-bottom: 1px dashed #f3f3f3;
            box-sizing: border-box;
          }
        }

      }
    }
    .data-map {
      float: right;
    }
    .jump-btn {
      width: 144px;
      height: 44px;
      font-size: 20px;
      color: #fff;
      line-height: 44px;
      text-align: center;
      background: $base-orange;
      display: block;
      position: absolute;
      right: 16px;
      bottom: 20px;
      z-index: 1;
    }
  }

  /* 申报审核 */
  .apple-examine {
    width: 345px;
    height: 100%;
    margin-left: 15px;
    float: left;
    .item-cont {
      height: 215px;
      color: #fff;
      text-align: center;
      background: $base-color;
      padding: 30px 20px;
      box-sizing: border-box;
      &.apple-item {
        background: $base-orange;
        margin-bottom: 10px;
      }
      .title-name {
        font-size: 32px;
        line-height: 40px;
        padding-top: 14px;
      }
      .sub-text {
        font-size: 20px;
        color: #f1f1f1;
        line-height: 24px;
        padding-top: 6px;
      }
      .item-btn {
        width: 130px;
        height: 28px;
        font-size: 18px;
        color: #f06600;
        line-height: 28px;
        background: #fff;
        margin: 30px auto 0;
        display: block;
      }
    }
  }
}
// 设置高度解决轮播问题
.swiper-container-autoheight, 
.swiper-container-autoheight .swiper-slide {
  height: 238px;
}
</style>
<style lang="scss">
.loginDialog {
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
