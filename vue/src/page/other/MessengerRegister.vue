<!-- 益农信息社及信息员登记表，移动端 -->
<template>
  <div class="form">
    <div class="header">
      <p class="headerTitle">益农信息社及信息员登记表</p>
      <div class="msg">
        (
        <span class="msg-tips">*</span>为必填项)
      </div>
    </div>
    <div class="main">
      <el-form
        :model="forms"
        :rules="rules"
        size="small"
        ref="ruleForm2"
        :label-position="labelPosition"
      >
        <div class="subForm people">
          <div class="title">信息员信息</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="信息员姓名" prop="IONAME">
            <el-input v-model.trim="forms.IONAME" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="SEX">
            <el-radio-group v-model="forms.SEX">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="政治面貌" prop="POLITICAL_STATUS">
            <el-input v-model.trim="forms.POLITICAL_STATUS" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="NATIONALITY">
            <el-input v-model.trim="forms.NATIONALITY" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="PNUM">
            <el-input v-model.trim="forms.PNUM" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="EDUCATION">
            <el-radio-group v-model="forms.EDUCATION">
              <el-radio label="0">小学</el-radio>
              <el-radio label="1">初中</el-radio>
              <el-radio label="2">高中</el-radio>
              <el-radio label="3">大学及以上</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄（单选）" prop="AGE">
            <el-radio-group v-model="forms.AGE">
              <el-radio label="0">35周岁以下（含35周岁）</el-radio>
              <el-radio label="1">35-45周岁</el-radio>
              <el-radio label="2">45周岁以上（含45周岁）</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="家庭住址" prop="ADDRESS">
            <el-input v-model.trim="forms.ADDRESS" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="普通话掌握程度" prop="MANDARIN_EXP">
            <el-radio-group v-model="forms.MANDARIN_EXP">
              <el-radio label="0">熟练</el-radio>
              <el-radio label="1">一般</el-radio>
              <el-radio label="2">不熟悉</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日常主要使用语言" prop="DAILY_LANGUAGE">
            <el-input v-model.trim="forms.DAILY_LANGUAGE" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="电脑操作程度" prop="COMPUTER_EXP">
            <el-radio-group v-model="forms.COMPUTER_EXP">
              <el-radio label="0">熟悉</el-radio>
              <el-radio label="1">一般</el-radio>
              <el-radio label="2">不熟悉</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机操作程度" prop="PHONE_EXP">
            <el-radio-group v-model="forms.PHONE_EXP">
              <el-radio label="0">熟练</el-radio>
              <el-radio label="1">一般</el-radio>
              <el-radio label="2">不熟悉</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="任职单位及职务" prop="POSITION">
            <el-input v-model.trim="forms.POSITION" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="年收入（元）" prop="ANNUAL_INCOME">
            <el-input v-model.number="forms.ANNUAL_INCOME" type="number" placeholder="必填">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="涉农经验（年）" prop="AGRICULTURAL_EXP">
            <el-input v-model.number="forms.AGRICULTURAL_EXP" type="number" placeholder="必填">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
          <el-form-item label="所获荣誉及证书" prop="HONORS_AND_CERTIFICATES">
            <el-input v-model.trim="forms.HONORS_AND_CERTIFICATES" placeholder="必填"></el-input>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm baseDoc">
          <div class="title">基本资料</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item class="address" label="地址" prop="PROVINCE">
            <el-form-item>
              <el-select v-model="forms.PROVINCE">
                <el-option label="广东省" value="广东省"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="CITY">
              <el-select v-model="forms.CITY" placeholder="市" @change="init(3),getCounties()">
                <el-option
                  v-for="item in cities"
                  :key="item.xzqy_id"
                  :label="item.shi"
                  :value="item.shi"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="COUNTY">
              <el-select v-model="forms.COUNTY" placeholder="县（市、区）" @change="init(2),getTowns()">
                <el-option
                  v-for="item in counties"
                  :key="item.xzqy_id"
                  :label="item.xian"
                  :value="item.xian"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="TOWN">
              <el-select v-model="forms.TOWN" placeholder="镇（乡）" @change="init(1),getVillage()">
                <el-option
                  v-for="item in towns"
                  :key="item.xzqy_id"
                  :label="item.zhen"
                  :value="item.zhen"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="VILLAGE">
              <el-select v-model="forms.VILLAGE" placeholder="村（所在行政村）">
                <el-option
                  v-for="item in villages"
                  :key="item.xzqy_id"
                  :label="item.cun"
                  :value="item.cun"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="运营主体名称" prop="OPERATION_NAME">
            <el-input v-model.trim="forms.OPERATION_NAME" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="申报单位类别（单选）" prop="DECLAR_UNIT_TYPE">
            <el-select placeholder="请选择" v-model="forms.DECLAR_UNIT_TYPE">
              <el-option
                v-for="(item,index) in unitTypeData"
                :key="index"
                :label="item.value"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="村占地总面积（亩）" prop="VILLAGE_AREA">
            <el-input v-model.number="forms.VILLAGE_AREA" type="number" placeholder="必填">
              <template slot="append">亩</template>
            </el-input>
          </el-form-item>
          <el-form-item label="种植（养殖）面积(亩)" prop="P_OR_F_AREA">
            <el-input v-model.number="forms.P_OR_F_AREA" type="number" placeholder="必填">
              <template slot="append">亩</template>
            </el-input>
          </el-form-item>
          <el-form-item label="村总人口（人）" prop="TOL_POPULATION" placeholder="必填">
            <el-input v-model.number="forms.TOL_POPULATION" type="number" placeholder="必填">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="本村户籍人口（人）" prop="LOCAL_POPULATION">
            <el-input v-model.number="forms.LOCAL_POPULATION" type="number" placeholder="必填">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="常住人口（人）" prop="PMT_RESIDENCES">
            <el-input v-model.number="forms.PMT_RESIDENCES" type="number" placeholder="必填">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="常住人口户数（户）" prop="PMT_RESIDENCES_ACCOUNTS">
            <el-input v-model.number="forms.PMT_RESIDENCES_ACCOUNTS" type="number" placeholder="必填">
              <template slot="append">户</template>
            </el-input>
          </el-form-item>
          <el-form-item label="党员数（人）" prop="PARTY_MEMBER_NUM">
            <el-input v-model.number="forms.PARTY_MEMBER_NUM" type="number" placeholder="必填">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="涉农人口占比（%）" prop="AGRI_RELATED_POPULATION">
            <el-input v-model.number="forms.AGRI_RELATED_POPULATION" type="number" placeholder="必填">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="初中以上文化程度占比（%）" prop="AB_JHS_PROPORTION">
            <el-input v-model.number="forms.AB_JHS_PROPORTION" type="number" placeholder="必填">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="去年本村人均收入（元）" prop="AVE_INCOME_LY">
            <el-input v-model.number="forms.AVE_INCOME_LY" type="number" placeholder="必填">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="村基础设施情况（单选）" prop="VILLAGE_INFRASTRURE">
            <el-radio-group v-model.trim="forms.VILLAGE_INFRASTRURE">
              <el-radio label="0">完善</el-radio>
              <el-radio label="1">基本齐全</el-radio>
              <el-radio label="2">落后</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="场所面积（m^2）" prop="SITE_AREA">
            <el-input v-model.number="forms.SITE_AREA" type="number" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="场所归属（单选）" prop="PLACE_ATTRI">
            <el-radio-group v-model="forms.PLACE_ATTRI">
              <el-radio label="0">租用</el-radio>
              <el-radio label="1">自有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="租赁合同/产权证明（单选）" prop="LEASE_CONTRACT">
            <el-radio-group v-model="forms.LEASE_CONTRACT">
              <el-radio label="0">有</el-radio>
              <el-radio label="1">没有</el-radio>
              <el-radio label="2">无法提供</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="营业执照编号（或登记证书编号、组织机构代码）" prop="BLNUM">
            <el-input v-model.trim="forms.BLNUM" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="场地附近人流量(单选)" prop="NEARBY_PEO_TRAFFIC">
            <el-radio-group v-model="forms.NEARBY_PEO_TRAFFIC">
              <el-radio label="0">密集</el-radio>
              <el-radio label="1">一般</el-radio>
              <el-radio label="2">稀少</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="业务范围（多选）" prop="BUSINESS_SCOPE">
            <el-checkbox-group placeholder="请选择" v-model="forms.BUSINESS_SCOPE">
              <el-checkbox
                v-for="(item,index) in businessScopeTypeData"
                :key="index"
                :label="index"
                :value="index"
              >{{ item.value }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="概况描述" prop="PROFILE_DESC" class="text">
            <el-input
              v-model.trim="forms.PROFILE_DESC"
              type="textarea"
              :autosize="{ minRows: 2}"
              placeholder="必填"
              maxlength="225"
              @input="descInput(1)"
            ></el-input>
          </el-form-item>
          <div class="tips">已输入{{input[0].num}}个字符，您还可以输入{{remain[0].num}}个字符</div>

          <!-- </el-form> -->
        </div>
        <div class="subForm facilities">
          <div class="title">基础设施</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="信息员数量（人）" prop="IONUM">
            <el-input v-model.number="forms.IONUM" type="number" placeholder="必填">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="配有智能手机数量（台）" prop="TOL_SMARTPHONE">
            <el-input v-model.number="forms.TOL_SMARTPHONE" type="number" placeholder="必填">
              <template slot="append">台</template>
            </el-input>
          </el-form-item>
          <el-form-item label="配有计算机数量（台）" prop="TOL_COMPUTER">
            <el-input v-model.number="forms.TOL_COMPUTER" type="number" placeholder="必填">
              <template slot="append">台</template>
            </el-input>
          </el-form-item>
          <el-form-item label="配备打印机（单选）" prop="HAS_PRINTER">
            <el-radio-group v-model="forms.HAS_PRINTER">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="能否网络视频通话（单选）" prop="NET_VIDEO_CALL">
            <el-radio-group v-model="forms.NET_VIDEO_CALL">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电子显示屏（单选）(单选)" prop="ELECTRONIC_DISPLAYER">
            <el-radio-group v-model="forms.ELECTRONIC_DISPLAYER">
              <el-radio label="0">有，放置室内</el-radio>
              <el-radio label="1">有，放置室外</el-radio>
              <el-radio label="2">没有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="网速（M）" prop="NET_SPEED">
            <el-input v-model.number="forms.NET_SPEED" type="number" placeholder="必填">
              <template slot="append">M</template>
            </el-input>
          </el-form-item>
          <el-form-item label="wifi服务(单选)" prop="HAS_WIFI_SERVICE">
            <el-radio-group v-model="forms.HAS_WIFI_SERVICE">
              <el-radio label="0">有</el-radio>
              <el-radio label="1">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm service">
          <div class="title">服务能力</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="2017年服务村民（人次）" prop="TOL_SERVICES_LY">
            <el-input v-model.number="forms.TOL_SERVICES_LY" type="number" placeholder="必填">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <el-form-item label="服务覆盖（户）" prop="SERVICE_COVERAGE">
            <el-input v-model.number="forms.SERVICE_COVERAGE" type="number" placeholder="必填">
              <template slot="append">户</template>
            </el-input>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm situation">
          <div class="title">当地特色农产品情况</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="当地特色农产品名称" prop="SPECIALTY_NAME">
            <el-input v-model.trim="forms.SPECIALTY_NAME" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="当地种植面积（亩）" prop="SPECIALTY_PLANT_AREA">
            <el-input v-model.number="forms.SPECIALTY_PLANT_AREA" type="number" placeholder="必填">
              <template slot="append">亩</template>
            </el-input>
          </el-form-item>
          <el-form-item label="种植户数" prop="TOL_SPECIALTY_GROWERS">
            <el-input v-model.number="forms.TOL_SPECIALTY_GROWERS" type="number" placeholder="必填">
              <template slot="append">户</template>
            </el-input>
          </el-form-item>
          <el-form-item label="户均种植面积（亩）" prop="AVER_SPLANT_AREA">
            <el-input v-model.number="forms.AVER_SPLANT_AREA" type="number" placeholder="必填">
              <template slot="append">亩</template>
            </el-input>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm market">
          <div class="title">运营能力</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="是否有农产品运营经验" prop="HAS_PLANT_EXP">
            <el-radio-group v-model="forms.HAS_PLANT_EXP">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="农产品运营经验时长（年）" prop="OPERATING_TIME">
            <el-input v-model.number="forms.OPERATING_TIME" type="number" placeholder="必填">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm site">
          <div class="title">场所情况</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="可安装门头的最大尺寸（cm）" prop="DOOR_MAX_SIZE">
            <el-input v-model.trim="forms.DOOR_MAX_SIZE" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="是否有安装牌匾的空间" prop="INSTALL_PLAQUE">
            <el-radio-group v-model="forms.INSTALL_PLAQUE">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有安装形象墙的空间" prop="INSTALL_IMAGE_WALL">
            <el-radio-group v-model="forms.INSTALL_IMAGE_WALL">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否有安装制度牌的空间" prop="INSTALL_INSTITUTIONAL_CARD">
            <el-radio-group v-model="forms.INSTALL_INSTITUTIONAL_CARD">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="可放置货架的最大空间（长*宽*高，cm）" prop="MAX_ROOM">
            <el-input v-model.trim="forms.MAX_ROOM" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="是否有放置触控屏的空间" prop="EQUIP_TOUCH_SCREEN">
            <el-radio-group v-model="forms.EQUIP_TOUCH_SCREEN">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="经纬度" prop="LATITUDE_LONGITUDE">
            <el-input v-model.trim="forms.LATITUDE_LONGITUDE" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="类型判定（单选）" prop="TYPE_DETERMINATE">
            <el-radio-group v-model="forms.TYPE_DETERMINATE">
              <el-radio label="0">标准社</el-radio>
              <el-radio label="1">运营社</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm evaluate">
          <div class="title">初步评定</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item prop="INITIAL_ASSESS" class="text">
            <el-input
              placeholder="必填"
              v-model.trim="forms.INITIAL_ASSESS"
              type="textarea"
              :autosize="{ minRows: 2}"
              maxlength="225"
              @input="descInput(2)"
            ></el-input>
          </el-form-item>
          <div class="tips">已输入{{input[1].num}}个字符，您还可以输入{{remain[1].num}}个字符</div>
          <!-- </el-form> -->
        </div>
        <div class="subForm other">
          <div class="title">其他情况说明</div>
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <!-- <el-form-item prop="OTHER_CIRCUMSTANCES"> -->
          <el-form-item class="text">
            <el-input
              placeholder="选填"
              v-model.trim="forms.OTHER_CIRCUMSTANCES"
              type="textarea"
              :autosize="{ minRows: 2}"
              maxlength="225"
              @input="descInput(3)"
            ></el-input>
          </el-form-item>
          <div class="tips">已输入{{input[2].num}}个字符，您还可以输入{{remain[2].num}}个字符</div>
          <!-- </el-form> -->
        </div>

        <div class="line"></div>
        <div class="subForm investigator">
          <!-- <el-form :model="forms" :rules="rules" ref="ruleForm2"> -->
          <el-form-item label="考察人" prop="INVESTIGATOR">
            <el-input placeholder="必填" v-model.trim="forms.INVESTIGATOR"></el-input>
          </el-form-item>
          <el-form-item label="考察日期" prop="INVESTIGATE_DATE">
            <el-date-picker
              v-model.trim="forms.INVESTIGATE_DATE"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <!-- </el-form> -->
        </div>
        <div class="subForm submit">
          <!-- <el-form ref="form" id="form"> -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" :disabled="isDisabled">立即提交</el-button>

            <el-button @click="resetForm('ruleForm2')">清空</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
            <el-button @click="fillAll">填充（上线改）</el-button>
          </el-form-item>
          <!-- </el-form> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getArea, postFrom } from "@/api/base/app-form";
export default {
  data() {
    // 数字验证自定义规则
    var checkNumRange = (rule, value, callback) => {
      if (value < 0 || value > 100) {
        callback(new Error("请输入范围为0-100的数值"));
      } else {
        callback();
      }
    };
    var checkNum = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("该数值不合法,请输入正确的数值"));
      } else {
        callback();
      }
    };
    return {
      // 表单两个选择框的众多数据
      unitTypeData: [
        { value: "村委会" },
        { value: "农村党员远程教育点" },
        { value: "农技推广机构" },
        { value: "农村综合信息服务中心" },
        { value: "农村商业网点" },
        { value: "家庭农场及专业大户" },
        { value: "农民合作社" },
        { value: "涉农企业" },
        { value: "农资店及兽药饲料门市" },
        { value: "便民超市" },
        { value: "其他" }
      ],
      businessScopeTypeData: [
        { value: "政务办理" },
        { value: "信息服务" },
        { value: "农资销售" },
        { value: "农机服务" },
        { value: "涉农培训" },
        { value: "农业生产" },
        { value: "农村电商（农产品销售）" },
        { value: "农村电商（工业品销售）" },
        { value: "乡村旅游" },
        { value: "物流配送" },
        { value: "日用销售" },
        { value: "充值缴费" },
        { value: "其他" }
      ],
      // 地址级联渲染出来的数据数组
      cities: [],
      counties: [],
      towns: [],
      villages: [],
      labelPosition: "top",
      input: [{ num: "0" }, { num: "0" }, { num: "0" }],
      remain: [{ num: "225" }, { num: "225" }, { num: "225" }], //文本字数限制
      isDisabled: false,
      forms: {
        // 信息员信息每个字段，对应后台
        IONAME: "",
        SEX: "",
        POLITICAL_STATUS: "",
        NATIONALITY: "",
        PNUM: "",
        EDUCATION: "",
        AGE: "",
        ADDRESS: "",
        MANDARIN_EXP: "",
        DAILY_LANGUAGE: "",
        COMPUTER_EXP: "",
        PHONE_EXP: "",
        POSITION: "",
        ANNUAL_INCOME: "",
        AGRICULTURAL_EXP: "",
        HONORS_AND_CERTIFICATES: "",
        // 基本信息每个字段，对应后台
        PROVINCE: "广东省",
        CITY: "",
        COUNTY: "",
        TOWN: "",
        VILLAGE: "",
        OPERATION_NAME: "",
        DECLAR_UNIT_TYPE: "",
        VILLAGE_AREA: "",
        P_OR_F_AREA: "",
        TOL_POPULATION: "",
        LOCAL_POPULATION: "",
        PMT_RESIDENCES: "",
        PMT_RESIDENCES_ACCOUNTS: "",
        PARTY_MEMBER_NUM: "",
        AGRI_RELATED_POPULATION: "",
        AB_JHS_PROPORTION: "",
        AVE_INCOME_LY: "",
        VILLAGE_INFRASTRURE: "",
        SITE_AREA: "",
        PLACE_ATTRI: "",
        LEASE_CONTRACT: "",
        BLNUM: "",
        NEARBY_PEO_TRAFFIC: "",
        BUSINESS_SCOPE: [],
        PROFILE_DESC: "",
        // 基础设施每个字段，对应后台
        IONUM: "",
        TOL_SMARTPHONE: "",
        TOL_COMPUTER: "",
        HAS_PRINTER: "",
        NET_VIDEO_CALL: "",
        ELECTRONIC_DISPLAYER: "",
        NET_SPEED: "",
        HAS_WIFI_SERVICE: "",
        // 服务能力每个字段，对应后台
        TOL_SERVICES_LY: "",
        SERVICE_COVERAGE: "",
        // 当地特色农产品情况每个字段，对应后台
        SPECIALTY_NAME: "",
        SPECIALTY_PLANT_AREA: "",
        TOL_SPECIALTY_GROWERS: "",
        AVER_SPLANT_AREA: "",
        // 运营能力每个字段，对应后台
        HAS_PLANT_EXP: "",
        OPERATING_TIME: "",
        // 场所情况每个字段，对应后台
        DOOR_MAX_SIZE: "",
        INSTALL_PLAQUE: "",
        INSTALL_IMAGE_WALL: "",
        INSTALL_INSTITUTIONAL_CARD: "",
        MAX_ROOM: "",
        EQUIP_TOUCH_SCREEN: "",
        LATITUDE_LONGITUDE: "",
        TYPE_DETERMINATE: "",
        // 初步评定每个字段，对应后台
        INITIAL_ASSESS: "",
        // 其他情况说明每个字段，对应后台
        OTHER_CIRCUMSTANCES: "",
        // 考察人和考察日期每个字段，对应后台
        INVESTIGATOR: "",
        INVESTIGATE_DATE: ""
      },
      rules: {
        // 信息员信息的验证
        IONAME: [
          { required: true, message: "请输入信息员姓名", trigger: "blur" }
        ],
        SEX: [{ required: true, message: "请选择性别", trigger: "change" }],
        POLITICAL_STATUS: [
          { required: true, message: "请输入政治面貌", trigger: "blur" }
        ],
        NATIONALITY: [
          { required: true, message: "请输入民族", trigger: "blur" }
        ],
        PNUM: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        EDUCATION: [
          { required: true, message: "请选择学历", trigger: "change" }
        ],
        AGE: [{ required: true, message: "请选择年龄", trigger: "change" }],
        ADDRESS: [
          { required: true, message: "请输入家庭住址", trigger: "blur" }
        ],
        MANDARIN_EXP: [
          { required: true, message: "请选择普通话掌握程度", trigger: "change" }
        ],
        DAILY_LANGUAGE: [
          { required: true, message: "请输入日常使用语言", trigger: "blur" }
        ],
        COMPUTER_EXP: [
          { required: true, message: "请选择电脑操作程度", trigger: "change" }
        ],
        PHONE_EXP: [
          { required: true, message: "请选择手机操作程度", trigger: "change" }
        ],
        POSITION: [
          { required: true, message: "请输入任职单位及职务", trigger: "blur" }
        ],
        ANNUAL_INCOME: [
          { required: true, message: "请输入年收入", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        AGRICULTURAL_EXP: [
          { required: true, message: "请输入涉农经历", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        HONORS_AND_CERTIFICATES: [
          { required: true, message: "请输入所获荣誉及证书", trigger: "blur" }
        ],

        // 基本资料的验证
        PROVINCE: [{ required: true, message: "请选择省", trigger: "change" }],
        CITY: [{ required: true, message: "请选择市", trigger: "change" }],
        COUNTY: [
          { required: true, message: "请选择县（市、区）", trigger: "change" }
        ],
        TOWN: [
          { required: true, message: "请选择镇（乡）", trigger: "change" }
        ],
        VILLAGE: [
          {
            required: true,
            message: "请选择村（所在行政村）",
            trigger: "change"
          }
        ],
        OPERATION_NAME: [
          { required: true, message: "请输入运营主体名称", trigger: "blur" }
        ],
        DECLAR_UNIT_TYPE: [
          {
            required: true,
            message: "请选择申报单位类别（单选）",
            trigger: "change"
          }
        ],
        VILLAGE_AREA: [
          {
            required: true,
            message: "请输入村占地总面积（亩）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        P_OR_F_AREA: [
          {
            required: true,
            message: "请输入种植（养殖）面积（亩）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        TOL_POPULATION: [
          { required: true, message: "请输入村总人口（人）", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        LOCAL_POPULATION: [
          {
            required: true,
            message: "请输入本村户籍人口（人）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        PMT_RESIDENCES: [
          { required: true, message: "请输入常住人口（人）", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        PMT_RESIDENCES_ACCOUNTS: [
          {
            required: true,
            message: "请输入常住人口户数（户）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        PARTY_MEMBER_NUM: [
          { required: true, message: "请输入党员数（人）", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        AGRI_RELATED_POPULATION: [
          {
            required: true,
            message: "请输入涉农人口占比（%）",
            trigger: "blur"
          },
          {
            validator: checkNumRange,
            trigger: "blur"
          }
        ],
        AB_JHS_PROPORTION: [
          {
            required: true,
            message: "请输入初中以上文化程度占比（%）",
            trigger: "blur"
          },
          {
            validator: checkNumRange,
            trigger: "blur"
          }
        ],
        AVE_INCOME_LY: [
          {
            required: true,
            message: "请输入去年本村人均收入(元）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        VILLAGE_INFRASTRURE: [
          { required: true, message: "请选择村基础设施情况", trigger: "change" }
        ],
        SITE_AREA: [
          { required: true, message: "请输入场所面积（㎡）", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        PLACE_ATTRI: [
          { required: true, message: "请选择场所归属", trigger: "change" }
        ],
        LEASE_CONTRACT: [
          {
            required: true,
            message: "请选择租赁合同/产权证明",
            trigger: "change"
          }
        ],
        BLNUM: [
          {
            required: true,
            message: "请输入营业执照编号（或登记证书编号、组织机构代码）",
            trigger: "blur"
          }
        ],
        NEARBY_PEO_TRAFFIC: [
          { required: true, message: "请选择场地附近人流量", trigger: "change" }
        ],
        BUSINESS_SCOPE: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个业务范围",
            trigger: "blur"
          }
        ],
        PROFILE_DESC: [
          { required: true, message: "请输入概况描述", trigger: "blur" }
        ],

        // 基础设施验证
        IONUM: [
          {
            required: true,
            message: "请输入信息员数量（人）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        TOL_SMARTPHONE: [
          {
            required: true,
            message: "请输入配有智能手机数量（台）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        TOL_COMPUTER: [
          {
            required: true,
            message: "请输入配有计算机数量（台）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        HAS_PRINTER: [
          {
            required: true,
            message: "请选择场配备打印机（单选）",
            trigger: "change"
          }
        ],
        NET_VIDEO_CALL: [
          {
            required: true,
            message: "请选择能否网络视频通话（单选）",
            trigger: "change"
          }
        ],
        ELECTRONIC_DISPLAYER: [
          {
            required: true,
            message: "请选择电子显示屏（单选）",
            trigger: "change"
          }
        ],
        NET_SPEED: [
          { required: true, message: "请输入网速（M）", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        HAS_WIFI_SERVICE: [
          {
            required: true,
            message: "请选择场wifi服务(单选)",
            trigger: "change"
          }
        ],

        // 服务能力验证
        TOL_SERVICES_LY: [
          {
            required: true,
            message: "请输入2017年服务村民（人次）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        SERVICE_COVERAGE: [
          { required: true, message: "请输入服务覆盖（户）", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],

        // 当地特色农产品情况验证
        SPECIALTY_NAME: [
          {
            required: true,
            message: "请输入当地特色农场品名称",
            trigger: "blur"
          }
        ],
        SPECIALTY_PLANT_AREA: [
          {
            required: true,
            message: "请输入当地种植面积（亩）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],
        TOL_SPECIALTY_GROWERS: [
          { required: true, message: "请输入种植户数", trigger: "blur" },
          {
            validator: checkNum,
            trigger: "blur"
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入整数",
            trigger: "blur"
          }
        ],
        AVER_SPLANT_AREA: [
          {
            required: true,
            message: "请输入户均种植面积（亩）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],

        // 运营能力验证
        HAS_PLANT_EXP: [
          {
            required: true,
            message: "请输入是否有农产品运营经验",
            trigger: "blur"
          }
        ],
        OPERATING_TIME: [
          {
            required: true,
            message: "请输入农产品运营经验时长（年）",
            trigger: "blur"
          },
          {
            validator: checkNum,
            trigger: "blur"
          }
        ],

        // 场所情况验证
        DOOR_MAX_SIZE: [
          {
            required: true,
            message: "请输入可安装门头的最大尺寸",
            trigger: "blur"
          }
        ],
        INSTALL_PLAQUE: [
          {
            required: true,
            message: "请输入是否有安装牌匾的空间",
            trigger: "blur"
          }
        ],
        INSTALL_IMAGE_WALL: [
          {
            required: true,
            message: "请输入是否有安装形象墙的空间",
            trigger: "blur"
          }
        ],
        INSTALL_INSTITUTIONAL_CARD: [
          {
            required: true,
            message: "请输入是否有安装制度牌的空间",
            trigger: "blur"
          }
        ],
        MAX_ROOM: [
          {
            required: true,
            message: "请输入可放置货架的最大空间（长*宽*高）",
            trigger: "blur"
          }
        ],
        EQUIP_TOUCH_SCREEN: [
          {
            required: true,
            message: "请输入是否有放置触控屏的空间",
            trigger: "blur"
          }
        ],
        LATITUDE_LONGITUDE: [
          { required: true, message: "请输入经纬度", trigger: "blur" }
        ],
        TYPE_DETERMINATE: [
          {
            required: true,
            message: "请输入类型判定（单选）",
            trigger: "change"
          }
        ],

        // 初步评定验证
        INITIAL_ASSESS: [
          { required: true, message: "请输入初步评定", trigger: "blur" }
        ],

        // 其他情况说明验证
        // OTHER_CIRCUMSTANCES: [
        //   { required: true, message: "请输入其他情况说明", trigger: "blur" }
        // ],

        // 考察人验证
        INVESTIGATOR: [
          { required: true, message: "请输入考察人", trigger: "blur" }
        ],
        INVESTIGATE_DATE: [
          { required: true, message: "请输入考察日期", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.isDisabled = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$message({
          //   message: "表单正在提交，请稍等"
          // });
          let ret = "";
          for (let it in this.forms) {
            ret +=
              encodeURIComponent(it) +
              "=" +
              encodeURIComponent(this.forms[it]) +
              "&";
          }
          postFrom(ret)
            .then(res => {
              if (res.success) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.isDisabled = false;
              } else {
                this.$message({
                  message: "提交失败！服务器异常",
                  type: "warning"
                });
                this.isDisabled = false;
              }
            })
            .catch(err => {
              this.$message({
                message: "提交失败！请重试",
                type: "warning"
              });
              this.isDisabled = false;
            });
        } else {
          // submitMes.close();
          console.log("error submit!!");
          this.$message({
            message: "提交失败！表单信息有误",
            type: "warning"
          });
          this.isDisabled = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    fillAll() {
      if (Math.random() > 0.5) {
        this.forms.IONAME = "马云";
        this.forms.PNUM = 13318031415;
        this.forms.BUSINESS_SCOPE = [1];
        this.forms.PROVINCE = "广东省";
        this.forms.CITY = "广州市";
        this.forms.COUNTY = "荔湾区";
        this.forms.TOWN = "沙面街道";
        this.forms.VILLAGE = "翠洲社区居民委员会";
        this.forms.IONAME = this.forms.IONAME ? this.forms.IONAME + 1 : 1;
        this.forms.INVESTIGATOR = this.forms.INVESTIGATOR
          ? this.forms.INVESTIGATOR + 1
          : 1;
        this.forms.INITIAL_ASSESS = "测试一，基本为0";
        this.forms.INVESTIGATE_DATE = "2018-1-10";
        for (var i in this.forms) {
          if (!this.forms[i]) this.forms[i] = "0";
        }
      } else {
        this.forms.IONAME = "马化腾";
        this.forms.PNUM = 13318031415;
        this.forms.BUSINESS_SCOPE = [1];
        this.forms.PROVINCE = "广东省";
        this.forms.CITY = "广州市";
        this.forms.COUNTY = "荔湾区";
        this.forms.TOWN = "沙面街道";
        this.forms.VILLAGE = "翠洲社区居民委员会";
        this.forms.IONAME = this.forms.IONAME ? this.forms.IONAME + 1 : 1;
        this.forms.INVESTIGATOR = this.forms.INVESTIGATOR
          ? this.forms.INVESTIGATOR + 1
          : 1;
        this.forms.INITIAL_ASSESS = "测试二，基本为1";
        this.forms.INVESTIGATE_DATE = "2018-1-10";
        for (var i in this.forms) {
          if (!this.forms[i]) this.forms[i] = "1";
        }
      }
    },
    // 地址的级联 重新初始化
    init(num) {
      switch (num) {
        case 1:
          this.forms.VILLAGE = "";
          this.villages = [];
          break;
        case 2:
          this.forms.VILLAGE = "";
          this.villages = [];
          this.forms.TOWN = "";
          this.towns = [];
          break;
        case 3:
          this.forms.VILLAGE = "";
          this.villages = [];
          this.forms.TOWN = "";
          this.towns = [];
          this.forms.COUNTY = "";
          this.counties = [];
          break;
      }
    },
    // 地址的级联 首先得到市级数据
    getCities() {
      getArea({
        pid: 64195
      }).then(res => {
        if (res.success) {
          this.cities = res.resultList;
          this.getCounties();
        }
      });
    },
    // 地址的级联 得到县级数据
    getCounties() {
      if (this.forms.CITY) {
        let id,
          list = this.cities.slice();
        for (let i = 0; i < list.length; i++) {
          if (list[i].shi == this.forms.CITY) {
            id = list[i].xzqy_id;
          }
        }
        getArea({
          pid: id
        }).then(res => {
          if (res.success) {
            this.counties = res.resultList;
            this.getTowns();
          }
        });
      }
    },
    // 地址的级联 得到镇级数据
    getTowns() {
      if (this.forms.CITY && this.forms.COUNTY) {
        let id,
          list = this.counties.slice();
        for (let i = 0; i < list.length; i++) {
          if (list[i].xian == this.forms.COUNTY) {
            id = list[i].xzqy_id;
          }
        }
        getArea({
          pid: id
        }).then(res => {
          if (res.success) {
            this.towns = res.resultList;
            this.getVillage();
          }
        });
      }
    },
    // 地址的级联 得到村级数据
    getVillage() {
      if (this.forms.CITY && this.forms.COUNTY && this.forms.TOWN) {
        let id,
          list = this.towns.slice();
        for (let i = 0; i < list.length; i++) {
          if (list[i].zhen == this.forms.TOWN) {
            id = list[i].xzqy_id;
          }
        }
        getArea({
          pid: id
        }).then(res => {
          if (res.success) {
            this.villages = res.resultList;
          }
        });
      }
    },
    //文本域字数限制
    descInput(num) {
      switch (num) {
        case 1:
          this.input[0].num = this.forms.PROFILE_DESC.length;
          this.remain[0].num = 225 - this.input[0].num;
          break;
        case 2:
          this.input[1].num = this.forms.INITIAL_ASSESS.length;
          this.remain[1].num = 225 - this.input[1].num;
          break;
        case 3:
          this.input[2].num = this.forms.OTHER_CIRCUMSTANCES.length;
          this.remain[2].num = 225 - this.input[2].num;
          break;
      }
    }
  },
  mounted() {
    this.getCities();
  }
};
</script>

<style lang='scss' scoped>
.header {
  text-align: center;
  .headerTitle {
    font-size: 1.5rem;
    font-weight: bolder;
    margin: 1rem;
  }
  .msg {
    font-size: 1rem;
    margin-top: 0.3rem;
    .msg-tips {
      color: red;
    }
  }
}
.main {
  .subForm {
    .title {
      font-size: 1.2rem;
      color: white;
      padding: 0.5rem 2rem;
      margin-top: 2rem;
      background: $base-color;
    }
    .el-form-item {
      margin: 2rem 2rem;
      .el-radio {
        margin: 0.5rem;
        min-width: 50%;
        max-width: 100%;
      }
      .el-select {
        margin: 0.5rem 0.5rem 0.5rem auto;
        width: 100%;
      }
      .el-checkbox {
        margin: 0.5rem;
      }
    }
    .address {
      margin-bottom: -2rem;
      .el-form-item {
        width: 100%;
        margin-top: -0.8rem;
        margin-left: -0.1rem;
      }
    }
    .text {
      margin-bottom: 0 !important;
    }
  }
  .tips {
    margin: 0 32px;
    font-size: 12px;
    color: #c0c4cc;
    text-align: right;
    // border: 1px solid #dcdfe6;
    // border-top-width: 0;
  }
  .line {
    height: 0.05rem;
    margin: 3rem 0 2rem;
    background-color: #ccc;
  }
  .submit {
    margin: 3rem 0.8rem;
    text-align: center;

    .el-button--primary {
      background-color: $base-color !important;
    }
  }
}
</style>