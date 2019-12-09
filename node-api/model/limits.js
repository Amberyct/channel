const db = require('../db.js')
const limitsSchema=db.Schema({
    title:{type:String},
    name:{type:String},
    pid:{type:String},
})

const limitsModel=db.model('limits',limitsSchema)

module.exports=limitsModel
