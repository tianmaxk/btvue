import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/modules/home'
import Order from '@/modules/order'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
]

const router = new Router({
  routes
});

router.afterEach(function(route) {
  try{
      //刷新页面时执行该方法
      route.matched[0].instances.default.refresh();
  }catch(e){}
})

export default router