<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-radio-group  @change="menuChange" v-model="menu">
      <el-radio-button label="全部"></el-radio-button>
      <el-radio-button label="收藏"></el-radio-button>
    </el-radio-group>
    <el-upload
  class="upload-demo"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  style="float:right"
  :headers="headers"
  name="image"
  :on-success="upSuccess"
  >
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
  </div>
<el-row :gutter="20">
  <el-col :span="4" v-for="(item,index) in list" :key="index">
      <el-card class="card-imge" :body-style="{ padding: '0px' }">
      <img :src="item.url" class="image">
      <div class="icon-box">
          <el-tooltip :content="item.is_collected ? '取消收藏' : '收藏'" placement="top" >
            <el-button type="text" @click="collect(item)" :icon="`el-icon-star-${item.is_collected ? 'on' : 'off'}`"></el-button>
            </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="text" @click="del(item)" icon="el-icon-delete"></el-button>
            </el-tooltip>
      </div>
    </el-card>
  </el-col>
</el-row>
  <el-pagination
    layout="prev, pager, next"
    background
    @current-change="change"
    :page-size="size"
    :total="total">
  </el-pagination>
</el-card>

</template>

<script>
export default {
   name:"media",
   data() {
       return {
           menu:"全部",
           list:[],
           size:12,
           page:1,
           total:0,
           headers:{
             Authorization:`Bearer ${this.$store.state.userInfo.token}`
           }
       }
   },
   methods: {
     upSuccess(){
        this.$message.success('上传成功')
        this.loadData(1)
     },
     collect(item){
        this.$axios.put(`/mp/v1_0/user/images/${item.id}`,{
                collect:!item.is_collected
        }).then(() =>{
          item.is_collected = !item.is_collected;
          let str = item.is_collected ? '收藏成功' : '取消收藏';
          this.$message.success(str);
        })
     },
     del(item){
       this.$axios.delete(`/mp/v1_0/user/images/${item.id}`)
       .then(() =>{
         this.$message.success('删除成功');
         this.loadData(this.page);
       }).catch(()=>{
         this.$message.error('删除失败')
       })
     },
     menuChange(){
         this.loadData()
     },
     loadData(page){
         this.$axios.get(`/mp/v1_0/user/images`,{
           params:{
               collect:this.menu == '收藏',
               page,
               per_page:this.size
           }
       }).then(res =>{
           window.console.log(res);
           this.list = res.data.data.results;
           this.total = res.data.data.total_count;
       })
     },
     change(page){
       this.page = page;
       this.loadData(page);
     }
   },
   created() {
       this.loadData(1)
   },
}
</script>

<style lang="less">
     .card-imge{
         height: 180px;
         margin-bottom: 20px;


         .el-card__body{
             height: 100%;
             display: flex;
             flex-direction: column;


             img{
                 width: 100%;
                 height: 150px;

             }
             .icon-box{
                 height: 30px;
                 background-color: #f4f5f6;
                 display: flex;
                 justify-content: space-around;
                 align-items: center;
             }
             .el-button{
                 padding: 0;
             }
         }
     }
</style>