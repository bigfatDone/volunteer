const db = require('./db.js')

function page(val,num) {
  let start = (val - 1) * num;
  let end = val * num;
  return [start,end]
}

// 志愿快讯发布
exports.personage = (req,res)=>{
  let msg = req.body; 
  let sql = 'insert into personage(title,type,content,date) values(?,?,?,?)';
   let data = [msg.title,msg.type,msg.content,msg.date];
  db.base(sql,data,(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'发布成功！'})
  })
}

// 搜索全部请求内容
exports.personageAll = (req,res) => {
  let sql = `select * from personage  order by id desc`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 这是志愿人物修改 
exports.personageModify = (req,res)=>{
  let msg = req.body;
  console.log(msg)
  let sql = `update personage set  title='${msg.title}',type='${msg.type}',content='${msg.content}' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'修改成功！'})
  })
}

// 新闻信息删除
exports.personageDelete = (req,res)=>{
  let msg = req.query;
  let sql = `delete from personage where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'删除成功！'}) 
  })
}

// 搜索志愿者风采
exports.personageOne = (req,res) => {
  let msg = req.query;
  let sql = `select * from personage  where type = 0`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 搜索志愿者故事
exports.personageTwo = (req,res) => {
  let msg = req.query;
  let sql = `select * from personage  where type = 1`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 搜索志愿者心语
exports.personageThree = (req,res) => {
  let msg = req.query;
  let sql = `select * from personage  where type = 2`;
  db.base(sql,[],results => {
    res.json(results)
  })
}