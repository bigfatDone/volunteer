<template>
    <div class="container">
        <vue-particles class="po"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
      46464666446466465645645465465456
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 1000px;
    background-color: black;
    position: relative;
    .po {
        position: absolute;
    }
}
</style>

