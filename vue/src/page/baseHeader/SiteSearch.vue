<template>
  <div class="site-search-wrapper">
    <!-- 站点搜索 -->
    <div class="header-content">
      <div class="w1200 clearfix">
        <router-link to="/index" class="logo">
          <img src="@/../static/images/header-logo.png" alt>
        </router-link>
        <div class="site-switch">
          <p class="site-name yn-text-ellipsis">{{siteData.name}}</p>
          <router-link to="/siteSwitch" class="site-btn clearfix">
            <span class="yn-fl">切换站点</span>
            <i></i>
          </router-link>
        </div>
        <div class="head-search">
          <div class="search-item">
            <!-- <div class="search-select" :class="iscur == 1 ? 'current' : ''">
              <div class="select-hd" @click="onSelectType">
                <span>{{searchData.typeName}}</span>
              </div>
              <div class="select-bd">
                <ul>
                  <li 
                    v-for="item in typeList" 
                    :key="item.id" 
                    class="option-list"
                    @click="onChoiceType(item)">
                      {{item.name}}
                  </li>
                </ul>
              </div>
            </div> -->
            <div class="search-input">
              <el-input v-model="searchData.text"></el-input>
            </div>
          </div>
          <div class="search-btn">
            <i class="search-icon"></i>
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
      // 站点信息
      siteData: {},

      // 搜索信息
      searchData: {
        type: '',
        typeName: '资讯',
        text: ''
      },
      typeList: [
        { id: 1, name: '资讯' },
        { id: 2, name: '益农社' },
      ],
      iscur: 0
    }
  },
  mounted() {
    this.getSiteData()
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.getSiteData()
    }
  },
  methods: {
    // 获取站点信息
    getSiteData() {
      this.siteData = this.$store.state.siteData
    },

    // 点击搜索分类
    onSelectType() {
      if(this.iscur == 0) {
        this.iscur = 1
      } else {
        this.iscur = 0
      }
    },
    // 选择搜索分类
    onChoiceType(item) {
      this.iscur = 0
      this.searchData.typeName = item.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/header";
</style>
<style lang="scss">
.site-search-wrapper {
  .head-search {
    .search-input {
      .el-input {
        .el-input__inner {
          height: 36px;
          line-height: 36px;
          border: 0 none;
        }
      }
    }
  }
}
</style>
