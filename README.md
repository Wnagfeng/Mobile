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

