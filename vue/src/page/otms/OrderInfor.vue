<!-- 我要寄件_预约信息 -->
<template>
  <div class="w1200">
    <div class="process">
      <express-header :acitveStep="acitveStep"></express-header>
    </div>
    <div class="the-form">
      <el-form ref="dynamicValidateForm" :model="form" label-width="118px">
        <div class="form-content">
          <!-- 预约时间 -->
          <el-form-item label="预约时间:">
            <el-date-picker
              v-model="form.time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <div v-for="(item,formIndex) in form.productList" :key="item.key">
            <!-- 产品标题提示 -->
            <div class="form-array">
              <i class="remove-icon" v-show="formIndex!=0" @click="removeForm(item)"></i>
              产品信息
              <span
                v-show="form.productList.length!=1"
              >{{ convertFormNumber(formIndex) }}</span>
              <span class="require-tips">标 * 为必填项</span>
            </div>
            <!-- 产品名称 -->
            <el-form-item
              label="产品名称:"
              :prop="'productList.' + formIndex + '.name'"
              :rules="rules.name"
            >
              <el-popover placemen="bottom-right" trigger="focus" v-model="item.nameVisible">
                <div class="popover">
                  <span
                    class="type"
                    v-for="(option,index) in options.name"
                    :key="index"
                    @click="getOptionValue(formIndex, 'name', option, 'nameVisible')"
                  >{{ option }}</span>
                </div>
                <el-input v-model="item.name" slot="reference"></el-input>
              </el-popover>
            </el-form-item>
            <!-- 数量 -->
            <el-form-item
              label="数量(件):"
              :prop="'productList.' + formIndex + '.number'"
              :rules="rules.number"
            >
              <el-popover placemen="bottom-right" trigger="focus" v-model="item.numberVisible">
                <div class="popover">
                  <span
                    class="type"
                    v-for="(option,index) in options.number"
                    :key="index"
                    @click="getOptionValue(formIndex, 'number', option, 'numberVisible')"
                  >{{ option }}</span>
                </div>
                <el-input v-model="item.number" slot="reference"></el-input>
              </el-popover>
            </el-form-item>
            <!-- 重量 -->
            <el-form-item
              label="重量(kg):"
              :prop="'productList.' + formIndex + '.weight'"
              :rules="rules.weight"
            >
              <el-popover placemen="bottom-right" trigger="focus" v-model="item.weightVisible">
                <div class="popover">
                  <span
                    class="type"
                    v-for="(option,index) in options.weight"
                    :key="index"
                    @click="getOptionValue(formIndex, 'weight', option, 'weightVisible')"
                  >{{ option }}</span>
                </div>
                <el-input v-model="item.weight" slot="reference"></el-input>
              </el-popover>
            </el-form-item>
            <!-- 体积 -->
            <el-form-item
              label="体积(m³):"
              :prop="'productList.' + formIndex + '.volume'"
              :rules="rules.volume"
            >
              <el-popover placemen="bottom-right" trigger="focus" v-model="item.volumeVisible">
                <div class="popover">
                  <span
                    class="type"
                    v-for="(option,index) in options.volume"
                    @click="getOptionValue(formIndex, 'volume', option, 'volumeVisible')"
                    :key="index"
                  >{{ option }}</span>
                </div>
                <el-input v-model="item.volume" slot="reference"></el-input>
              </el-popover>
            </el-form-item>
            <!-- 产品备注 -->
            <el-form-item
              label="产品备注:"
              :prop="'productList.' + formIndex + '.remark'"
              :rules="rules.remark"
            >
              <el-input v-model="item.remark"></el-input>
              <el-button type="text" class="add-form" @click="addForm">+ 多件产品</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="form-btn">
        <el-button class="renturn-btn" @click="returnLast">上一步</el-button>
        <el-button class="submit-btn" @click="submitForm('dynamicValidateForm')">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ExpressHeader from "./ExpressHeader";
import { postOtmsForm } from "@/api/otms/SendExpress";
export default {
  components: {
    ExpressHeader
  },
  data() {
    return {
      acitveStep: "2", // 头部流程模块进度情况
      form: {
        time: "",
        productList: [
          {
            name: "",
            nameVisible: false,
            number: "",
            numberVisible: false,
            weight: "",
            weightVisible: false,
            volume: "",
            volumeVisible: false,
            remark: ""
          }
        ]
      },
      rules: {
        name: [
          {
            required: true,
            validator: this.getValidator("产品名称"),
            trigger: "change"
          }
        ],
        number: [
          {
            required: true,
            validator: this.getValidator("数量"),
            trigger: "change"
          }
        ],
        weight: [
          {
            required: true,
            validator: this.getValidator("重量"),
            trigger: "change"
          }
        ],
        volume: [
          {
            required: true,
            validator: this.getValidator("体积"),
            trigger: "change"
          }
        ],
        remark: [
          {
            required: true,
            validator: this.getValidator("产品备注"),
            trigger: "blur"
          }
        ]
      },
      options: {
        name: ["食品", "文件", "服饰", "生活用品", "数码产品"],
        number: ["1件", "2件", "3件", "4件", "5件"],
        weight: ["1kg", "1.5kg", "2kg", "2.5kg", "3kg"],
        volume: ["1m³（默认）"]
      },
      // 禁止无效的预约日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    // 转换表单序号格式
    convertFormNumber(index) {
      let result = "";
      if (index < 9) {
        result = "-" + "0" + (index + 1);
      } else {
        result = "-" + (index + 1);
      }
      return result;
    },
    // 封装验证规则
    getValidator(string) {
      // 校验整数，不包括小数
      let checkPositiveInt = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(string + "不能为空"));
        } else if (!/(^[1-9]\d*$)/.test(value)) {
          callback(new Error("请输入正整数"));
        } else if (/\s/.test(value)) {
          callback(new Error(string + "不能输入空格"));
        } else {
          callback();
        }
      };
      // 校验整数，包括小数
      let checkPositiveNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(string + "不能为空"));
        } else if (!/^(\d|[1-9]\d+)(\.\d+)?$/.test(value)) {
          callback(new Error("请输入合适的数值"));
        } else if (/\s/.test(value)) {
          callback(new Error(string + "不能输入空格"));
        } else {
          callback();
        }
      };
      // 校验不为空，且不存在空格
      let checkString = (rule, value, callback) => {
        if (value === "") {
          callback(new Error(string + "不能为空"));
        } else if (/\s/.test(value)) {
          callback(new Error(string + "不能输入空格"));
        } else {
          callback();
        }
      };
      let check = "";
      if (string == "重量" || string == "体积") {
        check = checkPositiveNum;
      } else if (string == "数量") {
        check = checkPositiveInt;
      } else {
        check = checkString;
      }
      return check;
    },
    // 获取选项数值
    getOptionValue(formIndex, string, option, visible) {
      if (string == "weight") {
        option = parseFloat(option);
      } else if (string == "name") {
        option = option;
      } else {
        option = parseInt(option);
      }
      this.form.productList[formIndex][string] = option;
      this.form.productList[formIndex][visible] = false;
    },
    // 添加表单
    addForm() {
      this.form.productList.push({
        name: "",
        nameVisible: false,
        number: "",
        numberVisible: false,
        weight: "",
        weightVisible: false,
        volume: "",
        volumeVisible: false,
        remark: "",
        key: Date.now()
      });
    },
    // 删除表单
    removeForm(item) {
      var index = this.form.productList.indexOf(item);
      if (index !== -1) {
        this.form.productList.splice(index, 1);
      }
    },
    // 整理数据
    getAllForm() {
      let senderInfo = this.$store.state.senderInfo,
        receiverInfo = this.$store.state.receiverInfo,
        PICKUP_DATE = this.form.time,
        productList = [];
      for (let i = 0; i < this.form.productList.length; i++) {
        let {
          name: PRODUCT_NAME,
          number: WEIGHT,
          weight: QUANTITY,
          volume: VOLUME,
          remark: REMARKS
        } = this.form.productList[i];
        productList.push({ PRODUCT_NAME, WEIGHT, QUANTITY, VOLUME, REMARKS });
      }
      let allForm = JSON.stringify({
        receiverInfo,
        senderInfo,
        PICKUP_DATE,
        productList
      });
      return allForm;
    },
    // 验证表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let allForm = this.getAllForm();
          postOtmsForm(allForm).then(res => {
            this.$store.commit("updateSenderData", {});
            this.$store.commit("updateReceiverData", {});
            this.$router.push("/otms/otmsSuccess");
            if (res.success) {
              this.$store.commit("updateSenderData", {});
              this.$store.commit("updateReceiverData", {});
              this.$router.push("/otms/otmsSuccess");
            } else {
              this.$message.warning("预约失败，请稍后重试！");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 返回上一步
    returnLast() {
      this.$router.push("/otms/otmsAddressee");
    }
  }
};
</script>
<style lang='scss' scoped>
.w1200 {
  .process {
    font-size: 18px;
  }
  // 表单内容
  .the-form {
    width: 900px;
    margin: 60px auto 80px;
    // 表单具体子项
    .form-content {
      width: 737px;
      margin: 60px auto 72px;
      .el-form-item {
        margin-bottom: 32px;
        // 输入框标签文字
        /deep/ .el-form-item__label {
          font-size: 24px;
          color: #4a4a4a;
          padding-right: 0;
          margin-right: 19px;
        }
        // 输入框提示信息
        /deep/ .el-form-item__error {
          left: 19px;
        }
        // 输入框
        .el-input {
          font-size: 20px;
          width: 600px;
        }
        // 添加表单按钮
        .add-form {
          position: absolute;
          top: -5px;
          left: 647px;
          /deep/ span {
            font-size: 24px;
            color: #ff720b;
          }
        }
      }
      // 表单序号信息
      .form-array {
        font-size: 30px;
        color: #111111;
        margin: 39px 16px 44px;
        .require-tips {
          font-size: 16px;
          color: rgba(187, 187, 187, 1);
        }
        .remove-icon {
          position: absolute;
          margin-left: -55px;
          margin-top: 7px;
          width: 30px;
          height: 29px;
          background: url("~@/../static/img/otms/icon-trash.png") no-repeat 100%;
          cursor: pointer;
        }
      }
    }
    // 表单按钮
    .form-btn {
      margin: 72px 0 80px;
      .renturn-btn,
      .submit-btn {
        width: 240px;
        height: 56px;
        font-size: 20px;
      }
      .submit-btn {
        float: right;
        color: white;
        background: rgba(255, 114, 11, 1);
      }
    }
  }
}
// 输入框可选的标签
.popover {
  font-size: 18px;
  width: 504px;
  margin: 12px 0;
  .type {
    padding: 7px 18px;
    border: 1px solid rgba(237, 237, 237, 1);
    cursor: pointer;
    border-radius: 4px;
    margin-right: 8px;
    &:hover {
      color: white;
      background: #3a8ce2;
    }
  }
}
</style>
<style>
