<template>
  <div class="public-service yn-index-item">
    <div class="yn-item-title">
      <div class="title-left">
        <p class="title-name">公益服务</p>
      </div>
      <div class="title-right">
        <router-link to="/publicService" class="more-btn">更多>></router-link>
      </div>
    </div>
    <div class="service-content">
      <div class="yn-block-tabs">
        <ul class="clearfix public-tabs">
          <li 
            v-for="(tab, index) in publicTabs"
            :key="tab.dictionaries_id"
            class="tab-pane"
            :class="index === publicIndex ? 'cur-tab' : ''"
            @mouseenter="publicTabClick(tab.dictionaries_id, index)">
            {{tab.name}}
          </li>
        </ul>
      </div>
      <div class="service-ul">
        <ul class="clearfix">
          <li 
            v-for="list in publicList"
            :key="list.policy_news_id"
            class="service-list">
            <router-link :to="{ path: '/publicServiceInfo', query: { id: list.policy_news_id } }" class="service-itme">
              <div class="item-img">
                <img class="yn-fill-img" :src="list.photos" alt="">
              </div>
              <div class="item-infor">
                <div class="item-title yn-text-ellipsis">{{list.title}}</div>
                <div class="category-time">
                  <span class="item-category">{{list.namea}}</span>
                  <span class="item-time">{{list.creat_time}}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getPublicType, getPublicList } from '@/api/index'
export default {
  data() {
    return {
      // 公益服务
      publicIndex: 0,
      publicTabs: [],
      PublicAllList: [],
      publicList: []
    }
  },
  mounted() {
    this.getPublicTabsList()
  },
  methods: {
    // 获取公益服务类型列表
    getPublicTabsList() {
      getPublicType().then(res => {
        if(res.success) {
          this.publicTabs = res.resultList.slice(0, 7)
          this.getPublicAllList()
        }
      })
    },

    // 获取所有公益服务列表
    getPublicAllList() {
      getPublicList().then(res => {
        if(res.success) {
          this.PublicAllList = res.resultList
          // 根据公益服务类型获取相应列表
          this.getTypePublicList(this.publicTabs[0].dictionaries_id)
        }
      })
    },

    // 根据公益服务类型获取相应列表
    getTypePublicList(id) {
      this.publicList = []
      for(let i=0; i<this.PublicAllList.length; i++) {
        if(this.PublicAllList[i].type_id === id) {
          this.publicList.push(this.PublicAllList[i])
        }
      }
    },

    // 切换公益服务标签
    publicTabClick(id, index) {
      this.publicIndex = index
      this.getTypePublicList(id)
    }
  }
}
</script>

<style lang="scss" scoped>
/* 公益服务 */
.public-service {
  .service-content {
    padding: 8px 15px;
    .yn-block-tabs {
      .public-tabs {
        display: flex;
      }
      .tab-pane {
       flex: 1
      }
    }
    /* 新闻列表 */
    .service-ul {
      margin: 4px 0 10px 0;
      .service-list {
        width: 49%;
        border-bottom: 1px solid $base-border-color;
        padding: 16px 0;
        float: left;
        margin-right: 2%;
        &:nth-of-type(2n) {
          margin-right: 0;
        }
        .service-itme {
          display: block;
          .item-img {
            width: 154px;
            height: 98px;
            overflow: hidden;
            float: left;
          }
          .item-infor {
            margin-left: 174px;
            .item-title {
              font-size: 22px;
              color: #666;
              line-height: 36px;
            }
            .category-time {
              font-size: 14px;
              color: #ccc;
              line-height: 20px;
              margin-top: 38px;
              .item-time {
                margin-left: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
