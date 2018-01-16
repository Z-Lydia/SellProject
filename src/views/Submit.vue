<template>
  <div class="gray-wrapper">
    <header class="header white-bg">
      <h1>销售帐薄</h1>
      <img class="add-people" src="/static/images/add-people.png" @click="addModal">
    </header>

    <div class="content">
      <!-- 订单详情 -->
      <div class="white-bg list-item">
        <div class="item-top">
          <p class="order-num">订单编号：2345678900987654321</p>
          <p>A打包站百合打包站</p>
          <p><img src="/static/images/enter-icon.png" alt="">纸厂D</p>
        </div>
        <div class="item-bottom">
          <p>
            <label>司机姓名：</label>
            <span>张得</span>
          </p>
          <p>
            <label>司机手机号：</label>
            <span>13245454545</span>
          </p>
          <p>
            <label>车牌号：</label>
            <span>京A 12345</span>
          </p>
        </div>
        <div class="date-box">
          <label>到场日期：</label>
          <input type="text" class="date" placeholder="请选择日期" readonly />
        </div>
      </div>

      <!-- 回收品类 -->
      <div class="white-bg recycle-box">
        <div class="recycle-title">
          回收品类：A类
        </div>
        <div class="recycle-content">
          <div class="recycle-item">
            <div>
              <label>毛重：</label>
              <input type="text" value="10T">
            </div>
            <div>
              <label>到厂毛重：</label>
              <input type="text" value="10T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>皮重：</label>
              <input type="text" value="2T">
            </div>
            <div>
              <label>到厂皮重：</label>
              <input type="text" value="2T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>净重：</label>
              <input type="text" value="8T">
            </div>
            <div>
              <label>到厂净重：</label>
              <input type="text" value="8T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>发运包数：</label>
              <input type="text" value="8个">
            </div>
            <div>
              <label>到厂包数：</label>
              <input type="text" value="8个">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>结算净重：</label>
              <input type="text" value="2T">
            </div>
            <div>
              <label>结算单价：</label>
              <input type="text" value="2T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>应收账款：</label>
              <input type="text" value="25">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>扣杂：</label>
              <input type="text" value="8个">
            </div>
            <div>
              <label>扣水：</label>
              <input type="text" value="8个">
            </div>
          </div>
        </div>
      </div>

      <!-- 回收品类 -->
      <div class="white-bg recycle-box">
        <div class="recycle-title">
          回收品类：B类
        </div>
        <div class="recycle-content">
          <div class="recycle-item">
            <div>
              <label>毛重：</label>
              <input type="text" value="10T">
            </div>
            <div>
              <label>到厂毛重：</label>
              <input type="text" value="10T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>皮重：</label>
              <input type="text" value="2T">
            </div>
            <div>
              <label>到厂皮重：</label>
              <input type="text" value="2T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>净重：</label>
              <input type="text" value="8T">
            </div>
            <div>
              <label>到厂净重：</label>
              <input type="text" value="8T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>发运包数：</label>
              <input type="text" value="8个">
            </div>
            <div>
              <label>到厂包数：</label>
              <input type="text" value="8个">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>结算净重：</label>
              <input type="text" value="2T">
            </div>
            <div>
              <label>结算单价：</label>
              <input type="text" value="2T">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>应收账款：</label>
              <input type="text" value="25">
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>扣杂：</label>
              <input type="text" value="8个">
            </div>
            <div>
              <label>扣水：</label>
              <input type="text" value="8个">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="white-bg sub-bottom">
      <p>备注：</p>
      <div class="ps">
        <textarea placeholder="请填写备注"></textarea>
      </div>
      <p>纸厂回执：</p>
      <div class="camera-box">
        <img src="/static/images/camera2.png" alt="">
        <input type="file" class="file">
      </div>
    </div>

    <div class="btn-group">
      <span class="edit">修改</span>
      <span class="submit">提交</span>
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
        border-bottom: 1px solid #ddd;
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
      .date-box{
        height: 9rem;
        line-height: 9rem;
        display: flex;
        padding: 0 2.5rem;
        label{

        }
        .date{
          flex: 1;
        }
      }
    }
  }

  .recycle-box{
    margin-bottom: 1.8rem;
    .recycle-title{
      height: 9rem;
      line-height: 9rem;
      padding-left: 2.5rem;
      border-bottom: 1px solid #ddd;
    }
    .recycle-content{
      .recycle-item{
        padding: 1rem 2.5rem;
        display: flex;
        div{
          flex: 1;
          font-size: 2.8rem;
          label{

          }
          input{
            width: 15rem;
            height: 4rem;
            line-height: 4rem;
            text-indent: 5px;
            color: #666;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .sub-bottom{
    padding: 0 2.5rem 2.5rem 2.5rem;
    margin-bottom: 1.8rem;
    p{
      height: 7rem;
      line-height: 7rem;
    }
    .ps{
      textarea{
        color: #666;
        font-family: '微软雅黑';
        width: 100%;
        height: 15rem;
        padding: 1rem;
        border: 1px solid #ddd;
      }
    }
    .camera-box{
      width: 100%;
      height: 15rem;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .file{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        opacity: 0;
      }
    }
  }

  .btn-group{
    height: 9.8rem;
    line-height: 9.8rem;
    display: flex;
    span{
      flex: 1;
      display: block;
      text-align: center;
      font-size: 3.6rem;
      background: #fff;
    }
    .edit{

    }
    .submit{
      background: #00877c;
      color: #fff;
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