<template>
  <div class="whole">
    <div class="balance">
      <div class="mybalance">
        <span>账户余额：￥{{this.personInfo.MONEY}}</span>
      </div>
      <div class="account-detail">
        <span @click="gotoAccountDetal()">账户明细</span>
      </div>
    </div>
    <div class="hr"></div>
    <div class="approve" v-if="this.personInfo.SH_STATUS != 1">
      <div class="title">
        <div>
          <span>{{this.personInfo.ENTRUST_NAME}}</span>
        </div>
        <div>
          <span v-if="this.personInfo.SH_STATUS == 0" class="unPass">审核未通过</span>
          <span v-if="this.personInfo.SH_STATUS == 2" class="submit">已提交未审核</span>
          <span v-if="this.personInfo.SH_STATUS == 3" class="pass">审核通过</span>
        </div>
      </div>
      <div class="contains">
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>名称：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.ENTRUST_NAME}}</span>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>类型：</span>
          </div>
          <div v-if="this.personInfo.TYPE == 1" class="message-content">
            <span>企业</span>
          </div>
          <div v-if="this.personInfo.TYPE == 2" class="message-content">
            <span>个人</span>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>联系人姓名：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.CONTRACT_NAME}}</span>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>手机号码：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.CONTRACT_PHONE}}</span>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>邮箱：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.MAIL}}</span>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>联系地址：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.CONTRACT_ADDR}}</span>
          </div>
        </div>
        <div class="getall clearfix" v-if="this.personInfo.TYPE == 1">
          <div class="introduction-name">
            <span>营业执照：</span>
          </div>
          <div class="photo-content">
            <div v-for="(item, index) in BUSINESS_LICENSE" :key="index" class="business_img">
              <img :src="item" class="image-position">
            </div>
          </div>
        </div>
        <div class="getall clearfix" v-if="this.personInfo.TYPE == 2">
          <div class="introduction-name">
            <span>身份证照：</span>
          </div>
          <div class="photo-content">
            <div v-for="(item, index) in ID_CARD" :key="index" class="business_img">
              <img :src="item" class="image-position">
            </div>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>企业介绍：</span>
          </div>
          <div class="introduction">{{this.personInfo.COMPANY_PROFILE}}</div>
        </div>
        <div class="getall clearfix" v-if="this.personInfo.CERTIFICATE != ''">
          <div class="introduction-name">
            <span>资格证书：</span>
          </div>
          <div class="photo-content">
            <div v-for="(item, index) in CERTIFICATE" :key="index" class="business_img">
              <img :src="item" class="image-position">
            </div>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>官网：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.WEBSITE}}</span>
          </div>
        </div>
        <div class="getall clearfix">
          <div class="introduction-name">
            <span>电商地址：</span>
          </div>
          <div class="message-content">
            <span>{{this.personInfo.PLATFORM}}</span>
          </div>
        </div>
      </div>
      <div class="anew-qualify-btn" v-if="this.personInfo.SH_STATUS == 0">
        <router-link
          :to="{path: '/qualificationAuthentic', query: {name:name, id:id} }"
          class="anew-qualify-btn"
        >重新认证</router-link>
      </div>
    </div>
    <div class="toQualify-content" v-if="this.personInfo.SH_STATUS == 1">
      <div class="noapprove">
        <div class="msg">
          <span>认证通过后，可提交检测申请，让你商品快速成为粤农优品</span>
        </div>
        <div class="to-approve">
          <router-link
            :to="{path: '/qualificationAuthentic', query: {name:name, id:id} }"
            class="router-link-quality"
          >资质认证</router-link>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserDetail } from "@/api/old/person";
export default {
  data() {
    return {
      personInfo: {},
      name: "",
      id: "",
      show: false,
      CERTIFICATE: [],
      ID_CARD: [],
      BUSINESS_LICENSE: [],
      wxUser: ""
    };
  },
  methods: {
    // 获取微信灯登录信息
    getWxUser() {
      this.wxUser = this.$store.state.entrustData;
      this.id = this.wxUser.wxId;
      this.name = this.wxUser.wxName;
    },
    // 跳转到过渡页
    go() {
      this.$router.push({ name: "authenticWait", query: { name: this.name } });
    },
    // 获取信息
    getPersonDetail() {
      this.getWxUser()
      getUserDetail({
        token: this.wxUser.token,
        entrustxxb_id: this.wxUser.wxId
      }).then(res => {
        if (res.success) {
          this.show = true;
          this.personInfo = res.returnMap;
          if (
            res.returnMap.CERTIFICATE != null &&
            res.returnMap.CERTIFICATE != ""
          ) {
            this.CERTIFICATE = res.returnMap.CERTIFICATE.split(",");
          }
          if (res.returnMap.ID_CARD != null && res.returnMap.ID_CARD != "") {
            this.ID_CARD = res.returnMap.ID_CARD.split(",");
          }
          if (
            res.returnMap.BUSINESS_LICENSE != null &&
            res.returnMap.BUSINESS_LICENSE != ""
          ) {
            this.BUSINESS_LICENSE = res.returnMap.BUSINESS_LICENSE.split(",");
          }
        } else {
          if (res.resultList == null) {
            this.show = false;
          }
          if (res.message == "登录信息失效,请重新登录") {
            this.$message.error(res.message);
            let wechatData = {};
            this.$store.commit("updateEntrustData", wechatData);
            this.$router.push({ path: "/index" });
          }
        }
      });
    },
    // 跳转到账户明细
    gotoAccountDetal() {
      this.$router.push({
        name: "account-detail",
        query: { name: this.name, id: this.id }
      });
    }
  },
  mounted() {
    this.getPersonDetail()
  }
};
</script>
<style lang="scss" scoped>
.whole {
  width: 930px;
  height: 100%;
  background-color: #fff;
  .balance {
    box-sizing: border-box;
    height: 120px;
    padding: 40px 50px 39px 80px;
    background-color: #fff;
    .mybalance {
      width: 400px;
      height: 30px;
      float: left;
      font-size: 24px;
      font-family: Adobe Heiti Std R;
      font-weight: normal;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
    }
    .account-detail {
      box-sizing: border-box;
      width: 120px;
      height: 40px;
      float: right;
      padding: 9px 28px;
      background: rgba(153, 153, 153, 1);
      border-radius: 4px;
      span {
        width: 64px;
        height: 16px;
        font-size: 16px;
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        cursor: pointer;
      }
    }
  }
  .hr {
    height: 10px;
    width: 100%;
    background: #f2f2f2;
  }
}
.approve {
  padding: 40px 20px 20px 80px;
  min-height: 870px;
  box-sizing: border-box;
  background: #fff;
  .title {
    height: 28px;
    div:nth-child(1) {
      min-width: 100px;
      height: 26px;
      float: left;
      box-sizing: border-box;
      > span {
        min-width: 100px;
        height: 24px;
        font-size: 24px;
        font-family: Adobe Heiti Std R;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
    }
    div:nth-child(2) {
      width: 138px;
      height: 28px;
      float: left;
      margin-left: 18px;
      box-sizing: border-box;
      > span {
        width: 88px;
        height: 28px;
        font-size: 16px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 35x;
      }
      .unPass {
        padding: 5px 15px;
        background: rgba(255, 102, 0, 1);
        border-radius: 3px;
      }
      .pass {
        padding: 5px 15px;
        background: #019900;
        border-radius: 3px;
      }
      .submit {
        padding: 5px 15px;
        background: #2e8aed;
        border-radius: 3px;
      }
    }
  }
  .contains {
    width: 100%;
    box-sizing: border-box;
    padding: 31px 20px 0px 42px;
    clear: both;
    .getall {
      width: 100%;
      margin-top: 17px;
      .introduction-name {
        width: 108px;
        float: left;
        text-align: right;
        > span {
          height: 18px;
          font-size: 18px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(136, 136, 136, 1);
          line-height: 22px;
        }
      }
      .introduction {
        font-size: 18px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: #888888;
        line-height: 22px;
        clear: both;
        display: inline-block;
        margin-left: 23px;
      }
      .photo-content {
        width: 625px;
        display: inline-block;
        margin-left: 20px;
        .business_img {
          width: 140px;
          float: left;
          height: 84px;
          margin: 4px;
          .image-position {
            width: 100%;
            height: 100%;
          }
        }
      }
      .message-content {
        padding-left: 24px;
        float: left;
        box-sizing: border-box;
        > span {
          font-size: 18px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
      }
    }
    .introduction {
      width: 446px;
      word-break: break-all;
      word-wrap: break-word;
    }
  }

  .anew-qualify-btn {
    width: 230px;
    height: 46px;
    line-height: 46px;
    background: #0da40b;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    color: #fff;
    margin-top: 40px;
    border-radius: 4px;
  }
}
.toQualify-content {
  width: 930px;
  min-height: 880px;
  background-color: #fff;
  .noapprove {
    width: 100%;
    .msg {
      width: 364px;
      height: 16px;
      margin-left: 278px;
      padding-top: 278px;
      font-size: 14px;
      font-family: Adobe Heiti Std R;
      font-weight: normal;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
    .to-approve {
      box-sizing: border-box;
      width: 140px;
      height: 40px;
      background: rgba(23, 155, 213, 1);
      border-radius: 4px;
      padding-left: 38px;
      padding-top: 10px;
      margin-top: 36px;
      margin-left: 390px;
      span {
        width: 64px;
        height: 16px;
        font-size: 16px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
      }
      .router-link-quality {
        color: #fff;
      }
    }
  }
}
</style>
