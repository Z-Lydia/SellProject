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
                <p>打包站名称：{{orderTitle.package_site_name}}</p>
                <p><img src="/static/images/enter-icon.png" alt="">{{orderTitle.recycle_factory_name}}</p>
                <p>司机姓名：{{orderTitle.carrier_name}}</p>
                <p>司机手机：{{orderTitle.carrier_mobile}}</p>
                <p>发运车牌号：{{orderTitle.carrier_carnum}}</p>
            </div>

            <div>
                <div>
                    <div class="white-bg weight-box" v-for="orderDetailItem in orderDetail">
                        <div class="type-box">
                            <p>回收分类：<span>{{orderDetailItem.recycleTypeTitle}}</span></p>
                        </div>
                        <div class="weight-item">
                            <div class="send">发运净重：<span class="gray">{{orderDetailItem.transportWeight/1000000}}T</span></div>
                            <div class="receive">
                                <span>到厂净重：</span>
                                <input :ref="'orderDetailItem'+'affirmNet'" class="input" type="text" />
                                <span class="gray">T</span>
                            </div>
                        </div>
                        <div class="weight-item last-weight-item">
                            <div class="send">发运包数：<span class="gray">{{orderDetailItem.packageNum}}个</span></div>
                            <div class="receive">
                                <span>到厂包数：</span>
                                <input :ref="'orderDetailItem'+'affirmPackageNum'" class="input" type="text" />
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
                                    <input :ref="'orderDetailItem'+'unitPrice'" type="text" @blur="handleGetPrice" />
                                    <span>=</span>
                                    <input :ref="'orderDetailItem'+'totalPrice'" readonly type="text" />
                                </div>
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
                            <input v-model="water_percent" type="text" />
                            <span>T</span>
                            <input v-model="car_money" type="text" />
                            <span style="position: absolute;top: 0;">元</span>
                        </div>
                    </div>
                </div>

                <div class="white-bg upload-box">
                    <div class="upload">
                        <span>上传单据照片：</span>
                        <div class="right-box imgs">
                          <div class="upload">
                              <img src="/static/images/camera.png">
                              <input ref="photo" type="file" class="file" @change="doUpload">
                          </div>
                        </div>
                    </div>
                    <div class="pics" v-show="imagePath">
                        <img :src="imagePath">
                    </div>
                    <div class="upload ps">
                        <span>备注：</span>
                        <div class="right-box text">
                            <textarea ref="message" rows="4" placeholder="请填写备注"></textarea>
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <span class="save-btn" @click="hindleSubmitClick">收单</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
    export default {
        data () {
            return {
                overlayFlag:false,
                mdShowFlag:false,
                orderTitle:{},//司机信息
                orderDetail:[],//分类信息
                weight:'',//结算净重
                price:'',//结算单价
                affirmGross:'',//到厂毛重
                affirmTare:'',//到厂皮重
                dross_percent:'',//扣杂
                water_percent:'',//扣水
                car_money:'',//运费
                infoArr:[],
                Submit:'Submit',
                imagePath:''
            } 
        },
        components:{
          
        },
        methods:{
            handleGetWeight(e){
                var target = e.target;
                var total = target.parentNode.lastChild;
                this.weight = e.target.value;
                if( this.price ){
                    total.value=this.weight*this.price
                    this.weight=0
                    this.price=0
                }else{
                    total.value=""
                }
            },
            handleGetPrice(e){
                var target = e.target;
                var total = target.parentNode.lastChild;
                this.price = e.target.value;
                if( this.weight ){
                    total.value=this.weight*this.price
                    this.weight=0
                    this.price=0
                }else{
                    total.value=""
                }
            },
            doUpload(e){
                var that = this;
                var files = e.target.files[0];
                if(!files.type.match(/(jpeg|jpg|gif|bmp|png)$/i)){
                  Toast({
                      mes:'图片格式不正确',
                      timeout:1500,
                      icon: 'error'
                  })
                  return;
                }
                if(files.size > 20*1024*1024){
                  Toast({
                      mes:'图片不能大于20M',
                      timeout:1500,
                      icon: 'error'
                  })
                  return;
                }
                if( files ){
                    var File = new FileReader();
                    File.onload = function(){
                        that.imagePath = this.result;
                    }
                    File.readAsDataURL(files);
                }
            },
            hindleSubmitClick(){
                //分类信息
                this.orderDetail.map( (value,index) =>{
                    const affirmWeightArr = this.$refs.orderDetailItemaffirmNet;
                    const orderDetailItem = value;
                    affirmWeightArr.map( (value,index) =>{
                        const affirmWeight = value.value*1000000;
                        orderDetailItem.affirmWeight = affirmWeight

                    } );
                    const affirmPackageNumArr = this.$refs.orderDetailItemaffirmPackageNum;
                    affirmPackageNumArr.map( (value,map) =>{
                        const affirmPackageNum = value.value;
                        orderDetailItem.affirmPackageNum = affirmPackageNum;
                    } );
                    const unitPriceArr = this.$refs.orderDetailItemunitPrice;
                    unitPriceArr.map( (value,map) =>{
                        const unitPrice = value.value*1000;
                        orderDetailItem.unitPrice = unitPrice;
                    } );
                    const totalPriceArr = this.$refs.orderDetailItemtotalPrice;
                    totalPriceArr.map( (value,index) =>{
                        const totalPrice = value.value*1000;
                        orderDetailItem.totalPrice = totalPrice
                    } )
                } );
                //订单信息
                this.orderTitle.affirmGross = this.affirmGross*1000000;
                this.orderTitle.affirmTare = this.affirmTare*1000000;
                this.orderTitle.dross_percent = this.dross_percent*1000000;
                this.orderTitle.water_percent = this.water_percent*1000000;
                this.orderTitle.car_money = this.car_money*1000;
                this.orderTitle.comment = this.$refs.message.value;
                this.orderTitle.imagePath = this.imagePath
                //到达时间
                const date = new Date().toLocaleString();
                this.orderTitle.addirmTime = date;
                //localStorag
                const orderTitleInfo = JSON.stringify(this.orderTitle)
                const orderDetailInfoArr=[];
                this.orderDetail.map( (value,index) =>{
                    orderDetailInfoArr.push( JSON.stringify(value) )
                } )
                const orderDetailInfo = orderDetailInfoArr.toString();
                console.log( orderDetailInfo );
                const storage=window.localStorage;
                storage.orderTitleInfo = orderTitleInfo;
                storage.orderDetailInfo = orderDetailInfo
                this.$router.push( {name:this.Submit});
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
    padding: 0 .25rem;
    height: .88rem;
    line-height: .88rem;
    display: flex;
    align-items:center;
    margin-bottom: .15rem;
    a{
      img{
        width: .14rem;
        height: .26rem;
      }
    }
    h1{
      flex: 1;
      text-align: center;
      font-size: .36rem;
      font-weight: normal;
    }
  }
  .detail{
    padding: .25rem .25rem 0 .25rem;
    p{
      line-height: 1.8;
    }
  }
  .weight-box{
    margin: .18rem 0;
/*    padding:0 .25rem .25rem .25rem;*/
    padding:0 .25rem;
    .type-box{
      height: .88rem;
      line-height: .88rem;
      border-bottom: 1px solid #ddd;
      margin-bottom: .3rem;
    }
    .weight-item{
      height: .4rem;
      line-height: .4rem;
      margin-bottom: .28rem;
      font-size: .28rem;
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
          width: 1.18rem;
          height: .4rem;
          line-height: .4rem;
          border: 1px solid #ddd;
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
        margin-bottom: .4rem;
    }
  }

  .counter-box{
    padding: .25rem 0;
    text-align: center;
    background: #fff;
    .counter-text{
      span{
        display: inline-block;
        width: 1.2rem;
        &:nth-of-type(2){
          margin: 0 .8rem;
        }
      }
    }
    .input-box{
      margin: .2rem 0;
      input{
        width: 1.2rem;
        height: .4rem;
        line-height: .4rem;
        border: 1px solid #ddd;
        text-indent: 5px;
        &:focus,&:active{
          border: 1px solid green;
        }
      }
      span{
        display: inline-block;
        width: .7rem;
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
    padding-bottom: .25rem;
    margin-bottom: .2rem;
  }

  .upload-box{
    padding: .25rem;
    .upload{
      display: flex;
      span{
        font-size: .28rem;
      }
      .right-box{
        flex: 1;
      }
      .imgs{
        overflow: hidden;
        .pics{
          float: left;
          margin-right: .1rem;
          img{
            width: .66rem;
            height: .66rem;
          }
        }
        .upload{
          float: left;
          width: .66rem;
          height: .66rem;
          position: relative;
          img{
            width: .66rem;
            height: .66rem;
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
    .pics{
      img{
        width: 100%;
      }
    }
    .ps{
      margin-top: .2rem;
      .right-box{
        textarea{
          width: 80%;
          border: 1px solid #c8c8c8;
          padding: .1rem;
          font-family: '微软雅黑';
          font-size: .3rem;
        }
      }
    }
  }

  .btn-box{
    padding: .4rem 0;
    .save-btn{
      display: block;
      width: 80%;
      height: .8rem;
      line-height: .8rem;
      margin: 0 auto;
      text-align: center;
      font-size: .36rem;
      background: #00877c;
      color: #fff;
      border-radius: .4rem;
    }
  }
  .split{
    border-style: dashed;
    color: #ddd;
  }
</style>