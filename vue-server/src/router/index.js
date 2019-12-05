import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let router= new Router({
  routes: [{
    path: '/base',
    name: 'base',
    component: () => import('@/view/base'),
    children: [{
      path: 'fxuser',
      name: 'fxuser',
      component: () => import('@/components/fenxi/user.vue'),
    }, {
      path: 'fxorder',
      name: 'fxorder',
      component: () => import('@/components/fenxi/order.vue'),
    }, ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login')
  }, {
    path: '/',
    redirect: '/base/fxorder'
  }]
})

// 全局路由守卫--验证token
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('channeltoken')?JSON.parse(localStorage.getItem('channeltoken')).token:''
   if(to.name!='login'){
     axios.get('/checktoken',{
       headers:{token:token}
     }).then(res=>{
      //  console.log(res.data)
      if(res.data.err_code==200){
        next()
      }else{
        router.push({name:'login'})
      }
       
     })
   }  else{
     next()
   }
})

export default router;
