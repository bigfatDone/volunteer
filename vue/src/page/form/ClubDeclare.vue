<template>
  <div class="declare-wrapper">
    <formTabs :tab-data="tabData"></formTabs>
    <div class="yn-item-form w1200">
      <!-- 表单头部 -->
      <div class="yn-form-hd">
        <p class="title-name">广东省益农信息社申报资料</p>
        <p class="remark-text">
          <span class="asterisk">*</span>为必填项
        </p>
      </div>
      <!-- 表单内容 -->
      <div class="yn-form-bd">
        <el-form :model="declartForm" :rules="rules" ref="declartForm" size="medium" label-width="290px" class="info-custom-form">
          <div class="form-item">
            <div class="item-name green-name">基本资料</div>
            <div class="item-form">
              <el-form-item label="申报单位名称：" prop="sbdwmc">
                <el-input v-model.trim="declartForm.sbdwmc" placeholder="请输入申报单位名称"></el-input>
              </el-form-item>
              <el-form-item label="申报单位类别（单选）：" prop="sbdwtype">
                <div class="class-list">
                  <div class="list-name">A类</div>
                  <div class="list-cont">
                    <el-radio-group v-model="declartForm.sbdwtype" @change="companyTypeChange(declartForm.sbdwtype, 1)">
                      <el-radio
                        v-for="item in companyTypeList"
                        :key="item.value"
                        :label="item.label"
                        v-show="item.type === 1"
                        class="adapt-radio">
                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="class-list last-list">
                  <div class="list-name">B类</div>
                  <div class="list-cont">
                    <el-radio-group v-model="declartForm.sbdwtype" @change="companyTypeChange(declartForm.sbdwtype, 2)">
                      <el-radio
                        v-for="item in companyTypeList"
                        :key="item.value"
                        :label="item.label"
                        v-show="item.type === 2"
                        class="adapt-radio">
                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="具体地址：" required>
                <div class="clearfix">
                  <el-form-item label-width="0" class="fourth-select" prop="city">
                    <el-select v-model="declartForm.city" placeholder="请选择市" @change="cityChange">
                      <el-option
                        v-for="item in cityList"
                        :key="item.xzqy_id"
                        :label="item.shi"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label-width="0" class="fourth-select" prop="district">
                    <el-select v-model="declartForm.district" placeholder="请选择区(县)" @change="areaChange">
                      <el-option
                        v-for="item in areaList"
                        :key="item.xzqy_id"
                        :label="item.xian"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label-width="0" class="fourth-select" prop="zhen">
                    <el-select v-model="declartForm.zhen" placeholder="请选择街道(镇)" @change="countyChange">
                      <el-option
                        v-for="item in countryList"
                        :key="item.xzqy_id"
                        :label="item.zhen"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label-width="0" class="fourth-select" prop="cun">
                    <el-select v-model="declartForm.cun" placeholder="请选择村(居)">
                      <el-option
                        v-for="item in villageList"
                        :key="item.xzqy_id"
                        :label="item.cun"
                        :value="item.xzqy_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item label-width="0" prop="address">
                  <el-input v-model="declartForm.address" placeholder="请输入详细地址"></el-input>
                </el-form-item>
                <el-form-item label-width="0" class="item-last-input" prop="points">
                  <el-input v-model.trim="declartForm.points" :disabled="true">
                    <el-button slot="prepend" @click="mapClick" class="map-btn">地图定位</el-button>
                  </el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item class="changeStyle" label="开户行：">
                <el-row :gutter="20" class="layout-row-list">
                  <el-col :span="12">
                    <el-select v-model="declartForm.listBank" placeholder="请选择开户行" @change="bankChange">
                      <el-option
                        v-for="item in bankList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-input v-model.trim="declartForm.otherBank" placeholder="请输入银行名称" v-if="otherBankShow"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="银行卡号：">
                <el-input v-model.trim="declartForm.bankcard" placeholder="请输入银行卡号"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：">
                <el-input v-model.trim="declartForm.idcard" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
              <el-form-item label="场所面积：" prop="sell_area">
                <el-input v-model.trim="declartForm.sell_area" placeholder="请输入场所面积">
                  <template slot="append">m²</template>
                </el-input>
              </el-form-item>
              <el-form-item label="服务场所图片：" prop="mendian_photo">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="placeFileList"
                  :on-success="handlePlaceSuccess"
                  :on-remove="handlePlaceRemove"
                  :data="mendianimgs"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="营业执照：" prop="businesslicense">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="licenseFileList"
                  :on-success="handleLicenseSuccess"
                  :on-remove="handleLicenseRemove"
                  :data="businesslicense"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="业务范围（多选）：" prop="business">
                <el-checkbox-group v-model="declartForm.business" @change="businessChange">
                  <el-checkbox
                    v-for="item in businessList"
                    :key="item.id"
                    :label="item.name" 
                    name="business"
                    class="third-checkbox">
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="概况描述：">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model.trim="declartForm.bz"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form-item">
            <div class="item-name orange-name">基本设施</div>
            <div class="item-form">
              <el-form-item label="信息员数量：" prop="persioncount">
                <el-input v-model.trim="declartForm.persioncount" placeholder="请输入数量"></el-input>
              </el-form-item>
              <el-form-item label="配备计算机数量：" required>
                <el-form-item label-width="0" class="third-item" prop="pccount">
                  <el-input v-model.trim="declartForm.pccount" placeholder="请输入数量"></el-input>
                </el-form-item>
                <el-form-item label="能否视频通话：" label-width="140px" class="third-item" prop="ifshipin">
                  <el-radio-group v-model="declartForm.ifshipin">
                    <el-radio :label="1">能</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="配备打印机：" label-width="130px" class="third-item" prop="ifprinter">
                  <el-radio-group v-model="declartForm.ifprinter">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
              <el-form-item label="配备智能手机数量：" prop="phonecount">
                <el-input v-model="declartForm.phonecount" placeholder="请输入数量"></el-input>
              </el-form-item>
              <el-form-item label="电子显示屏：">
                <el-radio-group v-model="declartForm.screen">
                  <el-radio :label="1">有，放置户外</el-radio>
                  <el-radio :label="2">有，放置室内</el-radio>
                  <el-radio :label="3">无</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="网速：" required>
                <el-form-item label-width="0" class="second-item" prop="netspeed">
                  <el-select v-model="declartForm.netspeed" placeholder="请选择网络速度">
                    <el-option
                      v-for="item in speedList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="110px" label="WIFI服务：" class="second-item" prop="wifi">
                  <el-radio-group v-model="declartForm.wifi">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
              <!-- <el-form-item label="村镇编号：" prop="applycode">
                <el-input v-model.trim="declartForm.applycode" placeholder="请输入001-999之间的数字"></el-input>
              </el-form-item> -->
            </div>
          </div>
          <div class="form-item">
            <div class="item-name blue-name">服务能力</div>
            <div class="item-form">
              <el-form-item label="本村村民数：" prop="servicenumber">
                <el-input v-model="declartForm.servicenumber" placeholder="请输入人数">
                  <template slot="append">人次</template>
                </el-input>
              </el-form-item>
              <el-form-item label="服务覆盖：" prop="housenum">
                <el-input v-model="declartForm.housenum" placeholder="请输入数量">
                  <template slot="append">户</template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <div class="result-item">
            <ul class="clearfix">
              <li class="result-list">
                当前登记表状态：
                <span class="list-value">{{stateText}}</span>
              </li>
              <li class="result-list">
                审核失败原因：
                <span class="list-value">{{declartForm.why}}</span>
              </li>
            </ul>
          </div>
        </el-form>
      </div>
      <!-- 表单底部 -->
      <div class="yn-form-ft">
        <div class="foot-content">
          <div class="foot-btn" @click="storageForm" v-if="storageBtnShow">保存，暂不提交县农业局</div>
          <div class="foot-btn" @click="submitForm" v-if="submitBtnShow">提交县农业局，完成申报</div>
          <div class="foot-btn" @click="supplyForm" v-if="supplyBtnShow">提交补充资料</div>
        </div>
      </div>

      <!-- 地图对话框 -->
      <el-dialog title="拾取坐标" :visible.sync="mapDialog" width="580px" class="yn-dialog">
        <div>
          <div class="points-item">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input v-model="dialogForm.lng" size="mini" :disabled="true"></el-input>
              </el-col>
              <el-col :span="12">
                <el-input v-model="dialogForm.lat" size="mini" :disabled="true"></el-input>
              </el-col>
            </el-row>
          </div>
          <positionMap 
            :center="[this.declartForm.jd, this.declartForm.wd]"
            :width="mapWidth"
            :height="mapHeight"
            @position="positionHandle">
          </positionMap>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="mapDialog = false">取 消</el-button>
          <el-button type="primary" @click="getPoints">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import formTabs from '@/components/FormTabs'
import positionMap from '@/page/map/PositionMap'
import { getArea } from '@/api/index'
import { storageDeclartForm, submitDeclartForm, submitSupplyForm } from '@/api/form'

export default {
  components: {
    formTabs,
    positionMap
  },
  data() {
    // 自定义校验规则
    const checkCode = (rule, value, callback) => {
      if(value < 1 || value > 999) {
        callback(new Error('请输入001-999之间数字'));
      } else {
        callback();
      }
    }

    return {
      // 头部导航数据
      tabData: {
        state: '',
        curIndex: ''
      },

      // 表单数据
      declartForm: {
        token: '',
        username: '',
        sbdwmc: '',
        sbdwtype: '',
        lns_type: '',
        province: '',
        city: '',
        district: '',
        zhen: '',
        cun: '',
        xzqy_id: '',
        address: '',
        points: '',   // 经纬度
        jd: '113.2555',
        wd: '23.129684',
        bank: '',
        listBank: '',   // 已有银行名称
        otherBank: '',  // 自己填写银行名称
        bankcard: '',
        idcard: '',
        sell_area: '',
        mendian_photo: '',
        businesslicense: '',
        servicescope: '',
        business: [],   // 业务范围数组
        bz: '',
        persioncount: '',
        pccount: '',
        ifshipin: '',
        ifprinter: '',
        phonecount: '',
        screen: '',
        netspeed: '',
        wifi: '',
        applycode: '',
        servicenumber: '',
        housenum: '',
        shzt: '',
        why: ''
      },
      otherBankShow: false,
      stateText: '',
      storageBtnShow: true,
      submitBtnShow: true,
      supplyBtnShow: false,

      // 下拉列表 
      companyTypeList: [
        { type: 1, value: 1, label: '村委会' },
        { type: 1, value: 2, label: '农村党员干部现代远程教育站点' },
        { type: 1, value: 3, label: '农技推广机构' },
        { type: 1, value: 4, label: '农村综合信息服务中心' },
        { type: 1, value: 5, label: '其他主要承载政府公益服务职能的益农信息社' },
        { type: 2, value: 6, label: '家庭农场' },
        { type: 2, value: 7, label: '专业大户' },
        { type: 2, value: 8, label: '农民专业合作社' },
        { type: 2, value: 9, label: '农业产业化龙头企业' },
        { type: 2, value: 10, label: '新型农业经营（服务）主体' },
        { type: 2, value: 11, label: '便民超市、农资店、兽药饲料门市、通讯代办服务点等各类农村商业网点' },
        { type: 2, value: 12, label: '其他以市场信息服务为主的益农信息社' }
      ],
      cityList: [],
      areaList: [],
      countryList: [],
      villageList: [],
      bankList: [
        { id: 1, name: "招商银行" },
        { id: 2, name: "中国农业银行" },
        { id: 3, name: "中国建设银行" },
        { id: 4, name: "中国邮政储蓄银行" },
        { id: 5, name: "交通银行" },
        { id: 999, name: "其它银行" }
      ],
      businessList: [
        { id: 1, name: '政务办理' },
        { id: 2, name: '信息服务' },
        { id: 3, name: '农技服务' },
        { id: 4, name: '农资销售' },
        { id: 5, name: '农机服务' },
        { id: 6, name: '涉农培训' },
        { id: 7, name: '农业生产' },
        { id: 8, name: '农村电商（农产品销售）' },
        { id: 9, name: '农村电商（工业品销售）' },
        { id: 10, name: '乡村旅游' },
        { id: 11, name: '物流配送' },
        { id: 12, name: '日用品销售' },
        { id: 13, name: '充值缴费' },
        { id: 14, name: '其他' }
      ],
      speedList: [
        { id: 1, name: '4-10M(含4M)' },
        { id: 2, name: '10-20M(含10M)' },
        { id: 3, name: '20-50M(含20M)' },
        { id: 4, name: '50-100M(含50M)' },
        { id: 5, name: '100M以上(含100M)' }
      ],

      // 上传图片
      placeFileList: [],
      licenseFileList: [],
      mendianimgs: {
        folder: 'mendianimgs'
      },
      businesslicense: {
        folder: 'businesslicense'
      },

      // 校验规则
      rules: {
        sbdwmc: [
          { required: true, message: '请输入申报单位名称', trigger: 'blur' }
        ],
        sbdwtype: [
          { required: true, message: '请选择申报单位类别', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        district: [
          { required: true, message: '请选择区(县)', trigger: 'change' }
        ],
        zhen: [
          { required: true, message: '请选择街道(镇)', trigger: 'change' }
        ],
        cun: [
          { required: true, message: '请选择村(居)', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        points: [
          { required: true, message: '请选择地图定位', trigger: 'change' }
        ],
        sell_area: [
          { required: true, validator: this.checkRule.checkPositiveNum, trigger: 'blur' }
        ],
        mendian_photo: [
          { required: true, message: '请选择服务场所图片', trigger: 'change' }
        ],
        businesslicense: [
          { required: true, message: '请选择营业执照', trigger: 'change' }
        ],
        business: [
          { type: 'array', required: true, message: '请至少选择一个业务范围', trigger: 'change' }
        ],
        persioncount: [
          { required: true, validator: this.checkRule.checkNonNegativeInt, trigger: 'blur' }
        ],
        pccount: [
          { required: true, validator: this.checkRule.checkNonNegativeInt, trigger: 'blur' }
        ],
        ifshipin: [
          { required: true, message: '请选择能否视频通话', trigger: 'change' }
        ],
        ifprinter: [
          { required: true, message: '请选择能否配备打印机', trigger: 'change' }
        ],
        phonecount: [
          { required: true, validator: this.checkRule.checkNonNegativeInt, trigger: 'blur' }
        ],
        netspeed: [
          { required: true, message: '请选择网络速度', trigger: 'change' }
        ],
        wifi: [
          { required: true, message: '请选择是否有wifi', trigger: 'change' }
        ],
        applycode: [
          { required: true, validator: this.checkRule.checkNonNegativeInt, trigger: 'blur' },
          { required: true, validator: checkCode, trigger: 'blur' }
        ],
        servicenumber: [
          { required: true, validator: this.checkRule.checkNonNegativeInt, trigger: 'blur' }
        ],
        housenum: [
          { required: true, validator: this.checkRule.checkNonNegativeInt, trigger: 'blur' }
        ]
      },

      // 地图对话框
      mapDialog: false,
      mapWidth: 540,
      mapHeight: 360,
      dialogForm: {
        lng: '',
        lat: ''
      }

    }
  },
  mounted() {
    this.screenType()
    this.initializeData()
  },
  methods: {
    // 获取数据转换处理
    initializeData() {
      this.resetDeclartForm()
      let getStoreData = this.$store.state.clubLoginInfor
      this.stateHand(getStoreData.shzt)
      this.declartForm = Object.assign({}, this.declartForm, getStoreData)
      this.getAllList()
      // 判断是否有经纬度：如果没有，则给默认值
      if(!this.declartForm.jd || !this.declartForm.wd) {
        this.declartForm.jd = '113.2555'
        this.declartForm.wd = '23.129684'
      }

      // 如果非首次登陆注册、未有表单数据：进行数据转换
      if(getStoreData.shzt >= 0) {
        // 地址转换
        if(this.declartForm.city) {
          this.declartForm.city = parseInt(this.declartForm.city)
          this.getAreaList(this.declartForm.city)
        }
        if(this.declartForm.district) {
          this.declartForm.district = parseInt(this.declartForm.district)
          this.getCountyList(this.declartForm.district)
        }
        if(this.declartForm.zhen) {
          this.declartForm.zhen = parseInt(this.declartForm.zhen)
          this.getVillageList(this.declartForm.zhen)
        }
        if(this.declartForm.cun) {
          this.declartForm.cun = parseInt(this.declartForm.cun)
        }
        if(this.declartForm.jd && this.declartForm.wd) {
          this.declartForm.points = this.declartForm.jd + ' , ' + this.declartForm.wd
        }
        // 开户行处理
        if(this.declartForm.bank) {
          let isArray = this.bankList.some(item => {
            if(item.name == this.declartForm.bank) {
              return true
            }
          })
          if(isArray) {
            this.declartForm.listBank = this.declartForm.bank
            this.otherBankShow = false
            this.declartForm.otherBank = ''
          } else {
            this.declartForm.listBank = '其它银行'
            this.otherBankShow = true
            this.declartForm.otherBank = this.declartForm.bank
          }
        }
        // 业务范围字符串转换为数组
        if(this.declartForm.servicescope) {
          this.declartForm.business = this.declartForm.servicescope.split(',')
        }
        // 将服务场所图片字符串转换为数组对象(url)
        if(this.declartForm.mendian_photo) {
          let placeArr = this.declartForm.mendian_photo.split(',')
          for(let i=0; i<placeArr.length; i++) {
            this.placeFileList.push({url: placeArr[i]})
          }
        }
        // 将营业执照字符串转换为数组对象(url)
        if(this.declartForm.businesslicense) {
          let licenseArr = this.declartForm.businesslicense.split(',')
          for(let i=0; i<licenseArr.length; i++) {
            this.licenseFileList.push({url: licenseArr[i]})
          }
        }
      } 
    },

    // 初始化数据
    resetDeclartForm() {
      this.declartForm = {
        token: '',
        username: '',
        sbdwmc: '',
        sbdwtype: '',
        lns_type: '',
        province: '',
        city: '',
        district: '',
        zhen: '',
        cun: '',
        xzqy_id: '',
        address: '',
        points: '',   // 经纬度
        jd: '',
        wd: '',
        bank: '',
        listBank: '',   // 已有银行名称
        otherBank: '',  // 自己填写银行名称
        bankcard: '',
        idcard: '',
        sell_area: '',
        mendian_photo: '',
        businesslicense: '',
        servicescope: '',
        business: [],   // 业务范围数组
        bz: '',
        persioncount: '',
        pccount: '',
        ifshipin: '',
        ifprinter: '',
        phonecount: '',
        screen: '',
        netspeed: '',
        wifi: '',
        applycode: '',
        servicenumber: '',
        housenum: '',
        shzt: '',
        why: ''
      }
      this.otherBankShow = false
      this.stateText = ''
      // 列表清空
      this.cityList = []
      this.areaList = []
      this.countryList = []
      this.villageList = []
      this.placeFileList = []
      this.licenseFileList = []
      //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      if (this.$refs.declartForm !== undefined) {
        this.$refs.declartForm.resetFields();
      }
    },

    // 判断不同状态进行不同操作
    stateHand(state) {
      // 头部导航数据
      this.tabData.state = state
      this.tabData.curIndex = 2
      // 根据不同状态显示不同文字
      if(state === -1) this.stateText = '未保存'
      if(state === 0) this.stateText = '保存未提交'
      if(state === 1) this.stateText = '已提交县农业局审核'
      if(state === 2) this.stateText = '县农业局审核未通过'
      if(state === 4) this.stateText = '已提交市农业局认定'
      if(state === 5) this.stateText = '市农业局认定未通过'
      if(state === 6) this.stateText = '省农业厅打回'
      if(state === 3) this.stateText = '已提交省农业厅,等待验收资料'
      if(state === 7) this.stateText = '等待线下建设及上传建设完成照片'
      if(state === 8) this.stateText = '等待益农控股审核'
      if(state === 9) this.stateText = '已注册为益农社'
      if(state === 10) this.stateText = '最终审核未通过'
      // 根据不同状态显示不同按钮
      if(state === 1 || state === 4 || state >= 7) {
        this.storageBtnShow = false
        this.submitBtnShow = false
        this.supplyBtnShow = false
      } else if(state === 3) {
        this.storageBtnShow = false
        this.submitBtnShow = false
        this.supplyBtnShow = true
      } else {
        this.storageBtnShow = true
        this.submitBtnShow = true
        this.supplyBtnShow = false
      }
    },

    // 获取所有下拉列表接口
    getAllList() {
      this.getSityList(64195)
    },

    // 判断登陆端是pc还是手机
    screenType() {
      let sUserAgent = navigator.userAgent.toLowerCase();
      let bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
      let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"; 
      let bIsMidp = sUserAgent.match(/midp/i) == "midp"; 
      let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"; 
      let bIsAndroid = sUserAgent.match(/android/i) == "android"; 
      let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        this.mapWidth = window.screen.width - 40
      }
    },

    // 选择申报单位类别 
    companyTypeChange(value, num) {
      this.declartForm.lns_type = num
    },

    // 选择银行
    bankChange(value) {
      if(value == '其它银行') {
        this.otherBankShow = true
        this.declartForm.bank = this.declartForm.otherBank
      } else {
        this.otherBankShow = false
        this.declartForm.bank = this.declartForm.listBank
        this.declartForm.otherBank = ''
      }
    },

    // 业务范围选择
    businessChange(value) {
      this.declartForm.servicescope = value.join(',')
    },

    // 根据省id获取市列表
    getSityList(provinceId) {
      getArea({ pid: provinceId }).then(res => {
        if(res.success) {
          this.cityList = res.resultList
        }
      })
    },

    // 选择市
    cityChange(value) {
      this.resetAreaData()
      this.getAreaList(value)
    },
    // 根据市id获取区列表
    getAreaList(cityId) {
      getArea({ pid: cityId }).then(res => {
        if(res.success) {
          this.areaList = res.resultList
        }
      })
    },
    // 清空市以下的区域列表和字段
    resetAreaData() {
      this.areaList = []
      this.countryList = []
      this.villageList = []
      this.declartForm.district = ''
      this.declartForm.zhen = ''
      this.declartForm.cun = ''
    },

    // 选择区
    areaChange(value) {
      this.resetCountyData()
      this.getCountyList(value)
    },
    // 根据区id获取乡列表
    getCountyList(areaId) {
      getArea({ pid: areaId }).then(res => {
        if(res.success) {
          this.countryList = res.resultList
        }
      })
    },
    // 清空区以下的区域列表和字段
    resetCountyData() {
      this.countryList = []
      this.villageList = []
      this.declartForm.zhen = ''
      this.declartForm.cun = ''
    },

    // 选择乡
    countyChange(value) {
      this.resetVillageData()
      this.getVillageList(value)
    },
    // 根据乡id获取村列表
    getVillageList(countyId) {
      getArea({ pid: countyId }).then(res => {
        if(res.success) {
          this.villageList = res.resultList
        }
      })
    },
    // 清空乡以下的区域列表和字段
    resetVillageData() {
      this.villageList = []
      this.declartForm.cun = ''
    },

    // 点击地图定位按钮
    mapClick() {
      this.dialogForm.lng = this.declartForm.jd
      this.dialogForm.lat = this.declartForm.wd
      this.mapDialog = true
    },
    // 选取坐标
    positionHandle(data) {
      this.dialogForm.lng = data.lng
      this.dialogForm.lat = data.lat
    },
    // 确定选取坐标
    getPoints() {
      this.declartForm.jd = this.dialogForm.lng
      this.declartForm.wd = this.dialogForm.lat
      this.declartForm.points = this.declartForm.jd + ' , ' + this.declartForm.wd
      this.mapDialog = false
    },

    // 服务场所图片上传成功时的钩子
    handlePlaceSuccess(response, file, fileList) {
      this.placeFileList = fileList
      this.placeImgStr()
      this.$refs.declartForm.validateField('mendian_photo')
    },
    // 服务场所图片移除图片时的钩子
    handlePlaceRemove(file, fileList) {
      this.placeFileList = fileList
      this.placeImgStr()
      this.$refs.declartForm.validateField('mendian_photo')
    },

    // 营业执照上传成功时的钩子
    handleLicenseSuccess(response, file, fileList) {
      this.licenseFileList = fileList
      this.licenseImgStr()
      this.$refs.declartForm.validateField('businesslicense')
    },
    // 营业执照移除图片时的钩子
    handleLicenseRemove(file, fileList) {
      this.licenseFileList = fileList
      this.licenseImgStr()
      this.$refs.declartForm.validateField('businesslicense')
    },

    // 将服务场所图片数组转换为字符串
    placeImgStr() {
      let placeImgs = []
      if(this.placeFileList.length > 0) {
        for(let i=0; i<this.placeFileList.length; i++) {
          placeImgs.push(this.placeFileList[i].response.data)
        }
        this.declartForm.mendian_photo = placeImgs.join(',')
      } else {
        this.declartForm.mendian_photo = ''
      }
    },
    // 将营业执照数组转换为字符串
    licenseImgStr() {
      let licenseImgs = []
      if(this.licenseFileList.length > 0) {
        for(let j=0; j<this.licenseFileList.length; j++) {
          licenseImgs.push(this.licenseFileList[j].response.data)
        }
        this.declartForm.businesslicense = licenseImgs.join(',')
      } else {
        this.declartForm.businesslicense = ''
      }
    },

    // 表单数据处理
    handlePostForm() {
      // 开户行处理
      if(this.declartForm.otherBank !== '') {
        this.declartForm.bank = this.declartForm.otherBank
      } else {
        this.declartForm.bank = this.declartForm.listBank
      }
      // 字段赋值
      this.declartForm.xzqy_id = this.declartForm.cun
      this.declartForm.sell_area = parseInt(this.declartForm.sell_area)
      // 删除自定义字段
      delete this.declartForm.points
      delete this.declartForm.listBank
      delete this.declartForm.otherBank
      delete this.declartForm.business
    },

    // 保存数据
    storageForm() {
      this.handlePostForm()
      storageDeclartForm(this.declartForm).then(res => {
        if(res.success) {
          this.$store.commit('updateClubLogin', res.data)
          this.$message({
            message: '保存数据成功',
            type: 'success'
          })
          this.initializeData()
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 提交申报
    submitForm() {
      this.$refs.declartForm.validate(valid => {
        if(valid) {
          this.handlePostForm()
          submitDeclartForm(this.declartForm).then(res => {
            if(res.success) {
              this.$store.commit('updateClubLogin', res.data)
              this.$message({
                message: '提交申报成功',
                type: 'success'
              });
              this.initializeData()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('提交失败')
          return false
        }
      })
    },

    // 提交补充资料
    supplyForm() {
      this.$refs.declartForm.validate(valid => {
        if(valid) {
          this.handlePostForm()
          submitSupplyForm(this.declartForm).then(res => {
            if(res.success) {
              this.$store.commit('updateClubLogin', res.data)
              this.$message({
                message: '提交补充资料成功',
                type: 'success'
              })
              this.$router.push('/form/supplyForm')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('提交失败')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/form";
.changeStyle {
  .layout-row-list {
    margin-left: 0 !important;
    .el-col-12 {
      padding-left: 0 !important;
    }
  }
}
</style>

<style lang="scss">
@import "../../style/scss/club-declare";
</style>
