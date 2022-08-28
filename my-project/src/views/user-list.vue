<template>
	<div class="box">
		<div class="btn_box">
			<el-button type="primary" size="small" @click="addItem">用户新增</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="date" label="所属部门" min-width="180"> </el-table-column>
			<el-table-column prop="name" label="用户名称" min-width="180"> </el-table-column>
			<!-- <el-table-column prop="address" label="赋权上级单位"> </el-table-column> -->

		</el-table>
		<div class="page_box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="11"
			>
			</el-pagination>
		</div>
		<el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-position="right" label-width="120px" :model="formLabelAlign">
				<el-form-item label="所属部门">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="formData.region"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="formData.type"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="showModel">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
	name: 'matters-list',
	components: {
		// HelloWorld
	},
	data() {
		return {
			dialogVisible: false,
			formData: {
				name: '',
				region: '',
				type: '',
			},
			tableData: [
				{
					date: '退役军人服务站（文化站）',
					name: '张三',
					address: '浏阳市文体局',
				},
				{
					date: '退役军人服务站（文化站）',
					name: '李四',
					address: '浏阳市文体局',
				},
				{
					date: '自然资源所',
					name: '建设用地（含临时用地）规划许可证核发',
					address: '市自然资源局',
				},
			],
			currentPage: 1,
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			let arr = []
			for (let i = 0; i < 4; i++) {
				arr.push(...this.tableData)
			}
			this.tableData = arr
		},
		handleClick(){
			this.showModel()
		},
		addItem() {
			this.dialogVisible = true
		},
		showModel() {
			this.dialogVisible = true
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
		},
	},
}
</script>
<style scoped>
.box {
	margin: 10px;
}
.btn_box {
	display: flex;
	justify-content: flex-end;
	padding: 10px;
}
.page_box {
	display: flex;
	justify-content: flex-end;
	padding: 10px;
}
</style>

