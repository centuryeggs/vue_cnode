<template>
  <div class="Article">
    
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div class="container" v-else>

      <div class="content">
        <div id="topic">
          <div class="topic_header">
            <div class="topic_title">
              <span :class="[{put_good:post.good,put_top:post.top}]">{{post | tabArticleFormatter}}</span>
              {{post.title}}
            </div>
            <ul class="topic_info">
              <li>•发布于{{post.last_reply_at | formatDate}}</li>
              <li>•作者:{{post.author.loginname}}</li>
              <li>•{{post.visit_count}}次浏览</li>
              <li>•来自{{post | tabFormatter}}</li>
            </ul>
          </div>
          <div class="topic_content">
            <div v-html="post.content"></div>
          </div>
        </div>
        <dir id="reply">
          <div class="tobar">{{post.replies.length}} 回复</div>
          <div v-for="(reply,index) in post.replies" :key="index" class="replySec" :id="reply.id">
            <div class="replyUp">
              <router-link
                :to="{
            name:'user',
            params:{
              loginname: reply.author.loginname
            }}"
              >
                <img :src="reply.author.avatar_url" class="author_avatar" />
                <span class="reply_author">{{reply.author.loginname}}</span>
              </router-link>
              <span class="reply_time">
                <a :href="'#'+reply.id">{{index+1}}楼•{{reply.create_at | formatDate}}</a>
              </span>
              <span class="put_good" v-if="post.author.loginname == reply.author.loginname">作者</span>
            </div>
            <div v-html="reply.content" @click="changeHref"></div>
          </div>
        </dir>
      </div>

      <SideBar></SideBar>

    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
export default {
  name: 'Article',
  data() {
    return {
      isLoading: false,
      post: {}
    };
  },
  components: { SideBar },
  created() {
    this.isLoading = true;
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.post = res.data.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error)
        });
    },
    //因为使用了hash模式，url存在#，而返回数据中a链接的href中缺少#
    //故给回复中@用户名的其href增加#，实现点击跳转至User页面
    changeHref(event){
      let start = event.target.innerText.indexOf('@')
      let nameArr = event.target.innerText.split('')
      nameArr.shift()
      if(start == 0){
        event.target.setAttribute("href","/#/user/"+ nameArr.join('')); 
      }
    }
  }
};
</script>

<style>
@import url("../assets/markdown-github.css");
.content {
  flex: 1;
  max-width: 1080px;
}
#topic,
#reply {
  margin-bottom: 30px;
  background: #fff;
  border-radius: 5px;
}
.topic_header {
  padding: 10px 30px;
  border-bottom: 1px solid #e5e5e5;
}

.topic_title {
  font-size: 22px;
  font-weight: bold;
  margin: 8px 0;
}

.topic_info {
  list-style: none;
}

.topic_info li {
  display: inline-block;
  font-size: 14px;
  color: #838383;
  padding-right: 5px;
}

.topic_content {
  padding: 10px 30px;
}
.topic_content .markdown-text {
  padding: 10px;
}

.topic_content .markdown-text img {
  max-width: 100%;
}

#reply .tobar {
  padding: 15px 20px;
  background-color: #f6f6f6;
  font-size: 16px;
  border-radius: 5px 5px 0 0;
}
#reply .replyUp {
  padding: 0px 10px;
}

#reply .author_avatar {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -15px;
  border-radius: 5px;
}

#reply a {
  color: #08c;
  text-decoration: none;
}
#reply .reply_author {
  font-size: 12px;
  font-weight: 700;
  padding-left: 10px;
  color: #666;
  margin-right: 5px;
}
#reply .reply_time {
  margin-right: 5px;
  font-size: 12px;
}

.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px 10px 10px;
}

#reply .replySec .markdown-text {
  padding: 10px 0 20px 50px;
}

.Article .loading {
  background-color: #e1e1e1;
}
</style>
