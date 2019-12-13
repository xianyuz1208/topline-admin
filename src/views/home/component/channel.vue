<template>
    <el-select :value="id" @change="$emit('change',$event)" placeholder="请选择活动区域">
    <el-option
      v-for="item in channelList"
      :label="item.name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
    name:"channel",
    props:['id'],
    model:{
    prop:"id",
    event:'change'
    },
    data() {
      return {
        channelList:[]
      }
    },
    created() {
      this.$axios.get(`/mp/v1_0/channels`).then(res => {
      // window.console.log(res);
      this.channelList = res.data.data.channels;
    });
    },
}
</script>

<style>

</style>