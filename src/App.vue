<template>
  <div id="app" class="page-header-fixed page-quick-sidebar-over-content">
  	<headerline></headerline>
    <div class="clearfix"></div>
    <div class="page-container" :class="{'page-sidebar-closed':closeLeftMenu}">
      <leftmenu></leftmenu>
      <a href="javascript:;" class="page-quick-sidebar-toggler"><i class="icon-close"></i></a>
      <div class="page-content-wrapper">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headerline from '@/components/header.vue';
import leftmenu from '@/components/leftmenu.vue';
import { mapState, querystring } from 'vuex';

export default {
  name: 'app',
  components: { headerline, leftmenu },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      closeLeftMenu: state => state.layout.closeLeftMenu,
    })
  },
}
</script>

<style>
@import 'styles/bootstrap.min.css';
@import 'styles/uniform.default.css';
@import 'styles/components.css';
@import 'styles/layout.css';
@import 'styles/default.css';
@import 'styles/simple-line-icons.min.css';
@import 'styles/font-awesome.min.css';

</style>
