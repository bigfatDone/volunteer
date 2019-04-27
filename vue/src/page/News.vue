<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>志愿快讯</span>
    </nav>
    <div class="content">
      <section>
        <h2>志愿快讯</h2>
        <div class="news">
          <ul class="details">
            <li class="item" v-for=" (item,index) in data" :key="index" @click="toDetail(item.id)">
              <p class="ys-text-ellipsis">
                <img src="~@/../static/images/point.png" alt>
                <span
                  class="ys-text-ellipsis"
                >{{ item.title }}</span>
              </p>
              <span class="time">{{ item.date }}</span>
            </li>
          </ul>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="10"
          ></el-pagination>
        </div>
      </section>
      <aside>
        <v-aside></v-aside>
      </aside>
    </div>
  </div>
</template>
<script>
import { getNewsAll } from "@/api/news";
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    // 获取全部信息
    toGetNewsAll(){
      getNewsAll({}).then( res=> {
        this.data = res;
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
    this.toGetNewsAll()
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
      border: 1px solid #c5e9fb;
      h2 {
        font-size: 24px;
        text-align: center;
        margin: 20px;
      }
      .news {
        margin: 0 20px;
        min-height: 400px;
        .details {
          li {
            font-size: 16px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            margin: 10px 10px;
            p {
              display: flex;
              &:hover {
                color: #c30;
              }
              span:nth-child(1) {
                padding: 0 5px;
              }
              img {
                height: 10px;
                width: 10px;
                margin-top: 5px;
                margin-right: 5px;
              }
            }
            .time {
              width: 120px;
              margin-left: 20px;
              font-size: 14px;
              color: #888;
            }
          }
        }
      }
      .page {
        margin: 70px auto 100px;
        display: flex;
        justify-content: center;
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

