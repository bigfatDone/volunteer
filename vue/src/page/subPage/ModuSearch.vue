<!-- 搜索结果页面 -->
<template>
  <div class="w1200 search-wrap">
    <div class="head-wrap">
      <!-- 导航 -->
      <div class="head-nav">
        <ul class="nav-ul">
          <li
            v-for="(item, index) in tabNameLists"
            :class="{isActive: selectTab == index}"
            @click="handleTab(index)"
            :key="index"
            class="nav-link"
          >{{ item }}</li>
        </ul>
      </div>
      <!-- 搜索条目提示 -->
      <div class="num-tip" v-if="!(selectTab == 0)">
        共
        <span>{{ total }}</span> 条资讯
      </div>
    </div>
    <div class="content-wrap" v-if="selectTab == 0">
      <!-- 全部 公告 -->
      <div class="result-lists">
        <div class="top-bar">
          <span class="nav-title">公告</span>
          <span class="has-more" @click="handleTab(1)">更多>></span>
        </div>
        <div class="article-lists">
          <ul v-if="allLists.gov">
            <li v-for="(item, index) in allLists.gov" :key="index">
              <router-link :to="{path: 'noticeNewsInfo', query: {id: item.gov_news_id}}">
                <div class="article-wrap">
                  <img :src="item.gov_photos" :alt="item.gov_title">
                  <div class="text-section">
                    <div class="article-title yn-text-ellipsis">{{ item.gov_title }}</div>
                    <div class="article-subtitle">{{ item.gov_second_title }}</div>
                    <div class="meta-row">
                      <span class="type">{{ item.gov_name }}</span>
                      <span class="time">{{ item.gov_creat_time }}</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
      <!-- 全部 公益服务 -->
      <div class="result-lists">
        <div class="top-bar">
          <span class="nav-title">公益服务</span>
          <span class="has-more" @click="handleTab(2)">更多>></span>
        </div>
        <div class="article-lists">
          <ul v-if="allLists.pol">
            <li v-for="(item, index) in allLists.pol" :key="index">
              <router-link :to="{path: 'publicServiceInfo', query: {id: item.policy_news_id}}">
                <div class="article-wrap">
                  <img :src="item.pol_photos" :alt="item.pol_title">
                  <div class="text-section">
                    <div class="article-title yn-text-ellipsis">{{ item.pol_title }}</div>
                    <div class="article-subtitle">{{ item.pol_second_title }}</div>
                    <div class="meta-row">
                      <span class="type">{{ item.pol_name }}</span>
                      <span class="time">{{ item.pol_creat_time }}</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
      <!-- 全部 体验服务 -->
      <div class="result-lists">
        <div class="top-bar">
          <span class="nav-title">培训体验服务</span>
          <span class="has-more" @click="handleTab(3)">更多>></span>
        </div>
        <div class="article-lists">
          <ul v-if="allLists.train">
            <li v-for="(item, index) in allLists.train" :key="index">
              <div class="article-wrap">
                <div @click="toServiceDetails(item.type, item.train_id)" class="router">
                  <img :src="item.train_url" :alt="item.train_title">
                  <div class="icon-play" v-if="item.type == 1">
                    <img src="@/../static/img/play.png" class="icon">
                  </div>
                  <div class="text-section">
                    <div class="article-title yn-text-ellipsis">{{ item.train_title }}</div>
                    <div class="article-subtitle">{{ item.train_summary }}</div>
                    <div class="meta-row">
                      <span class="type">{{ item.train_name }}</span>
                      <span class="time">{{ item.train_creat_time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="content-wrap" v-if="selectTab == 1">
      <div class="result-lists">
        <div class="top-bar">
          <span class="nav-title">公告</span>
        </div>
        <div class="article-lists">
          <ul v-if="releaseLists.length">
            <li v-for="(item, index) in releaseLists" :key="index">
              <router-link :to="{path: 'noticeNewsInfo', query: {id: item.id}}">
                <div class="article-wrap">
                  <img :src="item.gov_photos" :alt="item.gov_title">
                  <div class="text-section">
                    <div class="article-title yn-text-ellipsis">{{ item.gov_title }}</div>
                    <div class="article-subtitle">{{ item.gov_second_title }}</div>
                    <div class="meta-row">
                      <span class="type">{{ item.type_name }}</span>
                      <span class="time">{{ item.gov_creat_time }}</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 公益服务 -->
    <div class="content-wrap" v-if="selectTab == 2">
      <div class="result-lists">
        <div class="top-bar">
          <span class="nav-title">公益服务</span>
        </div>
        <div class="article-lists">
          <ul v-if="welfareLists.length">
            <li v-for="(item, index) in welfareLists" :key="index">
              <router-link :to="{path: 'publicServiceInfo', query: {id: item.id}}">
                <div class="article-wrap">
                  <img :src="item.pol_photos" :alt="item.pol_title">
                  <div class="text-section">
                    <div class="article-title yn-text-ellipsis">{{ item.pol_title }}</div>
                    <div class="article-subtitle">{{ item.pol_second_title }}</div>
                    <div class="meta-row">
                      <span class="type">{{ item.pol_type_name }}</span>
                      <span class="time">{{ item.pol_creat_time }}</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 培训服务 -->
    <div class="content-wrap" v-if="selectTab == 3">
      <div class="result-lists">
        <div class="top-bar">
          <span class="nav-title">培训体验服务</span>
        </div>
        <div class="article-lists">
          <ul v-if="trainLists.length">
            <li v-for="(item, index) in trainLists" :key="index">
              <div class="article-wrap">
                <div @click="toServiceDetails(item.type, item.id)" class="router">
                  <img :src="item.train_url" :alt="item.train_title">
                  <div class="icon-play" v-if="item.type == 1">
                    <img src="@/../static/img/play.png" class="icon">
                  </div>
                  <div class="text-section">
                    <div class="article-title yn-text-ellipsis">{{ item.train_title }}</div>
                    <div class="article-subtitle">{{ item.train_summary }}</div>
                    <div class="meta-row">
                      <span class="type">{{ item.train_name }}</span>
                      <span class="time">{{ item.train_creat_time }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="no-data" v-else>暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="foot-wrap" v-if="selectTab != 0">
      <div class="pagination">
        <el-pagination
          @current-change="handlePage"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          prev-text="上一页"
          next-text="下一页"
          background
          :page-size="8"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRelease,
  getWelfare,
  getTrain,
  getAll
} from "@/api/base/search-results";
export default {
  data() {
    return {
      tabNameLists: ["全部", "公告", "公益服务", "培训体验服务"],
      selectTab: 0, // 选择的导航，0代表全部，1代表公告，2代表公益服务，3代表培训服务
      total: 0, // 查询总条目
      search: "", // 查询关键字
      releaseLists: [],
      welfareLists: [],
      trainLists: [],
      allLists: [],
      currentPage: 1
    };
  },
  methods: {
    // 获取公告列表
    getReleaseLists(id, page, count) {
      getRelease({
        type_id: id,
        toGoPage: page,
        showCount: count
      }).then(res => {
        if (res.success) {
          this.releaseLists = res.resultList;
          this.total = res.data;
        }
      });
    },
    // 获取公益服务列表
    getWelfareLists(id, page, count) {
      getWelfare({
        type_id: id,
        toGoPage: page,
        showCount: count
      }).then(res => {
        if (res.success) {
          this.welfareLists = res.resultList;
          this.total = res.data;
        }
      });
    },
    // 获取培训体验服务列表
    getTrainLists(id, page, count) {
      getTrain({
        type_id: id,
        toGoPage: page,
        showCount: count
      }).then(res => {
        if (res.success) {
          this.trainLists = res.resultList;
          this.total = res.data;
        }
      });
    },
    // 获取所有标签的列表
    getAllLists(keywords) {
      getAll({
        keywords
      }).then(res => {
        if (res.success) {
          this.allLists = res.returnMap;
        }
      });
    },
    // 根据查询类别获取所有的列表
    getLists(name = "", tab = 0, page = 1) {
      const RELEASE_ID = "03d03f50a0ba4f4b97bca77a672956d1"; // 公告id
      const WELFARE_ID = "7fa9cbb00a994473b136a27c2ab5260f"; // 公益服务id
      const TRAIN_ID = "0afa754c8e2f40b29c26be39094ece1d"; // 培训体验服务id
      const COUNT = 8; // 默认搜索八条数据
      switch (tab) {
        // 类别为公告
        case 1:
          this.getReleaseLists(RELEASE_ID, page, COUNT);
          break;

        // 类别为公益服务
        case 2:
          this.getWelfareLists(WELFARE_ID, page, COUNT);
          break;

        // 类别为培训体验服务
        case 3:
          this.getTrainLists(TRAIN_ID, page, COUNT);
          break;

        // 类别为全部
        case 0:
          this.getAllLists(name);
          break;
      }
    },
    // 培训体验服务跳转
    toServiceDetails(type, seviceIid) {
      // 跳转到个人中心
      if (type == 2) {
        this.$router.push({ path: "trainServiceInfor", query: { id: seviceIid } });
      } else if (type == 1) {
        this.$router.push({ path: "coursePlay", query: { id: seviceIid } });
      }
    },
    // 选择查询类别
    handleTab(tab) {
      this.getLists(this.search, (this.selectTab = tab));
      window.scrollTo(0, 0);
      this.currentPage = 1;
    },
    // 选择分页
    handlePage(val) {
      window.scrollTo(0, 0);
      this.getLists(this.search, this.selectTab, val);
    }
  },
  mounted() {
    this.getLists((this.search = this.$route.query.id));
  },
  watch: {
    $route() {
      this.getLists((this.search = this.$route.query.id));
    }
  }
};
</script>


<style lang="scss" scoped>
.search-wrap {
  .head-wrap {
    margin: 40px 0 24px 0;
    .head-nav {
      overflow: hidden;
      border: 1px solid $base-border-color;
      .nav-ul {
        overflow: hidden;
        margin-left: 31px;
        .nav-link {
          display: inline-block;
          margin-right: 81px;
          padding: 16px 0;
          font-size: 24px;
          cursor: pointer;
          &.isActive {
            border-bottom: 2px solid $base-color;
            color: $base-color;
          }
        }
      }
    }
    .num-tip {
      font-size: 16px;
      margin: 20px 0 24px 0;
    }
  }
  .content-wrap {
    margin: 24px 0 80px 0;
    .result-lists {
      overflow: hidden;
      border: 1px solid $base-border-color;
      margin-bottom: 50px;
      .top-bar {
        padding: 12px 20px;
        overflow: hidden;
        border-bottom: 1px solid $base-border-color;
        .nav-title {
          float: left;
          font-size: 24px;
        }
        .has-more {
          float: right;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
          cursor: pointer;
        }
      }
      .article-lists {
        .no-data {
          margin: 20px;
        }
        .article-wrap {
          height: 160px;
          padding: 24px 0;
          border-bottom: 1px solid $base-border-color;
          overflow: hidden;
          margin: 0 20px;
          position: relative;
          .router {
            cursor: pointer;
          }
          img {
            width: 240px;
            height: 160px;
            display: inline-block;
          }
          .icon-play {
            width: 50px;
            height: 50px;
            background: rgba(47, 47, 47, 0.5);
            border-radius: 50px;
            position: absolute;
            top: 80px;
            left: 90px;
            .icon {
              width: 17px;
              height: 19px;
              padding-top: 14px;
              padding-left: 19px;
            }
          }
          .text-section {
            width: 880px;
            display: inline-block;
            vertical-align: top;
            margin: 11px 0 11px 24px;
            .article-title {
              width: 880px;
              font-size: 24px;
              line-height: 24px;
              margin-bottom: 20px;
            }
            .article-subtitle {
              width: 880px;
              height: 44px;
              line-height: 22px;
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
              margin: 20px 0 35px 0;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .meta-row {
              width: 880px;
              font-size: 16px;
              color: rgba(153, 153, 153, 1);
              .time {
                margin-left: 31px;
              }
            }
          }
        }
      }
    }
  }
  .foot-wrap {
    .pagination {
      text-align: center;
      margin: 28px 0 80px;
    }
  }
}
</style>
