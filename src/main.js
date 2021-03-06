import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import '@/assets/css/main.css'

Vue.use(YDUI);
Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
	state:{
		factorylist:[],
		typelist:[],
		offerpricelist:[]
	},
	actions:{
		getFactoryInfo( context ){
			axios.get(baseUrl + '/paymentof/paperfactory',{headers: {'X-Requested-With': 'XMLHttpRequest'}})
				.then( (response) =>{
					if( response.status === 200 ){
						context.commit( "changeFactoryInfo",response.data.data );
					}
				} )
				.catch( (err) =>{
					console.log(err);
				} )
		}
	},
	mutations:{
		changeFactoryInfo( state,data ) {
			state.factorylist = data.factorylist;
			state.typelist = data.typelist;
			state.offerpricelist = data.offerpricelist;
		}
	},
	getters:{
		shouldGetFactoryInfo( state ){
			if( !state.factorylist.length&&
				!state.typelist.length&&
				!state.offerpricelist.length
			){
				return true;
			}else{
				return false;
			}
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
