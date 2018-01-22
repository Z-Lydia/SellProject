<template>
    <div class="gray-wrapper main">
        <header class="header white-bg">
            <img class="add-people" src="/static/images/left-icon.png" @click="handleReturnClick">
            <h1>账号关联</h1>
        </header>

        <div class="container">
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                
            }
        },
        methods:{
            handleReturnClick(){
                this.$router.go( -1 );
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
        padding: 0 2.5rem / 10;
        height: 8.8rem / 10;
        line-height: 8.8rem / 10;
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
            font-size: 3.6rem / 10;
            font-weight:normal;
        }
    }
</style>