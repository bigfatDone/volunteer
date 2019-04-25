const db = require('./db.js')

function page(val,num) {
  let start = (val - 1) * num;
  let end = val * num;
  return [start,end]
}
// 帮助表发布
exports.help = (req,res)=>{
  let msg = req.body;
  let sql = 'insert into help(title,area,content,address,name,phone,date,grade) values(?,?,?,?,?,?,?,?)';
   let data = [msg.header,msg.region,msg.desc,msg.address,msg.name,msg.phone,msg.date,0];
  db.base(sql,data,(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'发布成功，等待审核！'})
  })
}

// 搜索全部请求内容
exports.helpAll = (req,res) => {
  let data = page(req.query.page,5)
  let sql = `select * from help order by id desc limit ?,?`;
  db.base(sql,data,results => {
    res.json(results)
  })
}

// 求助信息通过
exports.helpPass = (req,res)=>{
  let msg = req.query;
  console.log(msg)
  let sql = `update help set  grade='1' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'})
  })
}

// 求助信息不通过
exports.helpNoPass = (req,res)=>{
  let msg = req.query;
  console.log(msg)
  let sql = `update help set  grade='2' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'})
  })
}

// 求助信息删除
exports.helpDelete = (req,res)=>{
  let msg = req.query;
  console.log(msg)
  let sql = `delete from help where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'}) 
  })
}

// 这是发布信息修改
exports.helpModify = (req,res)=>{
  let msg = req.body;
  console.log(msg)
  let sql = `update help set  title='${msg.title}',area='${msg.area}',content='${msg.content}',mark='${msg.mark}',address='${msg.address}',name='${msg.name}',phone='${msg.phone}' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'备注成功！'})
  })
}

// 搜索已通过求助信息
exports.helpInfo = (req,res) => {
  let data = page(req.query.page,5)
  let sql =  `select * from help where grade = '1' order by id desc limit ?,? `; 
   db.base(sql,data,results => {
    res.json(results);
  })
}

// 求助信息页数
exports.helpTotal = (req,res) => {
  let total = 0;
  let sqlLength = 'select * from help where grade = 1';
 db.base(sqlLength,[],results => {
  total =  Math.ceil(results.length / 5)
   res.json({'total':total})
  })
}

