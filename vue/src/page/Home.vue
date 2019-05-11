<template>
  <div class="container">
    <div class="guide">
      <div class="swipper">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide class="swipper-img">
          <span @click="toDetail('12')"><img src="~@/../static/images/swiper1.jpg" alt></span>
          </swiper-slide>
          <swiper-slide class="swipper-img">
            <span @click="toDetail('13')"><img src="~@/../static/images/swiper2.jpg" alt></span>
          </swiper-slide>
          <swiper-slide class="swipper-img">
            <span @click="toDetail('23')"><img src="~@/../static/images/swiper3.jpg" alt></span>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="guide-content">
        <div
          class="guide-to tohelp @mouseover="
          @mouseenter=" helpState = !helpState"
          v-show="helpState"
        >
          <img src="~@/../static/images/help.png" alt>
          <div class="guide-option">求助者</div>
        </div>
        <div class="guide-to help-detail" @mouseleave=" helpState = !helpState" v-show="!helpState">
          <router-link to="/help" class="option" tag="div">>>&nbsp;寻求帮助</router-link>
          <router-link to="/volunteerRegister" class="option" tag="div">>>&nbsp;注册志愿者</router-link>
        </div>
        <div
          class="guide-to tovolunteer"
          @mouseenter=" volunteerState = !volunteerState"
          v-show="volunteerState"
        >
          <img src="~@/../static/images/tovolunteer.png" alt>
          <div class="guide-option">志愿者</div>
        </div>
        <div
          class="guide-to volunteer-detail"
          @mouseleave=" volunteerState = !volunteerState"
          v-show="!volunteerState"
        >
          <router-link to="/volunteerRegister" class="option" tag="div">>>&nbsp;实名注册</router-link>
          <router-link to="/project" class="option" tag="div">>>&nbsp;参加项目</router-link>
        </div>
        <div
          class="guide-to tocommunity"
          @mouseenter=" communityState = !communityState"
          v-show="communityState"
        >
          <img src="~@/../static/images/tocommunity.png" alt>
          <div class="guide-option">社区服务</div>
        </div>
        <div
          class="guide-to community-detail"
          @mouseleave=" communityState = !communityState"
          v-show="!communityState"
        >
          <router-link to="/communityRegister" class="option" tag="div">>>&nbsp;社区注册</router-link>
          <router-link to="/project" class="option" tag="div">>>&nbsp;查看项目</router-link>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="volunteer-info info-left clearfix">
        <div class="title minHeight">
          <p>
            <span>志愿快讯</span>
            <router-link :to="{name:'news'}" tag="span">更多>></router-link>
          </p>
        </div>
        <div class="details">
          <ul>
            <li class="clearfix"  v-for="(item,index) in newsData"
            :key="index"
            @click="toDetail(item.id)">
              <span>
                <img src="~@/../static/images/point.png" alt>
              </span>
              <span class="ys-text-ellipsis">{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="volunteer-info info-right clearfix">
        <div class="title minHeight">
          <p>
            <span>志愿人物</span>
            <router-link :to="{name:'personage'}" tag="span">更多>></router-link>
          </p>
        </div>
        <div class="details">
          <ul>
            <li class="clearfix"  v-for="(item,index) in personageData"
            :key="index"
            @click="toPersonage(item.id)">
              <span>
                <img src="~@/../static/images/point.png" alt>
              </span>
              <span class="ys-text-ellipsis">{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="activity">
      <div class="pic pic-left">
        <img src="~@/../static/images/gotoCommunity.jpg" alt>
      </div>
      <div class="pic">
        <img src="~@/../static/images/useBike.jpg" alt>
      </div>
    </div>
    <div class="excellent">
      <div class="title">
        <p>
          <span>志愿项目</span>
          <router-link to="/project" class="option" tag="span" style="cursor:pointer;">更多>></router-link>
        </p>
      </div>
      <div class="icon clearfix">
        <div
          class="pic"
          v-for="(project,index) in projectData"
          :key="index"
          @click="toProject(project.id,project.type)"
        >
          <img :src="project.pic" alt>
          <div class="name ys-text-ellipsis">{{project.title}}</div>
        </div>
      </div>
    </div>
    <div class="link">
      <a href="http://www.bjyouth.gov.cn/">
        <img src="~@/../static/images/link1.png" alt>
      </a>
      <a href="http://www.cvf.org.cn/">
        <img src="~@/../static/images/link2.png" alt>
      </a>
      <a href="http://www.zgzyz.org.cn/">
        <img src="~@/../static/images/link3.png" alt>
      </a>
      <a href="http://www.bjwmb.gov.cn/">
        <img src="~@/../static/images/link4.png" alt>
      </a>
      <a href="http://www.bjshjs.gov.cn/">
        <img src="~@/../static/images/link5.png" alt>
      </a>
      <a href="http://www.beijingyouth.org.cn/">
        <img src="~@/../static/images/link6.png" alt>
      </a>
      <a href="http://www.chinavolunteer.cn/">
        <img src="~@/../static/images/link7.png" alt>
      </a>
    </div>
  </div>
</template>
<script>
import { getNews, getProjectAside,getPersonageAside } from "@/api/common";
export default {
  data() {
    return {
      newsData: [],
      projectData: [],
      personageData: [],
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        loop: true
      },
      helpState: true,
      volunteerState: true,
      communityState: true
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
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
   // 获取志愿人物
    toPersonageAside() {
      getPersonageAside({}).then(res => {
        this.personageData = res;
        console.log(this.personageData)
      });
    },
    // 跳转志愿人物详情
    toPersonage(val) {
      this.$router.push({
        name: "detail",
        query: {
          id: val,
          type: "personage"
        }
      });
    },
    // 获取项目
    toProjectAside() {
      getProjectAside({}).then(res => {
        this.projectData = res;
      });
    },
    // 跳转项目
    toProject(val, val1) {
      this.$router.push({
        name: "project-detail",
        query: { id: val, type: val1 }
      });
    }
  },
  mounted() {
    this.toGetNews();
    this.toProjectAside();
    this.toPersonageAside();
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .wrap {
    margin-top: 10px;
    img {
      width: 1000px;
      height: 100px;
    }
  }
  .guide {
    margin-top: 10px;
    height: 400px;
    .swipper {
      width: 600px;
      background-color: gray;
      float: left;
      .swipper-img img {
        width: 600px;
        height: 400px;
        cursor: pointer;
      }
    }
    .guide-content {
      width: 400px;
      height: 400px;
      float: left;
      .guide-to {
        display: flex;
        width: 360px;
        height: 125px;
        margin: 0 20px;
        padding-left: 20px;
        align-items: center;
        border-radius: 10px;
        img {
          height: 100px;
          width: 110px;
        }
        .guide-option {
          padding-left: 30px;
          color: #fff;
          font-size: 40px;
        }
      }
      .tohelp {
        background-color: #f87543;
      }
      .help-detail {
        width: 380px;
        display: block;
        padding-top: 10px;
        padding-left: 0;
        box-sizing: border-box;
        background-color: #f87543;
        .option {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .option:hover {
          color: $base-color;
          background: #fff;
        }
      }
      .tovolunteer {
        margin: 10px 20px;
        background-color: #96c933;
      }
      .volunteer-detail {
        display: block;
        width: 380px;
        padding-top: 10px;
        padding-left: 0;
        margin: 10px 20px;
        box-sizing: border-box;
        background-color: #96c933;
        .option {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .option:hover {
          color: $base-color;
          background: #fff;
        }
      }
      .tocommunity {
        background-color: #33b4f4;
      }
      .community-detail {
        width: 380px;
        display: block;
        padding-top: 10px;
        padding-left: 0;
        box-sizing: border-box;
        background-color: #33b4f4;
        .option {
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        .option:hover {
          color: $base-color;
          background: #fff;
        }
      }
    }
  }
  .info {
    width: 1000px;
    height: 405px;
    margin-top: 10px;
    .volunteer-info {
      width: 480px;
      float: left;
      border-left: 2px solid $base-border-color;
      border-right: 2px solid $base-border-color;
      border-bottom: 2px solid $base-border-color;
      .title {
        height: 40px;
        line-height: 40px;
        background-color: $base-background-color;
        p {
          display: flex;
          padding: 0 5px 0 0;
          justify-content: space-between;
          span:nth-child(1) {
            width: 120px;
            height: 38px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            border-top: 2px solid #0088cc;
            background-color: #fff;
          }
          span:nth-child(2) {
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
      .details {
        margin-top: 10px;
        height: 345px;
        overflow-y: hidden;
        ul {
          li {
            display: flex;
            height: 26px;
            font-size: 16px;
            align-items: center;
            cursor: pointer;
            &:hover {
              color: rgb(238, 26, 26);
            }
            span:nth-child(1) {
              padding: 0 10px;
            }
            img {
              height: 10px;
              width: 10px;
            }
          }
        }
      }
    }
    .info-left {
      margin-right: 30px;
    }
  }
  .activity {
    height: 90px;
    .pic {
      float: left;
      img {
        height: 90px;
        width: 490px;
      }
    }
    .pic-left {
      margin-right: 20px;
    }
  }
  .excellent {
    width: 1000px;
    height: 210px;
    margin-top: 10px;
    box-sizing: border-box;
    border: 1px solid $base-border-color;
    .title {
      height: 40px;
      line-height: 40px;
      background-color: $base-background-color;
      p {
        display: flex;
        padding: 0 5px 0 0;
        justify-content: space-between;
        span:nth-child(1) {
          width: 120px;
          height: 38px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          border-top: 2px solid #0088cc;
          background-color: #fff;
        }
        span:nth-child(2) {
          font-size: 16px;
        }
      }
    }
    .icon {
      padding: 10px 20px;
      height: 170px;
      width: 100%;
      overflow: hidden;
      .pic {
        width: 120px;
        height: 150px;
        float: left;
        margin-right: 20px;
        border-radius: 5px;
        padding-bottom: 40px;
        cursor: pointer;
        img {
          width: 120px;
          height: 110px;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
        .name {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          text-align: center;
          color: #676060;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          border: 1px solid $base-border-color;
        }
      }
    }
  }
  .link {
    display: flex;
    width: 1000px;
    height: 70px;
    margin-top: 10px;
    border: 1px solid $base-border-color;
    align-items: center;
    justify-content: space-around;
    img {
      width: 120px;
      height: 50px;
    }
  }
}
</style>

