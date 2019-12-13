<template>
  <el-form :rules="rules" ref="form" :model="form" label-width="80px" class="my-form">
    <el-form-item prop="title" label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <quillEditor class="ql-editor" v-model="form.content"></quillEditor>
    </el-form-item>
    <el-form-item label="封面">
    <el-radio-group v-model="form.cover.type">
    <el-radio :label="1">单图</el-radio>
    <el-radio :label="3">三图</el-radio>
    <el-radio :label="0">无图</el-radio>
    <el-radio :label="-1">自动</el-radio>
  </el-radio-group>
     <el-row :gutter="10" v-if="form.cover.type > 0 ">
       <el-col :span="5" v-for="(item,index) in form.cover.type" :key="index">
         <!-- <cover :url="form.cover.images[index]" @img-change="form.cover.images[index] = $event"></cover> -->
         <cover v-model="form.cover.images[index]"></cover>
       </el-col>
     </el-row>
    </el-form-item>
    <el-form-item label="频道">
      <channel v-model="form.channel_id"></channel>
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="send(true)">保存草稿</el-button>
      <el-button size="small" type="primary" @click="send(false)">发布...</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import channel from "../component/channel.vue";
import cover from './components/cover'
export default {
  name: "publish",
  components: {
    quillEditor,
    channel,
    cover
  },
  data() {
    return {
      isRouter: true,
      form: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: []
        },
        channel_id: ""
      },
      oldForm: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: []
        },
        channel_id: ""
      },
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "标题长度在5-30个字数之间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    send(isDraft) {
      this.isRouter = false;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.cover.images.length = this.form.cover.type < 0 ? 0 : this.form.cover.type;
          if (this.$route.name == "edit") {
            const id = this.$route.params.id;
            this.$axios
              .put(`/mp/v1_0/articles/${id}`, this.form)
              .then(() => {
                this.$message.success("修改成功");
                // ------------------------
                this.$store.commit('changArticles','/article')
                this.$router.push("/article");
              })
              .catch(() => {
                this.$message.error("修改失败");
              });
          } else {
            this.$axios
              .post(`/mp/v1_0/articles`, this.form, {
                params: {
                  draft: isDraft
                }
              })
              .then(() => {
                this.$message.success("新增成功");
                this.$store.commit('changArticles','/article')
                this.$router.push("/article");
              })
              .catch(() => {
                this.$message.error("新增失败");
              });
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    loadData() {
      const id = this.$route.params.id;
      this.$axios.get(`/mp/v1_0/articles/${id}`).then(res => {
        //  window.console.log(res);
        this.form = res.data.data;
        this.oldForm.title = this.form.title;
        this.oldForm.content = this.form.content;
      });
    }
  },
  watch: {
    "$route.params.id"() {
      if (this.$route.name == "edit") {
        this.loadData();
      } else {
        this.form.title = this.form.channel_id =  this.form.content = "";
        this.oldForm.title = this.oldForm.channel_id = this.oldForm.content =  "";
        this.form.cover.images = [];
        this.form.cover.type  =1;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // if (
    //   this.form.title != this.oldForm.title || this.form.content != this.oldForm.content
    // ) {
    //   this.$confirm("此页面有所改动,是否离开?", "是否继续").then(() => {
    //     next();
    //   });
    // } else {
    //   next();
    // }
    if (this.isRouter) {
      if (
        this.form.title != this.oldForm.title ||
        this.form.content != this.oldForm.content
      ) {
        this.$confirm("此页面有所改动,是否离开?", "是否继续").then(() => {
          next();
        }).catch(()=>{
          next(from.path)
        })
        
      } else {
        next();
      }
    }else{
      // this.isRouter = true;
      next()
    }
  },
  created() {
    //  const id= this.$route.params.id;
    //  this.$axios.get(`/mp/v1_0/articles/${id}`)
    //  .then( res =>{
    //   //  window.console.log(res);
    //    this.form = res.data.data;
    //  } )
    if (this.$route.name === "edit") {
      this.loadData();
    }
  }
};
</script>

<style lang="less" scoped>
.my-form {
  padding-top: 30px;
  padding-right: 30px;

 /deep/.quill-editor .ql-editor {
    height: 300px !important;
  }
}
</style>