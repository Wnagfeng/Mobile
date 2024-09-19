/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/',
  component: () => import('@/views/layouts/index'),
  redirect: '/home',
  meta: {
    title: '首页',
    keepAlive: false
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        keepAlive: false,
        tabBar: true, // 是否显示底部标签栏 true 显示 false不显示
        navBar: false// 是否显示顶部导航栏 true 显示 false不显示
        // requireAuth:true //是否需要登录才能进
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/home/register'),
      meta: {
        title: '注册',
        keepAlive: false,
        tabBar: false,
        navBar: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/home/login'),
      meta: {
        title: '登录',
        keepAlive: false,
        tabBar: false,
        navBar: false
      }
    },

    {
      path: '/userIndex',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: {
        title: '',
        keepAlive: false,
        tabBar: true,
        navBar: false,
        requireAuth: true
      }
    },
    {
      path: '/nullPage',
      name: 'NullPage',
      component: () => import('@/views/home/nullPage'),
      meta: {
        title: '404',
        keepAlive: false,
        tabBar: true,
        navBar: false,
        requireAuth: false
      }
    },
    {
      path: '/productList',
      name: 'ProductList',
      component: () => import('@/views/productList/productList'),
      meta: {
        title: '商品列表',
        keepAlive: false,
        tabBar: true,
        navBar: true
      }
    },
    {
      path: '/productClassify',
      name: 'ProductClassify',
      component: () => import('@/views/classify/productClassify'),
      meta: {
        title: '商品分类',
        keepAlive: false,
        tabBar: true,
        navBar: true
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/cart/cart'),
      meta: {
        title: '购物车',
        keepAlive: false,
        tabBar: false,
        navBar: true,
        requireAuth: true
      }
    }
  ]
}]
