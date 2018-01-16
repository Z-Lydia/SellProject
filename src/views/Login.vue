<template>
  <div>
    <div class="login-bg">
      <img src="/static/images/login-bg.png" alt="">
    </div>
    <div class="login-box">
      <div class="form-group">
        <span class="num">+86</span>
        <input class="input" type="text" v-model="phone" placeholder="请输入手机号码" />
        <img class="del" src="/static/images/del-icon.png" />
      </div>
      <div class="form-group">
        <input type="text" class="code" v-model="code" placeholder="请输入验证码" />
        <span class="code-btn" @click="getCode()">{{codeText}}</span>
      </div>
      <div class="login-btn">
        <a href="javascript:;" @click="login()">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
  //import util from '@/assets/js/util.js';

  export default {
    data () {
      return {
        phone:'',
        code:'',
        codeText:'获取验证码'
      }
    },
    methods:{
      //获取验证码
      getCode(){
        alert('获取验证码');
      },
      //登录
      login(){
        alert('登录');
      }
    }
  }
</script>

<style lang="less" scoped>
.login-bg{
  width: 100%;
  height: 50rem;
  img{
    width: 100%;
    height: 100%;
  }
}
.login-box{
  margin: 6rem;
  .form-group{
    height: 12rem;
    line-height: 12rem;
    margin-bottom: 0;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    font-size: 3.2rem;
    color: #333;
    .num{
      flex: 0 0 8.5rem;
    }
    .input{
      flex: 1;
      color: #bbb;
      font-size: 3.2rem;
    }
    .del{
      flex: 0 0 4rem;
      width: 4rem;
      height: 4rem;
      margin-top: 4rem;
    }
    .code{
      flex: 1;
      font-size: 3.2rem;
    }
    .code-btn{
      flex: 0 0 18rem;
      height: 6.6rem;
      line-height: 6.6rem;
      margin-top: 2.7rem;
      margin-left: 1rem;
      text-align: center;
      font-size: 3rem;
      color: #00877c;
      border: 1px solid #00877c;
      border-radius: 5px;
    }
  }
  .login-btn{
    margin: 10rem 0;
    a{
      display: block;
      width: 100%;
      height: 8.8rem;
      line-height: 8.8rem;
      text-align: center;
      border-radius: 4rem;
      font-size: 3.6rem;
      color: #fff;
      background: #00877c;
      box-shadow: 2px 2px 5px rgba(0,0,0,.3);
    }
  }
}
</style>