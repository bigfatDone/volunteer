<template>
  <div class="data-center-wrapper">
    <div class="data-center-hd">
      <div class="data-hd-title">{{this.indexData.name}}进村入户工程大数据中心</div>
      <div class="data-hd-tag">
        <div class="tag-name">上线试运营</div>
      </div>
    </div>
    <div class="data-center-bd clearfix">

      <!-- 项目商品统计 -->
      <div class="total-lf">
        <!-- 项目统计表 -->
        <div class="project-data">
          <ul>
            <li 
              v-for="item in projectList"
              :key="item.id"
              class="project-list">
              <p class="list-name">{{item.name}}</p>
              <p class="list-value">{{item.num}}</p>
            </li>
          </ul>
        </div>
        <!-- 订单成交额 -->
        <div class="order-data">
          <div class="order-centent clearfix">
            <p class="order-name">订单成交额</p>
            <p class="order-pirce">
              ¥
              <span class="pirce-num">{{orderTotalSum}}</span>
            </p>
          </div>
        </div>
        <!-- 商品统计表 -->
        <div class="comm-data">
          <div class="comm-hd">
            <span class="hd-name">商品总数：</span>
            <span class="hd-value">0件</span>
          </div>
          <div class="comm-chart">
            <commChart></commChart>
          </div>
        </div>
      </div>

      <!-- 地区统计和地图 -->
      <div class="total-ct">
        <!-- 地区统计 -->
        <!-- <div class="total-data">
          <div class="total-hd clearfix">
            <span class="yn-fl">全{{this.indexData.grade | gradeFil}}申报数据</span>
            <i class="chart-icon"></i>
          </div>
          <div class="total-bd clearfix">
            <div class="main-num">
              <ul class="clearfix">
                <li 
                  v-for="(item, index) in mainNum"
                  :key="index"
                  class="num-item">
                  <span class="num-text">{{item}}</span>
                </li>
              </ul>
            </div>
            <ul class="main-total clearfix">
              <li class="total-item task-item">
                <p class="item-name">总任务量</p>
                <p class="item-num">
                  <span class="num">{{totalData.totalNum}}</span>
                </p>
              </li>
              <li class="total-item complete-item">
                <p class="item-name">县级认定</p>
                <p class="item-num">
                  <span class="num">{{totalData.completeNum}}</span>
                  <span class="percent">{{totalData.completeNum | percentFil(totalData.totalNum)}}</span>
                </p>
              </li>
              <li class="total-item check-item">
                <p class="item-name">市级备案</p>
                <p class="item-num">
                  <span class="num">{{totalData.checkNum}}</span>
                  <span class="percent">{{totalData.checkNum | percentFil(totalData.totalNum)}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div> -->
        <div class="total-data">
          <div class="total-data-lf clearfix">
            <div class="total-item-name">
              <p>{{this.indexData.name}}2018年益农信息社申报任务数</p>
              <p>（{{this.indexData.name}}总任务的40%）</p>
            </div>
            <div class="total-item-value">
              <ul class="clearfix">
                <li 
                  v-for="(item, index) in mainNum"
                  :key="index"
                  class="num-item">
                  <span class="num-text">{{item}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="total-data-rg">
            <p class="item-name">{{this.indexData.name}}经县级认定并市级备案实时数据</p>
            <p class="item-num">
              <span class="num">{{totalData.checkNum}}</span>
              <span class="percent">{{totalData.checkNum | percentFil(totalData.totalNum)}}</span>
            </p>
          </div>
        </div>

        <!-- 地图 -->
        <div class="map-chart">
          <dataMap :width="974" :height="752" :target-city="siteName"></dataMap>
        </div>
      </div>

      <!-- 益农社和下级统计 -->
      <div class="total-rg">
        <!-- 益农社统计 -->
        <div class="club-data">
          <ul class="clearfix">
            <li class="club-item">
              <div class="item-chart">
                <ringChart :ring-data="clubData[0]"></ringChart>
              </div>
              <div class="item-info">
                <p>标准社{{clubData[0].num}}</p>
                <p>（A类社）</p>
              </div>
            </li>
            <li class="club-item">
              <div class="item-chart">
                <ringChart :ring-data="clubData[1]"></ringChart>
              </div>
              <div class="item-info">
                <p>运营社{{clubData[1].num}}</p>
                <p>（B类社）</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 下级统计 -->
        <div class="child-data">
          <subTable :parentData = "childData"></subTable>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import dataMap from '@/page/map/DataMap'
import commChart from './dataCount/CommChart'
import ringChart from './dataCount/RingChart'
import subTable from './dataCount/SubTable'
import { getTotalData } from '@/api/data'

export default {
  components: {
    dataMap,
    commChart,
    ringChart,
    subTable
  },
  data() {
    return {
      indexData: {
        id: '',
        name: '',
        grade: '',
        nameAll: ''
      },
      siteName: this.$route.query.name == '广东省' ? '广州市' : this.$route.query.name,

      // 项目统计表
      projectList: [
        {
          id: 1,
          name: '公益服务数量',
          num: 0
        },
        {
          id: 2,
          name: '便民服务数量',
          num: 0
        },
        {
          id: 3,
          name: '网站点击量',
          num: 0
        },
        {
          id: 4,
          name: '入驻服务商数量',
          num: 0
        },
        {
          id: 5,
          name: '入驻供应商数量',
          num: 0
        },
        {
          id: 6,
          name: '入驻商品数量',
          num: 0
        },
        {
          id: 7,
          name: '12316拨打数量',
          num: 0
        },
        {
          id: 8,
          name: '视频数量',
          num: 0
        },
        {
          id: 9,
          name: '专家解答数量',
          num: 0
        }
      ],

      // 订单成交额
      orderTotalSum: 0,

      // 地区统计
      mainNum: [0, 0, 0, 0],
      totalData: {
        totalNum: 0,
        completeNum: 0,
        checkNum: 0
      },

      // 益农社统计
      clubData: [
        { type: 1, num: '', idName: 'ringChartA', color: '#5deca6', aTotal: '', bTotal: '' },
        { type: 2, num: '', idName: 'ringChartB', color: '#e0ba0e', aTotal: '', bTotal: '' },
      ],

      // 下级统计
      childData: []
    }
  },
  mounted() {
    this.getRouteData()
  },
  filters: {
    // 根据地区等级返回对应的名称
    gradeFil(value) {
      if(value == 1) return '省'
      if(value == 2) return '市'
      if(value == 3) return '区(县)'
      if(value == 4) return '街道(镇)'
      if(value == 5) return '村(居)'
    },

    // 地区统计百分比计算
    percentFil(a, b) {
      if(a>0 && b>0) {
        let num =  a / b
        let percent = Number(num*100).toFixed(2)
        return percent + '%'
      } else {
        return '0%'
      }
    }
  },
  methods: {
    // 获取路由信息
    getRouteData() {
      this.indexData = Object.assign({}, this.indexData, this.$route.query)
      this.getAllData(this.$route.query.id)
    }, 

    // 根据id获取区域所有数据
    getAllData(id) {
      getTotalData({ xzqyId: id }).then(res => {
        console.log(res)
        if(res.success) {
          // 获取项目统计表数据
          let projectData = []
          projectData[0] = res.returnMap.public_service_num
          projectData[1] = res.returnMap.convenient_service_num
          projectData[2] = res.returnMap.click_num
          projectData[3] = res.returnMap.service_provider_num
          projectData[4] = res.returnMap.supplier
          projectData[5] = res.returnMap.goods_num
          projectData[6] = res.returnMap.num_12316
          projectData[7] = res.returnMap.video_num
          projectData[8] = res.returnMap.expert_answers_num
          for(let i=0; i<this.projectList.length; i++) {
            this.projectList[i].num = projectData[i]
          }
          // 获取地区统计数据
          this.totalData.totalNum = res.returnMap.num_task
          this.totalData.completeNum = res.returnMap.over_num_task
          this.totalData.checkNum = res.returnMap.acceptance_quantity_num
          this.mainNum = this.totalData.totalNum.toString().split('')
          // 获取下级统计数据
          for(let i=0; i<this.clubData.length; i++) {
            this.clubData[i].aTotal = res.returnMap.a_community
            this.clubData[i].bTotal = res.returnMap.b_community
            if(this.clubData[i].type == 1) {
              this.clubData[i].num = this.clubData[i].aTotal
            }
            if(this.clubData[i].type == 2) {
              this.clubData[i].num = this.clubData[i].bTotal
            }
          }
          // 获取下级统计数据
          this.childData = res.returnMap.childData
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.data-center-wrapper {
  width: 1920px;
  height: 1080px;
  color: #fff;
  background: url('~@/../static/images/data-center/bg-min.jpg');
  margin: 0 auto;
  overflow-x: hidden;
  .data-center-hd {
    width: 100%;
    height: 107px;
    background: url('~@/../static/images/data-center/head-bg.png') center top no-repeat;
    background-size: 100%;
    position: relative;
    .data-hd-title {
      width: 690px;
      font-size: 38px;
      text-align: center;
      line-height: 40px;
      padding: 16px 0;
      margin: 0 auto;
    }
    .data-hd-tag {
      width: 280px;
      height: 58px;
      background: url('~@/../static/images/data-center/sub-bg.png') left top no-repeat;
      position: absolute;
      left: 0;
      bottom: 0;
      .tag-name {
        width: 240px;
        font-size: 30px;
        line-height: 38px;
        text-align: center;
        padding: 10px 0;
      }
    }
  }
  .data-center-bd {
    font-size: 20px;
    line-height: 24px;
    padding: 20px 36px;

    /* 项目商品统计 */
    .total-lf {
      width: 390px;
      float: left;
      /* 项目统计表 */
      .project-data {
        height: 431px;
        background: url('~@/../static/images/data-center/item-bg01.png') no-repeat;
        padding: 30px 60px 30px 40px;
        box-sizing: border-box;
        .project-list {
          padding: 8px 0 8px 32px;
          position: relative;
          overflow: hidden;
          &:after {
            content: "";
            width: 16px;
            height: 16px;
            background: url('~@/../static/images/data-center/spot.png');
            background-size: 100%;
            border-radius: 50%;
            margin-top: -8px;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 50%;
          }
          .list-name {
            width: 180px;
            float: left;
          }
          .list-value {
            float: right;
          }
        }
      }

      /* 订单成交额 */
      .order-data {
        height: 111px;
        background: url('~@/../static/images/data-center/item-bg02.png') no-repeat;
        margin-top: 7px;
        .order-centent {
          line-height: 26px;
          padding: 42px 33px;
          .order-name {
            width: 40%;
            float: left;
          }
          .order-pirce {
            width: 50%;
            color: #FFDB06;
            text-align: right;
            float: right;
            .pirce-num {
              font-size: 30px;
            }
          }
        }
      }

      /* 商品统计表 */
      .comm-data {
        margin-top: 10px;
        .comm-hd {
          line-height: 30px;
          padding: 2px 8px;
          .hd-value {
            font-size: 28px;
            color: #00E7E8;
          }
        }
        .comm-chart {
          height: 322px;
          background: url('~@/../static/images/data-center/item-bg03.png') no-repeat;
          margin-top: 5px;
        }
      }
    }

    /* 地区统计和地图 */
    .total-ct {
      width: 1020px;
      margin-left: 13px;
      float: left;
      /* 地区统计 */
      .total-data {
        height: 120px;
        padding-top: 28px;
        box-sizing: border-box;
        // .total-hd {
        //   font-size: 22px;
        //   line-height: 26px;
        //   padding-left: 67px;
        //   .chart-icon {
        //     width: 26px;
        //     height: 26px;
        //     background: url('~@/../static/images/data-center/chart-icon01.png') no-repeat;
        //     margin-left: 10px;
        //     float: left;
        //   }
        // }
        // .total-bd {
        //   margin-top: 16px;
        //   .main-num {
        //     width: 370px;
        //     height: 67px;
        //     margin-left: 44px;
        //     float: left;
        //     .num-item {
        //       width: 45px;
        //       height: 68px;
        //       font-size: 60px;
        //       font-family: Helvetica;
        //       color: #00E7E8;
        //       line-height: 68px;
        //       text-align: center;
        //       background: #1D2454;
        //       margin-right: 10px;
        //       float: left;
        //       .num-text {
        //         color: #02c7ea;
        //       }
        //     }
        //   }
        //   .main-total {
        //     padding-top: 6px;
        //     float: left;
        //     .total-item {
        //       margin-right: 100px;
        //       float: left;
        //       .item-name {
        //         font-size: 18px;
        //         color: #777BBD;
        //         line-height: 20px;
        //       }
        //       .item-num {
        //         font-size: 32px;
        //         color: #4FC2FF;
        //         line-height: 20px;
        //         margin-top: 14px;
        //         .percent {
        //           font-size: 15px;
        //         }
        //       }
        //       &.complete-item {
        //         .item-num {
        //           color: #14F0E3;
        //         }
        //       }
        //       &.check-item {
        //         margin-right: 0;
        //         .item-num {
        //           color: #FFDB06;
        //         }
        //       }
        //     }
        //   }
        // }
        /* 新版 */
        .total-data-lf {
          float: left;
          .total-item-name {
            font-size: 18px;
            line-height: 30px;
            padding-left: 70px;
            margin-top: 4px;
            float: left;
            position: relative;
            &::after {
              content: '';
              width: 36px;
              height: 36px;
              background: url('~@/../static/images/data-center/chart-icon02.png') no-repeat;
              margin-top: -18px;
              position: absolute;
              left: 15px;
              top: 50%;
            }
          }
          .total-item-value {
            margin-left: 20px;
            float: left;
            .num-item {
              width: 45px;
              height: 68px;
              font-size: 60px;
              font-family: Helvetica;
              color: #00E7E8;
              line-height: 68px;
              text-align: center;
              background: #1D2454;
              margin-right: 10px;
              float: left;
              .num-text {
                color: #02c7ea;
              }
            }
          }
        }
        .total-data-rg {
          float: right;
          .item-name {
            font-size: 18px;
            color: #777BBD;
            line-height: 20px;
          }
          .item-num {
            font-size: 34px;
            color: #FFDB06;
            line-height: 20px;
            margin-top: 20px;
            .percent {
              font-size: 15px;
            }
          }
        }
      }

      /* 地图 */
      .map-chart {
        height: 803px;
        padding: 24px;
        background: url('~@/../static/images/data-center/item-bg04.png') no-repeat;
        box-sizing: border-box;
      }
    }

    /* 益农社和下级统计 */
    .total-rg {
      width: 409px;
      float: right;
      /* 益农社统计 */
      .club-data {
        height: 272px;
        margin-top: 120px;
        .club-item {
          width: 50%;
          padding: 0 20px;
          box-sizing: border-box;
          float: left;
          .item-chart {
            width: 160px;
            height: 160px;
            margin: 0 auto;
          }
          .item-info {
            font-size: 20px;
            line-height: 32px;
            text-align: center;
            margin-top: 12px;
          }
        }
      }
      /* 下级统计 */
      .child-data {
        height: 531px;
        background: url('~@/../static/images/data-center/item-bg05.png') no-repeat;
        overflow: hidden;
      }
    }
  }
}
</style>
