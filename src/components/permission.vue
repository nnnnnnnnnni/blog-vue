<template>
	<div id="permission">
		<adminBar :active="current"></adminBar>
		<div class="main">
			<div class="top">
				权限管理
			</div>
			<div class="root">
				<div class="per" v-if=" !this.permission">
          			<i class="fa fa-times-circle fa-2x fa-fw" aria-hidden="true"></i>
					<span class="title">暂无权限，请联系管理员添加</span>
				</div>
				<div class="per" v-if=" this.permission.indexOf('addNew')!= -1 ">
					<div class="title">添加新用户</div>
					<div class='addForm'>
						<div class="itemInput">
							<span class="tip">*</span>
							<input type="mail" v-model='mail' id="mail" placeholder="邮箱">
						</div>
						<div class="itemInput">
							<span class="tip"></span>
							<input type="text" v-model='phone' id="phone" placeholder="手机号">
						</div>
						<div class="itemInput">
							<span class="tip">*</span>
							<input type="text" v-model='name' id="name" placeholder="名字">
						</div>
						<div class="itemInput">
							<span class="tip">*</span>
							<input type="password" v-model='pwd' id="pwd" placeholder="密码">
						</div>
						<div class="itemInput">
							<span v-for='(item, index) in permissionGroup' :key ='index'>
								<input type="checkbox" name="Group" id='item.key' value="item.key" v-model='item.is' :checked='item.is'>
								<label for="addNew">{{item.name}}</label>
							</span>
						</div>
						<div class="itemInput">
							<button @click='addUser'>提交</button>
						</div>
					</div>
				</div>
				<div class="per" v-if=" this.permission.indexOf('changePermission')!= -1 ">
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
				{key: 'changePermission', name: '权限修改',is: false}
			],
			mail: '',
			phone: '',
			pwd:'',
			name:'',
			permission: ''
		}
	},
	components: {
	    adminBar
	},
	methods: {
	    initTitle: function() {
	        document.title = "权限管理 | 管理后台";
    	},
    	initInfo: function(){
			this.axios.get('/user/info')
			.then((res)=>{
				if(res.data.status == 200){
					this.id = res.data.data._id;
					this.permission = res.data.data.permission
				} else {
					this.$router.push({name: 'login'})
				}
			})
		},
    	addUser: function(){
    		if(!this.mail || !this.name || this.password){
    			console.log(this.permissionGroup)
    			return alert('请填写完整信息')
    		} else{
    			let group = []
    			for(let i = 0 ; i< this.permissionGroup.length ; i++){
    				if(this.permissionGroup[i].is){
    					group.push(this.permissionGroup[i].key)
    				}
    			}
    			this.axios.post('/user/signup',{
					mail: this.mail,
					name: this.name,
					phone: this.phone,
					pwd: this.pwd,
					per: group
				}).then((res)=>{
					if(res.data.status == 200){
						this.mail = ''
						this.pwd = ''
						this.phone = ''
						this.name = ''
						alert('注册成功')
					} else {
						alert('注册失败:'+res.data.msg)
					}
				})
    		}
    	}
  	},
  	created() {
  	  this.initTitle();
  		this.initInfo();
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
.red{
	color: red
}
.main .per input:-webkit-autofill {
    -webkit-box-shadow: 0 0 3px 100px #fff inset;
    -webkit-color: #d7ecff;
}
.main .per .title{
	font-size: 1.5em;
	margin-bottom: 20px;
	padding-left: 10px;
}
.main .per .addForm{
	margin-left: 40px;
	width: 450px;
}
.main .per .itemInput{
	margin: 10px 0px;
}
.main .per .itemInput input{
	height: 30px;
	width: 250px;
	border-radius: 3px;
	border: none;
	outline: none;
	padding: 2px 5px;
	font-size: 1.15em;
}
.main .per .itemInput input[type='checkbox']{
	width: 15px;
	height: 15px;
	margin-top: 5px;
}
.main .per .itemInput button{
	display: block;
	cursor: pointer;
	background-color: #409eff;
	border-radius: 5px;
	border: none;
	color: #fff;
	height: 35px;
	width: 100px;
	margin: 10px auto;
	outline: none;
}
</style> 