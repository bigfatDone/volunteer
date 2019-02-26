<template>
  <div class="aboutYN">
    <div class="w1200">
      <!-- 关于我们 -->
      <div class="main">
        <div class="text-box">
          <h2 class="title">关于益农控股</h2>
          <p class="aboutUsMes">{{ aboutUsMes[0] }}</p>
          <p class="aboutUsMes">{{ aboutUsMes[1] }}</p>
        </div>
        <!-- 关于益农 -->
        <div class="text-box">
          <h2 class="title">关于益农信息社</h2>
          <p class="aboutYNMes">{{ aboutYNMes[0] }}</p>
          <div class="serve">
            <router-link class="router-link" to="/publicService">
              <img src="../../../static/img/sun.png">
              <span>公益服务</span>
            </router-link>
            <router-link class="router-link" to="/convenientService">
              <img src="../../../static/img/compass.png">
              <span>便民服务</span>
            </router-link>
            <router-link class="router-link" to="/commerce">
              <img src="../../../static/img/store.png">
              <span>电商服务</span>
            </router-link>
            <router-link class="router-link" to="/trainService">
              <img src="../../../static/img/train.png">
              <span>培训服务</span>
            </router-link>
          </div>
        </div>
        <!-- 申请益农社 -->
        <div class="text-box">
          <h2 class="title">申请益农信息社</h2>
          <p>{{ applyMes }}</p>
          <div class="contact">
            <p class="address">
              <label>
                <img src="../../../static/img/telephone.png">
              </label>
              <span>联系电话：</span>
              400-606-1296
            </p>
            <p class="address">
              <label>
                <img src="../../../static/img/location.png">
              </label>
              <span>联系地址：</span>
              广东省广州市越秀区好世界广场2602
            </p>
          </div>
        </div>
      </div>
      <div class="aside">
        <h2 class="title">广东益农服务</h2>
        <div class="map">
          <iframe
            src="http://www.google.cn/maps/embed?pb=!1m18!1m12!1m3!1d3668.9235643685165!2d113.28278631546026!3d23.136468984895515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3402f8d491d48f97%3A0xeba35f7f09bdec69!2z5aW95LiW55WM5bm_5Zy6!5e0!3m2!1szh-CN!2scn!4v1538135400319"
            width="400"
            height="400"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="link-address">
          <h3>益农控股联系方式</h3>
          <p class="address">
            <label>
              <img src="../../../static/img/telephone.png">
            </label>
            <span>客服电话：</span>
            400-606-1296
          </p>
          <p class="address">
            <label>
              <img src="../../../static/img/location.png">
            </label>
            <span>工作时间：</span>
            周一至周日9:00-22:00法定节假日除外
          </p>
          <p class="address">
            <label>
              <img src="../../../static/img/linkman.png">
            </label>
            <span>联系地址：</span>
            广东省广州市越秀区好世界广场2602
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutUsMes:
        ["益农控股(广东)有限公司是由广东省农业农村厅按照农业农村部要求，遴选的唯一一家省级“信息进村入户工程”运营商。公司服务于广东省信息进村入户工程，旨在通过应用物联网、云计算、大数据、移动互联等现代信息技术，推动农业全产业链升级改造，为转变农业发展方式提供新路径、新方法。",
        "益农控股由两家主板上市公司新大陆与诺普信联合多家投资公司共同组建。通过采用“省级运营商（益农控股）+县级运营中心+益农信息社”的三级运营模式打造广东益农信息公共服务平台。"
        ],
      aboutYNMes: [
        "益农信息社是农业农村部信息进村入户工程，旨在统筹城乡均衡发展、缩小数字鸿沟，将农业信息资源服务延伸到乡村和农户，通过开展农业公益服务、便民服务、电子商务、培训体验服务提高农民的现代信息技术应用水平，为农民解决农业生产上的产前、产中、产后问题和日常健康生活等问题，实现普通农户不出村、新型农业经营主体不出户就可享受到便捷、经济、高效的生活信息服务。",
      ],
      applyMes:
        "益农信息社是广东益农信息公共服务平台建立在村级的实体服务网点，提供农业公益服务、便民服务、电子商务、培训体验服务的线下窗口。如需申请益农信息社，请与当地农业局与益农控股联系。"
    };
  }
};
</script>

<style lang="scss" scoped>
.w1200 {
  font-family: Adobe Heiti Std R;
  font-weight: normal;
  overflow: hidden;

  .title {
    color: rgba(11, 122, 27, 1);
    font-size: 24px;
    line-height: 48px;
    margin: 24px 0px 24px 29px;
    font-weight: normal;
  }

  .main {
    width: 770px;
    float: left;

    .text-box {
      p {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        text-indent: 2em;
        line-height: 24px;
      }

      .serve {
        width: 100%;
        margin-top: 24px;

        .router-link {
          width: 24%;
          display: inline-block;
          color: rgba(4, 135, 71, 1);
          text-decoration: none;
          margin: auto;
          box-sizing: border-box;

          img {
            width: 45px;
            height: 45px;
            display: block;
            margin: auto;
          }
          > span {
            font-size: 16px;
            display: block;
            margin: auto;
            text-align: center;
          }
        }
      }

      .contact {
        margin: 56px 0 73px 0px;
        .address {
          margin-left: 28px;
          color: rgba(11, 122, 27, 1);
          text-indent: 0;
          font-size: 18px;
          label {
            width: 26px;
            margin-right: 8px;
            display: inline-block;
            vertical-align: middle;
            img {
              display: inline-block;
            }
          }
          > span {
            width: 100px;
            display: inline-block;
            text-align: left;
          }
        }
      }
    }
  }

  .aside {
    width: 400px;
    float: right;

    h2 {
      margin-left: 0;
    }
    .map {
      width: 400px;
      height: 400px;
      box-sizing: border-box;
      border: 1px solid rgba(204, 204, 204, 1);
    }
    .link-address {
      width: 100%;
      box-sizing: border-box;
      margin-top: 32px;
      border: 1px solid rgba(204, 204, 204, 1);
      padding-left: 9px;
      h3 {
        font-size: 18px;
        color: rgba(0, 0, 0, 1);
        font-weight: normal;
        margin: 12px 0;
      }
      .address {
        font-size: 14px;
        margin: 8px 0;
        label {
          width: 20px;
          margin-right: 8px;
          display: inline-block;
          vertical-align: middle;
          img {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
