<template>
  <div class="electronicBusiness">
    <div class="header">
      <img src="@/../static/img/e-b.jpg" alt>
    </div>
    <div class="w1200">
      <!-- 侧边，栏导航栏和推荐栏 -->
      <div class="aside">
        <div class="nav">
          <!-- 农产品电商导航一级菜单 -->
          <div class="menu">
            <div class="submenu">
              <div class="title">
                <span @click="handleSelect()">农产品电商</span>
                <i class="el-icon-arrow-down"></i>
              </div>
              <ul>
                <li
                  v-for="(item,index) in primaryType"
                  :key="index"
                  class="menuItem"
                  @click="handleSelect(item.dictionaries_id)"
                >{{ item.name }}</li>
              </ul>
            </div>
          </div>
          <!-- 农资电商导航一级菜单 -->
          <div class="menu">
            <div class="submenu">
              <div class="title">
                <span>农资电商</span>
                <i class="el-icon-arrow-down"></i>
              </div>
              <ul>
                <li class="menuItem">肥料</li>
                <li class="menuItem">肥料</li>
                <li class="menuItem">肥料</li>
                <li class="menuItem">肥料</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="recommend">
          <div class="product">
            <div class="pTitle">
              <span>推荐商品</span>
            </div>
          </div>
          <div class="product"></div>
        </div>
      </div>
      <!-- 主内容 -->
      <div class="main">
        <!-- 二级导航 -->
        <div class="topRow">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>全部</el-breadcrumb-item>
            <el-breadcrumb-item>{{ primaryTypeName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ selectPrimaryTypeName }}</el-breadcrumb-item>
          </el-breadcrumb>
          <span class="sortingNum">
            商品筛选 （共
            <span>{{ totalGoods }}</span> 件相关商品）
          </span>
        </div>
        <div class="type">
          <div class="typeName">
            <span>类别</span>
          </div>
          <div class="typeList">
            <ul>
              <li v-for="(item,index) in secondType" :key="index">
                <el-button
                  type="text"
                  :class="[selectsecondType == item.dictionaries_id ? 'isActive' : '']"
                  @click="handleSelect2(item.dictionaries_id)"
                >{{ item.name }}</el-button>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods">
          <ul class="clearfix">
            <li v-for="(list, index) in goodsLists" :key="index">
              <router-link
                target="_blank"
                :to="{ path: '/commerceInfor', query: { id: list.information_id }}"
                class="goods-item"
              >
                <div class="item">
                  <div class="itemImg">
                    <img :src="list.img" :alt="list.name">
                  </div>
                  <div class="itemText">
                    <div class="tag" v-if="list.isexcellent==1?true:false">
                      <span>粤农优品</span>
                    </div>
                    <div class="name yn-text-ellipsis">{{ list.name }}</div>
                    <div class="summary">{{ list.description }}</div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @current-change="handlePage"
            layout="prev, pager, next"
            :total="totalGoods"
            prev-text="上一页"
            next-text="下一页"
            :current-page="currentPage"
            background
            :page-size="16"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGoodsType1,
  getGoodsType2,
  getGoods
} from "@/api/base/electronic-business";

export default {
  data() {
    return {
      primaryType: [], // 获取一级目录数据列表
      primaryTypeName: "", // 选取一级目录的目录名，默认是“农产品电商”
      selectPrimaryType: "", // 选择的一级目录的id
      selectPrimaryTypeName: "", // 选择的一级目录的目录名，例如“林业产品”

      secondType: [], // 获取二级目录数据列表
      selectsecondType: "", // 选择的二级目录id

      GoodsListId: "", // 获取商品的id
      goodsLists: [], // 获取的商品列表
      totalGoods: 0, // 商品总数量
      totalPages: 0, // 商品总页数
      currentPage: 1 // 当前页码
    };
  },
  watch: {
    $route() {
      this.selectPrimaryType = this.$route.query.id;
      this.GoodsListId = this.$route.query.id;
      this.getSecondTypeList();
      this.getGoodsList();
    }
  },
  methods: {
    // 获取农产品一级目录
    getPrimaryTypeList() {
      if (this.$route.query.id) {
        this.selectPrimaryType = this.$route.query.id;
        this.GoodsListId = this.selectPrimaryType;
        this.getSecondTypeList();
      } else {
        this.selectPrimaryType = "";
        this.GoodsListId = "";
      }
      getGoodsType1().then(res => {
        if (res.success) {
          this.primaryType = res.resultList;
          this.primaryTypeName = "农产品电商";
        } else {
          this.primaryType = [];
          this.primaryTypeName = "";
        }
      });
    },
    // 获取农产品二级目录
    getSecondTypeList() {
      getGoodsType2({
        dictionaries_id: this.selectPrimaryType
      })
        .then(res => {
          if (res.success) {
            this.secondType = res.resultList;
            this.selectPrimaryTypeName = res.resultList[0].fathername;
            this.secondType.unshift({
              dictionaries_id: this.selectPrimaryType,
              name: "全部"
            });
          } else {
            this.secondType = [];
            this.selectPrimaryTypeName = "";
          }
        })
        .catch(err => {});
    },
    // 获取商品列表
    getGoodsList() {
      getGoods({
        dictionaries_id: this.GoodsListId,
        currentPage: this.currentPage,
        showCount: 16
      })
        .then(res => {
          if (res.success) {
            this.goodsLists = res.resultList;
            this.totalGoods = res.resultList[0].totalResult;
          } else {
            this.goodsLists = [];
            this.totalGoods = 0;
          }
        })
        .catch(err => {});
    },
    // 监听点击一级目录
    handleSelect(id = "") {
      this.selectPrimaryType = id;
      this.getSecondTypeList();
      this.GoodsListId = this.selectPrimaryType;
      this.currentPage = 1;
      this.getGoodsList();
      this.selectsecondType = "";
    },
    // 监听点击二级目录
    handleSelect2(key) {
      this.selectsecondType = key;
      this.GoodsListId = this.selectsecondType;
      this.currentPage = 1;
      this.getGoodsList();
    },
    // 监听点击分页栏
    handlePage(val) {
      window.scrollTo(0, 0);
      this.currentPage = val;
      this.getGoodsList();
    }
  },
  mounted() {
    // 自动获取一级目录导航
    this.getPrimaryTypeList();
    // 自动获取目录下的商品列表
    this.getGoodsList();
  }
};
</script>

<style lang="scss" scoped>
.header {
  img {
    width: 1920px;
    height: 350px;
    margin-bottom: 50px;
  }
}
.w1200 {
  overflow: hidden;
  font-family: Adobe Heiti Std R;
  font-weight: normal;

  .aside {
    width: 230px;
    float: left;
    text-align: center;

    .nav {
      .submenu {
        .title {
          font-size: 26px;
          background-color: #ebebeb;
          height: 60px;
          line-height: 60px;
          cursor: pointer;
          span {
            display: inline-block;
            vertical-align: middle;
            font-weight: bold;
          }
          i {
            font-size: 18px;
            font-weight: bold;
            vertical-align: middle;
          }
        }
        .menuItem {
          border: 1px solid rgba(238, 238, 238, 1);
          font-size: 20px;
          height: 60px;
          line-height: 60px;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-submenu {
        background-color: #fff !important;

        span {
          font-size: 26px;
        }

        .el-menu-item {
          background: rgba(255, 255, 255, 1) !important;
          border: 1px solid rgba(238, 238, 238, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .product {
        .pTitle {
          width: 230px;
          height: 60px;
          line-height: 60px;
          background: rgba(235, 235, 235, 1);
          border: 1px solid rgba(235, 235, 235, 1);
          text-align: center;
          font-size: 26px;
        }
      }
    }

    .recommend {
      .product {
        .pTitle {
          width: 230px;
          height: 60px;
          line-height: 60px;
          background: rgba(235, 235, 235, 1);
          border: 1px solid rgba(235, 235, 235, 1);
          text-align: center;
          font-size: 26px;
          margin: 30px 0 22px 0;
        }
      }
    }
  }
  .main {
    width: 926px;
    margin-left: 44px;
    float: right;

    .topRow {
      overflow: hidden;
      width: 938px;
      line-height: 50px;
      font-size: 22px;
      background: rgba(249, 249, 249, 1);

      .el-breadcrumb {
        width: 500px;
        line-height: 50px;
        margin-left: 24px;
        font-size: 22px !important;
        float: left;
      }
      .sortingNum {
        float: left;

        span {
          color: #0f811f;
        }
      }
    }

    .type {
      width: 926px;
      height: 88px;
      clear: both;
      position: relative;
      border: 1px solid rgba(238, 238, 238, 1);

      .typeName {
        width: 110px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        vertical-align: middle;
        background: rgba(249, 249, 249, 1);
        position: absolute;

        span {
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
        }
      }

      .typeList {
        height: 88px;
        width: 754px;
        max-width: 754px;
        margin: 0 46px 0 21px;
        position: absolute;
        left: 110px;

        ul {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          transform: translate(-50%, -50%);
          word-break: keep-all;

          li {
            display: inline;
            margin: 6px 14px;

            .el-button {
              font-size: 18px;
              color: rgba(34, 34, 34, 1);
              padding: 4px 6px;
            }

            .isActive {
              background-color: #0f811f;
              color: white;
            }
          }
        }
      }
    }

    .goods {
      overflow: hidden;
      clear: both;
      margin-top: 34px;
      ul li {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        .goods-item {
          .item {
            width: 216px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(238, 238, 238, 1);

            .itemImg {
              margin: 8px;
              width: 200px;
              height: 200px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            .itemText {
              margin: 8px;
              vertical-align: top;

              .tag {
                width: 58px;
                height: 20px;
                background: rgba(242, 100, 14, 1);
                border-radius: 2px;
                float: left;
                margin-right: 4px;
                margin-top: 1px;
                text-align: center;

                span {
                  color: white;
                  font-size: 12px;
                  line-height: 12px;
                }
              }

              .name {
                font-size: 16px;
                color: #2d2d2d;
                margin-bottom: 9px;
                width: 130px;
              }
              .summary {
                clear: both;
                width: 192px;
                font-size: 12px;
                color: rgba(142, 142, 142, 1);
                line-height: 22px;
                height: 22px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
    .pagination {
      clear: both;
      text-align: center;
      margin: 60px 0 70px;
    }
  }
}
</style>
