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
					<div class="users">
						<div class="user" v-for='(user,key) in users' :key = 'key'> 
							<div class="name" @click='showKey = key'>{{user.name}}</div>
							<div class="group" v-show='showKey == key'>
								<div class="all">
									未有：
									<span class="item" v-for='(item,index) in user.noPm' :key='index' @click='inP(key,index,item)'>
										{{permissions[item].name}}
									</span>
								</div>
								<div class="selected">
									已有：
									<span class="item" v-for='(item,index) in user.permission' :key='index' @click='outP(key,index,item)' >
										{{permissions[item].name}}
									</span>
								</div>
								<button @click='update(user)'>确定</button>
							</div>
						</div>
					</div>
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
			permissions:{
				'addNew': {key: 'addNew',name:'添加用户'},
				'changePermission': {key: 'changePermission',name:'权限修改'}
			},
			mail: '',
			phone: '',
			pwd:'',
			name:'',
			permission: '',
			users: [],
			showKey: '-1',
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
			this.axios.get('/api/user/info')
			.then((res)=>{
				if(res.data.status == 200){
					this.id = res.data.data._id;
					this.permission = res.data.data.permission
					if(this.permission.indexOf('changePermission')!= -1 ){
						this.getUsers()
					}
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
    			this.axios.post('/api/user/signup',{
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
    	},
    	getUsers: function(){
    		this.axios.get('/api/user/users')
			.then((res)=>{
				if(res.data.status == 200){
					res.data.data.forEach(user=>{
						let arr = [];
						for(let key in this.permissions){
							if(user.permission.indexOf(key) == -1){
								arr.push(key)
							}
						}
						user.noPm = arr
					})
					this.users = res.data.data
				} else {
					alert(res.data.msg)
				}
			})
    	},
    	inP: function(key,index,item){
    		this.users[key].noPm.splice(index,1)
    		this.users[key].permission.push(item)
    	},
    	outP: function(key,index,item){
    		this.users[key].noPm.push(item)
    		this.users[key].permission.splice(index,1)
    	},
    	update: function(user){
    		this.axios.post('/api/user/UpPermission',{
    			id: user._id,
    			permission: user.permission
    		})
			.then((res)=>{
				if(res.data.status == 200){
					alert('修改成功')
				} else {
					alert(res.data.status)
				}
			})
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
.main .per{
	overflow: hidden;
	margin-bottom: 30px;
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
button{
	display: block;
	cursor: pointer;
	background-color: #409eff;
	border-radius: 5px;
	border: none;
	color: #fff;
	height: 35px;
	width: 100px;
	outline: none;
}
.main .per .users{
	padding: 10px;
}
.main .per .users .user{
	margin-bottom: 20px;
	position: relative;
	overflow: hidden;
}
.main .per .users .user .name{
	float: left;
	cursor: pointer;
	font-size: 1.2em;
	text-align: center;
	padding: 5px;
	width: 100px;
}
.main .per .users .user .group{
	float: left;
}
.main .per .users .user .group .all,.main .per .users .user .group .selected{
	height: 32px;
	line-height: 32px;
	margin: 5px;
}
.main .per .users .user .group .selected span{
	background-color: #67c23a;
    border-color: #67c23a;
    color: #fff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    margin: 0 5px;
}
.main .per .users .user .group .all span{
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    background-color: #909399;
    border-color: #909399;
    color: #fff;
    margin: 0 5px;
}
.main .per .users .user .group button{
	margin-left: 63px;
}
</style> 