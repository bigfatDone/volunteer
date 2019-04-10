const db = require('./db.js')

//这是显示的页面
exports.login=(req,res)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
   let sql = 'select * from user where name=?';
    let data = [req.body.name];
    console.log(req.body)
    db.base(sql,data,(results)=>{
      console.log(results)
      if(results.length) {
        console.log(111)
        results[0].flag = 1;
        res.json(results)
      } else {
        res.json([{'flag': 0,'msg': '用户名或密码错误！'}])
      }
    }) 
};
//这是注册的页面
exports.register=(req,res)=>{
    let msg = req.body;
    let sql = `select * from user where name='${msg.name}'`;
    db.base(sql,[],(req)=>{//[ RowDataPacket 通过req[0]来访问,无论是否有误数据
        if(req[0] != null){
            res.json({flag:2})
        }else{
            let sq = 'insert into user(name,password,email) values(?,?,?)';
             let data = [msg.name,msg.password,msg.email];
           db.base(sq,data,(req)=>{
            res.json({flag:1})
           })
        }    
    })

  // let sql = `insert into user(name,password,email) values('${msg.name}','${msg.password}','${msg.email}')`;
//   let sql = 'insert into user(name,password,email) values(?,?,?)';
//   let data = [msg.name,msg.password,msg.email];
//    db.base(sql,data,(req)=>{
//    })

};
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