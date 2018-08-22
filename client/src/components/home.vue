<template>
    <div>
        <h1>home</h1>
        <div v-if="user!=null && this.$store.state.doneOrNot==1">{{user.username}}
          <el-button type="primary"  @click="logout()">注销</el-button>
        </div> 
        <div v-else> 
        <el-button type="success" @click="login()">登录</el-button>
        <el-button type="primary" @click="register()">注册</el-button>
       
       </div>
    </div>
</template>

<script>
    export default {
    
        methods: {
        
            login () {
                this.$router.replace('/login')
            },
            logout(){
              this.$store.dispatch('logout').then(()=>{
                this.$router.replace('/')
              })
             
            },
            register(){
              this.$router.replace('/register')
            }
        },
        computed:{
          user(){
            return this.$store.state.user
          }
    
      }
    }
</script>
