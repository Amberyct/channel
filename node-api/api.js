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
app.post('/useradd', (req, res) => {
    let {
        title,
        userid
    } = req.body
    usersModel.create({
        'title': title,
        'userid': userid
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200
            })
        }
    })
})


// 获取所有角色
app.get('/userlist', (req, res) => {
    usersModel.find({}, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200,
                info: data
            })
        }
    })
})

// 删除
app.get('/userdel', (req, res) => {
    usersModel.deleteOne({
        _id: req.query.id
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200
            })
        }
    })
})
// 修改角色信息
app.get('/useridinfo', (req, res) => {
    usersModel.findOne({
        _id: req.query.id
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200,
                info: data
            })
        }
    })
})
app.post('/useridedit', (req, res) => {
    let {
        id,
        title,
        userid
    } = req.body
    usersModel.updateOne({
        _id: id
    }, {
        title: title,
        userid: userid
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200,
                info: data
            })
        }
    })
})

// 管理员管理

// 添加管理员名
app.post('/adminadd', (req, res) => {
    let {
        admin,
        password,
        adminid
    } = req.body
    adminsModel.create({
        name: admin,
        password: password,
        adminid: adminid
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200
            })
        }
    })
})
// 获取所有管理员
app.get('/adminlist', (req, res) => {
    adminsModel.find({}).populate("adminid").exec((err, data) => {
        // console.log(data)
        res.send({
            "err_code": 200,
            info: data
        })
    })

})
// 删除管理员
app.get('/admindel', (req, res) => {
    let id = req.query.id
    adminsModel.deleteOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200
            })
        }
    })
})
// 根据id查找管理员
app.get('/admininfo', (req, res) => {
    let id = req.query.id
    adminsModel.findOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200,
                info: data
            })
        }
    })
})
// 修改
app.post('/adminedit', (req, res) => {
    let {
        id,
        admin,
        password,
        adminid
    } = req.body
    adminsModel.updateOne({
        _id: id
    }, {
        name: admin,
        password: password,
        adminid: adminid
    }, (err, data) => {
        if (err) {
            res.send({
                err_code: 400
            })
        } else {
            res.send({
                err_code: 200
            })
        }
    })
})

// 根据 管理员id 获取 管理员 信息 以及 权限

app.get("/adminlimit", (req, res) => {

    let id = req.query.id;
    // console.log(id)
    //(id--->查询 管理员表  -- -jsid >--- 角色 --qxid[[1,2],[2,4]] )联合查询   ---->权限表 ---[{},{},{}]
    adminsModel.findOne({
        _id: id
    }).populate("adminid").exec((err, data) => {
        // res.send(data)
        let adminObj = {
            "_id": data._id,
            "name": data.name,
            "password": data.password
        }
        // 获取到 管理员对应的 角色 ，角色 对应的权限 。但是 权限 是一个二维数组 并有重复 
        let qxid = data.adminid.userid;
        // 权限数组  降维 去重

        let qx = Array.from(new Set(qxid.flat(Infinity)));

        limitsModel.find({
            _id: {
                $in: qx
            }
        }, (err, data) => {
            // res.send(data);
            adminObj.limitarr = data;
            res.send(adminObj);
        })

    })
})

// 判断是否有权限
app.get('/checklimit', (req, res) => {
    let name = req.query.name
    let id = req.query.id
    adminsModel.findOne({
        _id: id
    }).populate('adminid').exec((err, data) => {
        // console.log(data)
        let limit = Array.from(new Set(data.adminid.userid.flat(Infinity)))
        console.log(limit)
        limitsModel.find({
            _id: {
                $in: limit
            }
        }), (err2, data2) => {
            console.log(data2)
            let f = data2.findIndex(val => val.name == name)
            console.log(f)
            if (f > -1) {
                res.send({
                    err_code: 200
                })
            } else {
                res.send({
                    err_code: 400
                })
            }
        }
    })
})

//单 文件上传
// 需要 multer
// 载入  multer 
let multer = require("multer");
let storage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/fl")
    },
    //文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let up = multer({ storage: storage });
app.use(express.static("public"))
app.post("/fileup", up.single("picture"), (req, res) => {
    // 接受文件。。
    // console.log(req.headers.host + "/fl/" + req.file.originalname)
    let imgurl = "/fl/" + req.file.originalname;
    res.send({ imgurl: imgurl })
})


// 商品分类 -- spfl 
const spflsModel = require("./model/spfls.js")
// 1、、 查找所有分类 ，返回 
app.get("/spflall", (req, res) => {
    // mongoose --- find
    spflsModel.find({}, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200, info: data })
        }
    })
})
// 2、添加分类

app.post("/spfladd", (req, res) => {
    let { title, imgurl, pid } = req.body;
    // console.log(pid)
    let obj = { "title": title, "imgurl": imgurl, "pid": pid };
    spflsModel.create(obj, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })
})

// 3、删除分类

// 4、根据 分类 id  查找 分类信息

//5、根据 分类 id  修改 



// 商品 - 缩略图 上传 sl 

let slstorage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/sl")
    },
    //文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let slup = multer({ storage: slstorage });

app.post("/slfileup", slup.single("sl"), (req, res) => {
    // 接受文件。。
    // console.log(req.headers.host + "/fl/" + req.file.originalname)
    let imgurl = "/sl/" + req.file.originalname;
    res.send({ imgurl: imgurl })
})


// 商品 - 轮播图 上传 sl 

let lbstorage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/lb")
    },
    //文件名
    filename: function (req, file, cb) {
        // const filenameArr = file.originalname.split('.');
        // cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
        cb(null, file.originalname)
    }
})

let lbup = multer({ storage: lbstorage });

app.post("/lbfileup", lbup.single("lb"), (req, res) => {
    // 接受文件。。
    // console.log(req.file)
    // console.log(req.headers.host + "/fl/" + req.file.originalname)
    let imgurl = "/lb/" + req.file.originalname;
    res.send({ imgurl: imgurl })
})

// 添加商品 sp
// const goodsModel = require("./model/sps.js")
app.post("/addsp", (req, res) => {
    let { goodsname, price, goodsinfo, showhide, sizearr, slimageUrl, lbimageUrl, flid } = req.body;
    // 将接受到的值 存入mongodb-- sps;
    let obj = { goodsname: goodsname, price: price, goodsinfo: goodsinfo, showhide: showhide, sizearr: sizearr, slimageUrl: slimageUrl, lbimageUrl: lbimageUrl, flid: flid }
    goodsModel.create(obj, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
        }
    })

})


// 商品展示 -- 分页 --接口 

app.get("/pagesp", (req, res) => {
    // page第几页 limit每页显示多少条数据
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let query = {};
    let flag = req.query.search;

    if (flag) {
        if (req.query.goodsname != "") {
            const reg = new RegExp(req.query.goodsname, 'i')
            query.goodsname = { $regex: reg }
        }
        if (req.query.price != "") {
            query.price = req.query.price
        }
    } else {
        query = {}
    }
    goodsModel.find(query, { goodsname: 1, price: 1, imageUrl: 1, showhide: 1 }).skip((page - 1) * limit).limit(limit).sort({ "_id": -1 }).exec((err, data) => {
        res.send({ info: data })
    })
})

// 商品总条数--

app.get("/sumsp", (req, res) => {
    let query = {};
    let flag = req.query.search;

    if (flag) {
        // query = {
        //     goodsname: req.query.goodsname,
        //     price: req.query.price
        // }
        if (req.query.goodsname != "") {
            const reg = new RegExp(req.query.goodsname, 'i')
            query.goodsname = { $regex: reg }

        }
        if (req.query.price != "") {
            query.price = req.query.price
        }


    } else {
        query = {}
    }
    goodsModel.count(query).exec((err, data) => {
        res.send({ sum: data })
    })
})
// 根据id 改变 上架/下架
app.get("/changeshowhide", (req, res) => {
    let { id, showhideval } = req.query;
    goodsModel.updateOne({ "_id": id }, { "showhide": showhideval }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })
})

// 根据id 删除 数据

app.get("/delsp", (req, res) => {
    let id = req.query.id;
    goodsModel.deleteOne({ "_id": id }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })
})

const goodsModel = require("./model/goods")
// 1、返回 总 条数 ===30 
app.get("/goodsnum", (req, res) => {

    goodsModel.count({}, (err, data) => {
        res.send({ "sum": data })
    })

})

//2、分页 返回 数据  page ==1  limit =3  /// 1，2，3   // 4,5,6

app.get("/goodspage", (req, res) => {
    // page  第几页
    // limit 每页显示几条数据
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);

    // console.log(page * limit)

    goodsModel.find({}).skip((page - 1) * limit).limit(limit).exec((err, data) => {
        res.send({ "info": data })
    })
})


// 统计
// 商品分类统计
app.get('/fxgoods',(req,res)=>{
    goodsModel.find({},{flid:1,_id:0}).populate("flid").exec((err,data)=>{
        res.send(data)
    })
})


app.listen(3000, (err) => {
    if (err) throw err
    console.log('is running')
})