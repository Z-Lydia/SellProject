<template>
	<div class="gray-wrapper">
		<div class="Top">
			<header class="header white-bg">
				<!--<div class="filter">
					<span>报价</span>
					<img src="../assets/img/down-icon.png" alt="">
				</div>-->
				<h1>缴款列表</h1>
				<!--<img class="add-people" src="../assets/img/add-people.png" @click="addModal">-->
			</header>

			<div class="Select" @click="handleSelectClick">
				<p>选择纸厂<span class="SelectResult">{{this.Selected.text}}</span></p>
			</div>

			<div class="white-bg recycle-type">
				<div class="recycle-top">
					<span>回收类别</span>
					<p v-show="checkValue.length" class="variety">{{filterCheckValues}}</p>
					<img v-show="checkValue.length===0" class="add-icon" src="../assets/img/add-icon.png" alt=""
					     @click="handleKindSelect">
				</div>
				<div class="content">
					<ul class="recycle-list">
						<p v-if="types.length == 0" class="noData">请先选择回收分类</p>
						<li v-for="(item, index) in types">
							<label>回收类别明细：{{item.value}}</label>
							<div class="now-price">
								<b>税前现价</b>
								<input type="text" class="input" :id="item.id" ref="PriceInput" onkeyup="this.value=this.value.replace(/[^\d\.]/g, '')">
								<span>元/T</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="recycle-box">
					<a href="javascript:;" class="recycle-btn" @click="handlePublishClick">发布</a>
				</div>
			</div>
		</div>
		<!--lists-->
		<div class="white-bg list-wrapper">
			<div class="list-item" v-for="(item, index) in offerpricelist">
				<div class="list-txt">
					<p>报价纸厂：<span>{{item.factoryName}}</span></p>
					<p>报价类别：<span>{{item.typeName}}</span></p>
					<p>报价：<span>{{item.recycleTypePrice}}元/T</span></p>
				</div>
				<!-- <a href="javascript:;" class="edit-btn">修改</a> -->
			</div>
		</div>
		<!--Picker-->
		<vue-pickers :show="show"
		             :selectData="factorylist"
		             v-on:cancel="close"
		             v-on:confirm="confirmFn">
		</vue-pickers>
		<!--种类选择框-->
		<transition name="fade">
			<div class="kind_box" v-show="kindBoxShow">
				<div class="kind_btn_bar">
					<span @click="handleKindCancleClick">取消</span>
					<span class="title">选择类别（多项选择）</span>
					<span @click="handleKindConfirmClick">确定</span>
				</div>
				<div>
					<ul class="kind_list">
						<li class="kind_list_item" v-for="typelistItem in typelist">
							<label :for="typelistItem.id">{{typelistItem.title}}</label>
							<input :id="typelistItem.id"
							       :value="typelistItem.title"
							       @click="handleChange"
							       ref="checkbox"
							       class="kind_checkox"
							       type="checkbox">
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<!--遮罩层-->
		<div class="mask" v-show="mask"></div>
	</div>
</template>

<script>
	import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
	import VuePickers from 'vue-pickers'
	import {mapState} from "vuex"
	import axios from 'axios'
	import util from '@/assets/js/util.js'

	export default {
		data() {
			return {
				Selected: {
					text: '请选择纸厂',
					id: ''
				},
				overlayFlag: false,
				mdShowFlag: false,
				kindBoxShow: false,
				checkValue: [],
				mask: false,
				show: false,
				offerpricelist: [],
				types: [],
				typesArr: []
			}
		},
		computed: mapState({
			//工厂列表
			factorylist(state) {
				var factorylist = state.factorylist;
				var pData1 = [];
				for (var i = 0, l = factorylist.length; i < l; i++) {
					var obj = {text: "", value: ""};
					obj.text = factorylist[i].name;
					obj.value = factorylist[i].id;
					pData1.push(obj);
				}
				var pickData = {
					columns: 1,
					pData1: pData1
				}
				return pickData
			},
			//回收分类
			typelist(state) {
				return state.typelist;
			},
			//历史报价list
			offerpricelistFn(state){
				let offerpricelist = state.offerpricelist
				this.offerpricelist = offerpricelist
				return state.offerpricelist;
			},
			filterCheckValues() {
				var value = this.checkValue;
				var reValue = '';
				for (var i = 0, l = value.length; i < l; i++) {
					reValue += value[i] + ","
				}
				reValue = reValue.substring(0, reValue.length - 1)
				return reValue;
			}
		}),
		mounted() {
			if (this.$store.getters.shouldGetFactoryInfo) {
				this.$store.dispatch("getFactoryInfo");
			}
			//请求回收类别数据
			axios.get(baseUrl + '/paymentof/paperfactory',{headers: {'X-Requested-With': 'XMLHttpRequest'}})
			.then( (response) =>{
				if( response.status === 200 ){
					this.offerpricelist = response.data.data.offerpricelist;
				}
			} )
			.catch( (err) =>{
				console.log(err);
			} )
		},
		components: {
			VuePickers
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
		methods: {
			//新增客户模态框
			addModal() {
				this.mdShowFlag = true;
				this.overlayFlag = true;
			},
			//关闭模态框
			closeModal() {
				this.mdShowFlag = false;
				this.overlayFlag = false;
			},
			//关闭遮罩
			closePop() {
				this.mdShowFlag = false;
				this.overlayFlag = false;
			},
			handleSelectClick() {
				this.show = true;
				this.mask = true;
			},
			//工厂选择
			confirmFn(data) {
				this.Selected = data.select1
				this.show = false;
				this.mask = false;
			},
			close() {
				this.show = false;
				this.mask = false;
			},
			handleKindSelect() {
				this.kindBoxShow = true;
				this.mask = true;

			},
			handleKindCancleClick() {
				this.kindBoxShow = false;
				this.mask = false;
			},
			//checkbox
			handleChange(e){
				if(this.typesArr.length > 3){
					Toast({
						mes: '每次添加最多4条！',
						timeout: 1500,
						icon: 'error'
					})
					e.target.checked = false
					return
				}
				let id = e.target.id
				let value = e.target.value
				let price = ''
				if(e.target.checked && this.typesArr.length < 4){
					this.typesArr.push({
						id,
						value,
						price
					})
				}else{
					//大于4条不允许在继续选中和添加
					e.target.checked = false
					this.typesArr = this.typesArr.filter( (item) => {
						if(item.id != id) return item
					})
				}
			},
			handleKindConfirmClick() {
				this.kindBoxShow = false;
				this.mask = false;
				this.types = this.typesArr
			},
			handlePublishClick() {
				//工厂id
				let factoryId = this.Selected.value
				if( ! factoryId){
					Toast({
						mes: '请先选择工厂！',
						timeout: 1500,
						icon: 'error'
					})
					return
				}
				//回收类别id、回收类别价格
				let typeids = []
				let prices = []
				let flag = true
				if( ! this.types.length) {
					Toast({
						mes: '请先选择回收类别！',
						timeout: 1500,
						icon: 'error'
					})
					return
				}else{
					this.$refs.PriceInput.forEach( (item, index) => {
						if(this.types[index].id == item.id){
							this.types[index].price = item.value
						}
					})
					this.types.forEach( (item) => {
						typeids.push(item.id)
						prices.push(item.price)
					})
				}
				prices.forEach((item,index)=>{
					if(!item || (item <= 0)){
						flag = false
					}
				})
				if(!flag){
					Toast({
						mes: '请正确填写回收分类价格',
						timeout: 1500,
						icon: 'error'
					})
					return false;
				}

				//提交数据
				var params = new URLSearchParams()
				params.append('factoryId', factoryId)
				params.append('typeids', typeids.join(','))
				params.append('prices', prices.join(','))
				axios.post(baseUrl + '/paymentof/factorytype', params, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then( (res) => {
					if(res.data.code == 0){
						let data = res.data.data
						this.offerpricelist = data
						//清空回收类别
						this.types = []
						this.typesArr = []
						//去掉checkbox选中状态
						let elms = this.$refs.checkbox
						for(let i = 0; i < elms.length; i ++){
						    this.$set(elms[i], 'checked', false)
						}
					}else{
						Toast({
							mes: res.data.msg,
							timeout: 1500,
							icon: 'fail'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.Top {
		width: 100%;
		background: #f5f5f5;
	}

	.header {
		padding: 0 .25rem;
		height: .88rem;
		line-height: .88rem;
		display: flex;
		align-items: center;
		margin-bottom: 4px;
		box-shadow: 0 2px 2px rgba(0, 0, 0, .06);
		.filter {
			span {
				color: #666;
			}
			img {
				width: .2rem;
				height: .1rem;
			}
		}
		h1 {
			flex: 1;
			text-align: center;
			font-size: .36rem;
			font-weight: normal;
		}
		& > img {
			flex: 0 0 .4rem;
			width: .4rem;
			height: .4rem;
		}
	}

	.Select {
		height: .88rem;
		margin-bottom: .2rem;
		background: #fff;
		p {
			font-size: .3rem;
			color: #333;
			line-height: .88rem;
			margin-left: .26rem;
			.SelectResult {
				max-width: 3.75rem;
				padding-right: .2rem;
				float: right;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: .26rem;
				background: url("../assets/img/right-icon.png") no-repeat right center;
				background-size: .14rem .26rem;
			}
		}
	}

	.recycle-type {
		.recycle-top {
			height: .9rem;
			line-height: .9rem;
			padding: 0 .25rem;
			display: flex;
			align-items: center;
			span {
				flex: 1;
				font-size: .32rem;
			}
			.add-icon {
				width: .4rem;
				height: .4rem;
				flex: 0 0 .4rem;
			}
		}
		.content {
			border-top: 1px solid #ddd;
			padding: .25rem;
			.noData{
				font-size: .3rem;
				color: #999;
				text-align: center;;
			}
			.recycle-list {
				li {
					height: .36rem;
					line-height: .36rem;
					margin-bottom: .15rem;
					display: flex;
					label {
						flex: 1;
					}
					.now-price {
						b {
							font-weight: normal;
                            font-size: .28rem;
						}
						.input {
							width: .75rem;
							height: .36rem;
							line-height: .36rem;
							color: #666;
							margin: 0 .1rem;
							text-indent: 5px;
							border: 1px solid #ddd;
							&:active, &:focus {
								border: 1px solid #00877c;
							}
						}
						span {
							font-size: .28rem;
							color: #999;
						}
					}
				}
			}
		}
		.recycle-box {
			height: 1.16rem;
			line-height: 1.16rem;
			text-align: center;
			margin-bottom: .18rem;
			.recycle-btn {
				display: inline-block;
				width: 2.0rem;
				height: .56rem;
				line-height: .56rem;
				text-align: center;
				font-size: .28rem;
				color: #00877c;
				border: 1px solid #00877c;
			}
		}
	}

	.list-wrapper {
		.list-item {
			padding: .25rem;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ddd;
			.list-txt {
				flex: 1;
				p {
					margin-bottom: .2rem;
					span {
						color: #999;
					}
				}
			}
			.edit-btn {
				flex: 0 0 1.3rem;
				height: .5rem;
				line-height: .5rem;
				text-align: center;
				border: 1px solid #00877c;
				font-size: .28rem;
				color: #00877c;
			}
		}
	}

	.kind_box {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 8.18rem;
		z-index: 999;
	}

	.kind_btn_bar {
		height: .9rem;
		font-size: .3rem;
		line-height: .9rem;
		background: #f7f7f7;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 .27rem;
		color: #00877b;
	}

	.title {
		color: #707070;
	}

	.kind_list {
		height: 7.28rem;
		overflow: auto;
	}

	.kind_list::-webkit-scrollbar {
		display: none
	}

	.kind_list_item {
		height: .85rem;
		border-bottom: 1px solid #eaeaea;
		line-height: .85rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 .27rem;
	}

	.kind_checkox {
		-webkit-appearance: none;
		background: url("../assets/img/unselected-icon.png") center center no-repeat;
        background-size: 100% 100%;
		height: .32rem;
		width: .32rem;
		margin: .17rem;
	}

	.kind_checkox:checked {
		background: url("../assets/img/selected-icon.png") center center no-repeat;
        background-size: 100% 100%;
        height: .32rem;
        width: .32rem;
        margin: .17rem;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: .3s;
	}

	.fade-enter,
	.fade-leave-to {
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0)
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
	}
</style>
