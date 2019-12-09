// 连接数据库
const db = require('./db.js')
const adminsModel = require('./model/admin.js')
// const adminsSchema=db.Schema({
//     name:{type:String},
//     password:{type:String},
// })

// const adminsModel=db.model('admins',adminsSchema)

const express = require('express')
const app = express()

// 跨域
const cors = require('cors')
app.use(cors())
// POST接收
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
// 载入jsonwebtaoken
const jwt = require('jsonwebtoken')
// 登录接口---返回token，用户ID
app.post('/login', (req, res) => {
    let {
        name,
        password
    } = req.body
    // console.log(req.body.name,req.body.password)
    adminsModel.findOne({
        "name": name,
        "password": password
    }, (err, data) => {
        if (err) throw err
        // console.log(data)
        if (data) {
            let content = {
                name: data._id
            }; // 要生成token的主题信息
            let secretOrPrivateKey = "channel" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 // 1h过期
            });

            res.send({
                "err_code": 200,
                "id": data._id,
                token: token
            })
        } else {
            res.send({
                "err_code": 400
            })
        }
    })
})

app.get('/checktoken', (req, res) => {

    let token = req.headers.token; // 从body中获取token
    let secretOrPrivateKey = "channel"; // 这是加密的key（密钥） 

    jwt.verify(token, secretOrPrivateKey, function (err) {
        if (err) { //  时间失效的时候/ 伪造的token          
            res.send({
                'err_code': 400
            });
        } else {
            res.send({
                'err_code': 200
            });
        }
    })


})


const limitsModel = require('./model/limits.js')
// 添加权限
app.post('/limitadd', (req, res) => {
    // 接收参数
    let {
        title,
        name,
        pid
    } = req.body
    let obj = {
        "title": title,
        "name": name,
        "pid": pid
    }
    limitsModel.create(obj, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200
            })
        }
    })
})

// 获取所有权限
app.get('/limitlist', (req, res) => {
    limitsModel.find({}, (err, data) => {
        if (err) {
            res.send({
                "err_code": 400
            })
        } else {
            res.send({
                "err_code": 200,
                "info": data
            })
        }
    })
})


// 根据_id删除
app.get('/limitdel', (req, res) => {
    let _id = req.query._id
    //调用递归删除子权限
    treedel(_id)
    //删除自己
    limitsModel.deleteMany({
        _id: _id
    }, (err, data) => {
        res.send({
            err_code: 200
        })
    })

})
// 递归删除 子权限
function treedel(id, res) {
    limitsModel.find({
        "pid": id
    }, (err, data) => {
        if (data.length > 0) {
            for (let v of data) {
                // console.log(v.title)
                treedel(v._id)
                // console.log(v.title)
                limitsModel.deleteMany({
                    _id: v._id
                }, (err, data) => {
                    // console.log(data)
                })
            }
        }
    })
}

// 角色
const usersModel = require('./model/users')

// 添加角色
app.post('/useradd',(req,res)=>{
    let {title,userid} =req.body
    usersModel.create({'title':title,'userid':userid},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200})
        }
    })
})


// 获取所有角色
app.get('/userlist',(req,res)=>{
    usersModel.find({},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200,info:data})
        }
    })
})

// 删除
app.get('/userdel',(req,res)=>{
    usersModel.deleteOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200})
        }
    })
})
// 修改角色信息
app.get('/useridinfo',(req,res)=>{
    usersModel.findOne({_id:req.query.id},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200,info:data})
        }
    })
})
app.post('/useridedit',(req,res)=>{
    let {id,title,userid}= req.body
    usersModel.updateOne({_id:id},{title:title,userid:userid},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200,info:data})
        }
    })
})

// 管理员管理

// 添加管理员名
app.post('/adminadd',(req,res)=>{
    let {admin,password,userid}=req.body
    adminsModel.create({name:admin,password:password,userid:userid},(err,data)=>{
        if(err){
            res.send({err_code:400})
        }else{
            res.send({err_code:200})
        }
    })
})
// 获取所有管理员
app.get('/adminlist',(req,res)=>{
    adminsModel.find().populate("jsid").exec((err, data) => {
        console.log(data)
        res.send({ "err_code": 200, info: data })
    })

})


app.listen(3000, (err) => {
    if (err) throw err
    console.log('is running')
})