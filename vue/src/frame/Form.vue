<template>
  <div>
    <simple-header class="simple-header"></simple-header>
    <router-view class="login-content"></router-view>
    <base-footer class="base-footer"></base-footer>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: $pc-min-size) {
  .login-content {
    min-height: 750px;
  }
}
@media screen and (min-width: $pad-min-size) and (max-width: $pad-max-size) {}
@media screen and (max-width: $phone-max-size) {
  .simple-header,
  .base-footer {
    display: none;
  }
}
</style>
