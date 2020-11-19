import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		//
	},
	mutations: {
		//
	},
	actions: {
		//
	},
	modules: {
		user,
		app
	},
	plugins: [
		persistedState()
	]
})
