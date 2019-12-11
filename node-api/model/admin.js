const db = require('../db.js')
const adminsSchema=db.Schema({
    name:{type:String},
    password:{type:String},
    adminid:{type:String,ref:"users"}
})

const adminsModel=db.model('admins',adminsSchema)

module.exports=adminsModel
