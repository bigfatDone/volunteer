<template>
  <div class="farmerProducts">
    <div class="imgTop">
      <div class="toSearch">
        <div class="searchBox">
          <input type="text" placeholder="请输入溯源码">
        </div>
        <div class="searchBtn">
          <img src="/static/img/farmerProducts/searchIcon.png">
        </div>
      </div>
    </div>
    <div class="w1200">
      <!-- 增加粤农优品认证图片 -->
      <div class="bar">
        <img src="/static/img/farmerProducts/superiorProductsIdentification.png" alt="粤农优品图片">
      </div>
      <div class="line"></div>
      <div class="selectTab">
        <el-tabs v-model="getId" type="card" stretch @tab-click="handleClick">
          <el-tab-pane
            v-for="type in goodsNewsType"
            :label="type.name"
            :name="type.dictionaries_id"
            :key="type.dictionaries_id"
          ></el-tab-pane>
          <div v-for="(item, index) in goodsNewsList" :key="index" class="oneItem">
            <router-link :to="{path: '/superiorProductInfo', query: {id: item.goodsnews_id}}">
              <div class="imgItem">
                <img :src="item.photos">
              </div>
              <div class="txtItem">
                <div class="txtTitle yn-text-ellipsis">{{item.title}}</div>
                <div class="txtPage">{{item.second_title}}</div>
                <div class="timeItem">{{item.creat_time}}</div>
              </div>
            </router-link>
          </div>
        </el-tabs>
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          background
          :total="total"
          prev-text="上一页"
          next-text="下一页"
          @current-change="handlePage"
          :current-page="currentPage"
          :page-size="5"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsNewsType, listGoodsNews } from "@/api/base/framerProducts";
export default {
  data() {
    return {
      activeTab: "",
      goodsNewsType: [{ name: "", dictionaries_id: "" }],
      goodsNewsList: [],
      currentPage: 0,
      showCount: 0,
      getId: "",
      wordCount: "",
      total: 0, //记录总条数
      type: ""
    };
  },
  mounted() {
    this.goodsNewsType = [{ name: "", dictionaries_id: "" }];
    this.init();
    //this.getNewsByTabName("");
    if (this.$route.query.id) {
      this.getId = this.$route.query.id;
    } else {
      this.getId = "9f0b5db8af8342f6929b20042a510d89";
    }
    this.getGoodsNewsTypeList();
    this.getNewsFirstList(this.getId, 1);
  },
  methods: {
    //参数初始化
    init() {
      this.currentPage = 1;
      this.showCount = 5;
      this.goodsNewsList = [];
    },

    //首次进入页面对应的类型以及列表
    getNewsFirstList(id, val) {
      // if (this.$route.query.id) {
      //   this.getId = this.$route.query.id;
      // } else {
      //   this.getId = "9f0b5db8af8342f6929b20042a510d89";
      // }
      // this.activeTab = this.getId;
      listGoodsNews({
        type: this.getId,
        currentPage: val,
        showCount: 5
      }).then(res => {
        if (res.success) {
          this.total = res.returnMap.totalResult;
          this.goodsNewsList = res.resultList;
        } else {
          this.currentPage -= 1;
        }
      });
    },

    // //根据新闻类型获取对应新闻列表
    // getNewsByTabName(type) {
    //   listGoodsNews({
    //     type: type,
    //     currentPage: this.currentPage,
    //     showCount: this.showCount
    //   }).then(res => {
    //     if (res.success) {
    //       this.total = res.returnMap.totalResult;
    //       this.goodsNewsList = res.resultList;
    //     } else {
    //       this.currentPage -= 1;
    //     }
    //   });
    // },

    //获取新闻类型列表
    getGoodsNewsTypeList() {
      getGoodsNewsType().then(res => {
        if (res.success) {
          this.goodsNewsType = res.resultList;
          // 删除第一条数据，粤农优品认证下单
          this.goodsNewsType.shift();
        }
      });
    },

    //根据点击新闻类型请求对应新闻列表
    handleClick(tab, event) {
      this.getId = tab.name;
      this.init();
      this.getNewsFirstList(tab.name, 1);
    },
    /* 翻页的效果 */
    handlePage(val) {
      this.currentPage = val;
      this.getNewsFirstList(this.getId, val);
    }
  }
};
</script>

<style lang="scss" scoped>
.farmerProducts {
  .imgTop {
    position: relative;
    height: 350px;
    background: url("/static/img/farmerProducts/imgTop.png") no-repeat;
    overflow: hidden;
    min-width: 1200px;
    .toSearch {
      width: 672px;
      margin: 0 auto;
      margin-top: 174px;
      .searchBox {
        position: absolute;
        width: 573px;
        height: 87px;
        input {
          width: 573px;
          height: 87px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          outline: none;
          padding-left: 20px;
          font-size: 30px;
        }
      }
      .searchBtn {
        position: absolute;
        margin-left: 573px;
        width: 99px;
        height: 87px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background: rgba(137, 201, 146, 1);
        cursor: pointer;
        img {
          width: 48px;
          height: 49px;
          margin: 19px auto;
        }
      }
    }
  }
  // 增加粤农优品认证图片的样式
  .bar {
    width: 1200px;
    height: 300px;
    margin: 40px 0 32px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .line {
    width: 1200px;
    height: 6px;
    background: $base-color;
    margin-top: 30px;
  }
  .selectTab {
    width: 1200px;
    display: inline-block;
    margin-bottom: 50px;
    .el-tabs {
      border: 1px solid rgba(238, 238, 238, 1);
      border-top: none;
      .oneItem {
        padding-top: 22px;
        padding-left: 22px;
        padding-bottom: 22px;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        .imgItem {
          width: 252px;
          height: 160px;
          display: inline-block;
          overflow: hidden;
        }
        .txtItem {
          position: absolute;
          display: inline-block;
          width: 847px;
          margin-left: 30px;
          .txtTitle {
            font-size: 20px;
            color: rgba(34, 34, 34, 1);
          }
          .txtPage {
            position: absolute;
            margin-top: 24px;
            max-height: 40px;
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .timeItem {
            position: absolute;
            margin-top: 110px;
            font-size: 14px;
            color: rgba(204, 204, 204, 1);
          }
        }
      }
    }
  }
  .pagination {
    text-align: center;
    margin-bottom: 38px;
  }
}
</style>
