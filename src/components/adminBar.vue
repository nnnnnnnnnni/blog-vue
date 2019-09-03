<template>
	<div id="adminBar">
		<div class="main">
			<div class="logo">
		        <span class="hang top"></span>
		        <span class="title">Sheng仔的博客</span>
		        <span class="hang bot"></span>
			</div>
			<div class="nav">
				<router-link :to='{name:"admin"}' :class="[{item: true}, active == 'admin' ? 'active': '']">
					<i class="fa fa-align-justify" aria-hidden="true"></i>
					&nbsp;&nbsp;所有博客
				</router-link>
				<router-link :to='{name:"write"}' :class="[{item: true}, active == 'write' ? 'active': '']">
					<i class="fa fa-pencil" aria-hidden="true"></i>
					&nbsp;&nbsp;写博客
				</router-link>
				<router-link :to='{name:"adminTag"}' :class="[{item: true}, active == 'adminTag' ? 'active': '']">
					<i class="fa fa-tags" aria-hidden="true"></i>
					&nbsp;&nbsp;标签
				</router-link>
				<router-link :to='{name:"adminCategories"}' :class="[{item: true}, active == 'adminCategories' ? 'active': '']">
					<i class="fa fa-align-justify" aria-hidden="true"></i>
					&nbsp;&nbsp;分类
				</router-link>
				<router-link :to='{name:"permission"}' :class="[{item: true}, active == 'permission' ? 'active': '']">
					<i class="fa fa-cog" aria-hidden="true"></i>
					&nbsp;&nbsp;权限
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "navBar",
  props: ["active"],
  data() {
    return {

    };
  },
  methods: {
    jump: function() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#adminBar{
	background-color: #fff;
	position: fixed;
	z-index: 2;
	top: 0px;
	bottom: 0px;
	width: 250px;
	box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.main .logo{
	cursor: pointer;
  	width: 170px;
  	font-weight: bolder;
  	font-size: 1.375em;
  	line-height: 1.5;
  	text-align: center;
  	padding: 20px 40px;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
}
.main .logo .hang {
  width: 65%;
  margin: 0 auto;
  display: block;
  height: 2px;
  background: #222;
}
.main .nav{
	display: flex;
	flex-direction: column;
	margin-top: 20px;
}
.main .nav a{
	padding-left: 20px;
	display: block;
	height: 50px;
	line-height: 50px;
    color: #686a76;
	text-decoration: none;
	border-left: 5px solid transparent;
	transition: 0.2s
}
.main .nav a:hover {
	color: #fff;
	background-color: rgb(140, 197, 255);
	border-left: 5px solid rgb(102, 177, 255);
}
.active{
	color: #fff;
	background-color: rgb(236, 245, 255);
	border-left: 5px solid rgb(102, 177, 255);
}
</style>