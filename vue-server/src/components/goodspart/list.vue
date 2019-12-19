<template>
  <div>
    <el-button @click="$router.push({name:'goodspartadd'})">添加分类</el-button>
    <el-tree
      :data="info"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
import tree from '@/myjs/tree.js'
export default {
  mounted() {
    this.axios.get("/spflall").then(res => {
      console.log(res.data);
      this.info=tree(res.data.info,0)
    });
  },
  data() {
    return {
          info: [],
          defaultProps: {
            children: "children",
            label: "label",
            value: "value",
            imgurl: "imgurl"
      }
    };
  },
  methods: {
    remove() {}
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-right: 20px;
}
</style>