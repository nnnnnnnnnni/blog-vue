<template>
	<div id="write">
		<adminBar :active="current"></adminBar>
		<div class="main">
			<div class="top">
				写博客
			</div>
			<div class="editArea">
				<div class='title'>
					<div class="name">标题:</div>
					<input type="text" v-model='title' name="" id="">
				</div>
				<div class="tag">
					<div class="name">标签:</div>
					<div class="check">
						<div class="candidate">
							<span class="bx" style='height:32px;line-height:32px'>备选：</span>
							<span class="tag" v-for='(item,index) in tags' :key='index' @click='choose(index)'>{{item}}</span>
						</div>
						<div class="choosed">
							<span class="yx" style='height:32px;line-height:32px'>已选：</span>
							<span class="tag" v-for='(item,index) in tag_choosed' :key='index' @click='remove(index)'>{{item}}</span>
						</div>
					</div>
				</div>
				<div class="categories">
					<div class="name">分类:</div>
					<select name="choose" id="" v-model="selected">
						<option class="item" :value="item"  v-for='(item,index) in categories' :key='index'>{{item}}</option>
					</select>
				</div>
				<div class="text">
					<div class="name">正文:</div>
					<div class="area">
						<textarea name="edit" id="" v-model='edit'></textarea>
						<div class="show" id="" v-html='show'></div>
					</div>
				</div>
				<div class="btn">
					<button @click='post(0)'>存为草稿</button>
					<button @click='post(1)'>直接发布</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import adminBar from "./adminBar.vue";
export default {
	name: 'write',
	data() {
		return {
			current: 'write',
			title: '',
			tags: [],
			tag_choosed: [],
			categories: [],
			selected: '',
			edit: '',
			show: '',
		}
	},
	components: {
	    adminBar
	},
	watch: {
		edit(){
			var text = this.edit;
		    //创建实例
		    var converter = new showdown.Converter();
		    //进行转换
		    var html = converter.makeHtml(text);
			    //展示到对应的地方  result便是id名称
			this.show = html;
		}
	},
	methods: {
	    initTitle: function() {
	        document.title = "写博客 | 管理后台";
  	  	},
    	initInfo: function(){
			this.axios.get('http://localhost:3000/user/info')
			.then((res)=>{
				if(res.data.status == 200){
					this.tags = res.data.data.tags
					this.categories = res.data.data.categories
				} else {
					this.$router.push({name: 'login'})
				}
			})
		},
		choose: function(index){
			var key = this.tags[index]
			this.tags.splice(index,1)
			this.tag_choosed.push(key)
		},
		remove: function(index){
			var key = this.tag_choosed[index]
			this.tag_choosed.splice(index,1)
			this.tags.push(key)
		},
		post: function(status){
			if(!this.title || !this.tag_choosed || !this.selected || !this.edit){
				alert("请填写完整")
			} else{
				this.axios.post('http://localhost:3000/article/post',{
					title: this.title,
					tags: this.tag_choosed,
					categories: this.selected,
					text: this.edit,
					status: status,
				}).then(res=>{
					if(res.data.status ==200){
						this.title = ''
						this.edit = ''
						alert("成功!")
					} else{
						alert("失败，请重试")
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
.main .editArea{
	padding: 60px 30px;
	background-color: rgb(236, 245, 255);
	position: absolute;
	top: 77px;
	left: 250px;
	bottom: 0px;
	right: 0px;
	overflow: scroll;
}
.main .editArea .title{
	width: 100%;
	line-height: 60px;
	padding: 0px 0px 30px 0px;
}
.main .editArea .name{
	float: left;
	width: 8%;
	font-size: 22px;  
	text-align: center;  
	font-weight: 400;
    color: #1f2f3d;
}
.main .editArea .title input{
	width: 20%;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.main .editArea .tag{
	width: 100%;
	line-height: 94px;
	padding: 0px 0px 30px 0px;
	overflow: hidden;
}
.main .editArea .tag .check{
	width: 50%;
	float: left;
}
.main .editArea .tag .check .candidate,.main .editArea .tag .check .choosed{
	display: flex;;
	flex-wrap: wrap;
	margin:10px 0px;
}
.main .editArea .tag .check .candidate .tag{
	background-color: #e9e9eb;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #909399;
    width: auto;
    margin-right: 20px;
    cursor: pointer;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.main .editArea .tag .check .choosed .tag{
	display: inline-block;
	background-color: #f0f9eb;
    height: 32px;
    width: auto;
    margin-right: 20px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #67c23a;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.main .editArea .categories{
	width: 100%;
	line-height: 94px;
	padding: 0px 0px 30px 0px;
	overflow: hidden;
}
.main .editArea .categories select{
	border-color: #409eff;
	padding-right: 30px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 20%;
}
.main .editArea .categories select .item{
	font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
}
.main .editArea .text{
	width: 100%;
	line-height: 600px;
	padding: 0px 0px 30px 0px;
	overflow: hidden;
}
.main .editArea .text .area{
	width: 82%;
	position: relative;
	overflow: hidden;
}
.main .editArea .text .area textarea{
	width: calc(50% - 24px);
	height: 600px;
	resize: none;
	float: left;
	font-size: 1.25em;
	padding: 10px;
	border-left: none;
	border-top: none;
	border-bottom: none;
}
.main .editArea .text .area .show{
	width: calc(50% - 20px);
	height: 600px;
	float: left;
	background-color: #fff;
	margin-left: 1px;
	overflow: auto;
	padding: 10px;
}
.main .editArea .btn{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.main .editArea .btn button{
    margin: 10px 20px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #409eff;
    border: 1px solid #409eff;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.main .editArea .btn button:hover{
	background: rgb(102, 177, 255);
	border-color: rgb(102, 177, 255);
}
.show{
	line-height: 1;
}
</style>