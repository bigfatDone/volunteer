<template>
  <div class="service-details">
    <div class="w1200 clearfix">
      <div class="tips">当前位置：
        <router-link :to="{path: 'trainService' }">培训体验服务></router-link>
        <span class="msg">详情</span>
      </div>

      <!-- 左侧内容 -->
      <div class="wrap-left">
        <!-- 主体内容：培训服务详情 -->
        <div class="contain-hd">
          <div class="detail">
            <div class="detail-title">
              <div class="title-name">{{this.dataResult.title}}</div>
              <span class="title-tips">作者：{{this.dataResult.create_user}}</span>
              <span class="title-tips">发布时间：{{this.dataResult.create_time}}</span>
            </div>
            <hr class="line1">
            <div class="text" v-html="dataResult.content">
              <!-- {{this.dataResult.CONTENT}} -->
            </div>
            <hr class="line1">
            <!-- 浏览量，收藏，分享-->
            <div class="status">
              <span class="status-item">浏览{{this.dataResult.clicknum}}次</span>
              <span class="status-item" v-show="isReset0" @click="changeStyle(0)">
                <span class="status-icon icon1"></span>
                <span class="status-tips">收藏</span>
              </span>
              <span class="status-item-orange" v-show="isChange0" @click="changeStyle(0)">
                <span class="status-icon icon1"></span>
                <span class="status-tips">已收藏</span>
              </span>
              <span class="status-item">
                <span class="status-icon icon2"></span>
                <span class="status-tips">分享</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 底部内容：全部评论 -->
        <!-- <div class="contain-ft">
          <div class="comment">
            <div class="commt1">
              <div class="title1">课程评价</div>
              <hr class="underline">
              <hr class="line1">
              <div class="input">
                <textarea class="input-text" placeholder="欢迎留言交流，评价课程。"></textarea>
              </div>
              <button class="btn">发表评论</button>
            </div>
            <div class="commt2">
              <div class="title2">全部评价</div>
              <hr class="underline">
              <hr class="line2">
              <div class="commt-item">
                <div class="img"></div>
                <div class="commt-content">
                  <span class="title">{{this.dataResult.COMMENTATORS_ID}}</span>
                  <span class="date">{{this.dataResult.COMMENT_TIME}}</span>
                  <div class="text">{{this.dataResult.COMMENT}}</div>
                </div>
                <div class="commt-other">
                  <div class="triangle"></div>
                  <div class="other-box">
                    <div class="name">益农社</div>
                    <div class="text"></div>
                  </div>
                </div>
                <div class="commt-icon">
                  <span class="icon icon1" @click="showToggle(1)"></span>
                  <span>1</span>
                  <span class="icon icon2" v-show="isReset1" @click="changeStyle(1)"></span>
                  <span v-show="isReset1">{{this.dataResult.UP_CLICK}}</span>
                  <span class="icon icon2-orange" v-show="isChange1" @click="changeStyle(1)"></span>
                  <span v-show="isChange1">{{this.dataResult.UP_CLICK+1}}</span>
                </div>
                <div class="commt-me" v-show="isShow0">
                  <textarea class="me-input" placeholder="欢迎留言评论~!"></textarea>
                  <div class="me-btn">
                    <span class="me-btn1" @click="showToggle(0)">取消回复</span>
                    <span>
                      <button class="me-btn2">发布</button>
                    </span>
                  </div>
                </div>
                <hr class="line3">
              </div>
              <div class="more-btn">
                <button class="more">点击查看更多</button>
              </div>
            </div>
          </div>
        </div>-->
      </div>

      <!-- 右侧导航 -->
      <div class="wrap-right">
        <!-- 侧边导航：相关课程 -->
        <div class="sidenav">
          <div class="nav-title">相关课程</div>
          <hr class="line">
          <!-- <div class="nav-list" v-for="(item, index) in connectCourses" :key="index" @click="toDetail(item.id)"> -->
          <div
            class="nav-list"
            v-for="(item, index) in connectCourses"
            :key="index"
          >
            <span class="list-pic">
              <img :src="item.url">
            </span>
            <div class="list-text">
              <div class="list-title">{{item.title}}</div>
              <div class="list-tips">
                <span class="auth">{{item.author}}</span>
                <span class="time">{{item.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailData } from "@/api/base/serviceDetails";
export default {
  data() {
    return {
      isReset0: true,
      isChange0: false,
      isShow0: false,
      isReset1: true,
      isChange1: false,
      isShow1: true,
      // len: 3,
      // comments: [],
      // newComment:'',
      dataResult: {},
      id: "",
      connectCourses: [
        {
          url: "@/../static/img/service-details/service.png",
          id: "eef40cba91d14919926d99e969bd89a7",
          title: "农产品体验服务",
          author: "admin",
          time: "12-27"
        },
        {
          url: "@/../static/img/service-details/vegetable-field.png",
          id: "340821d0c51840d286fb594aebb4c3af",
          title: "瓜类蔬菜病虫害防治",
          author: "admin",
          time: "12-27"
        },
        {
          url: "@/../static/img/service-details/vegetables.png",
          id: "50bd2735932846efb4f9adee9664df8d",
          title: "绿小麦种植技术",
          author: "admin",
          time: "12-27"
        }
      ] // 相关课程
    };
  },

  methods: {
    //修改图标样式
    changeStyle(num) {
      if (num == 0) {
        this.isReset0 = !this.isReset0;
        this.isChange0 = !this.isChange0;
      } else {
        this.isReset1 = !this.isReset1;
        this.isChange1 = !this.isChange1;
      }
    },

    //控制留言面板的显示与隐藏
    showToggle(num) {
      if (num == 1) this.isShow0 = true;
      else this.isShow0 = false;
    },

    //点击发布课程评价
    // addComment() {            //************************ */
    //   this.comment.push(

    //   )
    // },

    //点击查看更多
    // showMore() {
    //   this.isShow1 = false;
    //   this.len = this.isShow1? 3: this.comments.length;
    // },

    getServiceDetailData(id) {
      getDetailData({
        train_id: id
      }).then(res => {
        if (res.success) {
          this.dataResult = res.returnMap;
        }
      });
    },
    // 点击了推荐课程
    // toDetail(value) {
    //   this.id = value;
    //   this.getServiceDetailData(value);
    // }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getServiceDetailData(this.id);
  }
};
</script>

<style lang="scss" scoped>
.service-details {
  .w1200 {
    position: relative;

    .tips {
      margin: 20px auto;
      font-size: 16px;
      color: #333;
      .msg {
        color: #bebebe;
      }
    }

    .wrap-left {
      float: left;
      position: relative;
      width: 880px;
      .contain-hd {
        .detail {
          border: 1px solid #efefef;
          .detail-title {
            margin: 24px;
            .title-name {
              font-size: 28px;
            }
            .title-tips {
              margin: 20px 40px 0 0;
              color: #a8a8a8;
              display: inline-block;
            }
          }
          .text {
            width: 736px;
            margin: 40px 64px 64px 80px;
            font-size: 16px;
            line-height: 24px;
            min-height: 200px;
          }
          .status {
            height: 20px;
            margin: 23px 20px;
            color: #999;
            .status-item {
              margin-right: 40px;
              vertical-align: top;
              cursor: pointer;
              .status-icon {
                width: 20px;
                height: 20px;
                margin-right: 10px;
                display: inline-block;
              }
              .icon1 {
                background-image: url("~@/../static/img/service-details/grayStar.png");
              }
              .icon2 {
                background-image: url("~@/../static/img/service-details/grayShare.png");
              }
              .status-tips {
                vertical-align: top;
              }
            }
            //鼠标滑过图标呈现蓝色样式
            .status-item:hover {
              color: #3e9dfe;
              .icon1 {
                background-image: url("~@/../static/img/service-details/blueStar.png");
              }
              .icon2 {
                background-image: url("~@/../static/img/service-details/blueShare.png");
              }
            }
            //收藏后图标呈现橙色样式
            .status-item-orange {
              margin-right: 40px;
              color: #fe800d;
              vertical-align: top;
              cursor: pointer;
              .status-icon {
                width: 20px;
                height: 20px;
                margin-right: 10px;
                display: inline-block;
              }
              .icon1 {
                background-image: url("~@/../static/img/service-details/orangeStar.png");
              }
              .status-tips {
                vertical-align: top;
              }
            }
          }
        }
      }
      .contain-ft {
        .comment {
          margin: 20px auto;
          border: 1px solid #efefef;
          .commt1 {
            .title1 {
              margin: 18px 44px;
              font-size: 18px;
              color: $base-color;
            }
            .underline {
              width: 120px;
              margin: -10px auto 0 20px;
              border: 1px solid $base-color;
              position: relative;
              top: 9px;
            }
            .input {
              .input-text {
                width: 780px;
                height: 80px;
                margin: 20px 40px;
                padding: 20px;
                font-size: 14px;
                line-height: 21px;
                background-color: #f7f7f7;
                border: none;
                resize: none;
              }
            }
            .btn {
              width: 120px;
              height: 40px;
              margin-left: 720px;
              color: #fff;
              background-color: $base-color;
              border: none;
              outline: none;
            }
          }
          .commt2 {
            .title2 {
              margin: 40px auto 18px 54px;
              font-size: 18px;
            }
            .underline {
              width: 100px;
              margin: -10px auto 0 40px;
              border: 1px solid $base-color;
              position: relative;
              top: 9px;
            }
            .commt-item {
              margin: 28px 40px 20px 45px;
              .img {
                width: 46px;
                height: 46px;
                background-image: url({{URL}}); //../../../static/img/ynsImg.png
                border-radius: 50%;
                vertical-align: top;
                display: inline-block;
              }
              .commt-content {
                margin-left: 20px;
                display: inline-block;
                .title {
                  margin-right: 30px;
                  color: #666;
                  display: inline-block;
                }
                .date {
                  color: #666;
                }
                .text {
                  margin-top: 20px;
                  line-height: 21px;
                }
              }
              .commt-other {
                position: relative;
                margin: 25px 40px 24px 68px;
                padding-top: 8px;
                .triangle {
                  position: absolute;
                  left: 10px;
                  top: -6px;
                  border: 7px solid transparent;
                  border-bottom-color: #ededed;
                }
                .other-box {
                  width: 726px;
                  height: 100%;
                  background-color: #ededed;
                  overflow: hidden;
                  .name {
                    float: left;
                    margin: 14px 636px auto 20px;
                    font-size: 14px;
                    color: #666;
                  }
                  .text {
                    float: left;
                    width: 680px;
                    margin: 14px 20px 16px 21px;
                    font-size: 14px;
                    color: #333;
                  }
                }
              }
              .commt-icon {
                text-align: right;
                .icon {
                  width: 20px;
                  height: 20px;
                  margin-left: 38px;
                  margin-right: 12px;
                  vertical-align: top;
                  display: inline-block;
                }
                .icon1 {
                  background-image: url("~@/../static/img/service-details/comment.png");
                }
                .icon2 {
                  background-image: url("~@/../static/img/service-details/grayGood.png");
                }
                .icon2-orange {
                  background-image: url("~@/../static/img/service-details/orangeGood.png");
                }
              }
              .commt-me {
                margin: 24px auto auto 68px;
                .me-input {
                  width: 700px;
                  height: 150px;
                  padding: 13px 12px;
                  font-size: 14px;
                  line-height: 21px;
                  background-color: #f7f7f7;
                  border-color: $base-color;
                  resize: none;
                }
                .me-btn {
                  text-align: right;
                  .me-btn1 {
                    font-size: 15px;
                    color: #999;
                    cursor: pointer;
                  }
                  .me-btn2 {
                    width: 66px;
                    height: 26px;
                    margin: 12px auto 20px 24px;
                    color: $base-color;
                    background-color: #fff;
                    border: 1px solid $base-color;
                  }
                }
              }
            }
          }
          .more-btn {
            height: 60px;
            .more {
              width: 165px;
              height: 40px;
              position: absolute;
              left: 40%;
              background-color: #ededed;
              border: none;
            }
          }
        }
      }
      .line1 {
        border: 1px solid #efefef;
      }
      .line2 {
        width: 800px;
        margin: 8px 40px;
        border: 1px solid #efefef;
      }
      .line3 {
        clear: both;
        width: 800px;
        margin-top: 30px;
        margin-left: -5px;
        border: 1px solid #efefef;
      }
    }

    .wrap-right {
      float: left;
      position: relative;
      top: 0;
      right: 0;
      margin-left: 20px;
      .sidenav {
        width: 298px;
        border: 1px solid #efefef;
        .nav-title {
          margin: 20px;
          font-size: 18px;
        }
        .nav-list {
          margin: 20px;
          .list-pic {
            width: 80px;
            height: 80px;
            background-image: url(); //"../../../static/img/course.png"
            display: inline-block;
          }
          .list-text {
            position: relative;
            width: 160px;
            height: 75px;
            margin-left: 12px;
            display: inline-block;
            vertical-align: top;
            .list-title {
              margin-top: 8px;
              font-size: 14px;
            }
            .list-tips {
              position: absolute;
              bottom: 0;
              width: 160px;
              font-size: 12px;
              color: #999;
              display: inline-block;
              .time {
                float: right;
              }
            }
          }
        }
      }
      .line {
        border: 1px solid #efefef;
      }
    }
  }
}
</style>
