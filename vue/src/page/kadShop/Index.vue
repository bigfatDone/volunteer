<template>
  <div class="buy-detail">
    <div class="w1200">
      <!-- 轮播图模块 -->
      <div class="contain-banner">
        <div class="banner-img">
          <img src="@/../static/img/BuyDetail/buy-banner.png">
        </div>
      </div>
      <!-- 搜索栏模块 -->
      <div class="contain-search clearfix">
        <div class="search-box">
          <div class="search-input">
            <input type="text" v-model="key" @keyup.enter="getAllDrugList(1)">
          </div>
          <div class="search-btn" @click="getAllDrugList(1)">搜索</div>
        </div>
        <div class="menu-btn" @click="onMyOrdersBtn">
          <!--   -->
          <i class="menu-icon"></i>
          <p class="menu-name">我的订单</p> 
        </div>
      </div>
      <!-- 主体列表模块 -->
      <div class="contain-main" v-if="ordersList.length > 0">
        <ul class="order-list clearfix">
          <li
            class="list-item"
            v-for="(item,index) in ordersList"
            :key="index"
            :style="{marginRight:(index+1)%5==0?'0px':'10px'}"
            @click="toShopDetail(item.WareSkuCode)"
          >
            <div class="item-img">
              <img :src="item.Pic800">
            </div>
            <div class="item-name">
              <span class="item-icon icon-one" v-if="item.Type=='OTC'"></span>
              <span class="item-icon icon-two" v-else-if="item.Type=='Rx'"></span>
              <span>{{ item.DrugsName }} {{item.Model}}</span>
            </div>
            <div class="item-none-price" v-if="item.Price == '0.00'">暂无报价</div>
            <div class="item-price" v-else>￥{{ item.Price }}</div>
            <div class="item-status" v-if="item.StockStatus==false">无货</div>
          </li>
        </ul>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            background
            :total="total"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handlePage"
            :current-page="currentPage"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>
      <div class="empty-goods-content" v-else>
        <span>无相关产品信息</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getDrugList } from "@/api/kadShop/BuyDetail";
export default {
  data() {
    return {
      ordersList: [],
      key: "", //搜索框输入的值
      currentPage: 1, // 设置当前页码
      pageSize: 20, //每页最多条数
      total: 0, //总页数
      // userid: "13602289426"
      userid:''
    };
  },
  methods: {
    /* 翻页的效果 */
    handlePage(val) {
      this.currentPage = val;
      // 获取列表页面数据,id为一级id，val为当前页，type为二级type
      this.getAllDrugList(val);
      window.scrollTo(0, 0);
    },
    //点击跳转到我的订单
    onMyOrdersBtn() {
       this.$message.success('该渠道尚未开通')
      // this.$router.push({
      //   path: "/kadShop/kadOrder",
      //   query: { userid: this.userid }
      // });
    },
    //获取数据
    getAllDrugList(val) {
      this.currentPage = val;
      getDrugList({
        key: this.key,
        pageSize: 20,
        pageIndex: val
      }).then(res => {
        if (res.success) {
          this.ordersList = res.resultList;
          this.total = res.returnMap.Total;
        } else {
          this.ordersList = [];
          this.total = 0;
        }
      });
    },
    toShopDetail(codeId) {
      this.$router.push({
        path: "/kadShop/kadGoodsDetail",
        query: { id: codeId }
      });
    }
  },
  mounted() {
    this.getAllDrugList(1);
  }
};
</script>
<style lang="scss" scoped>
.buy-detail {
  //轮播图样式
  .contain-banner {
    width: 100%;
    height: 375px;
    overflow: hidden;
  }
  // 搜索框样式
  .contain-search {
    margin: 24px 0 26px;
    .search-box {
      float: left;
      width: 780px;
      height: 64px;
      border: 2px solid #0a6ae3;
      box-sizing: border-box;
      .search-input {
        float: left;
        width: 660px;
        height: 100%;
        box-sizing: border-box;
        input {
          width: 100%;
          height: 100%;
          padding: 10px 20px;
          font-size: 18px;
          outline: none;
          box-sizing: border-box;
        }
      }
      .search-btn {
        float: right;
        width: 116px;
        height: 100%;
        font-size: 24px;
        color: #fff;
        text-align: center;
        line-height: 60px;
        background: #0a6ae3;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
    .menu-btn {
      float: right;
      width: 358px;
      height: 64px;
      padding: 16px 108px;
      text-align: center;
      border: 1px solid #fafbfc;
      background-color: #eee;
      box-sizing: border-box;
      cursor: pointer;
      .menu-icon {
        float: left;
        width: 26px;
        height: 30px;
        margin-right: 18px;
        background: url("~@/../static/img/BuyDetail/buy-icon.png") top center
          no-repeat;
      }
      .menu-name {
        float: left;
        font-size: 24px;
        color: #4a4a4a;
      }
    }
  }

  // 主体列表样式
  .contain-main {
    margin-bottom: 50px;
    .order-list {
      .list-item {
        position: relative;
        float: left;
        width: 232px;
        height: 320px;
        padding: 16px;
        margin-bottom: 14px;
        line-height: 24px;
        cursor: pointer;
        box-sizing: border-box;
        border: #e3e3e3 1px solid;
        .item-img {
          width: 200px;
          height: 200px;
          overflow: hidden;
        }
        .item-name {
          position: absolute;
          top: 213px;
          height: 49px;
          margin: 13px 0;
          font-size: 15px;
          color: #222;
          overflow: hidden;
          .item-icon {
            display: inline-block;
            width: 38px;
            height: 22px;
            vertical-align: middle;
            &.icon-one {
              background: url(~@/../static/img/shop-cart/otc.png) no-repeat top
                center / 90%;
            }
            &.icon-two {
              background: url(~@/../static/img/shop-cart/rx.png) no-repeat top
                center / 90%;
            }
          }
        }
        .item-price {
          position: absolute;
          bottom: 16px;
          font-size: 20px;
          color: #ff1717;
        }
        .item-none-price {
          position: absolute;
          bottom: 16px;
          font-size: 16px;
          color: #ff1717;
        }
        .item-status {
          position: absolute;
          right: 10px;
          bottom: 16px;
          color: #808080;
        }
      }
      .list-item:hover {
        box-shadow: 0 0 10px 0 #999;
      }
    }
    .pagination {
      margin-top: 10px;
      text-align: center;
    }
  }
  .empty-goods-content {
    width: 100%;
    text-align: center;
    height: 300px;
    line-height: 12;
    font-size: 20px;
    font-family: Adobe Heiti Std R;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
<style lang="scss">
.buy-detail {
  .el-pagination.is-background .el-pager li {
    height: 32px;
    padding: 4px;
    font-size: 16px;
    color: #666;
    line-height: 28px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    height: 32px;
    padding: 4px;
    font-size: 16px;
    color: #fff;
    line-height: 25px;
    background-color: #1f8fff;
    border: 1px solid #ebebeb;
  }
  .el-pagination span:not([class*="suffix"]),
  .el-pagination button {
    width: 72px;
    height: 32px;
    line-height: 32px;
  }
}
</style>


