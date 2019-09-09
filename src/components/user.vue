<template>
	<div id="user" @click='toAdmin'>
		<i class="fa fa-user-o" aria-hidden="true"></i>
	</div>
</template>

<script>
export default {
	name: 'user',
	data() {
		return {

		}
	},
	methods: {
		toAdmin: function(){
      		this.$router.push({name: 'admin'});
		}
	}
};
</script>

<style scoped>
#user{
	width: 25px;
	height: 25px;
	background-color: #111;
	color: #fff;
	text-align: center;
	line-height: 25px;
	cursor: pointer;
}
</style>