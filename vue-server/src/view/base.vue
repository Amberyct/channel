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
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
            
            >
              <!-- 统计 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="$router.push({'name':'fxuser'})">用户分析</el-menu-item>
                  <el-menu-item index="1-2" @click="$router.push({'name':'fxorder'})">订单分析</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 管理 -->
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">管理</span>
              </el-menu-item>
              
            </el-menu>
          </el-col>
        </el-aside>

        <!-- 右侧 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
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