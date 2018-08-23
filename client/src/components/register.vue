<template>
  <el-row type="flex" justify="center">
    <el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" placeholder="请输入5到10位"></el-input>
      </el-form-item>
      <el-form-item label="密码" status-icon prop="password" >
        <el-input v-model="user.password" type="password" placeholder="请输入6到15位"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" status-icon prop="conform" >
        <el-input v-model="user.conform" type="password" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-upload" @click="register">完成</el-button>
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
        username: { required: true, message: "用户名不能为空", trigger: "blur" },
        password: { required: true, message: "密码不能为空", trigger: "blur" },
        conform: { required: true, message: "两次输入的密码不一致", trigger: "blur" }
      }
    }
  },
  mounted(){
  
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((value) => {
        if (value) {
          this.$http.post('/api/register', this.user).then((res) => {
            // console.log(res.data.msg)
            // console.log(this.$store.state.doneOrNot)
            if (this.user) {
              this.$store.dispatch('register', this.user).then(() => {
                if(res.data.msg){
                  this.$store.state.doneOrNot=0
                  this.$message({
                    type:"error",
                    message:"此用户已存在",
                    showClose:true
                  })
                }else{
                  if(res.data.warn_username_length){
                    this.$notify({
                      type:"error",
                      message:"请输入5到10位用户名",
                      showClose:false
                    })
                  }else if (res.data.warn_password_length){
                      this.$notify({
                        type:"error",
                        message:"请输入6到15位密码",
                        showClose:false
                    })
                  }else{
                    if(this.user.password!=this.user.conform){
                      this.$store.state.doneOrNot=0
                      this.$message({
                        type:"error",
                        message:"两次密码不相同，请重新输入",
                        showClose:true
                      })
                    }else{
                      this.$notify({
                        type: 'success',
                        message: "注册成功," + "用户名:" + this.user.username + "," + "密码:" + this.user.password,
                        duration: 3000
                      })
                      this.$router.replace('/')
                      this.$store.state.doneOrNot=1
                      console.log("前端:注册成功")
                      console.log(res.data)
                    }
                  }
                }               
              })
              
            } else {
              console.log('前端：用户名或密码不能为空！')
              this.$store.data.doneOrNot=0
              this.$message({
                type: 'error',
                message: '用户名或密码不能为空',
                showClose: true
              })
            }
          }).catch((err) => {
            console.log(err)
            this.$store.state.doneOrNot=0
            this.$message({
              type: 'error',
              message: '注册过程错误',
              showClose: true
            })
          })

        } else {
          console.log('用户名或密码不能为空')
          this.$store.state.doneOrNot=0
          return false
        }

      })

    },
    goback() {
      this.$router.replace('/')
    },

  }


}
</script>
<style>
</style>
