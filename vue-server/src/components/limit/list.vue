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
            @click.native.prevent="deleteRow(scope.$index, tableData)"
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
    this.axios.get("limitlist").then(res => {
      let info = res.data.info;
      for (let v of info) {
        let obj = {
          name: v.name,
          title: v.title,
          _id:v._id,
          pid: v.pid
        };
        this.tableData.push(obj);
      }

      console.log(res.data.info);
    });
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
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