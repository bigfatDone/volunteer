/*
这里是路由模块
*/
const express = require('express');
const router = express.Router();
const login = require('./login.js')
const userCheck = require('./userCheck.js')

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
/* router.get('/allBooks',server.allBooks);
router.get('/login',server.login);
router.post('/register',server.register);
router.get('/myhome',server.myhome);
router.get('/search',server.search);
router.post('/add',server.add);
router.get('/choose',server.choose);
router.post('/update',server.updata);
router.get('/delete',server.delete);
router.get('/updataMsg',server.updataMsg);
router.post('/submitMsg',server.submitMsg);
router.post('/androidLogin',server.androidLogin);
router.post('/androidShow',server.androidShow);
 */
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




module.exports = router;