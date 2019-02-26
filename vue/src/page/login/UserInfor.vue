<template>
  <div class="user-infor-wrapper">
    <formTabs :tab-data="tabData"></formTabs>
    <div class="yn-item-form w1200">
      <!-- 表单头部 -->
      <div class="yn-form-hd">
        <p class="title-name">广东省益农信息社信息员信息</p>
      </div>
      <!-- 表单内容 -->
      <div class="yn-form-bd">
        <el-form :model="userForm" size="medium" label-width="290px" class="info-custom-form">
          <div class="form-item">
            <div class="item-name green-name">信息员信息</div>
            <div class="item-form">
              <el-form-item label="用户名：">
                <el-input v-model="userForm.username" placeholder="请输入用户名" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="手机号码：">
                <el-input v-model="userForm.phone" placeholder="请输入手机号码" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="信息员姓名：">
                <el-input v-model="userForm.name" placeholder="请输入姓名" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="学历：">
                <el-select v-model="userForm.educate" placeholder="请选择学历" :disabled="true">
                  <el-option
                    v-for="item in educationList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄：">
                <el-select v-model="userForm.age" placeholder="请选择年龄段" :disabled="true">
                  <el-option
                    v-for="item in ageList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import formTabs from '@/components/FormTabs'
export default {
  components: {
    formTabs
  },
  data() {
    return {
      // 头部导航数据
      tabData: {
        state: '',
        curIndex: ''
      },
      // 表单数据
      userForm: {
        token: '',
        username: '',
        phone: '',
        name: '',
        educate: '',
        age: ''
      },
      // 下拉列表数据
      educationList: [
        { value: 1, name: '小学' },
        { value: 2, name: '初中' },
        { value: 3, name: '高中' },
        { value: 4, name: '大学及以上' }
      ],
      ageList: [
        { value: 1, name: '35周岁以下（含35）' },
        { value: 2, name: '35周岁至45周岁（含45）' },
        { value: 3, name: '45周岁以上' }
      ]
    }
  },
  mounted() {
    this.getUserInof()
  },
  methods: {
    // 获取用户信息
    getUserInof() {
      let userInfor = this.$store.state.clubLoginInfor
      this.userForm = Object.assign({}, this.userForm, userInfor)
      // 头部导航数据
      this.tabData.state = userInfor.shzt
      this.tabData.curIndex = 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/form";
</style>