<template>
  <div class="Header">
    <div class="container">
      <router-link :to="{name:'main'}">
        <img class="logo" src="../assets/cnodejs_light.svg" />
      </router-link>
      <ul class="nav">
        <li>
          <router-link :to="{name:'main'}">
            <a href="/">首页</a>
          </router-link>
        </li>
        <li>
          <el-button type="text" @click="showAbout = true">关于</el-button>
        </li>
      </ul>
    </div>
    <el-dialog title="关于" :visible.sync="showAbout" width="30%" center>
      <div class="about">
        <p>
          作者：
          <a href="https://github.com/BrendanFich" target="_blank">陈俊坚</a>
        </p>
        <p>
          源码：
          <a href target="_blank">VueCnode</a>
        </p>
        <p>技术栈：Vue,Vue Router,ElementUI,Axios</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAbout = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showAbout: false
    };
  }
};
</script>
  
<style scoped>
.Header {
  background: #444;
  height: 60px;
  margin-bottom: 10px;
}

.Header .logo {
  min-width: 120px;
  padding: 6px;
  vertical-align: center;
}
.nav li {
  display: inline-block;
  margin: 0 10px;
}
.nav li a,
.nav li .el-button {
  font-size: 16px;
  display: block;
  color: #ccc;
  padding: 8px 12px;
}
.nav li a:hover,
.nav li .el-button:hover {
  color: #fff;
}
.about p {
  font-size: 16px;
  line-height: 2em;
}
.about a {
  color: #80bd01;
}
</style>
<style>
.container {
  height: 40px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
