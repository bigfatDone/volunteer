<template>
    <div class="container">
        <nav>
            <span>当前位置：</span>
            <router-link to="/index" tag="span">首页&nbsp;</router-link>>
            <router-link to="/project" tag="span">志愿项目&nbsp;</router-link>>
            <span>志愿项目详情</span>
        </nav>
        <div class="content">
            <section>
              <!-- 4545646466 -->
              <div class="title"> 
                <span>慈孝文化节为老服务</span>
                <div class="going">进行中</div>
              </div> 
              <div class="publish">
                <div class="icon">
                  <img src="https://dummyimage.com/260" alt="">
                </div>
                <div class="publish-detail">
                  <p class="item clearfix">
                    <span class="object">项目地点：</span>
                    <span class="content">茂名市电白牛路水村</span>
                  </p>
                  <p class="item clearfix">
                    <span class="object">服务类别：</span>
                    <span class="content">
                      <span class="type">社区便民</span>
                    </span>
                  </p>
                  <p class="item clearfix">
                    <span class="object">服务对象：</span>
                    <span class="content">茂名空巢老人</span>
                  </p>
                  <p class="item clearfix">
                    <span class="object">招募日期：</span>
                    <span class="content">
                      <span class="tomark">2018-11-12</span>至
                      <span class="tomark">2019-11-78</span>
                    </span>
                  </p>
                  <p class="item clearfix">
                    <span class="object">项目日期：</span>
                    <span class="content">
                      <span class="tomark">2018-11-12</span>至
                      <span class="tomark">2019-11-78</span>
                    </span>
                  </p>
                  <p class="item clearfix">
                    <span class="object">发布日期：</span>
                    <span class="content">
                      <span class="tomark">2018-11-12</span>
                    </span>
                  </p>
                  <p class="item clearfix">
                    <span class="object">服务时间：</span>
                    <span class="content">89天</span>
                  </p>
                    <button class="apply unselect" v-if="this.status === 1" @click="send">报名</button>
                    <button class="apply select" v-else @click="send">已报名</button>
                </div>
              </div>
              <div class="project">
                <div class="des">
                  <div class="title">
                    <span>计划岗位：7&nbsp;</span>
                    <span>已经招募：5</span>
                  </div>
                  <div class="box">
                    <div class="detail">
                      <p>岗位ID</p>
                      <p>277563</p>
                    </div>
                    <div class="detail">
                      <p>岗位描述：</p>
                      <p>制作并发放观影券；组织服务商开展活动；组织人员跟踪回访，收集居民的反馈意见和建议。</p>
                    </div>
                    <div class="detail">
                      <p>岗位条件</p>
                      <p>志愿茂名服务网注册志愿者</p>
                    </div>
                  </div>
                  <div class="title">
                    <span>项目详情</span>
                  </div>
                  <div class="box">
                    <div class="detail">
                      岗位Ifa发送到公司大股东方式告诉
                      对方广东省非官方大哥发的
                      是告诉对方公司法定告诉对方公
                      的说法是嘎嘎嘎嘎施工感受感受故事的故事的故事司的感受到D
                    </div>
                  </div>
                </div>
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
              <div class="recommend recommend-news">
                <div class="title">
                  社区资料
                </div>
                <ul class="all">
                  <li>
                    <span>名称：</span>
                    <span>茂名市电白牛路水村</span>
                  </li>
                  <li>
                    <span>地址：</span>
                    <span>茂名市电白牛路水村</span>
                  </li>
                  <li>
                    <span>联系人：</span>
                    <span>钟阳山</span>
                  </li>
                  <li>
                    <span>联系人手机号码：</span>
                    <span>13660365510</span>
                  </li>
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
        status: 1
      }
    },
    methods: {
      send() {
        if (this.status) {
          this.status = 0;
        } else {
          this.status = 1;
        }
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
            color: $base-color;
            cursor: pointer;
        }
        span:nth-child(4) {
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
            padding-bottom: 20px;
            border: 1px solid #c5e9fb;
            border-radius: 5px;
            .title {
              height: 52px;
              margin: 5px;
              padding-left: 20px;
              line-height: 52px;
              font-size: 22px;
              border-radius: 5px;
              border: 1px solid $base-border-color;
              .going {
                display: inline-block;
                height: 26px;
                width: 58px;
                margin-left: 10px;
                font-size: 14px;
                text-align: center;
                line-height: 26px;
                border-radius: 12px;
                color: #fff;
                background-color: #0088cc;
              }
            }
            .publish {
              height: 280px;
              margin: 0 5px;
              border-radius: 5px;
              border: 1px solid $base-border-color;
              .icon {
                float: left;
                width: 260px;
                height: 260px;
                margin: 10px;
                img {
                  width: 260px;
                  height: 260px;
                }
              }
              .publish-detail {
                  float: left;
                  margin-top: 10px;
                  margin-left: 20px;
                .item {
                  display: flex;
                  height: 28px;
                  line-height: 28px;
                  font-size: 16px;
                  color: $base-font-color;
                  .object {
                    color: #4e4646;
                    margin-right: 15px;
                    font-weight: 600;
                  }
                  .content {
                    .type {
                        width: 80px;
                        height: 24px;
                        color: #fff;
                        font-size: 12px;
                        line-height: 24px;
                        text-align: center;
                        border-radius: 10px;
                        background-color: #0088cc;
                    }
                    .tomark {
                      padding: 0 5px;
                      color: green;
                    }
                  }
                }
                .apply {
                  width: 102px;
                  margin-left: 200px;
                  margin-top: 16px;
                  color: #fff;
                  height: 36px;
                  line-height: 36px;
                  font-size: 21px;
                  border: none;
                  border-radius: 10px;
                  letter-spacing:2px;
                  cursor: pointer;
                }
                .unselect {
                  background-color: $base-color;
                }
                .select {
                  background-color: #7e848c;
                }
              }
            }
            .project {
              .des {
                .title {
                  height: 40px;
                  line-height: 40px;
                  font-size: 18px;
                  color: #fff;
                  background-color: #39afea;
                }
                .box {
                  margin: 5px;
                  font-size: 16px;
                  border: 1px solid $base-border-color;
                  border-radius: 5px;
                  .detail {
                    display: block;
                    margin: 5px 20px;
                    padding: 10px;
                    p:nth-child(1) {
                      height: 30px;
                      line-height: 30px;
                      color: green;
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
              .all {
                li {
                  display: flex;
                  height: 26px;
                  font-size: 13px;
                  align-items: center;
                  span:nth-child(1) {
                    padding: 0 5px 0 16px;
                    font-weight: bold;
                    font-size: 14px;
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

