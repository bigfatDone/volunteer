<template>
  <div>
    <div class="declare-guide-wrapper">
      <!-- 轮播图模块 -->
      <div class="banner-modu">
        <img src="../../static/images/declare-guide/guide-ban01.png" alt>
      </div>
      <!-- 主体模块 -->
      <div class="procedure-modu">
        <div class="procedure-item one-item">
          <div class="item-title">
            <p class="title-n">1、益农信息社申报入口</p>
            <p class="title-v">
              在益农信息社网页首页的
              <span class="stress">“益农社申报”</span>登陆/注册
            </p>
          </div>
          <div class="item-content">
            <img src="../../static/images/declare-guide/guide-con01.png" alt>
          </div>
        </div>
        <div class="procedure-item two-item">
          <div class="zindex-cont">
            <div class="item-icon"></div>
            <div class="item-title">
              <p class="title-n">2、益农信息社登录/注册</p>
            </div>
            <div class="item-content">
              <img src="../../static/images/declare-guide/guide-con02.png" alt>
            </div>
          </div>
        </div>
        <div class="procedure-item three-item">
          <div class="item-icon"></div>
          <div class="item-title">
            <p class="title-n">3、益农信息社申报资料填写</p>
            <p class="title-v">
              上面登录/注册完成后进入此页面，所有带
              <span class="stress">“*”</span>标志的信息必须填写完整。
            </p>
          </div>
          <div class="item-content">
            <img src="../../static/images/declare-guide/guide-con03.png" alt>
          </div>
        </div>
        <div class="procedure-item four-item">
          <div class="item-icon"></div>
          <div class="item-title">
            <p class="title-n">4、益农信息社申报资料保存提交</p>
          </div>
          <ul class="split-ul clearfix">
            <li class="split-li">
              <div class="split-btn">
                <img src="../../static/images/declare-guide/split-btn01.png" alt>
              </div>
              <div class="split-title">
                填写信息过程中，可点击
                <span class="stress">“保存，暂不提交县农业局”</span>
                保存信息，以免信息丢失；但不会提交至县农业局。
              </div>
            </li>
            <li class="split-li">
              <div class="split-btn">
                <img src="../../static/images/declare-guide/split-btn02.png" alt>
              </div>
              <div class="split-title">
                填写信息完整后，点击
                <span class="stress">“提交县农业局，完成申报”</span>
                信息即会提交至县农业局等待审核。
              </div>
            </li>
          </ul>
          <div class="item-content">
            <img src="../../static/images/declare-guide/guide-con04.png" alt>
          </div>
          <div class="split-infor">
            <div class="split-title">
              填表人对所填资料的
              <span class="stress">真实性、完整性负责</span>
              ，承诺不存在虚假申报、 重复申报、变相多头申报等情况。提交申报后
              <span class="stress green-stress">不可修改!</span>
            </div>
          </div>
        </div>
        <div class="procedure-item five-item">
          <div class="zindex-cont">
            <div class="item-icon"></div>
            <div class="item-title">
              <p class="title-n">5、益农信息社申报资料等待县、市农业局审核</p>
            </div>
            <div class="result-cont clearfix">
              <div class="result-left">
                <div class="item-img">
                  <img src="../../static/images/declare-guide/result-img01.png" alt>
                </div>
                <div class="item-text">填写完整申报资料后提交，等待审核结果</div>
              </div>
              <div class="result-arrow">
                <img src="../../static/images/declare-guide/result-arrow.png" alt>
              </div>
              <div class="result-right">
                <div class="result-item clearfix">
                  <div class="result-item-icon">
                    <img src="../../static/images/declare-guide/result-icon01.png" alt>
                  </div>
                  <div class="result-item-text">
                    <span class="stress">审核成功，</span>去进行线下建设门店，按 验收资料内容提交相关图片信息。
                  </div>
                </div>
                <div class="result-item clearfix">
                  <div class="result-item-icon">
                    <img src="../../static/images/declare-guide/result-icon02.png" alt>
                  </div>
                  <div class="result-item-text">
                    <span class="stress">审核失败，</span>根据审核失败原因，修改申报资料，再次提交审核。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="procedure-item six-item">
          <div class="item-icon"></div>
          <div class="item-title">
            <p class="title-n">6、提交补充资料，等待最终审核</p>
            <p class="title-v">
              县、市农业局审核完成后，点击
              <span class="stress">“提交补充资料”按钮，</span>
              后去建设线下门店， 如果是以前申报的，则需要填写完整资料后再点击按钮
            </p>
          </div>
          <div class="item-content one-cont-img">
            <img src="../../static/images/declare-guide/guide-con051.png" alt>
          </div>
          <div class="item-title cont-title">
            <p class="title-v">
              审核通过后开始线下门店装修，完成后按补充资料所需内容提交相应的图片信息，
              <span class="stress">等待益农控股最终审核。</span>主体二维码可用于益农信息社的金属牌匾上。
            </p>
          </div>
          <div class="item-content two-cont-img">
            <img src="../../static/images/declare-guide/guide-con052.png" alt>
          </div>
          <div class="item-content three-cont-img">
            <img src="../../static/images/declare-guide/guide-con053.png" alt>
          </div>
        </div>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.declare-guide-wrapper {
  .banner-modu {
    width: 100%;
    img {
      width: 100%;
      display: block;
    }
  }
  .procedure-modu {
    .procedure-item {
      background-color: #c7f6f2;
      .title-v,
      .split-title {
        font-size: 20px;
        color: #000;
        width: 721px;
        margin: 0 auto;
        .stress {
          font-size: 26px;
          padding: 0 10px;
        }
        .green-stress {
          color: #109a0e;
        }
      }
      .item-icon {
        width: 246px;
        height: 76px;
        background: url(../../static/images/declare-guide/horn-icon02.png)
          no-repeat;
        background-size: 100%;
        background-position: top center;
        margin: 0 auto;
      }
      .item-title {
        text-align: center;
        color: #fff;
        padding-top: 18px;
        .title-n {
          font-size: 30px;
          color: #09794e;
          margin-bottom: 18px;
        }
      }
      .item-content {
        margin: 0 auto;
      }
      .zindex-cont {
        position: relative;
        z-index: 1;
      }
      &.one-item {
        padding-bottom: 34px;
        .item-title {
          padding-top: 50px;
        }
        .item-content {
          width: 540px;
          margin-top: 12px;
        }
      }
      &.two-item {
        background-color: #8ae1f5;
        padding-bottom: 46px;
        position: relative;
        &:after {
          width: 50%;
          height: 100%;
          content: "";
          background: #baebf7;
          position: absolute;
          right: 0;
          top: 0;
        }
        .zindex-cont {
          position: relative;
          z-index: 1;
        }
        .item-title {
          .title-n {
            color: #062b94;
          }
        }
        .item-content {
          width: 1292px;
        }
      }
      &.three-item {
        background-color: #267ccb;
        padding-bottom: 50px;
        .item-icon {
          background-image: url(../../static/images/declare-guide/horn-icon03.png);
        }
        .title-n {
          color: #fff;
        }
        .title-v {
          color: #fff;
        }
        .item-content {
          width: 914px;
          margin-top: 28px;
        }
      }
      &.four-item {
        background-color: #1cbe81;
        padding-bottom: 60px;
        .item-icon {
          background-image: url(../../static/images/declare-guide/horn-icon04.png);
        }
        .title-n {
          color: #fff;
        }
        .split-ul {
          width: 1200px;
          padding: 0;
          box-sizing: border-box;
          margin: 34px auto 20px;
          .split-li {
            width: 600px;
            text-align: center;
            line-height: 33px;
            padding: 0 30px 0 25px;
            box-sizing: border-box;
            float: left;
            .split-btn {
              width: 444px;
              height: 220px;
              margin: 0 auto 20px;
            }
            .split-title {
              color: #fff;
            }
          }
        }
        .item-content {
          width: 762px;
        }
        .split-infor {
          width: 692px;
          line-height: 34px;
          background: #fff;
          padding: 17px 36px;
          box-sizing: border-box;
          margin: 30px auto 0;
          position: relative;
          &:after {
            content: "";
            width: 0;
            height: 0;
            border-width: 0 30px 30px;
            border-style: solid;
            border-color: transparent transparent #fff; /*透明 透明  灰*/
            margin-left: -30px;
            position: absolute;
            top: -20px;
            left: 50%;
          }
        }
      }
      &.five-item {
        background-color: #73dccc;
        padding-bottom: 80px;
        position: relative;
        &:after {
          width: 50%;
          height: 100%;
          content: "";
          background: #a5f3e6;
          position: absolute;
          right: 0;
          top: 0;
        }
        .item-icon {
          width: 254px;
          height: 78px;
          background-image: url(../../static/images/declare-guide/horn-icon05.png);
        }
        .title-n {
          color: #3d4349;
        }
        .result-cont {
          width: 1200px;
          padding-left: 180px;
          margin: 36px auto 0;
          .result-left {
            width: 360px;
            padding: 0 10px;
            box-sizing: border-box;
            float: left;
            .item-img {
              width: 276px;
              margin: 0 auto;
            }
            .item-text {
              font-size: 18px;
              line-height: 1;
              color: #3d4349;
              text-align: center;
              margin-top: 28px;
            }
          }
          .result-arrow {
            width: 160px;
            margin: 140px 0 140px 26px;
            float: left;
          }
          .result-right {
            margin-left: 60px;
            float: left;
            .result-item {
              &:nth-of-type(1) {
                margin-bottom: 38px;
              }
              .result-item-icon {
                float: left;
              }
              .result-item-text {
                width: 324px;
                font-size: 18px;
                line-height: 32px;
                color: #3d4349;
                padding: 39px 0;
                margin-left: 22px;
                float: left;
                .stress {
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
      &.six-item {
        background-color: #ebfaf3;
        padding-bottom: 26px;
        .item-icon {
          background-image: url(../../static/images/declare-guide/horn-icon06.png);
        }
        .item-title {
          .title-n {
            color: #333;
          }
          .title-v {
            color: #333;
            .stress {
              color: #333;
            }
          }
        }
        .cont-title {
          width: 730px;
          margin: 32px auto 0;
        }
        .one-cont-img {
          width: 740px;
          margin-top: 28px;
        }
        .two-cont-img {
          width: 1000px;
          margin-top: 30px;
        }
        .three-cont-img {
          width: 692px;
          margin-top: 36px;
        }
      }
    }
  }
}
</style>


