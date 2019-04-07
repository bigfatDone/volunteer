<template>
     <quill-editor 
      v-model="content" 
      ref="myQuillEditor" 
      :options="editorOption" 
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
</template> 
<script>
import { constants } from 'fs';
    export default{
        data(){
            return {
                content:null,
                editorOption:{}
            }
        },
        methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            }
        },
        watch:{
          content(val){
          console.log(val)
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
