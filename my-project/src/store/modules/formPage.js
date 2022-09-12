const formPage = {
	namespaced: true, //开启命名空间
	state: {
		detailOutlay: {}, //支出记录
		contractUnite: {}, //合同-联合体
		contracDepartment: {}, //合同-部门
		contractOutside: {}, //合同-外委
		detailAccount: {}, // 到账记录
		clearingData: {}, //结算清单
		basicEntity: {}, //主表信息
		fileListData: [], // 项目文件列表
	},
	// 设置状态的方法
	mutations: {
		setDetailOutlay(state, val) {
			state.detailOutlay = val
		},
		setContractUnite(state, val) {
			state.contractUnite = val
		},
		setContracDepartment(state, val) {
			state.contracDepartment = val
		},
		setContractOutside(state, val) {
			state.contractOutside = val
		},
		setDetailAccount(state, val) {
			state.detailAccount = val
		},
		setClearingData(state, val) {
			state.clearingData = val
		},
		setBasicEntity(state, val) {
			state.basicEntity = val
		},
		setFileListData(state, val) {
			state.fileListData = val
		},
	},
	actions: {
		// getDetailOutlay: state => state.detailOutlay,
	},
}
export default formPage
