<template>
  <div class="container">
    <aside>
      <div class="recommend recommend-project">
        <div class="title">最新项目</div>
        <ul class="details">
          <li class="clearfix">
            <span>
              <img src="~@/../static/images/point.png" alt>
            </span>
            <span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋</span>
          </li>
          <li class="clearfix">
            <span>
              <img src="~@/../static/images/point.png" alt>
            </span>
            <span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋</span>
          </li>
        </ul>
      </div>
      <div class="recommend recommend-news">
        <div class="title">热点资讯</div>
        <ul class="details">
          <li class="clearfix" v-for="(item,index) in newsData" :key="index" @click="toDetail(item.id)">
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
import { getNews } from "@/api/common";
export default {
  data() {
    return {
      newsData:[]
    };
  },
  methods: {
    toGetNews(){
      getNews({}).then( res => {
        this.newsData = res
      })
    },
    toDetail(val) {
      this.$router.push({
        name: "detail",
        query:{
          id: val,
          type: 'news'
        }
      });
    }
  },
  mounted() {
    this.toGetNews();
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

