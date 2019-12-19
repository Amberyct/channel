<template>
  <div class="goods">
    <h3>商品管理-新增商品</h3>
    <el-form ref="form">
      <!-- 商品名称 -->
      <el-form-item label="商品名称">
        <!-- <div class="form-item"> -->
        <el-input v-model="goodsname" placeholder="请输入商品名称" style="width:250px;"></el-input>
        <!-- </div> -->
      </el-form-item>
      <!-- 规格参数 -->
      <el-form-item>
        <p>规格参数</p>
        <el-divider></el-divider>
        <!-- <div class="form-item"> -->
        <size v-for="(v,i) in sizearr" :key="i" :sizearrItem="v" :sizearrIndex="i"></size>
        <el-button @click="addsize">新增规格</el-button>
        <!-- </div> -->
      </el-form-item>
      <!-- 商品价格 -->
      <el-form-item label="商品价格">
        <!-- <div class="form-item"> -->
        <el-input v-model="price" placeholder="请输入商品价格" style="width:250px;"></el-input>
        <span>如果该商品不因规格参数变化，则在此统一输入价格</span>
        <!-- </div> -->
      </el-form-item>
      <!-- 缩略图 -->
      <el-form-item>
        <p>缩略图</p>
        <!-- <div class="form-item"> -->
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3000/slfileup"
          :show-file-list="false"
          :on-success="sSuccess"
          name="sl"
        >
          <img v-if="slimageUrl" :src="`http://127.0.0.1:3000${slimageUrl}`" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>限上传缩略图</span>
        <!-- </div> -->
      </el-form-item>
      <!-- 轮播顶图 -->
      <el-form-item>
        <p>轮播顶图</p>
        <!-- <div class="form-item"> -->
        <el-upload
          action="http://127.0.0.1:3000/lbfileup"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="lbSuccess"
          name="lb"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="`http://127.0.0.1:3000${dialogImageUrl}`" alt />
        </el-dialog>
        <span>可上传多张图，图片最佳尺寸</span>
        <!-- </div> -->
      </el-form-item>
      <!-- 商品详情 -->
      <el-form-item>
        <p>商品详情</p>
        <quill-editor class="editor" v-model="zhi" :options="editorOption"></quill-editor>
      </el-form-item>
      <!-- 是否进入方案库 -->
      <el-form-item>
        <p>是否进入方案库</p>
        <el-divider></el-divider>
        <!-- <div class="form-item"> -->
        <el-radio-group>
          <el-radio label="否"></el-radio>
          <el-radio label="是"></el-radio>
        </el-radio-group>
        <!-- </div> -->
      </el-form-item>
       <!-- 商品分类 -->
      <el-form-item label="商品分类">
        <el-cascader
          :options="options"
          v-model="flid"
          :props="{ checkStrictly: true }"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <!-- 上下架 -->
      <el-form-item label="上下架">
        <!-- <div class="form-item"> -->
        <el-switch v-model="showhide" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <!-- </div> -->
      </el-form-item>
      <!-- 提交 -->
      <el-form-item class="bottom">
        <el-button type="warning">预览</el-button>
        <el-button type="warning" @click="add">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import size from "@/components/goods/size.vue";
import tree from '@/myjs/tree.js'
import { mapState, mapMutations } from "vuex";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image"] // 链接、图片、视频
];
export default {
  components: {
    size
  },
  computed: {
    ...mapState(["sizearr"])
  },
  data() {
    return {
      zhi: "",
      goodsname: "",
      price: "",
      showhide: false,
      slimageUrl: "",
      lbimageUrl: [],
      dialogImageUrl: "",
      dialogVisible: false,
      flid: "",
      options:[],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    };
  },
  methods: {
    ...mapMutations(["addsize"]),
    sSuccess(res) {
      this.slimageUrl = res.imgurl;
    },
    lbSuccess(res) {
      this.lbimageUrl.push(res.imgurl);
    },
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.response.imgurl;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    add() {
      // console.log(this.dialogImageUrl, this.lbimageUrl);
      let obj = {
        goodsinfo: this.goodsinfo,
        goodsname: this.goodsname,
        price: this.price,
        showhide: this.showhide,
        slimageUrl: this.slimageUrl,
        lbimageUrl: this.lbimageUrl,
        sizearr: this.$store.state.sizearr,
        flid: this.flid.pop()
      };
      this.axios.post('/addsp',obj).then(res=>{
        console.log(res.data.err_code)
      })
    }
  },
  mounted () {
    this.axios.get('/spflall').then(res=>{
      let info = tree(res.data.info,0)
      this.options=[...this.options,...info]
    })
  }
};
</script>

<style scoped>
.form-item {
  padding-left: 110px;
}
.goods {
  background-color: #fff;
}
h3 {
  padding: 10px;
}
.el-form-item {
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-bottom: 1px;
  padding: 15px;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 10px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.editor {
  line-height: normal !important;
}
.editor .ql-container {
  height: 400px;
}
.bottom {
  text-align: center;
}
</style>