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
        <div class="title">
          <span>{{this.data.title}}</span>
          <div class="going" v-show="this.$route.query.type == 1">进行中</div>
          <div class="going ending" v-show="this.$route.query.type == 0">已结束</div>
        </div>
        <div class="publish">
          <div class="icon">
            <img :src="this.data.pic" alt>
          </div>
          <div class="publish-detail">
            <p class="item clearfix">
              <span class="object">项目地点：</span>
              <span class="content">{{this.data.address}}</span>
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
                <span class="tomark">{{this.data.st_time}}</span>至
                <span class="tomark">{{this.data.end_time}}</span>
              </span>
            </p>
            <p class="item clearfix">
              <span class="object">项目日期：</span>
              <span class="content">
                <span class="tomark">{{this.data.work_st_time}}</span>至
                <span class="tomark">{{this.data.work_end_time}}</span>
              </span>
            </p>
            <p class="item clearfix">
              <span class="object">发布日期：</span>
              <span class="content">
                <span class="tomark">{{this.data.date}}</span>
              </span>
            </p>
            <p class="item clearfix">
              <span class="object">服务时间：</span>
              <span class="content">{{formDate()}}</span>
            </p>
            <button class="apply unselect" v-show="this.type == 1" @click="apply()">报名</button>
            <button class="apply select" v-show="this.type != 1">已结束</button>
          </div>
        </div>
        <div class="project">
          <div class="des">
            <div class="title">
              <span>计划岗位：{{this.data.number}}&nbsp;</span>
              <span>已经招募：5</span>
            </div>
            <div class="box">
              <div class="detail">
                <p>岗位ID</p>
                <p>{{this.data.id}}</p>
              </div>
              <div class="detail">
                <p>岗位描述：</p>
                <p>{{this.data.descr}}</p>
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
              <div class="detail">{{this.data.content}}</div>
            </div>
          </div>
        </div>
      </section>
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
        <div class="recommend recommend-news">
          <div class="title">社区资料</div>
          <ul class="all">
            <li>
              <span>名称：</span>
              <span>{{this.data.realname}}</span>
            </li>
            <li>
              <span>地址：</span>
              <span>{{this.data.cm_address}}</span>
            </li>
            <li>
              <span>联系人：</span>
              <span>{{this.data.manager}}</span>
            </li>
            <li>
              <span>联系人手机号码：</span>
              <span>{{this.data.phone}}</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import { getProjectDetail,getEntry,getHadEntry } from "@/api/project";
import { getNews, getProjectAside,getPower } from "@/api/common";
export default {
  data() {
    return {
      flag:'0',
      id: "",
      type: "",
      data: {},
      newsData: [],
      projectData: [],
      power:""
    };
  },
  methods: {
     // 获取权限
    toPower() {
      getPower({
        id: this.$store.state.userInfo.id
      }).then(res => {
        this.power = res[0].type;
      });
    },
    formDate() {
      let st = new Date(this.data.work_st_time).getTime();
      let ed = new Date(this.data.work_end_time).getTime();
      return Math.ceil(Math.ceil((ed-st+1)/(3600*1000*24)));
    },
    apply() {
      let status = this.$store.state.userInfo.id;
      let grade = this.$store.state.userInfo.grade;
      if(status === undefined){
        this.$message.error('请登录之后再报名！')
      }else {
        if( grade == 3) {
          this.$message.error('社区人员无法报名！')
        }else {
          if( this.power == 1){
            if( this.flag == 0) {
              this.toEntry();
            }else {
              this.$message.error('你已报名！');
            }
          }else {
            this.$message.error('没有权限！');
          }
        }
      }
    },
    // 获取项目详情
    toProjectDetail() {
      getProjectDetail({
        id: this.$route.query.id
      }).then(res => {
        this.data = res[0];
        (this.id = this.$route.query.id), (this.type = this.$route.query.type);
      });
    },
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
        console.log(this.projectData);
      });
    },
    // 跳转项目
    toProject(val, val1) {
      this.$router.push({
        name: "project-detail",
        query: { id: val, type: val1 }
      });
    },
    // 志愿者报名志愿项目
    toEntry() {
      getEntry({
        user_id: this.$store.state.userInfo.id,
        project_id: this.id,
        time: this.getNowFormatDate()
      }).then( res => {
        this.$message.success(res.msg);
        this.toHadEntry();
      })
    },
    // 判断志愿者报名志愿项目
    toHadEntry() {
      getHadEntry({
        user_id: this.$store.state.userInfo.id,
        project_id: this.$route.query.id,
      }).then( res => {
        this.flag = res.flag;
      })
    },
      // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  mounted() {
    this.toProjectDetail();
    this.toGetNews();
    this.toProjectAside();
    this.toHadEntry();
    this.toPower();
  },
  watch: {
    $route(to, from) {
      this.toProjectDetail();
      this.toHadEntry();
      this.toPower();
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
        .ending {
          background-color: lightgray;
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
            letter-spacing: 2px;
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

