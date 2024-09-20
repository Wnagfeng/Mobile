import request from '@/utils/request';
//获取商品详情
export function getProduct(data) {
    return request({
        url: '/product/detail/' + data,
        method: 'get'
    })
}
