<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-else>
      <div class="post" v-for="post in posts" :key="post.id">
        <router-link :to="{
          name: 'user',
          params:{
            loginname: post.author.loginname
          }}">
          <img :src="post.author.avatar_url"/>
        </router-link>
        <span class="reply_visit_count">
          <span class="reply_count">{{post.reply_count}}</span>
          /{{post.visit_count}}
        </span>
        <span
          :class="[{put_good:post.good,put_top:post.top,'topiclist-tab': !post.good  && !post.top}]"
        >{{post | tabFormatter}}</span>
        <router-link
          :to="{
                name: 'post_content',
                params: {
                  id: post.id,
                  loginname: post.author.loginname
                }}"
        >
          <span class="title">{{post.title}}</span>
        </router-link>
        <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
      isLoading: false
    };
  },
  computed: {
    pageNum(){
      return this.$store.state.pageNum
    }
  },
  created() {
    this.isLoading = true
    this.getData(this.pageNum, this.tab);
  },
  methods: {
    getData(page, tab) {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: page,
            limit: 20,
            tab: tab
          }
        })
        .then(res => {
          this.posts = res.data.data
          this.isLoading = false
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props: ["tab"],
  watch: {
    tab(tab) {
      this.isLoading = true
      this.getData(this.pageNum, tab);
    },
    pageNum() {
      this.isLoading = true
      this.getData(this.pageNum, this.tab);
    }
  }
};
</script>

<style scoped>
.post {
  background: #fff;
  padding: 10px;
}
.post:hover {
  background: #f5f5f5;
}
.post .title:hover {
  text-decoration: underline;
}
.post span {
  line-height: 30px;
  margin: 0 5px;
}
.post img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
  border-radius: 4px;
}
.post .reply_visit_count {
  display: inline-block;
  width: 90px;
  font-size: 14px;
  text-align: center;
}
.post .reply_count {
  color: #409eff;
}
.post a {
  color: black;
}

.post .last_reply {
  text-align: right;
  min-width: 50px;
  display: block;
  float: right;
  color: #778087;
  font-size: 12px;
}
.post .title {
  max-width: calc(100% - 244px);
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  line-height: 30px;
  overflow: hidden;
}
</style>
<style>
.loading {
  text-align: center;
  height: 100vh;
  padding-top: 300px;
  background-color: #fff;
  margin: 0 auto;
}
.loading img {
  vertical-align: middle;
}
</style>
