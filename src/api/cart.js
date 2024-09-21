
import request from '../utils/request'
//添加购物车
export function addCart(data) {
    return request({
        url: '/cart/add',
        method: 'post',
        data
    })
}