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
      <el-button type="primary" @click="add">立即创建</el-button>
    </el-form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: "",
      password: "",
      adminid: [],
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
  },
  methods: {
    add() {
      let obj = {
        admin: this.admin,
        password: this.password,
        adminid: this.adminid
      };
      this.axios.post("/adminadd", obj).then(res => {
        if (res.data.err_code === 200) {
          this.$router.push({ name: "adminlist" });
        } else {
          this.admin = "";
          this.password = "";
        }
      });
    }
  }
};
</script>

<style>
</style>