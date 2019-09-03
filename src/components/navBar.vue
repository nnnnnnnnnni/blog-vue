<template>
  <div id="navBar">
    <div class="container">
      <div class="logo" @click="jump">
        <span class="hang top"></span>
        <span class="title">Sheng仔的博客</span>
        <span class="hang bot"></span>
      </div>
      <div class="bar">
        <router-link :to="{name:'index'}" :class="[{item: true}, active == 'index' ? 'active': '']">
          <i class="fa fa-home" aria-hidden="true"></i>
          &nbsp;主页
        </router-link>
        <router-link :to="{name:'about'}" :class="[{item: true}, active == 'about' ? 'active': '']">
          <i class="fa fa-user" aria-hidden="true"></i>
          &nbsp;关于
        </router-link>
        <router-link :to="{name:'tags'}" :class="[{item: true}, active == 'tag' ? 'active': '']">
          <i class="fa fa-tags" aria-hidden="true"></i>
          &nbsp;标签
        </router-link>
        <router-link
          :to="{name:'categories'}"
          :class="[{item: true},active == 'categories' ? 'active': '']"
        >
          <i class="menu-item-icon fa fa-fw fa-th"></i>
          &nbsp;分类
        </router-link>
        <div class="item">
          <div @click="showInput">
            <i class="fa fa-search" aria-hidden="true"></i>
            &nbsp;搜索
          </div>
          <div class="search" :style="{width: width + 'px'}">
            <input type="text" />
            <i id="searBtn" class="fa fa-search" aria-hidden="true"></i>
          </div>
          <div class="dialog">
            <div class="item" v-for="(item,index) in resultList" :key="index">
              <i class="fa fa-circle" aria-hidden="true"></i>
              <router-link :to="{name:'articles', params:{id: item,title:item}}">{{item}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props: ["active"],
  data() {
    return {
      width: 0,
      resultList: []
    };
  },
  methods: {
    showInput: function() {
      if (this.width == 0) {
        this.width = 200;
      } else {
        this.width = 0;
      }
    },
    jump: function() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#navBar {
  height: 83px;
  background: #f5f5f5;
  width: 100%;
  color: #222;
}
#navBar .container {
  width: 900px;
  height: inherit;
  margin: 0 auto;
}
.container .logo {
  cursor: pointer;
  width: 170px;
  float: left;
  font-weight: bolder;
  display: inline-block;
  font-size: 1.375em;
  font-weight: bolder;
  line-height: 1.5;
  overflow: hidden;
  text-align: center;
  margin: 23px 10px;
}
.container .logo .hang {
  width: 65%;
  margin: 0 auto;
  display: block;
  height: 2px;
  background: #222;
}
.container .logo .title {
  display: inline-block;
  animation: show-down 0.8s 0.5s;
  animation-fill-mode: forwards;
  transform: translateY(-100%);
}
.container .logo .top {
  animation: show-left 0.8s;
  animation-fill-mode: forwards;
  transform: translateX(-100%);
}
.container .logo .bot {
  animation: show-right 0.8s;
  animation-fill-mode: forwards;
  transform: translateX(100%);
}
@-webkit-keyframes show-left {
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0%);
  }
}
@-o-keyframes show-left {
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0%);
  }
}
@-moz-keyframes show-left {
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes show-left {
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0%);
  }
}
@-webkit-keyframes show-right {
  from {
    transform: translateX(110%);
  }
  to {
    transform: translateX(0%);
  }
}
@-o-keyframes show-right {
  from {
    transform: translateX(110%);
  }
  to {
    transform: translateX(0%);
  }
}
@-moz-keyframes show-right {
  from {
    transform: translateX(110%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes show-right {
  from {
    transform: translateX(110%);
  }
  to {
    transform: translateX(0%);
  }
}
.container .bar {
  float: right;
  position: relative;
  transform: translateY(-100%);
  animation: show-down 0.5s 0.5s;
  animation-fill-mode: forwards;
}
@-webkit-keyframes show-down {
  form {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
@-o-keyframes show-down {
  form {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
@-moz-keyframes show-down {
  form {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes show-down {
  form {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}
.container .bar .item {
  display: block;
  font-size: 0.8125em;
  line-height: inherit;
  text-decoration: none;
  border-radius: 2px;
  float: left;
  color: #222;
  padding: 5px 15px;
  margin: 28px 10px;
  transition: 0.4s;
  cursor: pointer;
  position: relative;
}
.container .bar .item:hover {
  background: #e1e1e1;
}
.container .bar .item .search {
  position: absolute;
  left: 75.5px;
  top: 0px;
  background-color: #fff;
  transition: 0.5s;
  overflow: hidden;
}
.container .bar .item .search input {
  border: 0px;
  height: 27px;
  outline: none;
  padding: 0px 5px;
}
.container .bar .item .search i {
  position: absolute;
  right: 7px;
  top: 7px;
}
.active {
  background: #e1e1e1;
}
.container .bar .item .dialog {
  width: 250px;
  border-radius: 5px;
  background: #eee;
  position: absolute;
  left: 75.5px;
  top: 30px;
}
.container .bar .item .dialog .item {
  width: calc(100% - 10px);
  height: 49px;
  margin: 0px;
  padding: 0px 0 0 10px;
  border-bottom: 1px solid #999;
}
.container .bar .item .dialog .item i {
  margin-top: 19px;
  margin-right: 10px;
  float: left;
}
.container .bar .item .dialog .item a {
  display: inline-block;
  height: inherit;
  line-height: 49px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  background-color: transparent;
  color: #555;
  outline: none;
  cursor: pointer;
  font-size: 1.5em;
  width: 210px;
  margin-left: 7px;
  float: left;
}
</style>