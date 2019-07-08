<template>
  <div class="Main">
    <div class="posts">
      <Pagination></Pagination>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="精华" name="good"></el-tab-pane>
        <el-tab-pane label="分享" name="share"></el-tab-pane>
        <el-tab-pane label="问答" name="ask"></el-tab-pane>
        <el-tab-pane label="招聘" name="job"></el-tab-pane>
        <post-list :tab="activeName"></post-list>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
export default {
  name: "Main",
  data() {
    return {
      activeName: "all",
    };
  },
  methods: {
    handleClick() {
      this.$store.commit('toFirstPage')
    }
  },
  components: { PostList,Pagination}
};
</script>

<style scoped>
.Main {
  margin-bottom: 18px;
}
.posts {
  background: #e1e1e1;
  margin: 0 auto;
  max-width: 1400px;
  border-radius: 4px;
}
</style>

<style>
.put_good,
.put_top {
  background: #80bd01;
  padding: 3px 5px;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
}
.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
}
</style>
