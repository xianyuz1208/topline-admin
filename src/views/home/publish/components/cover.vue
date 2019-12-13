<template>
<div>
<div class="cover" @click="dialogVisible=true">
  <img style="width:100%;height:100%" v-if="url" :src="url" alt="">
<div v-else>
<h2>点击选择图片</h2>
<i class="el-icon-picture-outline"></i>
</div>
</div>

 <el-dialog :visible.sync="dialogVisible" width="45%">
    <el-tabs v-model="activeName">
      <el-tab-pane label="上传图片" name="one">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          name="image"
          :headers = "headers"
          :on-success ="uploadOk"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="媒体库" name="two">
        <media @image-change='imageUrl = $event'></media>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doOk">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import media from './media';
export default {
   components:{
       media
   },
     props:['url'],
     model:{
        prop:"url",
        event:'img-change'
     },
     created() {
       this.imageUrl = this.imags;
     },
   data(){
        return{
       headers: {
        Authorization: `Bearer ${this.$store.state.userInfo.token}`
      },
       dialogVisible: false,
       activeName: "one",
       imageUrl:"",
      //  url:"",
    }
},
    methods: {
      doOk(){
        // this.url = this.imageUrl;
        this.dialogVisible = false;
        this.$emit('img-change',this.imageUrl)
      },
      //参数1:是文件上传成功后的响应体
      uploadOk(response){
        window.console.log(response);
       this.imageUrl = response.data.url;
      }
    },
}
</script>

<style lang="less" scoped>
  .cover{
      width: 200px;
      height: 200px;
      border:1px solid #ddd;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      i{
          font-size: 120px;
          color:#ccc;
      }
  }
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
  /deep/.el-card__header{
    padding: 0;
  }
</style>