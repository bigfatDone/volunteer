/*
这里是路由模块
*/
const express = require('express');
const router = express.Router();
const login = require('./login.js')
const userCheck = require('./userCheck.js')
const help = require('./help.js')
const news = require('./news.js')
const personage = require('./personage.js')
const project = require('./project.js')
const common = require('./common.js')

// 志愿者与社区注册登录
router.post('/volunteer/login',login.login);// 登录
router.get('/volunteer/code',login.code);// 验证码
router.get('/volunteer/repeatName',login.repeatName);// 重复用户名
router.get('/volunteer/repeatCard',login.repeatCard);// 重复身份证
router.post('/volunteer/volunteerRegister',login.volunteerRegister);// 志愿者注册
router.get('/volunteer/repeatCoding',login.repeatCoding);// 重复社区编码
router.post('/volunteer/communityRegister',login.communityRegister);// 社区注册
router.get('/volunteer/updateUser',login.updateUser);// 获取用户信息
router.post('/volunteer/volunteerModify',login.volunteerModify);// 修改志愿者信息
router.post('/volunteer/communityModify',login.communityModify);// 修改社区信息

/* 管理员 */
router.post('/volunteer/adminLogin',login.adminLogin);// 管理员登录
router.get('/volunteer/volunteerCheck',userCheck.volunteerCheck);// 志愿者审核登录
router.get('/volunteer/volunteerPass',userCheck.volunteerPass);// 志愿者审核通过
router.get('/volunteer/volunteerNoPass',userCheck.volunteerNoPass);// 志愿者审核不通过
router.get('/volunteer/volunteerDelete',userCheck.volunteerDelete);// 志愿者删除
router.get('/volunteer/communityCheck',userCheck.communityCheck);// 社区审核登录
router.get('/volunteer/communityPass',userCheck.communityPass);// 社区审核通过
router.get('/volunteer/communityNoPass',userCheck.communityNoPass);// 志愿者审核不通过
router.get('/volunteer/communityDelete',userCheck.communityDelete);// 社区删除
router.get('/volunteer/adminAll',userCheck.adminAll);// 获取全部管理员信息
router.get('/volunteer/adminAllDelete',userCheck.adminAllDelete);// 删除管理员
router.post('/volunteer/adminAdd',userCheck.adminAdd);// 管理员添加


// 求助表
router.post('/volunteer/help',help.help);// 求助表提交
router.get('/volunteer/helpAll',help.helpAll);// 求助表搜索全部
router.get('/volunteer/helpPass',help.helpPass);// 求助表审核通过
router.get('/volunteer/helpNoPass',help.helpNoPass);// 求助表审核不通过
router.get('/volunteer/helpDelete',help.helpDelete);// 求助表删除
router.post('/volunteer/helpModify',help.helpModify);// 求助表修改
router.get('/volunteer/helpInfo',help.helpInfo);// 搜索已通过求助表（分页）
router.get('/volunteer/helpTotal',help.helpTotal);// 搜索已通过求助表total

// 志愿快讯表
router.post('/volunteer/news',news.news);// 志愿快讯提交
router.get('/volunteer/newsAll',news.newsAll);// 获取志愿快讯
router.post('/volunteer/newsModify',news.newsModify);// 求助表修改
router.get('/volunteer/newsDelete',news.newsDelete);// 求助表删除

// 志愿人物表
router.post('/volunteer/personage',personage.personage);// 志愿人物提交
router.get('/volunteer/personageAll',personage.personageAll);// 获取志愿人物快讯
router.post('/volunteer/personageModify',personage.personageModify);// 志愿人物修改
router.get('/volunteer/personageDelete',personage.personageDelete);// 志愿人物删除
router.get('/volunteer/personageOne',personage.personageOne);// 志愿者风采
router.get('/volunteer/personageTwo',personage.personageTwo);// 志愿者风采
router.get('/volunteer/personageThree',personage.personageThree);// 志愿者风采

// 志愿项目
router.post('/volunteer/project',project.project);// 志愿项目提交
router.get('/volunteer/projectAll',project.projectAll);// 志愿项目搜索全部
router.get('/volunteer/projectPass',project.projectPass);// 志愿项目审核通过
router.get('/volunteer/projectNoPass',project.projectNoPass);// 志愿项目不审核通过
router.get('/volunteer/projectDelete',project.projectDelete);// 志愿项目删除
router.post('/volunteer/projectModify',project.projectModify);// 志愿项目修改
router.post('/volunteer/projectPublish',project.projectPublish);// 志愿项目提交
router.get('/volunteer/projectPage',project.projectPage);// 审核通过志愿项目
router.get('/volunteer/projectDetail',project.projectDetail);// 志愿项目详情
router.get('/volunteer/communityProject',project.communityProject);// 社区人员发布志愿项目状态
router.post('/volunteer/entry',project.entry);// 志愿者报名志愿项目
router.get('/volunteer/hadEntry',project.hadEntry);// 判断志愿者报名志愿项目
router.get('/volunteer/volunteerProject',project.volunteerProject);// 志愿者参加志愿项目状态
router.get('/volunteer/auditAll',project.auditAll);// 获取志愿项目审核
router.get('/volunteer/auditPass',project.auditPass);// 志愿项目审核通过
router.get('/volunteer/auditNoPass',project.auditNoPass);// 志愿项目审核不通过
router.get('/volunteer/search',project.search);// 模糊查询志愿项目



// 公共数据查询
router.get('/volunteer/detail',common.detail);// 获取志愿快讯
router.get('/volunteer/personageDetail',common.personageDetail);// 获取志愿人物
router.get('/volunteer/getNews',common.getNews);// 获取志愿新闻
router.get('/volunteer/getProjectAside',common.getProjectAside);// 获取志愿项目
router.get('/volunteer/getPower',common.getPower);// 获取志愿项目
router.get('/volunteer/registerRate',common.registerRate);// 获取比例
router.get('/volunteer/getPersonageAside',common.getPersonageAside);// 获取首页志愿项目

// 图片上传
router.post('/files',common.fileData);// 上传图片

module.exports = router;