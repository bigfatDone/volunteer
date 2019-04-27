<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>详情</span>
    </nav>
    <div class="content">
        <section>
          <div class="title">{{ data.title}}</div>
          <div class="datef">
            <span>日期：{{ data.date}}</span>
            <span>来源：志愿茂名</span>
          </div>
          <div class="desc" v-html="data.content">
          </div>
        </section>
      <aside>
        <v-aside></v-aside>
      </aside>
    </div>
  </div>
</template>
<script>
import { getDetail, getPersonageDetail } from "@/api/common";
export default {
  data() {
    return {
      data: ''
    }
  },
  methods: {
    // 获取新闻详情
    toDetail() {
      getDetail({
        id: this.$route.query.id
      }).then( res => {
        this.data = res[0]
      })
    },
    // 获取志愿人物详情
    toPersonDetail() {
      getPersonageDetail({
        id: this.$route.query.id
      }).then( res => {
        this.data = res[0]
      })
    }
  },
  mounted() {
    if(this.$route.query.type == 'news'){
      this.toDetail()
    } else {
      this.toPersonDetail()
    }
  },
   watch: {
    '$route' (to, from) {
       console.log(8888)
      if(this.$route.query.type == 'news'){
        this.toDetail()
      } else {
        this.toPersonDetail()
      }
    }
   }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 0 auto 20px;
  nav {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    margin: 10px;
    font-size: 18px;
    border: 1px solid #eee;
    border-radius: 5px;
    span:nth-child(2) {
      font-size: 16px;
      color: $base-color;
      cursor: pointer;
    }
    span:nth-child(3) {
      font-size: 16px;
      // color: $base-color;
      // cursor: pointer;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    section {
      width: 720px;
      min-height: 500px;
      border: 1px solid #c5e9fb;
      .title {
        width: 500px;
        text-align: center;
        font-size: 28px;
        line-height: 160%;
        font-family: 黑体;
        margin: 20px auto 10px;
      }
      .datef {
        margin: 0 10px 30px 10px;
        text-align: center;
        color: #333;
        font-size: 15px;
        span:nth-child(1) {
          margin-right: 20px;
        }
      }
      .desc {
        font-family: 宋体;
        font-size: 14px;
        text-align: left;
        line-height: 32px;
        margin: 10px 10px 10px 20px;
      }
    }
    aside {
      width: 260px;
      border: 1px solid #c5e9fb;
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
}
</style>

