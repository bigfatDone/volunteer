<template>
  <div class="kad-frame">
    <simple-header></simple-header>
    <router-view></router-view>
    <base-footer></base-footer>
    <ShopCart></ShopCart>
  </div>
</template>

<script>
import ShopCart from '@/components/ShopCart'
export default {
  components: {
    ShopCart
  }
}
</script>
