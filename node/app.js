const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const formidable = require('formidable');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(bodyParser.json());//这里一定要设置请求头才行
app.use(bodyParser.urlencoded({ extended: false }));

let multerObj = multer({ dest: './uploads/' })  // 设置文件上传目录
    app.use(multerObj.any());

app.use(express.static(['uploads/','dist']))// 设置访问uploads下的静态资源
app.use(router);
app.listen(3001,()=>{
    console.log('running....')
})
