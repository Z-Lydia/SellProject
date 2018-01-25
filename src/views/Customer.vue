<template>
	<div class="gray-wrapper">
	  <header class="header white-bg">
			<img class="add-icon" src="/sound-recycle-sales/static/images/add-icon.png" @click="addModal">
			<h1>销售帐薄</h1>
			<img class="add-people" src="/sound-recycle-sales/static/images/add-people.png">
		</header>
    <div class="white-bg container">
      <!-- 搜索区域 -->
      <div class="search-content">
        <div class="search-box">
          <img src="/sound-recycle-sales/static/images/search-icon.png" class="icon search-icon">
          <input type="text" class="keyword" placeholder="请输入关键字搜索" />
          <img src="/sound-recycle-sales/static/images/del-icon.png" class="icon del-icon">
        </div>
        <span class="search-btn">搜索</span>
      </div>
      <!-- 列表区域 -->
      <ul class="list">
        <li class="list-item">
          <div class="list-text">
            <h3>客户</h3>
            <p>15810982222</p>
          </div>
          <div class="tel">
            <img src="/sound-recycle-sales/static/images/tel-icon.png" alt="">
          </div>
        </li>
        <li class="list-item">
          <div class="list-text">
            <h3>客户</h3>
            <p>15810982222</p>
          </div>
          <div class="tel">
            <img src="/sound-recycle-sales/static/images/tel-icon.png" alt="">
          </div>
        </li>
      </ul>
    </div>

    <!-- 新增客户模态框 -->
    <div class="my-modal" v-show="mdShowFlag" v-on:close="closeModal">
      <div class="modal-top">
        <img class="back" src="/sound-recycle-sales/static/images/left-icon.png" @click="closeModal">
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
            <img class="album" src="/sound-recycle-sales/static/images/album-icon.png" />
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
  .gray-wrapper{
    width:100%;
    height:100%;
    position:absolute;
    left: 0;
    top: 0;
    background: #f3f3f3;
  }
  .header{
      padding: 0 .25rem;
      height: .88rem;
      line-height: .88rem;
      display: flex;
      align-items:center;
      margin-bottom: .15rem;
    h1{
      flex: 1;
      text-align: center;
      font-size: .36rem;
    }
    img{
      flex: 0 0 .4rem;
      width: .4rem;
      height: .4rem;
    }
  }
  .container{
    padding-top: .25rem;
    .search-content{
      height: .7rem;
      line-height: .7rem;
      margin: 0 .25rem .25rem .25rem;
      display: flex;
      .search-box{
        flex: 1;
        background: #f3f3f3;
        border-radius: .3rem;
        color: #999;
        position: relative;
        .icon{
          position: absolute;
          top: .2rem;
        }
        .search-icon{
          left: .2rem;
        }
        .del-icon{
          position: absolute;
          right: .2rem;
        }
        .keyword{
          height: .7rem;
          line-height: .7rem;
          font-size: .3rem;
          background: none;
          position: absolute;
          left: .6rem;
          top: 0;
        }
      }
      .search-btn{
        flex: 0 0 .95rem;
        font-size: .32rem;
        text-align: right;
      }
    }
    ul.list{
      .list-item{
        height: 1.12rem;
        padding: 0 .25rem;
        display: flex;
        border-top: 1px solid #ddd;
        align-items: center;
        .list-text{
          flex: 1;
          h3{
            font-size: .32rem;
            color: #333;
          }
          p{
            font-size: .3rem;
            color: #666;
          }
        }
        .tel{
          flex: 0 0 .44rem;
          img{
            width: .44rem;
            height: .44rem;
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
    padding: .2rem;
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
    margin-bottom: .2rem;
    .back{
      flex: 0 0 .14rem;
      width: .14rem;
      height: .26rem;
    }
    h1{
      font-size: .34rem;
      color: #333;
      font-weight: normal;
      flex: 1;
      text-align: center;
    }
  }
  .modal-body{
    .form-group{
      line-height: .6rem;
      display: flex;
      margin-bottom: .2rem;
      label{
        flex: 0 0 1.5rem;
      }
      .input-box{
        flex: 1;
        input{
          width: 86%;
          height: .6rem;
          line-height: .6rem;
          border: 1px solid #ddd;
          font-size: .3rem;
          text-indent: .05rem;
        }
        .textarea{
          width: 86%;
          border: 1px solid #ddd;
          font-size: .3rem;
          text-indent: .05rem;
        }
      }
      .linkman{
        position: relative;
        .album{
          width: .4rem;
          height: .44rem;
          position: absolute;
          right: 0;
          top: .1rem;
        }
      }
    }
  }
  .modal-bottom{
    margin: .5rem 0;
    .save-btn{
      display: block;
      width: 80%;
      height: 8rem;
      line-height: 8rem;
      margin: 0 auto;
      text-align: center;
      font-size: .36rem;
      background: #00877c;
      color: #fff;
      border-radius: .4rem;
    }
  }
</style>
