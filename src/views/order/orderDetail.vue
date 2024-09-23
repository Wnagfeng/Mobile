<template>
    <div id="order">
        <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <van-loading size="24px" color="#0094ff" vertical>加载中...</van-loading>
            </div>
        </van-overlay>
        <div class="top">
            <div v-if="orderDetail.statusDto" class="title">{{ orderDetail.statusDto.msg }}</div>
            <div class="user_address">
                <div style="font-size: 14px">
                    <span style="margin-right: 10px">{{ orderDetail.realName }}</span><span>{{ orderDetail.userPhone
                        }}</span>
                </div>
                <div style="margin-top: 10px; color: #999">
                    {{ orderDetail.userAddress }}
                </div>
            </div>
        </div>
        <div class="content">
            <van-cell v-if="orderDetail.statusDto" title="订单状态" :value="orderDetail.statusDto.title" />
            <div class="order_list">
                <van-card v-for="item in orderDetail.cartInfo" :key="item.id" :num="item.cartNum"
                    :desc="item.productInfo.storeInfo" :title="item.productInfo.storeName"
                    :thumb="$baseApi + item.productInfo.image">
                    <template #tags>
                        <van-tag plain type="danger">{{ item.productInfo.attrInfo.sku }}</van-tag>
                    </template>
                    <template #price> ￥{{ item.productInfo.price }} </template>
                </van-card>
            </div>
            <van-cell title="快递" :value="orderDetail.deliveryName" />
            <van-cell title="订单号" :value="orderDetail.orderId" />
            <van-cell title="下单时间" :value="orderDetail.payTime" />
            <van-cell title="运费" :value="orderDetail.freightPrice || '免运费'" />
            <van-cell title="优惠" :value="orderDetail.couponPrice || '无优惠'" />
            <van-cell title="总金额" :value="orderDetail.payPrice" />
            <van-cell v-if="orderDetail.statusDto" title="支付方式" :value="orderDetail.statusDto.payType" />
        </div>
    </div>
</template>
<script>
import { Loading } from 'vant'
import { Overlay } from 'vant'
import { order } from '../../api/order'
export default {
    // 注册Loading组件
    components: { [Loading.name]: Loading, [Overlay.name]: Overlay },
    data() {
        return {
            // 订单详情数据
            orderDetail: {
                realName: '张三',
                userPhone: '13800138000',
                userAddress: '广州市天河区',
                // 模拟数据
                statusDto: {
                    title: '待付款',
                    payType: '微信支付'
                },
                cartInfo: [
                    {
                        id: 1,
                        cartNum: 1,
                        productInfo: {
                            storeInfo: '广州市天河区',
                            storeName: '广州市天河区第一商场',
                            image: 'https://img.yzcdn.cn/public_files/2019/07/16/f1a7d9d9c7d94d5d8d5d.jpg',
                            attrInfo: {
                                sku: '123456'
                            },
                            price: 100
                        }
                    },
                    {
                        id: 2,
                        cartNum: 2,
                        productInfo: {
                            storeInfo: '广州市天河区',
                            storeName: '广州市天河区第二商场',
                            image: 'https://img.yzcdn.cn/public_files/2019/07/16/f1a7d9d9c7d94d5d8d5d.jpg',
                            attrInfo: {
                                sku: '123456'
                            },
                            price: 100
                        }
                    }
                ],
                deliveryName: '顺丰快递',
                orderId: '201907161010100001',
                payTime: '2019-07-16 10:10:10',
                freightPrice: 0,
                couponPrice: 0,
                payPrice: 200
            },
            show: true
        }
    },
    methods: {
        // 获取数据
        getOrderDetail() {
            this.show = false
            order(this.$route.query.key).then(res => {
                this.show = false
                if (res.status === 200) {
                    this.orderDetail = res.data
                }
            })
        }
    },
    created() { },
    mounted() {
        if (!this.$route.query.key) {
            this.$router.push('/')
        }

        this.getOrderDetail()
    }
}
</script>
<style lang="scss" scoped>
#order {
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .top {
        background: url('../../static/userBg.png') no-repeat center center;
        height: 90px;

        .title {
            line-height: 90px;
            text-align: center;
            font-size: 18px;
            color: white;
        }

        .user_address {
            background-color: white;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            transform: translateY(1px);
            box-sizing: border-box;
            padding: 15px;
        }
    }

    .content {
        margin-top: 10px;

        .order_list {
            /deep/ .van-card__price {
                color: #ed6a0c;
                font-size: 18px;
            }
        }
    }
}
</style>