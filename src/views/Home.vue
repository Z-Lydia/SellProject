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
  import axios from 'axios';
  export default {
    data () {
      return {
        
      }
    },
    mounted(){
      axios.get('/login/login').then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      })
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