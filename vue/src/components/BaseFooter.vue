<template>
  <div class="footer-main">
    <div class="footer-bd">
      <div class="w1200 clearfix">
        <div class="footer-nav">
          <div class="foot-item-name">导航选项：</div>
          <div class="nav-content">
            <p>
              <router-link to="/index" class="nav-item">首页</router-link>
              <span class="ver-line">|</span>
              <router-link to="/publicService" class="nav-item">公益服务</router-link>
              <span class="ver-line">|</span>
              <router-link to="/convenientService" class="nav-item">便民服务</router-link>
              <span class="ver-line">|</span>
              <router-link to="/commerce" class="nav-item">电子商务</router-link>
              <span class="ver-line">|</span>
              <router-link to="/trainService" class="nav-item">培训体验服务</router-link>
            </p>
            <p>
              <router-link to="/superiorProducts" class="nav-item">粤农优品</router-link>
              <span class="ver-line">|</span>
              <router-link to="/ynongClub" class="nav-item">益农信息社</router-link>
              <span class="ver-line">|</span>
              <router-link to="/about" class="nav-item">关于益农</router-link>
            </p>
          </div>
        </div>
        <div class="footer-contact">
          <div class="foot-item-name">益农控股联系方式：</div>
          <ul>
            <li>客服电话：400-606-1296</li>
            <li>工作时间：周一至周日9:00-22:00 法定节假日除外</li>
            <li>联系地址：广东省广州市越秀区好世界广场2602</li>
          </ul>
        </div>
        <div class="footer-qrcode">
          <ul class="clearfix">
            <li class="qrcode-item">
              <div class="qrcode-content">
                <div class="qrcode-img">
                  <img src="@/../static/images/qrcode-02.jpg" alt="">
                </div>
              </div>
              <div class="qrcode-name">关注“益农控股”</div>
            </li>
            <li class="qrcode-item">
              <div class="qrcode-content">
                <div class="qrcode-img">
                  <img src="@/../static/images/qrcode-01.jpg" alt="">
                </div>
                <div class="qrcode-name">APP下载</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-ft">
      <div class="w1200">
        <div class="copyright">益农控股（广东）有限公司提供技术支持 - 粤ICP备18082742号-1</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-main {
  min-width: 1200px;
  color: #fff;
  line-height: 26px;
  border-top: 10px solid #0B6C0A;
  .footer-bd {
    height: 172px;
    font-size: 14px;
    background: #0DA40B;
    padding: 22px 0 11px;
    box-sizing: border-box;
    .foot-item-name {
      color: #CCFFD7;
    }
    .footer-nav {
      width: 350px;
      min-height: 138px;
      padding-right: 20px;
      box-sizing: border-box;
      float: left;
      .nav-content {
        .nav-item {
          color: #fff;
        }
      }
    }
    .footer-contact {
      width: 490px;
      min-height: 138px;
      border-left: 1px solid #CCFFD7;
      padding-left: 88px;
      box-sizing: border-box;
      float: left;
    }
    .footer-qrcode {
      min-height: 138px;
      border-left: 1px solid #CCFFD7;
      padding-left: 60px;
      float: left;
      .qrcode-item {
        width: 120px;
        text-align: center;
        margin: 0 4px;
        float: left;
        .qrcode-content {
          width: 104px;
          height: 104px;
          background: #91a891;
          padding: 3px;
          margin: 0 auto;
          border-radius: 4px;
          box-sizing: border-box;
          .qrcode-img {
            background: #fff;
            border-radius: 4px;
            padding: 4px;
            overflow: hidden;
          }
        }
      }
    }
  }
  .footer-ft {
    background: #5F5F5F;
    .copyright {
      font-size: 12px;
      line-height: 28px;
      text-align: center;
    }
  }
}
</style>
