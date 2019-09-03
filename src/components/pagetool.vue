<template>
  <div id="pagetool">
  	<span class="back"><i class="fa fa-angle-left fa-2x" aria-hidden="true" ></i></span>
  	<div class="pages">
  		<div class="item" 
  		v-for='(item,index) in pages' 
  		:key='index' 
  		v-if='index >=currentPage - 4 && index <= currentPage+2'
  		:class="[index+1 == currentPage ? 'active': '']"
  		@click='changePage(index+1)'>
  			{{index+1}}
  		</div>
  	</div>
  	<span class="gohead"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></span>
  </div>
</template>

<script>
import navBar from './navBar.vue'
export default {
  name: 'pagetool',
  props: ['currentPage','pages'],
  methods:{
  	changePage: function(i){
  		this.$emit("nextPage",i)
  	},
  },
  mounted(){
  }

};
</script>

<style scoped>
#pagetool{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}
#pagetool .pages{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}
#pagetool span {
	display: block;
	width: 35px;
	height: 35px;
	cursor: pointer;
}
#pagetool .back i{
	float: left;
}
#pagetool .gohead i{
	float: right;
}
.active{
	background-color: #ccc;
	color: #fff;
}
#pagetool .pages .item{
	width: 35px;
	height: 35px;
	cursor: pointer;
	line-height: 35px;
	text-align: center;
	margin: 0 10px;
}
#pagetool .pages .item:hover{
	border-bottom: 2px solid #333;
	height: 33px;
}
</style>
