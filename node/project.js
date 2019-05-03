const db = require('./db.js')

exports.project = (req,res) => {
  let msg = req.body.data;
  let data = [msg.header,msg.region,msg.number,msg.st_time,msg.end_time,msg.work_st_time,msg.work_end_time,msg.desc,msg.detail,msg.address,msg.community,msg.name,msg.tel,msg.communityAddr,msg.pic,msg.date,1,'admin'];
  let sql = 'insert into project(title,area,number,st_time,end_time,work_st_time,work_end_time,descr,content,address,realname,manager,phone,cm_address,pic,date,status,cm_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  db.base(sql,data,(results)=>{ //  [ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'发布成功!'})
  })
}

// 搜索全部请求内容
exports.projectAll = (req,res) => {
  let sql = `select * from project  order by id desc`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 志愿项目通过
exports.projectPass = (req,res)=>{
  let msg = req.query;
  console.log(msg)
  let sql = `update project set  status='1' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'})
  })
}

// 志愿项目不通过
exports.projectNoPass = (req,res)=>{
  let msg = req.query;
  let sql = `update project set  status='2' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'})
  })
}

// 志愿项目删除
exports.projectDelete = (req,res)=>{
  let msg = req.query;
  let sql = `delete from project where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'删除成功！'}) 
  })
}

// 这是志愿项目修改
exports.projectModify = (req,res)=>{
  let msg = req.body.data;
  console.log(msg)
  let sql = `update project set  title='${msg.header}',area='${msg.region}',st_time='${msg.st_time}',end_time='${msg.end_time}',work_st_time='${msg.work_st_time}',work_end_time='${msg.work_end_time}',descr='${msg.desc}',content='${msg.detail}',address='${msg.address}',realname='${msg.community}',manager='${msg.name}',phone='${msg.tel}',cm_address='${msg.communityAddr}',status='1' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'修改成功！'})
  })
}

// 社区发布志愿项目
exports.projectPublish = (req,res) => {
  let msg = req.body.data;
  console.log(msg)
  let data = [msg.header,msg.region,msg.number,msg.st_time,msg.end_time,msg.work_st_time,msg.work_end_time,msg.desc,msg.detail,msg.address,msg.community,msg.name,msg.tel,msg.communityAddr,msg.pic,msg.date,0,msg.id];
  let sql = 'insert into project(title,area,number,st_time,end_time,work_st_time,work_end_time,descr,content,address,realname,manager,phone,cm_address,pic,date,status,cm_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  db.base(sql,data,(results)=>{ //  [ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'发布成功!'})
  })
}

// 搜索通过项目审核
exports.projectPage = (req,res) => {
  let now = new Date().getTime();
  let sql = `select * from project where status='1' order by id desc`;
  db.base(sql,[],results => {
    results.forEach( item => {
     let date = new Date(item.end_time).getTime();
     if( now > date){
      item.type = 0;
     } else {
      item.type = 1;
     }
    });
    res.json(results)
  })
}

// 志愿项目详情
exports.projectDetail = (req,res) => {
  let id = req.query.id;
  let sql = `select * from project where id='${id}'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 社区人员发布志愿项目状态
exports.communityProject = (req,res) => {
  let id = req.query.id;
  console.log(id)
  let sql = `select * from project where cm_id='${id}'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 志愿者报名志愿项目
exports.entry = (req,res) => {
  let msg = req.body;
  let data = [msg.user_id,msg.project_id,msg.time,0];
  let sql = 'insert into entry(user_id,project_id,time,type) values(?,?,?,?)';
  db.base(sql,data,(results)=>{ //  [ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'报名成功!'})
  })
}

// 判断志愿者报名志愿项目
exports.hadEntry = (req,res) => { 
  let user_id = req.query.user_id;
  let project_id = req.query.project_id;
  let sql = `select * from entry where user_id='${user_id}' and project_id='${project_id}'`;
  db.base(sql,[],results => {
    if( results[0] == undefined){
      res.json({flag:0})
    } else {
      res.json({flag:1})
    }
  })
}

// 社区人员发布志愿项目状态
exports.volunteerProject = (req,res) => {
  let id = req.query.id;
  console.log(id)
  let sql = `select * from entry left join project on entry.project_id=project.id where user_id = '${id}'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 获取志愿项目审核
exports.auditAll = (req,res) => {
  let id = req.query.id;
  console.log(id)
  let sql = `select project.title,entry.time,entry.id,entry.type,user.user_name,user.user_sex,user.user_address,user.phone from project inner join entry on project.id=entry.project_id  inner join user on entry.user_id=user.id and cm_id = '${id}'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 志愿项目通过
exports.auditPass = (req,res)=>{
  let msg = req.query;
  let sql = `update entry set  type='1' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'})
  })
}

// 志愿项目不通过
exports.auditNoPass = (req,res)=>{
  let msg = req.query;
  let sql = `update entry set  type='2' where id='${msg.id}'`
  db.base(sql,[],(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'审核成功！'})
  })
}

// 模糊查询志愿项目
exports.search = (req,res) => {
  let search = req.query.title;
  let sql = `select * from project where title like '%${search}%' and status = 1 order by id desc`;
  db.base(sql,[],results => {
    res.json(results)
  })
}