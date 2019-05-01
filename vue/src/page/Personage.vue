<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>志愿人物</span>
    </nav>
    <div class="content">
      <div class="wrapper">
        <section>
          <div class="title">
            <span>志愿者风采</span>
            <router-link :to="{ name: 'personage-detail', query:{ title: '志愿者风采',type: 0 }}" tag="span">更多>></router-link>
          </div>
          <div class="news">
            <ul class="details">
              <li v-for="(item,index) in dataOne" :key="index" @click="toDetail(item.id)">
                <p class="ys-text-ellipsis">
                  <img src="~@/../static/images/point.png" alt>
                  <span
                    class="ys-text-ellipsis"
                  >{{ item.title}}</span>
                </p>
                <span class="time">{{ item.date}}</span>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div class="title">
            <span>志愿者故事</span>
            <router-link :to="{ name: 'personage-detail', query:{ title: '志愿者故事',type: 1 }}" tag="span">更多>></router-link>
          </div>
          <div class="news">
            <ul class="details">
              <li v-for="(item,index) in dataTwo" :key="index" @click="toDetail(item.id)">
                <p class="ys-text-ellipsis">
                  <img src="~@/../static/images/point.png" alt>
                  <span
                    class="ys-text-ellipsis"
                  >{{ item.title}}</span>
                </p>
                <span class="time">{{ item.date}}</span>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div class="title">
            <span>志愿者心语</span>
            <router-link :to="{ name: 'personage-detail', query:{ title: '志愿者心语',type: 2 }}" tag="span">更多>></router-link>
          </div>
          <div class="news">
            <ul class="details">
               <li v-for="(item,index) in dataThree" :key="index" @click="toDetail(item.id)">
                <p class="ys-text-ellipsis">
                  <img src="~@/../static/images/point.png" alt>
                  <span
                    class="ys-text-ellipsis"
                  >{{ item.title}}</span>
                </p>
                <span class="time">{{ item.date}}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <aside>
        <v-aside></v-aside>
      </aside>
    </div>
  </div>
</template>
<script>
import { getPersonageOne,getPersonageTwo,getPersonageThree } from "@/api/personage";
export default {
  data() {
    return {
      dataOne: [],
      dataTwo: [],
      dataThree: []
    }
  },
  methods: {
    // 获取风采信息
    toGetPersonageOne(){
      getPersonageOne({}).then( res=> {
        this.dataOne = res;
      })
    },
    // 获取故事信息
    toGetPersonageTwo(){
      getPersonageTwo({}).then( res=> {
        this.dataTwo = res;
      })
    },
    // 获取心语信息
    toGetPersonageThree(){
      getPersonageThree({}).then( res=> {
        this.dataThree = res;
      })
    },
    // 跳转详情
    toDetail(val) {
      this.$router.push({
        name: "detail",
        query:{
          id: val,
          type: 'personage'
        }
      });
    }
  },
  mounted() {
    this.toGetPersonageOne()
    this.toGetPersonageTwo()
    this.toGetPersonageThree()
  }
}
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
    .wrapper {
      min-height: 500px;
      border: 1px solid #c5e9fb;
      section {
        width: 720px;
        margin-bottom: 15px;
        .title {
          display: flex;
          height: 34px;
          font-size: 16px;
          text-align: center;
          justify-content: space-between;
          background: #f1f1e3;
          align-items: center;
          padding-right: 10px;
          span:nth-child(1) {
            height: 34px;
            width: 110px;
            line-height: 32px;
            background: #fff;
            border-top: 2px solid $base-color;
          }
          span:nth-child(2) {
            cursor: pointer;
          }
        }
        .news {
          margin: 0 20px;
          .details {
            li {
              font-size: 16px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              margin: 8px 10px;
              p {
                display: flex;
                &:hover {
                  color: #c30;
                }
                span:nth-child(1) {
                  padding: 0 5px;
                }
                img {
                  height: 8px;
                  width: 8px;
                  margin-top: 6px;
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

