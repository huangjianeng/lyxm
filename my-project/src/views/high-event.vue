<template>
	<div>
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
							:clearable="false"
						>
						</el-date-picker></div
				></el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple" style="justify-content: flex-end">
						<el-button type="primary" size="small" @click="search">查询</el-button>
						<!-- <el-button type="primary" size="small" @click="handleClick" style="margin-right: 10px"
							>事项申报</el-button
						>
						<ExcelExport filename="excel" :sheet="sheet">
							<el-button class="table_down" size="small" type="primary">导出 </el-button>
						</ExcelExport> -->
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="box">
			<div id="main"></div>
		</div>
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
			tableData: [],
			quarterOptions: [
				{
					label: '第一季度',
					value: '1',
				},
				{
					label: '第二季度',
					value: '2',
				},
				{
					label: '第三季度',
					value: '3',
				},
				{
					label: '第四季度',
					value: '4',
				},
			],
			searchData: {
				month: [new Date(new Date().setMonth(new Date().getMonth() - 3)), new Date()],
			},
			currentPage: 1,
		}
	},
	mounted() {
		// this.init()
	},
	methods: {
		init() {
			this.getData()
			this.initEchars()
		},
		search() {
			this.getData()
			this.initEchars()
		},
		getYearMonth(date) {
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			if (month < 10) {
				month = '0' + month
			}
			return year + month
		},
		getData() {
			// POST / declaration / query
			console.log(this.searchData)
			let params = {
				startDate: this.getYearMonth(this.searchData.month[0]),
				endDate: this.getYearMonth(this.searchData.month[1]),
				...this.pageParams,
			}
			this.$axios.post('/declaration/query', params).then((res) => {
				console.log(res)
				this.total = res.data.total
				this.tableData = res.data.data
			})
		},
		initEchars() {
			console.log(this.$echarts)
			var chartDom = document.getElementById('main')
			var myChart = this.$echarts.init(chartDom)
			var option = {
				title: {
					text: '高频事项统计表',
					left: 'center',
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'vertical',
					left: 'left',
				},
				series: [
					{
						name: '高频事项统计表',
						type: 'pie',
						radius: '50%',
						data: [
							{ value: 1048, name: '异议登记' },
							{ value: 735, name: '更正登记' },
							{ value: 580, name: '注销登记' },
							{ value: 484, name: '抵押权登记' },
							{ value: 300, name: '不动产变更登记' },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			}

			myChart.setOption(option)
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
#main {
	width: 700px;
	height: 600px;
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

.search_box {
	padding: 10px;
}
.grid-content {
	display: flex;
	height: 40px;
	align-items: center;
	font-size: 14px;
}
</style>
