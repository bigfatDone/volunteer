<template>
  <div class="container">
    <aside>
      <div class="recommend recommend-project">
        <div class="title">最新项目</div>
        <ul class="details">
          <li
            class="clearfix"
            v-for="(project,index) in projectData"
            :key="index"
            @click="toProject(project.id,project.type)"
          >
            <span>
              <img src="~@/../static/images/point.png" alt>
            </span>
            <span class="ys-text-ellipsis">{{project.title}}</span>
          </li>
        </ul>
      </div>
      <div class="recommend recommend-news">
        <div class="title">志愿快讯</div>
        <ul class="details">
          <li
            class="clearfix"
            v-for="(item,index) in newsData"
            :key="index"
            @click="toDetail(item.id)"
          >
            <span>
              <img src="~@/../static/images/point.png" alt>
            </span>
            <span class="ys-text-ellipsis">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
import { getNews, getProjectAside } from "@/api/common";
export default {
  data() {
    return {
      newsData: [],
      projectData: []
    };
  },
  methods: {
    // 获取新闻
    toGetNews() {
      getNews({}).then(res => {
        this.newsData = res;
      });
    },
    // 跳转新闻详情
    toDetail(val) {
      this.$router.push({
        name: "detail",
        query: {
          id: val,
          type: "news"
        }
      });
    },
    // 获取项目
    toProjectAside() {
      getProjectAside({}).then(res => {
        this.projectData = res;
      });
    },
    // 跳转项目
    toProject(val, val1) {
      this.$router.push({
        name: "project-detail",
        query: { id: val, type: val1 }
      });
    }
  },
  mounted() {
    this.toGetNews();
    this.toProjectAside();
  }
};
</script>
<style lang="scss" scoped>
.container {
  aside {
    width: 260px;
    .recommend {
      .title {
        border-bottom: 1px dotted #ccc;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 15px;
        padding-left: 5px;
      }
      .details {
        height: 136px;
        overflow-y: hidden;
        li {
          display: flex;
          height: 26px;
          font-size: 13px;
          align-items: center;
          cursor: pointer;
          &:hover {
            color: rgb(238, 26, 26);
          }
          span:nth-child(1) {
            padding: 0 5px;
          }
          img {
            height: 8px;
            width: 8px;
          }
        }
      }
    }
    .recommend-news {
    }
  }
}
</style>

