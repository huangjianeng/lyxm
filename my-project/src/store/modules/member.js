const member = {
	namespaced: true, //开启命名空间
	state: {
		token: '', //用户的token
		memberInfo: {}, //用户的基本信息
		adminLevel: '', //用户的权限
	},

	getters: {
		// getInfo: state => {
		//   return state.todos.filter(todo => todo.done)
		// }
	},

	//设置状态的方法
	mutations: {
		setToken(state, val) {
			state.token = val
		},
		setMemberInfo(state, val) {
			state.memberInfo = val
		},
		setRoles(state, val) {
			state.adminLevel = val
		},
	},
	actions: {
		getInfo: state => state.memberInfo,
	},
}
export default member
