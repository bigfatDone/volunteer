<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <router-link to="/personage" tag="span">志愿人物&nbsp;</router-link>>
      <span>{{ this.type }}</span>
    </nav>
    <div class="content">
      <section>
        <h2>{{ this.type }}</h2>
        <div class="news">
          <ul class="details">
            <li>
              <p class="ys-text-ellipsis">
                <img src="~@/../static/images/point.png" alt>
                <span
                  class="ys-text-ellipsis"
                >本市举办2019年“爱满gsdgsdfgsdffgsdf gsdfgsdfgsdfgsfgsdfgsdf京城”首都学雷锋</span>
              </p>
              <span class="time">2018-11-12</span>
            </li>
            <li>
              <p class="ys-text-ellipsis">
                <img src="~@/../static/images/point.png" alt>
                <span
                  class="ys-text-ellipsis"
                >本市举办2019年“爱满gsdgsdfgsdffgsdf gsdfgsdfgsdfgsfgsdfgsdf京的說法是的法師打發</span>
              </p>
              <span class="time">2018-11-12</span>
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
export default {
  data() {
    return {
      type: this.$route.query.type,
    };
  },
  methods: {
    toDetail() {
      this.$router.push({
        name: "project-detail"
      });
    }
  },
  mounted() {
    console.log(this.$route)
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
      color: $base-color;
      cursor: pointer;
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

