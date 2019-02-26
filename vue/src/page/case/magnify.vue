<template>
  <div class="container">
     <!--原图-->
    <div class="origin" @mousemove="mouseMove" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <img class="pic-origin" :src="oriPic" />
      <!--原图上的小块-->
      <div class="slider"></div>
    </div>
    <!--放大镜区域-->
    <div class="magnify">
      <img class="pic-magnify"  :src="oriPic" />
    </div>
    <div class="list" >
      <ul class="list-content" id="test" :style="{left:num+'px'}">
        <li class="list-item" v-for="item in items" :key="item.key" @mouseenter="changePic(item.src)"><img :src="item.src" alt=""></li>
      </ul>
     <div class="list-back" @click="backImg" :class="{'list-backNo':this.backState}"></div>
     <div class="list-go" @click="goImg" :class="{'list-goNo':this.goState}"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
       items: [
      { src: 'https://img.alicdn.com/imgextra/i3/2264201946/O1CN01lulyDT1QFJDwOwzS7_!!2264201946.jpg_430x430q90.jpg',key:'1' },
      { src: 'https://img.alicdn.com/imgextra/i3/2264201946/O1CN01rjONjm1QFJEnhXNuy_!!0-item_pic.jpg_430x430q90.jpg',key:'2' },
      { src: 'https://img.alicdn.com/imgextra/i3/2264201946/O1CN01lulyDT1QFJDwOwzS7_!!2264201946.jpg_430x430q90.jpg',key:'3' },
      { src: 'https://img.alicdn.com/imgextra/i4/2264201946/O1CN01HgApzd1QFJDwxsIQz_!!2264201946.jpg_430x430q90.jpg',key:'4' },
      { src: 'https://img.alicdn.com/imgextra/i3/2264201946/O1CN01rjONjm1QFJEnhXNuy_!!0-item_pic.jpg_430x430q90.jpg',key:'5' },
      { src: 'https://img.alicdn.com/imgextra/i3/2264201946/O1CN01lulyDT1QFJDwOwzS7_!!2264201946.jpg_430x430q90.jpg',key:'6' },
      { src: 'https://img.alicdn.com/imgextra/i4/2264201946/O1CN01HgApzd1QFJDwxsIQz_!!2264201946.jpg_430x430q90.jpg',key:'7' },
    ],
      origin:'',//原图
      slider:'',//滑块
      magnify:'',//放大图
      magPic:'',//放大原始图片
      oriPic:'',//图片地址
      backState:0,//返回状态
      goState:0,//前进状态
      num:0,//left偏移数值
    }
  },
  methods: {
    //点击图片，修改显示图片源
    changePic(val) {
      this.oriPic = val;
    },
    //初始化
    init() {
      this.origin = document.getElementsByClassName("origin")[0];
      this.slider = document.getElementsByClassName("slider")[0];
      this.magnify = document.getElementsByClassName("magnify")[0];
      this.magPic = document.getElementsByClassName("pic-magnify")[0];
      this.oriPic = this.items[0].src;//默认赋予第一张图片
      this.backState = (this.items.length - 4 < 0) ? 0 : (this.items.length - 4);
    },
    //鼠标移动放大图片
    mouseMove(e) { 
      let even = e || event; //兼容火狐浏览器
      let x = even.clientX - this.origin.offsetLeft - this.slider.offsetWidth / 2;
      let y = even.clientY - this.origin.offsetTop - this.slider.offsetHeight / 2;
      //水平方向的最大值
      let maxX = this.origin.clientWidth - this.slider.clientWidth;
      //竖直方向的最大值
      let maxY = this.origin.clientHeight - this.slider.clientHeight;
      if (x < 0) {
        //相当于超出左侧,超出左侧时,拉回
        x = 0;
      }
      //超出右侧时拉回
      if (x > maxX) {
        x = maxX;
      }
      //顶部超出
      if (y < 0) {
        y = 0;
      }
      //底部超出
      if (y > maxY) {
        y = maxY;
      }
      this.slider.style.top = y + "px";
      this.slider.style.left = x + "px";
      //放大的图片的主要实现代码:一个比例计算
      this.magnify.scrollLeft = x / maxX * (this.magPic.clientWidth - this.magnify.clientWidth);
      this.magnify.scrollTop = y / maxY * (this.magPic.clientHeight - this.magnify.clientHeight);
    },
    //鼠标进入图片
    mouseEnter() {
      //鼠标移入到原图时候实现,上面出现的小的方块
      this.slider.style.display = "block";
      //右侧的大图区域显示出来图片
      this.magnify.style.display = "block";
      console.log(this.items.length)
    },
    //鼠标离开图片
    mouseLeave() {
      //鼠标移出到原图时候实现,上面出现的小的方块消失
      this.slider.style.display = "none";
      //右侧的大图区域显示出来图片隐藏
      this.magnify.style.display = "none";
    },
    //后退按钮
    backImg() {
      if(this.backState > 0) {
        this.num -= 100;
        this.backState --;
        this.goState ++;
      }
    },
    //前进按钮
    goImg() {
      if(this.goState > 0) {
        this.num += 100;
        this.backState ++;
        this.goState --;
      }
    }
  },
  mounted() {
    this.init();
  },
}
</script>
<style lang="scss" scoped>
.container {
      margin: 0;
      padding: 0;
      .origin {
        width: 400px;
        height: 400px;
        position: relative;
        .pic-origin {
          width: 400px;
          height: 400px
        }
        .slider {
          cursor:move;
          width: 140px;
          height: 140px;
          top:0;
          background: rgba(135, 135, 135, 0.4);
          position: absolute;
          display: none;
        }
      }
      .magnify {
        width: 400px;
        height: 400px;
        position: absolute;
        top: 188px;
        left: 403px;
        overflow: hidden;
        display: none;
        .pic-magnify {
          width: 800px;
          height: 800px;
        }
      }
      .list {
        height: 100px;
        width: 400px;
        margin-top: 5px;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        .list-content {
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
          .list-item {
              width: 100px;
              height: 100px;
              float: left;
              list-style: none;
              float: left;
              cursor: pointer;
            }
        }
        .list-back {
          height: 32px;
          width: 32px;
          top: 32px;
          position: absolute;
          background: url(/static/img/back.jpg) no-repeat;
        }
        .list-backNo {
          background: url(/static/img/backNo.jpg) no-repeat;
        }
        .list-go {
          height: 32px;
          width: 32px;
          top: 32px;
          left: 360px;
          position: absolute;
          background: url(/static/img/go.jpg) no-repeat;
        }
        .list-goNo {
          background: url(/static/img/goNo.jpg) no-repeat;
        }
      }
    }
</style>
