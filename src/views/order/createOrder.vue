<!-- 包含积分商品的支付和余额支付 -->
<template>
    <div class="warpper">
        <template>
            <van-cell is-link @click="addressShow = true" v-if="!addressInfo">
                <template #title>
                    <span class="custom-title">请选择地址 </span>
                </template>
            </van-cell>
            <van-cell is-link @click="addressShow = true" v-if="addressInfo">
                <template #title>
                    <span class="custom-title">{{ addressInfo.realName }}</span>
                    <span class="custom-title" style="margin-left: 8px;">{{ addressInfo.phone }}</span>
                </template>
                <template #label>
                    <span class="custom-title">{{ addressInfo.province + ' ' + addressInfo.district + '
                    '+addressInfo.city}}</span>
                </template>
            </van-cell>

            <van-popup v-model="addressShow" round position="bottom" :style="{ height: '40%' }">
                <van-contact-card type="add" @click="onAdd" />
                <template v-for="item in addressList">
                    <van-contact-card type="edit" :name="item.realName" :tel="item.phone" @click="address(item)" />
                </template>
            </van-popup>
            <!-- 商品信息 -->
            <template v-for="(item, index) in cartInfo" v-if="cartInfo.length > 0">
                <van-card :num="item.cartNum" :desc="item.productInfo.storeInfo" :title="item.productInfo.storeName"
                    style="background-color: #fff;" :thumb="imgUrls + item.productInfo.image">
                    <template #price>
                        <span v-if="item.productInfo.isIntegral == 1">
                            <font size="4" color="#ED6A0C">{{ item.productInfo.attrInfo.integral }}</font>
                            <font size="3" color="#ED6A0C">积分</font>
                        </span>
                        <span v-else>
                            <font size="3" color="#ED6A0C">￥</font>
                            <font size="4" color="#ED6A0C">{{ item.truePrice }}</font>
                        </span>
                    </template>
                    <template #tags>
                        <van-tag plain type="danger">{{ item.productInfo.attrInfo.sku }}</van-tag>

                    </template>
                </van-card>
            </template>
            <!--  list  在不启用积分支付时显示优惠券相关的内容-->
            <van-cell title="优惠券" is-link @click="showList = true" v-if="!enableIntegral">
                <template #default v-if="couponInfo">
                    <span>
                        <font size="2" color="#cccccc">已减{{ couponInfo.couponPrice }}</font>
                    </span>
                </template>
            </van-cell>
            <van-popup v-model="showList" round position="bottom" :style="{ height: '30%', background: '#f5f5f5' }">
                <van-cell center class="discount" @click="" v-for="(item, index) in couponList" :key="index"
                    @click="ckCoupon(item)">
                    <template #title>
                        <span style="margin-left: 10px;">{{ item.couponTitle }}</span><br />
                        <span style="margin-left: 10px;">
                            <font size="2" color="#cccccc">满{{ item.useMinPrice }}减{{ item.couponPrice }}</font>
                        </span>
                    </template>
                    <template #label>
                        <font style="margin-left: 10px;" size="3" color="#ff5a5f">{{ item.endTime }} 到期</font>
                    </template>
                    <template #icon>
                        <font size="2" color="#ff5a5f">￥</font>
                        <font size="6" color="#ff5a5f">{{ item.couponPrice }}</font>
                    </template>
                </van-cell>

            </van-popup>
            <!-- price info -->
            <template v-if="priceInfo.result">
                <!-- 当不启用积分支付时，显示商品的价格信息 -->
                <van-cell title="商品价格" :value="priceInfo.result.totalPrice" v-if="!enableIntegral" />
                <!-- 用户启用了积分支付时显示商品的价格信息 是积分不是价格 -->
                <van-cell title="商品价格" :value="priceInfo.result.payIntegral + '积分'" v-if="enableIntegral" />
                <!-- 不启用积分支付的情况下显示优惠券相关的优惠金额 -->
                <van-cell title="优惠" :value="priceInfo.result.couponPrice" v-if="!enableIntegral" />
                <van-cell title="运费" :value="priceInfo.result.payPostage > 0 ? priceInfo.result.payPostage : '免邮费'" />
                <van-field v-model="mark" label="备注" placeholder="请输入备注" />
                </van-cell>
            </template>
            <!-- pay select -->
            <!-- 不使用积分支付 -->
            <div class="pay" v-if="!enableIntegral">
                <van-radio-group v-model="radio">
                    <van-cell center icon="shop-o">
                        <template #title>
                            <span class="custom-title">余额</span>
                        </template>
                        <template #label>
                            <span class="custom-title">￥{{ userInfo.nowMoney }}</span>
                        </template>
                        <template #right-icon>
                            <van-radio name="1"></van-radio>
                        </template>
                    </van-cell>
                    <van-cell center icon="shop-o">
                        <template #title>
                            <span class="custom-title">微信</span>
                        </template>
                        <template #label>
                            <span class="custom-title">暂未开通</span>
                        </template>
                        <template #right-icon>
                            <van-radio name="1" disabled></van-radio>
                        </template>
                    </van-cell>
                </van-radio-group>
            </div>
            <!-- 使用积分支付 -->
            <div v-else class="pay">
                <van-radio-group v-model="radio">
                    <van-cell center icon="shop-o">
                        <template #title>
                            <span class="custom-title">剩余积分</span>
                        </template>
                        <template #default>
                            <span class="custom-title">{{ userInfo.integral }}</span>
                        </template>
                        <template #right-icon>
                            <van-radio name="1"></van-radio>
                        </template>
                    </van-cell>
                </van-radio-group>
            </div>
            <van-submit-bar v-if="priceInfo.result && !enableIntegral" :price="priceInfo.result.payPrice * 100"
                button-text="提交订单" @submit="createOrder" />
            <van-submit-bar v-if="priceInfo.result && enableIntegral" :price="priceInfo.result.payIntegral * 100"
                button-text="提交订单" @submit="createOrder" />
        </template>

    </div>
</template>

<script>
import {
    getAddress
} from "@/api/address.js"
import {
    getOrderInfo,
    getOrderSum,
    createOrder
} from "@/api/order.js"
import {
    getOrderCoupons
} from "@/api/discount.js"
export default {
    data() {
        return {
            imgUrls: "https://example.com/images/", // 假设的图片URL前缀
            priceGroup: {}, //价格
            addressShow: false,
            radio: '1',
            mark: null,
            showList: false,
            chosenCoupon: -1,
            couponList: [
                {
                    couponTitle: "满100减10",
                    useMinPrice: 100,
                    couponPrice: 10,
                    endTime: "2024-10-01"
                },
                {
                    couponTitle: "满200减25",
                    useMinPrice: 200,
                    couponPrice: 25,
                    endTime: "2024-11-01"
                }
            ], //优惠券列表
            couponInfo: {
                id: 1,
                couponTitle: "满100减10",
                couponPrice: 10
            }, //优惠券
            addressInfo: {
                id: 1,
                realName: "张三",
                phone: "13800138000",
                province: "北京市",
                district: "海淀区",
                city: "中关村"
            }, //地址信息
            addressList: [
                {
                    id: 1,
                    realName: "张三",
                    phone: "13800138000",
                    province: "北京市",
                    district: "海淀区",
                    city: "中关村"
                },
                {
                    id: 2,
                    realName: "李四",
                    phone: "13900139000",
                    province: "上海市",
                    district: "浦东新区",
                    city: "张江"
                }
            ], //地址列表
            orderKey: 'order12345',
            priceInfo: {
                result: {
                    totalPrice: 200,
                    payPrice: 190, // 优惠券后的价格
                    couponPrice: 10, // 优惠价格
                    payPostage: 10, // 运费
                    payIntegral: 100 // 需要支付的积分支付
                }
            },
            userInfo: {
                nowMoney: 300, //余额
                integral: 500 //积分
            },
            cartInfo: [
                {
                    cartNum: 2,
                    productInfo: {
                        storeInfo: "商品描述信息",
                        storeName: "商品名称A",
                        isIntegral: 0,
                        image: "productA.jpg",
                        attrInfo: {
                            integral: 100,
                            sku: "红色 L"
                        }
                    },
                    truePrice: 100
                },
                {
                    cartNum: 1,
                    productInfo: {
                        storeInfo: "另一商品描述信息",
                        storeName: "商品名称B",
                        isIntegral: 0,
                        image: "productB.jpg",
                        attrInfo: {
                            integral: 200,
                            sku: "蓝色 M"
                        }
                    },
                    truePrice: 100 // 通过积分支付
                }
            ], //购物车商品列表
            loading: false,
            enableIntegral: false, //是否使用积分
        };
    },

    created() {
        if (this.$route.query.integral == 1) {
            this.enableIntegral = true // 使用积分支付
        } else {
            this.enableIntegral = false // 使用余额支付
        }

        this.getorder()
        this.getOrderCoupons()

    },
    methods: {
        //查询联系人
        getAddressList() {
            getAddress().then(res => {
                this.addressList = res.data
            })
        },
        //获取订单
        getorder() {
            getOrderInfo({
                cartId: this.$route.query.ids
            }).then(res => {
                this.cartInfo = res.data.cartInfo
                this.addressInfo = res.data.addressInfo
                if (this.addressList.length > 0) {
                    this.$toast('请添加地址信息');
                    let vm = this
                    setTimeout(function () {
                        vm.$router.push("/newContact")
                    }, 1500)
                }
                this.couponInfo = res.data.usableCoupon;
                this.orderKey = res.data.orderKey
                this.userInfo = res.data.userInfo
                this.getAddressList()
                this.sumOrder()
            })
        },
        //获取订单优惠券
        getOrderCoupons() {
            getOrderCoupons(this.$route.query.ids).then(res => {
                this.couponList = res.data
            })
        },
        //选择优惠券
        ckCoupon(data) {
            this.showList = false;
            this.couponInfo = data
        },
        //计算订单金额
        sumOrder() {
            let couponId = null
            if (this.couponInfo) {
                couponId = this.couponInfo.id
            }
            if (this.addressInfo) {
                getOrderSum({
                    key: this.orderKey,
                    addressId: this.addressInfo.id,
                    couponId: couponId,
                    payType: 'yue',
                    shipping_type: 1,
                }).then(res => {
                    this.priceInfo = res.data
                    this.loading = true
                })
            }
        },
        //提交订单
        createOrder() {
            if (!this.addressInfo) {
                this.$toast('请添加地址信息');
                return
            }
            let couponId = null
            if (this.couponInfo) {
                couponId = this.couponInfo.id
            }
            createOrder({
                key: this.orderKey,
                addressId: this.addressInfo.id,
                couponId: couponId == null ? 0 : couponId,
                from: 'h5',
                mark: this.mark,
                useIntegral: this.enableIntegral ? 1 : 0,
                payType: this.enableIntegral ? 'integral' : 'yue', //余额
                shippingType: 1, //快递
                pinkId: 0, //拼团id 0没有拼团
            }).then(res => {
                if (res.status == 200) {
                    this.$router.push('/paySuccess')
                }
            })
        },
        onAdd() {
            this.$router.push("/contactList")
        },
        //选择联系人
        address(data) {
            this.addressShow = false
            this.addressInfo = data
            this.sumOrder()
        },

    },
}
</script>

<style scoped>
.warpper {
    padding: 15px;
}

.discount {
    width: calc(100% - 15px);
    margin: 10px auto;
    border-radius: 8px;
}

.pay {
    margin-top: 15px;
    border: 1px solid #F8F8F8;
}
</style>
