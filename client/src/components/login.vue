<template>
  <el-row type="flex" justify="center">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" status-icon prop="password">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-upload" @click="login">登录</el-button>
        <el-button type="primary" icon="el-icon-back" @click="goback">返回</el-button>
      </el-form-item>
   
    </el-form>
  </el-row>
</template>

<script>
export default {

  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login() {
    
      this.$refs.loginForm.validate((value) => {
        if (value) {

          //此处直接写明地址，特别要注意端口，是前端想后端提交表单，所以一定要写服务器端口
          this.$http.post('/api/login',this.user).then((res)=>{
            if(res.data){   
              this.$store.dispatch('login',res.data).then(()=>{
                this.$notify({
                  type:'success',
                  message:"欢迎你，"+res.data.username+" !",
                  duration:3000
                })
              this.$router.replace('/')
              this.$store.state.doneOrNot=1
              console.log("成功登陆")
              })
            }else{
              this.$store.state.doneOrNot=0
              this.$message({
                type:'error',
                message:'用户名或密码错误',
                showClose:true
              })
            }
          }).catch((err)=>{
              console.log("出错")
              this.$store.state.doneOrNot=0
              this.$message({
              type:'error',
              message:"网络错误，请重试",
              showClose:true
            })
          })
        } else{
          this.$store.state.doneOrNot=0
          return false
          }
      })
    
    },
    goback(){
      this.$router.replace('/')
    }
  }
}
</script>