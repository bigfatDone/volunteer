<template>
  <div class="container">
    <div class="content">
      <section class="form">
        <div class="title">项目填报</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题：" prop="header">
            <el-input v-model="ruleForm.header" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="活动图片：" required>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3001/files"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="所在区域：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
              <el-option label="茂名" value="茂名"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招募人数：">
            <el-input-number v-model="ruleForm.number" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="招募开始日期：" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.st_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="输入招募开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;&nbsp;-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.end_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="输入招募结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="开始日期：" required>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.work_st_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;&nbsp;-</el-col>
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  v-model="ruleForm.work_end_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="输入结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="项目描述：" prop="desc">
            <el-input v-model="ruleForm.desc" placeholder="请输入项目描述"></el-input>
          </el-form-item>
          <el-form-item label="项目详情：" prop="detail">
            <el-input type="textarea" v-model="ruleForm.detail" placeholder="项目详情"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <div class="title">社区资料填写</div>
          <el-form-item label="社区名称：" prop="community">
            <el-input v-model="ruleForm.community" placeholder="请输入社区名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系号码：" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入联系号码"></el-input>
          </el-form-item>
          <el-form-item label="社区地址：" prop="communityAddr">
            <el-input v-model="ruleForm.communityAddr" placeholder="请输入社区地址"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')" round>发&nbsp;布</el-button>
            <el-button @click="resetForm('ruleForm')" round>重&nbsp;置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>
<script>
import { getProject } from "@/api/project";
export default {
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        id: "",
        header: "",
        pic: "",
        region: "",
        number: 1,
        st_time: "",
        end_time: "",
        work_st_time: "",
        work_end_time: "",
        desc: "",
        detail: "",
        address: "",
        community: "",
        name: "",
        tel: "",
        communityAddr: "",
        date: ""
      },
      rules: {
        header: [{ required: true, message: "请输入标题", trigger: "blur" }],
        region: [
          { required: true, message: "请选择所在区域", trigger: "change" }
        ],
        number: [
          { required: true, message: "请输入招募人数", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写项目描述", trigger: "blur" }],
        detail: [
          { required: true, message: "请填写项目详情", trigger: "blur" }
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        community: [
          { required: true, message: "请填写社区名称", trigger: "blur" }
        ],
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
        ],
        communityAddr: [
          { required: true, message: "请填写社区地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    // 提交发布信息
    toProject() {
      this.ruleForm.date = this.getNowFormatDate();
      getProject({
        data: this.ruleForm
      }).then(res => {
        this.$message.success(res.msg);
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.pic = "http://localhost:3001/" + file.response;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.toProject();
        } else {
          this.$message.error("请填写带*号数据！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.imageUrl = "";
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
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto 20px;

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
        text-align: center;
      }
      .line {
        padding-left: 15px;
      }
      .btn {
        margin: 40px 0 60px 100px;
      }
    }
  }
}
</style>
<style lang="scss">
.content {
  .el-form-item__label {
    // padding: 0 20px 0 0;
    font-size: 16px;
  }
  .el-input__inner {
    font-size: 15px;
  }
  .el-textarea__inner {
    height: 110px;
    font-size: 15px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
line-height: 178px!important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


