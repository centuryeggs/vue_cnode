import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    pageNum:1
  },
  mutations: {
    toFirstPage(state){
      state.pageNum = 1
    },
    prevPage(state){
      state.pageNum--;
    },
    nextPage(state){
      state.pageNum++;
    },
    prevFivePages(state){
      state.pageNum = state.pageNum - 5;
    },
    nextFivePages(state){
      state.pageNum = state.pageNum + 5;
    }
  }
})