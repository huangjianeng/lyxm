import Vue from 'vue'
import Vuex from 'vuex'
// if (process.env.NODE_ENV === 'development') {

// }

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
import member from './modules/member'
import formPage from './modules/formPage'
import menu from './modules/menu'

export default new Vuex.Store({
	plugins: [createPersistedState({
		storage: window.sessionStorage
	})],
	modules: {
		member,
		formPage,
		menu,
	},
})
