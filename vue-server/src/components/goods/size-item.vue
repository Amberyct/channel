<template>
  <div class="size-right-item" >
      <el-button @click="delitem({'sizearrIndex':sizearrIndex,'canindex':canindex})">×</el-button>
      <el-input v-model="canitem.title"></el-input>
      <el-input v-model="canitem.value"></el-input>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props:['canitem','canindex','sizearrIndex'],
    methods: {
        ...mapMutations(['delitem'])
    }
}
</script>

<style>
.size-right-item{
    display:flex;
}
</style>