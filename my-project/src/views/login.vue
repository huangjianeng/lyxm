<template>
	<div class="login-wrap">
		<el-form
			label-position="left"
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="0px"
			class="demo-ruleForm login-container"
		>
			<h3 class="title">用户登录</h3>
			<el-form-item prop="username">
				<el-input
					type="text"
					v-model="ruleForm.username"
					auto-complete="off"
					placeholder="账号"
				></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					type="password"
					v-model="ruleForm.password"
					auto-complete="off"
					placeholder="密码"
				></el-input>
			</el-form-item>
			<!-- <el-row>
				<el-col :span="12">
					<el-form-item prop="code">
						<el-input
							type="text"
							v-model="ruleForm.code"
							auto-complete="off"
							placeholder="图形验证码"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" class="code-box">
					<img :src="ruleForm.codeimg" alt="" class="codeimg"  />
				</el-col>
			</el-row> -->
			<!-- <el-checkbox class="remember" v-model="rememberpwd">记住密码</el-checkbox> -->
			<el-form-item style="width: 100%">
				<el-button
					type="primary"
					style="width: 100%"
					@click="submitForm('ruleForm')"
					:loading="logining"
					>登录</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	name: 'loginIndex',
	data() {
		return {
			// 定义loading默认为false
			logining: false,
			// 记住密码
			rememberpwd: false,
			ruleForm: {
				// username和password默认为空
				username: '',
				password: '',
				// code: '',
				// randomStr: '',
				// codeimg: '',
			},
			// rules前端验证
			rules: {
				username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
			},
		}
	},
	// 创建完毕状态(里面是操作)
	created() {},
	// 里面的函数只有调用才会执行
	methods: {
		//
		submitForm() {
			this.$refs['ruleForm'].validate((valid, errorObj) => {
				if (valid) {
					let params = {
						...this.ruleForm,
					}
					// POST /user/doLogin
					this.$axios.post('/user/doLogin', params).then((res) => {
						console.log(res)
						if (res.status == '200') {
							// sessionStorage.setItem('user', JSON.stringify(res.data))
							this.$store.commit('menu/setUserInfo', {
								...res.data,
								...this.ruleForm,
							})
							// const loading = this.$loading({
							// 	lock: true,
							// 	text: 'Loading',
							// 	spinner: 'el-icon-loading',
							// 	background: 'rgba(0, 0, 0, 0.7)',
							// })
							// this.$store.commit('menu/setUserInfo', res.data)
							// this.$store.setUserInfo(res.data)
							this.$router.push({ path: '/mattersHandle' })
						}
					})
				} else {
					// 弹出第一个错误信息
					// console.log(errorObj)
					this.$message.error(Object.values(errorObj)[0][0].message)
					return false
				}
			})
		},
	},
}
</script>

<style scoped>
.login-wrap {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	/* padding-top: 10%; */
	background-image: url('../assets/logo.webp');
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login-container {
	border-radius: 10px;
	margin: 0px auto;
	width: 350px;
	padding: 30px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	text-align: left;
	box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}
.remember {
	margin: 0px 0px 35px 0px;
}
.code-box {
	text-align: right;
}
.codeimg {
	height: 40px;
}
</style>
