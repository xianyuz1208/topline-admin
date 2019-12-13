<template>
  <div class="login-wrap">
    <div class="login">
      <div class="logo">
        <img src="./images/login_logo.png" alt />
      </div>
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button :disabled="btnDisabled" @click="getCode">{{ btnText }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <a href="javascript:void(0)">用户协议</a>
            与
            <a href="javascript:void(0)">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="enter" :loading="isLoad"  @click="doLogin">{{ msg }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      msg:"登录",
      isLoad:false,
      btnDisabled: false,
      btnText: "获取验证码",
      form: {
        mobile: "18801185985",
        code: "246810",
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: "0?(13|14|15|18)[0-9]{9}",
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 6, message: "验证码不能为空", trigger: "blur" }
        ],
        checked: [
          { pattern: /true/, message: "必须同意隐私条款", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    getCode() {
      this.btnDisabled = true;
      let sec = 60;
      this.btnText = "还有60秒";

      let timerId = setInterval(() => {
        if (sec == 59) {
          this.form.code = "246810";
        }
        sec--;

        this.btnText = "还有" + sec + "秒";

        if (sec == 0) {
          clearInterval(timerId);
          this.btnText = "获取验证码";
          this.btnDisabled = false;
        }
      }, 1000);
    },
    doLogin() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.isLoad = true;
          this.msg = "正在登录中...";
          this.$axios
            .post(`mp/v1_0/authorizations`, {
              mobile: this.form.mobile,
              code: this.form.code
            })
            .then(res => {
              //   window.console.log(res);
              // window.localStorage.setItem('userInfo',JSON.stringify(res.data.data));
              this.$store.commit("changeUserInfo", res.data.data);
              this.$message.success("登录成功");
              this.$router.push("/home");
            })
            .catch(() => {
              this.msg = "登录";
              this.isLoad = false;
              this.$message.error("手机号或验证码错误!");
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
.login-wrap {
  height: 100%;
  background: url("./images/login_bg.jpg") no-repeat center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 300px;
    background-color: white;
    padding: 30px 30px;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 150px;
      }
    }
    .enter {
      width: 100%;
    }
  }
}
</style>