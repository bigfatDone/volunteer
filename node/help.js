const db = require('./db.js')

// 帮助表发布
exports.help = (req,res)=>{
  let msg = req.body;
  let sql = 'insert into help(title,area,content,address,name,phone,date,grade) values(?,?,?,?,?,?,?,?)';
   let data = [msg.header,msg.region,msg.desc,msg.address,msg.name,msg.phone,msg.date,0];
  db.base(sql,data,(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'发布成功，等待审核！'})
  })
}

exports.helpAll = (req,res) => {
  let sql = `select * from help `;
  db.base(sql,[],results => {
    console.log(results)
    res.json(results)
  })
}

// 这是发布信息修改
exports.helpModify = (req,res)=>{
  let msg = req.body;
  console.log(msg)
  let sql = `update help set  mark='${msg.mark}' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'修改成功！'})
  })
}