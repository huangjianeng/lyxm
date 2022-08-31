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
						<el-button type="primary" size="small" @click="addItem" style="margin-right: 6px"
							>查询</el-button
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
					<el-button @click="handleClick(scope.row)" type="text" size="small">申报</el-button>
					<!-- <el-button type="text" size="small">编辑</el-button> -->
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
					<el-input v-model="formData.region"></el-input>
				</el-form-item>
				<el-form-item label="申报月份">
					<el-date-picker
						style="width: 100%"
						v-model="formData.type"
						type="month"
						placeholder="选择月"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="月统计数量">
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
				month: '',
			},
			formData: {
				name: '',
				region: '',
				type: '',
			},
			tableData: [
				{
					date: '退役军人服务站（文化站）',
					name: '娱乐场所从事娱乐场所经营活动审批',
					address: '12',
				},
				{
					date: '自然资源所',
					name: '建设用地（含临时用地）规划许可证核发',
					address: '5',
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
			for (let i = 0; i < 5; i++) {
				arr.push(...this.tableData)
			}
			this.tableData = arr
			this.sheet[0].table = arr
		},
		handleClick() {
			this.showModel()
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
