<template>
	<div class="box">
		<div class="search_box">
			<el-form style="width: 100%" :inline="true" :model="formData" class="user-search">
				<!-- <el-form-item>
					<el-input
						size="small"
						clearable
						v-model="searchData.name"
						placeholder="请输入事项名称"
					></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-select
						size="small"
						filterable
						clearable
						v-model="searchData.deptName"
						placeholder="部门"
					>
						<el-option
							v-for="item in departmentOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item style="float: right">
					<!-- <el-button size="small" type="primary" @click="search">搜索</el-button> -->
					<el-button type="primary" size="small" @click="addItem">用户新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- <div class="btn_box">
			<el-button type="primary" size="small" @click="addItem">事项新增</el-button>
		</div> -->
		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="deptName" label="部门" min-width="180"> </el-table-column>
			<el-table-column prop="username" label="用户名" min-width="180"> </el-table-column>
			<!-- <el-table-column prop="area" label="赋权上级单位"> </el-table-column> -->
			<el-table-column align="center" label="操作" width="100">
				<template slot-scope="scope">
					<span class="hover_a" @click="editItem(scope.row)">编辑</span>
					<span class="hover_a" @click="deleteItem(scope.row)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<div class="page_box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
		<el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-position="right" label-width="120px" :model="formData">
				<el-form-item label="部门">
					<!-- <el-input v-model="formData.department"></el-input> -->
					<el-select
						style="width: 100%"
						v-model="formData.deptId"
						@change="changeDept"
						placeholder="请选择"
					>
						<el-option
							v-for="item in departmentOptions"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="formData.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="formData.password"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="affirm">确 定</el-button>
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
		// console.log(this.$store)
		return {
			departmentOptions: [], //this.$store.state.menu.departmentOptions,
			dialogVisible: false,
			searchData: {
				// name: '',
				// deptName: '',
			},
			formData: {
				username: '',
				password: '',
				deptId: '',
			},
			total: 0,
			pageParams: {
				currentPage: 1,
				pageSize: 10,
			},
			tableData: [],
			currentPage: 1,
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			this.getDeptName()
			this.getData()
		},
		changeDept() {},
		getData() {
			let params = {
				...this.searchData,
				...this.pageParams,
			}
			// POST /user/query
			this.$axios.post('/user/query', params).then((res) => {
				console.log(res)
				this.total = res.data.total
				this.tableData = res.data.data
			})
		},
		search() {
			this.getData()
		},
		getDeptName() {
			// GET /dept/query
			this.$axios.get('/dept/query', {}).then((res) => {
				console.log(res.data.data)
				this.departmentOptions = res.data
			})
		},
		addItem() {
			this.dialogVisible = true
			this.formData = {
				username: '',
				password: '',
				deptId: '',
			}
		},
		showModel() {
			this.dialogVisible = true
		},
		affirm() {
			let params = {
				...this.formData,
				superAdmin: 0, //是否为超级管理员(0：否 1：是)
			}
			// POST /user/doRegister
			// POST /matter/insert
			this.$axios.post('/user/doRegister', params).then(() => {
				this.dialogVisible = false
				this.getData()
			})
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleSizeChange(val) {
			this.pageParams.pageSize = val
			this.init()
			console.log(`每页 ${val} 条`)
		},
		handleCurrentChange(val) {
			this.pageParams.currentPage = val
			this.init()
			console.log(`当前页: ${val}`)
		},
		editItem(row) {
			this.dialogVisible = true
			this.formData.name = row.name
			// this.formData.area = row.area
			this.formData.deptName = row.deptName
		},
		deleteItem(row) {
			this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				console.log(row)
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.search_box {
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
.hover_a {
	cursor: pointer;
	margin-right: 6px;
}
.hover_a:hover {
	font-weight: bold;
	color: #409eff;
}
</style>
