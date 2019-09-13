<template>
	<div id="login">
		<div class="back">
			<i class="fa fa-hand-o-left" aria-hidden="true"></i>
			<router-link
              :to="{name:'index'}">返回首页</router-link>
		</div>
		<div class="main">
			<div class="title">login</div>
			<input style="display:none;" type="password">
			<div class="item un">
				<input type="email" v-model='mail' onfocus="this.placeholder=''" onblur="this.placeholder='请输入邮箱'" placeholder="请输入邮箱" name="username" id="email">
			</div>
			<div class="item pwd">
				<input type="password" v-model='pwd' onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'" placeholder="请输入密码" name="pwd" id="pwd">
			</div>
			<div class="item ck">
				<div class="tip red" >{{tip}}</div>
			</div>
			<button @click='login'>
				<i class="fa fa-arrow-circle-o-right fa-fw fa-2x" style='color: #d7ecff;' aria-hidden="true"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			mail: '',
			pwd: '',
			tip: ''
		}
	},
	methods: {
		login: function(){
			if(!this.mail || !this.pwd){
				this.tip = '请填写完整信息后登录'
				return;
			}
			this.axios.post('/api/user/login',{
				mail: this.mail,
				pwd: this.pwd
			}).then((res)=>{
				if(res.data.status == 200){
					this.tip = '登录成功！'
					this.$router.push({name: 'admin'})
				} else {
					this.mail = '',
					this.pwd = '',
					this.tip = res.data.msg
				}
			})
		}
	}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Orbitron:500");
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
#login{
	font-family: "Orbitron", sans-serif;
	background: linear-gradient(to bottom, #192224 0%, #21728b 100%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 0;
}
#login .back{
	font-size: 1.2rem;
    text-shadow: 0 0 1px #fff, 0 0 5px #fff, 0 0 15px #228dff;
    font-weight: 500;
    line-height: 1.1;
    margin: 30px;
    color: #d7ecff;
    cursor: pointer;
    transition: text-shadow 0.3s ease, border-bottom-color 0.5s ease;
    transform: translateY(-250%);
    animation: down 1s 0.5s;
    animation-fill-mode: forwards;
}
#login .back a{
    color: #d7ecff;
	text-decoration: none;
	transition: all 0.5s;
}
.main{
	width: 300px;
	margin: 0 auto;
	position: relative;
	top: 50%;
	transform: translateY(-90%);
	animation: show 5s  0.5s;
	animation-fill-mode: forwards;
	opacity: 0;
	z-index: 999
}
.main .title{
	font-size: 2.5rem;    
	text-align: center;
    text-shadow: 0 0 1px #fff, 0 0 5px #fff, 0 0 15px #228dff;
    font-weight: 500;
    line-height: 1.1;
    margin: 30px;
    color: #d7ecff;
    cursor: pointer;
    transition: text-shadow 0.3s ease, border-bottom-color 0.5s ease;
}
.main .item{
	width: 100%;
	height: 50px;
}
.main .item input{
	background-color: transparent;
	text-align: center;
	border: none;
	margin: 0;
	padding: 5px 10px;
	font-size: 1.225em;
	outline: none;
	width: calc(100% - 20px);
	color: #d7ecff;
	height: 31px;
	margin: 6px 0px;
	letter-spacing: 2px;
}
.main .un:before{
	content: '';
	display: block;
	position: absolute;
	top: 79px;
	width: 5px;
	height: 40px;
	border: 1px solid #fff;
	border-right: transparent;
}
.main .un:after{
	content: '';
	display: block;
	position: absolute;
	right: 0px;
	top: 79px;
	width: 5px;
	height: 40px;
	border: 1px solid #fff;
	border-left: transparent;
}
.main .pwd:before{
	content: '';
	display: block;
	position: absolute;
	top: 129px;
	width: 5px;
	height: 40px;
	border: 1px solid #fff;
	border-right: transparent;
}
.main .pwd:after{
	content: '';
	display: block;
	position: absolute;
	right: 0px;
	top: 129px;
	width: 5px;
	height: 40px;
	border: 1px solid #fff;
	border-left: transparent;
}
.main .ck{
	border: none;
	line-height: 30px;
	height: 30px;
	color: #d7ecff;
}
.main .ck input{
	float: left;
	width: 16px;
	height: 16px;
	margin: 8px 7px 6px 0px;
	line-height: 16px;
}
.main button{
	width: 100%;
	height: 50px;
	background: rgba(144,144,144,0.075);
	border: 0px;
	cursor: pointer;
	outline: none;
	border-radius: 5px;
	transition: 0.5s
}
.main button:hover{
	background: rgba(144,144,144,0.275);
}
.tip {
	float: right
}
.red{
	color: red;
}
.main input:-webkit-autofill {
    -webkit-box-shadow: 0 0 3px 100px rgb(28,67,79) inset;
    -webkit-color: #d7ecff;
}
@-webkit-keyframes show {
	from { opacity: 0 }
	to { opacity: 1 }
}
@-o-keyframes show {
	from { opacity: 0 }
	to { opacity: 1 }
}
@-moz-keyframes show {
	from { opacity: 0 }
	to { opacity: 1 }
}
@keyframes show {
	from { opacity: 0 }
	to { opacity: 1 }
}
@-webkit-keyframes down {
	from { transform: translateY(-250%); }
	to { transform: translateY(0); }
}
@-o-keyframes down {
	from { transform: translateY(-250%); }
	to { transform: translateY(0); }
}
@-moz-keyframes down {
	from { transform: translateY(-250%); }
	to { transform: translateY(0); }
}
@keyframes down {
	from { transform: translateY(-250%); }
	to { transform: translateY(0); }
}
</style>