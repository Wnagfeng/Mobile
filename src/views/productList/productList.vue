<template>
    <div class="warpper">
        <van-sticky :offset-top="10">
            <van-tabs sticky title-active-color="red" color="#fff" @click="onClick">
                <van-tab title="综合" name="1"></van-tab>
                <van-tab name="2">
                    <template #title>
                        价格
                        <van-icon name="sort" />
                    </template>
                </van-tab>
                <van-tab title="新品" name="3"></van-tab>
            </van-tabs>
        </van-sticky>
        <template v-if="list.length < 1">
            <van-empty description="空空如也!" />
        </template>
        <div style="margin-top: 10px;">
            <van-grid :column-num="2" :gutter="10">
                <van-grid-item v-for="(item, index) in list" :key="index"
                    :to="'/productDetails?id=' + item.id + '&integral=' + integral">
                    <van-image :src="imgUrls + item.image" height="140" />
                    <span>
                        <font size="2">{{ item.storeName }}</font>
                    </span>
                    <span>
                        <font size="4" color="#ff8001" v-if="integral">{{ item.integral }}积分</font>
                        <font size="4" color="#ff8001" v-else>￥{{ item.price }}</font>
                    </span>
                </van-grid-item>
            </van-grid>
            <div class="loadMore" v-if="list.length > 9" @click="loadMore">点击加载更多</div>
        </div>
    </div>
</template>

<script>
import {
    getProductList
} from "../../api/product.js"
export default {
    data() {
        return {
            integral: false,
            list: [
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
                {
                    id: 1,
                    storeName: "产品A",
                    image: "https://example.com/imageA.jpg",
                    price: 199.00,
                    integral: 200 // 如果是积分兑换商品，显示积分
                },
            ],
            imgUrls: this.$baseApi,
            salesSort: 'desc',
            limit: 10,
            priceOrder: 'desc',
            name: null,
            val: null
        };
    },
    created() {
        this.getdata()
    },
    methods: {
        loadMore() {
            this.limit += 10; // 每次加载10条数据
            this.getdata(this.name, this.val, this.limit); // 重新调用getdata
        },
        goto(data) {
            this.$router.push({
                name: 'ProductDetails',
                query: {
                    integral: data
                }
            });
        },
        onClick(name, title) {
            console.log('点击了标签', name, title)
            if (name == 1) {
                this.move()
            } else if (name == 2) {
                if (this.priceSort == 'desc') {
                    this.priceSort = 'asc'
                    this.move('priceOrder', 'desc')
                } else {
                    this.priceSort = 'desc'
                    this.move('priceOrder', 'asc')
                }
            } else if (name == 3) {
                this.move('news', 1)
            } else if (name == 4) {
                if (this.salesSort == 'desc') {
                    this.salesSort = 'asc'
                    this.move('salesSort', 'desc')
                } else {
                    this.salesSort = 'desc'
                    this.move('salesSort', 'asc')
                }
            }
        },
        move(name, val) {
            if (this.name == name) {
                this.limit += 10
            } else {
                this.limit = 0
                this.limit += 10
            }
            this.name = name
            this.val = val
            this.getdata(this.name, this.val, this.limit); // 在这里调用 getdata
        },
        getdata(name, val, limit) {
            let map = {}
            map['sid'] = this.$route.query.sid ? this.$route.query.sid : ''
            map['isIntegral'] = this.$route.query.integral ? 1 : 0 //是否为积分商品的参数
            map[name] = val
            map['limit'] = limit //制返回结果的数量
            getProductList(map).then(res => {
                this.list = res.data.content
            })

        }
    },
};
</script>

<style scoped>
.warpper {
    background-color: #F8F8F8;
    padding: 5px;
    padding-bottom: 70px;
}

.loadMore {
    margin-top: 15px;
    text-align: center;
    color: #333;
}
</style>
