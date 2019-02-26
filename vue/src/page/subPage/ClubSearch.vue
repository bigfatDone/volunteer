<template>
  <div class="w1200">
    <div class="search-wrap">
      <ul class="club-lists">
        <li v-for="(list, index) in YNSLists" :key="index" class="club-item">
          <router-link :to="{ path: '/ynongClubInfor/', query: {id: list.id}}" class="item">
            <div class="item-left">
              <img :src="list.yns_mendian_photo" :alt="list.yns_name">
            </div>
            <div class="item-middle">
              <div class="name yn-text-ellipsis">{{ list.yns_name }}</div>
              <div class="level">
                <span
                  :class="{levelC:list.yns_lns_type=='3',levelB:list.yns_lns_type=='2',levelA:list.yns_lns_type=='1'}"
                >{{ computeType(list.yns_lns_type) }}</span>
              </div>
            </div>
            <div class="item-right">
              <p class="call">
                <label>
                  <img src="@/../static/img/b-telephone.png">
                </label>
                {{ list.yns_phone }}
              </p>
              <p class="address">
                <label>
                  <img src="@/../static/img/b-location.png">
                </label>
                <span>{{ list.yns_address }}</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      
      <div class="foot-page">
        <div class="page-num">共{{ total }}条</div>
        <div class="pagination">
          <el-pagination
            @current-change="handlePage"
            layout="prev, pager, next"
            :total="total"
            prev-text="上一页"
            next-text="下一页"
            :current-page="currentPage"
            background
            :page-size="5">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYNClubs } from "@/api/base/search-results";
export default {
  data() {
    return {
      YNSLists: [],
      total: 0,
      currentPage: 1,
      keywords: ""
    };
  },
  mounted() {
    this.keywords = this.$route.query.id;
    this.getYNSLists();
  },
  watch: {
    $route() {
      this.keywords = this.$route.query.id;
      this.getYNSLists();
    }
  },
  methods: {
    // 监听页数点击事件
    handlePage(val) {
      this.currentPage = val;
      window.scrollTo(0, 0);
      this.getYNSLists(val);
    },
    // 获取益农社数据
    getYNSLists(val = 1) {
      const SHOWCOUNT = 6;
      getYNClubs({
        keywords: this.keywords,
        toGoPage: val,
        showCount: SHOWCOUNT
      }).then(res => {
        if (res.success) {
          this.YNSLists = res.resultList;
          this.total = res.data;
        }
      });
    },
    // 计算出益农社类型名
    computeType: typeId => {
      if (typeId == 1) {
        return "A类社";
      } else if (typeId == 2) {
        return "B类社";
      } else if (typeId == 3) {
        return "县级运营中心";
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.search-wrap {
  margin: 34px 0 40px;
  .club-lists {
    min-height: 330px;
  }
  .club-item {
    border: 1px solid $base-border-color;
    border-bottom: none;
    &:last-of-type {
      border-bottom: 1px solid $base-border-color;
    }

    .item {
      padding: 40px 20px;
      display: block;
      overflow: hidden;

      .item-left img {
        width: 260px;
        height: 160px;
        float: left;
      }

      .item-middle {
        float: left;
        margin-left: 34px;
        height: 160px;
        width: 420px;
        text-align: left;

        .name {
          height: 36px;
          font-size: 32px;
          font-weight: bold;
          line-height: 30px;
          color: $base-color-orange;
          line-height: 36px;
          margin: 14px 0 0 0;
        }

        .level {
          height: 15px;
          font-size: 15px;
          color: white;
          margin-top: 50px;

          span {
            padding: 6px 14px;
            border-radius: 2px;
          }

          .levelA {
            background: rgba(86, 173, 233, 1);
          }

          .levelB {
            background: $base-color;
          }

          .levelC {
            background: rgba(230, 184, 46, 1);
          }
        }
      }

      .item-right {
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
  .foot-page {
    clear: left;
    border: 1px solid $base-border-color;

    .page-num {
      padding: 20px 0 18px 37px;
      font-size: 18px;
      color: rgba(34, 34, 34, 1);
      line-height: 21px;
    }

    .pagination {
      text-align: center;
      margin-bottom: 45px;
    }
  }
}
</style>