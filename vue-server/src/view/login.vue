<template>
  <div class="login" v-if="f">
    <div class="img">图</div>
    <h2>渠道商管理平台</h2>
    <form class="form">
      <select name id>
        <option value>管理员</option>
        <option value>企业</option>
        <option value>平台</option>
      </select>
      <input type="text" placeholder="账号" v-model="name" />
      <input type="text" placeholder="密码" v-model="password" />
      <input type="button" value="登录" @click="loginto()" />
    </form>
  </div>
  <div v-else class="ok">
    <i class="el-icon-success size animated shake"></i>
    <p class="animated fadeInLeft">登录成功</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      f: true,
      name: "",
      password: ""
    };
  },
  methods: {
    loginto() {
      // 收集表单数据，在后端查询是否存在返回token
      let { name, password } = this;
      this.axios
        .post("/login", {
          name: name,
          password: password
        })
        .then(res => {
          console.log(res);
          if (res.data.err_code == 200) {
            //   保存token
            localStorage.setItem('channeltoken',JSON.stringify({id:res.data.id,token:res.data.token}))
            //   跳转base页面
            this.f = false;
            setTimeout(() => {
              this.$router.push({ name: "fxuser" });
            }, 2000);
          }else{
              this.name=''
              this.password=''
          }
        });
    }
  }
};
</script>

<style>
.ok {
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 70%;
  height: 100vh;
  margin: auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.size {
  font-size: 100px;
}
</style>