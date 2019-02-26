<template>
  <div class="supply-wrapper">
    <formTabs :tab-data="tabData"></formTabs>
    <div class="yn-item-form w1200">
      <!-- 表单头部 -->
      <div class="yn-form-hd">
        <p class="title-name">广东省益农信息社验收资料</p>
        <p class="remark-text">
          <span class="asterisk">*</span>为必填项
        </p>
      </div>
      <!-- 表单内容 -->
      <div class="yn-form-bd">
        <el-form :model="declartForm" :rules="rules" ref="declartForm" size="medium" label-width="290px" class="info-custom-form">
          <div class="form-item">
            <div class="item-name green-name">挂牌建设信息</div>
            <div class="item-form">
              <el-form-item label="金属牌匾图片：" prop="metal_plaque">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="plaqueFileList"
                  :on-success="handlePlaqueSuccess"
                  :on-remove="handlePlaqueRemove"
                  :data="mendianimgs"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="门头招牌图片：" prop="doorhead_sign">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="signFileList"
                  :on-success="handleSignSuccess"
                  :on-remove="handleSignRemove"
                  :data="mendianimgs"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="主景背板图片：" prop="backplane">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="bgFileList"
                  :on-success="handleBgSuccess"
                  :on-remove="handleBgRemove"
                  :data="mendianimgs"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="室内宣传展板图片：" prop="indoor_publicity_panels">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="showFileList"
                  :on-success="handleShowSuccess"
                  :on-remove="handleShowRemove"
                  :data="mendianimgs"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="快检箱照片：" prop="electronic_screen">
                <el-upload
                  class="upload-demo"
                  action="/portal2/uploadFile"
                  :file-list="detectionBoxFileList"
                  :on-success="handleDetectionBoxSuccess"
                  :on-remove="handleDetectionBoxRemove"
                  :data="mendianimgs"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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
          <div class="foot-btn" @click="submitForm" v-if="submitBtnShow">提交验收资料</div>
          <div class="foot-btn" @click="downloadCodeImg">下载主体二维码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formTabs from '@/components/FormTabs'
import { submitSupplyForm2, getCodeImg } from '@/api/form'

export default {
  components: {
    formTabs
  },
  data() {
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
        why: '',
        metal_plaque: '',
        doorhead_sign: '',
        backplane: '',
        indoor_publicity_panels: '',
        electronic_screen: '',
        mendian_photo: ''
      },
      stateText: '',
      submitBtnShow: true,

      // 上传图片
      plaqueFileList: [],
      signFileList: [],
      bgFileList: [],
      showFileList: [],
      detectionBoxFileList: [],
      placeFileList: [],
      mendianimgs: {
        folder: 'mendianimgs'
      },
      
      // 校验规则
      rules: {
        metal_plaque: [
          { required: true, message: '请选择金属牌匾图片', trigger: 'change' }
        ],
        doorhead_sign: [
          { required: true, message: '请选择门头招牌图片', trigger: 'change' }
        ],
        backplane: [
          { required: true, message: '请选择主景背板图片', trigger: 'change' }
        ],
        indoor_publicity_panels: [
          { required: true, message: '请选择室内宣传展板图片', trigger: 'change' }
        ],
        electronic_screen: [
          { required: true, message: '请选择快检箱照片', trigger: 'change' }
        ],
        mendian_photo: [
          { required: true, message: '请选择服务场所图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.initializeData()
  },
  methods: {
    // 获取数据转换处理
    initializeData() {
      this.resetDeclartForm()
      let getStoreData = this.$store.state.clubLoginInfor
      let getSupplyStore = this.$store.state.clubSupplyData
      this.stateHand(getStoreData.shzt)
      if(getStoreData.username == getSupplyStore.username) {
        this.declartForm = Object.assign({}, this.declartForm, getSupplyStore)
      }

      // 将金属牌匾图片字符串转换为数组对象(url)
      if(this.declartForm.metal_plaque) {
        let imgArray = this.declartForm.metal_plaque.split(',')
        for(let i=0; i<imgArray.length; i++) {
          this.plaqueFileList.push({url: imgArray[i]})
        }
      }
      // 将门头招牌图片字符串转换为数组对象(url)
      if(this.declartForm.doorhead_sign) {
        let imgArray = this.declartForm.doorhead_sign.split(',')
        for(let i=0; i<imgArray.length; i++) {
          this.signFileList.push({url: imgArray[i]})
        }
      }
      // 将主景背板图片字符串转换为数组对象(url)
      if(this.declartForm.backplane) {
        let imgArray = this.declartForm.backplane.split(',')
        for(let i=0; i<imgArray.length; i++) {
          this.bgFileList.push({url: imgArray[i]})
        }
      }
      // 将室内宣传展板图片字符串转换为数组对象(url)
      if(this.declartForm.indoor_publicity_panels) {
        let imgArray = this.declartForm.indoor_publicity_panels.split(',')
        for(let i=0; i<imgArray.length; i++) {
          this.showFileList.push({url: imgArray[i]})
        }
      }
      // 将快检箱照片字符串转换为数组对象(url)
      if(this.declartForm.electronic_screen) {
        let imgArray = this.declartForm.electronic_screen.split(',')
        for(let i=0; i<imgArray.length; i++) {
          this.detectionBoxFileList.push({url: imgArray[i]})
        }
      }
      // 将服务场所图片字符串转换为数组对象(url)
      if(this.declartForm.mendian_photo) {
        let imgArray = this.declartForm.mendian_photo.split(',')
        for(let i=0; i<imgArray.length; i++) {
          this.placeFileList.push({url: imgArray[i]})
        }
      }
    },

    // 初始化数据
    resetDeclartForm() {
      this.declartForm = {
        token: '',
        username: '',
        why: '',
        metal_plaque: '',
        doorhead_sign: '',
        backplane: '',
        indoor_publicity_panels: '',
        electronic_screen: '',
        mendian_photo: ''
      }
      this.stateText = ''
      this.plaqueFileList = []
      this.signFileList = []
      this.bgFileList = []
      this.showFileList = []
      this.detectionBoxFileList = []
      this.placeFileList = []
    },

    // 判断不同状态进行不同操作
    stateHand(state) {
      // 头部导航数据
      this.tabData.state = state
      this.tabData.curIndex = 3
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
      if(state === 8 || state === 9) {
        this.submitBtnShow = false
      } else {
        this.submitBtnShow = true
      }
    },

    // 金属牌匾图片上传成功时的钩子
    handlePlaqueSuccess(response, file, fileList) {
      this.plaqueFileList = fileList
      this.plaqueImgStr(fileList)
      this.$refs.declartForm.validateField('metal_plaque')
    },
    // 金属牌匾图片移除图片时的钩子
    handlePlaqueRemove(file, fileList) {
      this.plaqueFileList = fileList
      this.plaqueImgStr(fileList)
      this.$refs.declartForm.validateField('metal_plaque')
    },

    // 门头招牌图片上传成功时的钩子
    handleSignSuccess(response, file, fileList) {
      this.signFileList = fileList
      this.signImgStr(fileList)
      this.$refs.declartForm.validateField('doorhead_sign')
    },
    // 门头招牌图片移除图片时的钩子
    handleSignRemove(file, fileList) {
      this.signFileList = fileList
      this.signImgStr(fileList)
      this.$refs.declartForm.validateField('doorhead_sign')
    },

    // 主景背板图片上传成功时的钩子
    handleBgSuccess(response, file, fileList) {
      this.bgFileList = fileList
      this.bgImgStr(fileList)
      this.$refs.declartForm.validateField('backplane')
    },
    // 主景背板图片移除图片时的钩子
    handleBgRemove(file, fileList) {
      this.bgFileList = fileList
      this.bgImgStr(fileList)
      this.$refs.declartForm.validateField('backplane')
    },

    // 室内宣传展板图片上传成功时的钩子
    handleShowSuccess(response, file, fileList) {
      this.showFileList = fileList
      this.showImgStr(fileList)
      this.$refs.declartForm.validateField('indoor_publicity_panels')
    },
    // 室内宣传展板图片移除图片时的钩子
    handleShowRemove(file, fileList) {
      this.showFileList = fileList
      this.showImgStr(fileList)
      this.$refs.declartForm.validateField('indoor_publicity_panels')
    },

    // 快检箱照片上传成功时的钩子
    handleDetectionBoxSuccess(response, file, fileList) {
      this.detectionBoxFileList = fileList
      this.detectionBoxImgStr(fileList)
      this.$refs.declartForm.validateField('electronic_screen')
    },
    // 快检箱照片移除图片时的钩子
    handleDetectionBoxRemove(file, fileList) {
      this.detectionBoxFileList = fileList
      this.detectionBoxImgStr(fileList)
      this.$refs.declartForm.validateField('electronic_screen')
    },

    // 服务场所图片上传成功时的钩子
    handlePlaceSuccess(response, file, fileList) {
      this.placeFileList = fileList
      this.placeImgStr(fileList)
      this.$refs.declartForm.validateField('mendian_photo')
    },
    // 服务场所图片移除图片时的钩子
    handlePlaceRemove(file, fileList) {
      this.placeFileList = fileList
      this.placeImgStr(fileList)
      this.$refs.declartForm.validateField('mendian_photo')
    },

    // 将金属牌匾图片数组转换为字符串
    plaqueImgStr(imgArray) {
      let plaqueImgs = []
      if(imgArray.length > 0) {
        for(let i=0; i<imgArray.length; i++) {
          plaqueImgs.push(imgArray[i].response.data)
        }
        this.declartForm.metal_plaque = plaqueImgs.join(',')
      } else {
        this.declartForm.metal_plaque = ''
      }
    },
    // 将门头招牌图片数组转换为字符串
    signImgStr(imgArray) {
      let signImgs = []
      if(imgArray.length > 0) {
        for(let i=0; i<imgArray.length; i++) {
          signImgs.push(imgArray[i].response.data)
        }
        this.declartForm.doorhead_sign = signImgs.join(',')
      } else {
        this.declartForm.doorhead_sign = ''
      }
    },
    // 将主景背板图片数组转换为字符串
    bgImgStr(imgArray) {
      let bgImgs = []
      if(imgArray.length > 0) {
        for(let i=0; i<imgArray.length; i++) {
          bgImgs.push(imgArray[i].response.data)
        }
        this.declartForm.backplane = bgImgs.join(',')
      } else {
        this.declartForm.backplane = ''
      }
    },
    // 将室内宣传展板图片转换为字符串
    showImgStr(imgArray) {
      let showImgs = []
      if(imgArray.length > 0) {
        for(let i=0; i<imgArray.length; i++) {
          showImgs.push(imgArray[i].response.data)
        }
        this.declartForm.indoor_publicity_panels = showImgs.join(',')
      } else {
        this.declartForm.indoor_publicity_panels = ''
      }
    },
    // 将快检箱照片转换为字符串
    detectionBoxImgStr(imgArray) {
      let detectionBoxImgs = []
      if(imgArray.length > 0) {
        for(let i=0; i<imgArray.length; i++) {
          detectionBoxImgs.push(imgArray[i].response.data)
        }
        this.declartForm.electronic_screen = detectionBoxImgs.join(',')
      } else {
        this.declartForm.electronic_screen = ''
      }
    },
    // 将服务场所图片转换为字符串
    placeImgStr(imgArray) {
      let placeImgs = []
      if(imgArray.length > 0) {
        for(let i=0; i<imgArray.length; i++) {
          placeImgs.push(imgArray[i].response.data)
        }
        this.declartForm.mendian_photo = placeImgs.join(',')
      } else {
        this.declartForm.mendian_photo = ''
      }
    },

    // 提交验收资料
    submitForm() {
      this.declartForm.token = JSON.parse(localStorage.getItem('clubLoginInfor')).token
      this.declartForm.username = JSON.parse(localStorage.getItem('clubLoginInfor')).username
      this.$refs.declartForm.validate(valid => {
        if(valid) {
          submitSupplyForm2(this.declartForm).then(res => {
            if(res.success) {
              let getStoreData = this.$store.state.clubLoginInfor
              getStoreData.shzt = res.data.shzt
              this.$store.commit('updateClubLogin', getStoreData)
              this.$store.commit('updateClubSupply', res.data)
              this.initializeData()
            } else {
              this.$message.error(res.message);
              if(res.data == 0) {
                setTimeout(() => {
                  this.$router.push('/form/clubLogin')
                }, 1000)
              }
            }
          })
        } else {
          console.log('提交失败');
          return false;
        }
      })
    },

    // 下载主体二维码
    downloadCodeImg() {
      window.location.href =
        this.customConfig.baseUrl + 
        '/portal2/downloadApplyEwm?token=' +
        JSON.parse(localStorage.getItem('clubLoginInfor')).token +
        '&username=' +
        JSON.parse(localStorage.getItem('clubLoginInfor')).username
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/scss/form";
</style>
