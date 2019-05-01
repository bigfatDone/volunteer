const db = require('./db.js')

// 新闻详情
exports.detail = (req,res) => {
  let msg = req.query;
  let sql = `select * from news  where id = '${ msg.id }'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 志愿人物详情
exports.personageDetail = (req,res) => {
  let msg = req.query;
  let sql = `select * from personage  where id = '${ msg.id }'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 志愿新闻
exports.getNews = (req,res) => {
  let sql = `select * from news order by id desc limit 0,5`;
  db.base(sql,[],results => {
    res.json(results)
  })
}


// 图片上传
exports.fileData = (req,res) => {
  let avatarUrl = ''
  req.files.forEach(file => {
      if (file.fieldname === 'file') {   // avatar  就是前端存储头像的name字段
          avatarUrl = file.filename    // filename 就是对应要存到数据库的字段
      }
  })
  res.json(avatarUrl)
}

// 搜索通过项目审核
exports.getProjectAside = (req,res) => {
  let now = new Date().getTime();
  let sql = `select * from project where status='1' order by id desc limit 1,5`;
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