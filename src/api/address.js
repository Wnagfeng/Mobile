import request from '../utils/request'
// 获取地址列表
export function getAddress(data) {
	return request({
		url: '/address/list',
		method: 'get',
		params: data
	})
}