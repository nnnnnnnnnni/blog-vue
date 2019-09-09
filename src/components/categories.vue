<template>
  <div id="categories">
    <navBar :active="current"></navBar>
    <div class="main">
      <div class="title">文章分类</div>
      <div class="categories">
        <div class="categorie" v-for="(item, index) in categorieList " :key="index">
          <router-link :to="{name:'search', params:{key: item._id,type:'分类'}}">{{item._id}}</router-link>
          <div class="num">({{item.totail}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
export default {
  name: "categories",
  data() {
    return {
      current: "categories",
      categorieList: []
    };
  },
  components: {
    navBar
  },
  methods: {
    initTitle: function() {
      document.title = "文章分类 | 胜仔的博客";
    },
    getCategories: function(){
      this.axios.get('http://localhost:3000/article/categories')
      .then((res)=>{
        if(res.data.status == 200){
          this.categorieList = res.data.data
        }
      })
    }
  },
  created() {
    this.initTitle();
    this.getCategories();
  }
};
</script>

<style scoped>
.main {
  width: 900px;
  margin: 80px auto;
  opacity: 0;
  transform: translateY(-30%);
  animation: show-down 0.8s 0.6s;
  animation-fill-mode: forwards;
}
.main .title {
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-weight: 400;
  margin: 0 0 60px 0px;
  color: #555;
  font-size: 1.75em;
  line-height: 2;
  width: 100%;
}
.main .categories {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.main .categories .categorie {
  padding: 5px 10px;
  margin: 10px auto;
  color: #999;
}
.main .categories .categorie a {
  overflow-wrap: break-word;
  word-wrap: break-word;
  background-color: transparent;
  border-bottom: 1px dashed #999;
  color: #999;
  outline: none;
  text-decoration: none;
  cursor: pointer;
}
.main .categories .categorie .num{
  display: inline-block;
}
.main .categories .categorie a:hover {
  color: #000;
  border-bottom: 1px solid #000;
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
</style>
