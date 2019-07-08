import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main'
import Article from '../views/Article'
import User from '../views/User'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => {
    return { x: 0, y: 0 }
  },
  mode: 'history',
  routes: [
    {
      name: 'main',
      path: '/',
      components: {
        main: Main
      }
    },
    {
      name: 'user',
      path: '/user/:loginname',
      components: {
        main: User
      }
    },
    {
      name: 'post_content',
      path: '/topic/id=:id&author=:loginname',
      components: {
        main: Article
      }
    }
  ]
})