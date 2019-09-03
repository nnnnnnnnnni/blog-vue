<template>
	<div id="admin">
		<adminBar :active="current"></adminBar>
	</div>
</template>

<script>
import adminBar from "./adminBar.vue";
export default {
	name: 'permission',
	data() {
		return {
			current: 'permission'
		}
	},
	components: {
	    adminBar
	},
	methods: {
	    initTitle: function() {
	        document.title = "权限管理 | 管理后台";
    }
  },
  created() {
    this.initTitle();
  }
};
</script>

<style scoped>
	
</style>