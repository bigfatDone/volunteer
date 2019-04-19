const db = require('./db.js')

//验证码
exports.code = (req,res) => {
  let number = Math.round(Math.random()*10000);
  if(number > 1000) {
    res.json({'code':number})
  } else {
    number = Math.round(Math.random()*10000);
    res.json({'code':number})
  }
  
}
//登录
exports.login = (req,res)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
   let sql = 'select * from user where name=?';
    let data = [req.body.name,req.body.password];
    console.log(req.body)
    db.base(sql,data,(results)=>{
      console.log(results)
      if(results.length) {
        if(results[0].password === req.body.password){
          results[0].flag = 1;
          res.json(results)
        }else {
          res.json([{'flag': 0,'msg': '用户名或密码错误！'}])
        }
      } else {
        res.json([{'flag': 0,'msg': '用户名或密码错误！'}])
      }
    }) 
};

//用户名已存在
exports.repeatName = (req,res) => {
  let msg  = req.query;
  let sql = `select * from user where name='${msg.name}'`; //数据库参数需要用''包裹起来
  // let data = []
  db.base(sql,[],(results)=>{
    if(results[0] != null) {
      res.json({flag: '1'})
    } else {
      res.json({flag: '0'})
    }
  }) 
}

//身份证已存在
exports.repeatCard = (req,res) => {
  let msg  = req.query;
  console.log(msg)
  let sql = `select * from user where user_card='${msg.card}'`; //数据库参数需要用''包裹起来
  // let data = []
  db.base(sql,[],(results)=>{
    if(results[0] != null) {
      res.json({flag: '1'})
    } else {
      res.json({flag: '0'})
    }
  }) 
}

//这是注册的页面
exports.volunteerRegister=(req,res)=>{
  let msg = req.body;
  console.log(msg)
  let sql = 'insert into user(name,password,phone,grade,email,user_name,user_card,user_sex,user_date,user_politic,user_address,date,type) values(?,?,?,?,?,?,?,?,?,?,?,?,?)';
   let data = [msg.name,msg.password,msg.phone,2,msg.email,msg.realname,msg.card,msg.sex,msg.date,msg.politic,msg.address,msg.creatDate,0];
  db.base(sql,data,(results)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
    res.json({flag:1,msg:'注册成功'})
  })
}











//这是注册的页面
/* exports.register=(results,res)=>{
    let msg = req.body;
    let sql = `select * from user where name='${msg.name}'`;
    db.base(sql,[],(req)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
        if(req[0] != null){
            res.json({flag:2})
        }else{
            let sq = 'insert into user(name,password,email) values(?,?,?)';
             let data = [msg.name,msg.password,msg.email];
           db.base(sq,data,req => {
            res.json({flag:1})
           })
        }    
    }) */

  // let sql = `insert into user(name,password,email) values('${msg.name}','${msg.password}','${msg.email}')`;
//   let sql = 'insert into user(name,password,email) values(?,?,?)';
//   let data = [msg.name,msg.password,msg.email];
//    db.base(sql,data,(req)=>{
//    })

//这个是主页面显示全部的信息
exports.myhome=(req,res)=>{
    let sql = 'select * from book';
    db.base(sql,[],results=>{
        res.json(results)
    })
}
//这个是搜索的功能
exports.search = (req,res)=>{
    let msg = req.query;
    let sql = `select * from book where name like '%${msg.name}%'`;
    db.base(sql,[],results=>{
        res.json(results)
    })
}
//这个是添加书籍
exports.add = (req,res)=>{
    let msg = req.body;
    let sql = `select * from book where name='${msg.name}'`;
    db.base(sql,[],(req)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
        if(req[0] != null){
            res.json({flag:2})
        }else{
            let sq = 'insert into book(name,author,publish,time,price) values(?,?,?,?,?)';
             let data = [msg.name,msg.author,msg.publish,msg.time,msg.price];
           db.base(sq,data,(req)=>{
            res.json({flag:1})
           })
        }    
    })
    console.log(msg)
}
//这是修改书籍的信息
exports.choose = (req,res)=>{
    let msg = req.query;
    let sql = `select * from book where name='${msg.name}'`;
    db.base(sql,[],results=>{
        res.json(results)
    })
}
//这是更新
exports.updata = (req,res)=>{
    let msg = req.body;
    let sql = `update book set name='${msg.name}',author='${msg.author}',publish='${msg.publish}',time='${msg.time}',price='${msg.price}' where id='${msg.id}'`;
    db.base(sql,[],results=>{
        res.json({flag:1})
    })
}
//这是删除
exports.delete = (req,res)=>{
    let msg = req.query;
    let sql = `delete from book where name='${msg.name}'`;
    db.base(sql,[],results=>{
        console.log('delete');
        res.json({flag:1})
    })
}
//这是修改用户信息
exports.updataMsg = (req,res)=>{
    let msg = req.query;
    let sql = `select * from user where name='${msg.name}'`;
    db.base(sql,[],results=>{
        res.json(results);
    })
}
//提交修改的用户信息
exports.submitMsg = (req,res)=>{
    let msg = req.body;
    let sql = `update user set name='${msg.name}',password='${msg.password}',email='${msg.email}' where id='${msg.id}'`;
    db.base(sql,[],results=>{
      res.json({flag:1})
    })
}
//这是Android的登录
exports.androidLogin = (req,res)=>{
    let msg = req.body;
    let sql = `select * from user where name='${msg.name}'`;
    console.log(msg.name)
    db.base(sql,[],results=>{
        if(results.length == 0){
            console.log(444)
            res.json({id:0})
        }else{
            if(results[0].password == msg.password){
                res.json(results[0]); 
                console.log(666) 
            }else{
                res.json({id:0})
                console.log(555)
            }
        }  
        //console.log(results[0].password) 
    })
}

//这是获取安卓的图书列表
exports.androidShow  = (req,res)=>{
    let sql = 'select * from book';
    console.log(222);
    db.base(sql,[],results=>{
         res.json(results)
      console.log(111)
    })
}