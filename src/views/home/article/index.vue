<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- <el-select v-model="form.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="item in channelList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select> -->
           <channel v-model="form.channel_id"></channel>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="doSearch">筛选</el-button>
      </el-form>
    </div>
    <p>共找到{{ tobel }}条符合条件的内容</p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cover.images[0]" label="封面" width="280">
        <template slot-scope="scope">
          <img v-for="(item,index) in scope.row.cover.images" :src="item" :key="index" style="width:60px;" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.status | formatStatus }}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"></el-table-column>
      <el-table-column prop="address" label="操作">
       <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push(`/edit/${scope.row.id}`)">修改</el-button>
          <el-button size="mini" type="danger" @click="doDel(scope.row.id)">删除</el-button>
       </template>
      </el-table-column>
    </el-table>
     <el-pagination
      background
      @current-change="pageChange"
      layout="total, prev, pager, next"
      :total="tobel">
    </el-pagination>
  </el-card>
</template>

<script>
import channel from '../component/channel.vue'
export default {
  name: "articles",
  components:{
     channel
  },
  data() {
    return {
      form: {
        status: "",
        channel_id: "",
        date: []
      },
      total: 0,
      tableData: [],
      channelList: [],
      tobel:0,
    };
  },
  created() {
    // this.$axios.get(`/mp/v1_0/channels`).then(res => {
    //   // window.console.log(res);
    //   this.channelList = res.data.data.channels;
    // });
    this.loadData(1);
  },
  filters:{
     formatStatus(val){
         switch(val){
             case 0:
                 return "草稿";
            case 1:
                return "待审核";
            case 2:
                return "审核通过";
            case 3:
                return "审核失败";

         }
     }
  },
  methods: {
      doDel(id){
        this.$confirm('此操作将不可逆', '是否继续?', {
          type: 'warning'
        }).then(() => {
          window.console.log(id);
        this.$axios.delete(`/mp/v1_0/articles/${id}`).then(() =>{
           this.loadData(1);
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(()=>{
            this.$message({
                type:" error",
                message:"删除失败"
            })
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    doSearch(){
    this.loadData(1)
    },
     pageChange(page){
         this.loadData(page);
     }, 
    loadData(page){
    let token = JSON.parse(window.localStorage.getItem("userInfo")).token;
    this.$axios.get(`/mp/v1_0/articles`, {
        headers:{
         Authorization:`Bearer ${token}`
        },
        params:{
            status:this.form.status === "" ? undefined : this.form.status,
            channel_id:this.form.channel_id === "" ? undefined : this.form.channel_id,
            begin_pubdate:this.form.date[0],
            end_pubdate:this.form.date[1],
            page,
            per_page:10
        }
    }).then(res => {
    //   window.console.log(res);
      this.tableData = res.data.data.results;
      this.tobel = res.data.data.total_count;
    });
      }
  },
};
</script>

<style>
</style>