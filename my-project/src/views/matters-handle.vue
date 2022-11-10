<template>
	<div class="box">
		<div class="search_box">
			<el-row>
				<el-col :span="6"
					><div class="grid-content bg-purple">
						<div>统计月份：</div>
						<el-date-picker
							v-model="searchData.month"
							type="month"
							:clearable="false"
							placeholder="选择月"
						>
						</el-date-picker>
						<!-- <el-date-picker
							v-model="searchData.month"
							type="monthrange"
							type="month"
							range-separator="至"
							start-placeholder="开始月份"
							end-placeholder="结束月份"
							:clearable="false"
						>
						</el-date-picker> -->
					</div></el-col
				>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple" style="justify-content: flex-end">
						<el-button type="primary" size="small" @click="search">查询</el-button>
						<el-button type="primary" size="small" @click="handleClick" style="margin-right: 10px"
							>事项申报</el-button
						>
						<ExcelExport filename="excel" :sheet="sheet">
							<el-button class="table_down" size="small" type="primary">导出 </el-button>
						</ExcelExport>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- <div class="btn_box">
			<el-button type="primary" @click="addItem">事项新增</el-button>
		</div> -->
		<el-table :data="tableData" style="width: 100%" border>
			<el-table-column prop="deptName" label="部门" min-width="180"> </el-table-column>
			<el-table-column prop="matterName" label="事项名称" min-width="180"> </el-table-column>
			<el-table-column prop="amount" label="月统计上报数量"> </el-table-column>
			<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<!-- <el-button @click="handleClick(scope.row)" type="text" size="small">申报</el-button> -->
					<el-button type="text" @click="editClick(scope.row)" size="small">申报</el-button>
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
				<el-form-item label="事项名称：">
					<el-select
						style="width: 100%"
						:value="formData.matterName"
						@change="changeEvent"
						:disabled="modelTitile == '编辑'"
						placeholder="请选择"
					>
						<el-option
							v-for="item in eventOptions"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申报月份：">
					<el-date-picker
						:disabled="modelTitile == '编辑'"
						style="width: 100%"
						v-model="formData.ym"
						type="month"
						placeholder="选择月"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="月统计数量：">
					<el-input v-model="formData.amount"></el-input>
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
import { ExcelExport } from 'pikaz-excel-js'

export default {
	name: 'matters-handle',
	components: {
		ExcelExport,
	},
	data() {
		return {
			deptId: this.$store.state.menu.userInfo.deptId,
			sheet: [
				{
					tHeader: ['部门', '事项名称', '月统计上报数量'],
					keys: ['deptName', 'matterName', 'amount'],
					table: [],
				},
			],
			dialogVisible: false,
			searchData: {
				month: new Date(),
			},
			total: 0,
			pageParams: {
				currentPage: 1,
				pageSize: 10,
			},
			modelTitile: '新增',
			formData: {
				amount: '',
				deptId: '',
				deptName: '',
				matterId: '',
				matterName: '',
				ym: '',
			},
			tableData: [],
			currentPage: 1,
			departmentOptions: [],
			eventOptions: [],
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		async init() {
			this.getData()
			this.getEventList()
			this.getSheetData()
			this.getDeptName()
		},
		search() {
			this.pageParams = {
				currentPage: 1,
				pageSize: 10,
			}

			this.getData()
			this.getSheetData()
		},
		changeEvent(id) {
			let item = this.eventOptions.find((v) => v.id == id) || {}
			this.formData.deptId = item.deptId
			this.formData.deptName = item.deptName
			this.formData.matterId = item.id
			this.formData.matterName = item.name
		},
		getEventList() {
			let params = {
				currentPage: 1,
				pageSize: 999,
				deptId: this.deptId,
			}
			this.$axios.post('/matter/query', params).then((res) => {
				this.eventOptions = res.data.data
				this.total = res.data.total
			})
		},
		getDeptName() {
			// GET /dept/query
			this.$axios.get('/dept/query', {}).then((res) => {
				this.departmentOptions = res.data
			})
		},
		getData() {
			let params = {
				startDate: this.getYearMonth(this.searchData.month),
				endDate: this.getYearMonth(this.searchData.month),
				...this.pageParams,
				deptId: this.deptId,
			}
			this.$axios.post('/declaration/query', params).then((res) => {
				let arr = []
				let params2 = {
					...this.pageParams,
					deptId: this.deptId,
				}
				this.$axios.post('/matter/query', params2).then((res2) => {
					let arr = []
					res2.data.data.forEach((v) => {
						if (!this.deptId || v.deptId == this.deptId) {
							let item = res.data.data.find((vv) => {
								return vv.matterId == v.id
							})
							if (item) {
								arr.push({
									...item,
								})
							} else {
								arr.push({
									amount: 0,
									deptId: v.deptId,
									deptName: v.deptName,
									frequency: v.frequency,
									mondiff: v.supDept,
									matterName: v.name,
									matterId: v.id,
								})
							}
						}
					})
					this.tableData = arr
				})

				this.tableData = arr
			})
		},
		getSheetData() {
			console.log(this.searchData)
			let params = {
				startDate: this.getYearMonth(this.searchData.month),
				endDate: this.getYearMonth(this.searchData.month),
				deptId: this.deptId,
				currentPage: 1,
				pageSize: 999,
			}
			this.$axios.post('/declaration/query', params).then((res) => {
				console.log(res)
				this.sheet[0].tHeader[2] =
					this.searchData.month.getFullYear() +
					'年' +
					(this.searchData.month.getMonth() + 1) +
					'月' +
					'上报数量'
				let arr = []
				console.log(this.sheet[0])
				this.eventOptions.forEach((v) => {
					if (!this.deptId || v.deptId == this.deptId) {
						let item = res.data.data.find((vv) => {
							return vv.matterId == v.id
						})
						if (item) {
							arr.push({
								...item,
								amount: Number(item.amount),
							})
						} else {
							arr.push({
								amount: 0,
								deptId: v.deptId,
								deptName: v.deptName,
								frequency: v.frequency,
								mondiff: v.supDept,
								matterName: v.name,
								matterId: v.id,
							})
						}
					}
				})
				this.sheet[0].table = arr
			})
		},
		getYearMonth(date) {
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			if (month < 10) {
				month = '0' + month
			}
			return year + month
		},
		handleClick() {
			this.showModel()
			this.modelTitile = '新增'
			this.formData = {
				amount: '',
				deptId: '',
				deptName: '',
				matterId: '',
				matterName: '',
				ym: '',
			}
		},
		editClick(row) {
			this.showModel()
			this.modelTitile = '编辑'
			this.formData = {
				amount: row.amount,
				deptId: row.deptId,
				deptName: row.deptName,
				matterId: row.matterId,
				matterName: row.matterName,
				ym: this.searchData.month,
			}
		},
		affirm() {
			let params = {
				...this.formData,
				amount: Number(this.formData.amount),
				// deptId: 1,
				ym: this.getYearMonth(this.formData.ym),
			}
			console.log(params)
			if (this.modelTitile == '新增') {
				this.$axios.post('/declaration/save', params).then(() => {
					this.dialogVisible = false
					this.search()
				})
			} else if (this.modelTitile == '编辑') {
				this.$axios.post('/declaration/save', params).then(() => {
					this.dialogVisible = false
					this.search()
				})
			}
			// POST /matter/insert POST /declaration/save
		},
		addItem() {
			this.$axios.get('/user/userinfo').then((res) => {
				console.log(res)
			})
			// this.dialogVisible = true
		},
		showModel() {
			this.dialogVisible = true
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleSizeChange(val) {
			this.pageParams.pageSize = val
			this.getData()
			console.log(`每页 ${val} 条`)
		},
		handleCurrentChange(val) {
			this.pageParams.currentPage = val
			this.getData()
			console.log(`当前页: ${val}`)
		},
	},
}
</script>
<style scoped>
.box {
	margin: 10px;
}
.search_box {
	padding: 10px;
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
.grid-content {
	display: flex;
	height: 40px;
	align-items: center;
	font-size: 14px;
}
</style>
