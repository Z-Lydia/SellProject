import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Customer from '@/views/Customer'
import Search from '@/views/Search'
import List from '@/views/List'
import Order from '@/views/Order'
import Submit from '@/views/Submit'
import Detail from '@/views/Detail'
import Connect from '@/views/Connect'

Vue.use(Router)

export default new Router({
  //mode: 'history',//'hash'则一切正常
  routes: [
    {
      path: '/', //loading
      name: 'Home',
      component: Home
    },
    {
      path: '/search', //查询页
      name: 'Search',
      component: Search
    },
    {
      path: '/list', //缴款列表页
      name: 'List',
      component: List
    },
    {
      path: '/order/:id', //收单页
      name: 'Order',
      component: Order
    },
    {
      path: '/submit', //提交页
      name: 'Submit',
      component: Submit
    },
    {
      path: '/detail/:id', //详情页
      name: 'Detail',
      component: Detail
    },
    {
      path: '/connect', //账号关联
      name: 'Connect',
      component: Connect
    }
  ]
})
