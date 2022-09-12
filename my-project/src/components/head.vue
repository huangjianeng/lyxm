<template>
	<div class="page_wrap">
		<div class="page_head">
			<div class="df_ac">
				<span class="page_head_text">统计系统</span>
			</div>
			<div class="head_right_box">
				<i class="el-icon-message-solid mes_icon" @click="showMessage">
					<span v-if="messageTotal > 0" class="tips">{{ messageTotal }}</span>
				</i>
				<span class="mr10" style="margin-right: 10px">{{ userName }}</span>
				<span>{{ userDepartment }}</span>
			</div>
		</div>
		<el-drawer
			title="预警提醒"
			:visible.sync="drawer"
			:with-header="false"
			size="20%"
			:before-close="handleDrawerClose"
		>
			<div class="drawer_head">预警消息列表</div>
			<div class="mes_box">
				<el-card class="box_card" v-for="(v, i) in list" :key="i">
					<div class="item">
						<div>一般事项{{ v }}已三个月未申报</div>
						<div class="state">{{ v % 2 == 0 ? '已读' : '未读' }}</div>
					</div>
				</el-card>
			</div>
		</el-drawer>
	</div>
</template>
<script>
// import Storage from '../utils/Storage'

export default {
	name: 'publishHead',
	props: ['isAnewLogin'],
	components: {},
	data() {
		return {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			messageTotal: 10,
			drawer: false,
			admin_level: null,
			total: 0,
			userName: '张三',
			userDepartment: '自然规划局',
		}
	},
	mounted() {
		// this.init()
	},
	methods: {
		showMessage() {
			this.drawer = true
		},
		handleDrawerClose() {
			this.drawer = false
		},
	},
}
</script>

<style scoped>
.page_wrap {
	position: relative;
	left: 0;
	top: 0;
}
.page_head {
	border-width: 0px;
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: 1;
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	box-sizing: border-box;
	background: linear-gradient(90deg, rgba(77, 83, 230, 1) 9%, rgba(87, 144, 255, 1) 93%);
	border: none;
	border-radius: 0px;
	box-shadow: none;
}

.page_head_logo {
	border-width: 0px;

	width: 50px;
	height: 47px;
}
.page_head_text {
	border-width: 0px;
	margin-left: 15px;
	height: 27px;
	font-weight: 700;
	font-style: normal;
	font-size: 23px;
	color: #ffffff;
}
.head_right_box {
	display: flex;
	align-items: center;
	color: white;
}
.mes_icon {
	font-size: 18px;
	margin-right: 10px;
	cursor: pointer;
	position: relative;
}
.tips {
	position: absolute;
	background-color: red;
	color: white;
	right: -10px;
	top: -14px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	text-align: center;
	line-height: 20px;
	font-size: 12px;
	/* background-color: #409eff; */
}

.head_msg_box {
	display: flex;
	margin-right: 20px;
	border: 1px solid white;
	padding: 5px 10px;
	border-radius: 6px;
}
.drawer_head {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30px;
}
.mes_icon {
	font-size: 18px;
	margin-right: 10px;
	cursor: pointer;
	position: relative;
}
.tips {
	position: absolute;
	background-color: red;
	color: white;
	right: -10px;
	top: -14px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	text-align: center;
	line-height: 20px;
	font-size: 12px;
	/* background-color: #409eff; */
}
.drawer_head {
	font-size: 18px;
	padding: 30px 0;
	font-weight: 500;
	border-bottom: 1px solid #dcdfe6;
}
.mes_box {
	display: flex;
	flex-direction: column;
	padding: 10px;
}
/deep/ .el-drawer__body::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
/deep/ .el-drawer__body::-webkit-scrollbar-thumb {
	background-color: #a1a3a9;
	border-radius: 3px;
}
.mes_box .box_card {
	margin: 10px 0;
}
.mes_box .state {
	color: #409eff;
	border: 1px dotted #409eff;
	padding: 2px;
	font-size: 14px;
	border-radius: 5px;
	cursor: pointer;
}
.mes_box .item {
	display: flex;
	/* height: 40px; */
	/* padding: 10px; */
	align-items: center;
	justify-content: space-between;
	/* box-shadow: 2px 2px #dcdfe6;
	border: 1px solid #dcdfe6; */
}
</style>
