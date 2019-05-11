<template>
<div>
  <div v-for="(item,index) in list" :key="item.name" @click="change(item,index)" style="padding:30px;">
    {{item.name}}{{item.status}}
  </div>
</div>
</template> 
<script>
export default {
  data() {
    return {
      list:[
        {name:'limiang',status:'true'},
        {name:'xiaoli',status:'false'},
        {name:'lili',status:'false'},
      ]
    }
  },
  methods: {
    change(item,code) {
      this.list.forEach((item1,index)=>{
        if(code == index){
          if( item1.status == 'true'){
            item1.status = 'false';
          } else {
            item1.status = 'true';

          }
        }
      })
        console.log(item.status)
    }
  }
    }
</script> 
<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
}
</style>
<style lang="scss">
.ql-snow .ql-editor img {
  height: 50px;
  width: 50px;
}
</style>
