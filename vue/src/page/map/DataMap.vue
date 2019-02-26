<!--
YnsMap使用说明
  功能：显示指定城市的益农社。
  依赖：axios和element-ui的地图组件。
  安装：
        1,安装axios: npm install --save axios
        2,安装element-map:npm install vue-amap --save
  引入：
        复制一下内容到main.js文件中
        import VueAMap from 'vue-amap';
        Vue.use(VueAMap);
        VueAMap.initAMapApiLoader({
          key: 'yns-map-key',
          plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
          v: '1.4.4'
        });
  使用组件：将组件的代码引入之后，还需要安装依赖，执行npm install就可以了。
  参数：
        1，width：地图的宽，数值类型，默认为900px.
        1,height:地图的宽，数值类型，默认为700px.
        3,target-city:地图显示的城市，字符串类型，默认为“广州市”。
        示例：
         <yns-map
          :width="800"
          :height="600"
          target-city="汕尾市">
          </yns-map>
  PS:将YnsMap.vue文件放在src/components路径下，将图标放在src/asserts/images/ 路径下，将managerMap.json放在static/json/路径下
-->
<template>
  <div class="amap-page-container">
    <div :style="containerStyle">
      <el-amap vid="yns-amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker
          v-for="(marker, num) in markers"
          :key="num"
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :draggable="marker.draggable"
          :vid="num"
          :icon="marker.icon">
        </el-amap-marker>

        <!--显示"广州市"-->
        <!-- <el-amap-text
          v-for="(text, index) in texts"
          :key="index"
          :text="text.text"
          :offset="offset"
          :position="text.position"
          :draggable="true">
        </el-amap-text> -->

        <!--弹窗部分，默认隐藏-->
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
        <!--显示完成状态的标志-->
        <!-- <div class="finish_state">
          <div class="state_icon" >
            <img src="@/../static/images/map/finished.png" />
            <span>已完成申报</span>
          </div>
          <div class="state_icon" >
            <img src="@/../static/images/map/unfinished.png" />
            <span>未完成申报</span>
          </div>
        </div> -->

        <!--全屏按钮部分-->
        <div class="toolbar">
          <div class="switch-btn" v-show="!isFullScreen" v-on:click="openFullScreen">开启全屏</div>
          <div class="switch-btn" v-show="isFullScreen" v-on:click="closeFullScreen">退出全屏</div>
        </div>
      </el-amap>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "YnsMap",
  props: {
    targetCity: {
      type: String,
      default: '广州市'
    },
    width: {
      type:Number,
      default: 900
    },
    height: {
      type: Number,
      default: 700
    }
  },
  data() {
    let self = this;
    return {
      count: 1,
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      zoom: 10,
      center: [113.273863, 23.142947],
      markers: [],
      //定位插件===end
      renderMarker: {
        position: [121.5273285, 31.21715058],
        contentRender: (h, instance) => {
          // if use jsx you can write in this
          // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
          return h(
            'div',
            {
              style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
              on: {
                click: () => {
                  const position = this.renderMarker.position;
                  this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                }
              }
            },
            ['marker inner text']
          )
        }
      },
      componentMarker: {
        position: [121.5273285, 31.21315058],
        /* contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])*/
      },
      slotMarker: {
        position: [121.5073285, 31.21715058]
      },
      texts: [
        {
          text: '广州市',
          position: [113.273863, 23.142947],
        }
      ],
      offset: [0, 0],
      containerStyle: {
        height: this.height+"px",
        width: this.width+"px",
        display: 'inline-block',
      },
      isFullScreen: false,
      screenWidth: document.documentElement.clientWidth,// 屏幕尺寸,
      screenHeight: document.documentElement.clientHeight,// 屏幕尺寸,
      window:'',//弹窗默认不显示
      windows: [],//弹窗数据存储
    };
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      let _self = this;
      let targetCity = _self.targetCity;
      // axios.get('static/js/managerMap.json').then((res)=>{
      axios.get('/portal2/getBigDataYnsData').then((res)=>{
        var result = res.data;
        var icon1 = require("@/../static/images/map/a-club.png");
        var icon2 = require("@/../static/images/map/b-club.png");
        var icon3 = require("@/../static/images/map/c-club.png");
        var redIcon1 = require("@/../static/images/map/a-club-red.png");
        var redIcon2 = require("@/../static/images/map/b-club-red.png");
        var redIcon3 = require("@/../static/images/map/c-club-red.png")
        for(var i = 0 ; i < result.length ; i++){
          var city = result[i].city;
          if(city != targetCity){
            continue;
          }
          var longitude = result[i].longitude;
          var latitude = result[i].latitude;
          if(_self.texts.length > 0) {
                        _self.texts[0].text = city;
          _self.texts[0].position = [longitude, latitude];
          _self.center = [longitude,latitude];
          }
          for(var j = 0 ; j < result[i].children.length; j ++){
            let tmp = result[i].children[j];//注意要用let
            var coinRes = "";
            if(tmp.ynsType == "1"){
              if(tmp.state == "1"){
                coinRes = icon1;
              }else if(tmp.state == "0"){
                coinRes = redIcon1;
              }
            }else if(tmp.ynsType == "2"){
              if(tmp.state == "1"){
                coinRes = icon2;
              }else if(tmp.state == "0"){
                coinRes = redIcon2;
              }
            }else{
              if(tmp.state == "1"){
                coinRes = icon3;
              }else if(tmp.state == "0"){
                coinRes = redIcon3;
              }
            }
            var marker ={
              position:[tmp.longitude,tmp.latitude],
              events:{
                //各个益农社的点击事件
                click:()=>{
                  // let content = ""+
                  //   "<a href="+tmp.http+" target='view_window'>点击跳转</a>";
                  let content = _self.createContent(tmp);//传入地点、联系人、益农社类型等
                  _self.clickIcon(tmp.longitude,tmp.latitude,content);
                  _self.$nextTick(() => {
                    _self.window.visible = true;
                  });
                }
              },
              visible:true,
              draggab:false,
              template:"<span>1</span>",
              icon: coinRes
            };
            _self.markers.push(marker);
          }
        }
      });

    },
    //创建弹窗内容
    createContent(tmp){
      let type ='';
      if(tmp.ynsType == "1"){
        type = "A类社";
      }else if(tmp.ynsType == "2"){
        type = "B类社";
      }else{
        type = "县"
      }
        let content = " <div style=\"display: inline-block;\">\n" +
          "    <div style=\"height:110px;width: 450px;position: relative;\">\n" +
          "      <img src=\""+tmp.photo+"\" style=\"height:100%;width: 100%; object-fit:cover;\"/>\n" +
          "        <div style=\"text-align: center;\">\n" +
          "        <span style=\"display: block;width:450px;display: block;background-color: rgba(0,0,0,0.6);font-size:16px;\n" +
          "            text-align: center;position: absolute;top: 83px;color: white;\">\n" +
          "        欢迎来到"+tmp.name+"\n" +
          "        <span style=\"font-size: 21px\"> ["+type+"]</span>\n" +
          "        </span>\n" +
          "      </div>\n" +
          "    </div>\n" +
          "    <div style=\"font-size: 16px;color:#333333\">\n" +
          "      <div style=\"margin-top: 20px\">\n" +
          "        <span>信息员:"+tmp.messengerName+"</span><span style=\"margin-left:100px\">联系电话:12345678910</span>\n" +
          "      </div>\n" +
          "      <div style=\"margin-top: 20px\">\n" +
          "        <span>具体地址："+tmp.address+"</span>\n" +
          "      </div>\n" +
          "      <div style=\"margin-top: 20px\">\n" +
          "        <span>场所面积："+tmp.area+"m²</span>\n" +
          "      </div>\n" +
          "      <div style=\"margin-top: 20px\">\n" +
          "        <span>主要业务："+tmp.serviceScope+"</span>\n" +
          "      </div>\n" +
          "      <div style=\"text-align: center;margin-top: 20px\">\n" +
          "        <div style=\"display: inline-block;background-color: #eeeeee;color:#000000;padding:0 10px 0 10px ;\" onclick=\"window.open('" + this.customConfig.baseUrl + "/#/ynongClubInfor/?id=" + tmp.ynsid +"');\">查看益农社</div>\n" +
          "      </div>\n" +
          "    </div>\n" +
          "  </div>";
      return content;
    },
    //点击标记时设置弹窗位置内容
    clickIcon(longitude,latitude,content){
      this.window = {
        position: [longitude, latitude],
        content: content,
        visible: false
      }
    },
    onClick() {
      this.count += 1;
    },
    //开启全屏
    openFullScreen() {
      this.containerStyle = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: this.screenWidth +"px",
        height: this.screenHeight + "px",
        margin: "0",
        padding: "0",
        zIndex: "999"
      };
      window.scrollTo(0,11);
      this.zoom = 11;
      this.isFullScreen = true;
    },
    //退出全屏
    closeFullScreen() {
      this.containerStyle = {
        position: 'relative',
        height: this.height + "px",
        width: this.width +"px",
        'border-radius': '3px',
        'box-shadow': '1px 1px 10px rgba(146, 156, 156, 0.66)'
      };
      this.zoom = 10;
      this.isFullScreen = false;
    },
  }
}
</script>

<style lang="scss">
.amap-page-container {
  position: relative;
  .amap-demo {
    border-radius: 3px;
    box-shadow: 1px 1px 10px rgba(146, 156, 156, 0.66);
  }
  .toolbar {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 999;
    .switch-btn {
      width: 142px;
      height: 48px;
      font-size: 26px;
      color: #ffffff;
      line-height: 48px;
      text-align: center;
      background: #1D66E8;
      border-radius: 4px;
      margin: 0 0 20px 20px;
      cursor: pointer;
    }
  }
  /*完成状态图标样式*/
  .finish_state{
    position: absolute;
    left: 20px;
    bottom: 80px;
    z-index: 999;
    width: 130px;
    background: #ffffff;
    /* height: 50px;*/
    border-radius: 3px;
    padding: 3px 5px 3px 5px;
    .state_icon{
      margin-bottom: 5px;
      position: relative;
      img{
        position: absolute;
        display: inline-block;
        height: 26px;
        width: 26px;
      }
      span{
        color: #000000;
        font-size: 1rem;
        display: inline-block;
        margin-left: 30px;
      }
    }
  }
  .amap-icon {
    img {
      width: 44px;
      height: 34px;
    }
  }
}
.amap-marker-content {
  div {
    font-size: 1.5rem;
  }
}
.amap-markers {
  .amap-marker {
    &:first-child {
      z-index: 110 !important;
      .amap-overlay-text-container{
        color: #ef3036;
        background: none;
        border: none;
      }
    }
  }
}
  .amap-info-contentContainer .amap-info-outer{
    padding-left: 18px;
    padding-right: 20px;
  }
</style>
