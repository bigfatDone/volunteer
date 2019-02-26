<template>
  <div class="page-modu">
    <!-- <nav-menu></nav-menu> -->
    <div class="authentic-modu">
      <div class="title-modu">
        <p>粤农优品认证</p>
        <p class="sub-title">
          <span>*</span>
          为必填项
        </p>
      </div>
      <div class="form-modu">
        <div class="form-cont">
          <el-form
            ref="form"
            :model="authenticForm"
            :rules="rules"
            size="small"
            label-width="85px"
            class="custom-form"
          >
            <el-form-item label="商品分类" prop="oneType">
              <el-select @change="initType(1)" v-model="authenticForm.oneType" placeholder="请选择类型">
                <el-option
                  v-for="item in classList"
                  :key="item.DICTIONARIES_ID"
                  :label="item.NAME"
                  :value="item.DICTIONARIES_ID"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="twoType">
              <el-select
                @change="initType(2)"
                @focus="getTwotypeOptions"
                v-model="authenticForm.twoType"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in subclassList"
                  :key="item.dictionaries_id"
                  :label="item.name"
                  :value="item.dictionaries_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品品牌" prop="goodsBrand">
              <el-input v-model="authenticForm.goodsBrand" placeholder="请输入商品品牌"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="city">
              <el-select
                @change="init(1)"
                v-model="authenticForm.city"
                size="small"
                placeholder="市"
              >
                <el-option
                  v-for="item in cities"
                  :key="item.xzqy_id"
                  :label="item.shi"
                  :value="item.xzqy_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="county" class="adress-height">
              <el-select
                @change="init(2)"
                @focus="getCounties"
                v-model="authenticForm.county"
                size="small"
                placeholder="县/区"
              >
                <el-option
                  v-for="item in counties"
                  :key="item.xzqy_id"
                  :label="item.xian"
                  :value="item.xzqy_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="street" class="adress-height">
              <el-select
                @change="init(3)"
                @focus="getStreets"
                v-model="authenticForm.street"
                size="small"
                placeholder="镇/街道"
              >
                <el-option
                  v-for="item in streets"
                  :key="item.xzqy_id"
                  :label="item.zhen"
                  :value="item.xzqy_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="community" class="adress-height">
              <el-select
                @change="init(4)"
                size="small"
                @focus="getCommunities"
                v-model="authenticForm.community"
                placeholder="村/居委会"
              >
                <el-option
                  v-for="item in communities"
                  :key="item.xzqy_id"
                  :label="item.cun"
                  :value="item.xzqy_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="农户" prop="name">
              <el-select
                @focus="getFarmerOptions"
                v-model="authenticForm.name"
                placeholder="请选择农户"
                @change="getFarmerMsg"
              >
                <el-option
                  v-for="item in farmerList"
                  :key="item.NHXXBSON_ID"
                  :label="item.NAME"
                  :value="item.NHXXBSON_ID"
                ></el-option>
              </el-select>
              <div class="item-infor" v-show="farmerMsgShow">
                <ul>
                  <li class="item-li">姓名：{{farmerMsg.NAME}}</li>
                  <li class="item-li">手机号：{{farmerMsg.PHONE}}</li>
                  <li class="item-li">地址：{{farmerMsg.WHOLENAME}}</li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="采摘时间" prop="pickDate">
              <el-date-picker
                class="dateBox"
                value-format="yyyy-MM-dd"
                v-model="authenticForm.pickDate"
                type="date"
                placeholder="请选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="所需标签" prop="labelNum">
              <el-input
                v-model="authenticForm.labelNum"
                min="1"
                type="number"
                oninput="if(value<0)value=0"
                placeholder="请输入个数"
              >
                <template slot="append">
                  <span>个</span>
                </template>
              </el-input>
              <div class="tooltip">检测合格的商品，可申请成为粤农优品贴上粤农优品的标签出售</div>
            </el-form-item>
            <el-form-item label="检测类别" prop="testType">
              <el-select
                @focus="getLevelOptions"
                @change="getLevelMsg"
                v-model="authenticForm.testType"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in LevelList"
                  :key="item.DETECT_CATEGORY_ID"
                  :label="item.TYPE"
                  :value="item.DETECT_CATEGORY_ID"
                ></el-option>
              </el-select>
              <div class="item-infor" v-show="checkMsgShow">
                <ul>
                  <li
                    class="item-li"
                    v-for="(item,index) in checkMsgList"
                    :key="index"
                  >检测项目 {{index+1}}：{{checkMsgList[index]}}</li>
                </ul>
              </div>
              <div class="tooltip">下单成功后，益农社会尽快与您联系确认检测时间</div>
            </el-form-item>
            <el-form-item label="预约时间" prop="makeDate">
              <el-date-picker
                class="dateBox"
                value-format="yyyy-MM-dd"
                v-model="authenticForm.makeDate"
                type="date"
                placeholder="请选择日期"
                :picker-options="reserveOptions"
              ></el-date-picker>
              <div class="tooltip">下单成功后，益农社会尽快与您联系确认检测时间</div>
            </el-form-item>
            <el-form-item label="益农社" v-show="ynsMsgShow">
              <div class="label-value">{{ynsMsg.YNSNAME}}</div>
              <div class="item-infor">
                <ul>
                  <li class="item-li">具体地址：{{ynsMsg.YNSAddress}}</li>
                  <li class="item-li">联系电话：{{ynsMsg.YNSPhone}}</li>
                </ul>
              </div>
            </el-form-item>
            <el-form-item label="基础服务费" class="mini-item">
              <div class="itme-right">¥{{moneyServe}}</div>
            </el-form-item>
            <el-form-item label="认证标签费" class="mini-item">
              <div class="itme-right">¥{{authenticForm.labelNum*1}}</div>
            </el-form-item>
            <el-form-item label="总计" class="mini-item">
              <div class="itme-right red-color">¥{{moneyServe+authenticForm.labelNum*1}}</div>
            </el-form-item>
            <el-form-item>
              <div class="foot-btn" @click="toPay('form')">去支付</div>
            </el-form-item>
          </el-form>
          <div class="explain-modu">
            <dl>
              <dt>说明：</dt>
              <dd>1、如您提交给益农社检测的样品检测结果为“不合格”系统将自动退回认证标签费至您的个人账户</dd>
              <dd>2、基础服务费包括操作检测费、检测试剂费用等</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getGoodsFirst,
  getGoodsSecond,
  getTestType,
  getAddress,
  getYnsMsg,
  getFarmerInfo,
  getTypeMsg,
  submitInfo
} from "@/api/old/goodAuthentic";
export default {
  data() {
    return {
      classList: [], //商品一级分类列表
      subclassList: [], //商品二级分类列表
      LevelList: [], //商品检测类别列表
      checkMsgList: [], //商品检测类别详细信息列表
      cities: [], //市列表
      counties: [], //县、区列表
      streets: [], //镇、街道列表
      communities: [], //村、居委会列表
      farmerList: [], //农户列表
      farmerMsg: [], //农户详细信息列表
      ynsMsg: [], //益农社详细信息列表
      orderData: '', //订单号
      levelName: '', //检测类别名称
      moneyServe: 0, //基础服务费
      totalPrice: 0, //总费用
      farmerMsgShow: false, //显示农户详细信息
      checkMsgShow: false, //显示检测类别详细信息
      ynsMsgShow: false, //显示益农社详细信息
      wechatData: '',
      authenticForm: {
        oneType: '', //商品一级具体分类
        twoType: '', //商品二级具体分类
        goodsBrand: '', //商品品牌
        city: '', //具体市
        county: '', //具体县、区
        street: '', //具体镇、街道
        community: '', //具体村、居委会
        name: '', //具体农户姓名
        pickDate: '', //采摘日期
        labelNum: 0, //所需标签个数，默认0
        testType: '', //具体检测类别
        makeDate: '' //预约时间
      },
      // 采摘时间在今天之前
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      // 预约时间在今天之后
      reserveOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        oneType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        twoType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        goodsBrand: [
          { required: true, message: "请输入商品品牌", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"}
        ],
        city: [
          { required: true, message: "请选择市", trigger: "change" }
        ],
        county: [
          { required: true, message: "请选择县/区", trigger: "change" }
        ],
        street: [
          { required: true, message: "请选择镇/街道", trigger: "change" }
        ],
        community: [
          { required: true, message: "请选择村/居委会", trigger: "change" }
        ],
        name: [
          { required: true, message: "请选择农户", trigger: "change" }
        ],
        pickDate: [
          { type: "string", required: true, message: "请选择日期", trigger: "change" }
        ],
        labelNum: [
          { required: true, message: "请输入个数", trigger: "change" }
        ],
        testType: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        makeDate: [
          { type: "string", required: true, message: "请选择日期", trigger: "change" }
        ]
      }
    }
  },
  mounted() {
    //页面刚加载进来获取商品一级分类和行政区域内所有市的内容选项列表
    this.getTypeOptions()
    this.getOptions()
    this.wechatData = this.$store.state.entrustData
  },
  methods: {
    //确认支付判断是否符合规则并且返回数据
    toPay(formName) {
      //  this.rules.goodsBrand[0].required = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.authenticForm.twoType) {
            let level;
            let list = this.LevelList.slice()
            for (let i = 0; i < list.length; i++) {
              if (list[i].DETECT_CATEGORY_ID == this.authenticForm.testType) {
                level = list[i].TYPE
              }
            }
            submitInfo({
              token: this.wechatData.token,
              ENTRUSTXXB_ID: this.wechatData.wxId,
              DICTIONARIES_ID: this.authenticForm.twoType,
              GOODS_BRAND: this.authenticForm.goodsBrand,
              XZQY_ID: this.authenticForm.community,
              NHXXBSON_ID: this.authenticForm.name,
              PICK_TIME: this.authenticForm.pickDate,
              TAG_NUMBER: this.authenticForm.labelNum,
              DETECT_CATEGORY_ID: this.authenticForm.testType,
              APPOINTMENT_TIME: this.authenticForm.makeDate,
              YNSXXB_ID: this.ynsMsg.YNSXXB_ID
              //BASIC_FEE: this.moneyServe,
              //CERTIFICATION_FEE: this.authenticForm.labelNum * 1,
              //TOTAL_FEE: this.moneyServe + this.authenticForm.labelNum * 1
            }).then(res => {
              if (res.success) {
                this.orderData =  res.returnMap.ENTRUST_ORDER_ID
                this.totalPrice = res.returnMap.TOTAL_FEE
                this.$router.push({
                  name: "payment",
                  query: {
                    //pay: this.moneyServe + this.authenticForm.labelNum * 1,
                    pay: this.totalPrice,
                    orderData: this.orderData,
                    appointTime: this.authenticForm.makeDate,
                    typeLevel: level
                  }
                })
              }
            })
          }
        } else {
          if(!this.authenticForm.oneType) {
            this.$message({
              message: '请选择商品分类',
              type: 'warning'
            });
          } else if(!this.authenticForm.twoType) {
            this.$message({
              message: '请选择二级分类',
              type: 'warning'
            });
          } else if(!this.authenticForm.goodsBrand) {
            this.$message({
              message: '请选择商品品牌',
              type: 'warning'
            });
          } else if(!this.authenticForm.city) {
            this.$message({
              message: '请选择市',
              type: 'warning'
            });
          } else if(!this.authenticForm.county) {
            this.$message({
              message: '请选择区/县',
              type: 'warning'
            });
          } else if(!this.authenticForm.street) {
            this.$message({
              message: '请选择镇/街道',
              type: 'warning'
            });
          } else if(!this.authenticForm.community) {
            this.$message({
              message: '请选择村/居委会',
              type: 'warning'
            });
          } else if(!this.authenticForm.name) {
            this.$message({
              message: '请选择农户',
              type: 'warning'
            });
          } else if(!this.authenticForm.pickDate) {
            this.$message({
              message: '请选择采摘时间',
              type: 'warning'
            });
          }  else if(!this.authenticForm.labelNum) {
            this.$message({
              message: '请填写标签',
              type: 'warning'
            });
          }  else if(!this.authenticForm.testType) {
            this.$message({
              message: '请选择类型',
              type: 'warning'
            });
          }  else if(!this.authenticForm.makeDate) {
            this.$message({
              message: '请选择预约时间',
              type: 'warning'
            });
          }
          return false
        }
      });
    },

    // 获取商品一级分类内容选项列表
    getTypeOptions() {
      getGoodsFirst().then(res => {
        if (res.success) {
          this.classList = res.resultList
          this.getTwotypeOptions()
        }
      });
    },

    // 根据一级分类id获取商品二级分类内容选项列表
    getTwotypeOptions() {
      if (this.authenticForm.oneType) {
        let id
        let list = this.classList.slice()
        for (let i = 0; i < list.length; i++) {
          if (list[i].DICTIONARIES_ID == this.authenticForm.oneType) {
            id = list[i].DICTIONARIES_ID
          }
        }
        getGoodsSecond({
          dictionaries_id: id
        }).then(res => {
          if (res.success) {
            this.subclassList = res.resultList
            this.getLevelOptions()
          }
        });
      } else {
        this.subclassList = []
        this.authenticForm.twoType = ""
      }
    },

    // 根据二级分类id获取商品检测类别选项列表
    getLevelOptions() {
      if (this.authenticForm.twoType) {
        let id
        let list = this.subclassList.slice()
        for (let i = 0; i < list.length; i++) {
          if (list[i].dictionaries_id == this.authenticForm.twoType) {
            id = list[i].dictionaries_id
          }
        }
        getTestType({
          token: this.wechatData.token,
          entrustxxb_id: this.wechatData.wxId,
          dictionaries_id: id
        }).then(res => {
          if (res.success) {
            this.LevelList = res.resultList
            for (let i = 0; i < this.LevelList.length; i++) {
              if (this.LevelList[i].TYPE == 1) {
                this.LevelList[i].TYPE = "A级"
              } else if (this.LevelList[i].TYPE == 2) {
                this.LevelList[i].TYPE = "B级"
              } else {
                this.LevelList[i].TYPE = "C级"
              }
            }
          }
        });
      } else {
        this.LevelList = []
        this.authenticForm.testType = ""
      }
    },

    // 获取行政区域内所有市选项列表
    getOptions() {
      getAddress({
        pid: 64195
      }).then(res => {
        if (res.success) {
          this.cities = res.resultList
          this.getCounties()
        }
      });
    },

    // 根据市id获取所有县、区选项列表
    getCounties() {
      if (this.authenticForm.city) {
        let id
        let list = this.cities.slice()
        for (let i = 0; i < list.length; i++) {
          if (list[i].xzqy_id == this.authenticForm.city) {
            id = list[i].xzqy_id
          }
        }
        getAddress({
          pid: id
        }).then(res => {
          if (res.success) {
            this.counties = res.resultList
            this.getStreets()
          }
        });
      } else {
        this.counties = []
        this.authenticForm.county = ""
      }
    },

    // 根据县、区id获取所有镇、街道选项列表
    getStreets() {
      if (this.authenticForm.city && this.authenticForm.county) {
        let id
        let list = this.counties.slice()
        for (let i = 0; i < list.length; i++) {
          if (list[i].xzqy_id == this.authenticForm.county) {
            id = list[i].xzqy_id
          }
        }
        getAddress({
          pid: id
        }).then(res => {
          if (res.success) {
            this.streets = res.resultList
            this.getCommunities()
          }
        });
      } else {
        this.streets = []
        this.authenticForm.street = ""
      }
    },

    // 根据镇、街道id获取所有村、居委会选项列表
    getCommunities() {
      if (
        this.authenticForm.city &&
        this.authenticForm.county &&
        this.authenticForm.street
      ) {
        let id
        let list = this.streets.slice()
        for (let i = 0; i < list.length; i++) {
          if (list[i].xzqy_id == this.authenticForm.street) {
            id = list[i].xzqy_id
          }
        }
        getAddress({
          pid: id
        }).then(res => {
          if (res.success) {
            this.communities = res.resultList
            this.getFarmerOptions()
          }
        });
      } else {
        this.authenticForm.community = ""
        this.communities = []
      }
    },

    // 根据地区Id查找益农社Id及益农社下的所有农户Id和姓名还有行政区域Id
    getFarmerOptions() {
      if (
        this.authenticForm.city &&
        this.authenticForm.county &&
        this.authenticForm.street &&
        this.authenticForm.community
      ) {
        let id
        let list = this.communities.slice()
        for (let i = 0; i < list.length; i++) {
          if (list[i].xzqy_id == this.authenticForm.community) {
            id = list[i].xzqy_id
          }
        }
        getYnsMsg({
          token: this.wechatData.token,
          entrustxxb_id: this.wechatData.wxId,
          xzqy_id: id
        }).then(res => {
          if (res.success) {
            this.farmerList = res.resultList
            this.ynsMsg = res.data.YNSID
          }
        });
      }
    },

    // 根据农户id获取该农户的详细信息
    getFarmerMsg(value) {
      getFarmerInfo({
        token: this.wechatData.token,
        entrustxxb_id: this.wechatData.wxId,
        nhxxbson_id: value
      }).then(res => {
        if (res.success) {
          this.farmerMsg = res.returnMap
          this.farmerMsgShow = true
        }
      });
    },

    // 根据类型id获取该检测类别的详细信息
    getLevelMsg(value) {
      getTypeMsg({
        token: this.wechatData.token,
        entrustxxb_id: this.wechatData.wxId,
        detect_category_id: value
      }).then(res => {
        if (res.success) {
          this.checkMsgList = res.resultList
          this.moneyServe = res.data
          this.checkMsgShow = true
        }
      });
    },

    //商品一级分类重新选择二级分类清空，二级分类重新选择检测类别以及详细信息清空
    initType(num) {
      switch (num) {
        case 1:
          this.authenticForm.twoType = ""
          this.subclassList = []
          this.authenticForm.testType = ""
          this.LevelList = []
          break
        case 2:
          this.authenticForm.testType = ""
          this.LevelList = []
          this.checkMsgList = []
          break
      }
    },

    //市重新选择县、区清空，县、区重新选择镇、街道清空，镇、街道重新选择村、居委会清空，村、居委会重新选择农户以及详细信息清空
    init(num) {
      switch (num) {
        case 1:
          this.authenticForm.community = ""
          this.communities = []
          this.streets = []
          this.authenticForm.street = ""
          this.counties = []
          this.authenticForm.county = ""
          this.authenticForm.name = ""
          this.farmerList = []
          this.farmerMsg = {}
          this.ynsMsg = {}
          break
        case 2:
          this.authenticForm.community = ""
          this.communities = []
          this.streets = []
          this.authenticForm.street = ""
          this.authenticForm.name = ""
          this.farmerList = []
          this.farmerMsg = {}
          this.ynsMsg = {}
          break
        case 3:
          this.authenticForm.community = ""
          this.communities = []
          this.authenticForm.name = ""
          this.farmerList = []
          this.farmerMsg = {}
          this.ynsMsg = {}
          break
        case 4:
          this.authenticForm.name = ""
          this.farmerList = []
          this.farmerMsg = {}
          this.ynsMsg = {}
          this.ynsMsgShow = true
      }
    }
  },
  computed: {
    getData() {
      return this.$store.state.entrustData
    }
  },
  watch: {
    getData() {
      this.wechatData = this.$store.state.entrustData
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/old-form";
</style>
