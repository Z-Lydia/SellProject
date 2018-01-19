<template>
  <div class="gray-wrapper">
    <header class="header white-bg">
      <h1>销售帐薄</h1>
    </header>

    <div class="content">
      <!-- 订单详情 -->
      <div class="white-bg list-item">
        <div class="item-top">
          <p class="order-num">订单编号：{{info.transMap.order_num}}</p>
          <p>打包站名称：{{info.transMap.package_site_name}}</p>
          <p><img src="/static/images/enter-icon.png" /> {{info.transMap.recycle_factory_name}}</p>
        </div>
        <div class="item-bottom">
          <p>
            <label>司机姓名：</label>
            <span>{{info.transMap.carrier_name}}</span>
          </p>
          <p>
            <label>司机手机号：</label>
            <span>{{info.transMap.carrier_mobile}}</span>
          </p>
          <p>
            <label>发运车牌号：</label>
            <span>{{info.transMap.carrier_carnum}}</span>
          </p>
        </div>
        <div class="date-box">
          <label>到厂日期：</label>
            <span>{{info.transMap.addirmTime}}</span>
        </div>
      </div>

      <!-- 回收品类 -->
      <div class="white-bg recycle-box" v-for="item in info.transDetailList">
        <div class="recycle-title">
          回收品类：{{item.recycleTypeTitle}}
        </div>
        <div class="recycle-content">
          <div class="recycle-item">
            <div>
              <label>出站净重：</label>
              <span>{{item.transportWeight/1000000}}T</span>
            </div>
            <div>
              <label>到厂净重：</label>
              <span>{{item.affirmWeight/1000000}}T</span>
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>发运包数：</label>
              <span>{{item.packageNum}}个</span>
            </div>
            <div>
              <label>到厂包数：</label>
              <span>{{item.affirmPackageNum}}个</span>
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>结算净重：</label>
              <span>{{item.affirmWeight/1000000}}T</span>
            </div>
            <div>
              <label>结算单价：</label>
              <span>{{item.unitPrice/100}}元</span>
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>分类应收：</label>
              <span>{{item.totalPrice/100}}元</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="white-bg recycle-box">
        <div class="recycle-content">
          <div class="recycle-item">
            <div>
              <label>扣杂：</label>
              <span>{{info.transMap.dross_percent/1000000}}T</span>
            </div>
            <div>
              <label>扣税：</label>
              <span>{{info.transMap.water_percent/1000000}}T</span>
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>运费：</label>
              <span>{{info.transMap.car_money/100}}元</span>
            </div>
            <div>
              <label>皮重：</label>
              <span>{{info.transMap.tare_weight/1000000}}T</span>
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>到厂皮重：</label>
              <span>{{info.transMap.affirmTare/1000000}}T</span>
            </div>
            <div>
              <label>毛重：</label>
              <span>{{info.transMap.gross_weight/1000000}}T</span>
            </div>
          </div>
          <div class="recycle-item">
            <div>
              <label>到厂毛重：</label>
              <span>{{info.transMap.affirmGross/1000000}}T</span>
            </div>
            <div>
              <label>应收总款：</label>
              <span>{{info.transMap.return_money/100}}元</span>
            </div>
          </div>
        </div>
    </div>

    <div class="white-bg sub-bottom">
      <p>备注：</p>
      <div class="ps">
        <textarea placeholder="请填写备注" v-model="info.transMap.comment"></textarea>
      </div>
      <p>纸厂回执：</p>
      <div class="camera-box">
        <img class="img" :src="info.transMap.imagePath" alt="图片">
      </div>
    </div>

    <div class="btn-group">
      <span class="submit" @click="submitFn">提交</span>
    </div>

  </div>
</template>

<script>
  //import util from '@/assets/js/util.js';
  import axios from 'axios';
  import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
  export default {
    data () {
      return {
        info: null
      }
    },
    mounted(){
      // this.$dialog.loading.open('很快加载好了');
      // Confirm({});
      // Alert({});
      // Toast({});
      // Notify({});
      // Loading({});
      
      //util.getCookie('userId');
      //util.addCookie('userId','汤姆克鲁斯',2);
      //util.delCookie('userId');

      //获取订单详情
      this.getInfo();
    },
    components:{
      
    },
    methods:{
      //获取订单详情
      getInfo(){
        let orderNum = this.$route.query.orderNum;
        axios.get('/transreceipt/selectorderinfo',{
          params:{
            orderNum: orderNum
          }
        }).then((result) => {
          console.log(result);
          this.info = result.data;
        }).catch((error)=>{
          console.log(error);
        })
      },
      //提交
      submitFn(){
        let detailData = [];
        this.info.transDetailList.map((item,index) =>{
          detailData.push(item.recycleTypeId + ':' + (item.affirmWeight?item.affirmWeight:0) + ':' + (item.packageNum?item.packageNum:0) + ':' + (item.unitPrice?item.unitPrice:0) + ':' + (item.totalPrice?item.totalPrice:0));
        })

        var params = new URLSearchParams();
        params.append('orderNum', this.info.transMap.order_num || 0);
        params.append('grossWeight', this.info.transMap.gross_weight || 0);
        params.append('tareWeight', this.info.transMap.tare_weight || 0);
        params.append('detail', detailData.join(',') || '');
        params.append('waterPercent', this.info.transMap.water_percent || 0);
        params.append('drossPercent', this.info.transMap.dross_percent || 0);
        params.append('carMoney', this.info.transMap.car_money || 0);
        params.append('imagePath', this.info.transMap.image_path || '');
        params.append('comment', this.info.transMap.comment);

        axios.post('/transreceipt/insertreceipt', params).then((result)=>{
          console.log(result);
          if(result.data.code == 0){
            Toast({
                mes: '提交成功！',
                timeout: 1500,
                icon: 'success'
            });
          }else{
            Toast({
                mes: result.data.msg,
                timeout: 1500,
                icon: 'error'
            });
          }
        }).catch((error) => {
          console.log(error);
        })
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
          span{
            display: inline-block;
            width: 15rem;
            height: 4rem;
            line-height: 4rem;
            text-indent: 5px;
            color: #999;
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
      .img{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
    }
  }

  .btn-group{
    height: 9.8rem;
    line-height: 9.8rem;
    .submit{
      display: block;
      text-align: center;
      font-size: 3.6rem;
      background: #00877c;
      color: #fff;
    }
  }
</style>