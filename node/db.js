const mysql =require('mysql');

exports.base=(sql,data,callback)=>{

	//创建数据库
let connection = mysql.createConnection({
	host:'120.79.197.63',
	user:'root',
	password:'123456',
	database:'volunteer'

});
//连接数据库
connection.connect();
//执行语句
connection.query(sql,data, function (error, results, fields) {//语句简化了的
  if (error){ throw new Error();}
   callback(results);
});
connection.end();

}