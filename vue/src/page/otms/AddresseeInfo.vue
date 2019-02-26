<template>
  <div class="addressee-info">
    <div class="w1200">
      <express-header :acitveStep="acitveStep"></express-header>
      <div class="form-box">
        <el-form ref="addresseeInfos" :rules="rules" :model="addresseeInfos" label-width="150px">
          <div class="form-title">
            <span>收方信息</span>
            <span class="form-title-help">标*为必填项</span>
          </div>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="addresseeInfos.name" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phoneNum">
            <el-input v-model="addresseeInfos.phoneNum" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="省市区：" prop="province">
            <el-input
              v-model="addresseeInfos.province"
              placeholder="请选择所在省市区，例如：广东省-广州市-越秀区"
              @focus="showCity"
            ></el-input>
            <div class="choose-city-content" v-show="isShow" @mouseup="showCity">
              <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="省份" name="1">
                  <div
                    class="city-name yn-text-ellipsis"
                    v-for="(item, index) in provinceName"
                    :key="index"
                    @click="chooseProvince(item)"
                  >{{item}}</div>
                </el-tab-pane>
                <el-tab-pane label="市区" name="2">
                  <div
                    class="city-name yn-text-ellipsis"
                    v-for="(item, index) in cityName"
                    :key="index"
                    @click="chooseCity(item)"
                  >{{item}}</div>
                </el-tab-pane>
                <el-tab-pane label="县区" name="3">
                  <div
                    class="city-name yn-text-ellipsis"
                    v-for="(item, index) in countryName"
                    :key="index"
                    @click="chooseCounty(item)"
                  >{{item}}</div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="addresseeInfos.address" placeholder="请填写详细地址"></el-input>
          </el-form-item>
          <el-form-item label="送货备注：" prop="remark">
            <el-input v-model="addresseeInfos.remark" placeholder="请填写送货备注"></el-input>
          </el-form-item>
          <el-form-item label="公司名称：">
            <el-input v-model="addresseeInfos.company" placeholder="请输入公司名称（选填）"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="foot-button clearfix">
        <div class="Prev-button" @click="toPrev">上一步</div>
        <div class="next-button" @click="toNext('addresseeInfos')">
          <div class="next-text">下一步</div>
          <div class="next-img"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import expressHeader from "./ExpressHeader";
import {
  getProvinceList,
  getCityList,
  getCountryList
} from "@/api/otms/SendExpress";
export default {
  components: {
    expressHeader
  },
  data() {
    // 表单校验---姓名
    const checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else if (/\s/.test(this.addresseeInfos.name)) {
        callback(new Error("姓名不能输入空格"));
      } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.addresseeInfos.name)) {
        callback(new Error("姓名不能为空且只能输入中文字符或英文字符"));
      } else {
        callback();
      }
    };
    // 表单校验---电话
    const checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("电话不能为空"));
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.addresseeInfos.phoneNum)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    // 表单校验---城市地址
    const checkCity = (rule, value, callback) => {
      // this.isShow = true;
      if (value === "") {
        callback(new Error("城市不能为空"));
      } else {
        callback();
      }
    };
    // 表单校验---具体地址
    const checkAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("具体地址不能为空"));
      } else if (/\s/.test(this.addresseeInfos.address)) {
        callback(new Error("具体地址不能输入空格"));
      } else {
        callback();
      }
    };
    // 表单校验---备注
    const checkRemark = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("发货备注不能为空"));
      } else if (/\s/.test(this.addresseeInfos.remark)) {
        callback(new Error("发货备注不能输入空格"));
      } else {
        callback();
      }
    };
    return {
      acitveStep: "1",
      addresseeInfos: {
        name: "",
        phoneNum: "",
        province: "",
        address: "",
        remark: "",
        company: ""
      },
      isShow: false,
      activeTab: "1",
      provinceName: [],
      cityName: [],
      countryName: [],
      addressName: "",
      province: "",
      city: "",
      country: "",
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        phoneNum: [{ required: true, validator: checkPhone, trigger: "blur" }],
        province: [{ required: true, validator: checkCity, trigger: "change" }],
        address: [{ required: true, validator: checkAddress, trigger: "blur" }],
        remark: [{ required: true, validator: checkRemark, trigger: "blur" }]
      }
    };
  },
  mounted() {
    // 获取信息
    this.getReceiveData();
    console.log(this.$store.state.receiverInfo)
  },
  methods: {
    getReceiveData() {
      if (this.$store.state.receiverInfo != null) {
        let receiveData = {};
        receiveData = this.$store.state.receiverInfo;
        this.addresseeInfos.name = receiveData.RECEIVER_NAME;
        this.addresseeInfos.phoneNum = receiveData.RECEIVER_PHONE;
        this.addresseeInfos.province =
          receiveData.PROVINCE +
          "-" +
          receiveData.CITY +
          "-" +
          receiveData.COUNTY;
        this.province = receiveData.PROVINCE;
        this.city = receiveData.CITY;
        this.country = receiveData.COUNTY;
        this.addresseeInfos.address = receiveData.RECEIVER_ADDRESS;
        this.addresseeInfos.remark = receiveData.MEMO;
        this.addresseeInfos.company = receiveData.CMAPANY_NAME;
      } else {
        this.city = "";
        this.province = "";
        this.country = "";
        this.addresseeInfos.address = "";
      }
    },
    // 显示省
    showCity() {
      this.isShow = true;
      this.activeTab = "1";
      // 获取省份
      getProvinceList().then(res => {
        this.provinceName = res.returnMap.provinceList;
      });
    },
    // 点击了省份
    chooseProvince(value) {
      this.activeTab = "2";
      getCityList({
        PROVINCE: value
      }).then(res => {
        this.cityName = res.returnMap.provinceList;
        this.province = value;
        this.city = "";
        this.addresseeInfos.province = value;
      });
    },
    // 点击了市获取区
    chooseCity(city) {
      this.activeTab = "3";
      getCountryList({
        CITY: city
      }).then(res => {
        this.countryName = res.returnMap.cityList;
        this.city = city;
        this.country = "";
        this.addresseeInfos.province = this.province + "-" + this.city;
      });
    },
    // 选择了区
    chooseCounty(country) {
      this.isShow = false;
      this.country = country;
      this.addresseeInfos.province =
        this.province + "-" + this.city + "-" + this.country;
    },
    // 获取省市区
    handleClick(tab, event) {},
    // 点击了上一步
    toPrev() {
      this.$router.push("/otms/otmsSender");
    },
    // 点击下一步
    toNext(formName) {
      if (this.country == "" || this.city == "" || this.province == "") {
        this.$message.warning("请选择正确的地址的地址");
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let receiverInfo = {};
          receiverInfo.RECEIVER_NAME = this.addresseeInfos.name;
          receiverInfo.PROVINCE = this.province;
          receiverInfo.CITY = this.city;
          receiverInfo.COUNTY = this.country;
          receiverInfo.RECEIVER_PHONE = this.addresseeInfos.phoneNum;
          receiverInfo.RECEIVER_ADDRESS = this.addresseeInfos.address;
          receiverInfo.MEMO = this.addresseeInfos.remark;
          receiverInfo.CMAPANY_NAME = this.addresseeInfos.company;
          this.$store.commit("updateReceiverData", receiverInfo);
          this.$router.push("/otms/otmsOrder");
        } else {
          return true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.addressee-info {
  min-width: 1200px;
  .w1200 {
    .form-box {
      width: 900px;
      margin: 0 auto;
      padding: 60px 83px 52px 83px;
      box-sizing: border-box;
      .choose-city-content {
        position: absolute;
        z-index: 2;
        width: 548px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 1px 8px 0px rgba(136, 136, 136, 0.15);
        border-radius: 4px;
        padding-bottom: 25px;
        .title {
          width: 528px;
          height: 55px;
          font-size: 18px;
          margin: 0 auto;
          line-height: 55px;
          .title-name {
            float: left;
            margin: 0 30px;
          }
        }
        .line {
          width: 528px;
          height: 1px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(235, 235, 235, 1);
        }
        .city-name {
          float: left;
          width: 96px;
          height: 30px;
          margin: 3px 15px;
          font-size: 18px;
          cursor: pointer;
          line-height: 30px;
          text-align: center;
        }
        .city-name:hover {
          background: #3a8ce2;
          color: #fff;
        }
      }
      .form-title {
        margin-bottom: 39px;
        font-size: 30px;
        font-weight: bold;
        color: rgba(17, 17, 17, 1);
        .form-title-help {
          font-size: 16px;
          color: rgba(187, 187, 187, 1);
          font-weight: normal;
        }
      }
    }
    .foot-button {
      width: 900px;
      margin: 0 auto 80px auto;
      .Prev-button {
        width: 240px;
        height: 56px;
        float: left;
        cursor: pointer;
        text-align: center;
        line-height: 56px;
        border: 1px solid rgba(237, 237, 237, 1);
        color: rgba(51, 51, 51, 1);
        font-size: 20px;
      }
      .next-button {
        width: 240px;
        height: 56px;
        float: right;
        position: relative;
        text-align: center;
        line-height: 56px;
        background: rgba(255, 114, 11, 1);
        border: 1px solid rgba(237, 237, 237, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 20px;
        cursor: pointer;
        .next-text {
          position: absolute;
          left: 0;
          right: 0;
        }
        .next-img {
          width: 24px;
          height: 24px;
          background: url("/static/img/next-img.png");
          float: right;
          margin-top: 16px;
          margin-right: 10px;
        }
      }
    }
    .clearfix::after {
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
      content: ".";
    }
    .clearfix {
      zoom: 1;
    }
  }
}
</style>
<style lang="scss">
.addressee-info {
  .w1200 {
    .form-box {
      .el-form-item__label {
        font-size: 24px;
        color: #4a4a4a;
      }
      .el-input {
        font-size: 18px;
      }
    }
  }
  .choose-city-content {
    .el-tabs__item {
      font-size: 18px;
    }
  }
}
</style>

