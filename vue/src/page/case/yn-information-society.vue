<template>
  <div class="ynInformationSociety">
    <div class="w1200">
      <!-- 头部导航 -->
      <div class="head">
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >益农信息社</el-breadcrumb-item>
            <el-breadcrumb-item>{{ levelName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="tabs">
          <div class="tab1">
            <span class="tabTop">等级：</span>
            <ul>
              <li>
                <el-button type="text" @click="level=''" :class="{active:!level}">不限</el-button>
                <el-button type="text" @click="level=1" :class="{active:level==1}">A类社</el-button>
                <el-button type="text" @click="level=2" :class="{active:level==2}">B类社</el-button>
                <el-button type="text" @click="level=3" :class="{active:level==3}">县级运营中心</el-button>
              </li>
            </ul>
          </div>
          <div class="tab2">
            <span class="tabTop">区域：</span>
            <ul>
              <li>
                <el-select v-model="city" placeholder="市">
                  <el-option label="全部" value="64195"></el-option>
                  <el-option
                    v-for="(item,index) in cities"
                    :key="index"
                    :label="item.shi"
                    :value="item.xzqy_id"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-select v-model="district" placeholder="区/县">
                  <el-option label="全部" :value="this.city"></el-option>
                  <el-option
                    v-for="(item,index) in districts"
                    :key="index"
                    :label="item.xian"
                    :value="item.xzqy_id"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-select v-model="street" placeholder="街道">
                  <el-option label="全部" :value="this.district"></el-option>
                  <el-option
                    v-for="(item,index) in streets"
                    :key="index"
                    :label="item.zhen"
                    :value="item.xzqy_id"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <el-select v-model="committee" placeholder="居委会">
                  <el-option label="全部" :value="this.street"></el-option>
                  <el-option
                    v-for="(item,index) in committees"
                    :key="index"
                    :label="item.cun"
                    :value="item.xzqy_id"
                  ></el-option>
                </el-select>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 益农社展示 -->
      <div class="body">
        <ul>
          <li v-for="(list, index) in YNSLists" :key="index">
            <router-link
              :to="{ path: '/ynongClubInfor/', query: {id: list.ynsxxbls_id}}"
              class="item"
            >
              <div class="itemImg">
                <img :src="list.mendian_photo" :alt="list.ynsname">
              </div>
              <div class="middle">
                <div class="name yn-text-ellipsis">{{ list.ynsname }}</div>
                <div class="level">
                  <span
                    :class="{levelC:list.lns_type=='县级运营中心',levelB:list.lns_type=='B类社',levelA:list.lns_type=='A类社'}"
                  >{{ list.lns_type }}</span>
                </div>
              </div>
              <div class="right">
                <p class="call">
                  <label>
                    <img src="..\..\..\static\img\b-telephone.png">
                  </label>
                  {{ list.phone }}
                </p>
                <p class="address">
                  <label>
                    <img src="..\..\..\static\img\b-location.png">
                  </label>
                  <span>{{ list.address }}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="page">
          <div class="pageNum">共{{ total }}条</div>
          <div class="pagination">
            <el-pagination
              @current-change="handlePage"
              layout="prev, pager, next"
              :total="total"
              prev-text="上一页"
              next-text="下一页"
              :current-page="currentPage"
              background
              :page-size="5"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDivisions,
  getYNSocieties
} from "@/api/base/yn-information-society";

const GUANGDONGID = "64195";

export default {
  data() {
    return {
      cities: [],
      city: "",
      districts: [],
      district: "",
      streets: [],
      street: "",
      committees: [],
      committee: "",
      locationId: GUANGDONGID,
      YNSLists: [],
      currentPage: 1,
      total: 0,
      level: ""
    };
  },
  computed: {
    levelName: function() {
      let name = "不限";
      if (this.level == 1) {
        name = "A类社";
      }
      if (this.level == 2) {
        name = "B类社";
      }
      if (this.level == 3) {
        name = "县级运营中心";
      }
      return name;
    }
  },
  methods: {
    // 查询行政区域
    getLocation() {
      this.getCities();
    },
    // 初始化行政区后面的选项框
    initLocation(num) {
      switch (num) {
        case 1:
          this.committee = "";
          this.committees = [];
          break;
        case 2:
          this.committee = "";
          this.committees = [];
          this.street = "";
          this.streets = [];
          break;
        case 3:
          this.committee = "";
          this.committees = [];
          this.street = "";
          this.streets = [];
          this.district = "";
          this.districts = [];
          break;
      }
    },
    // 获取市级数据
    getCities() {
      getDivisions({
        pid: GUANGDONGID
      }).then(res => {
        if (res.success) {
          this.cities = res.resultList;
        } else {
          // console.log("请求失败");
        }
      });
    },
    // 获取区级数据
    getDistricts() {
      if (this.city && this.city != GUANGDONGID) {
        getDivisions({
          pid: this.city
        }).then(res => {
          if (res.success) {
            this.districts = res.resultList;
          } else {
            // console.log("请求失败");
          }
        });
      }
    },
    // 获取街道数据
    getStreets() {
      if (
        this.city &&
        this.city != GUANGDONGID &&
        this.district &&
        this.district != this.city
      ) {
        getDivisions({
          pid: this.district
        }).then(res => {
          if (res.success) {
            this.streets = res.resultList;
          } else {
            // console.log("请求失败");
          }
        });
      }
    },
    // 获取居委会数据
    getCommittees() {
      if (
        this.city &&
        this.city != GUANGDONGID &&
        this.district &&
        this.district != this.city &&
        this.street &&
        this.street != this.district
      ) {
        getDivisions({
          pid: this.street
        }).then(res => {
          if (res.success) {
            this.committees = res.resultList;
          } else {
            // console.log("请求失败");
          }
        });
      }
    },
    // 从数据库中获取数据，传参为该地域的xzqy_id值
    getIdYNSLists(id = GUANGDONGID) {
      if (id == '') return
      getYNSocieties({
        showCount: 5,
        xzqy_id: id,
        type: this.level ? this.level : "",
        currentPage: this.currentPage,
      }).then(res => {
        if (res.success) {
          this.YNSLists = res.resultList;
          this.total = this.YNSLists[0].totalResult;
        } else {
          this.YNSLists = [];
          this.total = 0;
          // console.log("请求失败");
        }
      });
    },
    // 监听页数点击事件
    handlePage(val) {
      this.currentPage = val;
      window.scrollTo(0,0);
      this.getIdYNSLists(this.locationId);
    }
  },
  mounted() {
    this.getLocation();
    this.getIdYNSLists();
  },
  watch: {
    // 监听市级区域选择情况
    city: function() {
      this.initLocation(3);
      this.getDistricts();
      this.locationId = this.city;
      this.currentPage = 1;
      this.getIdYNSLists(this.locationId);
    },
    // 监听区级区域选择情况
    district: function() {
      this.initLocation(2);
      this.getStreets();
      this.locationId = this.district;
      this.currentPage = 1;
      this.getIdYNSLists(this.locationId);
    },
    // 监听街道区域选择情况
    street: function() {
      this.initLocation(1);
      this.getCommittees();
      this.locationId = this.street;
      this.currentPage = 1;
      this.getIdYNSLists(this.locationId);
    },
    // 监听居委会区域选择情况
    committee: function() {
      this.locationId = this.committee;
      this.currentPage = 1;
      this.getIdYNSLists(this.locationId);
    },
    // 监听益农社等级选择情况
    level: function() {
      this.currentPage = 1;
      this.getIdYNSLists(this.locationId);
    }
  }
};
</script>

<style lang="scss" scoped>
.w1200 {
  font-size: 18px;
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;

  .head {
    margin-top: 40px;
    margin-bottom: 34px;

    .breadcrumb {
      width: 1200px;
      height: 48px;

      .el-breadcrumb {
        height: 18px;
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(51, 51, 51, 1);
        background: rgba(249, 249, 249, 1);
        padding: 16px 0 14px 31px;
      }
    }

    .tabs {
      padding: 19px 21px 26px 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(242, 242, 242, 1);

      .tabTop {
        width: 93px;
        height: 54px;
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: #333333;
        background: rgba(249, 249, 249, 1);
      }

      .tab1,
      .tab2 {
        ul,
        li {
          display: inline;
        }
      }

      .tab1 .el-button {
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        padding: 6px 8px;
        margin: 6px 20px;

        &.active {
          // padding: 2px 5px;
          background: rgba(90, 178, 97, 1);
          color: white;
        }
      }

      .tab2 .el-select {
        height: 28px;
        width: 205px;
        background: rgba(247, 247, 247, 1);
        border-radius: 4px;
        margin: 5px 20px;
      }
    }
  }

  .body {
    width: 1200px;
    max-height: 1328px;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 40px;

    ul {
      min-height: 330px;
    }
    li {
      border: 1px solid rgba(242, 242, 242, 1);
      border-bottom: none;
      &:last-of-type {
        border-bottom: 1px solid rgba(242, 242, 242, 1);
      }

      .item {
        padding: 40px 20px;
        display: block;
        overflow: hidden;

        .itemImg img {
          width: 260px;
          height: 160px;
          float: left;
        }

        .middle {
          float: left;
          margin-left: 34px;
          height: 160px;
          width: 420px;
          text-align: left;

          .name {
            height: 36px;
            font-size: 32px;
            font-family: Adobe Heiti Std R;
            font-weight: bold;
            line-height: 30px;
            color: rgba(255, 114, 4, 1);
            line-height: 36px;
            margin: 14px 0 0 0;
          }

          .level {
            height: 15px;
            font-size: 15px;
            font-family: Adobe Heiti Std R;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            margin-top: 50px;

            span {
              padding: 6px 14px;
              border-radius: 2px;
            }

            .levelA {
              background: rgba(86, 173, 233, 1);
            }

            .levelB {
              background: rgba(82, 190, 91, 1);
            }

            .levelC {
              background: rgba(230, 184, 46, 1);
            }
          }
        }

        .right {
          float: left;
          height: 160px;

          .call,
          .address {
            height: 17px;
            font-size: 20px;
            color: rgba(85, 85, 85, 1);
            margin: 32px 0;
            width: 298px;
            text-align: left;
            position: relative;

            label {
              height: 32px;
              width: 32px;
              display: inline-block;
              vertical-align: middle;
              img {
                display: inline-block;
              }
            }
            span {
              position: absolute;
              left: 40px;
              width: 298px;
              line-height: 32px;
              // margin-left: 17px;
            }
          }
        }
      }
    }

    .page {
      clear: left;
      border: 1px solid rgba(242, 242, 242, 1);

      .pageNum {
        padding: 20px 0 18px 37px;
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(34, 34, 34, 1);
        line-height: 21px;
      }

      .pagination {
        text-align: center;
        margin-bottom: 45px;
      }
    }
  }
}
</style>
