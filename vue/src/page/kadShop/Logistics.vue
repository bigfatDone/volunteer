<template>
  <div class="logisticsQuery">
    <div class="w1200">
      <div class="tag-top">
        <span @click="toPage(1)" class="tag-msg">首页 > </span> 
        <span @click="toPage(2)" class="tag-msg">购药平台 > </span> 
        <span @click="toPage(3)" class="tag-msg">我的订单 > </span>
        <span class="tag-query">物流查询</span>
      </div>
      <div v-for="(logistics, index) in logisticsList" :key="index" class="main-section">
        <div class="package-info">
          <div class="package-title">包裹信息</div>
          <el-row class="package-detail">
            <el-col :span="12">包裹号 : {{logistics.ConsignCode}}</el-col>
            <el-col :span="12">包裹状态 : {{logistics.ConsignStatus}}</el-col>
          </el-row>
        </div>
        <div class="logistics-info">
          <div class="logistics-title">物流信息</div>
          <div class="logistics-detail">
            <el-row class="logistics-base">
              <el-col :span="12">物流公司 : {{logistics.Company}}</el-col>
              <el-col :span="12">快递单号 : {{logistics.FreightNum}}</el-col>
            </el-row>
            <el-row class="logistics-detail-header">
              <el-col :span="12" class="logistics-time-header">时间</el-col>
              <el-col :span="12">描述</el-col>
            </el-row>
            <el-row
              class="logistics-detail-content"
              v-for="(logisticsInfo, index) in logistics.Detail"
              :key="index"
              :class="index%2 === 0 ? 'logistics-detail-content' : 'logistics-detail-content2'"
            >
              <el-col :span="5" class="logistics-time-detail">{{logisticsInfo.Time}}</el-col>
              <el-col :span="12" :offset="6">{{logisticsInfo.Desc}}</el-col>
            </el-row>
          </div>
        </div>
        <div class="goods-info">
          <div class="goods-title">商品信息</div>
          <div class="goods-detail" v-for="(itemInfo, index) in logistics.WareDetail" :key="index">
            <el-row class="goods-base">
              <el-col :span="12">商品编码 : {{itemInfo.WareSkuCode}}</el-col>
              <el-col :span="12">商品名称 : {{itemInfo.WareName}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">订购数量 : {{itemInfo.Qty}}</el-col>
              <el-col :span="12">购买价格 : {{itemInfo.Price}}元</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogisticsInfo } from "@/api/kadShop/logisticsQuery";
export default {
  data() {
    return {
      logisticsList: [], // 整体物流的列表
    };
  },
  mounted() {
    this.getLogisticsDetail();
  },
  methods: {
    toPage(index) {
      if(index==1) {
        this.$router.push({ path: "/index" });
      }
      else if(index==2) {
        this.$router.push({ path: "/kadShop/kadIndex" });
      }
      else {
        this.$router.push({ path: "/kadShop/kadOrder" });
      }
    },
    getLogisticsDetail() {
      getLogisticsInfo({
        orderCode: this.$route.query.orderCode,
        userId: this.$route.query.userid
      }).then(res => {
        if (res.success) {
          this.logisticsList = res.resultList;
        }
      });
    }
  }
};
</script>

<style lang="scss" scop>
.logisticsQuery {
  min-width: 1200px;
  .w1200 {
    .tag-top {
      margin-top: 23px;
      font-size: 16px;
      .tag-msg {
        cursor: pointer;
      }
      .tag-query {
        color: #999999;
      }
    }
    .main-section {
      margin-top: 40px;
      margin-bottom: 80px;
      border: 1px solid rgba(238, 238, 238, 1);
      padding: 40px 40px;
      .package-info {
        padding-bottom: 32px;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        .package-title {
          font-size: 24px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .package-detail {
          margin-top: 40px;
          font-size: 20px;
          color: rgba(51, 51, 51, 1);
        }
      }
      .logistics-info {
        padding-bottom: 32px;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        margin-top: 60px;
        .logistics-title {
          font-size: 24px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .logistics-detail {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          .logistics-base {
            margin-top: 40px;
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
          }
          .logistics-detail-header {
            height: 48px;
            margin-top: 31px;
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            background: rgba(236, 243, 249, 1);
            line-height: 48px;
            .logistics-time-header {
              padding-left: 121px;
            }
          }
          .logistics-detail-content {
            height: 56px;
            padding: 0 20px;
            background: rgba(249, 249, 249, 1);
            line-height: 56px;
            .logistics-time-detail {
              text-align: right;
            }
          }
          .logistics-detail-content2 {
            height: 56px;
            padding: 0 20px;
            background: rgba(255, 255, 255, 1);
            line-height: 56px;
            .logistics-time-detail {
              text-align: right;
            }
          }
        }
      }
      .goods-info {
        margin-top: 60px;
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        .goods-title {
          font-size: 24px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .goods-detail {
          margin-top: 32px;
          .goods-base {
            margin-bottom: 24px;
          }
        }
      }
    }
  }
}
</style>
