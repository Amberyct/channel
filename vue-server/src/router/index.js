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
    },  {
      path: 'limitlist',
      name: 'limitlist',
      component: () => import('@/components/limit/list.vue'),
    },  {
      path: 'limitadd',
      name: 'limitadd',
      component: () => import('@/components/limit/add.vue'),
    },  {
      path: 'useradd',
      name: 'useradd',
      component: () => import('@/components/user/add.vue'),
    }, {
      path: 'userlist',
      name: 'userlist',
      component: () => import('@/components/user/list.vue'),
    },  {
      path: 'useredit/:id',
      name: 'useredit',
      component: () => import('@/components/user/edit.vue'),
    },  {
      path: 'adminlist',
      name: 'adminlist',
      component: () => import('@/components/admin/list.vue'),
    },  {
      path: 'adminadd',
      name: 'adminadd',
      component: () => import('@/components/admin/add.vue'),
    },  {
      path: 'adminedit/:id',
      name: 'adminedit',
      component: () => import('@/components/admin/edit.vue'),
    },
  ]
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
  let id = JSON.parse(localStorage.getItem('channeltoken')).id
   if(to.name!='login'){
     axios.get('/checktoken',{
       headers:{token:token}
     }).then(res=>{
      //  console.log(res.data)
      if(res.data.err_code==200){
        console.log(id)
        axios.get('/checklimit',{params:{id:id,name:to.name}}).then(val=>{
          console.log(val)
        })
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
