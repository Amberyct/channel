<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:3000/fileup"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :limit="1"
          :multiple="false"
          :on-success="handleSuccess"
          name="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- <input type="file" @change="files" /> -->
      </el-form-item>
      <el-form-item label="所属分类">
        <el-cascader v-model="value" :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tree from '@/myjs/tree.js'
export default {
  data() {
    return {
      name: "",
      value: "",
      imgurl:'',
      fileList: [],
      options: [{
          value:'0',
          label:'一级权限'
      }]
    };
  },
  mounted () {
      this.axios.get('/spflall').then(res=>{
          console.log(res.data)
          let data = tree(res.data.info,0)
          console.log(data)
          this.options=[...this.options,...data]
      })
  },
  methods: {
    add() {
      console.log(this.name, this.value,this.fileList);
      this.axios.post('/spfladd',{
          title:this.name,
          pid:this.value.pop(),
          imgurl:this.imgurl
      }).then(res=>{
        //   console.log(res.data)
        if(res.data.err_code==200){
            this.$router.push({name:'goodspartlist'})
        }else{
            alert('失败')
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response){
        this.imgurl=response.imgurl
    }
  }
};
</script>

<style>
</style>