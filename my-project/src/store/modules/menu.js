const menu = {
	namespaced: true, //开启命名空间
	state: {
		departmentOptions:[
			{
				label:'退役军人服务站（文化站）',
				value:'退役军人服务站（文化站）'
			},
			{
				label:'自然资源所',
				value:'自然资源所'
			},
			{
				label:'农业农村综合服务中心',
				value:'农业农村综合服务中心'
			}
			
		],
		leftName: '', //左边的名字
		isShowMessage:false,
		messageTotal:0,
		isShowSyncProject:false,
		searchForm:{}
	},
	//设置状态的方法
	mutations: {
		setLeftName(state, val) {
			state.leftName = val
		},
		setMessageState(state,val){
			state.isShowMessage = val
		},
		setMessageTotal(state,val){
			state.messageTotal = val
		},
		setSyncProject(state,val){
			state.isShowSyncProject = val
		},
		setSearchForm(state,val){
			state.searchForm = val
		}
	},
	actions: {},
}
export default menu
