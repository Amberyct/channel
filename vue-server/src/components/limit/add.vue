<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="父权限">
        <el-cascader
          v-model="value"
          :show-all-levels="false"
          :options="options"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-button type="primary" @click="add">立即创建</el-button>
    </el-form>
    {{value}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      name: "",
      value: [],
      options: [
        //默认 一级 pid 0
        {
          value: "0",
          label: "一级权限"
        }
      ]
    };
  },
  mounted() {
    this.axios.get("/limitlist").then(res => {
      console.log(res.data);
      if (res.data.err_code == 200) {
        let info = res.data.info;
        let data = this.tree(info, 0);
        this.options=[...this.options,...data]
      }
    });
  },
  methods: {
    //无限级分类----递归
    tree(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            value: info[i]._id,
            label: info[i].title,
            children: this.tree(info, info[i]._id)
          };
          // 如果 没有子权限 -- 删除 children 属性
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
        }
      }
      return data;
    },
    add() {
      let obj = {
        name: this.name,
        title: this.title,
        pid: this.value.pop()
      };
      this.axios.post("/limitadd", obj).then(res => {
        if (res.data.err_code === 200) {
          this.$router.push({name:'limitlist'})
        } else {
          this.name = "";
          this.title = "";
        }
      });
    }
  }
};
</script>

<style>
</style>