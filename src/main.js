// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'

import '@/assets/css/main.css'

Vue.use(Vuex);
Vue.config.productionTip = false

const store = new Vuex.Store({
	state:{
		nickName:'',
		cartCount:0
	},
	getters:{
		nickName(state){
			return state.nickName + ',hello';
		}
	},
	mutations:{
		updateName(state,nickName){
			state.nickName = nickName;
		},
		updateCartCount(state,num){
			state.cartCount += num;
		}
	},
	actions:{
		updateNameAction(context,nickName){
			context.commit('updateName',nickName);
		},
		updateCounterAction(context,num){
			context.commit('updateCartCount',num);
		}
	}
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { 
  	App
  }
})
