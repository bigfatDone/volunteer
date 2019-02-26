<template>
  <div class="tranin-content">
    <div class="w1200">
      <!-- 选择培训服务模块-->
      <div class="choose-modu">
        <div class="show-service">
          培训体验服务
          <span class="service-tips">>{{this.showFirstType}}{{this.showSecondType}}</span>
        </div>
        <div class="service-type">
          <div class="left-content">
            <div>培训分类</div>
            <div>培训类型</div>
          </div>
          <div class="right-content">
            <div class="sort-comtent">
              <span
                v-for="(item, index) in sortList"
                :key="index"
                class="sort"
                @click="changeFirstLever(index, item.dictionaries_id)"
                :class="{active:levelFirst == item.dictionaries_id}"
              >{{item.name}}</span>
            </div>
            <div class="sort-comtent">
              <span
                v-for="(item, index) in typeList"
                :key="index"
                class="sort"
                @click="changeSecondLever(index)"
                :class="{active:leverSceond ==index}"
              >{{item}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 培训服务列表显示模块 -->
      <div class="service-list-modu">
        <div class="list-content">
          <div
            class="list"
            v-for="(item, index) in serviceDataList"
            :key="index"
            @click="toServiceDetails(item.type,item.train_id)"
          >
            <div class="img">
              <img :src="item.url" class="service-img">
              <div class="icon-play" v-if="item.type == 1">
                <img src="@/../static/img/play.png" class="icon">
              </div>
            </div>
            <div class="title">{{item.title}}</div>
            <div class="info">
              <span class="time">{{item.create_time}}</span>
              <span class="author">{{item.create_user}}</span>
            </div>
          </div>
        </div>
        <div class="total">共{{this.total}}条</div>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            background
            :total="total"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handlePage"
            :current-page="currentPage"
            :page-size="16"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTrainType } from "@/api/index";
import { getServiceList } from "@/api/base/service";
export default {
  data() {
    return {
      sortList: [], // 一级列表
      typeList: ["全部", "视频", "文章"],
      currentPage: 1, // 设置当前页码
      total: 0, // 设置总条数
      levelFirst: "", // 记录一级菜单点击的id
      leverSceond: "", // 记录二级菜单点击的下标
      showFirstType: "不限", // 点击每一个一级标题显示的内容
      showSecondType: "", // 显示二级内容
      type: "", // 视频或者文章
      serviceDataList: [], // 培训服务
      id: "", // 记录分类id
      type: "" // 记录二级的类型，空为全部，1是视频 2是文章
    };
  },
  methods: {
    // 获取培训体验服务类型列表
    getServiceSort(value) {
      getTrainType().then(res => {
        if (res.success) {
          this.sortList = res.resultList;
          this.sortList.unshift({
            dictionaries_id: "",
            name: "全部",
            parent_id: ""
          });
          for (var i = 0; i < this.sortList.length; i++) {
            if (value == this.sortList[i].dictionaries_id) {
              this.showFirstType = this.sortList[i].name;
            }
          }
        }
      });
    },
    // 获取培训服务列表
    getDataList(id, page, type) {
      this.currentPage = page;
      this.levelFirst = id;
      getServiceList({
        classification_id: id,
        type: type,
        currentPage: page,
        showCount: 16
      }).then(res => {
        if (res.success) {
          this.serviceDataList = res.resultList;
          this.total = res.data;
        }
      });
    },

    // 点击一级标题进行显示在头部
    changeFirstLever(index, id) {
      this.levelFirst = id;
      this.leverSceond = 0;
      this.showSecondType = "";
      this.id = id;
      // 设计点击一级标题在头部的显示
      if (index == 0) {
        this.showFirstType = "不限";
      } else {
        this.showFirstType = this.sortList[index].name;
      }

      // 获取页面列表数据，每个一级标题点击默认值有page=1，type为空，id为当前id
      this.getDataList(id, 1, "");
    },

    // 点击二级标题进行显示以及获取数据
    changeSecondLever(val) {
      this.leverSceond = val;
      this.id = this.levelFirst;
      // 设计点击二级标题在头部的显示
      if (val == 0) {
        this.showSecondType = ">不限";
        this.type = "";
      } else {
        this.showSecondType = ">" + this.typeList[val];
        this.type = val;
      }
      // 获取列表页面数据，二级标题点击type，id为点击的一级id,page 为1，type为当前type
      this.getDataList(this.id, 1, this.type);
    },
    /* 翻页的效果 */
    handlePage(val) {
      this.currentPage = val;
      // 获取列表页面数据,id为一级id，val为当前页，type为二级type
      this.getDataList(this.id, val, this.type);
      window.scrollTo(0, 0);
    },
    // 点击文章进行跳转到详情页
    toServiceDetails(type, seviceIid) {
      // 跳转到文章详情页
      if (type == 2) {
        this.$router.push({ path: "trainServiceInfor", query: { id: seviceIid } });
      } else if (type == 1) {
        // 跳转到视频详情页
        this.$router.push({ path: "coursePlay", query: { id: seviceIid } });
      }
    }
  },
  mounted() {
    // 获取培训服务列表,页面初始化时id为空，page为1,type为空
    this.levelFirst = this.$route.query.id;
    // 获取培训服务分类
    this.getServiceSort(this.levelFirst);
    if (!this.levelFirst) {
      this.levelFirst = "";
    }
    this.getDataList(this.levelFirst, 1, "");
  },
  // 监听路由变化
  watch: {
    $route(to, from) {
      this.getDataList(this.$route.query.id, 1, "");
    }
  }
};
</script>


<style lang="scss" scoped>
.tranin-content {
  margin: 40px 0 40px 0;
  .w1200 {
    // 头部选择服务类型模块
    .choose-modu {
      width: 1200px;
      height: 158px;
      font-weight: bold;

      .show-service {
        height: 48px;
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        color: rgba(51, 51, 51, 1);
        line-height: 48px;
        padding-left: 31px;
        background: #f9f9f9;
        .service-tips {
          color: #888;
        }
      }
      .service-type {
        height: 110px;
        border: solid 1px #f2f2f2;
        font-size: 18px;
        .left-content {
          width: 136px;
          height: 108px;
          background: #f9f9f9;
          float: left;
          div {
            padding-top: 18px;
            padding-left: 30px;
            font-size: 18px;
            font-family: Adobe Heiti Std R;
            color: rgba(51, 51, 51, 1);
          }
        }
        .right-content {
          .sort-comtent {
            font-size: 18px;
            height: 55px;
            line-height: 55px;
            .sort {
              font-weight: bold;
              color: #333333;
              cursor: pointer;
              padding: 5px 10px;
            }
            .active {
              color: rgba(255, 255, 255, 1);
              background: #5ab261;
            }
          }
        }
      }
    }
    // 服务显示列表模块
    .service-list-modu {
      width: 1168px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(242, 242, 242, 1);
      margin-top: 40px;
      padding: 16px;
      .list-content {
        width: 1168px;
        // margin: 16px;
        margin: 0 auto;
        .list {
          width: 274px;
          height: 256px;
          border: 1px solid rgba(242, 242, 242, 1);
          float: left;
          margin: 0 8px 32px 8px;
          .img {
            width: 274px;
            height: 185px;
            position: relative;
            cursor: pointer;
            .service-img {
              width: 100%;
              height: 100%;
            }
          }
          .icon-play {
            width: 50px;
            height: 50px;
            background: rgba(47, 47, 47, 0.5);
            border-radius: 50px;
            position: absolute;
            top: 60px;
            left: 110px;
            .icon {
              width: 17px;
              height: 19px;
              padding-top: 14px;
              padding-left: 19px;
            }
          }
          .title {
            font-size: 18px;
            font-family: Adobe Heiti Std R;
            font-weight: bold;
            color: rgba(34, 34, 34, 1);
            line-height: 21px;
            padding-left: 10px;
            margin-top: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .info {
            margin-top: 12px;
            margin-left: 10px;
            font-size: 14px;
            font-family: Adobe Heiti Std R;
            color: rgba(153, 153, 153, 1);
            .author {
              margin-left: 48px;
            }
          }
        }
      }
      .total {
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        color: rgba(34, 34, 34, 1);
        margin-left: 32px;
        clear: left;
      }
      .pagination {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
}
</style>
