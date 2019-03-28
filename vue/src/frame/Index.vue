<template>
    <div class="container">
      <vue-particles class="particles"
        color="#0088cc"
      >
    </vue-particles>
    <div class="content">
        <header>
            <div class="login">
                <router-link to="/login" class='tologin' tag="div">亲，请登录</router-link>
                <router-link to="/volunteerRegister" class="volunteer-register">志愿者注册&nbsp;</router-link>
                <span>/</span>
                <router-link to="/communityRegister" class="community-register">&nbsp;社区注册</router-link>
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
            <router-link tag="li" to="/publish" class="nav-hover">发布项目</router-link>
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
export default {
    
}
</script>

<style lang="scss" scoped>
.container {
  // height: 100%;
  position: relative;
    .particles {
      position: relative;
      width: 100%;
      // height: 100%;
      z-index: 1;
    }
  .content {
    position: absolute;
    width: 100%;
    // height: 100%;
    top: 0;
    bottom: 0;
    z-index: 998;
    header {
        background: $base-background-color repeat-x bottom;
        border-bottom: 1px solid #eee;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        .login {
            display: flex;
            margin:  0 180px;
            flex-wrap: nowrap;
            .tologin {
                color: red;
                cursor: pointer;
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
        }
        .router-link-active {
          background-color: #fff;
          color: $base-color;
        }
        footer {
          width: 100%;
          height: 120px;
          background-color: $base-color;
          .about {
            width: 400px;
            text-align: center;
            margin: 0 auto 20px;
            padding-top: 30px; 
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

