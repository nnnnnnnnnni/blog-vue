<template>
	<div id="admin">
		<adminBar :active="current"></adminBar>
		<div class="main">
			<div class="top">
				所有文章
				<logout></logout>
			</div>
			<div class="all">
				<table>
					<thead>
						<tr>
							<th>标题</th>
							<th>分类</th>
							<th>标签</th>
							<th>创建时间</th>
							<th>最后修改时间</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(item,index) in list' :key ='index'>
							<td>
								<router-link :to="{name:'articles', params:{id: item._id,title:item.title}}">{{item.title}}</router-link>
							</td>
							<td>{{item.categories}}</td>
							<td>
								<span class='tag bor' v-for='(item,index) in item.tags' :key='index'>{{item}}</span>
							</td>
							<td>{{item.create_time}}</td>
							<td>{{item.update_time}}</td>
							<td>
								<span :class="[{switch:true} ,item.status ==1 ? 'checkedBg' : 'nocheckedBg']" @click='updateStatus(item._id,item.status)'>
									<span :class="[item.status ==1 ? 'checked' : '' ,{picker:true} ]"></span>
								</span>
							</td>
							<td>
								<button class="edit" @click='update(item)'>修改</button>
								<button class="del"  @click='del(item._id)'>删除</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="tongji">
					<span class="count">总共 {{count}} 篇文章</span>
					<span class="right">
						<i class="fa fa-caret-square-o-left fa-fw" aria-hidden="true" @click='back'></i>
						<span>{{page}}</span>
						<i class="fa fa-caret-square-o-right fa-fw" aria-hidden="true" @click='go'></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import adminBar from "./adminBar.vue";
import logout from "./logout.vue";
export default {
	name: 'admin',
	data() {
		return {
			current: 'admin',
			id: '',
			permission: [],
			list:[],
			count: 0,
			page: 1,
		}
	},
	components: {
	    adminBar,
	    logout
	},
	methods: {
	    initTitle: function() {
	        document.title = "管理后台";
    	},
    	initInfo: function(){
			this.axios.get('/api/user/info')
			.then((res)=>{
				if(res.data.status == 200){
					this.id = res.data.data._id;
					this.permission = res.data.data.permission
					this.getList()
					this.getCount();
				} else {
					this.$router.push({name: 'login'})
				}
			})
		},
		getList: function(){
			this.axios.get('/api/article/list',{params: {
                        id:this.id,
                        count: 10,
                        page: this.page
                    }
                })
			.then((res)=>{
				if(res.data.status == 200){
					this.list = res.data.data
					// for(let i = res.data.data.length ;i<10 ;i++){
					// 	this.list.push([])
					// }
				}
			})
		},
		updateStatus: function(id,status){
			this.axios.post('/api/article/updateStatus',{
				id: id,
				status: status == 0 ? 1 : 0
			})
			.then((res)=>{
				if(res.data.status == 200){
					this.getList()
				} 
			})
		},
		update: function(data){
			this.$router.push({name:'write',params:{data:data}})
		},
		del: function(index){
			this.axios.post('/api/article/del',{id:index})
			.then((res)=>{
				if(res.data.status == 200){
					this.getList()
				}
			})
		},
		getCount: function(){
			this.axios.get('/api/article/count',{params: {
                        id:this.id
                    }
                })
			.then((res)=>{
				if(res.data.status == 200){
					this.count = res.data.data
				}
			})
		},
		back: function(){
			let pages = parseInt(this.count/10)+1
			if(this.page>1){
				this.page--;
				this.getList();
			}
		},
		go: function(){
			let pages = parseInt(this.count/10)+1
			if(this.page<pages){
				this.page++;
				this.getList();
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
	padding: 0px 30px;
	font-size: 1.5em;
	font-weight: 600;
	z-index: 2;
}
.main .top i{
	float: right;
	margin-right: 70px;
	line-height: 77px;
	cursor: pointer;
	font-size: 0.75em;
}
.main .all{
	padding: 60px 30px;
	background-color: rgb(236, 245, 255);
	position: absolute;
	top: 77px;
	left: 250px;
	bottom: 0px;
	right: 0px;
	overflow: scroll;
}
.main .all table{
	width: 100%;
	border-radius: 5px;
    background-color: #fff;
    color: #666;
    border-collapse: collapse;
    border-spacing: 0;
    padding: 0px;
}
.main .all thead{
	display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
	border-radius: 5px;
    color: #666;
    background-color: #f2f2f2;
}
.main .all th{
        position: relative;
    padding: 9px 15px;
    min-height: 20px;
    line-height: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6;
}
.main .all td{
	background-color: transparent;
	text-align: center;
	font-size: 14px;
	border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6;
	position: relative;
    padding: 9px 15px;
    min-height: 20px;
    line-height: 20px;
}
.main .all td a{
	color: #409EFF;
}
.main .all td .bor:after{
	content: ' ';
	margin: 0 2px;
}
.main .all td button{
	    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
	    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
}
.main .all td .switch{
	margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color .3s,background-color .3s;
    vertical-align: middle;
}
.main .all td  .switch .picker{
	content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    transition: all .3s;
    width: 16px;
    height: 16px;
    background-color: #fff;
}
.checked{
    margin-left: 20px;
}
.checkedBg{
	background-color: #409eff;
}
.nocheckedBg{
    background-color: #dcdfe6;
}
.main .all td .del{
	color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}
.main .all td .edit:hover{
	background-color: #d9ecff;
    color: #409eff;
}
.main .all td .del:hover{
	opacity: 0.8
}
.main .all .tongji{
	border: 1px solid #dcdfe6;
	height:  30px;
	line-height: 30px;
	padding: 0 30px;
	margin-top: -1px;
	position: relative;
}
.main .all .tongji .right{
	float: right;
	line-height: 30px;
	color: #999;
}
.main .all .tongji .right i {
	cursor: pointer;
	margin: 0 10px;
}
.main .all .tongji .right i:hover{
	color: #333
}
</style>