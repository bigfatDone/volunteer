<!--
	功能：显示支付二维码
	PS:该组件依赖于qrcodejs2和axios, 所以在使用之前必须保证已安装了以上插件
    content:生成支付二维码的内容 String类型(必须)
    amount: 支付金额，Number类型，单位为分(必须)
    channel：支付方式，String类型，可选值（"ALIPAY"，"WXPAY"）（必须）
    icon: 二维码中间显示标的base64串，例如（require(iconURL)）String类型
    width：二维码的宽 默认200，Number类型
    height: 二维码的高 默认200 Number类型
    bg-color: 背景色，十六进制值，如"#ffffff"，默认为"#40780d"
    fg-color: 前景色，十六进制值，如"#000000"，默认为"#000000"
    title-text: 标题的内容，字符串类型
    title-color： 标题内容的颜色，默认为“#ffffff”
    回调函数getTradeNo(tradeNo):返回支付唯一码
-->
<template>
  <div style="display: inline-block" v-show="showCode" id="qr_container" :style="qrContainer">
    <div id="qrcode">
       <img v-if="showIcon" :style="iconStyle" :src="icon">
    </div>
   <!-- <h4 :style="qrTitleStyle" v-text="titleText"></h4>-->
  </div>
</template>
<script>
   import QRCode from 'qrcodejs2';
   import axios from 'axios';
   import qs from 'qs';
    export default {
        name: "QrCode",
        props:{
          url: {
              type: String,
              required: true,
              default: "this.customConfig.baseUrl + '/portal/authenticPay'"
            },
          amount: {
            type: Number,
            required: true,
            default: 1
          },
          channel: {
            type: String,
            required: true,
            default: 'ALIPAY'
          },
          icon:String,
          width:{
            type:Number,
            default:200
          },
          height:{
            type:Number,
            default:200
          },
          bgColor:{
            type:String,
            default:"#ffffff"
          },
          fgColor:{
            type:String,
            default:"#000000"
          },
          /*titleText: {
            type: String,
            default: "益农控股"
          },
          titleColor:{
            type: String,
            default: "#ffffff"
          }*/
      },
      mounted(){
        this.init();
      },
      methods:{
        init(){
          let _self = this;
          if(!_self.amount || !_self.url || !_self.channel){
            try{
              throw new Error("必须属性未填错误");
            }catch (e) {
              console.log(e);
            }
            return;
          }
          axios.post(_self.url, {"amount":_self.amount, "channel":_self.channel})
            .then(function(ret) {
              let retJson = qs.parse(ret);
              let options = {
                render: 'canvas',
                width: _self.width, //宽
                height: _self.height, //高
                text: retJson.data.payCode,//
                typeNumber:-1,
                colorDark: _self.fgColor, //前景色
                colorLight: "#ffffff",  //背景色
                correctLevel : QRCode.CorrectLevel.H
              };
              let qrCode = new QRCode("qrcode", options);
              qrCode.clear();
              qrCode.makeCode(retJson.data.payCode);
              _self.showCode = true;
              if(_self.icon){
                _self.showIcon = true;
              }
              _self.$emit("getTradeNo", retJson.data.tradeNo);
            });
        },
      },
      data(){
          return{
            iconStyle:{
              'z-index': '100',
              position: 'absolute',
              width: this.width * 0.24 + "px",
              height: this.height * 0.24 + "px",
              margin: (this.height/2 - (this.height*0.12)) + "px",
              display: 'block'
            },
           /* qrTitleStyle:{
              color: this.titleColor,
              margin: '6px 0 8px 0',
              padding: '6px'
            },*/
            showIcon: false,
            showCode: false,
            qrContainer:{
              display: 'inline-block',
              padding:'12px',
              border: 'none',
              textAlign: 'center',
              backgroundColor: this.bgColor,
              fontSize: this.width * 0.075 + "px"
            }
          }
      },
    }
</script>
<style scoped>

  #qrcode{
    display: inline-block;
    padding:12px;
    border:1px solid #f5f5f5;
    box-shadow:0px 1px 1px #e5e5e5;
    background-color: #ffffff;
    text-align: center;
    border-radius: 5px;
  }
</style>
