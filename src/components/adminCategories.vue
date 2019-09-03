<template>
	<div id="admin">
		<adminBar :active="current"></adminBar>
		<div class="main">
			<div class="top">
				标签管理
			</div>
			<div class="area">
				<div class="in">
					<span class="name"></span>
					<div class="tags">
						<div class="tag" v-for='(item,index) in categories' :key='index'>
							{{item}}
							<i class="fa fa-times fa-fw" aria-hidden="true" @click='delCategories(item,index)'></i>
						</div>
						<div class="tr">
							<div class="action" :class='{active:tr}'>
								<button  @click='tr=!tr'>+ New Categories</button>
								<input type="text" v-model='addcategories'  v-on:keyup.enter='addCategories()'>
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
	name: 'adminCategories',
	data() {
		return {
			current: 'adminCategories',
			categories: [1,32,3,4,1234,4,3,2],
			addcategories: '',
			tr: false
		}
	},
	components: {
	    adminBar
	},
	methods: {
	    initTitle: function() {
	        document.title = "标签管理 | 管理后台";
    	},
    	initInfo: function(){
			this.axios.get('http://localhost:3000/user/info')
			.then((res)=>{
				if(res.data.status == 200){
					this.categories = res.data.data.categories
				} else {
					this.$router.push({name: 'login'})
				}
			})
		},
		addCategories: function(){
			if(!this.addcategories){
				this.tr=false
			} else {
				this.axios.post('http://localhost:3000/user/addcategories',{categories: this.addcategories})
				.then((res)=>{
					if(res.data.status == 200){
						this.categories.push(this.addcategories)
						this.addcategories = '',
						this.tr = false
					} else{
						alert('添加出错')
					}
				})
			}
		},
		delCategories: function(categories,index){
			this.axios.post('http://localhost:3000/user/delcategories',{categories: categories})
			.then((res)=>{
				if(res.data.status == 200){
					this.categories.splice(index,1)
					alert('删除成功')
				} else{
					alert('删除出错')
				}
			})
		},
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
.main .area{
	padding: 60px 30px;
	background-color: rgb(236, 245, 255);
	position: absolute;
	top: 77px;
	left: 250px;
	bottom: 0px;
	right: 0px;
	overflow: scroll;
}
.main .tags .tag{
	margin-right: 20px;
	background-color: #ecf5ff;
    display: inline-block;
    height: 42px;
    padding: 0 20px;
    line-height: 40px;
    font-size: 18px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    font-weight: 400;
    float: left;
}
.main .tags .tag i{
	border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: -15px;
}
.main .tags .tag i:hover{
	color: #fff;
	background-color: #409eff;
}
.main .tags .tr{
	width: 129px;
	height: 42px;
	float: left;
	display: inline-block;
	overflow: hidden;
}
.main .tags .tr .action{
	height: 42px;
    display: inline-flex;
	position: relative;
	transition: 0.2s
}
.main .tags .action button{
	height: 42px;
    font-size: 10px;
    border-radius: 3px;
    line-height: 40px;
    padding: 0 15.5px;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    outline: none;
    margin: 0;
    font-weight: 500;
}
.main .tags .action input{
	height: 42px;
	width: 127px;
    font-size: 18px;
    border-radius: 3px;
    line-height: 40px;
    padding: 0 10px;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
}
.active{
	transform: translateX(-50%);
}
</style>