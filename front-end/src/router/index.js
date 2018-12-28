import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import resourceCenter from '@/components/resource-center'
import uploadResource from '@/components/upload-resource'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/resource-center',
      name: 'resource-center',
      component: resourceCenter
    },
    {
      path: '/upload-resource',
      name: 'upload-resource',
      component: uploadResource
    }
  ]
})
