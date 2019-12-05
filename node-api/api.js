// 连接数据库
const db = require('./db.js')
// const adminsModel =require('./model/admin.js')
const adminsSchema=db.Schema({
    name:{type:String},
    password:{type:String},
})

const adminsModel=db.model('admins',adminsSchema)

const express=require('express')
const app=express()

// 跨域
const cors=require('cors')
app.use(cors())
// POST接收
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// 载入jsonwebtaoken
const jwt = require('jsonwebtoken')
// 登录接口---返回token，用户ID
app.post('/login',(req,res)=>{
    let {name,password}=req.body
    console.log(req.body.name,req.body.password)
    adminsModel.findOne({"name":name,"password":password},(err,data)=>{
        if(err) throw err
        // console.log(data)
        if(data){
            let content ={name:data._id}; // 要生成token的主题信息
            let secretOrPrivateKey="channel" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 60  // 60s过期
                });

            res.send({"err_code":200,"id":data._id,token:token})
        }else{
            res.send({"err_code":400})
        }
    })
})

app.get('/checktoken',(req, res)=>{
    
            let token = req.headers.token; // 从body中获取token
            let secretOrPrivateKey="channel"; // 这是加密的key（密钥） 

            jwt.verify(token, secretOrPrivateKey, function (err) {
                if (err) {  //  时间失效的时候/ 伪造的token          
                    res.send({'err_code':400});            
                } else {
                    res.send({'err_code':200});
                }
            })
      
  
})



app.listen(3000,(err)=>{
    if(err) throw err
    console.log('is running')
})