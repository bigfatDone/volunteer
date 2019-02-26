<template>
  <div class="search-module">
    <div class="w1200">
      <div class="position-tips">
      <span class="tips-home" @click="toHomePage">  首页 > </span><span class="tips-msg">物流快递</span>
      </div>
      <div class="contain-main">
        <!-- 题目模块 -->
        <div class="contain-head">快递物流</div>
        <!-- 查询模块 -->
        <div class="contain-search clearfix">
          <div class="search-wrap clearfix">
            <div class="search-box clearfix">
              <div class="search-input clearfix">
                <input type="telephone" v-model="phone" placeholder="请输入寄方的手机号码" @keyup.enter="isError">
              </div>
              <div class="search-btn" @click="isError">
                <div class="search-icon"></div>
              </div>
            </div>
            <div class="search-tips clearfix" v-if="isTrue">请输入寄方手机号码查询快递物流信息</div>
            <div class="search-tips tips-error clearfix" v-else>请输入正确的手机号码</div>
          </div>
          <div class="order-btn clearfix" @click="toSendExpress">
            <i class="order-icon"></i>
            <p class="order-name">物流下单</p>
          </div>  
        </div>
        <!-- 主体模块 -->
        <div class="contain-body" v-show="isShow">
          <!-- 列表标题 -->
          <div class="body-tab">
            <ul class="tab-item clearfix">
              <li class="item-name">寄件人信息</li>
              <li class="item-name">收件人信息</li>
              <li class="item-name">操作</li>
            </ul>
          </div>
          <!-- 列表不为空 -->
          <div class="body-content cont-full" v-if="infoList.length>0">
            <div class="result-box">
              <ul class="result-list">
                <li class="list-item"
                  v-for="(item, index) in infoList"
                  :key="index">
                  <div class="item-id">单号 :  {{ item.ER_NUMBER }}</div>
                  <div class="item-content clearfix">
                    <div class="item-info item-send">
                      <i class="info-icon clearfix"></i>
                      <div class="info-text">
                        <div class="text-msg">
                          <span class="text-name">{{ item.sender.SENDER_NAME }}</span>
                          <span class="text-phone">{{ item.sender.SENDER_PHONE }}</span>
                        </div>
                        <div class="text-address">
                          {{ item.sender.PROVINCE }} 
                          {{ item.sender.CITY }} 
                          {{ item.sender.COUNTY }} 
                          {{ item.sender.SENDER_ADDRESS }} 
                        </div>
                      </div>
                    </div>
                    <div class="item-info item-receive clearfix">
                      <i class="info-icon"></i>
                      <div class="info-text">
                        <div class="text-msg">
                          <span class="text-name">{{ item.receiver.RECEIVER_NAME }}</span>
                          <span class="text-phone">{{ item.receiver.RECEIVER_PHONE }}</span>
                        </div>
                        <div class="text-address">
                          {{ item.receiver.PROVINCE }} 
                          {{ item.receiver.CITY }} 
                          {{ item.receiver.COUNTY }} 
                          {{ item.receiver.RECEIVER_ADDRESS }} 
                        </div>
                      </div>
                    </div>
                    <div class="operate-btn"  @click="searchInfo(item.ER_NUMBER)">查看详情</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="page-box clearfix">
              <el-button
                class="first-pager"
                :disabled="currentPage === firstPage"
                @click="toPage('first')">
                首页
              </el-button>
              <el-pagination 
                class="page"
                layout="pager, next"
                background
                :total="total"
                next-text="下一页"
                @current-change="handlePage"
                :current-page="currentPage"
                :page-size="pageSize">
              </el-pagination>
              <el-button
                class="last-pager"
                :disabled="currentPage == lastPage"
                @click="toPage('last')">
                末页
              </el-button>
            </div>
          </div>
          <!-- 列表为空 -->
          <div class="body-content cont-null" v-else>没有查到相关信息！</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOtmsList, searchOtmsInfo} from "@/api/otms/SearchModule";
export default {
  data() {
    return {
      infoList: [],
      phone: '',
      isTrue: true,
      isShow: false,
      currentPage: 1,
      firstPage: 1,
      lastPage: '',
      total: 0,
      pageSize: 3,
    }
  },
  methods: {
    //跳转首页
    toHomePage() {
      this.$router.push('/index');
    },
    // 手机号码验证!phone.test(this.phone)
    isError() {
      var phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      // 输入不正确
      if(!phone.test(this.phone)){
        this.isTrue = false;   
        this.isShow = false;
      } 
      else{
        this.isTrue = true;  
        this.isShow = true;          
        this.getAllOtmsList(1);   
      }
    },
    //翻页
    handlePage(val) {
      this.currentPage = val;
      this.getAllOtmsList(val);
      window.scrollTo(0, 0);
    },
    //首页末页
    toPage(str) {
      if(str == "first") {
        this.currentPage = this.firstPage;
        this.handlePage(this.currentPage);
      }
      else if(str == "last") {
        this.lastPage = Math.ceil(this.total / 3);
        console.log(Math.ceil(this.total / 3))
        this.currentPage = this.lastPage
        this.handlePage(this.currentPage);
      }
    },
    //跳转到物流下单页面
    toSendExpress() {
      this.$router.push({ path:'/otms/otmsSender' });
    },
    //获取数据
    getAllOtmsList(val) {
      getOtmsList({
        SENDER_PHONE: this.phone,
        START_PAGE: val,
        PAGE_SIZE: this.pageSize
      }).then(res=>{
        if(res.success) {
          this.infoList = res.returnMap.expressList;
          this.total = res.returnMap.expressList[0].TOTAL_RESULT;
        }else{
          this.infoList = [];
          this.total = 0;
        }
      })
    },
    // 查看详情
    searchInfo(phone){
      console.log(phone)
      searchOtmsInfo({
        ER_NUMBER:phone+'' // 传字符串类型
      }).then(res =>{
        if(res.success){
          window.location.href = res.returnMap.URL;
        }else{
          this.$message.warning("请刷新重试");
          return false
        }
        console.log(res)
      })
    }
  },
  // mounted() {
  //   this.getAllOtmsList(1);
  // },
}
</script>
<style lang="scss" scoped>
.search-module {
  .position-tips {
    margin: 24px 0 60px;
    color: #333;
    .tips-home {
      cursor: pointer;
    }
    .tips-msg {
      color: #999;
    }
  }
  .contain-main {
    min-height: 550px;
    text-align: center;
    font-size: 36px;
    color: #333;
    .contain-head {
      margin-bottom: 79px;
    }
    .contain-search {
      min-width: 1160px;
      padding: 0 20px;
      .search-wrap {
        float: left;
        .search-box {
          // float: left;
          width: 700px;
          border: #ccc solid 1px;
          box-sizing: border-box;
          .search-input {
            float: left;
            input {
              width: 500px;
              padding: 18px 24px;
              font-size: 21px;
              outline: none;
              box-sizing: border-box;
            }
          }
          .search-btn {
            float: left;
            padding: 12px 80px;
            background: #FF720B;
            box-sizing: border-box;
            .search-icon {
              width: 37px;
              height: 38px;
              background: url("~@/../static/img/searchModule/search.png") no-repeat top center;
            }  
          }
        }
        .search-tips {
          float: left;
          height: 24px;
          margin: 15px 0 0 24px;
          font-size: 18px;
          color: #999;
          &.tips-error {
            color: #FF0000;
          }
        }  
      }
      .order-btn {
        float: right;
        padding: 20px 84px;
        line-height: 45px;
        background-color: #EBEBEB;
        cursor: pointer;
        box-sizing: border-box;
        .order-icon {
          display: inline-block;
          width: 34px;
          height: 34px;
          vertical-align: middle;
          background: url("~@/../static/img/searchModule/order.png") no-repeat top center;
        }
        .order-name {
          display: inline-block;
          font-size: 26px;
          color: #494949;
        }
      }
      
    }
    .contain-body {
      .body-tab {
        margin-top: 50px;
        background: #F8F8F8;
        .tab-item {
          .item-name {
            // display: inline-block;
            float: left;
            height: 100%;
            padding: 18px 0;
            font-size: 20px;
            color: #333;
            &:nth-of-type(1) {
              width: 470px;
              border-right: 1px solid #EDEDED;
            }
            &:nth-of-type(2) {
              width: 468px;
              border-right: 1px solid #EDEDED;
            }
            &:nth-of-type(3) {
              width: 260px;
            }
          }
        }
      }
      .body-content {
        .result-box {
          margin-top: 24px;
          .result-list {
            .list-item {
              margin-bottom: 16px;
              font-size: 20px;
              color: #666;
              border: 1px solid #EEE; 
              .item-id {
                padding: 14px 40px;
                text-align: left;
                background: #EEE;
              }
              .item-content {
                .item-info {
                  float: left;
                  width: 470px;
                  height: 100%;
                  padding: 26px 26px 40px;
                  text-align: left;
                  border-right: 1px solid #EEE;
                  box-sizing: border-box;
                  .info-icon {
                    float: left;
                    width: 40px;
                    height: 40px;
                    background: url("~@/../static/img/searchModule/send.png") no-repeat;
                  }
                  .info-text {
                    float: left;
                    margin-left: 25px;
                    .text-msg {
                      color: #333;
                      .text-name {
                        margin-right: 21px;
                      }
                    }
                    .text-address {
                      width: 200px;
                      height: 52px;
                      margin-top: 18px;
                      overflow: hidden;
                    }
                  }
                
                  &.item-receive {
                    width: 468px;
                    .info-icon {
                      background: url("~@/../static/img/searchModule/receive.png") no-repeat;
                    }
                  }
                }
                .operate-btn {
                  float: left;
                  width: 120px;
                  height: 32px;
                  margin: 60px 69px;
                  font-size: 16px;
                  line-height: 32px;
                  color: #3A8CE2;
                  border: 1px solid #3A8CE2;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .page-box {
          margin: 46px auto 87px;
          .first-pager {
            display: inline-block;
          }
          .page {
            display: inline-block;
          }
          .last-pager {
            display: inline-block;
          }
        }
      }
      .cont-null {
        margin-top: 45px;
        font-size: 18px;
        color: #999;
      }
    }
  }
}
</style>
<style lang="scss">
.search-module {
  .el-button {
    height: 34px;
    line-height: 10px;
    vertical-align: top;
  }
  .el-button:hover, 
  .el-button:focus {
    color: #fff;
    background-color: #3A8CE2;
  }
  .el-button.is-disabled, 
  .el-button.is-disabled:hover, 
  .el-button.is-disabled:focus {
    color: #a9abb1;
    background-color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    height: 32px;
    line-height: 32px;
    color: #fff;
    background: #3A8CE2;
  }
  .el-pagination.is-background .el-pager li {
    height: 32px;
    line-height: 32px;
    color: #666;
  }
  .el-pagination.is-background .el-pager li:hover {
    color: #3A8CE2;
  }
  .el-pagination span:not([class*=suffix]), .el-pagination button {
    height: 32px;
    line-height: 32px;
  }
}
</style>

