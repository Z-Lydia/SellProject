<template>
    <div class="gray-wrapper main">
        <header class="header white-bg">
            <img class="add-people" src="/static/images/left-icon.png" @click="handleReturnClick">
            <h1>账号关联</h1>
        </header>

        <div class="container">
            <section class="content-top">
                <img class="logo" src="/static/images/wx-logo.png" alt="logo">
                <img class="icon" src="/static/images/connect-icon.png" alt="">
                <img class="wx-pic" src="/static/images/wx.png" alt="wx">
            </section>
            <section class="form-wrapper">
                <form class="form">
                    <div class="form-group white-bg">
                        <label>手机号</label>
                        <div class="input-wrap">
                            <input type="text" class="phone" v-model="mobile" placeholder="请输入手机号码" />
    <!--                         <span class="code-btn" @click="getCode()">{{codeText}}</span> -->
                        </div>
                    </div>
<!--                     <div class="form-group white-bg" style="border-top: 1px solid #ddd;">
                        <label>验证码</label>
                        <div class="input-wrap">
                            <input type="text" v-model="code" placeholder="请输入验证码" />
                        </div>
                    </div> -->
                    <div class="text">
                        一键绑定，无需注册。
                    </div>
                    <a href="javascript:;" class="submit-btn" @click="handleConnect()">确认关联</a>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
    export default {
        data () {
            return {
                mobile:'',
                //code:'',
                //codeText:'获取验证码'
            }
        },
        methods:{
            handleReturnClick(){
                this.$router.go( -1 );
            },
            // getCode(){
            //     console.log('get code')
            // },
            handleConnect(){
                if(!this.mobile){
                    Toast({
                        mes:'请输入手机号码',
                        timeout:1500,
                        icon: 'error'
                    })
                    return;
                }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
                    Toast({
                        mes:'请输入正确的手机号码',
                        timeout:1500,
                        icon: 'error'
                    })
                    return;
                }
                axios.get('/login/boundsales?mobile=' + this.mobile).then((result)=>{
                    console.log(result);
                    
                }).catch((error) =>{
                    console.log(error);
                })
            }
        },
        mounted(){
           
        }
    }
</script>

<style lang="less" scoped>
    .main{
        height: 100%;
        overflow: auto;
    }
    .main::-webkit-scrollbar {
        display:none;
    }
    .header{
        padding: 0 .25rem;
        height: .88rem;
        line-height: .88rem;
        display: flex;
        align-items:center;
        border-bottom: 1px solid #ddd;
        .add-people{
            width: 0.14rem;
            height: 0.26rem;
        }
        h1{
            flex: 1;
            text-align: center;
            font-size: .36rem;
            font-weight:normal;
        }
    }
    .content-top{
        margin: 1rem 0;
        padding-top: .13rem;
        text-align: center;
    }
    .content-top .logo,.content-top .wx-pic{
        width: 1.8rem;
        height: 1.8rem;
    }
    .content-top .icon{
        width: 0.88rem;
        height: 0.88rem;
        margin: 0 0.3rem;
    }
    .content-top img{
        vertical-align: middle;
    }
    .form .form-group{
        display: flex;
        width: 100%;
        height: 0.86rem;
        line-height: 0.86rem;
        padding: 0 0.3rem;
        font-size: 0.3rem;
    }
    .form .form-group label{
        flex: 0 0 1.3rem;
        font-size: .3rem;
    }
    .form .form-group .input-wrap{
        flex: 1;
        position: relative;
    }
    .form .form-group .input-wrap input{
        border: none;
        font-size: .3rem;
    }
    .form .form-group .input-wrap input:focus{
        border: none;
        outline: none;
    }
    .form .form-group .input-wrap .phone{
        
    }
    .form .form-group .input-wrap .code-btn{
        color: #00877c;
        display: inline-block;
        position: absolute;
        right: .3rem;
        top: 0;
        z-index: 2;
    }
    .form .text{
        height: .9rem;
        line-height: .9rem;
        padding: 0 .3rem;
        font-size: .3rem;
        color: #666;
    }
    .form .submit-btn{
        display: block;
        margin: 0.8rem auto 0;
        width: 90%;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        font-size: .36rem;
        color: #fff;
        background: #00877c;
        border-radius: .4rem;
    }
</style>