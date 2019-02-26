<template>
  <div class="superior-products yn-index-item">
    <div class="yn-item-title">
      <div class="title-left">
        <p class="title-name">粤农优品</p>
      </div>
      <div class="title-right">
        <router-link to="/superiorProducts" class="more-btn">更多>></router-link>
      </div>
    </div>
    <div class="superior-content">
      <div class="clearfix">
        <div
          v-for="item in superiorList"
          :key="item.id"
          @click="superiorListClick(item)"
          class="superior-item">
          <div class="item-img">
            <img :src="item.bgImg" alt="">
          </div>
          <div class="item-infor">
            <i class="item-icon"></i>
            <div class="item-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYnProductsType } from '@/api/index'
export default {
  data() {
    return {
      // 粤农优品
      superiorList: [
         {
          id: 1,
          bgImg: '',
          name: ''
        },
        {
          id: 2,
          bgImg: '@/../static/images/superior-bg01.png',
          name: '权威种养选品标准'
        },
        {
          id: 3,
          bgImg: '@/../static/images/superior-bg02.png',
          name: '快速认证检测服务'
        },
        {
          id: 4,
          bgImg: '@/../static/images/superior-bg03.png',
          name: '安全品质全程溯源'
        },
        {
          id: 5,
          bgImg: '@/../static/images/superior-bg04.png',
          name: '特色品牌运营孵化'
        }
      ]
    }
  },
  mounted() {
    this.getProductsType()
  },
  methods: {
    // 获取益农优品类型列表
    getProductsType() {
      getYnProductsType().then(res => {
        if(res.success) {
          for(let i=0; i<this.superiorList.length; i++) {
            this.superiorList[i].id = res.resultList[i].dictionaries_id;
            this.superiorList[i].name = res.resultList[i].name;
          }
          this.superiorList.shift(0);
        }
      })
    },

    // 点击粤农优品类别
    superiorListClick(item) {
      this.$router.push({ path: '/superiorProducts', query: { id: item.id} })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 粤农优品 */
.superior-products {
  .superior-content {
    padding: 20px 12px;
    .superior-item {
      width: 25%;
      box-sizing: border-box;
      float: left;
      position: relative;
      .item-infor {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        .item-icon {
          width: 72px;
          height: 72px;
          background: url('~@/../static/images/base-icon.png') -204px -4px no-repeat;
          margin: 76px auto 50px;
          display: block;
        }
        .item-name {
          font-size: 28px;
          color: #EDEDED;
          line-height: 32px;
          text-align: center;
        }
      }
      &:nth-of-type(2) {
        .item-icon {
          background-position-y: -84px;
        }
      }
      &:nth-of-type(3) {
        .item-icon {
          background-position-y: -164px;
        }
      }
      &:nth-of-type(4) {
        .item-icon {
          background-position-y: -244px;
        }
      }
    }
  }
}
</style>
