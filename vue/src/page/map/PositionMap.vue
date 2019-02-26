<!--
  参数：
  width:地图的长，Number类型，默认600
  height：地图宽度，Number类型， 默认500
  center：地图中心点位置，Array类型， 默认[113.2555, 23.129684]
  回调函数，position(pos),pos是一个对象，如{lng: '113.2555', lat: '23.129684'}
  示例：
    <position-map
          :center="[113.2555, 23.129684]"
          :width="500"
          :height="400"
          @position="positionHandle"></position-map>
-->
<template>
  <div class="position-amap-page-container" :style="positionContainerStyle">
    <el-amap
      vid="positionMap"
      :center="center"
      :zoom="zoom"
      :events="events">
    </el-amap>
  </div>
</template>

<script>
  export default {
    name: 'position-map',
    props: {
      center: {
        type: Array,
        default: ()=>[113.2555, 23.129684]
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 500
      },
    },
    data(){
      let self = this;
      return{
        position: {lng: '113.2555', lat: '23.129684'},
        zoom: 10,
        //点击获取点的信息
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            self.position.lng = lng;
            self.position.lat = lat;
            self.$emit("position", self.position);
          }
        },
        positionContainerStyle: {
          height: this.height + "px",
          width: this.width + "px"
        }
      }
    }
  }
</script>

<style scoped>
</style>
