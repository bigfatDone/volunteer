/*
这里是路由模块
*/
const express = require('express');
const router = express.Router();
const server = require('./server.js')


router.post('/volunteer/login',server.login);
router.get('/volunteer/code',server.code);
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


module.exports = router;