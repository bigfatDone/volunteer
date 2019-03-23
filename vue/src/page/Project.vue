<template>
    <div class="container">
        <nav>
            <span>当前位置：</span>
            <router-link to="/index" tag="span">首页&nbsp;</router-link>>
            <router-link to="/project" tag="span">志愿项目</router-link>
        </nav>
        <div class="content">
            <section>

            </section>
            <aside>

            </aside>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.container {
    width: 1000px;
    margin: 0 auto;
    nav {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        margin: 10px;
        background: #fff;
        font-size: 18px;
        border: 1px solid #eee;
        border-radius: 5px;
        span:nth-child(2) {
            font-size: 16px;
            color: $base-color;
            cursor: pointer;
        }
        span:nth-child(3) {
            font-size: 16px;
            color: $base-color;
            cursor: pointer;
        }
    }
    .content {
        height: 1000px;
        section {
            width: 730px;

        }
        aside {
            width: 260px;
        }
    }
}
</style>

