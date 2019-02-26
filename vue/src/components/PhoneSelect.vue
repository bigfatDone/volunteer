<template>
  <van-popup
    v-model="show"
    position="bottom">
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onSure"
      @cancel="show = false"/>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      columns: [],
      varName: ''
    }
  },
  methods: {
    // 获取父组件传过来的值
    getData(name, data) {
      this.varName = name
      this.columns = data
      this.show = true
    },
    // 确定
    onSure(value, index) {
      this.$parent[this.varName] = value
      this.show = false
    }
  }
}
</script>
