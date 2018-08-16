<template>
  <el-container>
    <el-header class="header" height="100px">
      <h1>注册登录模板</h1>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.header {
  background-color: #409eff;
  color: white;
}
</style>