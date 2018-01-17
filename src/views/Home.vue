<template>
  <div class="loading-mask">
    <div class="loader font">
      <span>好&nbsp;</span>
      <span class="span3">嘞&nbsp;</span>
      <span class="span4">社&nbsp;</span>
      <span class="span5">区&nbsp;</span>
      <span class="span2">.&nbsp;</span>
      <span class="span6">.&nbsp;</span>
      <span class="span7">.&nbsp;</span>
    </div>
  </div>
</template>

<script>
  //import util from '@/assets/js/util.js'

  export default {
    data () {
      return {
        
      }
    },
    mounted(){
      let code = this.$route.query.code;
      //如果是微信内置浏览器，直接跳微信授权页
      //if(!code && this.isWeiXin()){
      if(!code){
        console.log('跳转授权页');
        //this.jumpToWxBind();
      }else if(code){

      }
    },
    methods:{
      //检测是不是微信内置浏览器
      isWeiXin(){ 
        var ua = window.navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
          return true; 
        }else{ 
          return false; 
        } 
      },
      //微信授权
      jumpToWxBind(){
        //回调地址
        var redirect_url = window.location.href;
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd1553eb16d6f6e60&redirect_uri='+ encodeURIComponent(redirect_url) +'&response_type=code&scope=snsapi_userinfo&state=STATE%23wechat_redirect&connect_redirect=1#wechat_redirect';
        window.location.href = url;
      }
    }
  }
</script>

<style lang="less">
.loading-mask{
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
}

.loader {
    overflow: hidden;
    font-size: 4rem;
    text-align: center;
    display: inline-block;
    min-width: 15rem;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -7.5rem;
}

.loader span {
    -moz-animation: loading 1s linear infinite -0.8s;
    -webkit-animation: loading 1s linear infinite -0.8s;
    animation: loading 1s linear infinite -0.8s;
    float: left;
}

.loader .span2 {
    -moz-animation: loading 1s linear infinite -0.2s;
    -webkit-animation: loading 1s linear infinite -0.2s;
    animation: loading 1s linear infinite -0.2s;
}

.loader .span3 {
    -moz-animation: loading 1s linear infinite -0.5s;
    -webkit-animation: loading 1s linear infinite -0.5s;
    animation: loading 1s linear infinite -0.5s;
}

.loader .span4 {
    -moz-animation: loading 1s linear infinite -1.1s;
    -webkit-animation: loading 1s linear infinite -1.1s;
    animation: loading 1s linear infinite -1.1s;
}

.loader .span5 {
    -moz-animation: loading 1s linear infinite -0.36s;
    -webkit-animation: loading 1s linear infinite -0.36s;
    animation: loading 1s linear infinite -0.36s;
}

.loader .span6 {
    -moz-animation: loading 1s linear infinite -0.65s;
    -webkit-animation: loading 1s linear infinite -0.65s;
    animation: loading 1s linear infinite -0.65s;
}

.loader .span7 {
    -moz-animation: loading 1s linear infinite -0.93s;
    -webkit-animation: loading 1s linear infinite -0.93s;
    animation: loading 1s linear infinite -0.93s;
}

.font {
    font-family: "Comic Sans MS", sans-serif;
    font-weight: bold;
    color: #09e691;
}

@-moz-keyframes loading {
    0%,
    100% {
        -moz-transform: scale(1) rotateZ(0deg);
        transform: scale(1) rotateZ(0deg);
        opacity: 1;
    }
    26% {
        -moz-transform: scale(1.1) rotateZ(12deg);
        transform: scale(1.1) rotateZ(12deg);
        opacity: .2;
    }
    76% {
        -moz-transform: scale(0.8) rotateZ(-8deg);
        transform: scale(0.8) rotateZ(-8deg);
        opacity: .6;
    }
  }

@-webkit-keyframes loading {
    0%,
    100% {
        -webkit-transform: scale(1) rotateZ(0deg);
        transform: scale(1) rotateZ(0deg);
        opacity: 1;
    }
    26% {
        -webkit-transform: scale(1.1) rotateZ(12deg);
        transform: scale(1.1) rotateZ(12deg);
        opacity: .2;
    }
    76% {
        -webkit-transform: scale(0.8) rotateZ(-8deg);
        transform: scale(0.8) rotateZ(-8deg);
        opacity: .6;
    }
}

@keyframes loading {
    0%,
    100% {
        -moz-transform: scale(1) rotateZ(0deg);
        -ms-transform: scale(1) rotateZ(0deg);
        -webkit-transform: scale(1) rotateZ(0deg);
        transform: scale(1) rotateZ(0deg);
        opacity: 1;
    }
    26% {
        -moz-transform: scale(1.1) rotateZ(12deg);
        -ms-transform: scale(1.1) rotateZ(12deg);
        -webkit-transform: scale(1.1) rotateZ(12deg);
        transform: scale(1.1) rotateZ(12deg);
        opacity: .2;
    }
    76% {
        -moz-transform: scale(0.8) rotateZ(-8deg);
        -ms-transform: scale(0.8) rotateZ(-8deg);
        -webkit-transform: scale(0.8) rotateZ(-8deg);
        transform: scale(0.8) rotateZ(-8deg);
        opacity: .6;
    }
}
</style>