<template>
  <div id="about">
    <navBar :active="current"></navBar>
    <div class="main">
      <div class="profiles">
        <div class="title">关于我</div>
        <div class="item">
          <span class="name">
            <i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;个人邮箱:
          </span>
          <span class="info">
            <a target="_blank" href="mailto:714275326@qq.com">714275326@qq.com</a>
          </span>
        </div>
        <div class="item">
          <span class="name">
            <i class="fa fa-github" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Github:
          </span>
          <span class="info">
            <a target="_blank" href="https://github.com/nnnnnnnnnni">nnnnnnnnnni</a>
          </span>
        </div>
        <div class="item">
          <span class="name">
            <i
              class="fa fa-weibo"
              aria-hidden="true"
            >&nbsp;&nbsp;&nbsp;微&nbsp;&nbsp;&nbsp;&nbsp;博&nbsp;&nbsp;:</i>
          </span>
          <span class="info">
            <a target="_blank" href="https://github.com/nnnnnnnnnni">一个男孩子</a>
          </span>
        </div>
        <div class="item">
          <span class="name">
            <i class="fa fa-weixin" aria-hidden="true"></i>&nbsp;&nbsp;微&nbsp;&nbsp;&nbsp;&nbsp;信:
          </span>
          <span class="info">
            <i
              class="fa fa-qrcode fa-2x"
              aria-hidden="true"
              @mouseover="showQrCode"
              @mouseleave="hideQrCode"
            ></i>
            <img src="../assets/wxcode.png" :class="{imgActive: show}" />
          </span>
        </div>
        <div class="item">
          <span class="name">
            <i class="fa fa-link" aria-hidden="true"></i>&nbsp;其他博客:
          </span>
          <span class="info">
            <a target="_blank" href="https://blog.csdn.net/qq_32867271">CSDN-nysheng</a>
          </span>
        </div>
      </div>
      <div class="projects">
        <div class="title">项目</div>
        <div v-if="projectList.length == 0" class="no">
          <i class="fa fa-times-circle fa-2x fa-fw" aria-hidden="true"></i>
          可以直接去Github看哦！
        </div>
        <div v-else class="no">可松大</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar.vue";
export default {
  name: "about",
  data() {
    return {
      current: "about",
      projectList: [],
      show: false
    };
  },
  components: {
    navBar
  },
  methods: {
    initTitle: function() {
      document.title = "关于我 | 胜仔的博客";
    },
    showQrCode: function() {
      this.show = true;
    },
    hideQrCode: function() {
      this.show = false;
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
.main .profiles {
  color: #555;
  font-size: 1em;
  line-height: 2;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(-30%);
  animation: show-down 0.8s 0.6s;
  animation-fill-mode: forwards;
}
.main .profiles .item {
  margin-bottom: 32px;
  width: 50%;
}
.main .profiles .item .name {
  display: inline-block;
  width: 90px;
  text-align: left;
}
.main .profiles .item a {
  overflow-wrap: break-word;
  word-wrap: break-word;
  background-color: transparent;
  border-bottom: 1px dashed #999;
  color: #999;
  outline: none;
  text-decoration: none;
  cursor: pointer;
}
.main .profiles .item a:hover {
  color: #000;
  border-bottom: 1px solid #000;
}
.main .profiles .item .info {
  position: relative;
  cursor: pointer;
}
.main .profiles .item .info img {
  width: 0px;
  height: 0px;
  position: absolute;
  top: 20px;
  left: 0px;
}
.imgActive {
  animation: showImg 0.5s;
  animation-fill-mode: forwards;
}
.main .projects {
  opacity: 0;
  transform: translateY(-30%);
  animation: show-down 0.8s 1s;
  animation-fill-mode: forwards;
}
.main .no {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}
@-webkit-keyframes showImg {
  0% {
    width: 0px;
    height: 0px;
  }
  45% {
    width: 110px;
    height: 1px;
  }
  100% {
    width: 110px;
    height: 110px;
  }
}
@-o-keyframes showImg {
  0% {
    width: 0px;
    height: 0px;
  }
  45% {
    width: 110px;
    height: 1px;
  }
  100% {
    width: 110px;
    height: 110px;
  }
}
@-moz-keyframes showImg {
  0% {
    width: 0px;
    height: 0px;
  }
  45% {
    width: 110px;
    height: 1px;
  }
  100% {
    width: 110px;
    height: 110px;
  }
}
@keyframes showImg {
  0% {
    width: 0px;
    height: 0px;
  }
  45% {
    width: 110px;
    height: 1px;
  }
  100% {
    width: 110px;
    height: 110px;
  }
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
