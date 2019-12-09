const db = require('../db.js')
const usersSchema=db.Schema({
    title:{type:String},
    userid:{type:Array},
})

const usersModel=db.model('users',usersSchema,'users')

module.exports=usersModel
