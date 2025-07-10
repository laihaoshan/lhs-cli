export enum BLOB_TYPE {
	/**异常 */
	ERROR = 0,
	/**成功 */
	SUCCES = 1
}

/** 处理blob 二进制的传输问题 */
export const handleBlobResq = async (response: any, responseData: any) => {
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
