<template>
    <div>
        <header>
            <div class="login">
                <div class='tologin'>亲，请登录</div>
                <div class="volunteer-register">志愿者注册&nbsp;</div>
                <span>/</span>
                <div class="community-register">&nbsp;社区注册</div>
            </div>
        </header>
        <div class="search">

        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
header {
    background: #f5f5f5 repeat-x bottom;
    border-bottom: 1px solid #eee;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    .login {
        display: flex;
        margin:  0 100px;
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
    // background-image: '~@/../static/images/logobg.png'
}
</style>

