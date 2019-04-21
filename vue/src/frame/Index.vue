<template>
    <div class="container">
    <div class="content">
        <header>
            <div class="login" v-if="this.$store.state.userInfo.flag == 1">
              <div class="haslogin" @click="status = !status">欢迎您，{{ this.$store.state.userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i></div>
              <div class="out" v-show="status" @click="signOut">退出登录</div>
           </div>
            <div class="login" v-else>
                <router-link to="/login" class='tologin' tag="div">亲，请登录</router-link>
                <router-link to="/volunteerRegister" class="volunteer-register">志愿者注册&nbsp;</router-link>
                <span>/</span>
                <router-link to="/communityRegister" class="community-register">&nbsp;社区注册</router-link>
            </div>
            <div class="center">
               <router-link to="/center" v-show="this.$store.state.userInfo.grade === 2">个人中心</router-link>
               <router-link to="/Community-center" v-show="this.$store.state.userInfo.grade === 3">社区中心</router-link>
            </div>
        </header>
        <div class="search">
          <div class="logo">
            <img src="~@/../static/images/logochange.png" alt="">
          </div>
          <div class="tosearch">
            <div class="search-content" contenteditable="true">
              <input type="text" placeholder="搜索志愿项目">
            </div>
            <div class="btn">搜索</div>
          </div>
        </div>
        <nav>
          <ul>
            <router-link tag="li" to="/index" class="nav-hover">首页</router-link>
            <router-link tag="li" to="/project" class="nav-hover">志愿项目</router-link>
            <router-link tag="li" to="/help" class="nav-hover">求助中心</router-link>
            <router-link tag="li" to="/news" class="nav-hover">志愿快讯</router-link>
            <router-link tag="li" to="/personage" class="nav-hover">志愿人物</router-link>
            <router-link tag="li" to="/publish" class="nav-hover" v-show=" grade === 3">发布项目</router-link>
            <router-link tag="li" to="/audit" class="nav-hover" v-show=" grade === 3">审核</router-link>
          </ul>
        </nav>
        <router-view></router-view>
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
  </div>
</template>

<script>
import { getUpdateUser } from '@/api/login/login'
export default {
    data() {
      return {
        status: 0,
        grade: ''
      }
    },
    methods: {
     signOut() {
       this.$router.push({ name:'login'});
       this.$store.commit('updataUserInfo',{})
     },
     loginStatus() {
      let msg = this.$store.state.userInfo;
       if (msg== undefined || !msg.name) {
        this.$store.commit('updataUserInfo',{
         name: '',
         grade: '',
         type: ''
       })
      } else {
        getUpdateUser({
        id: this.$store.state.userInfo.id
      }).then( res => {
         if(res[0].flag == 1) {
          this.$store.commit('updataUserInfo',res[0])
        } else {
          this.$message.error(res.msg)
          this.$store.commit('updataUserInfo',{})
        } 
      }
      )
      }
    }
    },
    mounted() {
      this.loginStatus()
    }
}
</script>

<style lang="scss" scoped>
.container {
  // height: 100%;
  position: relative;
    .particles {
      // position: relative;
      width: 100%;
      // height: 100%;
      z-index: 1;
    }
  .content {
    // position: absolute;
    width: 100%;
    // height: 100%;
    top: 0;
    bottom: 0;
    z-index: 998;
    header {
        display: flex;
        justify-content: space-between;
        padding: 0 180px;
        background: $base-background-color repeat-x bottom;
        border-bottom: 1px solid #eee;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        .login {
            display: flex;
            position: relative;
            flex-wrap: nowrap;
            .haslogin {
              color: black;
              cursor: pointer;
            }
            .tologin {
                color: red;
                cursor: pointer;
            }
            .out {
              position: absolute;
              width: 100px;
              top: 30px;
              right: -30px;
              text-align: center;
              height: 36px;
              cursor: pointer;
              background-color: $base-background-color;
            }
            .volunteer-register {
                margin-left: 20px;
                cursor: pointer;
            }
            .community-register {
                cursor: pointer;
            }
            .volunteer-register:hover,.community-register:hover {
                color: red;
            } 
        }
        .center {
          padding: 0 9px;
          margin-right: 35px;
          font-size: 14px;
          cursor: pointer;
          border-bottom: 1px solid #8686e8;
        }
    }
    .search {
        display: flex;
        height: 110px;
        padding: 0 170px;
        background-image: url('~@/../static/images/logobg.jpg');
        justify-content: space-between;
        .logo {
          height: 110px;
          width: 230px;
          padding-top: 15px;
          box-sizing: border-box;
          width: 230px;
          img {
            width: 230px;
          }
        }
        .tosearch {    
          font-family: 微软雅黑;
          width: 492px;
          height: 44px;
          display: flex;
          border: 2px solid $base-color; 
          margin: 30px 0 0 0;
          .search-content {
            display: flex;
            width: 70%;
            height: 100%;
            padding-left: 32px;
            font-size: 18px;
            color: #796a6a;
            align-items: center;
            input {
              background: rgba(255,255,255,0);
            }
          }
          .btn {
            display: inherit;
            width: 30%;
            height: 100%;
            background-color: $base-color;
            color: #fff;
            font-size: 18px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
        }
        nav {
          height: 40px;
          background: $base-color;
          line-height: 40px;
          padding: 0 170px;
          ul {
            li {
              float: left;
              color: #fff;
              width: 103px;
              height: 40px;
              text-align: center;
              font-size: 17px;
              cursor: pointer;
            }
            .nav-hover:hover {
              background-color: #fff;
              color: $base-color;
            }
          }
          .router-link-active {
            background-color: #fff;
            color: $base-color;
          }
        }
        footer {
          width: 100%;
          height: 120px;
          background-color: $base-color;
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
    }
</style>

