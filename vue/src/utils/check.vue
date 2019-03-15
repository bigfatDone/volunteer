<script type="text/javascript">

//校验正数（包括小数）
const checkPositiveNum = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入内容'));
  } else {
    if((!(/^(\d|[1-9]\d+)(\.\d+)?$/.test(value)))) {
      callback(new Error('请输入正数'));
    } else {
      callback();
    }
  }
};

//校验正整数(不包括小数)
const checkPositiveInt = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入内容'));
  } else {
    if((!(/(^[1-9]\d*$)/.test(value)))) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  }
};

//校验非负整数(不包括小数)
const checkNonNegativeInt = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('请输入内容'));
  } else {
    if((!(/^\d+$/.test(value)))) {
      callback(new Error('请输入非负整数'));
    } else {
      callback(); 
    }
  }
};

// 校验密码
const checkPasswork = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'));
  } else {
    if((!(/^[\w]{6,12}$/.test(value)))) {
      callback(new Error('长度要在6-12位，只能是字母、数字和下划线'));
    } else {
      callback();
    }
  } 
}

//校验手机号码
/**
   * 正则：手机号（精确）
   * 移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198
   * 联通：130、131、132、145、155、156、175、176、185、186、166
   * 电信：133、153、173、177、180、181、189、199
   * 全球星：1349
   * 虚拟运营商：170
**/
const checkPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入手机号码'));
  } else {
    if((!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(value)))) {
      callback(new Error('手机号码格式不正确'));
    } else {
      callback();
    }
  }
};

//校验身份证号码
const checkIdCard = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入身份证号码'));
  } else {
    if((!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|x|X)$/.test(value)))) {
      callback(new Error('身份证号码格式不正确'));
    } else {
      callback();
    }
  }
};

// 表单校验---姓名
  const checkName = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("姓名不能为空"));
    } else if (/\s/.test(this.sendExpressForm.userName)) {
      callback(new Error("姓名不能输入空格"));
    } else if (
      !/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.sendExpressForm.userName)
    ) {
      callback(new Error("姓名不能为空且只能输入中文字符或英文字符"));
    } else {
      callback();
    }
  };
export default {
  checkPositiveNum,
  checkPositiveInt,
  checkNonNegativeInt,
  checkPasswork,
  checkPhone,
  checkIdCard
}
</script>