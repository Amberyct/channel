const db = require('../db.js')
const adminsSchema=db.Schema({
    name:{type:String},
    password:{type:String},
    userid:{type:String}
})

const adminsModel=db.model('admins',adminsSchema)

module.exports=adminsModel
