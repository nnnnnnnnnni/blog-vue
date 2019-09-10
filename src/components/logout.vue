<template>
	<div id="logout" @click='logout'>
		<i class="fa fa-sign-out" aria-hidden="true" @click='logout'>登出</i>
	</div>
</template>

<script>
export default {
	name: 'logout',
	data() {
		return {

		}
	},
	methods: {
		logout: function(){
      		this.axios.post('/api/user/logout')
			.then((res)=>{
				if(res.data.status == 200){
					this.$router.push({name:'login'})
				}
			})
		}
	}
};
</script>

<style scoped>
#logout{
	display: inline-block;
	font-size: 0.754em;
	float: right;
	margin-right: 70px;
	cursor: pointer;
}
</style>