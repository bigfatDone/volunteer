<template>
    <div class="container">
        <nav>
            <span>当前位置：</span>
            <router-link to="/index" tag="span">首页&nbsp;</router-link>>
            <span>志愿项目</span>
        </nav>
        <div class="content">
            <section>
                <div class="list">
                    <div class="item" @click="toDetail()">
                        <div class="time">
                          2018-12-12
                        </div>
                        <div class="icon">
                          <img src="~@/../static/images/noimg.jpg" alt="">
                        </div>
                        <div class="desc yn-text-ellipsis">
                          志愿茂名
                        </div>
                        <div class="condition">
                          <div class="condition-left">
                            <span>人数：88</span>
                          </div>
                          <div class="condition-right">招募中</div>
                        </div>
                        <div class="progress">
                          <div class="num">
                            <p>报名人数</p>
                            <p>0</p>
                          </div>
                          <div class="end">
                            <p>距离结束</p>
                            <p>12天</p>
                          </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                          2018-12-12
                        </div>
                        <div class="icon">
                          <img src="~@/../static/images/noimg.jpg" alt="">
                        </div>
                        <div class="desc yn-text-ellipsis">
                          志愿茂名
                        </div>
                        <div class="condition">
                          <div class="condition-left">
                            <span>人数：88</span>
                          </div>
                          <div class="condition-right">招募中</div>
                        </div>
                        <div class="progress">
                          <div class="num">
                            <p>报名人数</p>
                            <p>0</p>
                          </div>
                          <div class="end">
                            <p>距离结束</p>
                            <p>12天</p>
                          </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                          2018-12-12
                        </div>
                        <div class="icon">
                          <img src="~@/../static/images/noimg.jpg" alt="">
                        </div>
                        <div class="desc yn-text-ellipsis">
                          志愿茂名
                        </div>
                        <div class="condition">
                          <div class="condition-left">
                            <span>人数：88</span>
                          </div>
                          <div class="condition-right">招募中</div>
                        </div>
                        <div class="progress">
                          <div class="num">
                            <p>报名人数</p>
                            <p>0</p>
                          </div>
                          <div class="end">
                            <p>距离结束</p>
                            <p>12天</p>
                          </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                          2018-12-12
                        </div>
                        <div class="icon">
                          <img src="~@/../static/images/noimg.jpg" alt="">
                        </div>
                        <div class="desc yn-text-ellipsis">
                          志愿茂名
                        </div>
                        <div class="condition">
                          <div class="condition-left">
                            <span>人数：88</span>
                          </div>
                          <div class="condition-right">招募中</div>
                        </div>
                        <div class="progress">
                          <div class="num">
                            <p>报名人数</p>
                            <p>0</p>
                          </div>
                          <div class="end">
                            <p>距离结束</p>
                            <p>12天</p>
                          </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                          2018-12-12
                        </div>
                        <div class="icon">
                          <img src="~@/../static/images/noimg.jpg" alt="">
                        </div>
                        <div class="desc yn-text-ellipsis">
                          志愿茂名
                        </div>
                        <div class="condition">
                          <div class="condition-left">
                            <span>人数：88</span>
                          </div>
                          <div class="condition-right">招募中</div>
                        </div>
                        <div class="progress">
                          <div class="num">
                            <p>报名人数</p>
                            <p>0</p>
                          </div>
                          <div class="end">
                            <p>距离结束</p>
                            <p>12天</p>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="10">
                  </el-pagination>
                </div>
            </section>
            <aside>
              <div class="recommend recommend-project">
                <div class="title">
                  最新项目
                </div>
                <ul class="details">
                    <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋</span></li>
                    <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋</span></li>
                </ul>
              </div>
              <div class="recommend recommend-news">
                <div class="title">
                  热点资讯
                </div>
                <ul class="details">
                    <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋</span></li>
                    <li class="clearfix"><span><img src="~@/../static/images/point.png" alt=""></span><span class="ys-text-ellipsis">本市举办2019年“爱满京城”首都学雷锋</span></li>
                </ul>
              </div>
            </aside>
        </div>
    </div>
</template>
<script>
export default {
   data() {
     return {

     }
   },
   methods: {
     toDetail() {
       this.$router.push({
         name:'project-detail'
       })
     }
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
        section {
            width: 720px;
            border: 1px solid #c5e9fb;
            .list {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
                .item {
                  display: flex;
                  width: 230px;
                  margin-top: 10px;
                  border: 2px solid #EDEDED;
                  flex-wrap: wrap;
                  justify-content: center;
                  border-radius: 10px;
                  cursor: pointer;
                    .time {
                      width: 100%;
                      height: 30px;
                      background: $base-color;
                      color: #fff;
                      text-align: center;
                      font-size: 18px;
                      line-height: 30px;
                      border-radius: 5px 5px 0 0;
                    }
                    .icon {
                      width: 210px;
                      height: 210px;
                      border-radius: 5px;
                    }
                    .desc {
                      width: 100%;
                      height: 48px;
                      font-size: 18px;
                    }
                    .condition {
                      display: flex;
                      width: 100%;
                      height: 22px;
                      padding-bottom: 5px;
                      font-size: 12px;
                      justify-content: space-between;
                      align-items: center;
                      border-bottom:1px solid #ccc;
                      .condition-left {
                        margin-left: 6px;
                        color:  #888;
                      }
                      .condition-right {
                        width: 40px;
                        height: 22px;
                        line-height: 22px;
                        border-radius: 5px;
                        margin-right: 12px;
                        text-align: center;
                        color: #fff;
                        background-color: $base-color;
                      }
                    }
                    .progress {
                      display: inherit;
                      width: 100%;
                      height: 46px;
                      color: $base-font-color;
                      p {
                        line-height: 23px;
                      }
                      .num {
                        width: 50%;
                        text-align: center;
                      }
                      .end {
                        width: 50%;
                        text-align: center;
                    }
                  }
                &:hover {
                  box-shadow: 0.5px 0.5px 4px 2px $base-color;
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

