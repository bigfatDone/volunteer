<template>
  <div>
    <base-header></base-header>
    <router-view class="index-template"></router-view>
    <base-footer></base-footer>
  </div>
</template>

<style lang="scss" scoped>
.index-template {
  min-height: 680px;
}
</style>
