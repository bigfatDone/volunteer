<template>
  <div class="container">
    <nav>
      <span>当前位置：</span>
      <router-link to="/index" tag="span">首页&nbsp;</router-link>>
      <span>求助中心</span>
    </nav>
    <div class="content">
      <section class="form">
        <div class="title">任何人都可以发布求助信息，无需登录。志愿者可以在此选择就近的求助。</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="求助标题：" prop="header">
            <el-input v-model="ruleForm.header" placeholder="请输入求助标题"></el-input>
          </el-form-item>
          <el-form-item label="所在区域：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
              <el-option label="茂名" value="茂名"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="求助内容：" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入求助内容"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="求助人：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入求助人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系号码：" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入联系号码"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')" round>发&nbsp;布</el-button>
            <el-button @click="resetForm('ruleForm')" round>重&nbsp;置</el-button>
          </el-form-item>
        </el-form>
      </section>
      <div class="line"></div>
      <section class="publish">
        <div class="item" v-for="item in helpInfo" :key="item.id">
          <div class="item-title">
            <span>{{item.title}}</span>
            <span>{{item.date}}</span>
          </div>
          <div class="item-info">
            <span>区域：</span>
            <span>{{item.area}}</span>
            <span>详细地址：</span>
            <span>{{item.address}}</span>
            <span>发布人：</span>
            <span>{{item.name}}</span>
            <span>联系号码：</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="item-desc">
            {{item.content}}
          </div>
          <div class="line-small"></div>
          <div class="item-remark">
            <span>备注：{{item.mark}}</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page='page'
            @current-change='pageChange'
            :total="num"
            @prev-click='prev()'
            @next-click='next()'
          ></el-pagination>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { getHelp,getHelpInfo,getHelpTotal } from '@/api/help'
export default {
  data() {
    return {
      helpInfo: '',
      num:10,
      page: 1,
      ruleForm: {
        header: "",
        region: "",
        desc: "",
        address: "",
        name: "",
        tel: "",
        date: ""
      },
      rules: {
        header: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择所在区域", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写求助内容", trigger: "blur" }],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        name: [
          {
            required: true,
            validator: this.checkRule.checkName,
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            validator: this.checkRule.checkPhone,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.toHelpInfo();
    this.toHelpTotal();
  },
  methods: {
    toHelp() {
      getHelp({
        header: this.ruleForm.header,
        region: this.ruleForm.region,
        desc: this.ruleForm.desc,
        address: this.ruleForm.address,
        name: this.ruleForm.name,
        phone: this.ruleForm.tel,
        date: this.getNowFormatDate()
      }).then( res=> {
          this.$message.success(res.msg)
          this.$refs['ruleForm'].resetFields();
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toHelp()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 获取求助信息
    toHelpInfo() {
      getHelpInfo({
        page: this.page
      }).then( res => {
        this.helpInfo = res;
      })
    },
    // 获取求助信息total
    toHelpTotal() {
      getHelpTotal({
      }).then( res => {
        this.num = res.total*10;
      })
    },
    // 上一页
    prev() {
      this.page -= 1;
      this.toHelpInfo()
    },
    // 下一页
    next() {
      this.page += 1;
      this.toHelpInfo()
    },
    pageChange(val) {
      this.page = val
      this.toHelpInfo()
    } 
  }
};
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
    border: 1px solid #c5e9fb;
    border-radius: 5px;
    .form {
      width: 600px;
      margin: 20px auto 20px;
      .title {
        width: 450px;
        line-height: 35px;
        font-size: 18px;
        margin: 0 auto 15px;
        font-weight: bold;
        text-align: center;
      }
      .btn {
        margin-left: 100px;
        margin-top: 40px;
      }
    }
  }
  .publish {
    width: 100%;
    padding-top: 20px;
    .item {
      padding: 0 100px;
      margin-bottom: 40px;
      color: #000;
      .item-title {
        display: flex;
        margin: 15px 0px;
        padding: 0px 20px;
        justify-content: space-between;
        span:nth-child(1) {
          font-size: 20px;
        }
        span:nth-child(2) {
          color: $base-font-color;
        }
      }
      .item-info {
        margin: 15px 0px;
        span:nth-child(even) {
          margin-right: 20px;
          color: #777272;
        }
        span:nth-child(odd) {
        }
      }
      .item-desc {
        margin: 15px 0px;
        width: 500px;
        line-height: 28px;
        text-indent: 24px;
        color: $base-font-color;
        font-size: 16px;
      }
      .item-remark {
        width: 500px;
        margin: 15px 0px;
        text-indent: 20px;
        color: red;
      }
    }
    .page {
      margin: 70px auto 100px;
      display: flex;
      justify-content: center;
    }
  }
  .line {
    height: 1px;
    margin: 0 5px;
    background-color: $base-border-color;
  }
  .line-small {
    height: 1px;
    background-color: #e4d9d9;
  }
}
</style>
<style lang="scss">
.content {
  .el-form-item__label {
    padding: 0 28px 0 0;
    font-size: 16px;
  }
  .el-input__inner {
    font-size: 16px;
  }
  .el-textarea__inner {
    height: 120px;
    font-size: 16px;
  }
}
</style>


