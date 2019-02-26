<template>
  <div>
    <div class="info-main">
      <ul class="item-modu">
        <li class="option-item clearfix">
          <div class="item-left must-term">
            <p class="item-name">工作类型</p>
          </div>
          <div class="item-right select-term">
            <p class="item-value">拓展</p>
          </div>
        </li>
        <li class="option-item clearfix">
          <div class="item-left single-term must-term">
            <p class="item-name">工作类型</p>
          </div>
          <div class="single-value">
            <textarea class="item-textarea"></textarea>
          </div>
        </li>
      </ul>
      <ul class="item-modu">
        <li class="option-item clearfix">
          <div class="item-left single-term must-term">
            <p class="item-name">工作类型</p>
          </div>
          <div class="single-value">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgDialog">
              <img width="100%" :src="imageUrl" alt="">
            </el-dialog>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片上传
      imgDialog: false,
      imageUrl: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/promoter/base";
</style>
