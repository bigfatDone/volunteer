<!-- 公告栏 -->
<template>
  <div id="noticeBoard">
    <div class="w1200">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <span class="tips">当前位置：</span>
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>公告栏</el-breadcrumb-item>
          <el-breadcrumb-item>{{ tabName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="classify">
        <div class="navLeft">分类：</div>
        <div class="navRight">
          <ul>
            <li
              v-for="item in newsTabs"
              :key="item.dictionaries_id"
              @click="handleSelect(item.dictionaries_id)"
            >
              <span :class="item.dictionaries_id == selectedTab ? 'isActive' : ''">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="list" v-for="item in newsLists" :key="item.gov_news_id">
          <router-link :to="{ path: '/noticeNewsInfo', query: { id: item.gov_news_id }}">
            <div class="left">
              <img :src="item.photos" alt="公告图片">
            </div>
            <div class="right">
              <div class="title">{{ item.title }}</div>
              <div class="summary">{{ item.second_title }}</div>
              <div class="time">{{ item.creat_time }}</div>
            </div>
          </router-link>
        </div>
        <div class="page">
          <div class="pageNum">共{{ total }}条</div>
          <div class="pagination">
            <el-pagination
              @current-change="handlePage"
              layout="prev, pager, next"
              :total="total"
              prev-text="上一页"
              next-text="下一页"
              :current-page="currentPage"
              background
              :page-size="7"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getnoticeBoard } from "@/api/base/notice-board";
import { getNewsType } from "@/api/index";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      newsLists: [],
      newsTabs: [],
      selectedTab: "",
      tabName: ""
    };
  },
  methods: {
    getLists(id = "") {
      getnoticeBoard({
        type_id: id,
        currentPage: this.currentPage
      }).then(res => {
        if (res.success) {
          this.newsLists = res.resultList;
          this.total = res.data;
          this.changeBread();
        }
      });
    },
    getNewsTabsList() {
      getNewsType().then(res => {
        if (res.success) {
          this.newsTabs = res.resultList;
          this.newsTabs.unshift({
            dictionaries_id: "",
            name: "全部"
          });
        }
      });
    },
    handleSelect(id) {
      this.currentPage = 1;
      this.getLists((this.selectedTab = id));
    },
    // 改变面包屑名字
    changeBread() {
      for (let i = 0; i < this.newsTabs.length; i++) {
        if (this.newsTabs[i].dictionaries_id == this.selectedTab) {
          this.tabName = this.newsTabs[i].name;
        }
      }
    },
    // 监听页数点击事件
    handlePage(val) {
      this.currentPage = val;
      window.scrollTo(0, 0);
      this.getLists(this.selectedTab);
    }
  },
  mounted() {
    this.getNewsTabsList();
    this.getLists((this.selectedTab = this.$route.query.id));
  },
  watch: {
    $route() {
      this.getLists((this.selectedTab = this.$route.query.id));
    }
  }
};
</script>
<style lang='scss' scoped>
.w1200 {
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  color: rgba(102, 102, 102, 1);
  .breadcrumb {
    font-size: 16px;
    line-height: 28px;
    margin: 22px 0 20px 0;
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
  .classify {
    margin: 20px 0 0 0;
    width: 1198px;
    height: 86px;
    line-height: 84px;
    font-size: 20px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(242, 242, 242, 1);
    .navLeft {
      display: inline-block;
      width: 100px;
      height: 84px;
      text-align: center;
      color: rgba(51, 51, 51, 1);
      background: rgba(249, 249, 249, 1);
    }
    .navRight {
      height: 86px;
      display: inline-block;
      ul {
        margin-left: 22px;
        li {
          display: inline-block;
          margin-right: 50px;
          cursor: pointer;
          span {
            padding: 3px 8px 2px;
            &.isActive {
              color: rgb(255, 255, 255);
              background: #5ab261;
            }
          }
        }
      }
    }
  }
  .content {
    margin: 0 0 59px 0;
    border: 1px solid rgba(238, 238, 238, 1);
    overflow: hidden;
    .list {
      margin: 25px 22px 0 22px;
      padding-bottom: 22px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      .left {
        width: 252px;
        height: 160px;
        float: left;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .right {
        width: 847px;
        height: 160px;
        margin-left: 282px;
        overflow: hidden;
        .title {
          width: 847px;
          height: 20px;
          font-size: 20px;
          line-height: 20px;
          margin: 8px 0 22px;
          color: rgba(34, 34, 34, 1);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .summary {
          width: 847px;
          height: 48px;
          font-size: 16px;
          line-height: 26px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin: 22px 0 40px;
        }
        .time {
          margin-top: 40px;
        }
      }
    }
    .page {
      border: 1px solid rgba(242, 242, 242, 1);
      .pageNum {
        padding: 20px 0 18px 22px;
        font-size: 18px;
        color: rgba(34, 34, 34, 1);
        line-height: 21px;
      }
      .pagination {
        text-align: center;
        margin-bottom: 45px;
      }
    }
  }
}
</style>