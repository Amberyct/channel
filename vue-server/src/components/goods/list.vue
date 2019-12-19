<template>
  <div>
    <!-- 搜索条件 -->
    <div>
      <h4>搜索条件</h4>
      <el-form ref="form" :inline="true" label-width="auto">
        <el-form-item>
          <el-input placeholder="请输入商品名称" width></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="请选择销售时间" v-model="value">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" >
          <el-select placeholder="状态" style="width:100px;" v-model="value">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可见性" >
          <el-select placeholder="可见性" style="width:100px;" v-model="value">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每页显示" >
          <el-select placeholder="每页显示" style="width:100px;" v-model="value" >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button>确定</el-button>
      </el-form-item>
      </el-form>
      
    </div>
    <!-- 商品列表 -->
    <div class="title">
      <h4>商品列表
          <el-link type="danger" :underline="false" class="add" @click="$router.push({name:'goodsadd'})">新增</el-link>
      </h4>
      <el-link type="primary" :underline="false">打印表格</el-link>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="缩略图">
      </el-table-column>
        <el-table-column
        prop="address"
        label="规格">
      </el-table-column>
        <el-table-column
        prop="address"
        label="是否已进入方案库">
      </el-table-column>
        <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope" >
        <el-button @click="handleClick(scope.row)" type="text" size="small">下架</el-button>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">预览</el-button>
      </template>
      </el-table-column>
    </el-table>
    <router-view>
        <button>111</button>
    </router-view>
  </div>
</template>

<script>
export default {
     data() {
        return {
            value:'',
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
};
</script>

<style>
h4 {
  background-color: #e0e0e0;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e0e0e0;
     padding: 0 20px;
}


</style>