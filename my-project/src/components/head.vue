<template>
	<div class="page_head">
		<div class="df_ac">
			<span class="page_head_text">统计系统</span>
		</div>
		<div class="head_right_box">
			<span class="mr10" style="margin-right:10px">{{ userName }}</span>
			<span>{{ userDepartment }}</span>
		</div>
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
			admin_level: null,
			total: 0,
			userName: '张三',
			userDepartment: '自然规划局',
		}
	},
	mounted() {
		// this.init()
	},
	methods: {},
}
</script>

<style scoped>
.page_head {
	border-width: 0px;
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: 20;
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
</style>
