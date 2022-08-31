<template>
	<div class="box">
		<div class="content_box">
			<div
				class="text_item"
				v-for="(v, i) in tableData"
				:style="{ 'align-items': v.name == userName ? 'self-end' : 'self-start' }"
				:key="i"
			>
				<div class="top">
					<div class="name">{{ v.name }}</div>
					<div>{{ v.time }}</div>
				</div>
				<div class="text">
					{{ v.text }}
				</div>
			</div>
		</div>
		<div class="input_box">
			<el-input
				type="textarea"
				rows="3"
				style="width: 730px"
				placeholder="请输入内容"
				v-model="textarea"
			>
			</el-input>
			<div style="margin-left: 10px">
				<el-button type="primary" size="small" @click="send">发送</el-button>
			</div>
		</div>
		<el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-position="right" label-width="120px" :model="formData">
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
			userName: '张三',
			textarea: '',
			dialogVisible: false,
			formData: {
				name: '',
				region: '',
				type: '',
			},
			tableData: [
				{
					text: '你好',
					name: '张三',
					time: '2012-12-15',
				},
				{
					text: '你也好啊',
					name: '李四',
					time: '2012-12-15',
				},
				{
					text: '哈哈哈哈哈',
					name: '王五',
					time: '2012-12-15',
				},
			],
			currentPage: 1,
		}
	},
	mounted() {
		// this.init()
	},
	methods: {
		send() {
			this.tableData.push({
				text: this.textarea,
				name: '张三',
				time: '2012-12-15',
			})
			this.textarea = ''
		},
		init() {
			let arr = []
			for (let i = 0; i < 4; i++) {
				arr.push(...this.tableData)
			}
			this.tableData = arr
		},
		handleClick() {
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
.content_box {
	border: 1px solid #dcdfe6;
	border-radius: 10px;
	height: 500px;
	width: 800px;
	overflow: auto;
	padding: 10px;
	box-sizing: border-box;
	margin-bottom: 10px;
}
/deep/ .content_box::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

/deep/ .content_box::-webkit-scrollbar-thumb {
	background-color: #a1a3a9;
	border-radius: 3px;
}
.top {
	display: flex;
	height: 30px;
	align-items: center;
	font-size: 12px;
}
.text_item {
	display: flex;
	flex-direction: column;
	margin-bottom: 6px;
}
.top .name {
	color: #000;
	margin-right: 10px;
	font-size: 16px;
}
.text {
	display: flex;
	padding: 10px 50px;
	background-color: #dcdfe6;
	border-radius: 10px;
}
.input_box {
	display: flex;
}

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
