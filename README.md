# Mobile练习指南:memo:：

```js
Write By CoderJoon
Time: 2024-09-19 —— 2024-09-
```

***

### 0.关于替换:pencil2:：

我做的替换全都打了标注

```js
<!-- 替换url -->
```





### 1.前置条件:lock:：

为了练习该项目我对本机进行了版本降级 以下是该`Mobile`项目运行所需的环境：

| 环境类型     | 版本号   |
| ------------ | -------- |
| Node         | ^14.17.6 |
| `Elemenu—Ui` | ^2.12.0  |
| `Vue—Router` | ^3.0.1   |
| `Vue`        | ^2.5.2`  |
| `Npm`        | 6.14.15  |

### 2.项目初始化:rocket:：

```shell
npm install -g @vue/cli@4.5.13  `---最后一个与vue2.5.14匹配的cli`
vue create Pc
```

### 3.关于路由:wrench: ：

在`router.config.js`文件中，主办方对齐进行了`requireAuth`配置，目的是对部分页面做登录验证，这里我关闭，不需要验证，后期打开开关即可！

### 4.关于请求 :chart_with_upwards_trend:：

以下是你可能需要自己添加的API请求：

```js
// home.js
//首页 精品推荐
export function getBastList() {
	return request({
		url: '/index/bastList',
		method: 'get'
	})
}
//首页  猜你喜欢
export function getLike() {
	return request({
		url: '/index/like',
		method: 'get'
	})
}
```

### 5.关于路由:sparkles:

以下是你可能需要添加的路由：

```js
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
}
```

### 6.关于商品详情页面:rocket: ：​

该页面中的选择商品规格有点小难度，主要是复杂在数据结构上，这里做出详细的解析：

#### 6.1前置条件:bookmark:：

想要明白这个规格是怎么实现的，首先你需要明白数据是如何处理的，我们需要处理为什么格式的数据等。

在本项目下的 `ProductDetail.html` 中我做了详细的解析，包括过滤过程！建议看一看。

#### 6.2详细解析:green_heart:：

如果你已经明白了数据格式是如何过滤的，以及我们需要哪些数据格式，这里我对vant中的vant-sku组件做一个详细的解析，功能实现就问题就不大了！

规格的选择本质上就是对数据的对应处理，比如我当前有两个套餐，8+128 12+512 套餐 加上颜色的套餐，最终他是在sku这个对象中的list中过滤出符合这个套餐的 库存 单价等各种数据，然后统一发送给后端做处理。



