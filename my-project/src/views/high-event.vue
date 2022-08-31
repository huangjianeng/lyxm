<template>
	<div class="box">
		<div id="main"></div>
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
		this.initEchars()
	},
	methods: {
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
</style>
