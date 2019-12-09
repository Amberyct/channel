<template>
  <div>
    <!-- 添加权限 -->
    <el-button @click="$router.push({name:'limitadd'})">添加权限</el-button>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column prop="_id" label="id" width="120"></el-table-column>
      <el-table-column prop="title" label="标题" width="120"></el-table-column>
      <el-table-column prop="name" label="路由name" width="120"></el-table-column>
      <el-table-column prop="pid" label="父级" width="120"></el-table-column>

      <!-- 删除 -->
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
   this.list()
  },
  methods: {
    deleteRow(index, rows,id) {
      console.log(id)
      this.axios.get('/limitdel',{params:{_id:id}}).then(res=>{
        this.list()
      })
    },
    list(){
       this.axios.get("limitlist").then(res => {
        this.tableData=res.data.info;
      // console.log(res.data.info);
    });
    }
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style>
</style>