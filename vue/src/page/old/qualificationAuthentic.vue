<template>
  <div class="page-modu">
    <div class="authentic-modu">
      <div class="title-modu">
        <p>资质认证</p>
        <p class="sub-title">
          <span>*</span>
          为必填项
        </p>
      </div>
      <div class="qualify-form-modu">
        <div class="form-cont">
          <el-form
            ref="form"
            :model="authenticForm"
            size="small"
            label-width="150px"
            class="custom-form"
            :rules="rules"
          >
            <el-form-item label="名称：" prop="itemName">
              <el-input v-model="authenticForm.itemName" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="type">
              <el-radio-group v-model="authenticForm.type">
                <el-radio label="1">企业</el-radio>
                <el-radio label="2">个人</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系人姓名：" prop="contacts">
              <el-input v-model="authenticForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="authenticForm.phone" placeholder="请输入手机号码"></el-input>
              <!-- <el-button type="primary">获取验证码</el-button> -->
            </el-form-item>
            <el-form-item label="验证码：" prop="code">
              <el-input v-model="authenticForm.code" placeholder="请输入验证码" class="defect-input"></el-input>
              <input type="button" @click="createCode" class="verification" v-model="checkCode">
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="authenticForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="联系地址：" prop="addr">
              <el-input v-model="authenticForm.addr" placeholder="请输入联系地址"></el-input>
            </el-form-item>
            <div v-if="this.authenticForm.type == 1" this.idImageList>
              <el-form-item label="营业执照：" prop="busineLicense">
                <!-- <uploader v-model="licenseinfor"></uploader> -->
                <el-upload
                  action="/portal2/uploadFile"
                  list-type="picture-card"
                  :data="licenseinfor"
                  :on-remove="handleRemoveLicense"
                  :on-success="handleSuccessLicense"
                  :limit="6"
                  :on-exceed="handleExceed"
                >
                  <span>上传</span>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="50px" :src="dialogImageUrl" alt>
                </el-dialog>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="身份证：" prop="idCard" this.fireImageList>
                <!-- <uploader v-model="idCard"></uploader> -->
                <el-upload
                  action="/portal2/uploadFile"
                  list-type="picture-card"
                  :data="idCardInfo"
                  :on-remove="handleRemoveId"
                  :on-success="handleSuccessId"
                  :limit="6"
                  :on-exceed="handleExceed"
                >
                  <span>上传</span>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="50px" :src="dialogImageUrl" alt>
                </el-dialog>
              </el-form-item>
            </div>
            <el-form-item label="概况描述：">
              <el-input v-model="authenticForm.intro" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="资格证书：" this.bookImageList>
              <el-upload
                action="/portal2/uploadFile"
                list-type="picture-card"
                :data="bookinfor"
                :on-remove="handleRemoveBook"
                :on-success="handleSuccessBook"
                :limit="6"
                :on-exceed="handleExceed"
              >
                <span>上传</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="50px" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
            <el-form-item label="官网：">
              <el-input v-model="authenticForm.url" placeholder="请输入官网地址"></el-input>
            </el-form-item>
            <el-form-item label="电商平台：">
              <el-input v-model="authenticForm.systemUrl" placeholder="请输入平台地址"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="foot-btn" @click="subBtn">提交认证</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Authentication, getCode } from "@/api/old/person";
export default {
  data() {
    // 1、检验输入的名称
    var checkItemName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("名称不能为空"));
      } else if (/\s/.test(this.authenticForm.itemName)) {
        callback(new Error("名称不能输入空格"));
      }
    };
    // 校验输入的姓名
    var checkContacts = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("联系人姓名不能为空"));
      } else if (/\s/.test(this.authenticForm.name)) {
        callback(new Error("联系人姓名不能输入空格"));
      } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.authenticForm.name)) {
        callback(new Error("联系人姓名不能为空且只能输入中文字符或英文字符"));
      }
    };
    // 校验输入的手机号
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("电话不能为空"));
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.authenticForm.phone)) {
        callback(new Error("请输入正确的手机号码"));
      }
    };
    // 检验验证码
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (/\s/.test(this.authenticForm.code)) {
        callback(new Error("验证码不能输入空格"));
        // } else if (this.authenticForm.code.toLowerCase() != this.checkCode.toLowerCase()) {
        //   callback(new Error("验证码输入不正确"));
      }
    };
    // 检验输入的地址
    var checkAddr = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("地址不能为空"));
      } else if (/\s/.test(this.authenticForm.addr)) {
        callback(new Error("地址不能输入空格"));
      }
    };

    return {
      dialogImageUrl: "",
      dialogVisible: false,
      licenseinfor: { folder: "businesslicense" },
      idCardInfo: { folder: "idcardimgs" },
      bookinfor: { folder: "businesslicense" },
      fireImageList: [],
      idImageList: [],
      bookImageList: [],
      authenticForm: {
        itemName: "",
        type: "1",
        name: "",
        phone: "",
        code: "",
        email: "",
        addr: "",
        intro: "",
        url: "",
        systemUrl: ""
      },
      name: "",
      id: "",
      checkCode: "",
      wxUser: "",
      rules: {
        itemName: [
          { required: true, validator: checkItemName, trigger: "blur" }
        ],
        contacts: [
          { required: true, validator: checkContacts, trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        code: [{ required: true, validator: checkCode, trigger: "blur" }],
        addr: [{ required: true, validator: checkAddr, trigger: "blur" }],
        busineLicense: [
          { required: true, message: "请选择营业执照", trigger: "change" }
        ],
        idCard: [
          { required: true, message: "请选择身份证照", trigger: "change" }
        ],
        type: [{ required: true, message: "身份类别", trigger: "change" }]
      }
    };
  },
  methods: {
    // 提交前校验
    check() {
      if (
        !this.authenticForm.itemName ||
        !this.authenticForm.name ||
        !this.authenticForm.phone ||
        !this.authenticForm.code ||
        !this.authenticForm.addr
        // ||!this.dialogImageUrl
      ) {
        this.$message.error("带*为必填项，请仔细填写");
        return false;
      } else if (
        this.authenticForm.itemName != "" &&
        /\s/.test(this.authenticForm.itemName)
      ) {
        this.$message.error("名称不能输入空格");
        return false;
      } else if (
        this.authenticForm.email != "" &&
        !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.authenticForm.email)
      ) {
        this.$message.error("请输入正确的邮箱");
        return false;
      } else if (
        this.authenticForm.name != "" &&
        /\s/.test(this.authenticForm.name) &&
        !/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.authenticForm.name)
      ) {
        this.$message.error("姓名不能输入空格并只能输入中文或者英文字符");
        return false;
      } else if (
        this.authenticForm.phone != "" &&
        !/^1(3|4|5|7|8)\d{9}$/.test(this.authenticForm.phone)
      ) {
        this.$message.error("请输入正确的手机号码");
        return false;
      } else if (
        this.authenticForm.addr != "" &&
        /\s/.test(this.authenticForm.addr)
      ) {
        this.$message.error("地址不能输入空格");
        return false;
      } else {
        return true;
      }
    },
    // 提交认证
    subBtn() {
      // 把图片原本的数组 格式转变为字符串，使用逗号隔开
      var fileImage = this.fireImageList.join(",");
      var idImage = this.idImageList.join(",");
      var bookImage = this.bookImageList.join(",");
      if (this.check()) {
        Authentication({
          token: this.wxUser.token,
          ENTRUSTXXB_ID: this.wxUser.wxId,
          ENTRUST_NAME: this.authenticForm.itemName,
          TYPE: this.authenticForm.type,
          CONTRACT_NAME: this.authenticForm.name,
          CONTRACT_PHONE: this.authenticForm.phone,
          MAIL: this.authenticForm.email,
          CONTRACT_ADDR: this.authenticForm.addr,
          BUSINESS_LICENSE: fileImage,
          ID_CARD: idImage,
          COMPANY_PROFILE: this.authenticForm.intro,
          CERTIFICATE: bookImage,
          WEBSITE: this.authenticForm.url,
          PLATFORM: this.authenticForm.systemUrl,
          code: this.authenticForm.code
        }).then(res => {
          if (res.success) {
            this.$router.push({
              name: "authenticWait",
              query: { names: "this.name" }
            });
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
            this.checkCode = res.data;
            if (res.message == "登录信息失效,请重新登录") {
              this.$message.error(res.message);
              let wechatData = {};
              this.$store.commit("updateEntrustData", wechatData);
              this.$router.push({ path: "/index" });
            }
          }
        });
      }
    },
    // 营业执照成功
    handleSuccessLicense(response, file, fileList) {
      this.fireImageList.push(file.response.data);
      this.idImageList = [];
    },
    // 移除营业执照
    handleRemoveLicense(file, fileList) {
      for (var i = 0; i < this.fireImageList.length; i++) {
        if (this.fireImageList[i] == file.response.data) {
          this.fireImageList.splice(i, 1);
        }
      }
    },
    // 身份证上传成功
    handleSuccessId(response, file, fileList) {
      this.idImageList.push(file.response.data);
      this.fireImageList = [];
    },
    // 移除身份证
    handleRemoveId(file, fileList) {
      for (var i = 0; i < this.idImageList.length; i++) {
        if (this.idImageList[i] == file.response.data) {
          this.idImageList.splice(i, 1);
        }
      }
    },
    // 资质证书上传成功
    handleSuccessBook(response, file, fileList) {
      this.bookImageList.push(file.response.data);
    },
    // 移除资质证书
    handleRemoveBook(file, fileList) {
      for (var i = 0; i < this.bookImageList.length; i++) {
        if (this.bookImageList[i] == file.response.data) {
          this.bookImageList.splice(i, 1);
        }
      }
    },

    // 页面初始化获取验证码
    createCode() {
      getCode({
        token: this.wxUser.token,
        entrustxxb_id: this.wxUser.wxId
      }).then(res => {
        if (res.success) {
          this.checkCode = res.data;
        }
      });
    },

    // 获得微信登录的信息
    getUser() {
      this.wxUser = this.$store.state.entrustData;
      this.id = this.wxUser.wxId;
      this.name = this.wxUser.wxName;
    },
    // 文件上传个数限制、
    handleExceed(files, fileList) {
      this.$message.warning("所有图片最多只能上传6张！");
    }
  },
  mounted() {
    this.getUser();
    this.createCode();
  }
};
</script>

<style lang="scss" scoped>
.page-modu {
  background: #f3f3f3;
  .authentic-modu {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .title-modu {
      text-align: center;
      padding: 40px 0 24px 0;
      p {
        font-size: 24px;
        color: #333;
        line-height: 30px;
        margin: 0;
        &.sub-title {
          font-size: 18px;
        }
      }
      span {
        color: #ff1c1c;
        transform: translateY(5px);
        display: inline-block;
      }
    }
    .qualify-form-modu {
      background: #fff;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      padding: 36px 0;
      margin-bottom: 44px;
      .verification {
        width: 80px;
        line-height: 30px;
        position: absolute;
        left: 300px;
        top: 2px;
        font-size: 18px;
        color: #452452;
        background: #e4e2f0;
      }
      .defect-input {
        width: 280px;
      }
      .form-cont {
        width: 530px;
        margin: 0 auto;
        .el-form-item__label {
          font-size: 20px;
        }
        .itme-right {
          font-size: 18px;
          color: #333;
          text-align: right;
          &.red-color {
            color: #cc0200;
          }
        }
        .item-infor {
          ul {
            background: #eee;
            padding: 8px;
            margin: 10px 0 0 0;
            .item-li {
              color: #999;
            }
          }
        }
        .tooltip {
          font-size: 14px;
          color: #999;
          line-height: 20px;
          margin-top: 8px;
        }
        .foot-btn {
          width: 100%;
          font-size: 24px;
          color: #fff;
          line-height: 42px;
          text-align: center;
          background: $base-color;
          border-radius: 4px;
          margin-top: 28px;
          cursor: pointer;
        }
        .explain-modu {
          background: #eee;
          padding: 6px 12px;
          dt,
          dd {
            font-size: 14px;
            color: #999;
            margin: 4px 0;
          }
        }
        .el-select {
          width: 100%;
        }
        .dateBox {
          width: 100%;
        }
        .img-modu {
          margin: 0;
          padding: 0;
          .img-list {
            width: 80px;
            height: 80px;
            margin-right: 10px;
            position: relative;
            float: left;
            .img-cont {
              width: 100%;
              height: 100%;
              border: 1px solid #ccc;
              border-radius: 10px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .close-btn {
              width: 16px;
              height: 16px;
              border: 1px solid #ccc;
              border-radius: 10px;
              background: #fff;
              position: absolute;
              right: -8px;
              top: -8px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.qualify-form-modu {
  .el-form-item__label {
    font-size: 18px;
  }
  .el-radio__label {
    font-size: 16px;
  }
}
</style>

