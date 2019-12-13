//放路由

import Vue from 'vue'
//什么路径都不写,都是找的第三方包里的同名文件夹,再去找文件夹里的package.json里的main指向的js文件
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//在Vue_cli项目里@代表src的目录

import login from '@/views/login/'

import home from '@/views/home/'
import article from '@/views/home/article/'
import publish from '@/views/home/publish/'
import comments from '@/views/home/comments/'
import account from '@/views/home/account/'
import media from '@/views/home/media/'
import overview from '@/views/home/overview/'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [

    { path:"/login", component: login},
    { path:"", redirect: '/login'},
    { path:"/home", component: home,
      children:[
        {path:"/article",component:article },
        {path:"/publish",component:publish,name:'add' },
        {path:"/edit/:id",component:publish,name:'edit' },
        {path:"/comments",component:comments}, 
        {path:"/account",component:account}, 
        {path:"/media",component:media}, 
        {path:"/overview",component:overview}, 
      ]
    },

]
import store from '@/store'
const router = new VueRouter({
    routes
})
router.beforeEach((to,from,next) =>{
    nprogress.start()
    if(to.path == "/login"){
        next();
    }else{
        let str = window.localStorage.getItem('userInfo');
        if(str){
            next()
        }else{
            Vue.prototype.$message.error("请先登录!");
            //router.push("/login")
            //两个方法都能实现
            next('/login')
        }
    }
})

router.afterEach((to)=>{
    nprogress.done()

    store.commit('changArticles',to.path)
})

export default router;