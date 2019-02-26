<template>
  <div class="map-modu">
    <!--显示数据结果-->
    <!-- <div class="footer_tip">
      <div class="tip-list">{{totalData.footerAreaName}}申报总数据: {{totalData.total}}</div>
      <div class="tip-list">{{totalData.footerAreaName}}验收总数据: {{totalData.checkNum}}</div>
    </div> -->
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import { getHomeMap } from "@/api/map/map";
import { getFooterData } from "@/api/map/map";
export default {
  data() {
    return {
      siteData: {},
      option: {},
      totalData: {
        total: 0,
        checkNum: 0,
        footerAreaName: "广东省"
      }
    };
  },
  mounted() {
    this.getSiteData()
    this.initFooter(this.siteData.name)
  },
  methods: {
    // 获取站点信息
    getSiteData() {
      this.siteData = this.$store.state.siteData;
      //显示父级区域地图
      if(this.siteData.parentId != '' && this.siteData.parentName != '') {
        this.setMap(this.siteData.parentId, this.siteData.parentName);
      }
      //显示当前地图
      else {
        this.setMap(this.siteData.pid, this.siteData.name);
      }
    },

    //初始化地图底部数据
    initFooter(areaName){
      this.totalData.footerAreaName = areaName;
      if(areaName == "广东省"){
        areaName = "";
      }
      getFooterData({
        "city": areaName
      }).then(res => {
        if(res.success){
          this.totalData.total = res.returnMap.listNums
          this.totalData.checkNum = res.returnMap.registerNums
        }
      });
    },

    // 绘制地图
    //增加一个参数areaName 所画地图区域名称
    setMap(id, areaName) {
      let _self = this;
      var chart = echarts.init(document.getElementById("map"));
      // 城市
      var cityMap = {
        广州市: "148246",
        韶关市: "151090",
        深圳市: "152682",
        珠海市: "153550",
        汕头市: "153915",
        佛山市: "155067",
        江门市: "155880",
        湛江市: "157301",
        茂名市: "159354",
        肇庆市: "161398",
        惠州市: "163064",
        梅州市: "164449",
        汕尾市: "166827",
        河源市: "167788",
        阳江市: "169326",
        清远市: "170258",
        东莞市: "171576",
        中山市: "172216",
        潮州市: "172519",
        揭阳市: "173609",
        云浮市: "175369"
      };
      // 城市名
      var cityMapValue = {
        广州市: "广州市",
        韶关市: "韶关市",
        深圳市: "深圳市",
        珠海市: "珠海市",
        汕头市: "汕头市",
        佛山市: "佛山市",
        江门市: "江门市",
        湛江市: "湛江市",
        茂名市: "茂名市",
        肇庆市: "肇庆市",
        惠州市: "惠州市",
        梅州市: "梅州市",
        汕尾市: "汕尾市",
        河源市: "河源市",
        阳江市: "阳江市",
        清远市: "清远市",
        东莞市: "东莞市",
        中山市: "中山市",
        潮州市: "潮州市",
        揭阳市: "揭阳市",
        云浮市: "云浮市"
      };
      var mapdata = [];

      // 获取data去renderMap广东地图
      $.getJSON("@/../static/json/" + id + ".json", function(data) {
        var d = [];
        for (var i = 0; i < data.features.length; i++) {
          d.push({
            name: data.features[i].properties.name
          });
        }
        mapdata = d;
        //注册地图
        echarts.registerMap(id, data);
        //绘制地图
        //renderMap(id, d);
        renderMap(id, d, areaName);
      });

      //添加地图位置
      var goBack =
        '<div class="indexmap-wrap"><span id="goBack">广东省</span><span id="sign"></span><span id="cityName"></span></div>';
      $("#map").append(goBack);
      //如果初始化区域名称为市，则添加
      if(areaName != "广东省"){
        $("#sign").html("&nbsp;>>&nbsp;");
        $("#cityName").html(areaName);
      }
      // 点击了跳出的文字进行回退地图
      $("#goBack").on("click", function() {
        $.getJSON("@/../static/json/64195.json", function(data) {
          echarts.registerMap("64195", data);
          renderMap("64195", mapdata, "广东省");   //回退到广东省
          _self.initFooter("广东省")
        });
        $("#sign").html("");
        $("#cityName").html("");
        // 将当前选择的地区名称和id传给父级
        let childData = {
          id: 64195,
          name: '广东省',
          grade: 1,
          nameAll: ''
        }
        _self.$emit('childValue', childData)
      });

      //地图点击事件
      chart.on("click", function(params) {
        if (params.name in cityMap) {
          //显示县级地图.根据传进去的参数画出某个城市的地图
          $.getJSON("@/../static/json/" + cityMap[params.name] + ".json", function(data) {
            echarts.registerMap(params.name, data);
            _self.initFooter(params.name);
            $("#sign").html("&nbsp;>>&nbsp;");
            $("#cityName").html(params.name);
            // 将当前选择的地区名称和id传给父级
            let childData = {
              id: params.data.id,
              name: params.name,
              grade: 2,
              nameAll: ''
            }
            _self.$emit('childValue', childData)

            var d = [];
            for (var i = 0; i < data.features.length; i++) {
              d.push({
                name: data.features[i].properties.name
              });
            }
            renderMap(params.name, d, params.name);
            cityValue(params);
          });
        }
      });

      //初始化绘制全国地图配置
      _self.option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            var res = params.name + "<br/>";
            //渲染区的地图数据===begin
            let sery = _self.option.series[0];
            let cityName = sery.areaName;
            let cityData = sery.data;

            if(cityName != '广东省'){    //获取区的数据
              for(let y=0; y<cityData.length ; y++){
                if(cityData[y].name ==cityName){
                  cityData = cityData[y].children;
                  break;
                }
              }
              //东莞市和中山市的区名有问题，特殊处理
              params.name = (params.name == "东莞市") ? "东莞虚拟区" : params.name;
              params.name = (params.name == "中山区") ? "中山虚拟区" : params.name;
            }

            //显示
            if(cityData){
              for(let i=0; i<cityData.length; i++){
                if (cityData[i].name == params.name) {
                  res += sery.name + " : " + cityData[i].value + "</br>";
                  break;
                }
                //不存在该数据
                if(i == cityData.length - 1){
                  res += sery.name + " : " + "0" + "</br>";
                }
              }
            }
            //渲染区的地图数据===end
            return res;
          }
        }
      };

      //配置地图属性
      function renderMap(map, data, areaName) {
        _self.option.series = [
          {
            name: "益农社申报数量",
            type: "map",
            areaName: areaName,
            mapType: map,
            roam: false,
            label: {
              emphasis: {
                textStyle: {
                  color: "#000"
                }
              }
            },
            //aspectScale: 0.75, //长宽比
            itemStyle: {
              normal: {
                borderColor: "#97cf78",
                areaColor: "#bdddad",
                //是否把名字显示出来
                label:{show:true}
              },
              emphasis: {
                areaColor: "#97cf78",
                borderWidth: 0
              }
            },
            data: data
          },
        ];
        //渲染地图
        chart.setOption(_self.option);
        provincesValue();
      }

      function cityValue(params) {
        //益农社数量统计
        chart.setOption(_self.option);

        //地图数据
        /*$.ajax({
          url: "@/../static/json/" + cityMapValue[params.name] + ".json",
          type: "get",
          data: { laaId: "42923" },
          dataType: "text",
          success: function(R) {
            if (R != "") {
              _self.option.series[0].data = eval(R);
            }
            //为echarts对象加载数据
            chart.setOption(_self.option);
          },
          error: function() {
            //为echarts对象加载数据
            chart.setOption(_self.option);
          }
        });*/
      }

      function provincesValue() {
        //益农社数量统计
        chart.setOption(_self.option);
        //市的益农社数量地图数据
        getHomeMap().then(res => {
          _self.option.series[0].data = eval(res);
          chart.setOption(_self.option);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.map-modu {
  width: 500px;
  height: 440px;
  .map {
    width: 100%;
    height: 100%;
    /*margin-right: 500px;*/
  }
  .footer_tip{
    font-size: 16px;
    color: #000;
    position: absolute;
    right: 16px;
    bottom: 76px;
    z-index: 1;
    .tip-list {
      line-height: 20px;
      &:nth-of-type(1) {
        margin-bottom: 6px;
      }
    }
  }
}
</style>

<style>
.indexmap-wrap {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 14px;
  cursor: pointer;
}
</style>



