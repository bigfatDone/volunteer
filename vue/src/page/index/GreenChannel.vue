<template>
  <div class="green-channel clearfix">
    <div class="channel-title">
      <i class="tree-icon"></i>
      <p class="title-name">益农绿色通道</p>
    </div>
    <div class="channel-form">
      <el-form ref="addrForm" :rules="rules" :model="addrForm" size="medium" label-width="70px">
        <el-form-item label="市" v-if="cityState === 1" label-width="55px" prop="city">
          <el-select v-model="addrForm.city" placeholder="请选择市" @change="getAreaList">
            <el-option
              v-for="item in cityList"
              :key="item.xzqy_id"
              :label="item.shi"
              :value="item.xzqy_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区(县)" v-if="areaState === 1" prop="area">
          <el-select v-model="addrForm.area" placeholder="请选择区(县)" @change="getCountyList">
            <el-option
              v-for="item in areaList"
              :key="item.xzqy_id"
              :label="item.xian"
              :value="item.xzqy_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="街道(镇)" v-if="countryState === 1" label-width="90px" prop="country">
          <el-select v-model="addrForm.country" placeholder="请选择街道(镇)" @change="getVillageList">
            <el-option
              v-for="item in countryList"
              :key="item.xzqy_id"
              :label="item.zhen"
              :value="item.xzqy_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="村(居)" v-if="villageState === 1" prop="village">
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
      <div class="channel-btn" @click="onChannelBtn(addrForm.village)">立即进入</div>
    </div>
  </div>
</template>

<script>
import { getArea } from '@/api/index'
export default {
  data() {
    return {
      // 绿色通道
      addrForm: {
        city: '',
        area: '',
        country: '',
        village: ''
      },
      cityState: 1,
      cityList: [],
      areaState: 1,
      areaList: [],
      countryState: 1,
      countryList: [],
      villageState: 1,
      villageList: [],

      // 校验规则
      rules: {
        city: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        area: [
          { required: true, message: '请选择区(县)', trigger: 'change' }
        ],
        country: [
          { required: true, message: '请选择街道(镇)', trigger: 'change' }
        ],
        village: [
          { required: true, message: '请选择村(居)', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.checkAddrData()
  },
  methods: {
    // 根据站点显示不同选项
    checkAddrData() {
      let siteData = this.$store.state.siteData
      if(siteData.grade === 1) {
        this.cityState = 1
        this.areaState = 1
        this.countryState = 1
        this.villageState = 1
        this.getSityList(siteData.pid)
      } else if(siteData.grade === 2) {
        this.cityState = 0
        this.areaState = 1
        this.countryState = 1
        this.villageState = 1
        this.getAreaList(siteData.pid)
      } else if(siteData.grade === 3) {
        this.cityState = 0
        this.areaState = 0
        this.countryState = 1
        this.villageState = 1
        this.getCountyList(siteData.pid)
      } else {
        this.cityState = 0
        this.areaState = 0
        this.countryState = 0
        this.villageState = 0
      }
    },

    // 根据省id获取市列表
    getSityList(provinceId) {
      getArea({ pid: provinceId }).then(res => {
        if(res.success) {
          // 初始化
          this.cityList = []
          this.areaList = []
          this.countryList = []
          this.villageList = []
          this.addrForm.city = ''
          this.addrForm.area = ''
          this.addrForm.country = ''
          this.addrForm.village = ''
          // 获取列表
          this.cityList = res.resultList
        }
      })
    },

    // 根据市id获取区列表
    getAreaList(cityId) {
      getArea({ pid: cityId }).then(res => {
        if(res.success) {
          // 初始化
          this.areaList = []
          this.countryList = []
          this.villageList = []
          this.addrForm.area = ''
          this.addrForm.country = ''
          this.addrForm.village = ''
          // 获取列表
          this.areaList = res.resultList
        }
      })
    },

    // 根据区id获取乡列表
    getCountyList(areaId) {
      getArea({ pid: areaId }).then(res => {
        if(res.success) {
          // 初始化
          this.countryList = []
          this.villageList = []
          this.addrForm.country = ''
          this.addrForm.village = ''
          // 获取列表
          this.countryList = res.resultList
        }
      })
    },

    // 根据乡id获取村列表
    getVillageList(countyId) {
      getArea({ pid: countyId }).then(res => {
        if(res.success) {
          // 初始化
          this.villageList = []
          this.addrForm.village = ''
          // 获取列表
          this.villageList = res.resultList
        }
      })
    },

    // 点击立即进入
    onChannelBtn(id) {
      this.$refs.addrForm.validate(valid => {
        if(valid) {
          this.$router.push({ path: '/ynongClubInfor/', query: { id: id} })
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
/* 绿色通道 */
.green-channel {
  background: #fff;
  padding: 20px 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  .channel-title {
    font-size: 24px;
    color: $base-color;
    line-height: 60px;
    float: left;
    .tree-icon {
      width: 54px;
      height: 60px;
      background: url('~@/../static/images/base-icon.png') -133px -10px no-repeat;
      float: left;
    }
    .title-name {
      text-decoration: underline;
      margin-left: 10px;
      float: left;
    }

  }
  .channel-form {
    margin: 8px 0;
    float: left;
  }
  .channel-btn {
    width: 140px;
    height: 44px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 44px;
    background: $base-color;
    float: left;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.green-channel {
  .channel-form {
    .el-form {
      margin: 4px 0;
      float: left;
      .el-form-item {
        margin: 0 16px 0 0;
        float: left;
        .el-form-item__label {
          font-size: 20px;
          color: #333;
          padding-right: 8px;
          &::before {
            content: '';
            margin-right: 0;
          }
        }
        .el-form-item__content {
          width: 120px;
        }
      }
    }
  }
}
</style>