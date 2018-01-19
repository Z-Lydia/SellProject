<template>
	<div class="gray-wrapper">
		<header class="header white-bg">
			<img class="add-people" src="/static/images/left-icon.png" @click="handleReturnClick">
            <h1>销售帐薄</h1>
        </header>

        <div class="content">
            <!-- 订单详情 -->
            <div class="white-bg list-item">
                <div class="item-top">
                    <p class="order-num">订单编号：{{orderTitle.order_num}}</p>
                    <p>{{orderTitle.package_site_name}}</p>
                    <p><img src="/static/images/enter-icon.png" alt="">{{orderTitle.recycle_factory_name}}</p>
                </div>
                <div class="item-bottom">
                    <p>
                        <label>司机姓名：</label>
                        <span>{{orderTitle.carrier_name}}</span>
                    </p>
                    <p>
                        <label>司机手机号：</label>
                        <span>{{orderTitle.carrier_mobile}}</span>
                    </p>
                    <p>
                        <label>车牌号：</label>
                        <span>{{orderTitle.carrier_carnum}}</span>
                    </p>
                </div>
                <div class="date-box">
                    <label>到场日期：</label>
                    <span>{{orderTitle.arrive_time}}</span>
                </div>
            </div>

            <!-- 回收品类 -->
            <div class="white-bg recycle-box" v-for="orderDetailItem in orderDetail">
                <div class="recycle-title">
                  回收品类：{{orderDetailItem.recycleTypeTitle}}
                </div>
                <div class="recycle-content">
                    <div class="recycle-item">
                        <div>
                            <label>出站净重：</label>
                            <span>{{orderDetailItem.transportWeight/1000000}}T</span>
                        </div>
                        <div>
                            <label>到厂净重：</label>
                            <span>{{orderDetailItem.affirmWeight/1000000}}T</span>
                        </div>
                    </div>
                    <div class="recycle-item">
                        <div>
                            <label>发运包数：</label>
                            <span>{{orderDetailItem.packageNum}}个</span>
                        </div>
                        <div>
                            <label>到厂包数：</label>
                            <span>{{orderDetailItem.affirmPackageNum}}个</span>
                        </div>
                    </div>
                    <div class="recycle-item">
                        <div>
                            <label>结算净重：</label>
                            <span>{{orderDetailItem.affirmWeight/1000000}}T</span>
                        </div>
                        <div>
                            <label>结算单价：</label>
                            <span>{{orderDetailItem.unitPrice/100}}元</span>
                        </div>
                    </div>
                    <div class="recycle-item">
                        <div>
                            <label>应收账款：</label>
                            <span>{{orderDetailItem.totalPrice/100}}元</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--结算-->
            <div class="white-bg recycle-box">
                <div class="recycle-content">
                    <div class="recycle-item">
                        <div>
                            <label>扣杂：</label>
                            <span>{{orderTitle.dross_percent/1000000}}T</span>
                        </div>
                        <div>
                            <label>扣水：</label>
                            <span>{{orderTitle.water_percent/1000000}}T</span>
                        </div>
                        <div>
                            <label>运费：</label>
                            <span>{{orderTitle.car_money/100}}元</span>
                        </div>
                    </div>
                    <div class="recycle-item">
                        <div>
                            <label>皮重：</label>
                            <span>{{orderTitle.tare_weight/1000000}}T</span>
                        </div>
                        <div>
                            <label>到厂皮重：</label>
                            <span>{{orderTitle.affirmTare/1000000}}T</span>
                        </div>
                    </div>
                    <div class="recycle-item">
                        <div>
                            <label>毛重：</label>
                            <span>{{orderTitle.gross_weight/1000000}}T</span>
                        </div>
                        <div>
                            <label>到厂毛重：</label>
                            <span>{{orderTitle.affirmGross/1000000}}T</span>
                        </div>
                    </div>
                    <div class="recycle-item">
                        <div>
                            <label>应收总款：</label>
                            <span>{{orderTitle.return_money/100}}元</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="white-bg sub-bottom">
            <p>备注：</p>
            <div class="ps">
                {{orderTitle.comment}}
            </div>
            <p>纸厂回执：</p>
            <div class="camera-box">
                <img src="/static/images/camera2.png" alt="">
            </div>
        </div>
	</div>
</template>
<script>
    import axios from 'axios'
	export default {
	    data () {
	      	return {
                orderTitle:{},
                orderDetail:[]
	      	}
	    },
	    components:{
	      
	    },
	    methods:{
	    	handleReturnClick(){
	    		this.$router.go( -1 );
	    	}
	    },
        mounted(){
            axios.get( "/transreceipt/selectorderinfo?orderNum=50000311515480994470" )
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
	        span{
	          	color: rgb(153,153,153);
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
          span{
            color: rgb(153,153,153);
            width: 15rem;
            height: 4rem;
            line-height: 4rem;
            text-indent: 5px;
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
      	margin-left: 5rem;
    }
    .camera-box{
      width: 100%;
      height: 15rem;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>