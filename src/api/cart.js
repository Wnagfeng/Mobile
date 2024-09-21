//添加购物车
import request from '../utils/request'
export function addCart(data) {
    return request({
        url: '/cart/add',
        method: 'post',
        data
    })
}