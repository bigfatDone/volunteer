<template>
    <div class="container">
        <nav>
            <span>当前位置：</span>
            <router-link to="/index" tag="span">首页&nbsp;</router-link>>
            <span>志愿项目</span>
        </nav>
        <div class="content">
            <section>
                <div class="list">
                    <div class="item" @click="toDetail(project)" v-for=" project in projectData" :key="project.id">
                        <div class="time">
                          {{project.date}}
                        </div>
                        <div class="icon">
                          <img :src='project.pic' alt="">
                        </div>
                        <div class="desc ys-text-ellipsis">
                          {{project.title}}
                        </div>
                        <div class="condition">
                          <div class="condition-left">
                            <span>计划岗位：{{project.number}}</span>
                          </div>
                          <div class="condition-right working" v-show="project.type === 1">招募中</div>
                          <div class="condition-right end" v-show="project.type === 0">已结束</div>
                        </div>
                        <div class="progress">
                          <div class="num">
                            <p>报名人数</p>
                            <p>***</p>
                          </div>
                          <div class="end">
                            <p>结束时间</p>
                            <p>{{project.end_time}}</p>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="page">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="10">
                  </el-pagination>
                </div>
            </section>
            <aside>
              <v-aside></v-aside>
            </aside>
        </div>
    </div>
</template>
<script>
import { getProjectPage,getSearch } from '@/api/project'
export default {
   data() {
     return {
       projectData: ""
     }
   },
   methods: {
     toDetail(val) {
       this.$router.push({name:'project-detail',query:{id:val.id,type:val.type}});
     },
     // 获取志愿项目
     toDProjectPage() {
       if( this.$route.query.type == 1){
         getSearch({
           title: this.$route.query.data
         }).then( res => {
           this.projectData = res;
         })
       } else {
         getProjectPage({}).then( res => {
           this.projectData = res;
         })
       }
     }
   },
   mounted() {
     this.toDProjectPage();
   },
  watch: {
    '$route' (to, from) {
       this.toDProjectPage();
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
    width: 1000px;
    margin: 0 auto 20px;
    nav {
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        margin: 10px;
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
            // color: $base-color;
            // cursor: pointer;
        }
    }
    .content {
        display: flex;
        justify-content: space-between;
        section {
            width: 720px;
            border: 1px solid #c5e9fb;
            .list {
              display: flex;
              min-height: 370px;
              justify-content: space-around;
              flex-wrap: wrap;
                .item {
                  display: flex;
                  width: 230px;
                  margin-top: 10px;
                  border: 2px solid #EDEDED;
                  flex-wrap: wrap;
                  justify-content: center;
                  border-radius: 10px;
                  cursor: pointer;
                    .time {
                      width: 100%;
                      height: 30px;
                      background: $base-color;
                      color: #fff;
                      text-align: center;
                      font-size: 18px;
                      line-height: 30px;
                      border-radius: 5px 5px 0 0;
                    }
                    .icon {
                      width: 210px;
                      height: 210px;
                      margin: 10px 0;
                      border-radius: 5px;
                      img {
                        width: 210px;
                        height: 210px;
                        border-radius: 5px;
                      }
                    }
                    .desc {
                      width: 100%;
                      height: 28px;
                      font-size: 18px;
                    }
                    .condition {
                      display: flex;
                      width: 100%;
                      height: 22px;
                      padding-bottom: 5px;
                      font-size: 12px;
                      justify-content: space-between;
                      align-items: center;
                      border-bottom:1px solid #ccc;
                      .condition-left {
                        margin-left: 6px;
                        color:  #888;
                      }
                      .condition-right {
                        width: 54px;
                        height: 22px;
                        line-height: 22px;
                        border-radius: 5px;
                        margin-right: 12px;
                        text-align: center;
                        color: #fff;
                        background-color: $base-color;
                      }
                      .working {
                        background-color: $base-color;
                      }
                      .end {
                        background-color: lightgray;
                      }
                    }
                    .progress {
                      display: inherit;
                      width: 100%;
                      height: 46px;
                      color: $base-font-color;
                      p {
                        line-height: 23px;
                      }
                      .num {
                        width: 50%;
                        text-align: center;
                      }
                      .end {
                        width: 50%;
                        text-align: center;
                    }
                  }
                &:hover {
                  box-shadow: 0.5px 0.5px 4px 2px $base-color;
                }
                }
            }
            .page {
              margin: 70px auto 100px;
              display: flex;
              justify-content: center;
            }
        }
        aside {
            width: 260px;
            border: 1px solid #c5e9fb;
            .recommend {
              .title {
                border-bottom: 1px dotted #ccc;
                height: 40px;
                line-height: 40px;
                font-weight: bold;
                font-size: 15px;
                padding-left: 5px;
              }
              .details {
                li {
                  display: flex;
                  height: 26px;
                  font-size: 13px;
                  align-items: center;
                  cursor: pointer;
                  &:hover {
                    color: rgb(238, 26, 26);
                  }
                  span:nth-child(1) {
                    padding: 0 5px;
                  }
                  img {
                    height: 8px;
                    width: 8px;
                  }
                }
              }
            }
            .recommend-news {
            }
        }
    }
}
</style>

