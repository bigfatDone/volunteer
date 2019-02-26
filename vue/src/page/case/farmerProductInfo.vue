<template>
  <div class="publicServiceInfo">
    <div class="w1200">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <span class='tips'>当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/superiorProducts' }">粤农优品</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/superiorProducts', query: {id: typeId}}">{{ type }}</el-breadcrumb-item>
          <el-breadcrumb-item>正文</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <div class="title">
          <h1>{{ dataInfo.title }}</h1>
        </div>
        <div class="extra">
          <div class="time">发布时间：{{ dataInfo.creat_time }}</div>
          <div class="source">信息来源：{{ dataInfo.creatuser }}</div>
        </div>
        <div class="cutRule"></div>
        <div v-html="dataInfo.content" class="mainContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsNewsDetail } from "@/api/base/farmerProductInfo";
export default {
  data() {
    return {
      dataInfo: [],
      type: '',
      typeId: '',
    };
  },
  methods: {
    getData(id) {
      getGoodsNewsDetail({
        goodsNewsId: id
      }).then(res => {
        if (res.success) {
          this.dataInfo = res.returnMap;
          this.type = res.returnMap.type_name;
          this.typeId = res.returnMap.type_id;
        }
      });
    }
  },
  mounted() {
    this.getData(this.$route.query.id);
  }
};
</script>

<style lang="scss" scoped>
.w1200 {
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);

  .breadcrumb {
    font-size: 16px;
    line-height: 28px;
    margin: 22px 0 25px 0;
    vertical-align: middle;
    .el-breadcrumb {
      font-size: 16px;
      line-height: 28px;
      display: inline-block;
      .tips {
        font-weight: bold;
        margin-right: 4px;
        float: left;
      }
    }
  }

  .content {
    border: 1px solid rgba(237, 237, 237, 1);
    margin: 25px 0 90px 0;
    .title {
      margin: 23px 0 23px 0;
      text-align: center;
      h1 {
        height: 28px;
        width: 1024px;
        font-size: 32px;
        color: rgba(51, 51, 51, 1);
        line-height: 38px;
        display: inline-block;
      }
    }
    .extra {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      margin: 0 auto 24px;
      display: table;

      .time,
      .source {
        height: 13px;
        line-height: 13px;
        display: inline-block;
        margin: 0 39px;
      }
    }
    .cutRule {
      width: 1040px;
      height: 1px;
      background: rgba(237, 237, 237, 1);
      margin: 24px auto 40px;
    }
    .mainContent {
      font-size: 16px;
      line-height: 24px;
      margin: 40px 108px 65px 100px;
    }
  }
}
</style>
<style lang="sass">
.w1200 .content .mainContent p {
  margin-bottom: 24px;
}
</style>




