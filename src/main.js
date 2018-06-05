// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    layout:{
      closeLeftMenu:false,
      showMenuInPhone:false,
    }
  },
  mutations: {
    onOpenLeftMenu (state) {
      state.layout.closeLeftMenu = false;
    },
    onCloseLeftMenu (state) {
      state.layout.closeLeftMenu = true;
    },
    onHideMenuInPhone (state) {
      state.layout.showMenuInPhone = false;
    },
    onShowMenuInPhone (state) {
      state.layout.showMenuInPhone = true;
    },
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
