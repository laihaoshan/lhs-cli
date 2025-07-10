import axios, { type AxiosResponse } from 'axios';

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
			default:
				if (response.config.responseType === 'blob') {
					return Promise.reject(blobResponseData);
				}
				return Promise.reject(responseData as any);
		}
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
