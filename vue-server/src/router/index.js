import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      name: 'base',
      component:()=> import ('@/view/base')
    }, {
      path: '/login',
      name: 'login',
      component:()=> import ('@/view/login')
    },
  ]
})
