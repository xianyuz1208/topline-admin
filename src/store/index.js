import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //从localStorage取出userInfo,如果有就赋值给userInfo,如果没有就返回一个空对象赋值给userInfo
        //如果不给空对象,会取出null,null无法赋值,那会报错
        userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || {},
        Uparticles:""
    },
    mutations: {
      changeUserInfo (state,obj) {
        Object.assign(state.userInfo,obj);
        //从state仓库的userInfo取出转成JSON字符串存入localStorage
        window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      },
     changArticles(state,articles){
      state.Uparticles = articles
     }
    }
  })
