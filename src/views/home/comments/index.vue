<template>
 <div>
     <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="180"></el-table-column>
    <el-table-column prop="comment_status" label="评论状态" width="180">
       <template slot-scope="scope">
         {{ scope.row.comment_status ? '正常' : '关闭'}}
       </template>
    </el-table-column>
    <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
    <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
    <el-table-column  label="允许评论">
      <template slot-scope="scope">
        <el-switch
        v-model="scope.row.comment_status"
        @change="doChange(scope.row.id,$event)"
         active-color="#13ce66"
          inactive-color="#ff4949"></el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template>
        <el-button type="primary" size="mini" plain>修改</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      :current-page.sync="page"
      @current-change="pageChange"
      @size-change="sizeChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
export default {
  name:"comments",
  data() {
   return{
     tableData:[],
     total:0,
     page:1,
     per_page:10
   }
  },
  created() {
    this.loadData(1)
  },
  methods: {
    loadData(page,per_page){
    this.$axios.get(`/mp/v1_0/articles`,{
      params:{
        response_type:'comment',
        page,
        per_page,
      }
    }).then( res =>{
      // window.console.log(res)
      this.tableData = res.data.data.results;
      this.total = res.data.data.total_count;
    })
    },
    doChange(id,val){
      this.$axios.put(`/mp/v1_0/comments/status`,{
         allow_comment:val
      },{
          params:{
           article_id:""+id
         }
      }).then( () =>{
        this.$message.success('修改成功')
      }).catch(()=>{
        this.$message.error('修改失败')
      })
    },
    pageChange(page){
      this.loadData(page)
    },
    sizeChange(size){
      window.console.log(size)
      // this.page = 1
      this.loadData(this.page,size)
    }
  },
};
</script>

<style>
</style>