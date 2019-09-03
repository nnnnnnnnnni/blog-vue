import Vue from 'vue'
import Router from 'vue-router'
import index from'@/components/index'
import tags from'@/components/tags'
import categories from'@/components/categories'
import about from '@/components/about'
import articles from '@/components/articles'
import login from '@/components/login'
import admin from '@/components/admin'
import write from '@/components/write'
import permission from '@/components/permission'
import adminTag from '@/components/adminTag'
import adminCategories from '@/components/adminCategories'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/tags',
      name: 'tags',
      component: tags
    },{
      path: '/categories',
      name: 'categories',
      component: categories
    },{
      path: '/about',
      name: 'about',
      component: about
    },{
      path: '/article/:id',
      name: 'articles',
      component: articles
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/admin',
      name: 'admin',
      component: admin
    },{
      path: '/write',
      name: 'write',
      component: write
    },{
      path: '/permission',
      name: 'permission',
      component: permission
    },{
      path: '/adminTag',
      name: 'adminTag',
      component: adminTag
    },{
      path: '/adminCategories',
      name: 'adminCategories',
      component: adminCategories
    }
  ]
})
