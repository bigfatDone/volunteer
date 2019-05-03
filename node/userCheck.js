const db = require('./db.js')

//这个是志愿者全部信息
exports.volunteerCheck=(req,res)=>{
  let sql = 'select * from user where grade=2';
  db.base(sql,[],results=>{
    console.log(results.length)
      res.json(results)
      console.log(results)
  })
}

//这个是志愿者通过
exports.volunteerPass=(req,res)=>{
  console.log(req.query.id)
  let sql = `update user set type='1' where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'审核通过！'})
  })
}

//这个是志愿者不通过
exports.volunteerNoPass=(req,res)=>{
  console.log(req.query.id)
  let sql = `update user set type='2' where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'审核不通过！'})
  })
}

//这个是志愿者删除
exports.volunteerDelete=(req,res)=>{
  console.log(req.query.id)
  let sql = `delete from user where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'删除成功！'})
  })
}

//这个是社区全部信息
exports.communityCheck=(req,res)=>{
  let sql = 'select * from user where grade=3';
  db.base(sql,[],results=>{
    console.log(results.length)
      res.json(results)
      console.log(results)
  })
}

//这个是社区通过
exports.communityPass=(req,res)=>{
  console.log(req.query.id)
  let sql = `update user set type='1' where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'审核通过！'})
  })
}

//这个是志愿者不通过
exports.communityNoPass=(req,res)=>{
  console.log(req.query.id)
  let sql = `update user set type='2' where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'审核不通过！'})
  })
}

//这个是志愿者删除
exports.communityDelete=(req,res)=>{
  console.log(req.query.id)
  let sql = `delete from user where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'删除成功！'})
  })
}

//这个是管理员全部信息
exports.adminAll=(req,res)=>{
  let sql = 'select * from admin where grade=1';
  db.base(sql,[],results=>{
    console.log(results.length)
      res.json(results)
  })
}

//管理员删除
exports.adminAllDelete=(req,res)=>{
  let sql = `delete from admin where id='${req.query.id}'`;
  db.base(sql,[],results=>{
      res.json({msg:'删除成功！'})
  })
}

// 志愿者报名志愿项目
exports.adminAdd = (req,res) => {
  let msg = req.body;
  console.log(msg)
  let data = [msg.name,msg.password,1];
  let sql = 'insert into admin(name,password,grade) values(?,?,?)';
  db.base(sql,data,(results)=>{ //  [ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'添加成功!'})
  })
}