<template>
	<div class="box">
		<div class="search_box">
			<el-row>
				<el-col :span="6"
					><div class="grid-content bg-purple">
						<div>统计月份：</div>
						<el-date-picker
							v-model="searchData.month"
							type="monthrange"
							range-separator="至"
							start-placeholder="开始月份"
							end-placeholder="结束月份"
						>
						</el-date-picker></div
				></el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple" style="justify-content: flex-end">
						<el-button type="primary" size="small" @click="search" style="margin-right: 6px"
							>查询</el-button
						>
						<el-button type="primary" size="small" @click="handleClick" style="margin-right: 6px"
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
			<el-table-column prop="date" label="部门" min-width="180"> </el-table-column>
			<el-table-column prop="name" label="事项名称" min-width="180"> </el-table-column>
			<el-table-column prop="address" label="月统计上报数量"> </el-table-column>
			<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<!-- <el-button @click="handleClick(scope.row)" type="text" size="small">申报</el-button> -->
					<el-button type="text" @click="handleClick(scope.row)" size="small">编辑</el-button>
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
				:total="11"
			>
			</el-pagination>
		</div>
		<el-dialog title="申报" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-position="right" label-width="120px" :model="formData">
				<el-form-item label="事项名称">
					<el-select
						style="width: 100%"
						:value="formData.matterName"
						@change="changeEvent"
						placeholder="请选择"
					>
						<el-option
							v-for="item in eventOptions"
							:key="item.id"
							:label="item.name"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申报月份">
					<el-date-picker
						style="width: 100%"
						v-model="formData.mon"
						type="month"
						placeholder="选择月"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="月统计数量">
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
			sheet: [
				{
					tHeader: ['工程编号', '委托单位', '清单名称', '收费金额'],
					keys: ['date', 'name', 'address', 'totalMoney'],
					table: [],
				},
			],
			dialogVisible: false,
			searchData: {
				month: [],
				// name: '',
				// area: '',
				// deptName: '',
			},
			total: 0,
			pageParams: {
				currentPage: 1,
				pageSize: 10,
			},
			formData: {
				amount: '',
				deptId: '',
				deptName: '',
				matterId: '',
				matterName: '',
				mon: '',
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
		init() {
			this.getData()
			this.getDeptName()
			this.getEventList()
		},
		search() {
			this.getData()
		},
		changeEvent(item) {
			this.formData.deptId = item.deptId
			this.formData.deptName = item.deptName
			this.formData.matterId = item.id
			this.formData.matterName = item.name
		},
		getEventList() {
			let params = {
				currentPage: 1,
				pageSize: 999,
			}
			this.$axios.post('/matter/query', params).then((res) => {
				console.log(res)
				// this.total = res.data.total
				this.eventOptions = res.data.data
			})
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
		getData() {
			// POST / declaration / query
			console.log(this.searchData)
			let params = {
				startDate: this.searchData.month[0],
				endDate: this.searchData.month[1],
				...this.pageParams,
			}
			this.$axios.post('/declaration/query', params).then((res) => {
				console.log(res)
				this.total = res.data.total
				this.tableData = res.data.data
			})
		},
		handleClick() {
			this.showModel()
			this.formData = {
				amount: '',
				deptId: '',
				deptName: '',
				matterId: '',
				matterName: '',
				mon: '',
			}
		},
		affirm() {
			let params = {
				...this.formData,
				amount: Number(this.formData.amount),
				// deptId: 1,
			}
			console.log(params)
			// POST /matter/insert POST /declaration/save
			this.$axios.post('/declaration/save', params).then(() => {
				this.dialogVisible = false
				this.getData()
			})
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
