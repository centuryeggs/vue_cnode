<template>
  <div id="app">
    <Header></Header>
    <router-view name="main" :key="$route.path"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components:{
    Header
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
li{ 
  list-style: none;
}
#app {
  font-family: Arial, Helvetica, sans-serif; 
  word-break: break-all;
}
html {
  background: #e1e1e1;
}
</style>