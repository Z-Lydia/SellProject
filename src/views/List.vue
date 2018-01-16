<template>
  <div class="gray-wrapper">
    <header class="header white-bg">
      <div class="filter">
        <span>报价</span>
        <img src="/static/images/down-icon.png" alt="">
      </div>
      <h1>缴款列表</h1>
      <img class="add-people" src="/static/images/add-people.png" @click="addModal">
    </header>

    <div class="white-bg select-paper">
      <span>选择纸厂</span>
      <div class="input-box">
        <input type="text" placeholder="请选择纸厂" readonly>
        <img src="/static/images/right-icon.png" alt="">
      </div>
    </div>

    <div class="white-bg recycle-type">
      <div class="recycle-top">
        <span>回收类别</span>
        <img class="add-icon" src="/static/images/add-icon.png" alt="">
      </div>
      <div class="content">
        <ul class="recycle-list">
          <li>
            <label>回收类别明细</label>
            <div class="now-price">
              <b>现价</b>
              <input type="text" class="input">
              <span>元/T</span>
            </div>
          </li>
          <li>
            <label>回收类别明细</label>
            <div class="now-price">
              <b>现价</b>
              <input type="text" class="input">
              <span>元/T</span>
            </div>
          </li>
          <li>
            <label>回收类别明细</label>
            <div class="now-price">
              <b>现价</b>
              <input type="text" class="input">
              <span>元/T</span>
            </div>
          </li>
          <li>
            <label>回收类别明细</label>
            <div class="now-price">
              <b>现价</b>
              <input type="text" class="input">
              <span>元/T</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="recycle-box">
        <a href="javascript:;" class="recycle-btn">发布</a>
      </div>
    </div>

    <div class="white-bg list-wrapper">
      <div class="list-item">
        <div class="list-txt">
          <p>报价纸厂：<span>H纸厂</span></p>
          <p>报价类别：<span>黄纸</span></p>
          <p>报价：<span>25元/T</span></p>
        </div>
        <a href="javascript:;" class="edit-btn">修改</a>
      </div>
      <div class="list-item">
        <div class="list-txt">
          <p>报价纸厂：<span>H纸厂</span></p>
          <p>报价类别：<span>黄纸</span></p>
          <p>报价：<span>25元/T</span></p>
        </div>
        <a href="javascript:;" class="edit-btn">修改</a>
      </div>
      <div class="list-item">
        <div class="list-txt">
          <p>报价纸厂：<span>H纸厂</span></p>
          <p>报价类别：<span>黄纸</span></p>
          <p>报价：<span>25元/T</span></p>
        </div>
        <a href="javascript:;" class="edit-btn">修改</a>
      </div>
    </div>

    <vue-pickers :show="show1" :selectData="pickData1" v-on:cancel="close" v-on:confirm="confirmFn"></vue-pickers>
    
  </div>
</template>

<script>
  import VuePickers from 'vue-pickers'
  export default {
    data () {
      return {
        overlayFlag:false,
        mdShowFlag:false,
        show1:true,
        pickData1: {
          columns: 1, // picker的列数
          // 第一列的数据结构
          pData1: [
            {
              text: 1999,
              value: 1999
            },
            {
              text: 2001,
              value: 2001
            },
            {
              text: 2002,
              value: 2002
            },
            {
              text: 2003,
              value: 2003
            },
            {
              text: 2004,
              value: 2004
            },
            {
              text: 2005,
              value: 2005
            },
          ]
        }
      }
    },
    components:{
      VuePickers
    },
    methods:{
      //新增客户模态框
      addModal(){
        this.mdShowFlag = true;
        this.overlayFlag = true;
      },
      //关闭模态框
      closeModal(){
        this.mdShowFlag = false;
        this.overlayFlag = false;
      },
      //关闭遮罩
      closePop(){
        this.mdShowFlag = false;
        this.overlayFlag = false;
      },
      confirmFn(){
        console.log('sure')
      },
      close(){
        console.log('close')
      }
    }
  }
</script>

<style lang="less" scoped>
  .header{
    padding: 0 2.5rem;
    height: 8.8rem;
    line-height: 8.8rem;
    display: flex;
    align-items:center;
    margin-bottom: 4px;
    box-shadow: 0 4px 4px rgba(0,0,0,.06);
    .filter{
      span{
        color: #666;
      }
      img{
        width: 2rem;
        height: 1rem;
      }
    }
    h1{
      flex: 1;
      text-align: center;
      font-size: 3.6rem;
    }
    &>img{
      flex: 0 0 4rem;
      width: 4rem;
      height: 4rem;
    }
  }
  .select-paper{
    height: 8.4rem;
    line-height: 8.4rem;
    padding: 0 2.5rem;
    display: flex;
    margin-bottom: 1.8rem;
    span{
      flex: 0 0 12rem;
    }
    .input-box{
      flex: 1;
      input{
        width: 90%;
        height: 8.4rem;
        line-height: 8.4rem;
        text-align: right;
        margin-right: 2rem;
      }
      img{

      }
    }
  }

  .recycle-type{
    .recycle-top{
      height: 9rem;
      line-height: 9rem;
      padding: 0 2.5rem;
      display: flex;
      align-items: center;
      span{
       flex: 1;
       font-size: 3.2rem;
      }
      .add-icon{
        width: 4rem;
        height: 4rem;
        flex: 0 0 4rem;
      }
    }
    .content{
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      padding: 2.5rem;
      .recycle-list{
        li{
          height: 3.6rem;
          line-height: 3.6rem;
          margin-bottom: 1.5rem;
          display: flex;
          label{
            flex: 1;
          }
          .now-price{
            flex: 0 0 21.5rem;
            b{
              font-weight: normal;
            }
            .input{
              width: 7.5rem;
              height: 3.6rem;
              line-height: 3.6rem;
              color: #666;
              margin: 0 1rem;
              text-indent: 5px;
              border: 1px solid #ddd;
              border-radius: 5px;
              &:active,&:focus{
                border: 1px solid #00877c;
              }
            }
            span{
              font-size: 2.8rem;
              color: #999;
            }
          }
        }
      }
    }
    .recycle-box{
      height: 11.6rem;
      line-height: 11.6rem;
      text-align: center;
      margin-bottom: 1.8rem;
      .recycle-btn{
        display: inline-block;
        width: 20rem;
        height: 5.6rem;
        line-height: 5.6rem;
        text-align: center;
        font-size: 2.8rem;
        color: #00877c;
        border: 1px solid #00877c;
        border-radius: 5px;
      }
    }
  }

  .list-wrapper{
    .list-item{
      padding: 2.5rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .list-txt{
        flex: 1;
        p{
          margin-bottom: 2rem;
          span{
            color: #999;
          }
        }
      }
      .edit-btn{
        flex: 0 0 13rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
        border: 1px solid #00877c;
        font-size: 2.8rem;
        color: #00877c;
        border-radius: 5px;
      }
    }
  }
</style>