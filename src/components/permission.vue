<template>
	<div id="permission">
		<adminBar :active="current"></adminBar>
		<div class="main">
			<div class="top">
				权限管理
			</div>
			<div class="root">
				<div class="per">
					<div class="title">添加新用户</div>
					<div class='addForm'>
						<div class="itemInput">
							<span class="tip">*</span>
							<input type="email" id="email" placeholder="邮箱">
							<span class="err">请填写正确的邮箱</span>
						</div>
						<div class="itemInput">
							<span class="tip"></span>
							<input type="text" id="phone" placeholder="手机号">
						</div>
						<div class="itemInput">
							<span class="tip">*</span>
							<input type="text" id="name" placeholder="名字">
							<span class="err">请填写正确的名字</span>
						</div>
						<div class="itemInput">
							<span class="tip">*</span>
							<input type="password" id="pwd" placeholder="密码">
							<span class="err">请填写正确的密码</span>
						</div>
						<div class="itemInput">
							<span v-for='(item, index) in permissionGroup' :key ='index'>
								<input type="checkbox" name="Group" id='item.key' value="item.key" checked=''>
								<label for="addNew">{{item.name}}</label>
							</span>
						</div>
						<div class="itemInput">
							<button>提交</button>
						</div>
					</div>
				</div>
				<div class="per">
					<div class="title">修改权限</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import adminBar from "./adminBar.vue";
export default {
	name: 'permission',
	data() {
		return {
			current: 'permission',
			permissionGroup: [
				{key: 'addNew', name: '添加用户',is: false},
				{key: 'changePermission', name: '权限修改',is: true}
			]
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
.main{
	margin-left: 250px;
	overflow: hidden;
}
.main .top{
	position: fixed;
	top: 0px;
	width: calc(100% - 250px);
	height: 77px;
	background-color: #fff;
	box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
	line-height: 77px;
	padding-left: 30px;
	font-size: 1.5em;
	font-weight: 600;
	z-index: 2;
}
.main .root{
	padding: 60px 30px;
	background-color: rgb(236, 245, 255);
	position: absolute;
	top: 77px;
	left: 250px;
	bottom: 0px;
	right: 0px;
	overflow: scroll;
}
.main .tip{
	display: inline-block;
	line-height: auto;
	width: 10px;
	text-align: center;
	color: red
}
</style>