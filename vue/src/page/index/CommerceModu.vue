<template>
  <div class="commerce-modu yn-index-item">
    <div class="yn-item-title">
      <div class="title-left">
        <p class="title-name">电子商务</p>
      </div>
      <div class="title-right">
        <router-link to="/commerce" class="more-btn">更多>></router-link>
      </div>
    </div>
    <div class="commerce-content">
      <!-- 主要类别 -->
      <div class="main-product">
        <ul class="clearfix">
          <li class="main-list">
            <router-link to="/commerce" class="product-banner">
              <img class="yn-fill-img" src="@/../static/images/comm-banner01.png" alt="">
            </router-link>
            <div class="comm-item alone-item">
              <div class="item-name">瓜果蔬菜</div>
              <div class="item-desc">高颜值 绿色无公害</div>
              <div class="sub-comm clearfix">
                <router-link to="/commerce" class="comm-list">
                  <img class="yn-fill-img" src="@/../static/images/min-comm01.jpg" alt="">
                </router-link>
                <router-link to="/commerce" class="comm-list">
                  <img class="yn-fill-img" src="@/../static/images/min-comm02.jpg" alt="">
                </router-link>
              </div>
            </div>
          </li>
          <li class="main-list">
            <div class="comm-item">
              <div class="item-name">种子</div>
              <div class="item-desc">品种多样 质量保证</div>
              <div class="sub-comm clearfix">
                <router-link to="/commerce" class="comm-list">
                  <img class="yn-fill-img" src="@/../static/images/min-comm03.jpg" alt="">
                </router-link>
                <router-link to="/commerce" class="comm-list">
                  <img class="yn-fill-img" src="@/../static/images/min-comm04.jpg" alt="">
                </router-link>
              </div>
            </div>
            <router-link to="/commerce" class="product-banner">
              <img class="yn-fill-img" src="@/../static/images/comm-banner02.png" alt="">
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 次要类别 -->
      <div class="second-product clearfix">
        <div 
          v-for="item in productData"
          :key="item.id"
          class="comm-item">
          <div class="item-name">{{item.name}}</div>
          <div class="item-desc">{{item.text}}</div>
          <div class="sub-comm clearfix">
            <router-link
              v-for="(sub, index) in item.subproduct"
              :key="index"
              to="/commerce" 
              class="comm-list">
              <img class="yn-fill-img" :src="sub.imgUrl" alt="">
            </router-link>
          </div>
        </div>                    
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 电子商务
      productData: [
        {
          id: 1,
          name: '粤农优品', 
          text: '特色品牌 安全可追溯',
          subproduct: [
            { imgUrl: '@/../static/images/min-comm05.jpg' },
            { imgUrl: '@/../static/images/min-comm06.jpg' }
          ]
        },
        { 
          id: 2,
          name: '粮油米面', 
          text: '饕餮盛宴 肆意狂欢',
          subproduct: [
            { imgUrl: '@/../static/images/min-comm07.jpg' },
            { imgUrl: '@/../static/images/min-comm08.jpg' }
          ]
        },
        { 
          id: 3,
          name: '特产', 
          text: '地道才够味',
          subproduct: [
            { imgUrl: '@/../static/images/min-comm09.jpg' },
            { imgUrl: '@/../static/images/min-comm10.jpg' }
          ]
        },
        { 
          id: 4,
          name: '农药', 
          text: '精准除害',
          subproduct: [
            { imgUrl: '@/../static/images/min-comm11.jpg' },
            { imgUrl: '@/../static/images/min-comm12.jpg' }
          ]
        },
        { 
          id: 5,
          name: '农机农具', 
          text: '精选品质好货',
          subproduct: [
            { imgUrl: '@/../static/images/min-comm13.jpg' },
            { imgUrl: '@/../static/images/min-comm14.jpg' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/* 电子商务 */
.commerce-modu {
  .commerce-content {
    padding: 0 17px;
    /* 主要类别 */
    .main-product {
      .main-list {
        width: 50%;
        border-bottom: 1px solid $base-border-color;
        box-sizing: border-box;
        float: left;
        .product-banner {
          width: 350px;
          height: 190px;
          margin: 16px 0;
          float: left;
        }
      }
    }
    /* 商品类别 */
    .comm-item {
      width: 233px;
      padding: 18px;
      border-right: 1px solid $base-border-color;
      box-sizing: border-box;
      float: left;
      &:nth-last-of-type(1) {
        border: 0 none;
      }
      &.alone-item {
        border-right: 1px solid $base-border-color;
      }
      .item-name {
        font-size: 19px;
        font-weight: bold;
        color: #414141;
        line-height: 34px;
      }
      .item-desc {
        font-size: 18px;
        color: #999;
        line-height: 24px;
        padding-top: 6px;
      }
      .sub-comm {
        margin-top: 30px;
        .comm-list {
          width: 92px;
          height: 92px;
          float: left;
          &:nth-of-type(2) {
            margin-left: 12px;
          }
        }
      }
    }
  }
}
</style>
