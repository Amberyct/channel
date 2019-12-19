<template>
  <div class="size-page">
    <div class="left">
      <p>规格名</p>
      <div class="left-box">
        <el-button @click="delsizearr(sizearrIndex)">×</el-button>
        <el-input v-model="sizearrItem.name"></el-input>
      </div>
    </div>
    <el-divider direction="vertical"></el-divider>

    <div class="right">
      <div class="right-title">
          <p>参数</p>
          <p>对应价格</p>
      </div>
      <size-item v-for="(v,i) in sizearrItem.item" :key="i" :canitem="v" :canindex="i" :sizearrIndex="sizearrIndex"></size-item>
      <el-button @click="additem(sizearrIndex)">新增参数</el-button>
    </div>
   
  </div>
</template>

<script>
import sizeItem from '@/components/goods/size-item'
import {mapMutations} from 'vuex'
export default {
    components: {
        sizeItem
    },
    props:['sizearrItem','sizearrIndex'],
    methods: {
        ...mapMutations(['additem','delsizearr'])
    }

};
</script>

<style>
.size-page {
  display: flex;
  justify-content: space-around;
}
.left-box{
    display:flex;
    justify-content: space-around;
}
.right-title{
    display:flex;
    justify-content: space-around;
}
</style>