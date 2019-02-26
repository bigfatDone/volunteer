<template>
  <div>
    <div class="info-main">
      <ul class="item-modu">
        <li class="option-item clearfix">
          <div class="item-left must-term">
            <p class="item-name">真实姓名</p>
          </div>
          <div class="item-right">
            <input type="text" class="item-input" placeholder="请输入真实姓名">
          </div>
        </li>
        <li class="option-item clearfix">
          <div class="item-left must-term">
            <p class="item-name">手机号码</p>
          </div>
          <div class="item-right">
            <input type="text" class="item-input" placeholder="请输入手机号码">
          </div>
        </li>
        <li class="option-item clearfix">
          <div class="item-left must-term">
            <p class="item-name">性别</p>
          </div>
          <div class="item-right select-term" @click="onEditSex">
            <p class="item-value">{{userInfor.sex}}</p>
          </div>
        </li>
        <li class="option-item clearfix">
          <div class="item-left must-term">
            <p class="item-name">年龄</p>
          </div>
          <div class="item-right select-term" @click="onEditAge">
            <p class="item-value">{{userInfor.age}}</p>
          </div>
        </li>
      </ul>
    </div>
    <phone-selectr ref="vantPicker"></phone-selectr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfor: {
        name: '',
        phone: '',
        sex: '',
        age: ''
      },
      selectSex: '',
      selectAge: '',
      sexList: [
        { id: 1, text: '男' },
        { id: 2, text: '女' }
      ],
      ageList: []
    }
  },
  mounted() {
    this.getAgeList()
  },
  methods: {
    // 获取年龄列表
    getAgeList() {
      for(let i = 16; i<100; i++) {
        this.ageList.push(i)
      }
    },
    // 修改性别
    onEditSex() {
      this.$refs.vantPicker.getData('selectSex', this.sexList)
    },
    // 修改年龄
    onEditAge() {
      this.$refs.vantPicker.getData('selectAge', this.ageList)
    }
  },
  watch: {
    selectSex(newVal, oldVal) {
      this.userInfor.sex = newVal.text
    },
    selectAge(newVal, oldVal) {
      this.userInfor.age = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/promoter/base";
</style>
