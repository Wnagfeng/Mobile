/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/',
    component: () => import('../views/layouts/index.vue'),
    redirect: '/home',
    meta: {
        title: '首页',
        keepAlive: false
    },
    children: [
        {
            path: '/home',
            name: 'Home',
            component: () => import('../views/home/index.vue'),
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
            component: () => import('../views/home/register.vue'),
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
            component: () => import('../views/home/login.vue'),
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
            component: () => import('../views/user/index.vue'),
            meta: {
                title: '',
                keepAlive: false,
                tabBar: true,
                navBar: false,
                requireAuth: false
            }
        },
        {
            path: '/nullPage',
            name: 'NullPage',
            component: () => import('../views/home/nullPage.vue'),
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
            component: () => import('../views/productList/productList.vue'),
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
            component: () => import('../views/classify/productClassify.vue'),
            meta: {
                title: '商品分类',
                keepAlive: false,
                tabBar: true,
                navBar: true
            }
        },
        {
            path: '/Cart',
            name: 'Cart',
            component: () => import('../views/cart/cart.vue'),
            meta: {
                title: '购物车',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: false
            }
        },
        // 自己添加的路由
        // 1.商品详情页面
        {
            path: '/productDetails',
            name: 'ProductDetails',
            component: () => import('../views/productDetails/productDetails.vue'),
            meta: {
                title: '商品详情',
                keepAlive: false,
                tabBar: false,
                navBar: true
            }
        },
        // 2.创建订单页面
        {
            path: '/createOrder',
            name: 'createOrder',
            component: () => import('../views/order/createOrder.vue'),
            meta: {
                title: '创建订单',
                keepAlive: false,
                tabBar: false,
                navBar: true,
                requireAuth: true
            }
        },

    ]
}]
