<template>
  <div id="article">
    <navBar :active="current"></navBar>
    <div class="main">
      <div class="container">
        <div class="title">{{article.title}}</div>
        <div class="infos">
          <div class="item bor">
            <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
            发表于
            <span style="border-bottom: 1px dashed #999">{{article.create_time}}</span>
          </div>
          <div class="item bor" v-if="article.update_time">
            更新于
            <span style="border-bottom: 1px dashed #999">{{article.update_time}}</span>
          </div>
          <div class="item">
            <i class="fa fa-folder-o" aria-hidden="true"></i>
            分类于 {{article.categories}}
          </div>
        </div>
        <div class="text" v-html='article.text' v-highlight></div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
export default {
  name: "articles",
  data() {
    return {
      current: "",
      id: this.$route.params.id,
      article: {}
    };
  },
  components: {
    navBar
  },
  methods: {
    initTitle: function() {
      document.title = this.$route.params.title ? this.$route.params.title + " | 胜仔的博客" : "胜仔的博客";
      window.scrollTo(0,0)
    },
    getArticle: function(){
      this.axios.get('/article/id/'+this.id)
      .then((res)=>{
        if(res.data.status == 200){
          let art = res.data.data[0]
          let converter = new showdown.Converter();
          art.text = converter.makeHtml(art.text);
          this.article = art
        }
      })
    },
  },
  created() {

    this.initTitle();
    this.getArticle();
  }
};
</script>

<style scoped>
.main {
  width: 900px;
  margin: 80px auto;
  margin-bottom: 60px;
  padding: 25px;
  box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
}
.main .container {
  opacity: 0;
  transform: translateY(-10%);
  animation: show-down 1s 0.6s;
  animation-fill-mode: forwards;
}
.main .title {
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-weight: 400;
  color: #555;
  font-size: 1.75em;
  line-height: 2;
  width: 100%;
}
.main .infos {
  color: #999;
  font-size: 0.75em;
  margin-top: 5px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
}
.main .text {
  margin-bottom: 60px;
}
.main .infos .bor::after {
  content: "|";
  margin: 0 0.5em;
}
@-webkit-keyframes show-down {
  form {
    transform: translateY(-10%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@-o-keyframes show-down {
  form {
    transform: translateY(-10%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@-moz-keyframes show-down {
  form {
    transform: translateY(-10%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@keyframes show-down {
  form {
    transform: translateY(-10%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
