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
  let sql = `select * from news order by id desc`;
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

// 获取用户限权
exports.getPower = (req,res) => {
  let msg = req.query;
  let sql = `select type from user where id = '${msg.id}'`;
  db.base(sql,[],results => {
    res.json(results)
  })
}

// 获取比例
exports.registerRate = (req,res) => {
  let vLength = 0;
  let cLength = 0;
  let pLength = 0;
  let eLength = 0;
  let sql = `select id from user where grade = 2`;
  db.base(sql,[],results => {
    vLength = results.length;
    sql = `select id from user where grade = 3`;
    db.base(sql,[],results => {
      cLength = results.length;
      sql = `select id from project where status = 1`;
      db.base(sql,[],results => {
        pLength = results.length;
        sql = `select id from entry where type = 1`;
        db.base(sql,[],results => {
          eLength = results.length;
          res.json({'vLength':vLength,'cLength':cLength,'pLength':pLength,'eLength':eLength})
        })
      })
    })
  })
}

// 获取首页志愿项目
exports.getPersonageAside = (req,res) => {
  let sql = `select * from personage order by id desc`;
  db.base(sql,[],results => {
    res.json(results)
  })
}