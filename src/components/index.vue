<template>
  <div id="index">
    <navBar :active="current"></navBar>
    <div class="bgimg"></div>
    <div class="main">
      <div class="article" v-for="(item,index) in articleList" :key="index">
        <div class="contant">
          <div class="title">
            <router-link
              :to="{name:'articles', params:{id: item._id,title:item.title}}"
            >{{item.title}}</router-link>
          </div>
          <div class="info">
            <span class="item bor">
              <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
              发表于
              <span style="border-bottom: 1px dashed #999">{{item.create_time}}</span>
            </span>
            <span class="item bor" v-if="item.update_time">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
              更新于
              <span style="border-bottom: 1px dashed #999">{{item.update_time}}</span>
            </span>
            <span class="item bor">
              <i class="fa fa-folder-o" aria-hidden="true"></i>
              分类于 {{item.categories}}
            </span>
            <span class="item bor">
              <i class="fa fa-tag" aria-hidden="true"></i>
              标签
              <span
                class="tag"
                v-for="(tag,index) in item.tags"
                :class="{dot:index+1 != item.tags.length}"
              >{{tag}}</span>
            </span>
            <span class="item">
              <i class="fa fa-user" aria-hidden="true"></i>
              作者 {{item.username}}
            </span>
          </div>
          <p class="summary">{{item.summary}}</p>
          <div class="more">
            <router-link :to="{name:'articles', params:{id: item._id,title:item.title}}">阅读全文</router-link>
          </div>
        </div>
      </div>
      <pagetool :currentPage="currentPage" :pages="pages" @nextPage="pageChange"></pagetool>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
import pagetool from "./pagetool.vue";
export default {
  name: "index",
  data() {
    return {
      articleList: [],
      current: "index",
      pages: 1,
      currentPage: 1
    };
  },
  components: {
    navBar,
    pagetool
  },
  methods: {
    initTitle: function() {
      document.title = "胜仔的博客";
    },
    pageChange: function(data) {
      this.currentPage = data || 1;
      this.getList();
    },
    getList: function(){
      this.axios.get('http://localhost:3000/article/list',{params: {
              isShow: true,
              page: this.currentPage
          }
      })
      .then((res)=>{
        if(res.data.status == 200){
          this.articleList = []
          this.articleList = res.data.data
        }
      })
    },
    getCount: function(){
      this.axios.get('http://localhost:3000/article/count')
      .then((res)=>{
        if(res.data.status == 200){
          let count = parseInt(res.data.data / 6) +1
          this.pages = count
        }
      })
    }
  },
  created() {
    this.getCount();
    this.getList(); 
    this.initTitle();
  },
  mounted() {
    this.pageChange();
  }
};
</script>

<style scoped>
.main {
  font-family: "Lato", "PingFang SC", "Microsoft YaHei", sans-serif;
  width: 900px;
  margin: 80px auto;
  position: relative;
}
.main .article {
  padding: 25px;
  width: 850px;
  margin-bottom: 60px;
  box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
}
.main .article .contant {
  opacity: 0;
  transform: translateY(-30%);
  animation: show-down 1s 0.6s;
  animation-fill-mode: forwards;
}
.main .title {
  font-size: 1.75em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-weight: 400;
}
.main .title a {
  text-decoration: none;
  border-bottom: none;
  color: #555;
  display: inline-block;
  line-height: 1.2;
  position: relative;
  vertical-align: top;
}
.main .title a::before {
  background-color: #000;
  bottom: 0;
  content: "";
  height: 2px;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  visibility: hidden;
  width: 100%;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
.main .title a:hover::before {
  transform: scaleX(1);
  visibility: visible;
}
.main .info {
  margin-bottom: 20px;
  margin-top: 5px;
  text-align: left;
  color: #999;
  font-size: 0.8em;
  line-height: 2;
}
.main .info .dot::after {
  content: "、";
}
.main .info .bor::after {
  content: "|";
  margin: 0 0.5em;
}
.main .summary {
  text-align: justify;
  overflow-wrap: break-word;
  word-wrap: break-word;
  margin: 0 0 20px 0;
  font-size: 1em;
  line-height: 2;
  color: #555;
  height: 64px;
  -webkit-line-clamp: 2; /* 设置超出多少行隐藏 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* 设置 display 为 -webkit-box 或者 -webkit-inline-box 时为隐藏状态 */
  display: -webkit-inline-box;
}
.main .more {
  margin-top: 0px;
  text-align: left;
}
.main .more a {
  font-size: 0.875em;
  display: inline-block;
  line-height: 2;
  color: #555;
  height: 30px;
  border-bottom: 2px solid #999;
  outline: none;
  text-decoration: none;
}
.main .more a:hover {
  color: #222;
}
.main .more a::after {
  content: "》";
  margin: 0 0 0 0.5em;
  font-size: 0.2em;
  line-height: 30px;
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
.bgimg{
  position: absolute;
  background-image: url('../assets/20190709.jpg');
  position: right;
  height: 100px;
  width: 100px;
  left: 0px;
  top: 83px;
  cursor: pointer;
}
.bgimg::before{
  content:'';
  z-index: 999;
  position:absolute;
  top:0;
  left: 0;
  border-top: 50px solid transparent;
  border-right: 50px solid #fff;
  border-left: 50px solid transparent;
  border-bottom: 50px solid #fff;
  box-shadow:.2em .2em .3em -.1em rgba(0,0,0,.15);
}
</style>