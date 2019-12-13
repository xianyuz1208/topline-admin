<template>
  <el-container class="my-container">
  <el-aside class="my-aside" width="500px">
    <el-form :rules="rules" ref="form" label-position="top" :model="form" label-width="80px">
     <el-form-item prop="name" label="媒体名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
     <el-form-item  label="媒体简介">
    <el-input type="textarea" v-model="form.intro"></el-input>
  </el-form-item>
     <el-form-item  label="头条号id">
    <el-input  disabled :value="form.id+''"></el-input>
  </el-form-item>
     <el-form-item  label="绑定手机">
    <el-input  disabled v-model="form.mobile"></el-input>
  </el-form-item>
     <el-form-item prop="email" label="邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
    </el-form>
      <el-button type="primary" @click="save">保存更新</el-button>
  </el-aside>
  <el-main>
 <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
  :show-file-list="false"
  :http-request="myUpload"
  >
  <img v-if="form.photo" :src="form.photo" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-main>
</el-container>
</template> 

<script>
export default {
   name:'account',
   data() {
       return {
           form:{
            name:"",
            intro:"",
            mobile:"",
            email:"",
            photo:""
           },
           rules:{
             name:[
               {required:true,message:'昵称为必填项哦!',trigger:'blur'},
               {min:1,max:7,message:"昵称的长度在1-7个字数之间",trigger:'blur'}
             ],
             email:[
                {required:true,message:'邮箱还是必填项哦!',trigger:'blur'}
             ]
           }
       }
   },
   created() {
       this.$axios.get(`/mp/v1_0/user/profile`).then((res) =>{
          //  window.console.log(res);
           this.form = res.data.data;
       })
   },
   methods: {
       save(){
         this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$axios.patch(`/mp/v1_0/user/profile`,this.form).then(()=>{
               this.$message.success('更新成功');
               this.$store.commit('changeUserInfo',this.form)
           }).catch(()=>{
               this.$message.error('更新失败')
           })
          } else { 
            return false;
          }
        });
       },
    myUpload(config){
        let fm = new FormData();
        fm.append('photo',config.file);
        this.$axios.patch(`/mp/v1_0/user/photo`,fm).then((res)=>{
           this.form.photo = res.data.data.photo;
        })
    }
   },
}
</script>

<style lang="less">
   .my-container{
       background-color: #fff;
       padding: 0 20px;
       height: 100%;
       overflow: hidden;
   }
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 20px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>