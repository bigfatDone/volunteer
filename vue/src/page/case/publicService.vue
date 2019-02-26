<template>
  <div class="publicService">
    <div class="imgTop">
      <div class="txtTitle">公益服务</div>
    </div>
    <div class="w1200">
      <div class="selectTab">
        <div class="nav">
          <div class="navLeft">分类：</div>
          <div class="navRight">
            <div
              v-for="(tab, index) in publicTabs"
              :key="index"
              @click="publicTabClick(tab.dictionaries_id)"
              class="navDetail"
              :class="tab.dictionaries_id === getId ? 'navDetail2' : ''"
            >{{tab.name}}</div>
          </div>
        </div>

        <div v-for="list in publicAllList" :key="list.policy_news_id" class="oneItem">
          <router-link
            :to="{ path: '/publicServiceInfo', query: { id: list.policy_news_id }}"
             target="_blank"
            class="item-link"
          >
            <div class="imgItem">
              <img :src="list.photos">
            </div>
            <div class="txtItem">
              <div class="txtTitle">{{list.title}}</div>
              <div class="txtPage">{{list.second_title}}</div>
              <div class="timeItem">{{list.creat_time}}</div>
            </div>
          </router-link>
        </div>

        <div class="pagination">
          <!-- <div class="numTotal">共2222条</div> -->
          <el-pagination
            background
            @current-change="getCurrentChange"
            :current-page.sync="currentPage"
            :page-size="5"
            layout="total, prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="totalNum"
          ></el-pagination>
        </div>
        <!-- </el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
  </div>
</template>

<script>
import { getPublicType } from "@/api/index";
import { getPublicList } from "@/api/base/publicService";
export default {
  data() {
    return {
      //activeTab: '146f2e82833b475f82bea6bfd0ae810c',
      publicTabs: [],
      publicAllList: [],
      currentPage: 0,
      id: "",
      totalNum: 0,
      getId: ""
    };
  },
  mounted() {
    this.getPublicTabsList();
    this.getPublicAllList();
  },
  methods: {
    // 获取公益服务类型列表
    getPublicTabsList() {
      if (this.$route.query.id) {
        this.getId = this.$route.query.id;
      } else {
        this.getId = "";
      }
      getPublicType().then(res => {
        if (res.success) {
          this.publicTabs = res.resultList;
          this.publicTabs.unshift({
            dictionaries_id: "",
            name: "全部",
            parent_id: ""
          });
          this.publicTabs.dictionaries_id == this.getId;
        }
      });
    },

    // 获取第一次加载进来的公益服务内容列表
    getPublicAllList() {
      //this.getId = this.$route.query.id
      getPublicList({
        type: this.getId,
        showCount: 5
      }).then(res => {
        if (res.success) {
          this.publicAllList = res.resultList;
          this.totalNum = this.publicAllList[0].totalResult;
        }
      });
    },

    //点击切换公益服务列表
    publicTabClick(id) {
      // window.scrollTo(0, 0)
      this.id = id;
      this.publicAllList = [];
      this.totalNum = 0;
      this.currentPage = 1; //每一次切换分页页面都会回到1
      this.getId = id;
      getPublicList({
        type: this.id,
        showCount: 5
      }).then(res => {
        if (res.success) {
          this.publicAllList = res.resultList;
          this.totalNum = this.publicAllList[0].totalResult;
        }
      });
    },

    // //点击切换公益服务列表
    // handleClick(id) {
    //   this.id = id
    //   this.publicAllList = []
    //   this.currentPage = 1 //每一次切换分页页面都会回到1
    //   getPublicList({
    //     type: this.id,
    //     showCount: 5,
    //   }).then(res => {
    //     if(res.success) {
    //       this.publicAllList = res.resultList
    //       this.totalNum = this.publicAllList[0].totalResult
    //     }
    //   })
    // },

    //获取当前选择的分页的公益服务列表
    getCurrentChange(val) {
      window.scrollTo(0, 0);
      getPublicList({
        type: this.getId,
        showCount: 5,
        currentPage: val
      }).then(res => {
        if (res.success) {
          this.publicAllList = res.resultList;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.publicService {
  .imgTop {
    position: relative;
    height: 350px;
    background: url("/static/img/publicService-imgTop.png") center top no-repeat;
    overflow: hidden;
    min-width: 1200px;
    .txtTitle {
      width: 300px;
      margin: 148px 25% 133px auto;
      text-align: center;
      font-size: 72px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .selectTab {
    width: 1200px;
    margin-top: 30px;
    margin-bottom: 80px;
    display: inline-block;
    border: 1px solid rgba(238, 238, 238, 1);
    .nav {
      width: 1200px;
      height: 110px;
      border-bottom: 1px solid rgba(242, 242, 242, 1);
      .navLeft {
        display: inline-block;
        width: 100px;
        height: 110px;
        background: rgba(249, 249, 249, 1);
        font-size: 20px;
        text-align: center;
        line-height: 110px;
        color: rgba(51, 51, 51, 1);
      }
      .navRight {
        position: absolute;
        display: inline-block;
        width: 1099px;
        height: 110px;
        .navDetail {
          float: left;
          margin-left: 25px;
          height: 30px;
          font-size: 20px;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          padding: 0 10px;
          margin-top: 18px;
        }
        .navDetail2 {
          background: #5ab261;
          float: left;
          margin-left: 25px;
          height: 30px;
          font-size: 20px;
          color: rgb(255, 255, 255);
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          padding: 0 10px;
          margin-top: 18px;
        }
      }
    }
    .oneItem {
      padding-top: 22px;
      padding-left: 22px;
      padding-bottom: 22px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      .item-link {
        display: block;
        .imgItem {
          width: 252px;
          height: 160px;
          display: inline-block;
          overflow: hidden;
        }
        .txtItem {
          position: absolute;
          display: inline-block;
          width: 847px;
          margin-left: 30px;
          .txtTitle {
            font-size: 20px;
            font-family: Adobe Heiti Std R;
            color: #222;
            line-height: 21px;
            margin-top: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .txtPage {
            position: absolute;
            margin-top: 24px;
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .timeItem {
            position: absolute;
            margin-top: 110px;
            font-size: 14px;
            color: rgba(204, 204, 204, 1);
          }
        }
      }
    }
    .pagination {
      height: 105px;
      text-align: center;
      // .numTotal{
      //   margin-left: 23px;
      //   float: left;
      //   margin-top: 30px;
      //   position: absolute;
      // }
      .el-pagination {
        margin-top: 30px;
        display: inline-block;
      }
    }
    // }
  }
}
</style>
