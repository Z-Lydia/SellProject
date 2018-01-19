import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import YDUI from 'vue-ydui'

import '@/assets/css/main.css'

Vue.use(Vuex);
Vue.use(YDUI);
Vue.config.productionTip = false

const store = new Vuex.Store({
	state:{
		nickName:''
	},
	mutations:{
		updateName(state,nickName){
			state.nickName = nickName;
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