<template>
  <div class="page">
    <header title="退出登录" @click="signOut()">欢迎你，{{this.name}}</header>
    <div class="content">
      <aside>
        <el-col :span="24">
          <el-menu
            :default-active="status"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @open="handleOpen"
          >
            <el-menu-item index="1" @click="toLink('1')">
              <i class="el-icon-document"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>注册审核</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="toLink('2-1')">志愿者注册审核</el-menu-item>
                <el-menu-item index="2-2" @click="toLink('2-2')">社区注册审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" @click="toLink('3')">
              <i class="el-icon-phone-outline"></i>
              <span slot="title">求助信息管理</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span>志愿快讯管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="toLink('4-1')">志愿快讯发布</el-menu-item>
                <el-menu-item index="4-2" @click="toLink('4-2')">志愿快讯管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>志愿人物管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="toLink('5-1')">志愿人物发布</el-menu-item>
                <el-menu-item index="5-2" @click="toLink('5-2')">志愿人物管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>志愿项目管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1" @click="toLink('6-1')">志愿项目审核</el-menu-item>
                <el-menu-item index="6-2" @click="toLink('6-2')">志愿发布</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="7" @click="toLink('7')" v-show=" this.$store.state.adminInfo.grade === 0 ">
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
      status: "1",
      name: "",
      grade: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    toLink(val) {
      switch (val) {
        case "1":
          this.$router.push({ name: "admin/home" });
          break;
        case "2-1":
          this.$router.push({ name: "admin/volunteer-check" });
          break;
        case "2-2":
          this.$router.push({ name: "admin/community-check" });
          break;
        case "3":
          this.$router.push({ name: "admin/help-check" });
          break;
        case "4-1":
          this.$router.push({ name: "admin/news-publish" });
          break;
        case "4-2":
          this.$router.push({ name: "admin/news-manage" });
          break;
        case "5-1":
          this.$router.push({ name: "admin/personage-publish" });
          break;
        case "5-2":
          this.$router.push({ name: "admin/personage-manage" });
          break;
        case "6-1":
          this.$router.push({ name: "admin/project-manage" });
          break;
        case "6-2":
          this.$router.push({ name: "admin/project-publish" });
          break;
        case "7":
          this.$router.push({ name: "admin/admin-manage" });
          break;
      }
    },
    signOut() {
      this.$router.push({ name: "admin/login" });
      this.$store.commit("updataAdminInfo", {
        name: "",
        grade: ""
      });
    },
    loginStatus() {
      let msg = this.$store.state.adminInfo;
       if (msg== undefined || !msg.name) {
         this.$router.push({ name: "admin/login" });
      } else {
        this.name = msg.name;
        this.garde = msg.grade;
      }
    },
    splitUrl() {
      let url = window.location.href;
      let str = url.split('/').pop()
     switch(str) {
      case 'home' :
        this.status = '1';
        break;
      case 'volunteer-check' :
        this.status = '2-1';
        break;
      case 'community-check' :
        this.status = '2-2';
        break;
      case 'help-check' :
        this.status = '3';
        break;
      case 'news-publish' :
        this.status = '4-1';
        break;
      case 'news-manage' :
        this.status = '4-2';
        break;
      case 'personage-publish' :
        this.status = '5-1';
        break;
      case 'personage-manage' :
        this.status = '5-2';
        break;
      case 'project-manage' :
        this.status = '6-1';
        break;
      case 'project-publish' :
        this.status = '6-2';
        break;
      case 'admin-manage' :
        this.status = '7';
        break;
     }
    }
  },
  mounted() {
    this.loginStatus();
    this.splitUrl()
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
    cursor: pointer;
    background: linear-gradient(#545c64,#768594);
  }
  .content {
    display: flex;
    margin: 0 200px;
    aside {
      width: 25%;
      min-height: 400px;
      margin-bottom: 10px;
      .icon {
        display: flex;
        width: 100%;
        height: 200px;
        justify-content: center;
        align-items: center;
        background-color: rgb(84, 92,100);
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
    background: linear-gradient(#768594,#545c64);
    .about {
      width: 400px;
      text-align: center;
      margin: 0 auto;
      padding-top: 40px;
      padding-bottom: 10px;
      a {
        color: #fff;
        margin: 0 2px;
        &:hover {
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
        &:hover {
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
    padding-left: 70px !important;
  }
}
</style>