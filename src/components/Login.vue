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
      this.$refs.loginForm.validate((value) => {
        if (value) {
          if (this.user.name == 'admin' && this.user.password == "123") {
            this.$store.dispatch('login', this.user).then(() => {
              this.$notify({
                type: 'success',
                message: '欢迎你,' + this.user.name + '!',
                duration: 3000
              })
              this.$router.replace('/')
            })

          } else {
            console.log(this.user.name + this.user.password)
            this.$message({
              type: 'error',
              message: "用户名或密码错误",
              showClose: true
            })
          }
        } else {
          return false
        }
      })
    }
  }}
</script>