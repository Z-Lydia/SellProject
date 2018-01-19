<template>
	<div class="gray-wrapper">
		<div class="Top">
			<header class="header white-bg">
				<div class="filter">
					<span>报价</span>
					<img src="/static/images/down-icon.png" alt="">
				</div>
				<h1>缴款列表</h1>
				<img class="add-people" src="/static/images/add-people.png" @click="addModal">
			</header>

			<div class="Select" @click="handleSelectClick">
				<p>选择纸厂<span class="SelectResult">{{this.Selected}}</span></p>
			</div>

			<div class="white-bg recycle-type">
				<div class="recycle-top">
					<span>回收类别</span>
					<p v-show="this.checkValue.length" class="variety">{{filterCheckValues}}</p>
					<img v-show="this.checkValue.length===0" class="add-icon" src="/static/images/add-icon.png" alt=""
					     @click="handleKindSelect">
				</div>
				<div class="content">
					<ul class="recycle-list">
						<li>
							<label>回收类别明细</label>
							<div class="now-price">
								<b>税前现价</b>
								<input type="text" class="input">
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

		<div class="white-bg list-wrapper">
			<div class="list-item">
				<div class="list-txt">
					<p>报价纸厂：<span>H纸厂</span></p>
					<p>报价类别：<span>黄纸</span></p>
					<p>报价：<span>25元/T</span></p>
				</div>
				<!-- <a href="javascript:;" class="edit-btn">修改</a> -->
			</div>
			<div class="list-item">
				<div class="list-txt">
					<p>报价纸厂：<span>H纸厂</span></p>
					<p>报价类别：<span>黄纸</span></p>
					<p>报价：<span>25元/T</span></p>
				</div>
				<!-- <a href="javascript:;" class="edit-btn">修改</a> -->
			</div>
			<div class="list-item">
				<div class="list-txt">
					<p>报价纸厂：<span>H纸厂</span></p>
					<p>报价类别：<span>黄纸</span></p>
					<p>报价：<span>25元/T</span></p>
				</div>
				<!-- <a href="javascript:;" class="edit-btn">修改</a> -->
			</div>
			<div class="list-item">
				<div class="list-txt">
					<p>报价纸厂：<span>H纸厂</span></p>
					<p>报价类别：<span>黄纸</span></p>
					<p>报价：<span>25元/T</span></p>
				</div>
				<!-- <a href="javascript:;" class="edit-btn">修改</a> -->
			</div>
		</div>
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
					<ul class="kind_list" @click="">
						<li class="kind_list_item" v-for="typelistItem in typelist">
							<label for="1">{{typelistItem.title}}</label>
							<input id="1" :value="typelistItem.title" v-model="checkValue" class="kind_checkox"
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
	import VuePickers from 'vue-pickers'
	import {mapState} from "vuex"

	export default {
		data() {
			return {
				Selected: "请选择纸厂",
				overlayFlag: false,
				mdShowFlag: false,
				kindBoxShow: false,
				checkValue: [],
				mask: false,
				show: false,
			}
		},
		computed: mapState({
			factorylist(state) {
				var factorylist = state.factorylist;
				var pData1 = [];
				for (var i = 0, l = factorylist.length; i < l; i++) {
					var obj = {text: "", value: ""};
					obj.text = factorylist[i].name;
					obj.value = factorylist[i].name;
					pData1.push(obj);
				}
				var pickData = {
					columns: 1,
					pData1: pData1
				}
				return pickData
			},
			typelist(state) {
				return state.typelist;
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
		components: {
			VuePickers
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
			confirmFn(data) {
				this.Selected = data.select1.text
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
			handleKindConfirmClick() {
				this.kindBoxShow = false;
				this.mask = false;
				console.log(this.checkValue)
			},
			handlePublishClick() {
				this.checkValue = [];
				console.log(this.checkValue.length)
			}
		},
		mounted() {
			if (this.$store.getters.shouldGetFactoryInfo) {
				this.$store.dispatch("getFactoryInfo");
			}
			;
		}
	}
</script>

<style lang="less" scoped>
	.Top {
		position: fixed;
		width: 100%;
		top: 0;
	}

	.header {
		padding: 0 2.5rem;
		height: 8.8rem;
		line-height: 8.8rem;
		display: flex;
		align-items: center;
		margin-bottom: 4px;
		box-shadow: 0 4px 4px rgba(0, 0, 0, .06);
		.filter {
			span {
				color: #666;
			}
			img {
				width: 2rem;
				height: 1rem;
			}
		}
		h1 {
			flex: 1;
			text-align: center;
			font-size: 3.6rem;
			font-weight: normal;
		}
		& > img {
			flex: 0 0 4rem;
			width: 4rem;
			height: 4rem;
		}
	}

	.Select {
		height: 8.8rem;
		margin-bottom: 2rem;
		background: #fff;
		p {
			font-size: 3rem;
			color: #333;
			line-height: 8.8rem;
			margin-left: 2.6rem;
			.SelectResult {
				max-width: 375px;
				float: right;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-right: 2.6rem;
			}
			.SelectResult:after {
				content: url("/static/images/right-icon.png");
				margin-left: 2rem;
			}
		}
	}

	.recycle-type {
		.recycle-top {
			height: 9rem;
			line-height: 9rem;
			padding: 0 2.5rem;
			display: flex;
			align-items: center;
			span {
				flex: 1;
				font-size: 3.2rem;
			}
			.add-icon {
				width: 4rem;
				height: 4rem;
				flex: 0 0 4rem;
			}
		}
		.content {
			border-top: 1px solid #ddd;
			padding: 2.5rem;
			.recycle-list {
				li {
					height: 3.6rem;
					line-height: 3.6rem;
					margin-bottom: 1.5rem;
					display: flex;
					label {
						flex: 1;
					}
					.now-price {
						b {
							font-weight: normal;
						}
						.input {
							width: 7.5rem;
							height: 3.6rem;
							line-height: 3.6rem;
							color: #666;
							margin: 0 1rem;
							text-indent: 5px;
							border: 1px solid #ddd;
							border-radius: 5px;
							&:active, &:focus {
								border: 1px solid #00877c;
							}
						}
						span {
							font-size: 2.8rem;
							color: #999;
						}
					}
				}
			}
		}
		.recycle-box {
			height: 11.6rem;
			line-height: 11.6rem;
			text-align: center;
			margin-bottom: 1.8rem;
			.recycle-btn {
				display: inline-block;
				width: 20rem;
				height: 5.6rem;
				line-height: 5.6rem;
				text-align: center;
				font-size: 2.8rem;
				color: #00877c;
				border: 1px solid #00877c;
				border-radius: 5px;
			}
		}
	}

	.list-wrapper {
		margin-top: 53rem;
		.list-item {
			padding: 2.5rem;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ddd;
			.list-txt {
				flex: 1;
				p {
					margin-bottom: 2rem;
					span {
						color: #999;
					}
				}
			}
			.edit-btn {
				flex: 0 0 13rem;
				height: 5rem;
				line-height: 5rem;
				text-align: center;
				border: 1px solid #00877c;
				font-size: 2.8rem;
				color: #00877c;
				border-radius: 5px;
			}
		}
	}

	.kind_box {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 81.8rem;
		z-index: 999;
	}

	.kind_btn_bar {
		height: 9rem;
		font-size: 3rem;
		line-height: 9rem;
		background: #f7f7f7;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 2.7rem;
		color: #00877b;
	}

	.title {
		color: #707070;
	}

	.kind_list {
		height: 72.8rem;
		overflow: auto;
	}

	.kind_list::-webkit-scrollbar {
		display: none
	}

	.kind_list_item {
		height: 8.5rem;
		border-bottom: 1px solid #eaeaea;
		line-height: 8.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 2.7rem;
	}

	.kind_checkox {
		-webkit-appearance: none;
		background: url("/static/images/unselected-icon.png") center no-repeat;
		height: 5rem;
		width: 5rem;
		margin: 1.7rem;
	}

	.kind_checkox:checked {
		background: url("/static/images/selected-icon.png") center no-repeat;
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
