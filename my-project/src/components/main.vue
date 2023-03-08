<template>
	<div class="home">
		<el-menu
			style="height: 100%"
			default-active="/mattersHandle"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			router
		>
			<!-- <el-menu-item index="1">
						<i class="el-icon-menu"></i>
						<span slot="title">首页</span>
					</el-menu-item> -->
			<el-menu-item index="/mattersHandle">
				<i class="el-icon-menu"></i>
				<span slot="title">事项申报</span>
			</el-menu-item>
			<el-menu-item index="/mattersList" v-if="$store.state.menu.userInfo.superAdmin == 1">
				<i class="el-icon-document"></i>
				<span slot="title">事项列表</span>
			</el-menu-item>
			<el-menu-item index="/highEvent" v-if="$store.state.menu.userInfo.superAdmin == 1">
				<i class="el-icon-document"></i>
				<span slot="title">事项统计</span>
			</el-menu-item>
			<!-- <el-menu-item index="/chatBox">
				<i class="el-icon-menu"></i>
				<span slot="title">聊天室</span>
			</el-menu-item> -->
			<el-menu-item index="/userList" v-if="$store.state.menu.userInfo.superAdmin == 1">
				<i class="el-icon-setting"></i>
				<span slot="title">用户列表</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'publishMain',
	data() {
		return {
			userInfo: {},
		}
	},
	mounted() {
		if (sessionStorage.getItem('user')) {
			const userInfo = JSON.parse(sessionStorage.getItem('user'))
			console.log(userInfo)
			if (userInfo && userInfo.token) {
				this.userInfo = userInfo
			}
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
	},
}
</script>
<style scoped>
.home {
	height: 100%;
}
</style>
