//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 管理员表的 骨架-规则 
const goodsSchem = db.Schema({
    goodsname: { type: String }, //商品名
    price: { type: String }, //价格
    goodsinfo: { type: String }, //详情
    showhide: { type: Boolean },//上架/下架
    ggarr: { type: Array },//规格
    imageUrl: { type: String },//商品缩略图
    fileList: { type: Array },//商品轮播图
    flid: { type: String ,ref:"spfls"} //商品分类id
})
// 二、生成 模型
const goodsModel = db.model("goodss", goodsSchem)

module.exports = goodsModel;