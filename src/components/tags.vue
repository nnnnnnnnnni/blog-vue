<template>
  <div id="tag">
    <navBar :active="current"></navBar>
    <div class="main">
      <div class="title">标签</div>
      <div class="tags">
        <div class="tag" v-for="(item, index) in tagList " :key="index">
          <router-link :to="{name:'articles', params:{id: item._id,title:item.title}}">{{item}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
export default {
  name: "tag",
  data() {
    return {
      current: "tag",
      tagList: [
        "前端",
        "Html",
        "Css",
        "JavaScript",
        "Vue.js",
        "Git",
        "Node.js",
        "后端",
        "原理",
        "面试",
        "Mongodb",
        "Linux"
      ]
    };
  },
  components: {
    navBar
  },
  methods: {
    initTitle: function() {
      document.title = "标签 | 胜仔的博客";
    }
  },
  created() {
    this.initTitle();
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
.main .tags {
  display: flex;
  flex-wrap: wrap;
}
.main .tags .tag {
  padding: 5px 10px;
  margin: 10px 20px;
}
.main .tags .tag a {
  overflow-wrap: break-word;
  word-wrap: break-word;
  background-color: transparent;
  border-bottom: 1px dashed #999;
  color: #999;
  outline: none;
  text-decoration: none;
  cursor: pointer;
}
.main .tags .tag a:hover {
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
