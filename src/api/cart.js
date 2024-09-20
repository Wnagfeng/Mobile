//添加购物车
export function addCart(data) {
    return request({
        url: '/cart/add',
        method: 'post',
        data
    })
}