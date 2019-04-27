const db = require('./db.js')

function page(val,num) {
  let start = (val - 1) * num;
  let end = val * num;
  return [start,end]
}

// 志愿快讯发布
exports.news = (req,res)=>{
  let msg = req.body;
  let sql = 'insert into news(title,content,date) values(?,?,?)';
   let data = [msg.title,msg.content,msg.date];
  db.base(sql,data,(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'发布成功！'})
  })
}

// 搜索全部请求内容
exports.newsAll = (req,res) => {
  let sql = `select * from news  order by id desc`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 搜索全部新闻详情
exports.newsDetail = (req,res) => {
  let msg = req.query;
  let sql = `select * from news  where id = '${ msg.id }'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 这是新闻信息修改
exports.newsModify = (req,res)=>{
  let msg = req.body;
  console.log(msg)
  let sql = `update news set  title='${msg.title}',content='${msg.content}' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'备注成功！'})
  })
}

// 新闻信息删除
exports.newsDelete = (req,res)=>{
  let msg = req.query;
  let sql = `delete from news where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'删除成功！'}) 
  })
}