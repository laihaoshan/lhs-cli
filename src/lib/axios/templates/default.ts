import axios, { type AxiosResponse } from 'axios';

// 扩展 AxiosResponse 接口，添加 code 属性
interface CustomAxiosResponse extends AxiosResponse<any> {
	code?: number;
	msg?: any;
}

/**错误码枚举映射 */
const errorStatusMap = new Map([
	[400, '请求参数不正确'],
	[401, '账号未登录'],
	[403, '没有该操作权限'],
	[404, '请求未找到'],
	[408, '请求超时'],
	[423, '请求失败，请稍后重试'],
	[429, '请求过于频繁，请稍后重试'],
	[500, '系统异常'],
	[501, '功能未实现/未开启'],
	[502, '网络错误'],
	[503, '服务不可用'],
	[504, '网络超时'],
	[505, 'HTTP版本不受支持'],
	[900, '重复请求，请稍后重试'],
	[999, '未知错误'],
	[1201003406, '请求短信过于频繁']
]);

const config = {
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
		return config;
	},
	(err: any) => {
		return Promise.reject(err);
	}
);

/**
 * @description 响应拦截器
 * @returns {AxiosResponse} config
 */
request.interceptors.response.use(
	async (response: any) => {
		return Promise.resolve(response);
	},
	(err: any) => {
		if (err && err.response) {
			err.msg = errorStatusMap.get(err.response?.status) ?? '连接出错!';
		} else {
			err.msg = '连接服务器失败!';
		}
		return Promise.reject(err || {});
	}
);

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
