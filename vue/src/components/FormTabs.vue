<template>
  <div class="info-head-tabs">
    <div class="w1200">
      <div class="clearfix">
        <router-link  
          v-for="item in infoTabs"
          :key="item.id"
          :to="item.routerLink"
          class="tabs-pane"
          :class="item.id === tabsIndex ? 'current' : ''"
          v-show="item.id !== 3 || (item.id == 3 && tabShow == true)">
          <i class="pane-icon"></i>
          <p class="pane-name">{{item.name}}</p>
        </router-link>
        <router-link tag="a" target="_blank" class="tabs-pane" to="/declareGuide">
          <i class="pane-icon"></i>
          <p class="pane-name">益农信息社申报指南</p>
        </router-link>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tabData'],
  data() {
    return {
      tabInfor: this.tabData,
      tabsIndex: 0,
      tabShow: false,
      infoTabs: [
        { id: 1, name: '信息员信息', routerLink: '/form/userInfor' },
        { id: 2, name: '益农信息社申报资料', routerLink: '/form/declareForm' },
        { id: 3, name: '益农信息社验收资料', routerLink: '/form/supplyForm' }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.tabsIndex = this.tabInfor.curIndex
      if(this.tabInfor.state >= 7) {
        this.tabShow = true
      } else {
        this.tabShow = false
      }
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.info-head-tabs {
  height: 100px;
  background: $base-color;
  .tabs-pane {
    width: 215px;
    height: 100px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    padding: 18px 10px;
    box-sizing: border-box;
    float: left;
    .pane-icon {
      width: 35px;
      height: 35px;
      background: url('~@/../static/images/base-icon.png') -42px -202px;
      margin: 0 auto;
      display: block;
    }
    .pane-name {
      line-height: 22px;
      margin-top: 6px;
    }
    &:nth-of-type(2) {
      .pane-icon {
        background-position-y: -242px;
      }
    }
    &:nth-of-type(3) {
      .pane-icon {
        background-position-y: -282px;
      }
    }
    &:nth-of-type(4) {
      .pane-icon {
        background-position-y: -322px;
      }
    }
    &.current {
      background: #056615;
    }
  }
}

@media screen and (max-width: $phone-max-size) { 
  .info-head-tabs {
    width: 100%;
    height: auto;
    .tabs-pane {
      width: 50%;
      height: 60px;
      padding: 10px;
      .pane-icon {
        display: none;
      }
      &:nth-last-of-type(1) {
        display: none;
      }
    }
  }
}
</style>
