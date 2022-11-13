/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { Message } from 'element-ui'

// import Storage from './Storage'
import router from '../router/index'
// import store from "../vuex";
import store from "../store";
// import { getToken } from "./auth";

// 环境的切换
// if (process.env.NODE_ENV == "development") {
//   axios.defaults.baseURL = "http://192.168.15.165:8082/api/";
// } else if (process.env.NODE_ENV == "production") {
//   // 打包后的环境
//   axios.defaults.baseURL = "http://222.240.1.65:20080/api/";
// }

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   window.location.href = "http://222.240.1.65:20080/x_desktop/index.html";
// };

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, msg) => {
	// 状态码判断
	switch (status) {
		//  默认失败  code  500
		//  成果 code 0
		case 201:
			if (msg == '登录验证失败,请重新登录' || msg == '登录验证失败,请重新登录') {
				setTimeout(() => {
					// console.log(router)
					// if (window.location.hostname != '192.168.5.5') {
					// 	window.location.href = 'http://222.240.1.65:20080/x_desktop/index.html'
					// } else {
					// 	window.location.href = 'http://192.168.10.21:8001/x_desktop/index.html  '
					// }
					// debugger
					
					router.push({
						path: `/login`,
					})
				}, 300)
				return
			}
			break
		case 502:
			Message({
				message: '服务器错误，请联系技术部处理',
				type: 'error',
				duration: 3 * 1000,
			})
			break

		default:
			if (msg == undefined || msg == null) {
				console.log('null')
			} else {
				console.log(msg, 'errorHandle')
			}
	}
}

// 创建axios实例
var service = axios.create({
	timeout: 1000 * 12, //请求超时时间
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

// axios 超时重新请求
// 请求次数
service.defaults.retry = 0
//请求的间隙
service.defaults.retryDelay = 1000

// request拦截器
service.interceptors.request.use(
	(config) => {
		// console.log(store)
		if (store.state.menu.userInfo && store.state.menu.userInfo.token) {
			config.headers = {
				'token': store.state.menu.userInfo.token, //携带权限参数
			};
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

/**
 * respone拦截器
 */
service.interceptors.response.use(
	// 请求成功
	(response) => {
		/**
		 * code:0,接口正常返回;
		 */
		var res = response.data
		if (res.code === 999) {
			return response.data
		}
		if (res.msg == '登录验证失败,请重新登录' ) {
			Message({
				message: res.msg,
				type: 'error',
				duration: 3 * 1000,
			})
			router.push({
				path: `/login`,
			})
			return
		}
		if (res.status !== 200) {
			Message({
				message: res.msg,
				type: 'error',
				duration: 3 * 1000,
			})
			//  约定的状态码：500:默认失败 特殊返回 code 发生待定;
			// 	if(res.code === 500){
			// 	}
			//	非正常请求 错误码处理
			errorHandle(res.code, res.msg)
			return Promise.reject('error')
		} else {
			// res.code === 200,正常返回数据
			return response.data
		}
	},
	// 请求失败
	(error) => {
		//请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
		if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
			Message({
				message: error.message,
				type: 'error',
				duration: 3 * 1000,
			})
			var config = error.config
			config.__retryCount = config.__retryCount || 0

			if (config.__retryCount >= config.retry) {
				// Reject with the error
				//window.location.reload();
				return Promise.reject(error)
			}

			// Increase the retry count
			config.__retryCount += 1

			// Create new promise to handle exponential backoff
			var backoff = new Promise(function (resolve) {
				setTimeout(function () {
					//console.log('resolve');
					resolve()
				}, config.retryDelay || 1)
			})

			return backoff.then(function () {
				return axios(config)
			})
		} else {
			Message({
				message: error.message,
				type: 'error',
				duration: 3 * 1000,
			})
			return Promise.reject(error)
		}

		// Message({
		// 	message: error.message,
		// 	type: 'error',
		// 	duration: 5 * 1000,
		// })
		// return Promise.reject(error)
	}
)

export default service
