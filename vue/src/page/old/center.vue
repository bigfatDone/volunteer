<template>
  <div class="whole">
    <div class="page">
      <div class="contain clearfix">
        <div class="left">
          <div class="msg-top">
            <div class="heads">
              <!--<img src="@/../static/img/old/heads.png">-->
              <img :src="this.headimgurl" class="image-position">
            </div>
            <div class="name">
              <div class="name-total">
                <div class="name-call yn-text-ellipsis">
                  <span>{{this.name}}</span>
                </div>
                <div class="name-person">
                  <span>委托方</span>
                </div>
              </div>
            </div>
          </div>
          <div class="hr"></div>
          <div class="detail">
            <div class="account">
              <router-link
                :to="{path: 'account-msg' }"
                tag="div"
                class="item"
                :class="{'account-active' : active == 'account-msg'}"
              >
                <div
                  class="item-pic account-icon"
                  :class="{'account-active-icon' : active == 'account-msg'}"
                ></div>
                <div class="item-msg pointer">账户详情</div>
              </router-link>
              <router-link :to="{path: 'account-detail' }" tag="div" class="list pointer">账户明细</router-link>
            </div>
            <div class="record">
              <router-link :to="{path: 'record' }" tag="div" class="item">
                <div
                  tag="div"
                  class="item-pic record-icon"
                  :class="{'record-active-icon' :active =='record'}"
                ></div>
                <div class="item-msg pointer">检测认证记录</div>
              </router-link>
              <router-link :to="{path: 'topay'}" tag="div" class="list pointer">待支付</router-link>
              <router-link :to="{path: 'toqualify'}" tag="div" class="list pointer">待检测</router-link>

              <router-link :to="{path: 'qualify'}" tag="div" class="list pointer">检测合格</router-link>
              <router-link :to="{path: 'unqualify'}" tag="div" class="list pointer">检测不合格</router-link>
            </div>
          </div>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "account-msg",
      wxUser: "",
      name: "",
      id: "",
      headimgurl: ""
    };
  },
  mounted() {
    this.getHref();
    this.getWxUser();
  },
  updated() {
    this.getHref();
  },
  methods: {
    getHref() {
      let hr = location.href;
      let arr = hr.split("/");
      this.active = arr[arr.length - 1];
    },
    // 获取微信登录信息
    getWxUser() {
      this.wxUser = this.$store.state.entrustData;
      this.id = this.wxUser.wxId;
      this.name = this.wxUser.wxName;
      this.headimgurl = this.wxUser.wxImg;
    }
  }
};
</script>

<style lang="scss" scoped>
.whole {
  width: 100%;
  background: #f9f9f9;
  .page {
    padding: 0;
    margin: 0 auto;
    padding-top: 20px;
    width: 1200px;
    .contain {
      width: 1200px;
      background-color: #f9f9f9;
      overflow: hidden;
      .left {
        float: left;
        width: 270px;
        height: 100%;
        overflow: hidden;
        padding-bottom: 9999px;
        margin-bottom: -9999px;
        background: rgba(228, 246, 231, 1);
        .msg-top {
          width: 100%;
          height: 204px;
          padding-top: 34px;
          .heads {
            height: 136px;
            width: 136px;
            margin-left: 70px;
            .image-position {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              margin-top: 15px;
            }
          }
          .name {
            height: 40px;
            .name-total {
              margin: 6px auto;
              width: 100%;
              text-align: center;
              .name-call {
                height: 22px;
                font-size: 20px;
                color: #333;
                line-height: 22px;
                display: inline-block;
                margin-right: 10px;
                width: 120px;
              }
              .name-person {
                width: 60px;
                height: 18px;
                text-align: center;
                margin: 3px 0px 0px 13px;
                background: rgba(227, 67, 41, 1);
                border-radius: 1px;
                line-height: 18px;
                display: inline-block;
                span {
                  font-size: 14px;
                  color: rgba(255, 249, 239, 1);
                }
              }
            }
          }
        }
        .hr {
          width: 270px;
          height: 2px;
          background: rgba(210, 210, 210, 1);
        }
        .detail {
          width: 100%;
          height: 510px;
          margin-top: 42px;
          .item {
            height: 40px;
            margin-bottom: 10px;
            box-sizing: border-box;
            border-left: 4px solid rgba(233, 245, 248, 1);
            cursor: pointer;
            .item-pic {
              margin: 8px 12px 4px 50px;
              float: left;
              height: 26px;
              width: 26px;
            }
            .item-msg {
              margin: 8px 12px 6px 12px;
              float: left;
              font-size: 20px;
              color: rgba(153, 153, 153, 1);
            }
          }
          .list {
            width: 270px;
            height: 40px;
            box-sizing: border-box;
            border-left: 4px solid rgba(233, 245, 248, 1);
            padding: 10px 70px 10px 107px;
            box-sizing: border-box;
            font-size: 16px;
            color: rgba(153, 153, 153, 1);
            clear: both;
            cursor: pointer;
          }
          .account {
            width: 100%;
            height: 140px;
          }
          .account-active {
            width: 270px;
            height: 40px;
            border-left: 4px solid #019900;
            background: rgba(255, 255, 255, 1);
          }
          .record {
            width: 100%;
            height: 234px;
          }
          .router-link-active {
            width: 270px;
            height: 40px;
            color: #1a992f;
            border-left: 4px solid #019900;
            background: rgba(255, 255, 255, 1);
          }
          .account-icon {
            background-image: url("~@/../static/img/old/zhanghuguanli.png");
          }
          .account-active-icon {
            background-image: url("~@/../static/img/old/zhanghuguanli1.png");
            // border: none;
          }

          .record-icon {
            background-image: url("~@/../static/img/old/renzhengshenhe.png");
          }
          .record-active-icon {
            background-image: url("~@/../static/img/old/renzhengshenhe1.png");
          }
          .person-icon {
            background-image: url("~@/../static/img/old/gerenxinxi.png");
          }
          .person-active-icon {
            background-image: url("~@/../static/img/old/gerenxinxi1.png");
          }
        }
      }
      .right {
        float: left;
        width: 930px;
      }
    }
  }
}
</style>