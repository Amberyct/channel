const db = require('mongoose');

db.connect('mongodb://127.0.0.1:27017/channel',{ useUnifiedTopology: true ,useNewUrlParser: true },(err)=>{
    if(err) throw err
    console.log('ok')
})



module.exports=db
