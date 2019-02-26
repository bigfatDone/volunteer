<template>
  <!-- 新闻公告 -->
  <div class="notice-news yn-index-item clearfix">
    <!-- 轮播图模块 -->
    <div class="news-carousel">
      <div class="carousel-show" @mouseover="stop" @mouseleave="play">
        <ul class="carousel-content" :style="containerStyle">
          <li 
            v-for="(item, index) in carouselList"
            :key="index"
            class="carousel-list">
            <router-link :to="{ path: '/noticeNewsInfo', query: { id: item.gov_news_id }}" class="list-item">
              <div class="item-img">
                <img class="yn-fill-img" :src="item.photos" alt="">
              </div>
              <div class="item-name yn-text-ellipsis">{{item.title}}</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="direction-arrow">
        <span class="arrow-btn left-btn" @click="move(listW, 1, speed)"></span>
        <span class="arrow-btn right-btn" @click="move(listW, -1, speed)"></span>
      </div>
      <div class="corner-marker">
        <ol class="marker-cont">
          <li 
            v-for="(item, index) in newsMarkers"
            :key="index"
            class="marker-item"
            :class="index == markerIndex - 1 ? 'current' : ''"
            @click="jump(index + 1)">
          </li>
        </ol>
      </div>
    </div>

    <!-- 新闻列表 -->
    <div class="news-item">
      <div class="news-tabs">
        <ul class="clearfix">
          <li 
            v-for="(item, index) in newsTabs"
            :key="item.dictionaries_id"
            class="tab-pane"
            :class="index === newsIndex ? 'current' : ''"
            @mouseenter="newsTabClick(item.dictionaries_id, index)">
            {{item.name}}
          </li>
          <!-- 增加更多按钮 -->
          <li>
            <router-link to="/noticeNews" class="more">更多>></router-link>
          </li>
        </ul>
      </div>
      <div class="news-ul">
        <ul>
          <li 
            v-for="item in newsList"
            :key="item.id"
            class="news-list">
            <router-link :to="{ path: '/noticeNewsInfo', query: { id: item.gov_news_id }}" class="list-cont clearfix">
              <div class="news-name yn-text-ellipsis">{{item.title}}</div>
              <div class="news-time">{{item.creat_time | timeFil}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsType, getNewsList } from '@/api/index' 
export default {
  data() {
    return {
      // 轮播图模块
      listW: 500,       // 一个轮播图的宽度
      distance: -500,
      speed: 25,        // 移动的距离（必须是轮播图能整除的数）
      transitionEnd: true,
      timer: null,
      
      carouselList: [],
      firstList: [],
      lastList: [],
      markerIndex: 1,
      newsMarkers: [],
      
      // 新闻列表
      newsIndex: 0,
      newsTabs: [],
      newsAllList: [],
      newsList: []
    }
  },
  filters: {
    timeFil(value) {
      return value.substr(5, 5)
    }
  },
  mounted() {
    this.getNewsTabsList()
    this.init()
  },
  computed: {
    //这里用了计算属性，用transform来移动整个图片列表
    containerStyle() {
      return {
        transform:`translate3d(${this.distance}px, 0, 0)`
      }
    }
  },
  methods: {
    // 获取新闻类型列表
    getNewsTabsList() {
      getNewsType().then(res => {
        if(res.success) {
          this.newsTabs = res.resultList
          this.getNewsAllList()
        }
      })
    },

    // 获取所有新闻列表
    getNewsAllList() {
      getNewsList().then(res => {
        if(res.success) {
          this.newsAllList = res.resultList;
          // 根据新闻类型获取相应列表
          this.getTypeNewsList(this.newsTabs[0].dictionaries_id)
        }
      })
    },

    // 根据新闻类型获取相应列表
    getTypeNewsList(id) {
      this.newsList = []
      for(let i=0; i<this.newsAllList.length; i++) {
        if(this.newsAllList[i].type_id === id) {
          this.newsList.push(this.newsAllList[i])
        }
      }
      // 获取轮播图列表
      this.getCarouselList()
    },

    // 切换新闻公告标签
    newsTabClick(id, index) {
      this.newsIndex = index
      this.getTypeNewsList(id)
    },

    // 获取轮播图列表
    getCarouselList() {
      this.carouselList = []
      this.newsMarkers = []
      // 如果类型新闻大于等于5条，则取前5条；否则，取全部
      if(this.newsList.length >= 5) {
        this.carouselList = this.newsList.slice(0, 5)
      } else {
        this.carouselList = this.newsList
      }
      // 获取角标数组
      for(let i=0; i<this.carouselList.length; i++) {
        this.newsMarkers[i] = i + 1;
      }
      // 获取列表第一项和最后一项
      this.firstList = this.carouselList.slice(0, 1) 
      this.lastList = this.carouselList.slice(-1)
      // 把列表的最后一项插在列表前面，把列表第一项插到最后
      this.carouselList = this.carouselList.concat(this.firstList)  
      this.carouselList = this.lastList.concat(this.carouselList)
    },

    init() {
      this.play();
      window.onblur = function() { this.stop() }.bind(this)
      window.onfocus = function() { this.play() }.bind(this)
    },
    // 轮播图切换
    move(offset, direction, speed) {
      // 节流
      if(!this.transitionEnd) return  //这里是闸
      this.transitionEnd = false      //开闸以后再把闸关上
      // 轮播图位移
      const destination = this.distance + offset * direction
      this.animate(destination, direction, speed)
      // 角标切换
      direction === -1 ? this.markerIndex += offset/this.listW : this.markerIndex -= offset/this.listW
      if(this.markerIndex > this.carouselList.length - 2) {
        this.markerIndex = 1
      }
      if(this.markerIndex < 1) {
        this.markerIndex = this.carouselList.length - 2
      }
    },

    // 轮播图切换过度动画
    animate(des, direc, speed) {
      const temp = window.setInterval(() => {
        if((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
          this.distance += speed * direc
        } else {
          this.transitionEnd = true     //闸再次打开
          window.clearInterval(temp)
          this.distance = des
          if(this.distance < (this.carouselList.length - 2) * -this.listW) {
            this.distance = -this.listW
          }
          if(this.distance > -this.listW) {
            this.distance = (this.carouselList.length - 2) * -this.listW
          }
        }
      }, 20)
    },

    // 点击角标
    jump(index) {
      const direction = index - this.markerIndex >= 0 ? -1 : 1        // 获取滑动方向
      const offset = Math.abs(index - this.markerIndex) * this.listW  // 获取滑动距离
      // 需要控制一下速度，让滑动一张图片耗费的时间和滑动多张图片耗费的时间一样
      const jumpSpeed = Math.abs(index - this.markerIndex) === 0 ? 
        this.speed :
        Math.abs(index - this.markerIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },

    // 自动播放
    play() {
      if(this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.timer = window.setInterval(() => {
        this.move(this.listW, -1, this.speed)
      }, 4000)
    },

    //暂停
    stop() {
      window.clearInterval(this.timer)
      this.timer = null
    }

  }
}
</script>

<style lang="scss" scoped>
/* 新闻公告 */
.notice-news {
  padding: 20px 18px;
  box-sizing: border-box;
  /* 轮播图 */
  .news-carousel {
    width: 500px;
    position: relative;
    float: left;
    .carousel-show {
      width: 100%;
      overflow: hidden;
      .carousel-content {
        width: 9999px;
        .carousel-list {
          width: 500px;
          height: 356px;
          position: relative;
          float: left;
          .item-img {
            width: 100%;
            height: 100%;
          }
          .item-name {
            width: 100%;
            height: 44px;
            font-size: 20px;
            color: #fff;
            line-height: 44px;
            text-align: center;
            background: rgba(0, 0, 0, .5);
            padding: 0 16px;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
    }
    .direction-arrow {
      display: none;
      .arrow-btn {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, .5);
        border-radius: 50%;
        margin-top: -28px;
        position: absolute;
        top: 50%;
        cursor: pointer;
        z-index: 2;
        &.left-btn {
          left: 20px;
        }
        &.right-btn {
          right: 20px;
        }
      }
    }
    .corner-marker {
      margin-top: 10px;
      .marker-cont {
        display: flex;
        justify-content: center;
        .marker-item {
          width: 34px;
          height: 5px;
          background: #BFBFBF;
          margin: 0 2px;
          cursor: pointer;
          &.current {
            background: #FF6600;
          }
        }
      }
    }
  }
  /* 新闻列表 */
  .news-item {
    width: 640px;
    margin-left: 24px;
    float: left;
    /* 轮播图模块 */
    .news-tabs {
      .tab-pane {
        width: 180px;
        height: 40px;
        font-size: 20px;
        color: #666;
        line-height: 38px;
        text-align: center;
        border: 1px solid $base-border-color;
        margin-right: 14px;
        box-sizing: border-box;
        float: left;
        cursor: pointer;
        &.current {
          color: #fff;
          background: $base-color;
          border-color: $base-color;
        }
      }
      // 增加更多按钮的样式
      .more {
        display: block;
        font-size: 14px;
        line-height: 24px;
        float: right;
        margin: 7px 0;
      }
    }
    /* 列表模块 */
    .news-ul {
      margin-top: 10px;
      .news-list {
        padding-left: 20px;
        position: relative;
        &:after {
          content: "";
          width: 6px;
          height: 6px;
          background: #ccc;
          border-radius: 50%;
          margin-top: -3px;
          position: absolute;
          left: 0;
          top: 50%;
        }
        .list-cont {
          font-size: 20px;
          line-height: 26px;
          padding: 7px 0;
          display: block;
          .news-name {
            width: 550px;
            float: left;
          }
          .news-time {
            width: 60px;
            color: #ccc;
            text-align: right;
            float: right;
          }
        }
      }
    }
  }
}
</style>
