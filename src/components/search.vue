<template>
  <div id="search">
    <navBar :active="current"></navBar>
    <div class="main">
      <div class="container" v-if='searchList.length != 0'>
        <div class="title">
          {{title}} <span class="type">{{type}}</span>
        </div>
        <div class="list">
          <div class="item" v-for='(item,index) in searchList' :key="index"> 
            <div class="info">
              <span class="time">{{item.create_time}}</span>
              <router-link :to="{name:'articles', params:{id: item._id}}">{{item.title}}</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="none" v-else>
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
        没有结果
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
export default {
  name: "search",
  data() {
    return {
      current: "search",
      title: this.$route.params.key,
      type: this.$route.params.type,
      searchList: []
    };
  },
  components: {
    navBar
  },
  methods: {
    initTitle: function() {
      document.title = "搜索结果";
    },
    getReault: function(){
      var type = this.type;
      let url = ''
      if(type == '标签'){
        url = '/article/getbytag'
      } else if(type == '分类'){
        url = '/article/getbycategories'
      } else{
        url = '/article/search'
      }
      this.axios.get(url+'/'+this.title)
      .then(res=>{
        if(res.data.status == 200){
          this.searchList = res.data.data
        }
      })
    }
  },
  created() {
    this.initTitle();
    this.getReault();
  }
};
</script>

<style scoped>
.main {
  width: 900px;
  margin: 80px auto;
}
.main .container{
  position: relative;
  opacity: 0;
  transform: translateY(-20%);
  animation: show-down 1s 0.5s;
  animation-fill-mode: forwards;
}
.main .container::after {
    background: #f5f5f5;
    content: ' ';
    height: 100%;
    left: 0;
    margin-left: -2px;
    position: absolute;
    top: 1.25em;
    width: 4px;
    z-index: -1;
}
.main .container .title{
  font-size: 1.75em;
  font-weight: bold;
  line-height: 1.5;
  margin: 60px 0px;
  padding-left: 20px;
  position: relative;
}
.main .container .title::before {
    background: #bbb;
    border-radius: 50%;
    content: ' ';
    height: 8px;
    left: 0px;
    margin-left: -4px;
    margin-top: -4px;
    position: absolute;
    top: 50%;
    width: 8px;
}
.main .container .title .type{
      color: #bbb;
    margin-left: 5px;
    font-size: 80%;
}
.main .container .list{

}
.main .container .list .item{
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 25px;
  -webkit-box-shadow: 0 0 5px rgba(202,203,203,0.5);
  -moz-box-shadow: 0 0 5px rgba(202,203,204,0.5);
}
.main .container .list .item .info{
    border-bottom: 1px dashed #ccc;
    position: relative;
    height: 53px;
    padding-left: 25px;
    transition-delay: 0s;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-property: border;
}
.main .container .list .item .info::before {
    background: #bbb;
    border: 1px solid #fff;
    border-radius: 50%;
    content: ' ';
    height: 6px;
    left: 0;
    margin-left: -4px;
    position: absolute;
    bottom: 10px;
    width: 6px;
    transition-delay: 0s;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-property: background;
}
.main .container .list .item .info .time{
    font-size: 0.75em;
    position: absolute;
    bottom: 5px;
}
.main .container .list .item .info a{
  color: #666;   
  text-decoration: none; 
  font-size: 1.1em;
  font-weight: normal;
  line-height: inherit;
  position: absolute;
  bottom: 5px;
  margin-left: 77px;
}
.main .container .list .item .info:hover{
    border-bottom: 1px dashed #333;
    position: relative;
    height: 53px;
    padding-left: 25px;
}
.main .container .list .item .info:hover::before {
    background: #333;
    border: 1px solid #fff;
    border-radius: 50%;
    content: ' ';
    height: 6px;
    left: 0;
    margin-left: -4px;
    position: absolute;
    bottom: 10px;
    width: 6px;
}
@-webkit-keyframes show-down {
  form {
    transform: translateY(-30%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@-o-keyframes show-down {
  form {
    transform: translateY(-30%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@-moz-keyframes show-down {
  form {
    transform: translateY(-30%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@keyframes show-down {
  form {
    transform: translateY(-30%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
.none{
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 1.45em;
  color: #999;
  opacity: 0;
  transform: translateY(-20%);
  animation: show-down 1s 0.5s;
  animation-fill-mode: forwards;
}
</style>
