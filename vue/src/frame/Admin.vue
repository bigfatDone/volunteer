<template>
  <div class="page">
    <header>欢迎你，管理员</header>
    <div class="content">
      <aside>
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" 
          >
            <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <span slot="title" @click="test()">数据报表</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>注册审核</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">志愿者注册审核</el-menu-item>
                <el-menu-item index="2-2">社区注册审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-phone-outline"></i>
              <span slot="title">求助信息管理</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span>志愿快讯管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">志愿快讯发布</el-menu-item>
                <el-menu-item index="4-2">志愿快讯管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>志愿项目管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">志愿项目审核</el-menu-item>
                <el-menu-item index="5-2">志愿发布</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="6">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </aside>
      <router-view class="section"></router-view>
    </div>
            <footer>
          <div class="about">
            <a href="#">关于我们</a>
            <a href="#">联系我们</a>
            <a href="#">网友纠错</a>
            <a href="#">常见问题</a>
          </div>
          <div class="sponsor">
            <a href="#">主办：仲恺农业工程学院</a>
            <a href="#">技术支持：钟阳山</a>
          </div>
        </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    test(){
      console.log(1111)
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  font-size: 16px;
  header {
    padding: 0 180px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(left,#545c64,#768594);
  }
  .content {
    display: flex;
    margin: 0 200px;
    aside {
      width: 25%;
      min-height: 500px;
      .icon {
        display: flex;
        width: 100%;
        height: 200px;
        justify-content: center;
        align-items: center;
        background-color: rgb(84, 92, 100);
        img {
          height: 64px;
          width: 64px;
        }
      }
    }
    .section {
      width: 75%;
    }
  }
         footer {
          width: 100%;
          height: 120px;
          font-size: 15px;
          background: linear-gradient(left,#768594,#545c64);
          .about {
            width: 400px;
            text-align: center;
            margin: 0 auto;
            padding-top: 40px; 
            padding-bottom: 10px;
            a {
              color: #fff;
              margin: 0 2px;
              &:hover{
                color: black;
              }
            }
          }
          .sponsor {
            width: 400px;
            margin: 0 auto;
            text-align: center;
            a {
              color: #fff;
              margin: 0 10px;
              &:hover{
                color: black;
              }
            }
          }
        }
}
</style>
<style lang="scss">
.page {
  .el-menu-item {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
  }
  .el-submenu__title {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
  }
  .el-menu-item-group .el-menu-item {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    padding-left: 70px!important;
  }
}
</style>