<template>
	<div class="home">
		<el-row class="tac">
			<el-col :span="24">
				<el-menu
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
					<el-menu-item index="/mattersList">
						<i class="el-icon-document"></i>
						<span slot="title">事项列表</span>
					</el-menu-item>
					<el-menu-item index="/userList">
						<i class="el-icon-setting"></i>
						<span slot="title">用户列表</span>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'publishMain',
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
