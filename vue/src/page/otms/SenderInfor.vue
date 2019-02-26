<template>
  <div class="send-express-modu">
    <div class="w1200">
      <!-- 步骤条 -->
      <express-header :acitveStep="acitveStep"></express-header>
      <div class="send-message-content">
        <div class="send-title-tip">
          <span class="send-tip-name">寄方信息</span>
          <span class="required-tip">标 * 为必填项</span>
        </div>
      </div>
      <div class="step-one-form">
        <el-form
          :model="sendExpressForm"
          :rules="sendExpressFormRules"
          ref="sendExpressForm"
          label-width="135px"
        >
          <el-form-item label="姓名:" prop="userName">
            <el-input v-model="sendExpressForm.userName" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="userPhone">
            <el-input v-model="sendExpressForm.userPhone" placeholder="请填写联系电话"></el-input>
          </el-form-item>
          <el-form-item label="省/市/区:" prop="userCity">
            <el-input
              v-model="sendExpressForm.userCity"
              placeholder="请选择所在省市区，例如：广东省-广州市-越秀区"
              @focus="showCity"
            ></el-input>
            <div class="choose-city-content" v-show="isShow" @mouseup="showCity">
              <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="省份" name="1">
                  <div
                    class="city-name yn-text-ellipsis"
                    v-for="(item, index) in userProvinceList"
                    :key="index"
                    @click="chooseProvince(item)"
                  >{{item}}</div>
                </el-tab-pane>
                <el-tab-pane label="市区" name="2">
                  <div
                    class="city-name yn-text-ellipsis"
                    v-for="(item, index) in userCityList"
                    :key="index"
                    @click="chooseCity(item)"
                  >{{item}}</div>
                </el-tab-pane>
                <el-tab-pane label="县区" name="3">
                  <div
                    class="city-name yn-text-ellipsis"
                    v-for="(item, index) in countryList"
                    :key="index"
                    @click="chooseCounty(item)"
                  >{{item}}</div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-form-item>
          <el-form-item label="详细地址:" prop="address">
            <el-input v-model="sendExpressForm.address" placeholder="请填写详细地址"></el-input>
          </el-form-item>
          <el-form-item label="发货备注:" prop="remark">
            <el-input v-model="sendExpressForm.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="公司名称:">
            <el-input v-model="sendExpressForm.conpanyName" placeholder="请输入公司名称（选填）"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="next-content"  @click="submitForm('sendExpressForm')" >
        <div class="next-tip">下一步</div>
        <div class="next-icon">
          <img src="@/../static/img/otms/next.png" class="next-img">
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
  data() {
    // 表单校验---姓名
    const checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("姓名不能为空"));
      } else if (/\s/.test(this.sendExpressForm.userName)) {
        callback(new Error("姓名不能输入空格"));
      } else if (
        !/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.sendExpressForm.userName)
      ) {
        callback(new Error("姓名不能为空且只能输入中文字符或英文字符"));
      } else {
        callback();
      }
    };
    // 表单校验---电话
    const checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("电话不能为空"));
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.sendExpressForm.userPhone)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    // 表单校验---城市地址
    const checkCity = (rule, value, callback) => {
      console.log(11111)
      console.log(this.sendExpressForm.userCity)
      console.log(this.sendExpressFormRules.userCity[0].required)
      if (value === "") {
        callback(new Error("城市地址不能为空"));
      } else {
        callback();
      }
    };
    // 表单校验---具体地址
    const checkAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("具体地址不能为空"));
      } else if (/\s/.test(this.sendExpressForm.address)) {
        callback(new Error("具体地址不能输入空格"));
      } else {
        callback();
      }
    };
    // 表单校验---备注
    const checkRemark = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("发货备注不能为空"));
      } else if (/\s/.test(this.sendExpressForm.remark)) {
        callback(new Error("发货备注不能输入空格"));
      } else {
        callback();
      }
    };
    return {
      acitveStep: "0", // 步骤
      // 表单
      sendExpressForm: {
        userName: "", // 姓名
        userPhone: "", // 电话
        userCity: "", // 城市
        address: "", // 具体地址
        remark: "", // 备注
        conpanyName: "" // 企业名称
      },
      isShow: false, // 控制选择城市
      activeTab: "1", // 面板
      userProvinceList: [], // 记录全部省
      userCityList: [], // 记录全部市
      countryList: [], // 记录全部区
      province: "", // 选择的省
      city: "", // 选择的城市
      country: "", // 选择的区
      // 校验表单
      sendExpressFormRules: {
        userName: [{ required: true, validator: checkName, trigger: "blur" }],
        userPhone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        userCity: [{ required: true, validator: checkCity, trigger: " " }],
        address: [{ required: true, validator: checkAddress, trigger: "blur" }],
        remark: [{ required: true, validator: checkRemark, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getData();
    console.log('1111')
    console.log(this.$store.state.senderInfo)
  },
  methods: {
    getData() {
      if (this.$store.state.senderInfo != null) {
        let sendData = {};
        sendData = this.$store.state.senderInfo;
        this.sendExpressForm.userName = sendData.SENDER_NAME;
        this.sendExpressForm.userPhone = sendData.SENDER_PHONE;
        this.sendExpressForm.userCity =
          sendData.PROVINCE + "-" + sendData.CITY + "-" + sendData.COUNTY;
        this.province = sendData.PROVINCE;
        this.city = sendData.CITY;
        this.country = sendData.COUNTY;
        this.sendExpressForm.address = sendData.SENDER_ADDRESS;
        this.sendExpressForm.remark = sendData.MEMO;
        this.sendExpressForm.conpanyName = sendData.CMAPANY_NAME;
      } else {
        this.city = "";
        this.province = "";
        this.country = "";
        this.sendExpressForm.address = "";
      }
    },
    // 显示省
    showCity() {
      this.isShow = true;
      this.activeTab = "1";
      this.sendExpressFormRules.userCity[0].trigger = "change";
      // 获取省份
      getProvinceList().then(res => {
        this.userProvinceList = res.returnMap.provinceList;
      });
    },
    // 点击了省份
    chooseProvince(value) {
      this.activeTab = "2";
      getCityList({
        PROVINCE: value
      }).then(res => {
        this.userCityList = res.returnMap.provinceList;
        this.province = value;
        this.city = "";
        this.sendExpressForm.userCity = value;
      });
    },
    // 点击了市获取区
    chooseCity(city) {
      this.activeTab = "3";
      getCountryList({
        CITY: city
      }).then(res => {
        this.countryList = res.returnMap.cityList;
        this.city = city;
        this.country = "";
        this.sendExpressForm.userCity = this.province + "-" + this.city;
      });
    },
    // 选择了区
    chooseCounty(country) {
      this.isShow = false;
      this.country = country;
      this.sendExpressForm.userCity =
        this.province + "-" + this.city + "-" + this.country;
        this.checkCity;
    },
    // 获取省市区
    handleClick(tab, event) {},
    // 点击下一步
    submitForm(formName) {
      this.sendExpressFormRules.userCity[0].trigger = "change";
      if (this.country == "" || this.city == "" || this.province == "") {
        this.$message.warning("请选择正确的地址的地址");
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 寄件人信息
          let senderInfo = {};
          senderInfo.SENDER_NAME = this.sendExpressForm.userName;
          senderInfo.PROVINCE = this.province;
          senderInfo.CITY = this.city;
          senderInfo.COUNTY = this.country;
          senderInfo.SENDER_ADDRESS = this.sendExpressForm.address;
          senderInfo.SENDER_PHONE = this.sendExpressForm.userPhone;
          senderInfo.MEMO = this.sendExpressForm.remark;
          senderInfo.CMAPANY_NAME = this.sendExpressForm.conpanyName;
          this.$store.commit("updateSenderData", senderInfo);
          // 跳转到收件人
          this.$router.push("/otms/otmsAddressee");
        } else {
          this.$message.warning("带星号为必填项，请填写完整");
          return false;
        }
      });
    }
  },
  components: {
    expressHeader
  }
};
</script>

<style lang="scss" scoped>
.send-express-modu {
  width: 100%;
  min-width: 1200px;
  .w1200 {
    min-height: 900px;
    .send-message-content {
      width: 900px;
      margin: 0 auto;
      clear: both;
      padding: 60px 0 39px 173px;
      .send-tip-name {
        font-size: 30px;
        color: #111;
        font-weight: bold;
      }
      .required-tip {
        font-size: 16px;
        color: #bbb;
        margin-left: 10px;
      }
    }
    .step-one-form {
      width: 720px;
      margin-top: 10px;
      margin: 0 auto;
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
    }
    .next-content {
      width: 240px;
      height: 56px;
      line-height: 56px;
      float: right;
      background: #ff720b;
      text-align: center;
      font-size: 20px;
      color: #fff;
      margin-top: 40px;
      margin-right: 145px;
      cursor: pointer;
      .next-tip {
        float: left;
        margin-left: 88px;
      }
      .next-icon {
        width: 24px;
        height: 24px;
        float: right;
        margin-top: 14px;
        margin-right: 20px;
        .next-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.step-one-form {
  .el-form-item__label {
    font-size: 24px;
    color: #4a4a4a;
  }
  .el-input {
    font-size: 18px;
  }
}
.choose-city-content {
  .el-tabs__item {
    font-size: 18px;
  }
}
</style>



