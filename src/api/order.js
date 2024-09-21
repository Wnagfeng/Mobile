import request from '../utils/request'
//获取订单列表
export function getOrderList(data) {
    return request({
        url: '/order/list',
        method: 'get',
        params: data
    })
}
//计算订单金额
export function getOrderSum(data) {
    return request({
        url: '/order/computed/' + data.key,
        method: 'post',
        data
    })
}
//创建订单信息
export function createOrder(data) {
    return request({
        url: '/order/create/' + data.key,
        method: 'post',
        data
    })
}
//订单确认
export function getOrderInfo(data) {
    return request({
        url: '/order/confirm',
        method: 'post',
        data
    })
}