//添加收藏
export function collect(data) {
    return request({
        url: '/collect/add',
        method: 'post',
        data

    })
}
//删除收藏
export function delCollect(data) {
    return request({
        url: '/collect/del',
        method: 'post',
        data

    })
}