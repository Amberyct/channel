const db = require('./db.js')
const adminsSchema=db.Schema({
    name:{type:String},
    password:{type:String},
})

const adminsModel=db.model('admins',adminsSchema)

adminsModel.find({},(err,data)=>{
    if(data.length==0){
        adminsModel.create({"name":"yy","password":"123"},(err,doc)=>{
            if(err) throw err
            console.log('管理员账号密码插入')
        })
    }
})