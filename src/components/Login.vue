<template>
  <el-row type="flex" justify="center">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" status-icon prop="password">
        <el-input v-model="user.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
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
        name: [
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
    
      this.$refs.loginForm.validate((valid) => {
        if (valid) {

          //此处直接写明地址，特别要注意端口，是前端想后端提交表单，所以一定要写服务器端口
          this.$http.post('http://localhost:3000/users/validate',this.user).then((res)=>{
            if(res.data){   
              console.log("res.data.name 是  "+res.data.name)
              console.log("this.user.name 是 "+this.user.name)
              console.log("res.data.password 是  "+res.data.password)
              console.log("this.user.password 是 "+this.user.password)
              console.log(res.data)
             
              this.$store.dispatch('login',res.data).then(()=>{
                this.$notify({
                  type:'success',
                  message:"欢迎你，"+res.data.name+" !",
                  duration:3000
                })
              this.$router.replace('/')
              console.log("成功登陆")
              })
            }else{
              // console.log("用户名或密码错误")
              // console.log(this.user)
             
              this.$message({
                type:'error',
                message:'用户名或密码错误',
                showClose:true
              })
            }
          }).catch((err)=>{
            //在判断登陆的逻辑中任何地方出错会立即转到这里
            console.log("出错")
            this.$message({
              type:'error',
              message:"网络错误，请重试",
              showClose:true
            })
          })
        } else{
          return false
          }
      })
    
    }
  }
}
</script>