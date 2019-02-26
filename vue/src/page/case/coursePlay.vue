<template>
  <div class="coursePlay">
    <div class="w1200">
      <div class="top-tag">
        <div>当前位置：
          <router-link :to="{path: 'trainService' }">培训体验服务>详情</router-link>
        </div>
      </div>
      <div class="top-title">{{detailData.title}}</div>
      <div class="video-box" @click="allPlay">
        <video width="1200" height="675" id="myvideo" ref="video">您的浏览器不支持video标签。</video>
        <!-- <div :class="{'pauseBtn':toplay}"></div> -->
        <div class="pauseBtn" v-show="toplay"><img src="/static/img/coursePlay/pause.png" class="pausePic" alt=""></div>
      </div>
      <!-- 进度条 -->
      <div class="video-bar">
        <div class="block" @mousedown="mouseDown()" @mouseup="mouseUp()">
          <el-slider v-model="playLength" @change="eleChange()" :show-tooltip="false"></el-slider>
        </div>
      </div>
      <!-- 定义播放控制组件 -->
      <div class="video-control">
        <div class="controlL">
          <div class="control-play" @click="changeToplay">
            <div class="toplay" v-show="toplay" @click="vedioPlay"></div>
            <div class="topause" v-show="!toplay" @click="vedioPause"></div>
          </div>
          <div class="control-time">{{currentMin}}:{{currentSec}}/{{videoMin}}:{{videoSec}}</div>
        </div>
        <div class="controlR">
          <div class="control-voice" :class="{'control-silence':voiceState}" @click="changevState"></div>
          <div class="block el-control">
            <el-slider v-model="defVoiceL" :show-tooltip="false"></el-slider>
          </div>
          <div class="control-setting"></div>
          <div class="control-fullScreen" @click="FullScreen"></div>
        </div>
      </div>

      <!-- 分享 -->
      <div class="video-detail">
        <div class="pageDetail">
          <div class="playTimes">{{this.detailData.clicknum}}</div>
          <div @click="collectionHandle" :class="{ 'collection': isA, 'collection-click': isB }">
            <div class="collectionImg"></div>
            <div class="collectTxt" v-show="show">收藏</div>
            <div class="collectTxt" v-show="!show">已收藏</div>
          </div>
          <div class="share">
            <div class="shareImg"></div>
            <div class="shareTxt">分享</div>
          </div>
          <div class="download">
            <div class="downloadImg"></div>
            <div class="downloadTxt">下载</div>
          </div>
        </div>
      </div>
      <div class="course-Detail">
        <ul class="courseNav">
          <li
            class="navDetail"
            v-for="(tab,index) in tabsName"
            :key="index"
            @click="tabsSwitch(index)"
            v-bind:class="{active:index==nowIndex}"
          >{{tab}}</li>
        </ul>
        <div class="courseBrief" v-show="nowIndex===0">
          <div v-html="detailData.content"></div>
        </div>
        <div class="courseBrief" v-show="nowIndex===1">
          <div class="editBox">
            <el-input type="textarea" :rows="6" placeholder="欢迎留言交流，评价课程" v-model="textarea"></el-input>
            <div class="pushBtn">发表评论</div>
          </div>
          <div class="bar">
            <div class="barTxt">全部评论</div>
          </div>
          <div class="comment">
            <div class="commentItem">
              <div class="commentMsg">
                <div class="headImg">
                  <img src="/static/img/coursePlay/headImg.png">
                </div>
                <div class="commentDetail">
                  <div>
                    <span class="commentAuthor">益农社</span>
                    <span class="commentDate">2018-12-18</span>
                    <span class="commentTime">11:13</span>
                  </div>
                  <div class="commentPage">为什么教程里没有相应的联系文件啊？</div>
                </div>
              </div>
              <div class="answerBox">
                <div class="triangle"></div>
                <div class="answerMsg">
                  <div class="answerItem">
                    <span class="answerTitle">广东益农社：</span>
                    <span class="answerPage">已经上传了，根据个人需求下载吧。</span>
                  </div>
                  <div class="answerItem">
                    <span class="answerTitle">广东益农社：</span>
                    <span class="answerPage">已经上传了，根据个人需求下载吧。</span>
                  </div>
                  <div class="moreMsg">点击查看更多 ></div>
                </div>
              </div>
              <div class="commentInteract">
                <div>
                  <div @click="showBox">
                    <img src="/static/img/coursePlay/commentIcon.png">
                  </div>
                  <span>0</span>
                </div>
                <div>
                  <div>
                    <img src="/static/img/coursePlay/zanIcon.png">
                  </div>
                  <span>2</span>
                </div>
              </div>
              <div class="commentBox" v-show="editBox">
                <div class="commentEdit">
                  <el-input type="textarea" :rows="6" placeholder="欢迎留言评论～！" v-model="textarea"></el-input>
                </div>
                <div class="commentHandle">
                  <div class="cancel" @click="hideBox">取消回复</div>
                  <div class="toPush">发布</div>
                </div>
              </div>
            </div>
            <div class="more">点击查看更多</div>
          </div>
        </div>
      </div>
      <div class="other-course">
        <div class="titleTxt">相关课程</div>
        <div class="pageBox">
          <div class="oneItem" v-for="(item, index) in connectCourses" :key="index">
            <div class="courseImg">
              <img :src="item.url">
            </div>
            <div class="courseMsg">
              <div class="courseName">{{item.title}}</div>
              <div class="courseAuthor">{{item.author}}</div>
              <div class="courseTime">{{item.time}}</div>
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
      id: "", // 当前文章id
      detailData: {},
      url: "",
      connectCourses: [
        {
          url: "@/../static/img/service-details/service.png",
          id: "3b1d546eca234dcbb063ac929d864f54",
          title: "冬防果树病虫害",
          author: "admin",
          time: "12-27"
        },
        {
          url: "@/../static/img/service-details/vegetable-field.png",
          id: "5e7357aa3b3c4630860888434182d932",
          title: "早秋菠菜种植技术",
          author: "admin",
          time: "12-27"
        },
        {
          url: "@/../static/img/service-details/vegetables.png",
          id: "df055ea8234d46c68c89ad93a09a2239",
          title: "反季节西兰花栽培技术",
          author: "admin",
          time: "12:27"
        }
      ], // 相关课程
      isA: true,
      isB: false,
      show: true,
      tabsName: ["课程简介"],
      //  tabsName: ["课程简介","课程评价"],
      nowIndex: 0,
      textarea: "",
      editBox: false,
      toplay: true,
      getDom: "",
      videoLength: 0,
      videoMin: "00",
      videoSec: "00",
      currentLength: 0,
      currentMin: "00",
      currentSec: "00",
      setTime: "",
      defVoiceL: 50,
      voiceState: false,
      playLength: 0,
      now: 0,
      playtime: 0,
      bartime: 0
    };
  },
  methods: {
    // 获取页面信息
    getData(id) {
      getDetailData({
        train_id: id
      }).then(res => {
        if (res.success) {
          this.detailData = res.returnMap;
          this.$refs.video.src = res.returnMap.video;
          this.videoInit();
        }
      });
    },
    mouseDown() {
      this.vedioPause();
      this.toplay = true;
    },
    mouseUp() {
      setTimeout(this.vedioPlay(), 120);
      this.toplay = false;
      //兼容ie的change事件顺序
      this.currentLength = this.videoLength * this.playLength * 0.01;
      this.getDom.currentTime = this.currentLength;
    },
    eleChange() {
      this.currentLength = this.videoLength * this.playLength * 0.01;
      this.getDom.currentTime = this.currentLength;
    },
    collectionHandle() {
      if (this.isA) {
        (this.isA = false), (this.isB = true), (this.show = false);
      } else {
        (this.isA = true), (this.isB = false), (this.show = true);
      }
    },
    //点击切换选项卡
    tabsSwitch(index) {
      this.nowIndex = index;
    },

    showBox() {
      if (this.editBox == false) {
        this.editBox = true;
      } else {
        this.editBox = false;
      }
    },

    hideBox() {
      this.editBox = false;
    },
    changeToplay() {
      this.toplay = !this.toplay;
    },
    //点击播放
    vedioPlay() {
      this.getDom.play();
      this.setTime = setInterval(() => {
        //获取当前播放时长
        this.currentLength = parseInt(this.getDom.currentTime);
        if (this.currentLength < 60) {
          if (this.currentLength < 10) {
            this.currentSec = "0" + Math.ceil(this.currentLength);
          } else {
            this.currentSec = Math.ceil(this.currentLength);
          }
        } else if (this.currentLength / 60 > 0) {
          if (this.currentLength / 60 < 10) {
            this.currentMin = "0" + Math.floor(this.currentLength / 60);
          } else {
            this.currentMin = Math.floor(this.currentLength / 60);
          }
          this.currentSec =
            this.currentLength % 60 < 10
              ? "0" + Math.ceil(this.currentLength % 60)
              : Math.ceil(this.currentLength % 60);
        }
        if (this.getDom.ended) {
          this.toplay = true;
          clearInterval(this.setTime);
        }
        this.playLength = (this.getDom.currentTime / this.videoLength) * 100;
      }, 100);
    },
    //点击暂停
    vedioPause() {
      this.getDom.pause();
      clearInterval(this.setTime);
    },
    // 初始化video组件
    videoInit() {
      //初始化获取播放时长
      this.getDom = document.getElementById("myvideo");
      setTimeout(() => {
        this.videoLength = parseInt(this.getDom.duration);
        this.getDom.volume = this.defVoiceL * 0.01;
        if (this.videoLength < 60) {
          this.videoSec = this.videoLength;
        } else if (this.videoLength / 60 > 0) {
          if (this.videoLength / 60 < 10) {
            this.videoMin = "0" + Math.floor(this.videoLength / 60);
          } else {
            this.videoMin = Math.floor(this.videoLength / 60);
          }
          this.videoSec =
            this.videoLength % 60 < 10
              ? "0" + this.currentSec
              : this.videoLength % 60;
        }
      }, 1500);
    },
    //进入全屏
    FullScreen() {
      let ele = this.getDom;
      if (ele.requestFullscreen) {
        ele.requestFullscreen(); //w3c标准
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen(); //火狐浏览器的请求全屏
      } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen(); //谷歌、Safari浏览器的请求全屏
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen(); //IE浏览器的请求全屏
      } else {
        console.log("进入全屏失败");
      }
    },
    //ele slider初始化
    formatTooltip(voiceL) {
      return voiceL / 100;
    },
    //静音切换
    changevState() {
      this.voiceState = !this.voiceState;
      this.voiceState ? (this.defVoiceL = 0) : (this.defVoiceL = 50);
    },
    //全局播放
    allPlay() {
      if (this.toplay) {
        this.toplay = false;
        this.vedioPlay();
      } else {
        this.toplay = true;
        this.vedioPause();
      }
    }
  },
  mounted() {
    this.getData(this.$route.query.id);
  },
  watch: {
    defVoiceL: function(newV) {
      //音量滑动条
      this.getDom.volume = newV * 0.01;
      this.voiceState = this.getDom.volume === 0 ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
.coursePlay {
  font-size: 0px;
  min-width: 1200px;
  .top-tag {
    margin-top: 22px;
    div {
      display: inline-block;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
    }
    .detailTxt {
      color: #999999;
    }
  }
  .top-title {
    margin-top: 24px;
    font-size: 32px;
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
  }
  .video-box {
    position: relative;
    margin-top: 28px;
    .pauseBtn {
      position: absolute;
      top: 45%;
      left: 50%;
      height: 68px;
      width: 68px;
      background: url(/static/img/coursePlay/bgc.png) no-repeat;
      opacity: 0.8;
      z-index: 99;
      transform: translateX(-50%);
      .pausePic{
        height: 32px;
        width: 36px;
        padding: 19px
      }
    }
  }

  .video-control {
    position: relative;
    width: 1200px;
    height: 56px;
    background: #282828;
    color: rgba(153, 153, 153, 1);
    font-size: 12px;
    float: left;
    padding: 10px 20px 10px 20px;
    box-sizing: border-box;
    .controlL {
      padding: 4px 0;
      float: left;
      .control-play {
        height: 24px;
        width: 20px;
        float: left;
        cursor: pointer;
        .toplay {
          height: 24px;
          width: 20px;
          background: url(/static/img/coursePlay/pause.png) no-repeat;
          background-size: 24px;
        }
        .topause {
          height: 24px;
          width: 20px;
          background: url(/static/img/coursePlay/play.png) no-repeat;
          background-size: 24px;
        }
      }
      .control-time {
        float: left;
        width: 95px;
        margin: 4px 20px;
      }
    }
    .controlR {
      width: 242px;
      position: absolute;
      right: 18px;
      float: left;
      .block {
      float: left;
        width: 100px;
      }
      .control-voice {
        float: left;
        height: 24px;
        width: 24px;
        margin: 6px 10px 6px 10px;
        background: url(/static/img/coursePlay/voice.png) no-repeat;
        background-size: 22px;
      }
      .control-silence {
        float: left;
        background: url(/static/img/coursePlay/silence.png) no-repeat;
        background-size: 22px;
      }
      .control-vlength {
        float: left;
        width: 100px;
        height: 4px;
        background: rgba(255, 255, 255, 1);
        opacity: 0.6;
        border-radius: 2px;
      }
      .control-vlength-cover {
        float: left;
        // position: absolute;
        // left: 1049px;
        width: 50px;
        height: 4px;
        background: rgba(26, 153, 47, 1);
        border-radius: 2px;
        z-index: 99;
      }
      .control-setting {
        float: left;
        height: 24px;
        width: 24px;
        margin: 6px 10px 6px 20px;
        cursor: pointer;
        background: url(/static/img/coursePlay/set.png) no-repeat;
        background-size: 23px;
      }
      .control-fullScreen {
        float: left;
        height: 24px;
        width: 24px;
        margin: 6px 10px 6px 10px;
        cursor: pointer;
        background: url(/static/img/coursePlay/magnify.png) no-repeat;
        background-size: 22px;
      }
    }
  }
  .video-detail {
    width: 1200px;
    height: 56px;
    margin-top: 56px;
    background: #2f2f2f;
    color: rgba(153, 153, 153, 1);
    font-size: 14px;
    .pageDetail {
      display: inline-block;
      margin-top: 20px;
      margin-left: 20px;
      div {
        display: inline-block;
      }
      .collection {
        cursor: pointer;
        margin-left: 40px;
        .collectionImg {
          background: url(/static/img/coursePlay/collection1.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .collectTxt {
          margin-left: 5px;
        }
      }
      .collection-click {
        cursor: pointer;
        margin-left: 40px;
        .collectionImg {
          background: url(/static/img/coursePlay/collection3.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .collectTxt {
          margin-left: 5px;
          color: #fe800d;
        }
      }
      .share {
        cursor: pointer;
        margin-left: 40px;
        .shareImg {
          background: url(/static/img/coursePlay/share1.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .shareTxt {
          margin-left: 5px;
        }
      }
      .download {
        cursor: pointer;
        margin-left: 40px;
        .downloadImg {
          background: url(/static/img/coursePlay/download1.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .downloadTxt {
          margin-left: 5px;
        }
      }
      .collection:hover {
        cursor: pointer;
        margin-left: 40px;
        .collectionImg {
          background: url(/static/img/coursePlay/collection2.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .collectTxt {
          margin-left: 5px;
          color: #238ffe;
        }
      }
      .share:hover {
        cursor: pointer;
        margin-left: 40px;
        .shareImg {
          background: url(/static/img/coursePlay/share2.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .shareTxt {
          margin-left: 5px;
          color: #238ffe;
        }
      }
      .download:hover {
        cursor: pointer;
        margin-left: 40px;
        .downloadImg {
          background: url(/static/img/coursePlay/download2.png);
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-bottom: 5px;
        }
        .downloadTxt {
          margin-left: 5px;
          color: #238ffe;
        }
      }
    }
  }
  .course-Detail {
    margin-top: 24px;
    margin-bottom: 52px;
    display: inline-block;
    vertical-align: top;
    width: 880px;
    border: 1px solid rgba(237, 237, 237, 1);
    .courseNav {
      height: 56px;
      border-bottom: 1px solid rgba(237, 237, 237, 1);
      .navDetail {
        margin-left: 20px;
        width: 120px;
        display: inline-block;
        font-size: 18px;
        text-align: center;
        line-height: 56px;
        font-weight: bold;
        cursor: pointer;
      }
      .navDetail.active {
        margin-left: 20px;
        width: 120px;
        display: inline-block;
        font-size: 18px;
        text-align: center;
        line-height: 56px;
        font-weight: bold;
        border-bottom: 2px solid $base-color;
        color: $base-color;
      }
    }
    .courseBrief {
      font-size: 16px;
      padding: 20px 28px;
      min-height: 250px;
      .pushBtn {
        margin-top: 16px;
        width: 120px;
        height: 40px;
        background: $base-color;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        float: right;
        cursor: pointer;
      }
      .bar {
        margin-top: 80px;
        height: 56px;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
        .barTxt {
          display: inline-block;
          height: 56px;
          width: 100px;
          font-size: 18px;
          font-weight: bold;
          line-height: 56px;
          text-align: center;
          border-bottom: 2px solid $base-color;
        }
      }
      .comment {
        .commentItem {
          padding: 28px 0px 28px 8px;
          border-bottom: 1px solid rgba(237, 237, 237, 1);
          .commentMsg {
            .headImg {
              display: inline-block;
              width: 46px;
              height: 46px;
            }
            .commentDetail {
              display: inline-block;
              vertical-align: top;
              margin-left: 20px;
              .commentAuthor {
                font-size: 14px;
                font-weight: bold;
                color: rgba(102, 102, 102, 1);
              }
              .commentDate {
                margin-left: 30px;
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
              }
              .commentTime {
                margin-left: 12px;
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
              }
              .commentPage {
                margin-top: 22px;
                font-size: 14px;
              }
            }
          }
          .answerBox {
            .triangle {
              margin-left: 110px;
              margin-top: 24px;
              border-style: solid;
              border-width: 10px 8px 12px 8px;
              border-color: transparent transparent rgba(247, 247, 247, 1)
                transparent;
              width: 0px;
              height: 0px;
            }
            .answerMsg {
              margin: 0px 0px 24px auto;
              width: 750px;
              background: rgba(247, 247, 247, 1);
              padding: 16px 20px;
              box-sizing: border-box;
              .answerItem {
                padding-bottom: 10px;
                .answerTitle {
                  color: rgba(102, 102, 102, 1);
                  font-size: 14px;
                  font-weight: bold;
                }
                .answerPage {
                  font-size: 14px;
                }
              }
              .moreMsg {
                cursor: pointer;
                font-size: 14px;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
          .commentInteract {
            text-align: right;
            margin-top: 10px;
            div {
              display: inline-block;
              margin-left: 20px;
              div {
                display: inline-block;
                cursor: pointer;
              }
              span {
                vertical-align: top;
                color: rgba(170, 170, 170, 1);
                font-size: 14px;
                margin-left: 8px;
              }
            }
          }
          .commentBox {
            .commentEdit {
              width: 750px;
              margin: 24px 0px 12px auto;
            }
            .commentHandle {
              text-align: right;
              .cancel {
                display: inline-block;
                color: rgba(153, 153, 153, 1);
                cursor: pointer;
              }
              .toPush {
                display: inline-block;
                margin-left: 24px;
                color: $base-color;
                border: 1px solid $base-color;
                padding: 1px 17px;
                border-radius: 4px;
                cursor: pointer;
              }
            }
          }
        }
        .more {
          margin: 22px auto 0px auto;
          width: 165px;
          height: 40px;
          background: rgba(237, 237, 237, 1);
          text-align: center;
          line-height: 40px;
          color: rgba(102, 102, 102, 1);
          cursor: pointer;
        }
      }
    }
  }
  .other-course {
    margin-top: 24px;
    margin-left: 16px;
    margin-bottom: 52px;
    display: inline-block;
    width: 300px;
    border: 1px solid rgba(237, 237, 237, 1);
    .titleTxt {
      height: 26px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid rgba(237, 237, 237, 1);
      padding: 15px 20px;
    }
    .pageBox {
      margin-bottom: 20px;
      .oneItem {
        height: 65px;
        padding: 18px 20px;
        .courseImg {
          display: inline-block;
          width: 80px;
          height: 80px;
          float:left;
        }
        .courseMsg {
          vertical-align: top;
          display: inline-block;
          margin-left: 12px;
          width: 154px;
          .courseName {
            margin-top: 5px;
            font-size: 14px;
            font-weight: bold;
          }
          .courseAuthor {
            margin-top: 35px;
            display: inline-block;
            font-size: 12px;
            color: #999999;
          }
          .courseTime {
            margin-left: 76px;
            display: inline-block;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.controlR {
  .el-slider__button {
    width: 10px;
    height: 10px;
    margin-bottom: 2px;
    border: solid 0px #1a992f;
  }
  .el-slider__runway {
    height: 4px;
  }
  .el-slider__bar {
    height: 4px;
  }
}
.video-bar {
  .el-slider {
    height: 4px;
  }
  .el-slider__button {
    width: 4px;
    height: 4px;
    margin-bottom: 2px;
    border: solid 0px #1a992f;
  }
  .el-slider__runway {
    height: 4px;
    margin: 0px;
  }
  .el-slider__bar {
    height: 4px;
  }
}
</style>
