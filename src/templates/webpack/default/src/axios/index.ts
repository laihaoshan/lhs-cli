/*
 * @Author: liuchanghong
 * @Date: 2023-11-01 18:36:45
 * @Description: axios封装
 */
import axios, { type AxiosResponse } from 'axios';
import router from '@/router';
export const API_PREFIX = '/api';
export const API_OPERATE_PREFIX = '/api-operate';
// 业务前台
export const API_BUSINESS_FRONTEND_PREFIX = '/api-business-frontend';
// 业务后台
export const API_BUSINESS_BACKEND_PREFIX = '/api-business-backend';
// 门户的服务编排
export const API_PORTAL_PREFIX = '/api-portal';

// 扩展 AxiosResponse 接口，添加 code 属性
interface CustomAxiosResponse extends AxiosResponse<any> {
	code?: number;
	msg?: any;
}

enum BLOB_TYPE {
	/**异常 */
	ERROR = 0,
	/**成功 */
	SUCCES = 1
}

/**
 * 清除本地缓存和退出系统到登陆页
 */
const goLogin = () => {
	const pathName = window.location.pathname;

	if (pathName === '/login') return;
	if (pathName && pathName !== '/login' && pathName !== '/') {
		router.push(`/login?callback=${encodeURIComponent(window.location.href)}`);
	} else {
		router.push('/login');
	}
};

const config = {
	// 公共请求头
	headers: { 'Content-Type': 'application/json' },
	timeout: 30000, // 超时时间
	withCredentials: true
};
const request = axios.create(config);

/**
 * @description 请求发起截器
 */
request.interceptors.request.use(
	async (config: any) => {
		// const accessToken = 'Bearer test1725412211666714625:1725412211666714625';
		// config.headers.Authorization = accessToken;

		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

/**
 * @description 响应拦截器
 * @returns {AxiosResponse} config
 */
request.interceptors.response.use(
	async (response: any) => {
		// loading && loading.close();
		let code = null;
		if (response.config.data && response.config.data.get) {
			code = response.data ? response.data.code : null;
		} else {
			code = response.data ? response.data.code : {};
		}

		const responseData = response?.data ?? {
			code: undefined,
			data: undefined,
			msg: undefined
		};

		/**  当responseType为blob的值*/
		let blobResponseData: any = {};

		if (response.config.responseType === 'blob') {
			const res: any = await handleBlobResq(response, responseData);
			if (res.type === BLOB_TYPE.SUCCES) {
				return Promise.resolve(responseData);
			} else {
				blobResponseData = res.blobResponseData;
				code = res.code;
			}
		}

		switch (code) {
			case 0:
				return Promise.resolve(responseData);
			case 401:
				goLogin();
				return;
			default:
				if (response.config.responseType === 'blob') {
					return Promise.reject(blobResponseData);
				}
				return Promise.reject(responseData as any);
		}
	},
	err => {
		if (err && err.response) {
			err.msg = errorStatus(err.response);
		} else {
			err.msg = '连接服务器失败!';
		}
		return Promise.reject(err || {});
	}
);

/** 处理blob 二进制的传输问题 */
const handleBlobResq = async (response: any, responseData: any) => {
	// 只有当无法将response.data转换的时候才会返回正常的json
	return new Promise(resolve => {
		new Response(response.data)
			.text()
			.then(text => {
				const blobResponseData = JSON.parse(text);
				const code = blobResponseData.code;
				resolve({ type: BLOB_TYPE.ERROR, blobResponseData, code });
			})
			.catch(() => {
				resolve({ type: BLOB_TYPE.SUCCES, responseData });
			});
	});
};

/**
 * get status code
 */
const errorStatus = (response: any): string => {
	/** http status code */
	const code = response.status;
	/** notice text */
	let msg;
	switch (code) {
		case 400:
			msg = '请求参数不正确';
			break;
		case 401:
			msg = '账号未登录';
			break;
		case 403:
			msg = '没有该操作权限';
			break;
		case 404:
			msg = '请求未找到';
			break;
		case 408:
			msg = '请求超时';
			break;
		case 423:
			msg = '请求失败，请稍后重试';
			break;
		case 429:
			msg = '请求过于频繁，请稍后重试';
			break;
		case 500:
			msg = '系统异常';
			break;
		case 501:
			msg = '功能未实现/未开启';
			break;
		case 502:
			msg = '云商接口系统异常';
			break;
		case 503:
			msg = '服务不可用';
			break;
		case 504:
			msg = '网络超时';
			break;
		case 505:
			msg = 'HTTP版本不受支持';
			break;
		case 900:
			msg = '重复请求，请稍后重试';
			break;
		case 999:
			msg = '未知错误';
			break;
		case 1201003406:
			msg = '请求短信过于频繁';
			break;
		default:
			msg = `连接出错!`;
	}
	return msg;
};

/**
 * @url请求路径
 * @params请求查询参数
 * @config请求头配置
 */
export function post(url: string, data?: any, config?: any): Promise<CustomAxiosResponse> {
	return request({
		url,
		method: 'post',
		data,
		...config
	});
}

/**
 * @post请求
 * @url请求路径
 * @data请求参数
 * @config请求头配置
 */
export function get(url: string, params: any = {}, config?: any): Promise<CustomAxiosResponse> {
	return request({
		url,
		method: 'get',
		params,
		...config
	});
}

/**
 * @patch请求
 * @url请求路径
 * @data请求参数
 * @config请求头配置
 */
export function patch(url: string, params: any = {}, config?: any): Promise<CustomAxiosResponse> {
	return request({
		url,
		method: 'patch',
		params,
		...config
	});
}

/**
 * @deletes请求
 * @url请求路径
 * @data请求参数
 * @config请求头配置
 */
export function deletes(url: string, params: any = {}, config?: any): Promise<CustomAxiosResponse> {
	return request({
		url,
		method: 'delete',
		params,
		...config
	});
}

/**
 * @put请求
 * @url请求路径
 * @data请求参数
 * @config请求头配置
 */
export function put(url: any, data: any = {}, config?: any): Promise<CustomAxiosResponse> {
	return request({
		url,
		method: 'put',
		data,
		...config
	});
}
