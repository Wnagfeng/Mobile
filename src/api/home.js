import request from '@/utils/request'

// 首页数据
export function getData() {
  return request({
    url: '/index',
    method: 'get'
  })
}

// 首页轮播图
export function getBanner() {
  return request({
    url: '/index/banner',
    method: 'get'
  })
}

// 首页  菜单
export function getMenus() {
  return request({
    url: '/index/menus',
    method: 'get'
  })
}

export default {
  getData,
  getMenus,
  getBanner
}
