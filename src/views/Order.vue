<template>
  <div class="gray-wrapper">
    <header class="header white-bg">
      <h1>销售帐薄</h1>
      <img class="add-people" src="/static/images/add-people.png" @click="addModal">
    </header>

    <div class="container">

      <div class="white-bg detail">
        <p>订单编号：201712121450268911</p>
        <p>这是一个如薰衣草庄园般的打包站</p>
        <p><img src="/static/images/enter-icon.png" alt="">这是一个安静又美丽的纸厂</p>
        <p>司机姓名：麻布斯</p>
        <p>司机手机：18823232323</p>
        <p>发运车牌号：京Q667DA</p>
        <div class="type-box">
          <span>回收分类：</span>
          <div class="input">
            <input type="text" placeholder="选择分类" readonly />
            <img src="/static/images/right-icon.png" alt="">
          </div>
        </div>
      </div>

      <div class="white-bg weight-box">
        <div class="weight-item">
          <div class="send">发运毛重：<span class="gray">10T</span></div>
          <div class="receive">
            <span>到厂毛重：</span>
            <input class="input" type="text" />
            <span class="gray">T</span>
          </div>
        </div>
        <div class="weight-item">
          <div class="send">发运毛重：<span class="gray">10T</span></div>
          <div class="receive">
            <span>到厂毛重：</span>
            <input class="input" type="text" />
            <span class="gray">T</span>
          </div>
        </div>
        <div class="weight-item">
          <div class="send">发运净重：<span class="gray">10T</span></div>
          <div class="receive">
            <span>到厂净重：</span>
            <input class="input" type="text" />
            <span class="gray">T</span>
          </div>
        </div>
        <div class="weight-item">
          <div class="send">发运包数：<span class="gray">8个</span></div>
          <div class="receive">
            <span>到厂包数：</span>
            <input class="input" type="text" />
            <span class="gray">个</span>
          </div>
        </div>
      </div>

      <div class="white-bg counter-box">
        <div class="counter-top">
          <div class="counter-text">
            <span>结算净重</span>
            <span>结算单价</span>
            <span>应收账款</span>
          </div>
          <div class="input-box">
            <input type="text" />
            <span>*</span>
            <input type="text" />
            <span>=</span>
            <input type="text" />
          </div>
        </div>
        <div class="counter-bottom" style="padding-top: 2rem;">
          <div class="counter-text">
            <span>扣杂</span>
            <span>扣税</span>
            <span>运费</span>
          </div>
          <div class="input-box" style="position: relative;">
            <input type="text" />
            <span>%</span>
            <input type="text" />
            <span>%</span>
            <input type="text" />
            <span style="position: absolute;right: -6rem;top: 0;">元</span>
          </div>
        </div>
      </div>

      <div class="white-bg upload-box">
        <div class="upload">
          <span>拍照：</span>
          <div class="right-box imgs">
            <div class="pics">
              <!-- <img src="/static/images/camera.png" alt=""> -->
            </div>
            <div class="upload">
              <img src="/static/images/camera.png">
              <input type="file" class="file">
            </div>
          </div>
        </div>
        <div class="upload ps">
          <span>备注：</span>
          <div class="right-box text">
            <textarea rows="4" placeholder="请填写备注"></textarea>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <span class="save-btn">收单</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        overlayFlag:false,
        mdShowFlag:false,
      }
    },
    components:{
      
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
    margin-bottom: 1.5rem;
    h1{
      flex: 1;
      text-align: center;
      font-size: 3.6rem;
    }
    img{
      flex: 0 0 4rem;
      width: 4rem;
      height: 4rem;
    }
  }
  .detail{
    padding: 2.5rem 2.5rem 0 2.5rem;
    p{
      line-height: 1.8;
    }
    .type-box{
      height: 8.6rem;
      line-height: 8.6rem;
      margin-top: 1rem;
      border-top: 1px solid #ddd;
      display: flex;
      span{
        flex: 0 0 13rem;
      }
      .input{
        flex: 1;
        input{
          width: 90%;
          height: 8.6rem;
          line-height: 8.6rem;
          text-align: right;
          color: #999;
          font-size: 3rem;
          margin-right: 1rem;
        }
      }
    }
  }

  .weight-box{
    margin: 1.8rem 0;
    padding: 2.5rem;
    .weight-item{
      height: 4rem;
      line-height: 4rem;
      margin-bottom: 2.8rem;
      font-size: 2.8rem;
      display: flex;
      .send{
        flex: 1;
      }
      .receive{
        flex: 1;
        span{

        }
        .input{
          width: 11.8rem;
          height: 4rem;
          line-height: 4rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          &:focus,&:active{
            border: 1px solid green;
          }
        }
      }
      .gray{
        color: #999;
      }
    }
  }

  .counter-box{
    padding: 2.5rem;
    margin-bottom: 1.8rem;
    text-align: center;
    .counter-top{
      border-bottom: 1px dotted #999;
    }
    .counter-text{
      span{
        display: inline-block;
        width: 11rem;
        &:nth-of-type(2){
          margin: 0 8rem;
        }
      }
    }
    .input-box{
      margin: 2rem 0;
      input{
        width: 12rem;
        height: 4rem;
        line-height: 4rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-indent: 5px;
        &:focus,&:active{
          border: 1px solid green;
        }
      }
      span{
        display: inline-block;
        width: 7rem;
      }
    }
    .counter-bottom{
      .input-box{
        span{
          text-align: left;
        }
      }
    }
  }

  .upload-box{
    padding: 2.5rem;
    .upload{
      display: flex;
      span{
        flex: 0 0 8rem;
        font-size: 2.8rem;
      }
      .right-box{
        flex: 1;
      }
      .imgs{
        overflow: hidden;
        .pics{
          float: left;
          margin-right: 1rem;
          img{
            width: 6.6rem;
            height: 6.6rem;
          }
        }
        .upload{
          float: left;
          width: 6.6rem;
          height: 6.6rem;
          position: relative;
          img{
            width: 6.6rem;
            height: 6.6rem;
          }
          .file{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            opacity: 0;
          }
        }
      }
    }
    .ps{
      margin-top: 2rem;
      .right-box{
        textarea{
          width: 100%;
          border: 1px solid #c8c8c8;
          border-radius: 5px;
          padding: 1rem;
          font-family: '微软雅黑';
        }
      }
    }
  }

  .btn-box{
    padding: 4rem 0;
    .save-btn{
      display: block;
      width: 80%;
      height: 8rem;
      line-height: 8rem;
      margin: 0 auto;
      text-align: center;
      font-size: 3.6rem;
      background: #00877c;
      color: #fff;
      border-radius: 4rem;
    }
  }
</style>