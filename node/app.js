const express = require('express');
const app = express();
const router = require('./router.js');
const bodyParser = require('body-parser');
const formidable = require('formidable');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(bodyParser.json());//这里一定要设置请求头才行
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.listen(3001,()=>{
    console.log('running....')
})
