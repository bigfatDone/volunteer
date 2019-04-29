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
  console.dir(req.files)
  req.files.forEach(file => {
      if (file.fieldname === 'file') {   // avatar  就是前端存储头像的name字段
          avatarUrl = file.filename    // filename 就是对应要存到数据库的字段
      }
  })
  console.log(avatarUrl)
  res.json(avatarUrl)
}

