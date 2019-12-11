<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="账号">
        <el-input v-model="admin" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="adminid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="add">确认修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin:'',
      password:'',
      adminid:'',
      options: []
    };
  },
  mounted() {
       this.axios.get("/userlist").then(res => {
      // console.log(res.data.info);
      if (res.data.err_code == 200) {
        this.options = res.data.info;
      }
    });
    this.axios.get('/admininfo',{params:{id:this.$route.params.id}}).then(res=>{
        let {name,password,adminid} =res.data.info
        this.admin=name
        this.password=password
        this.adminid=adminid
    })
  },
  methods: {
    add() {
      let obj = {
        id: this.$route.params.id,
        admin: this.admin,
        password: this.password,
        adminid: this.adminid
      };
      this.axios.post("/adminedit", obj).then(res => {
        if (res.data.err_code === 200) {
          this.$router.push({ name: "adminlist" });
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