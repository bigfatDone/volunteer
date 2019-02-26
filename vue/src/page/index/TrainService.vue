<template>
  <div class="train-service yn-index-item">
    <div class="yn-item-title">
      <div class="title-left">
        <p class="title-name">培训体验服务</p>
      </div>
      <div class="title-right">
        <router-link to="/trainService" class="more-btn">更多>></router-link>
      </div>
    </div>
    <div class="train-content">
      <div class="yn-block-tabs">
        <ul class="clearfix">
          <li 
            v-for="(tab, index) in trainTabs"
            :key="index"
            class="tab-pane"
            :class="index === trainIndex ? 'cur-tab' : ''"
            @mouseenter="trainTabClick(tab.dictionaries_id, index)">
            {{tab.name}}
          </li>
        </ul>
      </div>
      <div class="train-ul">
        <ul class="clearfix">
          <li
            v-for="item in trainVideoList"
            :key="item.train_id"
            class="train-list">
            <div class="video-img" @click="goInfor(item)">
              <img class="yn-fill-img" :src="item.url" alt="">
              <i class="play-icon" v-if="item.type == 1"></i>
            </div>
            <div class="video-name yn-text-ellipsis" @click="goInfor(item)">{{item.title}}</div>
            <div class="video-infor clearfix">
              <p class="price">
                ¥
                <span>{{item.price | videoPriceFil}}</span>
              </p>
              <p class="watch-number">
                {{item.clicknum}}人已观看
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getTrainType, getTraninList } from '@/api/index'
export default {
  data() {
    return {
      // 培训体验服务
      trainIndex: 0,
      trainTabs: [],
      trainAllList: [],
      trainVideoList: []
    }
  },
  filters: {
    // 视频价格
    videoPriceFil(value) {
      if(value == 0) {
        return '免费'
      } else {
        return value
      }
    }
  },
  mounted() {
    this.getTrainTypeList()
  },
  methods: {
    // 获取培训体验服务类型列表
    getTrainTypeList() {
      getTrainType().then(res => {
        if(res.success) {
          this.trainTabs = res.resultList
          this.getTrainAllList()
        }
      })
    },

    // 获取所有培训体验服务列表
    getTrainAllList() {
      getTraninList().then(res => {
        if(res.success) {
          this.trainAllList = res.resultList
          // 根据类型获取相应的列表
          this.getTypeTrainList(this.trainTabs[0].dictionaries_id)
        }
      })
    },

    // 根据类型获取相应的列表
    getTypeTrainList(id) {
      this.trainVideoList = []
      for(let i=0; i<this.trainAllList.length; i++) {
        if(this.trainAllList[i].type_id === id) {
          this.trainVideoList.push(this.trainAllList[i])
        }
      }
    },

    // 切换培训体验服务标签
    trainTabClick(id, index) {
      this.trainIndex = index
      this.getTypeTrainList(id)
    },

    // 调整到详情页
    goInfor(item) {
      if(item.type == 1) {
        this.$router.push({ path: '/coursePlay', query: { id: item.train_id }})
      } else {
        this.$router.push({ path: '/trainServiceInfor', query: { id: item.train_id }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* 培训体验服务 */
.train-service {
  .train-content {
    padding: 8px 15px;
    .yn-block-tabs {
      .tab-pane {
        width: 196px;
      }
    }
    .train-ul {
      margin: 12px 0;
      .train-list {
        width: 285px;
        min-height: 264px;
        font-size: 20px;
        line-height: 28px;
        border: 1px solid $base-border-color;
        padding: 8px;
        margin-right: 10px;
        box-sizing: border-box;
        float: left;
        &:nth-of-type(4n) {
          margin-right: 0;
        }
        .video-img {
          width: 100%;
          height: 160px;
          display: block;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          .play-icon {
            width: 50px;
            height: 50px;
            background: rgba(53, 53, 53,.5);
            border-radius: 50%;
            margin: -25px 0 0 -25px;
            position: absolute;
            left: 50%;
            top: 50%;
            &:after {
              content: "";
              width: 20px;
              height: 20px;
              background: url('~@/../static/images/base-icon.png') -50px -50px no-repeat;
              margin: 15px;
              display: block;
            }
          }
        }
        .video-name {
          margin-top: 16px;
          display: block;
          cursor: pointer;
        }
        .video-infor {
          margin-top: 12px;
          .price {
            color: #FF0000;
            float: left;
          }
          .watch-number {
            font-size: 16px;
            color: #BA0000;
            text-decoration: underline;
            float: right;
          }
        }
      }
    }
  }
}
</style>
