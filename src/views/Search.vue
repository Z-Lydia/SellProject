<template>
    <div class="gray-wrapper main">
        <header class="header white-bg">
           <h1>销售帐薄</h1>
           <!-- <img class="add-people" src="../assets/img/add-people.png" @click="addModal"> -->
        </header>

        <div class="container">
            <div class="content">
                <div class="Select" @click="handleSelectClick">
                    <p>选择纸厂<span class="SelectResult">{{this.Selected}}</span></p>
                </div>
                <div class="noData" v-show="!this.orderlist.length">暂无数据</div>
                <div v-for="orderlistItem in orderlist" class="white-bg list-item" @click="handleOrderClick" :id="orderlistItem.order_num">
                    <div class="item-top">
                        <p>{{orderlistItem.package_site_name}}</p>
                        <img src="../assets/img/enter-icon.png" alt="">
                        <p style="display: inline-block;">{{orderlistItem.recycle_factory_name}}</p>
                        <p class="order-num">订单编号：{{orderlistItem.order_num}}</p>
                    </div>
                    <div class="item-bottom">
                        <p>
                           <img src="../assets/img/user-icon.png" alt="">
                           <label>司机姓名：</label>
                           <span>{{orderlistItem.carrier_name}}</span>
                        </p>
                        <p>
                           <img src="../assets/img/tel-icon2.png" alt="">
                           <label>司机手机号：</label>
                           <span>{{orderlistItem.carrier_mobile}}</span>
                        </p>
                        <p>
                           <img src="../assets/img/card-icon.png" alt="">
                           <label>车牌号：</label>
                           <span>{{orderlistItem.carrier_carnum}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="unfinished" :class="{checked:isSelect===3}" @click="handleSwitchClick(3)">
                未接单
            </div>
            <div class="finished" :class="{checked:isSelect===4}" @click="handleSwitchClick(4)">
                已结单
            </div>
        </div>

        <!-- 新增客户模态框 -->
        <div class="my-modal" v-show="mdShowFlag" v-on:close="closeModal">
            <div class="modal-top">
                <img class="back" src="../assets/img/left-icon.png" @click="closeModal">
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
                        <img class="album" src="../assets/img/album-icon.png" />
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
        <VuePickers class="picker" :show="show"
                    :selectData="factorylist"
                    @cancel="handleCloseClick"
                    @confirm="handleConfirmClick"></VuePickers>
    </div>
</template>

<script>
    import VuePickers from 'vue-pickers'
    import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
    import util from '@/assets/js/util.js'
    import axios from 'axios'
    import { mapState } from "vuex"
    export default {
        data () {
            return {
                overlayFlag:false,
                mdShowFlag:false,
                Selected:"请选择纸厂",
                factoryId:"",
                isSelect:3,
                show:false,
                orderlist:[],
                routerLink:"Order",
            }
        },
        computed: mapState({
            factorylist(state) {
                var factorylist = state.factorylist;
                var pData1 = [];
                for( var i=0,l=factorylist.length;i<l;i++ ){
                    var obj = {text:"",value:""};
                    obj.text = factorylist[i].name;
                    obj.value = factorylist[i].id;
                    pData1.push(obj);
                }
                var pickData = {
                    columns:1,
                    pData1:pData1
                }
                return pickData
            }
        }),
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
            handleSwitchClick(n){
                this.isSelect = n;
                if( n==3 ){
                    this.routerLink = "Order"
                }else{
                    this.routerLink = "Detail"
                }
                axios.get(baseUrl + "/transreceipt/translist?factoryId="+this.factoryId+"&orderState="+this.isSelect,
                    {headers: {'X-Requested-With': 'XMLHttpRequest'}})
                .then((response) =>{
                    this.orderlist = response.data.data;
                    this.orderlist.map( (value,index) =>{
                        this.routerlinkId = value.order_num
                    } );
                })
                .catch((err) =>{
                    console.log(err);
                })
            },
            handleSelectClick(){
                this.show = true
            },
            handleCloseClick(){
                this.show = false
            },
            handleConfirmClick(data){
                this.factoryId = data.select1.value;
                this.Selected = data.select1.text;
                this.show = false
                axios.get(baseUrl + "/transreceipt/translist?factoryId="+this.factoryId+"&orderState="+this.isSelect,
                    {headers: {'X-Requested-With': 'XMLHttpRequest'}})
                .then((response) =>{
                    if(response.data.code == 0){
                        this.orderlist = response.data.data;
                        this.orderlist.map( (value,index) =>{
                            this.routerlinkId = value.order_num
                        } );
                    }else{
                        Toast({
                          mes:response.data.msg,
                          timeout:1500,
                          icon: 'error'
                        })
                    }
                })
                .catch((err) =>{
                    console.log(err);
                })
            },
            //页面跳转,获取订单ID
            handleOrderClick(e){
                var target = e.currentTarget;
                this.$router.push( {name:this.routerLink,params: { id: target.id }});
            },
        },
        mounted(){
            if (this.$store.getters.shouldGetFactoryInfo) {
                this.$store.dispatch("getFactoryInfo");
            };
            axios.get(baseUrl + "/transreceipt/translist?orderState=3",{headers: {'X-Requested-With': 'XMLHttpRequest'}})
            .then((response) =>{
                if(response.data.code == 0){
                    this.orderlist = response.data.data;
                    this.orderlist.map( (value,index) =>{
                        this.routerlinkId = value.order_num
                    } );
                }else{
                    Toast({
                      mes:response.data.msg,
                      timeout:1500,
                      icon: 'error'
                    })
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        },
        beforeRouteEnter(to, from, next) {
             next()
        },
        beforeRouteLeave(to, from, next) {
            if(to.path == '/'){
                if(util.isWeiXin()){
                    WeixinJSBridge.call('closeWindow');
                }
            }
            next()
        },
    }
</script>

<style lang="less" scoped>
    .main{
        overflow-x: hidden;
    }
    .header{
        padding: 0 .25rem;
        height: .88rem;
        line-height: .88rem;
        display: flex;
        align-items:center;
        border-bottom: 1px solid #ddd;
        h1{
            flex: 1;
            text-align: center;
            font-size: .36rem;
            font-weight:normal
        }
        img{
            flex: 0 0 .4rem;
            width: .4rem;
            height: .4rem;
        }
    }
    .Select{
        height: .88rem;
        margin-bottom: .2rem;
        background: #fff;
        p{
            font-size: .3rem;
            color: #333;
            line-height: .88rem;
            margin-left: .26rem;
            .SelectResult{
                max-width: 3.75rem;
                padding-right: .2rem;
                float: right;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                margin-right: .26rem;
                background: url("../assets/img/right-icon.png") no-repeat right center;
                background-size: .14rem .26rem;
            }
        }
    }
    .noData{
        position: absolute;
        top: .20rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        text-align: center;
        line-height: 1.0rem;
	    font-size: .3rem;
    }
    .container{
        margin-bottom: .96rem;
    }
    .content{
        .list-item{
            margin-bottom: .18rem;
            p{
                line-height: 2;
            }
            .item-top{
                border-bottom: 1px solid #ddd;
                padding: .25rem;
                p{
                    font-size: .3rem;
                }
            }
            .item-bottom{
                padding: .25rem;
                p{
                    font-size: .28rem;
                    img{
                        vertical-align: middle;
                        width: .4rem;
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
    .footer{
        position: fixed;
        bottom: 0;
        height: .96rem;
        width: 100%;
        background: #cce7e5;
        font-size: .34rem;
        color: #00877c;
        line-height: .96rem;
        .unfinished{
            float: left;
            width: 50%;
            text-align: center;
        }
        .finished{
            float: left;
            width: 50%;
            text-align: center;
        }
    }
    .checked{
        color: #fff;
        background: #00877c;
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
</style>
