<template>
  <!-- BEGIN SIDEBAR -->
	<div class="page-sidebar-wrapper" :class="{'page-sidebar-closed':!menuOpen}">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar navbar-collapse collapse" :class="{in:showMenuInPhone}">
			<!-- BEGIN SIDEBAR MENU -->
			<ul class="page-sidebar-menu " :class="{'page-sidebar-menu-closed':!menuOpen}" data-auto-scroll="true" data-slide-speed="200">
				<!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
				<li class="sidebar-toggler-wrapper">
					<div class="sidebar-toggler" @click="openOrCloseMenu"></div>
				</li>
				<!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
				<li class="sidebar-search-wrapper">
					<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
					<!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
					<!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
					<form class="sidebar-search " action="http://metronic.kp7.cn/templates/admin/extra_search.html" method="POST">
						<a href="javascript:;" class="remove">
						<i class="icon-close"></i>
						</a>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search...">
							<span class="input-group-btn">
							<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
							</span>
						</div>
					</form>
					<!-- END RESPONSIVE QUICK SEARCH FORM -->
				</li>
				<li v-for="(menu,index) in menulist" :key="index" :class="{start:(index==0),last:index==(menulist.length-1),active:menu.active,open:menu.open}" @click="onClickMainMenu(menu,index)">
					<a href="javascript:;">
					<i :class="menu.icon"></i>
					<span class="title">{{menu.title}}</span>
					<span class="selected"></span>
					<span class="arrow" :class="{open:menu.open}"></span>
					</a>
					<ul class="sub-menu" v-show="menu.open" style="display:none;">
						<li v-for="(submenu,idx) in menu.childs||[]" :key="idx" :class="{active:submenu.active}" @click="onClickSubMenu(submenu,idx,index)">
							<router-link v-bind:to="(submenu.url)" >
								<i :class="submenu.icon"></i>
								{{submenu.title}}
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>
	<!-- END SIDEBAR -->
</template>

<script>
import _ from "lodash";
import { mapState } from 'vuex';

export default {
  name: 'leftmenu',
  data () {
    return {
	  menuOpen:true,
      menulist:[
		  {
			  title:"Dashboard",
			  icon:"icon-home",
			  open:false,
			  active:false,
			  childs:[
				  {
					  active:false,
					  title:"Default Dashboard",
					  url:"/",
					  icon:"icon-bar-chart"
				  },
				  {
					  active:false,
					  title:"New Dashboard #1",
					  url:"/",
					  icon:"icon-bulb"
				  },
				  {
					  active:false,
					  title:"New Dashboard #2",
					  url:"/",
					  icon:"icon-graph"
				  },
			  ]
		  },
		  {
			  title:"eCommerce",
			  icon:"icon-basket",
			  open:false,
			  active:false,
			  childs:[
				  {
					  active:false,
					  title:"Dashboard",
					  url:"/",
					  icon:"icon-home"
				  },
				  {
					  active:false,
					  title:"Orders",
					  url:"/order",
					  icon:"icon-basket"
				  },
			  ]
		  },
	  ],
    }
  },
  mounted:function(){
	  if(this.menulist.length){
		  this.menulist[0].open = true;
		  this.menulist[0].active = true;
		  this.menulist[0].childs[0].active = true;
	  }
  },
  methods:{
	  onClickMainMenu(menu,idx){
		  this.menulist =_.map(this.menulist,function(item,index){
			item.open = (idx==index);
			return item;
		  });
	  },
	  onClickSubMenu(submenu,subidx,mainidx){
		  this.menulist = _.map(this.menulist,function(item,index){
			item.active = (mainidx==index);
			item.childs = _.map(item.childs||[],function(n,subindex){
				n.active = (mainidx==index&&subidx==subindex);
				return n;
			})
			return item;
		  });
		  this.$store.commit('onHideMenuInPhone');
	  },
	  openOrCloseMenu(){
		  this.menuOpen = !this.menuOpen;
		  this.$store.commit(this.menuOpen?'onOpenLeftMenu':'onCloseLeftMenu');
	  }
  },
  computed: {
    ...mapState({
      showMenuInPhone: state => state.layout.showMenuInPhone,
    })
  },
  
}
</script>

<style>
.page-sidebar-menu li.open ul.sub-menu{
	display: block;
}
</style>