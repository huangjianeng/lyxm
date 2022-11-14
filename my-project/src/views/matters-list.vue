<template>
	<div class="box">
		<div class="search_box">
			<el-form
				style="width: 100%; text-align: left"
				:inline="true"
				:model="formData"
				class="user-search"
			>
				<el-form-item>
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
						v-model="searchData.deptId"
						placeholder="部门"
					>
						<el-option
							v-for="item in departmentOptions"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="float: right">
					<!-- <input type="file" @change="changeFile" id="file" /><br /> -->
					<el-button size="small" type="primary" @click="search">查询</el-button>
					<el-button type="primary" size="small" @click="addItem">事项新增</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- <div class="btn_box">
			<el-button type="primary" size="small" @click="addItem">事项新增</el-button>
		</div> -->
		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="deptName" label="部门" min-width="180"> </el-table-column>
			<el-table-column prop="name" label="事项名称" min-width="180"> </el-table-column>
			<el-table-column prop="supDept" label="赋权上级单位"> </el-table-column>
			<el-table-column prop="supDept" label="高频事件">
				<template slot-scope="scope">
					<span>{{ scope.row.frequency == 1 ? '是' : '否' }}</span>
				</template>
			</el-table-column>
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
		<el-dialog :title="modelTitile" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-position="right" label-width="120px" :model="formData">
				<el-form-item label="部门：">
					<!-- <el-input v-model="formData.department"></el-input> -->
					<el-select
						style="width: 100%"
						v-model="formData.deptName"
						@change="changeDe"
						placeholder="请选择"
						value-key="id"
					>
						<el-option
							v-for="item in departmentOptions"
							:key="item.id"
							:label="item.name"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事项名称：">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="赋权上级单位：">
					<el-input v-model="formData.supDept"></el-input>
				</el-form-item>
				<el-form-item label="高频事件：">
					<div style="text-align: left">
						<el-radio v-model="formData.frequency" label="1">是</el-radio>
						<el-radio v-model="formData.frequency" label="0">否</el-radio>
					</div>
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
		console.log(this.$store)
		return {
			departmentOptions: [], //this.$store.state.menu.departmentOptions,
			dialogVisible: false,
			searchData: {
				name: '',
				// area: '',
				deptId: '',
			},
			formData: {
				name: '',
				deptId: '',
				deptName: '',
				supDept: '',
				frequency: '0',
				id: '',
			},
			modelTitile: '新增',
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
		async changeFile(val) {
			console.log('111', val)
			var file = document.querySelector('#file').files[0]
			var type = file.name.split('.')
			if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
				alert('只能选择excel文件导入')
				return false
			}
			const reader = new FileReader()
			let all = []
			reader.readAsBinaryString(file)
			reader.onload = (e) => {
				const data = e.target.result
				const zzexcel = window.XLS.read(data, {
					type: 'binary',
				})
				const result = []
				for (let i = 0; i < zzexcel.SheetNames.length; i++) {
					const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]])
					result.push(...newData)
				}
				console.log(this.departmentOptions)
				result.forEach((v, i) => {
					if (i >= 0) {
						let item = this.departmentOptions.find((vv) => v.dep == vv.name)

						if (item == undefined) {
							console.log('222', item)
						}
						// console.log(item, item.is, item.is == '是')
						v.is = v.is == '是' ? 1 : 0
						v.depId = item?.id
						all.push(v)
					}
				})
				all.forEach(async (v) => {
					let params = {
						name: v.name,
						deptId: v.depId,
						deptName: v.dep,
						supDept: v.unit,
						frequency: v.is,
					}
					console.log('333', params)
					await this.$axios.post('/matter/insert', params).then(() => {})
				})

				console.log('result', this, result, all)
			}
		},
		init() {
			this.getDeptName()
			this.getData()
		},
		getData() {
			let params = {
				...this.searchData,
				...this.pageParams,
			}
			this.$axios.post('/matter/query', params).then((res) => {
				console.log(res)
				this.total = res.data.total
				this.tableData = res.data.data
			})
		},
		search() {
			this.pageParams = {
				currentPage: 1,
				pageSize: 10,
			}
			this.getData()
		},
		changeDe(item) {
			this.formData.deptId = item.id
			this.formData.deptName = item.name
		},
		getDeptName() {
			// GET /dept/query
			this.$axios.get('/dept/query', {}).then((res) => {
				this.departmentOptions = res.data
				// this.$message({
				// 	message: '成功',
				// 	type: 'success',
				// })
				// this.$router.go(-1)
			})
		},
		addItem() {
			this.dialogVisible = true
			this.modelTitile = '新增'
			this.formData = {
				name: '',
				deptId: '',
				deptName: '',
				supDept: '',
				frequency: '0',
				id: '',
			}
		},
		showModel() {
			this.dialogVisible = true
		},
		affirm() {
			let params = {
				...this.formData,
				// deptId: 1,
			}
			if (this.modelTitile == '新增') {
				delete params.id
				this.$axios.post('/matter/insert', params).then(() => {
					this.dialogVisible = false
					this.getData()
				})
			} else if (this.modelTitile == '编辑') {
				// POST /matter/update
				this.$axios.post('/matter/update', params).then(() => {
					this.dialogVisible = false
					this.getData()
				})
			}
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
			this.modelTitile = '编辑'
			this.formData.name = row.name
			this.formData.frequency = row.frequency
			this.formData.deptName = row.deptName
			this.formData.deptId = row.deptId
			this.formData.supDept = row.supDept
			this.formData.id = row.id
		},
		deleteItem(row) {
			this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				let params = {
					id: row.id,
				}
				this.$axios.post('/matter/delete', params).then(() => {
					this.dialogVisible = false
					this.getData()
				})
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
