<template>
  <div class="site-switch-wrapper">
    <div class="w1200">
      <div class="site-content">
        <ul>
          <li class="site-item clearfix">
            <div class="item-name">
              <div class="item-btn">历史记录</div>
            </div>
            <div class="item-ul clearfix">
              <div 
                v-for="item in recordList"
                :key="item.pid"
                class="site-list"
                @click="siteChoice(item.pid, item.name, item.grade, item.parentId, item.parentName)">
                <div class="list-name">{{item.name}}</div>
              </div>
            </div>
          </li>
          <li 
            v-for="item in addrList"
            :key="item.id"
            class="site-item clearfix">
            <div class="item-name">
              <div class="item-btn" @click="siteChoice(item.id, item.provinceName, 1, '', '')">
                {{item.provinceName}}
              </div>
            </div>
            <div class="item-ul clearfix">
              <div
                v-for="second in item.cityList"
                :key="second.id"
                class="site-list"
                @mouseenter="countyShow(second.id)"
                @mouseleave="countyHidden(second.id)">
                <div class="list-name" @click="siteChoice(second.id, second.cityName, 2, '', '')">
                  {{second.cityName}}
                </div>
                <ul class="list-sub" :class="second.id === secondIndex ? 'current' : ''">
                  <li
                    v-for="third in second.countyList"
                    :key="third.id"
                    class="sub-item"
                    @click="siteChoice(third.id, third.countyName, 3, second.id, second.cityName)">
                    {{third.countyName}}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllAreaList } from '@/api/second'
export default {
  data() {
    return {
      recordList: [],
      secondIndex: '',
      addrList: [
        {
          id: 64195,
          provinceName: '广东省',
          cityList: []
        }
      ]
    }
  },
  mounted() {
    // 获取所有省市县
    getAllAreaList().then(res => {
      this.addrList[0].cityList = res
    })
    this.getHistoryRecord()
  },
  methods: {
    // 获取历史记录站点
    getHistoryRecord() {
      let storageRecord = JSON.parse(localStorage.getItem('historyRecordSite'))
      if(storageRecord) {
        this.recordList = storageRecord
      } else {
        this.recordList = []
      }
    },
    // 鼠标移进市按钮
    countyShow(num) {
      this.secondIndex = num
    },
    // 鼠标移出市按钮
    countyHidden(num) {
      this.secondIndex = ''
    },
    // 站点选择
    siteChoice(id, name, grade, parentId, parentName) {
      const siteData = {
        pid: id,
        name: name,
        grade: grade,
        parentId: parentId,
        parentName: parentName
      }
      this.$store.commit('updateSite', siteData)
      // 将新选的站点添加都历史记录数组中
      let newArray = []
      newArray = this.recordList
      newArray.unshift(JSON.parse(JSON.stringify(siteData)))
      // 对象数组去重
      let obj = {}
      newArray = newArray.reduce((cur, next) => {
        obj[next.pid] ? '' : obj[next.pid] = true && cur.push(next)
        return cur
      }, [])
      newArray = newArray.slice(0, 10)
      localStorage.setItem('historyRecordSite', JSON.stringify(newArray))
      this.recordList = newArray
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss" scoped>
.site-content {
  border: 1px solid $base-border-color;
  padding: 0 12px;
  margin: 40px 0;
  .site-item {
    border-bottom: 1px dashed $base-border-color;
    padding: 44px 30px;
    &:nth-last-of-type(1) {
      border-bottom: 0 none;
    }
    .item-name {
      width: 150px;
      float: left;
      .item-btn {
        font-size: 20px;
        color: #444;
        line-height: 38px;
        border: 1px solid $base-border-color;
        padding: 0 20px;
        float: right;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: $base-color;
          border-color: $base-color;
        }
      }
    }
    .item-ul {
      margin-left: 170px;
      .site-list {
        display: inline-block;
        position: relative;
        cursor: pointer;
        .list-name {
          font-size: 18px;
          line-height: 20px;
          padding: 10px 20px;
          float: left;
          &:hover {
            color: #EE5200;
          }
        }
        .list-sub {
          width: 462px;
          background: #F3F3F3;
          border: 1px solid #D8D8D8;
          padding: 10px;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 40px;
          z-index: 2;
          display: none;
          &.current {
            display: block;
          }
          .sub-item {
            font-size: 16px;
            line-height: 16px;
            padding: 8px 20px;
            float: left;
            &:hover {
              color: #EE5200;
            }
          }
        }
      }
    }
  }
}
</style>
