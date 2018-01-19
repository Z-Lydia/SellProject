<template>
    <div class="gray-wrapper">
        <header class="header white-bg">
            <router-link to="/search">
                <img class="add-people" src="/static/images/left-icon.png">
            </router-link>
            <h1>销售帐薄</h1>
        </header>

        <div class="container">
            <div class="white-bg detail">
                <p>订单编号：{{orderTitle.order_num}}</p>
                <p>{{orderTitle.package_site_name}}</p>
                <p><img src="/static/images/enter-icon.png" alt="">{{orderTitle.recycle_factory_name}}</p>
                <p>司机姓名：{{orderTitle.carrier_name}}</p>
                <p>司机手机：{{orderTitle.carrier_mobile}}</p>
                <p>发运车牌号：{{orderTitle.carrier_carnum}}</p>
            </div>

            <div class="white-bg weight-box" v-for="orderDetailItem in orderDetail">
                <div class="type-box">
                    <p>回收分类：<span>{{orderDetailItem.recycleTypeTitle}}</span></p>
                </div>
                <div class="weight-item">
                    <div class="send">发运净重：<span class="gray">{{orderDetailItem.transportWeight/1000000}}T</span></div>
                    <div class="receive">
                        <span>到厂净重：</span>
                        <input class="input" type="text" />
                        <span class="gray">T</span>
                    </div>
                </div>
                <div class="weight-item last-weight-item">
                    <div class="send">发运包数：<span class="gray">{{orderDetailItem.packageNum}}个</span></div>
                    <div class="receive">
                        <span>到厂包数：</span>
                        <input class="input" type="text" />
                        <span class="gray">个</span>
                    </div>
                </div>
                <hr class="split" />
                <div class="white-bg counter-box">
                    <div>
                        <div class="counter-text">
                            <span>结算净重</span>
                            <span>结算单价</span>
                            <span>分类应收</span>
                        </div>
                        <div class="input-box">
                            <input type="text" @blur="handleGetWeight"/>
                            <span>*</span>
                            <input type="text" @blur="handleGetPrice" />
                            <span>=</span>
                            <input readonly type="text" ref= />
                        </div>
                    </div>
                </div>
            </div>
            <!--结算-->
            <div class="counter-box finnal-counter">
                <div class="weight-box">
                    <div class="weight-item">
                        <div class="send">发运毛重：<span class="gray">{{orderTitle.gross_weight/1000000}}T</span></div>
                        <div class="receive">
                            <span>到厂毛重：</span>
                            <input v-model="affirmGross" class="input" type="text" />
                            <span class="gray">T</span>
                        </div>
                    </div>
                    <div class="weight-item">
                        <div class="send">发运皮重：<span class="gray">{{orderTitle.tare_weight/1000000}}T</span></div>
                        <div class="receive">
                            <span>到厂皮重：</span>
                            <input v-model="affirmTare" class="input" type="text" />
                            <span class="gray">T</span>
                        </div>
                    </div>
                </div>
                <div class="counter-bottom">
                    <div class="counter-text">
                        <span>扣杂</span>
                        <span>扣水</span>
                        <span>运费</span>
                    </div>
                    <div class="input-box" style="position: relative;">
                        <input v-model="dross_percent" type="text" />
                        <span>T</span>
                        <input v-model="warter_percent" type="text" />
                        <span>T</span>
                        <input v-model="car_money" type="text" />
                        <span style="position: absolute;top: 0;">元</span>
                    </div>
                </div>
            </div>

            <div class="white-bg upload-box">
                <div class="upload">
                    <span>拍照：</span>
                      <div class="right-box imgs">
                        <div class="pics">
                          <img :src="imagePath" alt="">
                        </div>
                        <div class="upload">
                            <img src="/static/images/camera.png">
                            <input type="file" class="file" @change="doUpload">
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
                <span class="save-btn" @click="hindleSubmitClick">收单</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                overlayFlag:false,
                mdShowFlag:false,
                orderTitle:{},//司机信息
                orderDetail:[],//分类信息
                weight:'',//结算净重
                price:'',//结算单价
                // affirmPackageNum:'',//到厂包数
                affirmGross:'',//到厂毛重
                affirmTare:'',//到厂皮重
                dross_percent:'',//扣杂
                warter_percent:'',//扣水
                car_money:'',//运费
                imagePath:''
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
            },
            handleGetWeight(e){
                this.weight = Number(e.target.value);
                if( this.price ){
                    this.$refs.total.value=this.weight*this.price
                }else{
                    this.$refs.total.value=""
                }
            },
            handleGetPrice(e){
                var target = e.target;
                this.price = Number(e.target.value);
                if( this.weight ){
                    this.$refs.total.value=this.weight*this.price
                }else{
                    this.$refs.total.value=""
                }
            },
            hindleSubmitClick(){
                
            },
            doUpload(e){
              var that = this;
              var files = e.target.files[0];
              var File = new FileReader();
              File.onload = function(){
                that.imagePath = this.result;
              }
              File.readAsDataURL(files);
            }
        },
        mounted(){
            axios.get( "/transreceipt/selectorderinfo?orderNum="+this.$route.params.id )
            .then( (response) =>{
                const {transDetailList,transMap} = response.data;
                this.orderTitle = transMap;
                this.orderDetail = transDetailList;
            } )
            .catch( (err) =>{
                console.log(err);
            } )
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
      font-weight: normal;
    }
  }
  .detail{
    padding: 2.5rem 2.5rem 0 2.5rem;
    p{
      line-height: 1.8;
    }
  }
  .weight-box{
    margin: 1.8rem 0;
    padding:0 2.5rem 2.5rem 2.5rem;
    .type-box{
      height: 8.8rem;
      line-height: 8.8rem;
      border-bottom: 1px solid #ddd;
      margin-bottom: 3rem;
    }
    .weight-item{
      height: 4rem;
      line-height: 4rem;
      margin-bottom: 2.8rem;
      font-size: 2.8rem;
      display: flex;
      text-align: left;
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
    .last-weight-item{
        margin-bottom: 4rem;
    }
  }

  .counter-box{
    padding: 2.5rem  0;
    text-align: center;
    background: #fff;
    .counter-text{
      span{
        display: inline-block;
        width: 12rem;
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
  .finnal-counter{
    padding-bottom: 2.5rem;
    margin-bottom: 2rem;
  }

  .upload-box{
    padding: 2.5rem;
    .upload{
      display: flex;
      span{
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
          width: 80%;
          border: 1px solid #c8c8c8;
          border-radius: 5px;
          padding: 1rem;
          font-family: '微软雅黑';
          font-size: 3rem;
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
  .split{
    border-style: dashed;
    color: #ddd;
  }
</style>