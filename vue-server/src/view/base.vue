<template>
  <div class="base">
    <el-container>
      <el-header>
        <h1>渠道商后台管理</h1>
      </el-header>
      <el-container class="content">
        <el-aside width="200px">
          <!-- 左侧导航 -->
          <el-col :span="24">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <!-- 统计 -->
              <el-submenu v-for="(v,i) in limitlist" :key="v._id" :index="`${i+1}`">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{v.title}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(v1,i1) in v.children"
                    :key="i1"
                    :index="`${i+1}-${i1+1}`"
                    @click="$router.push({'name':v1.name})"
                  >{{v1.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>

        <!-- 右侧 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get("/limitlist").then(res => {
      console.log(res.data.info);
      this.limitlist = this.tree(res.data.info, 0);
    });
  },
  methods: {
    tree(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          let x = {
            ...info[i],
            children: this.tree(info, info[i]._id)
          };
          data.push(x);
        }
      }
      return data;
    }
  },
  data() {
    return {
      limitlist: []
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.base {
  background: #ebebec;
}
.el-header {
  background-color: #f7f7f7;
  color: #333;
}

.el-aside {
  background-color: #f7f7f7;
  color: #333;

  height: 100vh;
  overflow: auto;
  margin: 0 10px;
}

.el-main {
  background-color: #f7f7f7;
  color: #333;

  margin: 0 10px;
  height: 100vh;
  overflow: auto;
}

body > .el-container {
  margin-bottom: 40px;
}
.content {
  background: #ebebec;
  margin-top: 20px;
}
</style>