<template>
  <div class="gray-wrapper">
    <header class="header white-bg">
      <h1>销售帐薄</h1>
      <img class="add-people" src="/static/images/add-people.png" @click="addModal">
    </header>

    <div class="container">
      <div class="white-bg tab">
        <div class="tab-item active">
          <span>未进厂</span>
        </div>
        <div class="tab-item">
          <span>未结单</span>
        </div>
        <div class="tab-item">
          <span>已结单</span>
        </div>
      </div>

      <div class="content">
        <div class="white-bg list-item">
          <div class="item-top">
            <p>A打包站百合打包站</p>
            <p><img src="/static/images/enter-icon.png" alt="">纸厂D</p>
            <p class="order-num">订单编号：2345678900987654321</p>
          </div>
          <div class="item-bottom">
            <p>
              <img src="/static/images/user-icon.png" alt="">
              <label>司机姓名：</label>
              <span>张得</span>
            </p>
            <p>
              <img src="/static/images/tel-icon2.png" alt="">
              <label>司机手机号：</label>
              <span>13245454545</span>
            </p>
            <p>
              <img src="/static/images/card-icon.png" alt="">
              <label>车牌号：</label>
              <span>京A 12345</span>
            </p>
          </div>
        </div>
        <div class="white-bg list-item">
          <div class="item-top">
            <p>A打包站百合打包站</p>
            <p><img src="/static/images/enter-icon.png" alt="">纸厂D</p>
            <p class="order-num">订单编号：2345678900987654321</p>
          </div>
          <div class="item-bottom">
            <p>
              <img src="/static/images/user-icon.png" alt="">
              <label>司机姓名：</label>
              <span>张得</span>
            </p>
            <p>
              <img src="/static/images/tel-icon2.png" alt="">
              <label>司机手机号：</label>
              <span>13245454545</span>
            </p>
            <p>
              <img src="/static/images/card-icon.png" alt="">
              <label>车牌号：</label>
              <span>京A 12345</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增客户模态框 -->
    <div class="my-modal" v-show="mdShowFlag" v-on:close="closeModal">
      <div class="modal-top">
        <img class="back" src="/static/images/left-icon.png" @click="closeModal">
        <h1>新增客户</h1>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="">客户名称：</label>
          <div class="input-box">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="">联系人：</label>
          <div class="input-box linkman">
            <input type="text" class="form-control" />
            <img class="album" src="/static/images/album-icon.png" />
          </div>
        </div>
        <div class="form-group">
          <label class="">联系电话：</label>
          <div class="input-box">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <label class="">客户地址：</label>
          <div class="input-box">
            <textarea class="textarea" rows="5"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-bottom">
        <a href="javascript:;" class="save-btn">保存</a>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
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
  .tab{
    display: flex;
    .tab-item{
      flex: 1;
      text-align: center;
      padding: 3rem 0;
      span{
        display: inline-block;
        width: 18rem;
        height: 6.6rem;
        line-height: 6.6rem;
        font-size: 3.2rem;
        color: #999;
        text-align: center;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
    }
    .active{
      border-bottom: 2px solid #00877c;
    }
    .active span{
      background: #00877c;
      color: #fff;
    }
  }
  .content{
    .list-item{
      margin-bottom: 1.8rem;
      p{
        line-height: 1.6;
      }
      .item-top{
        border-bottom: 1px solid #ddd;
        padding: 2.5rem;
        p{

        }
      }
      .item-bottom{
        padding: 2.5rem;
        p{
          font-size: 2.8rem;
          img{
            vertical-align: middle;
          }
          label{

          }
          span{
            color: #999;
          }
        }
      }
    }
  }

  /*模态框样式*/
  .my-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    height: auto;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 900;
  }

  .md-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 899;
  }
  .md-modal-transition.md-show {
    visibility: visible;
  }

  .modal-top{
    display: flex;
    margin-bottom: 2rem;
    .back{
      flex: 0 0 1.4rem;
      width: 1.4rem;
      height: 2.6rem;
    }
    h1{
      font-size: 3.4rem;
      color: #333;
      font-weight: normal;
      flex: 1;
      text-align: center;
    }
  }
  .modal-body{
    .form-group{
      line-height: 6rem;
      display: flex;
      margin-bottom: 2rem;
      label{
        flex: 0 0 15rem;
      }
      .input-box{
        flex: 1;
        input{
          width: 86%;
          height: 6rem;
          line-height: 6rem;
          border: 1px solid #ddd;
          font-size: 3rem;
          text-indent: .5rem;
        }
        .textarea{
          width: 86%;
          border: 1px solid #ddd;
          font-size: 3rem;
          text-indent: .5rem;
        }
      }
      .linkman{
        position: relative;
        .album{
          width: 4rem;
          height: 4.4rem;
          position: absolute;
          right: 0;
          top: 1rem;
        }
      }
    }
  }
  .modal-bottom{
    margin: 5rem 0;
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