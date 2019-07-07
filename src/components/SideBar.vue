<template>
  <div id="SideBar">
    <div class="panel">
      <div class="header">作者</div>
      <div class="content" v-if="isloaded">
        <div class="msg">
          <router-link
            :to="{
              name: 'user',
              params:{
                loginname: userinfo.loginname
            }}"
          >
            <img class="avatar" :src="userinfo.avatar_url" />
          </router-link>
          <router-link
            :to="{
              name: 'user',
              params:{
                loginname: userinfo.loginname
            }}"
          >
            <a class="name">{{userinfo.loginname}}</a>
          </router-link>
        </div>

        <div class="msg">积分：{{userinfo.score}}</div>
        <div class="msg">
          github：
          <a :href="githubUrl" target="_blank">@{{userinfo.githubUsername}}</a>
        </div>
        <div class="msg">注册时间：{{userinfo.create_at | formatDate}}</div>
      </div>
    </div>

    <div class="panel">
      <div class="header">最近创建的话题</div>
      <div class="content" v-if="isloaded">
        <ul>
          <li class="topic" v-for="(topic,index) in userinfo.recent_topics" :key="index">
            <router-link
              :to="{
              name: 'post_content',
              params: {
                id: topic.id,
                loginname: topic.author.loginname
              }
            }"
            >
              <a>{{topic.title}}</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="panel">
      <div class="header">最近参与的话题</div>
      <div class="content" v-if="isloaded">
        <ul>
          <li class="topic" v-for="(topic,index) in userinfo.recent_replies" :key="index">
            <router-link
              :to="{
              name: 'post_content',
              params: {
                id: topic.id,
                loginname: topic.author.loginname
              }
            }"
            >
              <a>{{topic.title}}</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      userinfo: {},
      isloaded: false
    };
  },
  props: ["size"],
  computed: {
    githubUrl() {
      return `https://github.com/${this.userinfo.githubUsername}`;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(res => {
          this.userinfo = res.data.data;
          if (this.size != 'big') {
            this.userinfo.recent_topics.splice(5);
            this.userinfo.recent_replies.splice(5);
          }
          console.log(this.userinfo);
          this.isloaded = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  }
};
</script>

<style scoped>
</style>

<style>
#SideBar {
  width: 300px;
  margin-left: 20px;
}
.panel {
  margin-bottom: 20px;
  border-radius: 5px;
}
.panel .header {
  background: #f6f6f6;
  padding: 10px 15px;
  border-radius: 5px 5px 0 0;
}
.panel .content {
  background: #fff;
  padding: 10px 15px;
  border-radius: 0 0 5px 5px;
}
.panel .content a {
  color: #80bd01;
}
.panel .content .name {
  margin-left: 10px;
}
.panel .content a:hover {
  text-decoration: underline;
}
.panel .content img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
}
.panel .content .msg {
  margin-bottom: 10px;
}
.panel .content .topic {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
</style>
