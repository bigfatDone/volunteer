<template>
  <div>
    <products-header></products-header>
    <div class="shake-main">
      <div class="shake-content w1200">
        <!-- 云朵模块 -->
        <div class="cloud-modu">
          <ul>
            <li 
              v-for="item in cloudList"
              :key="item.id"
              class="cloud-list"
              :class="'cloud-s' + item.id">
            </li>
          </ul>
          <div class="cloud-sign">
            <div class="cloud-item"></div>
            <div class="sign-item"></div>
          </div>
        </div>
        <!-- 树木模块 -->
        <div class="tree-modu">
          <div class="tree-item"></div>
          <ul>
            <li
              v-for="item in leafList"
              :key="item.id"
              class="leaf-list" 
              :class="['leaf-s' + item.id, woobleState === 1 ? 'wobble' : '']">
            </li>
          </ul>
        </div>
        <!-- 水果模块 -->
        <div class="fruit-modu">
          <ul>
            <li 
              v-for="item in fruitList"
              :key="item.id"
              class="fruit-list"
              :class="item.id | fruitClass(oddNum, evenNum)">
              <div class="fruit-img">
                <img :src="item.fruitImg" alt="">
              </div>
              <div class="prize-win" :class="item.id | prizeClass(oddNum, evenNum)">
                <div class="prize-content">
                  <div class="coupon-name">恭喜您！摇到了{{item.money}}元优惠劵</div>
                  <div class="coupon-content clearfix">
                    <div class="coupon-goods">
                      <img :src="item.goodsImg" alt="">
                    </div>
                    <div class="coupon-infor">
                      <p class="explain">本劵适用于</p>
                      <p class="goods-name">{{item.goodName}}</p>
                      <p class="number">{{item.num}}装</p>
                      <router-link to="" class="use-btn">立即使用 ></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 其它附属品模块 -->
        <div class="subsidiary-modu">
          <div class="man-item"></div>
          <div 
            class="shake-btn" 
            :class="shakeState === 1 ? 'shake' : ''"
            @mouseenter="shakeStop"
            @mouseleave="shakePlay">
            <div class="btn-region" @click="shake"></div>
          </div>
        </div>
        <!-- 橱窗模块 -->
        <div class="showcase-modu">
          <div class="carousel-wrapper">
            <div class="carousel-main">
              <div class="carousel-visual">
                <swiper :options="swiperOption">
                  <swiper-slide 
                    v-for="(item, index) in goodsList"
                    :key="index"
                    class="carousel-list">
                    <div class="goods-img">
                      <img :src="item.img" alt="">
                    </div>
                    <div class="goods-info">
                      <div class="goods-name">{{item.name}}</div>
                      <div class="goods-discount">
                        <span>满100减15</span>
                        <span class="ver-line">|</span>
                        <span>满200减30</span>
                      </div>
                      <router-link to="" class="buy-btn">立即抢购 ></router-link>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
            <div class="arrow-btn arrow-left"></div>
            <div class="arrow-btn arrow-right"></div>
          </div>
        </div>
        <!-- 更多模块 -->
        <div class="more-modu">
          <router-link to="" class="more-btn">查看更多粤农优品 >></router-link>
          <div class="postscript-text">在法律范围内本公司对本活动拥有最终解释权</div>
        </div>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>

<script>
import { getShakeGoods } from '@/api/shake'
export default {
  data() {
    return {
      // 云朵模块
      cloudList: [],

      // 树木模块
      woobleState: 0, // 0代表树叶没有运动，1代表树叶有运动
      leafList: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
      ],

      // 水果模块
      oddNum: -1,
      evenNum: -2,
      fruitList: [
        {
          id: 1,
          fruitImg: '@/../static/images/shake/fruit-02.png',
          money: 0,
          goodsImg: '@/../static/images/shake/goods-img01.jpg',
          goodName: '湛江红肉火龙果',
          num: '5斤'
        },
        {
          id: 2,
          fruitImg: '@/../static/images/shake/fruit-02.png',
          money: 0,
          goodsImg: '@/../static/images/shake/goods-img01.jpg',
          goodName: '湛江红肉火龙果',
          num: '5斤'
        },
        {
          id: 3,
          fruitImg: '@/../static/images/shake/fruit-02.png',
          money: 0,
          goodsImg: '@/../static/images/shake/goods-img01.jpg',
          goodName: '湛江红肉火龙果',
          num: '5斤'
        },
        {
          id: 4,
          fruitImg: '@/../static/images/shake/fruit-02.png',
          money: 0,
          goodsImg: '@/../static/images/shake/goods-img01.jpg',
          goodName: '湛江红肉火龙果',
          num: '5斤'
        }
      ],
      fruitImages: [],
      couponList:[],

      // 其它附属品模块
      mouseState: 0,  // 0代表鼠标不在按钮上，1代表鼠标在按钮上
      shakeState: 1,  // 0代表按钮不晃动，1代表鼠标晃动

      // 橱窗模块
      goodsList: [
        {}
      ],
      // 轮播图
      swiperOption: {
        loop: true, // 循环轮播
        autoplay: true, // 自动轮播
        slidesPerView: 3, // 同时显示的数量
        slidesPerGroup: 3, // 数量多少为一组
        spaceBetween: 16, // 之间的距离
        speed: 600, // 轮播速度
        delay: 4000, // 自动切换的时间间隔
        autoplay: {
          disableOnInteraction: false
        }
      }
    }
  },
  mounted() {
    this.getCloudList(11)
    this.getGoodList()
  },
  filters: {
    // 水果类名过滤器
    fruitClass(value, oddNum, evenNum) {
      if(value === oddNum + 1 || value === evenNum + 1) {
        return 'fruit-s' + value + ' ' + 'fruit-drop' + value
      } else {
        return 'fruit-s' + value
      }
    },
    // 奖品类名过滤器
    prizeClass(value, oddNum, evenNum) {
      if(value === oddNum + 1 || value === evenNum + 1) {
        return 'blast'
      }
    }
  },
  methods: {
    // 获取商品列表
    getGoodList() {
      getShakeGoods({ count: 12 }).then(res => {
        if(res.success) {
          this.goodsList = res.resultList
        }
      })
    },

    //获取云朵列表
    getCloudList(num) {
      let obj
      for(let i=0; i<num; i++) {
        obj = { id: i + 1}
        this.cloudList.push(obj);
      }
    },

    // 点击开始摇树
    shake() {
      // 初始化参数
      let _this = this
      this.oddNum = -1
      this.evenNum = -2
      this.woobleState = 1
      this.shakeState = 0

      // 该定时器是水果开始掉落的时间
      const temp1 = setTimeout(() => {
        // 随机生成两个0-3之间的整数，一个必须为奇数，另外一个必须为偶数
        for(let i=0; _this.oddNum<0 || _this.evenNum<0; i++) {
          let num = Math.floor(Math.random() * 4);
          if(num % 2 == 0) {
            _this.evenNum = num
          } else {
            _this.oddNum = num
          }
        }
      } ,400)

      // 该定时器是最后一片叶子晃动完
      const temp2 = setTimeout(() => {
         _this.woobleState = 0
      }, 1400)
    },

    //鼠标移进按钮
    shakeStop() {
      this.mouseState = 1
      this.shakeState = 0
    },
    //鼠标移出按钮
    shakePlay() {
      window.clearTimeout(temp)
      const temp = window.setTimeout(() => {
        this.mouseState = 0
        this.shakeState = 1
      }, 2000)
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../style/scss/shake'
</style>
