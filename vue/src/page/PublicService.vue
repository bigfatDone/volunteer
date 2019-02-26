<template>
  <div class="public-wrapper yn-sub-wrapper">
    <div class="w1200">
      <!-- 头部条件搜索 -->
      <div class="yn-condition-screen">
        <div class="yn-screen-hd">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>益农信息社</el-breadcrumb-item>
            <el-breadcrumb-item>不限</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="yn-screen-bd">
          <ul>
            <li class="screen-item clearfix">
              <div class="item-label">
                <div class="label-name">等级：</div>
              </div>
              <ul class="item-ul clearfix">
                <li
                  v-for="list in gradeList"
                  :key="list.id"
                  class="item-list"
                  :class="list.id == gradeIndex ? 'current' : ''">
                  {{list.name}}
                </li>
              </ul>
            </li>
            <li class="screen-item clearfix">
              <div class="item-label">
                <div class="label-name">区域：</div>
              </div>
              <ul class="item-ul clearfix">
                <el-form ref="addrForm" :model="addrForm" size="mini" class="screen-form">
                  <el-form-item>
                    <el-select v-model="addrForm.city" placeholder="请选择市">
                      <el-option
                        v-for="item in cityList"
                        :key="item.xzqy_id"
                        :label="item.shi"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="addrForm.area" placeholder="请选择区(县)">
                      <el-option
                        v-for="item in areaList"
                        :key="item.xzqy_id"
                        :label="item.xian"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="addrForm.country" placeholder="请选择街道(镇)">
                      <el-option
                        v-for="item in countryList"
                        :key="item.xzqy_id"
                        :label="item.zhen"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="addrForm.village" placeholder="请选择村(居)">
                      <el-option
                        v-for="item in villageList"
                        :key="item.xzqy_id"
                        :label="item.cun"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- 益农社列表 -->
      <div class="ynclub-list">
        <ul>
          <li class="club-item">
            <router-link to="">
              <div class="item-img">
                <img src="" alt="">
              </div>
              <div class="item-infor">
                <div class="infor-name"></div>
                <div class="infor-type"></div>
              </div>
              <div class="item-contact">
                <div class="contact-phone"></div>
                <div class="contact-addr"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gradeIndex: 1,
      gradeList: [
        {
          id: '1',
          name: 'A类社'
        },
        {
          id: '2',
          name: 'B类社'
        },
        {
          id: '3',
          name: '县级运营中心'
        }
      ],

      addrForm: {
        city: '',
        area: '',
        country: '',
        village: ''
      },
      cityList: [],
      areaList: [],
      countryList: [],
      villageList: []
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>

</style>
